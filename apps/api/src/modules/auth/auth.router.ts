import { Router } from 'express';

export const authRouter = Router();

authRouter.get('/', (_req, res) => {
  res.json({ message: 'Auth module uses Prisma-backed services (not yet implemented).' });
});
