import { Router } from 'express';
import type { CollectionDashboard } from '@cardx/types';
import { authenticate } from '../../middleware/authenticate.js';
import { validate } from '../../middleware/validate.js';
import { addCardSchema } from './collection.dto.js';

export const collectionRouter = Router();

const dashboard: CollectionDashboard = {
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
};

collectionRouter.use(authenticate);

collectionRouter.get('/', (_req, res) => {
  res.json({ data: dashboard });
});

collectionRouter.post('/cards', validate(addCardSchema), (req, res) => {
  res.status(201).json({
    data: {
      id: 'uc_new',
      ...req.body,
      estimatedValue: 0,
      pricingStatus: 'pending'
    }
  });
});

collectionRouter.get('/value', (_req, res) => {
  res.json({
    data: {
      totalEstimatedValue: 18450,
      trend: 'up',
      topMovers: [{ cardId: 'uc_1', changePct: 8.2 }]
    }
  });
});
