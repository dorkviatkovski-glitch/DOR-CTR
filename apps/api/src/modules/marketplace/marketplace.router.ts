import { Router } from 'express';
import { authGuard } from '../../middleware/auth.guard.js';

export const marketplaceRouter = Router();

marketplaceRouter.get('/', (_req, res) => {
  res.json({
    listings: [
      {
        id: 'list_1',
        cardName: 'Pikachu Illustrator',
        price: 250000,
      }
    ]
  });
});

marketplaceRouter.post('/listings', authGuard, (req, res) => {
  return res.status(201).json({
    message: 'Listing created',
    sellerId: req.auth?.userId,
    listing: { id: 'list_new', ...req.body, status: 'active' }
  });
});
