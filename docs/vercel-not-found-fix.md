# Fixing Vercel `NOT_FOUND` in this repo

## Why this repo triggers `NOT_FOUND`
This repository currently contains only a generated structure summary in `README.md`; there is no real `card-platform/apps/web` Next.js app directory checked into Git.

Vercel can only serve routes that exist in built output. If the project root has no deployable app, requests resolve to Vercel's `NOT_FOUND` error page.

## Immediate fix options

### Option A (recommended): deploy the actual app source
1. Commit the real monorepo files shown in `README.md`:
   - `card-platform/package.json`
   - `card-platform/apps/web/*`
   - any lockfile (`package-lock.json`/`pnpm-lock.yaml`/`yarn.lock`)
2. In Vercel Project Settings:
   - **Root Directory**: `card-platform/apps/web`
   - **Framework Preset**: `Next.js`
   - **Install Command**: `npm install`
   - **Build Command**: `npm run build`
   - **Output Directory**: leave default (Next.js)
3. Redeploy.

### Option B: keep root deployment but point build to workspace
If you want Vercel root to remain repo root:
1. Commit the real monorepo files first.
2. Configure:
   - Install Command: `npm install`
   - Build Command: `npm run build --workspace @cardx/web`
3. Set the project Root Directory to `card-platform` (not repo root), so workspace resolution works reliably.

## Verify after fixing
- `/` should redirect to `/login` (from `app/page.tsx`).
- `/login`, `/signup`, `/collection`, `/marketplace`, `/shared`, `/profile` should all render.

## Typical pitfalls that cause `NOT_FOUND`
- Wrong **Root Directory** in Vercel.
- App code missing from the repo/branch being deployed.
- Deploying API-only code but expecting frontend routes.
- Monorepo workspace command executed from wrong directory.
- Misconfigured rewrites that swallow all routes.
