export const AUTH_COOKIE = 'cardx_auth';

const PROTECTED_ROUTES = ['/collection', '/marketplace', '/shared', '/profile'] as const;

export function isProtectedPath(pathname: string) {
  return PROTECTED_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}
