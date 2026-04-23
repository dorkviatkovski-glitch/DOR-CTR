import { Router } from 'express';
import { MarketplaceListingSchema } from '@cardx/types';
import { validateOrThrow } from '../../common/validate.js';
import { getMarketplaceListings } from './domain/marketplace.service.js';

export const marketplaceRouter = Router();

marketplaceRouter.get('/', (_req, res) => {
  res.json(getMarketplaceListings());
});

marketplaceRouter.post('/listings', (req, res) => {
  const listing = validateOrThrow(MarketplaceListingSchema.omit({ id: true }), req.body, 'Invalid listing payload');

  return res.status(201).json({
    message: 'Listing created',
    listing: { id: 'list_new', ...listing, status: 'active' }
  });
});
