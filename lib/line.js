import crypto from 'crypto';

const TOKEN  = process.env.LINE_CHANNEL_ACCESS_TOKEN;
const SECRET = process.env.LINE_CHANNEL_SECRET;

export function verifySignature(rawBody, signature) {
  const hash = crypto.createHmac('SHA256', SECRET).update(rawBody).digest('base64');
  return hash === signature;
}

export async function replyMessage(replyToken, messages) {
  await fetch('https://api.line.me/v2/bot/message/reply', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${TOKEN}` },
    body: JSON.stringify({ replyToken, messages }),
  });
}

export async function pushMessage(to, messages) {
  await fetch('https://api.line.me/v2/bot/message/push', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${TOKEN}` },
    body: JSON.stringify({ to, messages }),
  });
}
