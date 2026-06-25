import { getSheets, SHEET_ID } from './google';

const TAB_HEADERS = {
  Projects:  ['id','name','customer','contact','address','taxId','entity','status','value','start'],
  Documents: ['id','projectId','projectName','customer','entity','currentStage','base','docNos','docDates','validity','rev','dueDate','payMethod','lineItems'],
  Employees: ['id','name','nickname','position','site','projectId','phone','start','contractEnd','status','blood','emergencyContact'],
  Materials: ['id','projectId','logDate','recorder','description','materials'],
};

const JSON_COLS = { Documents: ['docNos','docDates','lineItems'], Materials: ['materials'] };
const NUM_COLS  = { Projects: ['value'], Documents: ['base'] };

async function ensureTab(sheets, tabName) {
  const meta = await sheets.spreadsheets.get({ spreadsheetId: SHEET_ID });
  const sheetMeta = meta.data.sheets.find(s => s.properties.title === tabName);

  if (!sheetMeta) {
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
    return;
  }

  // Tab exists — check if row 1 has the correct headers
  const expectedHeaders = TAB_HEADERS[tabName];
  if (!expectedHeaders) return;

  const headerRes = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: `${tabName}!A1:A1`,
  });
  const firstCell = ((headerRes.data.values || [[]])[0] || [])[0] || '';

  // If row 1 doesn't start with 'id', headers are missing
  if (firstCell !== 'id') {
    // If A1 looks like real data (length > 3, e.g. 'PRJ-001'), preserve it by inserting a header row above.
    // If A1 is empty or junk (e.g. '.', ''), just overwrite it with headers.
    if (firstCell.length > 3) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SHEET_ID,
        requestBody: {
          requests: [{
            insertDimension: {
              range: { sheetId: sheetMeta.properties.sheetId, dimension: 'ROWS', startIndex: 0, endIndex: 1 },
              inheritFromBefore: false,
            },
          }],
        },
      });
    }
    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: `${tabName}!A1`,
      valueInputOption: 'RAW',
      requestBody: { values: [expectedHeaders] },
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
  const numCols  = NUM_COLS[tabName]  || [];
  return rows.slice(1)
    .filter(row => row[0] && row[0].trim().length > 1) // skip empty / single-char junk rows
    .map(row => {
      const obj = {};
      headers.forEach((h, i) => {
        const raw = row[i] ?? '';
        if (jsonCols.includes(h)) obj[h] = tryParse(raw);
        else if (numCols.includes(h)) obj[h] = raw === '' ? 0 : Number(raw) || 0;
        else obj[h] = raw;
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
  // Skip row 0 (header row) — ensureTab guarantees row 1 = headers
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
  // Skip row 0 (header row) — ensureTab guarantees row 1 = headers
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
