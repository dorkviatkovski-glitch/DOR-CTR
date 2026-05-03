import Link from 'next/link';

const items = [
  { href: '/collection', label: 'Collection' },
  { href: '/marketplace', label: 'Marketplace' },
  { href: '/shared', label: 'Shared' },
  { href: '/profile', label: 'Profile' }
];

export function BottomNav() {
  return (
    <nav className="bottom-nav">
      {items.map((item) => (
        <Link key={item.href} href={item.href} className="nav-item">{item.label}</Link>
      ))}
    </nav>
  );
}
