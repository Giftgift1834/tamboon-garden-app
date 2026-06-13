import { getSheets, SHEET_ID } from './google';

const TAB_HEADERS = {
  Projects:  ['id','name','customer','contact','address','taxId','entity','status','value','start'],
  Documents: ['id','projectId','projectName','customer','entity','currentStage','base','docNos','docDates','validity','rev','dueDate','payMethod','lineItems'],
  Employees: ['id','name','nickname','position','site','projectId','phone','start','contractEnd','status','blood','emergencyContact'],
  Materials: ['id','projectId','logDate','recorder','description','materials'],
};

const JSON_COLS = { Documents: ['docNos','docDates','lineItems'], Materials: ['materials'] };

async function ensureTab(sheets, tabName) {
  const meta = await sheets.spreadsheets.get({ spreadsheetId: SHEET_ID });
  const exists = meta.data.sheets.some(s => s.properties.title === tabName);
  if (!exists) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SHEET_ID,
      requestBody: { requests: [{ addSheet: { properties: { title: tabName } } }] },
    });
    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: `${tabName}!A1`,
      valueInputOption: 'RAW',
      requestBody: { values: [TAB_HEADERS[tabName] || []] },
    });
  }
}

export async function getRows(tabName) {
  const sheets = getSheets();
  await ensureTab(sheets, tabName);
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: `${tabName}!A:Z`,
  });
  const rows = res.data.values || [];
  if (rows.length < 2) return [];
  const headers = rows[0];
  const jsonCols = JSON_COLS[tabName] || [];
  return rows.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => {
      const raw = row[i] ?? '';
      obj[h] = jsonCols.includes(h) ? tryParse(raw) : raw;
    });
    return obj;
  });
}

export async function appendRow(tabName, data) {
  const sheets = getSheets();
  await ensureTab(sheets, tabName);
  const headers = TAB_HEADERS[tabName] || Object.keys(data);
  const jsonCols = JSON_COLS[tabName] || [];
  const row = headers.map(h => {
    const val = data[h];
    if (jsonCols.includes(h) || (val !== null && typeof val === 'object')) return JSON.stringify(val ?? '');
    return val ?? '';
  });
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: `${tabName}!A:A`,
    valueInputOption: 'RAW',
    requestBody: { values: [row] },
  });
}

export async function updateRowById(tabName, id, data) {
  const sheets = getSheets();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: `${tabName}!A:A`,
  });
  const col = res.data.values || [];
  const rowNum = col.findIndex((r, i) => i > 0 && r[0] === id);
  if (rowNum === -1) return appendRow(tabName, data);
  const headers = TAB_HEADERS[tabName] || Object.keys(data);
  const jsonCols = JSON_COLS[tabName] || [];
  const row = headers.map(h => {
    const val = data[h];
    if (jsonCols.includes(h) || (val !== null && typeof val === 'object')) return JSON.stringify(val ?? '');
    return val ?? '';
  });
  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID,
    range: `${tabName}!A${rowNum + 1}`,
    valueInputOption: 'RAW',
    requestBody: { values: [row] },
  });
}

export async function deleteRowById(tabName, id) {
  const sheets = getSheets();
  const res = await sheets.spreadsheets.values.get({ spreadsheetId: SHEET_ID, range: `${tabName}!A:A` });
  const col = res.data.values || [];
  const rowIndex = col.findIndex((r, i) => i > 0 && r[0] === id);
  if (rowIndex === -1) return;
  const meta = await sheets.spreadsheets.get({ spreadsheetId: SHEET_ID });
  const sheet = meta.data.sheets.find(s => s.properties.title === tabName);
  if (!sheet) return;
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: SHEET_ID,
    requestBody: {
      requests: [{
        deleteDimension: {
          range: { sheetId: sheet.properties.sheetId, dimension: 'ROWS', startIndex: rowIndex, endIndex: rowIndex + 1 },
        },
      }],
    },
  });
}

function tryParse(str) {
  if (!str) return str;
  try { return JSON.parse(str); } catch { return str; }
}
