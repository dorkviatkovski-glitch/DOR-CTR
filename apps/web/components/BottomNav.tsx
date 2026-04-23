'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  { href: '/collection', label: 'Collection' },
  { href: '/marketplace', label: 'Marketplace' },
  { href: '/shared', label: 'Shared' },
  { href: '/profile', label: 'Profile' }
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav">
      {items.map((item) => {
        const isActive = pathname.startsWith(item.href);
        return (
          <Link key={item.href} href={item.href} className={`nav-item ${isActive ? 'active' : ''}`}>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
