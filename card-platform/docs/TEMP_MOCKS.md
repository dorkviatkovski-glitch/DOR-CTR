# Temporary Mocks and Replacement Plan

## Current temporary mocks

1. **Auth token generation**
   - `apps/api/src/modules/auth/domain/auth.service.ts` uses an in-memory user map and returns `mock-token-*` tokens.
2. **Collection data store**
   - `apps/api/src/modules/collection/domain/collection.service.ts` stores cards in memory; data resets on server restart.
3. **Marketplace/shared datasets**
   - `apps/api/src/modules/marketplace/domain/marketplace.service.ts` and `apps/api/src/modules/shared/domain/shared.service.ts` return hard-coded lists.

## Replacement plan

1. Add Prisma models for `User`, `Collection`, `CollectionCard`, `MarketplaceListing`, and `CollectionShare`.
2. Replace in-memory services with repository functions backed by Postgres.
3. Replace mock auth token with signed JWT (or managed auth provider), then validate auth middleware on protected routes.
4. Backfill end-to-end tests that seed data in a test database and verify the same route contracts from `@cardx/types`.
5. Remove hardcoded marketplace/shared responses after query endpoints are wired.
