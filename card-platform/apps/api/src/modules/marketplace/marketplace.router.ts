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
