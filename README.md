# DOR-CTR / CardX Platform

Baseline production infrastructure for a TypeScript monorepo with API + shared packages.

## Monorepo Layout

```text
card-platform/
  apps/
    api/           Express API with startup env validation + standardized errors
    web/           Web workspace placeholder
  packages/
    types/         Shared API contracts
    config/        Shared config workspace placeholder
  prisma/          Prisma schema + SQL migrations
```

## Local Development Runbook

### 1) Install dependencies

```bash
cd card-platform
npm install
```

### 2) Configure environment

Create `card-platform/.env`:

```dotenv
NODE_ENV=development
PORT=4000
API_NAME=cardx-api
API_VERSION=0.1.0
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/cardx
```

Startup validates required variables in `apps/api/src/config/env.ts` and exits fast on invalid config.

### 3) Prepare database

```bash
npm run db:generate
npm run db:migrate:dev
```

Prisma artifacts:
- Schema: `prisma/schema.prisma`
- Migration SQL: `prisma/migrations/*/migration.sql`

### 4) Start services

```bash
npm run dev:api
```

## Health + Error Contracts

### Health endpoint

- Route: `GET /health`
- Response contract:

```json
{
  "status": "ok",
  "service": "cardx-api",
  "version": "0.1.0",
  "uptimeSeconds": 12,
  "timestamp": "2026-04-23T00:00:00.000Z"
}
```

### Standard error format

All operational and fallback errors are normalized into:

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Requested resource was not found",
    "details": {},
    "requestId": "..."
  }
}
```

## Quality Gates

Run from `card-platform/`:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

These scripts are available at root and each workspace package.

## Architecture Boundaries

- `apps/api` owns transport (Express), env/bootstrap, and HTTP concerns.
- `apps/api/src/contracts` defines transport-level response contracts.
- `apps/api/src/db` is the only location creating a Prisma client.
- `packages/types` holds shared type contracts for cross-workspace use.
- `prisma` owns data model and migration history.

This keeps domain/service logic isolated from infra concerns and enables future extraction into separate services.
