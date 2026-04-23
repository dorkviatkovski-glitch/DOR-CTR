import { Router } from 'express';
import type { MarketplaceListing } from '@cardx/types';
import { authenticate } from '../../middleware/authenticate.js';
import { validate } from '../../middleware/validate.js';
import { createListingSchema } from './marketplace.dto.js';

export const marketplaceRouter = Router();

marketplaceRouter.get('/', (_req, res) => {
  const listings: MarketplaceListing[] = [
    {
      id: 'list_1',
      cardName: 'Pikachu Illustrator',
      price: 250000,
      seller: 'collector_pro',
      condition: 'Authenticated',
      status: 'active'
    }
  ];

  res.json({ data: { listings } });
});

marketplaceRouter.post('/listings', authenticate, validate(createListingSchema), (req, res) => {
  res.status(201).json({
    data: {
      id: 'list_new',
      ...req.body,
      status: 'active'
    }
  });
});
