# Implementation Notes (Baseline)

## Product understanding
CardX is intended as a business-grade card collection platform rather than a thin MVP. The primary user flow is:
1. Sign up or log in.
2. Land directly in the collection dashboard.
3. Add cards and track total portfolio valuation.
4. Use bottom navigation to move between Collection, Marketplace, Shared Collections, and Profile.

Valuation and pricing are first-class capabilities, with marketplace and collaboration as parallel core surfaces.

## Architectural interpretation
- **Repository shape:** Monorepo with `apps/api`, `apps/web`, and shared packages.
- **Backend style:** Modular monolith (`Express`) with route modules per domain (`auth`, `collection`, `marketplace`, `shared`, `pricing`, `profile`, `health`).
- **Frontend style:** `Next.js` app-router pages aligned to core product surfaces and bottom-nav shell.
- **Shared contracts:** `packages/types` for cross-app domain types and eventual API contract consistency.
- **Expected evolution:** Keep a modular monolith baseline, then add async processing (pricing queue), real auth, uploads, and possibly websocket/chat features.

## Domain model summary
Current route and UI behavior imply the following conceptual entities:

- **User**: identity, credentials, profile metadata, portfolio stats.
- **Collection**: owner-scoped card container with aggregate valuation fields.
- **CollectionCard**: card instance inside a user collection (name, set, rarity, condition, estimated value).
- **ValuationSnapshot**: computed value state for collection and trend/movers over time.
- **MarketplaceListing**: listing record tied to seller and card attributes/price/status.
- **SharedCollectionMembership**: relationship between users and shared collections with role semantics.
- **CollectionInvite**: invitation to join shared collection with target email and assigned role.
- **PricingEstimate**: per-card estimate with trend/confidence and provenance/source count.

> Note: These are baseline conceptual entities for traceability; concrete database schema is not yet implemented.

## Execution plan
1. **Baseline hardening**
   - Restore repository files as documented in structure notes.
   - Add missing baseline documentation (this file + traceability matrix).
2. **Contract-first alignment**
   - Expand `packages/types` to cover route payloads/responses.
   - Ensure frontend pages and backend routes map to shared contracts.
3. **Persistence layer introduction**
   - Introduce database schema and migrations for core entities.
   - Replace static/mock response payloads with persisted reads/writes.
4. **Auth and security upgrades**
   - Replace placeholder token behavior with real auth/session flow.
   - Add authorization checks by ownership/role.
5. **Valuation + marketplace maturation**
   - Integrate pricing providers and refresh workflows.
   - Add listing lifecycle, chat/inquiry workflow, and audit events.
6. **Operational readiness**
   - Add robust lint/test pipelines and observability.
   - Prepare deployment/runbook docs by module.

## Gaps/ambiguities
- No concrete DB schema/migration layer currently defined.
- Auth flow is placeholder (no user persistence, hashing, or JWT strategy).
- API contracts exist implicitly in route handlers but are not versioned/spec-generated.
- No explicit error model, rate limits, or role/permission policy documentation.
- Marketplace purchase flow and listing lifecycle transitions are unspecified.
- Shared collection invitation acceptance/revocation workflows are incomplete.
- Pricing data source strategy and staleness/refresh SLAs are undefined.
- Non-functional requirements (SLOs, scale, compliance) are not documented.

## Assumptions
- Current endpoints and UI pages represent approved phase-0 scope.
- A relational DB (e.g., PostgreSQL) with an ORM (e.g., Prisma) is the intended persistence path.
- `packages/types` is the source of truth for app-level TypeScript contracts.
- Routing namespaces in API (`/auth`, `/collection`, etc.) are stable unless a versioning strategy is later introduced.
- Role model for shared collections starts with `owner`, `editor`, and `viewer`.
- Pricing estimates are initially asynchronous/externally sourced and may be eventually consistent.

## Traceability
| Major requirement | Backend modules/routes (target) | Frontend routes/components (target) | Schema entities (target) |
| --- | --- | --- | --- |
| User can sign up and log in | `apps/api/src/modules/auth/auth.router.ts` (`POST /signup`, `POST /login`) | `apps/web/app/signup/page.tsx`, `apps/web/app/login/page.tsx` | `User`, `AuthSession` |
| User lands in collection dashboard post-auth | `auth` response `next: /collection`; `collection` read route (`GET /collection`) | `apps/web/app/collection/page.tsx`, root redirect in `apps/web/app/page.tsx` | `Collection`, `CollectionCard`, `ValuationSnapshot` |
| User can add cards and view valuation | `POST /collection/cards`, `GET /collection`, `GET /collection/value`, `pricing` integration surface | `apps/web/app/collection/page.tsx` (+ add-card interaction) | `CollectionCard`, `PricingEstimate`, `ValuationSnapshot` |
| User can browse and create marketplace listings | `apps/api/src/modules/marketplace/marketplace.router.ts` (`GET /`, `POST /listings`) | `apps/web/app/marketplace/page.tsx` | `MarketplaceListing`, `User` |
| User can access shared collections and invite members | `apps/api/src/modules/shared/shared.router.ts` (`GET /collections`, `POST /collections/:id/invite`) | `apps/web/app/shared/page.tsx` | `SharedCollection`, `SharedCollectionMembership`, `CollectionInvite` |
| User can review profile and high-level stats | `apps/api/src/modules/profile/profile.router.ts` (`GET /`) | `apps/web/app/profile/page.tsx` | `User`, `PortfolioStats` |
| Consistent navigation across major surfaces | N/A (UI shell concern) | `apps/web/components/BottomNav.tsx`, `apps/web/app/layout.tsx` | N/A |
| Platform health visibility for operations | `apps/api/src/modules/health/health.router.ts` (`GET /health`) | N/A | `ServiceHealthCheck` (optional operational table/event) |
