import type { NextFunction, Request, Response } from 'express';
import { sendAuthError } from '../lib/http-error.js';
import { authService } from '../modules/auth/auth.controller.js';

declare module 'express-serve-static-core' {
  interface Request {
    auth?: {
      userId: string;
      email: string;
    };
  }
}

export const authGuard = (req: Request, res: Response, next: NextFunction): void | Response => {
  const authHeader = req.header('authorization');
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return sendAuthError(res, 401, 'Missing bearer token', 'UNAUTHORIZED');
  }

  try {
    const payload = authService.verifyAccessToken(token);
    req.auth = {
      userId: payload.sub,
      email: payload.email,
    };
    return next();
  } catch {
    return sendAuthError(res, 401, 'Access token is invalid or expired', 'UNAUTHORIZED');
  }
};
