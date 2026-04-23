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
    topMovers: [{ cardId: 'uc_1', changePct: 8.2 }]
  });
});
