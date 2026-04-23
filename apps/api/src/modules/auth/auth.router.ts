import { Router } from 'express';
import { z } from 'zod';

export const authRouter = Router();

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

authRouter.post('/signup', (req, res) => {
  const parsed = authSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid auth payload', error: parsed.error.flatten() });
  }

  return res.status(201).json({
    message: 'User created',
    next: '/collection',
    user: { email: parsed.data.email }
  });
});

authRouter.post('/login', (req, res) => {
  const parsed = authSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid auth payload', error: parsed.error.flatten() });
  }

  return res.json({
    token: 'replace-with-jwt',
    next: '/collection',
    user: { email: parsed.data.email }
  });
});
