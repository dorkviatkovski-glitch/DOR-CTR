# DOR-CTR Project Structure & Content

Generated from the provided starter zip.

### card-platform/package.json
``` json
{
  "name": "card-collection-platform",
  "private": true,
  "version": "0.1.0",
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "dev:web": "npm --workspace @cardx/web run dev",
    "dev:api": "npm --workspace @cardx/api run dev",
    "build": "npm run build --workspaces",
    "lint": "npm run lint --workspaces"
  }
}

```

---
### card-platform/README.md
``` md
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

```

---
### card-platform/apps/api/tsconfig.json
``` json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*.ts"]
}

```

---
### card-platform/apps/api/package.json
``` json
{
  "name": "@cardx/api",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc -p tsconfig.json",
    "lint": "echo 'Add ESLint config'"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.21.2",
    "zod": "^3.24.2"
  },
  "devDependencies": {
    "@types/cors": "^2.8.17",
    "@types/express": "^5.0.1",
    "tsx": "^4.19.3",
    "typescript": "^5.8.2"
  }
}

```

---
### card-platform/apps/api/src/server.ts
``` ts
import cors from 'cors';
import express from 'express';
import { authRouter } from './modules/auth/auth.router.js';
import { collectionRouter } from './modules/collection/collection.router.js';
import { healthRouter } from './modules/health/health.router.js';
import { marketplaceRouter } from './modules/marketplace/marketplace.router.js';
import { pricingRouter } from './modules/pricing/pricing.router.js';
import { profileRouter } from './modules/profile/profile.router.js';
import { sharedRouter } from './modules/shared/shared.router.js';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/health', healthRouter);
app.use('/auth', authRouter);
app.use('/collection', collectionRouter);
app.use('/marketplace', marketplaceRouter);
app.use('/shared', sharedRouter);
app.use('/pricing', pricingRouter);
app.use('/profile', profileRouter);

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});

```

---
### card-platform/apps/api/src/modules/profile/profile.router.ts
``` ts
import { Router } from 'express';

export const profileRouter = Router();

profileRouter.get('/', (_req, res) => {
  res.json({
    user: {
      username: 'dor',
      email: 'dor@example.com'
    },
    stats: {
      collections: 2,
      listingsActive: 4,
      totalPortfolioValue: 27650
    }
  });
});

```

---
### card-platform/apps/api/src/modules/marketplace/marketplace.router.ts
``` ts
import { Router } from 'express';

export const marketplaceRouter = Router();

marketplaceRouter.get('/', (_req, res) => {
  res.json({
    listings: [
      {
        id: 'list_1',
        cardName: 'Pikachu Illustrator',
        price: 250000,
        seller: 'collector_pro',
        condition: 'Authenticated'
      }
    ]
  });
});

marketplaceRouter.post('/listings', (req, res) => {
  return res.status(201).json({
    message: 'Listing created',
    listing: { id: 'list_new', ...req.body, status: 'active' }
  });
});

```

---
### card-platform/apps/api/src/modules/health/health.router.ts
``` ts
import { Router } from 'express';

export const healthRouter = Router();

healthRouter.get('/', (_req, res) => {
  res.json({ status: 'ok', service: 'cardx-api' });
});

```

---
### card-platform/apps/api/src/modules/pricing/pricing.router.ts
``` ts
import { Router } from 'express';

export const pricingRouter = Router();

pricingRouter.get('/cards/:cardId', (req, res) => {
  res.json({
    cardId: req.params.cardId,
    estimatedValue: 3200,
    sourceCount: 14,
    trend: 'up',
    confidence: 'medium'
  });
});

```

---
### card-platform/apps/api/src/modules/auth/auth.router.ts
``` ts
import { Router } from 'express';
import { z } from 'zod';

export const authRouter = Router();

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

authRouter.post('/signup', (req, res) => {
  const parsed = authSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  return res.status(201).json({
    message: 'User created',
    next: '/collection',
    user: { email: parsed.data.email }
  });
});

authRouter.post('/login', (req, res) => {
  const parsed = authSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  return res.json({
    token: 'replace-with-jwt',
    next: '/collection',
    user: { email: parsed.data.email }
  });
});

```

---
### card-platform/apps/api/src/modules/shared/shared.router.ts
``` ts
import { Router } from 'express';

export const sharedRouter = Router();

sharedRouter.get('/collections', (_req, res) => {
  res.json({
    sharedCollections: [
      {
        id: 'shared_1',
        name: 'Family Collection',
        role: 'owner',
        members: 3,
        totalEstimatedValue: 9200
      }
    ]
  });
});

sharedRouter.post('/collections/:id/invite', (req, res) => {
  return res.status(201).json({
    message: 'Invite sent',
    collectionId: req.params.id,
    inviteeEmail: req.body.email,
    role: req.body.role ?? 'viewer'
  });
});

```

