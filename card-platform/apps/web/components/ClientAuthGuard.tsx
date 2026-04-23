'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { AUTH_COOKIE, isProtectedPath } from '../lib/auth';

export function ClientAuthGuard() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isProtectedPath(pathname)) {
      return;
    }

    const hasAuthCookie = document.cookie
      .split(';')
      .some((cookie) => cookie.trim().startsWith(`${AUTH_COOKIE}=1`));

    if (!hasAuthCookie) {
      router.replace('/login');
    }
  }, [pathname, router]);

  return null;
}
