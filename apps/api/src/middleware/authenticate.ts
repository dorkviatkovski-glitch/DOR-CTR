import type { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../core/errors.js';
import { verifyAccessToken } from '../modules/auth/token.service.js';

export type AuthContext = {
  userId: string;
  email: string;
};

declare global {
  namespace Express {
    interface Request {
      auth?: AuthContext;
    }
  }
}

export function authenticate(req: Request, _res: Response, next: NextFunction) {
  const authHeader = req.header('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    throw new UnauthorizedError('Missing bearer token');
  }

  const token = authHeader.slice('Bearer '.length);
  const payload = verifyAccessToken(token);
  req.auth = {
    userId: payload.sub,
    email: payload.email
  };

  next();
}
