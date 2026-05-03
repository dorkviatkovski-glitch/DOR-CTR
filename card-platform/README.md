# CardX Platform Monorepo

Business-grade card collection platform for:
- collection management
- shared collections
- collection valuation
- marketplace listings
- future pricing intelligence

## Monorepo Structure

```text
apps/
  api/        Backend API
  web/        Web frontend
packages/
  types/      Shared TypeScript types
  config/     Shared configuration notes
```

## Setup

1. Install dependencies from the monorepo root:
   ```bash
   npm install
   ```
2. Copy environment variables:
   ```bash
   cp .env.example .env
   ```
3. Run API and web app in separate terminals:
   ```bash
   npm run dev:api
   npm run dev:web
   ```

## Environment Variables

Documented in `.env.example`:
- `PORT` - API port (default `4000`)
- `NEXT_PUBLIC_API_URL` - frontend API base URL

## Product Flow
1. User signs up or logs in
2. User lands directly on Collection Dashboard
3. User adds cards and sees collection value
4. Bottom navigation gives access to Marketplace, Shared Collections, and Profile

## Suggested Next Steps
1. Wire database with Prisma migrations
2. Add real auth provider
3. Add image upload pipeline
4. Add pricing integrations
5. Add websocket chat for marketplace
