# @cardx/api

Runnable Express + TypeScript API with modular domains:

- auth
- collection
- shared
- marketplace
- pricing
- profile
- health

## Run

```bash
npm install
npm --workspace @cardx/api run prisma:generate
npm --workspace @cardx/api run dev
```

## Persistence

Prisma schema is under `apps/api/prisma/schema.prisma` and uses SQLite by default for local development. It is migration-ready via `prisma migrate dev`.
