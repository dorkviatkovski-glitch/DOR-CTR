import { Router } from 'express';
import { sendAuthError } from '../../lib/http-error.js';
import { loginSchema, logoutSchema, refreshSchema, signupSchema } from './auth.dto.js';
import { AuthService } from './auth.service.js';

const authService = new AuthService();

export const authRouter = Router();

authRouter.post('/signup', async (req, res) => {
  const parsed = signupSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  try {
    const response = await authService.signup(parsed.data);
    return res.status(201).json(response);
  } catch (error) {
    if ((error as Error).message === 'USER_EXISTS') {
      return sendAuthError(res, 403, 'User already exists', 'FORBIDDEN');
    }

    throw error;
  }
});

authRouter.post('/login', async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  try {
    const response = await authService.login(parsed.data);
    return res.json(response);
  } catch {
    return sendAuthError(res, 401, 'Invalid credentials', 'UNAUTHORIZED');
  }
});

authRouter.post('/refresh', async (req, res) => {
  const parsed = refreshSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  try {
    const response = await authService.refresh(parsed.data);
    return res.json(response);
  } catch {
    return sendAuthError(res, 401, 'Refresh token is invalid or expired', 'UNAUTHORIZED');
  }
});

authRouter.post('/logout', async (req, res) => {
  const parsed = logoutSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const response = await authService.logout(parsed.data);
  return res.json(response);
});

export { authService };
