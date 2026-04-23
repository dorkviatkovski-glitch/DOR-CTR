import { Router } from 'express';
import type { SharedCollection } from '@cardx/types';
import { authenticate } from '../../middleware/authenticate.js';
import { validate } from '../../middleware/validate.js';
import { inviteSchema } from './shared.dto.js';

export const sharedRouter = Router();

sharedRouter.use(authenticate);

sharedRouter.get('/collections', (_req, res) => {
  const sharedCollections: SharedCollection[] = [
    {
      id: 'shared_1',
      name: 'Family Collection',
      role: 'owner',
      members: 3,
      totalEstimatedValue: 9200
    }
  ];

  res.json({ data: { sharedCollections } });
});

sharedRouter.post('/collections/:id/invite', validate(inviteSchema), (req, res) => {
  res.status(201).json({
    data: {
      message: 'Invite sent',
      collectionId: req.params.id,
      inviteeEmail: req.body.email,
      role: req.body.role
    }
  });
});
