# Vercel `NOT_FOUND` Fix Guide (CardX Monorepo)

This repo is structured as a monorepo where the Next.js app lives in `card-platform/apps/web`, not at repository root.

If Vercel is configured against the wrong directory, requests can resolve to no deployed route and return `NOT_FOUND`.

## Recommended fix

1. In Vercel Project Settings, set **Root Directory** to:
   - `card-platform/apps/web`
2. Keep **Framework Preset** as Next.js.
3. Set install command at monorepo root if needed:
   - `cd card-platform && npm install`
4. Set build command if not auto-detected:
   - `cd card-platform && npm run build --workspace @cardx/web`

## Why this happens

The app routes are defined under `apps/web/app/*` (e.g. `/login`, `/collection`, `/marketplace`), but Vercel only sees files under the configured root.
If the root points at the wrong folder, those routes do not exist from Vercel's perspective, and runtime path matching falls through to `NOT_FOUND`.

## Verify after deployment

- `/login` returns the login page.
- `/collection`, `/marketplace`, `/shared`, `/profile` all return 200.
- `/` redirects to `/login`.

