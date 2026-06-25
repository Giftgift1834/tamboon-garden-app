import { NextResponse } from 'next/server';
import { getRows } from '../../../../lib/sheetsHelper';
import { pushMessage } from '../../../../lib/line';

function fmtMoney(n) {
  return Number(n || 0).toLocaleString('th-TH');
}

function parseThaiBuddhistDate(str) {
  if (!str) return null;
  const parts = str.split('/');
  if (parts.length !== 3) return null;
  const [d, m, y] = parts.map(Number);
  const year = y > 2500 ? y - 543 : y;
  return new Date(year, m - 1, d);
}

export async function GET(request) {
  // Vercel cron jobs are authenticated via CRON_SECRET in Authorization header
  const authHeader = request.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const ownerId = process.env.LINE_OWNER_USER_ID;
  if (!ownerId) {
    return NextResponse.json({ error: 'LINE_OWNER_USER_ID not configured' }, { status: 500 });
  }

  const docs = await getRows('Documents');
  const today = new Date();

  const overdue = docs
    .filter(d => {
      if (d.paidAt) return false;
      const due = parseThaiBuddhistDate(d.dueDate);
      return due && due < today;
    })
    .map(d => {
      const due = parseThaiBuddhistDate(d.dueDate);
      const days = Math.floor((today - due) / 86400000);
      return { ...d, overdueDays: days };
    })
    .sort((a, b) => b.overdueDays - a.overdueDays);

  const dueSoon = docs.filter(d => {
    if (d.paidAt) return false;
    const due = parseThaiBuddhistDate(d.dueDate);
    if (!due) return false;
    const days = Math.floor((due - today) / 86400000);
    return days >= 0 && days <= 3;
  });

  if (overdue.length === 0 && dueSoon.length === 0) {
    return NextResponse.json({ ok: true, message: 'No alerts today' });
  }

  const todayStr = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear() + 543}`;
  let msg = `🌿 Tamboon Garden · สรุปยอดค้างชำระ\n${todayStr}\n${'─'.repeat(28)}\n`;

  if (overdue.length > 0) {
    const total = overdue.reduce((s, d) => s + Number(d.base || 0), 0);
    msg += `\n🔴 เลยกำหนดแล้ว ${overdue.length} รายการ\nรวม: ${fmtMoney(total)} บาท\n`;
    overdue.slice(0, 5).forEach(d => {
      msg += `• ${d.projectName} — ${fmtMoney(d.base)} บาท (${d.overdueDays} วัน)\n`;
    });
    if (overdue.length > 5) msg += `  ...และอีก ${overdue.length - 5} รายการ\n`;
  }

  if (dueSoon.length > 0) {
    msg += `\n🟡 ครบกำหนดใน 3 วัน\n`;
    dueSoon.forEach(d => {
      msg += `• ${d.projectName} — ${fmtMoney(d.base)} บาท (${d.dueDate})\n`;
    });
  }

  msg += `\nพิมพ์ "ค้างชำระ" เพื่อดูรายละเอียด`;

  await pushMessage(ownerId, [{ type: 'text', text: msg }]);

  return NextResponse.json({
    ok: true,
    notified: overdue.length + dueSoon.length,
    overdue: overdue.length,
    dueSoon: dueSoon.length,
  });
}
