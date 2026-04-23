import { Router } from 'express';
import { authGuard } from '../../middleware/auth.guard.js';

export const collectionRouter = Router();

collectionRouter.use(authGuard);

collectionRouter.get('/', (req, res) => {
  res.json({
    owner: req.auth?.email,
    collectionSummary: {
      totalCards: 128,
      totalEstimatedValue: 18450,
      dailyChangePct: 1.7
    },
  });
});

collectionRouter.post('/cards', (req, res) => {
  return res.status(201).json({
    message: 'Card added to collection',
    ownerId: req.auth?.userId,
    card: {
      id: 'uc_new',
      ...req.body,
      estimatedValue: 0,
      pricingStatus: 'pending'
    }
  });
});
