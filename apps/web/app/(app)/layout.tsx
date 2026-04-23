import { BottomNav } from '@/components/BottomNav';

export default function AuthedLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="app-shell">
      {children}
      <BottomNav />
    </main>
  );
}
