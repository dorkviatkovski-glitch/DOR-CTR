import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AUTH_COOKIE } from '../../lib/auth';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get(AUTH_COOKIE)?.value === '1';

  if (isAuthenticated) {
    redirect('/collection');
  }

  return <main className="app-shell">{children}</main>;
}
