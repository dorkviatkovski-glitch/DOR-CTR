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
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`nav-item ${pathname === item.href ? 'active' : ''}`.trim()}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
