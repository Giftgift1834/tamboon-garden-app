import { NextResponse } from 'next/server';

export async function POST(request) {
  const { password } = await request.json();

  if (password === process.env.APP_PASSWORD) {
    const response = NextResponse.json({ success: true });
    response.cookies.set('tg_auth', 'tamboon_auth_ok', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 วัน
      path: '/',
    });
    return response;
  }

  return NextResponse.json(
    { success: false, error: 'รหัสผ่านไม่ถูกต้อง' },
    { status: 401 }
  );
}
