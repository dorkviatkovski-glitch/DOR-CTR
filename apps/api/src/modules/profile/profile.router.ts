import { Router } from 'express';
import { authGuard } from '../../middleware/auth.guard.js';

export const profileRouter = Router();

profileRouter.use(authGuard);

profileRouter.get('/', (req, res) => {
  res.json({
    user: {
      id: req.auth?.userId,
      email: req.auth?.email
    },
    stats: {
      collections: 2,
      listingsActive: 4,
      totalPortfolioValue: 27650
    }
  });
});
