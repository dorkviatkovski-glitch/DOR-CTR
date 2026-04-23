import { Router } from 'express';

export const profileRouter = Router();

profileRouter.get('/', (_req, res) => {
  res.json({ message: 'Profile module pending Prisma service wiring.' });
});
