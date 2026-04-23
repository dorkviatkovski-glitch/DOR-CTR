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

