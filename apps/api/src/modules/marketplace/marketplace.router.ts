import { Router } from 'express';
import { z } from 'zod';
import { marketplaceService } from '../../services/marketplace.service.js';

export const marketplaceRouter = Router();

const createListingSchema = z.object({
  collectionItemId: z.string().min(1),
  sellerId: z.string().min(1),
  askingPriceCents: z.number().int().positive()
});

marketplaceRouter.get('/', async (_req, res) => {
  const listings = await marketplaceService.listListings();
  res.json({ listings });
});

marketplaceRouter.post('/listings', async (req, res) => {
  const parsed = createListingSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  try {
    const listing = await marketplaceService.createListing(parsed.data);
    return res.status(201).json({ message: 'Listing created', listing });
  } catch (error) {
    return res.status(400).json({ error: error instanceof Error ? error.message : 'Unable to create listing' });
  }
});
