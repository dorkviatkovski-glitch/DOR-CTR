import { Router } from 'express';

export const sharedRouter = Router();

sharedRouter.get('/collections', (_req, res) => {
  res.json({
    sharedCollections: [
      {
        id: 'shared_1',
        name: 'Family Collection',
        role: 'owner',
        members: 3,
        totalEstimatedValue: 9200
      }
    ]
  });
});
