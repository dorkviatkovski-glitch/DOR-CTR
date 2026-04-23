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

sharedRouter.post('/collections/:id/invite', (req, res) => {
  return res.status(201).json({
    message: 'Invite sent',
    collectionId: req.params.id,
    inviteeEmail: req.body.email,
    role: req.body.role ?? 'viewer'
  });
});