---
### card-platform/apps/api/src/modules/collection/collection.router.ts
``` ts
import { Router } from 'express';

export const collectionRouter = Router();

collectionRouter.get('/', (_req, res) => {
  res.json({
    collectionSummary: {
      totalCards: 128,
      totalEstimatedValue: 18450,
      dailyChangePct: 1.7
    },
    cards: [
      {
        id: 'uc_1',
        name: 'Charizard',
        setName: 'Base Set',
        rarity: 'Rare Holo',
        condition: 'PSA 8',
        estimatedValue: 3200
      }
    ]
  });
});

collectionRouter.post('/cards', (req, res) => {
  const card = req.body;
  return res.status(201).json({
    message: 'Card added to collection',
    card: {
      id: 'uc_new',
      ...card,
      estimatedValue: 0,
      pricingStatus: 'pending'
    }
  });
});

collectionRouter.get('/value', (_req, res) => {
  res.json({
    totalEstimatedValue: 18450,
    trend: 'up',
    topMovers: [
      { cardId: 'uc_1', changePct: 8.2 }
    ]
  });
});

```

---
### card-platform/apps/web/tsconfig.json
``` json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "es2022"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve"
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}

```

---
### card-platform/apps/web/next.config.ts
``` ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true
};

export default nextConfig;

```

---
### card-platform/apps/web/package.json
``` json
{
  "name": "@cardx/web",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "15.2.2",
    "react": "19.0.0",
    "react-dom": "19.0.0"
  },
  "devDependencies": {
    "typescript": "^5.8.2",
    "@types/react": "^19.0.12",
    "@types/node": "^22.13.10"
  }
}

```

---
### card-platform/apps/web/app/styles.css
``` css
:root {
  --bg: #0b1020;
  --panel: #131a2e;
  --soft: #95a2c6;
  --text: #f5f7ff;
  --accent: #4f8cff;
  --border: #24304f;
}

* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: var(--bg);
  color: var(--text);
}

a { color: inherit; text-decoration: none; }
button, input {
  font: inherit;
}

.app-shell {
  min-height: 100vh;
  padding: 24px 16px 90px;
}

.page {
  max-width: 720px;
  margin: 0 auto;
}

.auth-page {
  max-width: 420px;
}

.card {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 16px;
}

.hero {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 16px;
}

.form, .stack {
  display: grid;
  gap: 12px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
}

.item-card {
  display: grid;
  gap: 8px;
}

input {
  width: 100%;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: #0f1528;
  color: var(--text);
}

.button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
}

.primary {
  background: var(--accent);
  color: white;
}

.secondary {
  background: transparent;
  color: var(--text);
  border: 1px solid var(--border);
}

.row {
  display: flex;
  gap: 10px;
}

.spread {
  justify-content: space-between;
  align-items: center;
}

.eyebrow {
  color: var(--soft);
  margin: 0;
}

.section-header {
  margin: 20px 0 12px;
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  padding: 12px 16px 20px;
  background: rgba(11, 16, 32, 0.95);
  border-top: 1px solid var(--border);
}

.nav-item {
  text-align: center;
  padding: 10px 8px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 12px;
  color: var(--soft);
}

```

---
### card-platform/apps/web/app/page.tsx
``` tsx
import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/login');
}

```

---
### card-platform/apps/web/app/layout.tsx
``` tsx
import './styles.css';
import { BottomNav } from '../components/BottomNav';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="app-shell">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}

```

---
### card-platform/apps/web/app/profile/page.tsx
``` tsx
export default function ProfilePage() {
  return (
    <section className="page">
      <h1>Profile</h1>
      <div className="stack">
        <article className="card item-card">
          <strong>Dor</strong>
          <span>dor@example.com</span>
        </article>
        <article className="card item-card">
          <strong>Portfolio Value</strong>
          <b>$27,650</b>
        </article>
        <article className="card item-card">
          <strong>Active Listings</strong>
          <b>4</b>
        </article>
      </div>
    </section>
  );
}

```

---
### card-platform/apps/web/app/marketplace/page.tsx
``` tsx
const listings = [
  { id: '1', title: 'Pikachu Illustrator', price: '$250,000', seller: 'collector_pro' },
  { id: '2', title: 'Lugia 1st Edition', price: '$5,200', seller: 'rarevault' }
];

export default function MarketplacePage() {
  return (
    <section className="page">
      <h1>Marketplace</h1>
      <div className="stack">
        {listings.map((listing) => (
          <article key={listing.id} className="card item-card">
            <strong>{listing.title}</strong>
            <span>Seller: {listing.seller}</span>
            <b>{listing.price}</b>
            <div className="row">
              <button className="button secondary">View</button>
              <button className="button primary">Chat</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

```

