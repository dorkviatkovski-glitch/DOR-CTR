import { Router } from 'express';
import { addCollectionCard, getCollection, getCollectionValue } from './domain/collection.service.js';

export const collectionRouter = Router();

collectionRouter.get('/', (_req, res) => {
  res.json(getCollection());
});

collectionRouter.post('/cards', (req, res) => {
  const card = addCollectionCard(req.body);
  return res.status(201).json({
    message: 'Card added to collection',
    card
  });
});

collectionRouter.get('/value', (_req, res) => {
  res.json(getCollectionValue());
});
