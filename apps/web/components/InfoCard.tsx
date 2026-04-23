import type { ReactNode } from 'react';

export function InfoCard({ children }: { children: ReactNode }) {
  return <article className="card item-card">{children}</article>;
}
