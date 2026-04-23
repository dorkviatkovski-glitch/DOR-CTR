import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AUTH_COOKIE } from '../lib/auth';

export default async function HomePage() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get(AUTH_COOKIE)?.value === '1';

  redirect(isAuthenticated ? '/collection' : '/login');
}
