import { NextRequest, NextResponse } from 'next/server';
import { AUTH_COOKIE, isProtectedPath } from './lib/auth';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isProtectedPath(pathname)) {
    return NextResponse.next();
  }

  const isAuthenticated = request.cookies.get(AUTH_COOKIE)?.value === '1';

  if (!isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/collection/:path*', '/marketplace/:path*', '/shared/:path*', '/profile/:path*']
};
