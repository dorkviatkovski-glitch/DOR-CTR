import { Router } from 'express';
import { asyncHandler } from '../../middleware/async-handler.js';
import { validate } from '../../middleware/validate.js';
import { loginSchema, refreshSchema, signupSchema } from './auth.dto.js';
import * as authService from './auth.service.js';

export const authRouter = Router();

authRouter.post(
  '/signup',
  validate(signupSchema),
  asyncHandler(async (req, res) => {
    const session = await authService.signup(req.body);
    res.status(201).json({ data: session });
  })
);

authRouter.post(
  '/login',
  validate(loginSchema),
  asyncHandler(async (req, res) => {
    const session = await authService.login(req.body);
    res.json({ data: session });
  })
);

authRouter.post(
  '/refresh',
  validate(refreshSchema),
  asyncHandler(async (req, res) => {
    const session = await authService.refresh(req.body.refreshToken);
    res.json({ data: session });
  })
);
