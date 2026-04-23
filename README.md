# CardX Platform Monorepo

This repository now contains a real npm workspace layout with source files in place (instead of embedding source code in this README).

## Workspace

- Root workspace config: `package.json`
- npm workspaces:
  - `apps/*`
  - `packages/*`

## Repository Structure

```text
apps/
  api/
    package.json
    tsconfig.json
    src/
      server.ts
      modules/
        auth/auth.router.ts
        collection/collection.router.ts
        health/health.router.ts
        marketplace/marketplace.router.ts
        pricing/pricing.router.ts
        profile/profile.router.ts
        shared/shared.router.ts

  web/
    package.json
    tsconfig.json
    next.config.ts
    app/
      layout.tsx
      page.tsx
      styles.css
      login/page.tsx
      signup/page.tsx
      collection/page.tsx
      marketplace/page.tsx
      shared/page.tsx
      profile/page.tsx
    components/
      BottomNav.tsx

packages/
  types/
    package.json
    src/index.ts
```

## Quick Start

1. Install dependencies from the repository root:
   - `npm install`
2. Run the API app:
   - `npm run dev:api`
3. Run the web app:
   - `npm run dev:web`
