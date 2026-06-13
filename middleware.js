import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname === '/login' || pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  const auth = request.cookies.get('tg_auth');
  if (!auth || auth.value !== 'tamboon_auth_ok') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
