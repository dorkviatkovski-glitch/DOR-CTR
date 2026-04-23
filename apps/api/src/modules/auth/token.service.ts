import jwt from 'jsonwebtoken';
import { env } from '../../config/env.js';
import { UnauthorizedError } from '../../core/errors.js';

type AccessPayload = {
  sub: string;
  email: string;
  type: 'access';
};

type RefreshPayload = {
  sub: string;
  sessionId: string;
  type: 'refresh';
};

export function createAccessToken(userId: string, email: string) {
  const payload: AccessPayload = { sub: userId, email, type: 'access' };
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, { expiresIn: env.ACCESS_TOKEN_TTL_SECONDS });
}

export function createRefreshToken(userId: string, sessionId: string) {
  const payload: RefreshPayload = { sub: userId, sessionId, type: 'refresh' };
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: env.REFRESH_TOKEN_TTL_SECONDS });
}

export function verifyAccessToken(token: string): AccessPayload {
  const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET);
  if (typeof decoded !== 'object' || decoded.type !== 'access') {
    throw new UnauthorizedError('Invalid access token');
  }
  return decoded as AccessPayload;
}

export function verifyRefreshToken(token: string): RefreshPayload {
  const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET);
  if (typeof decoded !== 'object' || decoded.type !== 'refresh') {
    throw new UnauthorizedError('Invalid refresh token');
  }
  return decoded as RefreshPayload;
}
