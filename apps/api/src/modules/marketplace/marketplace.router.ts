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
