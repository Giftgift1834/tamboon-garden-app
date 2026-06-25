import { NextResponse } from 'next/server';
import { verifySignature, replyMessage } from '../../../../lib/line';
import { getRows, updateRowById } from '../../../../lib/sheetsHelper';

function fmtMoney(n) {
  return Number(n || 0).toLocaleString('th-TH');
}

function parseThaiBuddhistDate(str) {
  if (!str) return null;
  const parts = str.split('/');
  if (parts.length !== 3) return null;
  const [d, m, y] = parts.map(Number);
  // If year looks like Buddhist era (> 2500), subtract 543
  const year = y > 2500 ? y - 543 : y;
  return new Date(year, m - 1, d);
}

export async function POST(request) {
  const rawBody = await request.text();
  const signature = request.headers.get('x-line-signature') || '';

  if (!verifySignature(rawBody, signature)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const body = JSON.parse(rawBody);

  for (const event of (body.events || [])) {
    if (event.type === 'follow') {
      await replyMessage(event.replyToken, [{
        type: 'text',
        text: `สวัสดีครับ! 🌿 Tamboon Garden Bot\n\nคำสั่งที่ใช้ได้:\n• เอกสาร [ชื่อบริษัท/โครงการ]\n• รับเงินแล้ว [เลขที่เอกสาร]\n• ค้างชำระ\n• /myid\n\nพิมพ์ "ช่วยเหลือ" เพื่อดูคำสั่งทั้งหมด`,
      }]);
      continue;
    }

    if (event.type !== 'message' || event.message.type !== 'text') continue;

    const { replyToken, source } = event;
    const userId = source.userId;
    const text = event.message.text.trim();

    // /myid — owner setup helper
    if (text === '/myid') {
      await replyMessage(replyToken, [{
        type: 'text',
        text: `LINE User ID ของคุณ:\n${userId}\n\nนำ ID นี้ไปตั้งเป็น LINE_OWNER_USER_ID ใน Vercel Environment Variables`,
      }]);
      continue;
    }

    // Help
    if (text === 'ช่วยเหลือ' || text === 'help') {
      await replyMessage(replyToken, [{
        type: 'text',
        text: `🌿 Tamboon Garden Bot\n${'─'.repeat(24)}\n\n📄 เอกสาร [ชื่อบริษัท]\nค้นหาเอกสารตามชื่อบริษัทหรือโครงการ\n\n✅ รับเงินแล้ว [เลขที่]\nบันทึกการรับชำระเงิน\n\n🔴 ค้างชำระ\nดูยอดค้างชำระและเกินกำหนด\n\n🆔 /myid\nดู LINE User ID ของคุณ`,
      }]);
      continue;
    }

    // ค้างชำระ — AR Aging summary
    if (text === 'ค้างชำระ' || text === 'ar' || text === 'AR') {
      const docs = await getRows('Documents');
      const today = new Date();

      const overdue = docs.filter(d => {
        if (d.paidAt) return false;
        const due = parseThaiBuddhistDate(d.dueDate);
        return due && due < today;
      }).map(d => {
        const due = parseThaiBuddhistDate(d.dueDate);
        const days = Math.floor((today - due) / 86400000);
        return { ...d, overdueDays: days };
      }).sort((a, b) => b.overdueDays - a.overdueDays);

      const dueSoon = docs.filter(d => {
        if (d.paidAt) return false;
        const due = parseThaiBuddhistDate(d.dueDate);
        if (!due) return false;
        const days = Math.floor((due - today) / 86400000);
        return days >= 0 && days <= 7;
      });

      if (overdue.length === 0 && dueSoon.length === 0) {
        await replyMessage(replyToken, [{ type: 'text', text: '✅ ไม่มียอดค้างชำระ' }]);
        continue;
      }

      let msg = `📊 AR Aging\n${'─'.repeat(24)}\n`;
      if (overdue.length > 0) {
        msg += `\n🔴 เลยกำหนด ${overdue.length} รายการ\n`;
        overdue.slice(0, 5).forEach(d => {
          const invoiceNo = d.docNos?.receipt || d.docNos?.tax || '-';
          msg += `• ${d.projectName}\n  ${fmtMoney(d.base)} บาท · เกิน ${d.overdueDays} วัน\n  เลขที่: ${invoiceNo}\n`;
        });
        if (overdue.length > 5) msg += `  ...และอีก ${overdue.length - 5} รายการ\n`;
      }
      if (dueSoon.length > 0) {
        msg += `\n🟡 ครบกำหนดใน 7 วัน\n`;
        dueSoon.forEach(d => {
          msg += `• ${d.projectName} · ${d.dueDate}\n`;
        });
      }
      msg += `\nรวมค้างชำระ: ${fmtMoney(overdue.reduce((s, d) => s + Number(d.base || 0), 0))} บาท`;

      await replyMessage(replyToken, [{ type: 'text', text: msg }]);
      continue;
    }

    // รับเงินแล้ว [เลขที่]
    if (text.startsWith('รับเงินแล้ว')) {
      const invoiceNo = text.replace('รับเงินแล้ว', '').trim();
      if (!invoiceNo) {
        await replyMessage(replyToken, [{ type: 'text', text: 'กรุณาระบุเลขที่เอกสาร เช่น:\nรับเงินแล้ว BL2026-001' }]);
        continue;
      }
      const docs = await getRows('Documents');
      const doc = docs.find(d => {
        const nos = d.docNos || {};
        return Object.values(nos).some(n => n === invoiceNo);
      });
      if (!doc) {
        await replyMessage(replyToken, [{ type: 'text', text: `ไม่พบเอกสารเลขที่ "${invoiceNo}"\nลองพิมพ์ "เอกสาร [ชื่อบริษัท]" เพื่อค้นหา` }]);
        continue;
      }
      const now = new Date();
      const paidAt = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear() + 543}`;
      await updateRowById('Documents', doc.id, { ...doc, paidAt });
      await replyMessage(replyToken, [{
        type: 'text',
        text: `✅ บันทึกรับเงินแล้ว\n\n📋 ${doc.projectName}\n💰 ${fmtMoney(doc.base)} บาท\n📄 เลขที่: ${invoiceNo}\n📅 วันที่รับ: ${paidAt}`,
      }]);
      continue;
    }

    // เอกสาร [ชื่อ] — document search
    if (text.startsWith('เอกสาร')) {
      const query = text.replace('เอกสาร', '').trim().toLowerCase();
      if (!query) {
        await replyMessage(replyToken, [{ type: 'text', text: 'กรุณาระบุชื่อบริษัทหรือโครงการ เช่น:\nเอกสาร บริษัท ABC' }]);
        continue;
      }
      const docs = await getRows('Documents');
      const found = docs.filter(d =>
        d.projectName?.toLowerCase().includes(query) ||
        d.customer?.toLowerCase().includes(query)
      );
      if (found.length === 0) {
        await replyMessage(replyToken, [{ type: 'text', text: `ไม่พบเอกสารที่ตรงกับ "${query}"` }]);
        continue;
      }
      const list = found.slice(0, 5).map(d => {
        const stageLabel = { quotation: 'ใบเสนอราคา', po: 'PO', invoice: 'วางบิล', receipt: 'ใบเสร็จ', tax: 'ใบกำกับภาษี' };
        const stage = stageLabel[d.currentStage] || d.currentStage;
        const paid = d.paidAt ? `✅ รับเงินแล้ว ${d.paidAt}` : '⏳ ยังไม่รับเงิน';
        return `📄 ${d.projectName}\n   ${d.customer}\n   สถานะ: ${stage} · ${paid}\n   มูลค่า: ${fmtMoney(d.base)} บาท`;
      }).join('\n\n');

      const header = found.length > 5 ? `พบ ${found.length} รายการ (แสดง 5 ล่าสุด):\n\n` : `พบ ${found.length} รายการ:\n\n`;
      await replyMessage(replyToken, [{ type: 'text', text: header + list }]);
      continue;
    }

    // Default help
    await replyMessage(replyToken, [{
      type: 'text',
      text: 'พิมพ์ "ช่วยเหลือ" เพื่อดูคำสั่งที่ใช้ได้',
    }]);
  }

  return NextResponse.json({ ok: true });
}
