import { Router } from 'express';
import { z } from 'zod';
import { getSharedCollections } from './domain/shared.service.js';
import { validateOrThrow } from '../../common/validate.js';

export const sharedRouter = Router();

const inviteSchema = z.object({ email: z.string().email(), role: z.string().optional() });

sharedRouter.get('/collections', (_req, res) => {
  res.json(getSharedCollections());
});

sharedRouter.post('/collections/:id/invite', (req, res) => {
  const invite = validateOrThrow(inviteSchema, req.body, 'Invalid invite payload');

  return res.status(201).json({
    message: 'Invite sent',
    collectionId: req.params.id,
    inviteeEmail: invite.email,
    role: invite.role ?? 'viewer'
  });
});
