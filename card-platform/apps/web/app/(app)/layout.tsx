import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { BottomNav } from '../../components/BottomNav';
import { ClientAuthGuard } from '../../components/ClientAuthGuard';
import { AUTH_COOKIE } from '../../lib/auth';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get(AUTH_COOKIE)?.value === '1';

  if (!isAuthenticated) {
    redirect('/login');
  }

  return (
    <>
      <ClientAuthGuard />
      <main className="app-shell">{children}</main>
      <BottomNav />
    </>
  );
}
