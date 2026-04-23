import { Router } from 'express';
import { z } from 'zod';
import { collectionService } from '../../services/collection.service.js';

export const collectionRouter = Router();

const createItemSchema = z.object({
  collectionId: z.string().min(1),
  cardExternalId: z.string().min(1),
  cardName: z.string().min(1),
  setName: z.string().optional(),
  rarity: z.string().optional(),
  condition: z.enum(['MINT', 'NEAR_MINT', 'LIGHTLY_PLAYED', 'MODERATELY_PLAYED', 'HEAVILY_PLAYED', 'DAMAGED', 'AUTHENTICATED']),
  quantity: z.number().int().positive().default(1),
  notes: z.string().optional()
});

collectionRouter.get('/:collectionId', async (req, res) => {
  const result = await collectionService.getCollectionOverview(req.params.collectionId);
  res.json(result);
});

collectionRouter.post('/cards', async (req, res) => {
  const parsed = createItemSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const card = await collectionService.addCollectionCard(parsed.data);
  return res.status(201).json({ message: 'Card added to collection', card });
});
