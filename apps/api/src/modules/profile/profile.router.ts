import { Router } from 'express';
import type { ProfileSnapshot } from '@cardx/types';
import { authenticate } from '../../middleware/authenticate.js';

export const profileRouter = Router();

profileRouter.use(authenticate);

profileRouter.get('/', (req, res) => {
  const profile: ProfileSnapshot = {
    user: {
      displayName: 'Dor',
      email: req.auth?.email ?? 'dor@example.com'
    },
    stats: {
      collections: 2,
      listingsActive: 4,
      totalPortfolioValue: 27650
    }
  };

  res.json({ data: profile });
});
