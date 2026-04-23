import { Router } from 'express';
import { authGuard } from '../../middleware/auth.guard.js';

export const sharedRouter = Router();

sharedRouter.use(authGuard);

sharedRouter.get('/collections', (req, res) => {
  res.json({
    viewer: req.auth?.email,
    sharedCollections: [
      {
        id: 'shared_1',
        name: 'Family Collection',
        role: 'owner',
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