---
### card-platform/apps/web/app/shared/page.tsx
``` tsx
const collections = [
  { id: '1', name: 'Family Collection', members: 3, role: 'Owner', value: '$9,200' }
];

export default function SharedPage() {
  return (
    <section className="page">
      <div className="row spread">
        <h1>Shared Collections</h1>
        <button className="button primary">Invite</button>
      </div>
      <div className="stack">
        {collections.map((item) => (
          <article key={item.id} className="card item-card">
            <strong>{item.name}</strong>
            <span>{item.members} members</span>
            <span>{item.role}</span>
            <b>{item.value}</b>
          </article>
        ))}
      </div>
    </section>
  );
}

```

---
### card-platform/apps/web/app/login/page.tsx
``` tsx
import Link from 'next/link';

export default function LoginPage() {
  return (
    <section className="page auth-page">
      <h1>Login</h1>
      <form className="card form">
        <input placeholder="Email" />
        <input placeholder="Password" type="password" />
        <Link className="button primary" href="/collection">Login</Link>
      </form>
      <p>
        Need an account? <Link href="/signup">Sign up</Link>
      </p>
    </section>
  );
}

```

---
### card-platform/apps/web/app/signup/page.tsx
``` tsx
import Link from 'next/link';

export default function SignupPage() {
  return (
    <section className="page auth-page">
      <h1>Sign up</h1>
      <form className="card form">
        <input placeholder="Email" />
        <input placeholder="Password" type="password" />
        <input placeholder="Confirm password" type="password" />
        <Link className="button primary" href="/collection">Create account</Link>
      </form>
    </section>
  );
}

```

---
### card-platform/apps/web/app/collection/page.tsx
``` tsx
const cards = [
  { id: '1', name: 'Charizard', setName: 'Base Set', value: '$3,200' },
  { id: '2', name: 'Blastoise', setName: 'Base Set', value: '$1,400' },
  { id: '3', name: 'Venusaur', setName: 'Base Set', value: '$1,150' }
];

export default function CollectionPage() {
  return (
    <section className="page">
      <header className="hero card">
        <div>
          <p className="eyebrow">My Collection</p>
          <h1>$18,450</h1>
          <p>128 cards · +1.7% today</p>
        </div>
        <button className="button primary">+ Add Card</button>
      </header>

      <section className="section-header">
        <h2>Cards</h2>
      </section>

      <div className="grid">
        {cards.map((card) => (
          <article key={card.id} className="card item-card">
            <strong>{card.name}</strong>
            <span>{card.setName}</span>
            <b>{card.value}</b>
          </article>
        ))}
      </div>
    </section>
  );
}

```

---
### card-platform/apps/web/components/BottomNav.tsx
``` tsx
import Link from 'next/link';

const items = [
  { href: '/collection', label: 'Collection' },
  { href: '/marketplace', label: 'Marketplace' },
  { href: '/shared', label: 'Shared' },
  { href: '/profile', label: 'Profile' }
];

export function BottomNav() {
  return (
    <nav className="bottom-nav">
      {items.map((item) => (
        <Link key={item.href} href={item.href} className="nav-item">
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

```

---
### card-platform/packages/config/ARCHITECTURE_NOTES.md
``` md
# Architecture Notes

## Current Direction
- business-grade product, not MVP framing
- login/signup first
- direct landing into collection dashboard
- bottom navigation for collection, marketplace, shared, profile
- valuation treated as first-class domain

## Recommended Backend Evolution
1. Start as modular monolith
2. Add queue for pricing refresh
3. Add websocket for chat
4. Split marketplace/pricing if scale requires it

```

---
### card-platform/packages/types/package.json
``` json
{
  "name": "@cardx/types",
  "version": "0.1.0",
  "private": true,
  "main": "src/index.ts"
}

```

---
### card-platform/packages/types/src/index.ts
``` ts
export type CollectionSummary = {
  totalCards: number;
  totalEstimatedValue: number;
  dailyChangePct: number;
};

export type MarketplaceListing = {
  id: string;
  cardName: string;
  price: number;
  seller: string;
  condition?: string;
};

```

---
### card-platform/docs/REPO_STRUCTURE.md
``` md
# Repository Structure

## apps/api
Backend application with domain modules:
- auth
- collection
- marketplace
- shared
- pricing
- profile

## apps/web
Web application aligned to the approved business flow.

## packages/types
Shared TypeScript models.

```

---
