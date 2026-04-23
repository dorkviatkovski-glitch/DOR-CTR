import { Router } from 'express';

export const sharedRouter = Router();

sharedRouter.get('/collections', (_req, res) => {
  res.json({ message: 'Shared collections module pending Prisma service wiring.' });
});
