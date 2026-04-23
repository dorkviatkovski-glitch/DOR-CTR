import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { AUTH_COOKIE } from '../../../../lib/auth';

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE, '1', {
    httpOnly: false,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/'
  });

  return NextResponse.json({ next: '/collection' });
}
