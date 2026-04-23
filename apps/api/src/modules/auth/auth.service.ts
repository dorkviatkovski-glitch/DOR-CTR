import type { SessionTokens } from '@cardx/types';
import { prisma } from '../../db/prisma.js';
import { UnauthorizedError } from '../../core/errors.js';
import { createAccessToken, createRefreshToken, verifyRefreshToken } from './token.service.js';

type Credentials = {
  email: string;
  password: string;
};

export async function signup(input: Credentials & { displayName: string }) {
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) {
    throw new UnauthorizedError('Email already registered');
  }

  const user = await prisma.user.create({
    data: {
      email: input.email,
      displayName: input.displayName,
      passwordHash: `plain:${input.password}`
    }
  });

  return issueSession(user.id, user.email);
}

export async function login(input: Credentials) {
  const user = await prisma.user.findUnique({ where: { email: input.email } });
  if (!user || user.passwordHash !== `plain:${input.password}`) {
    throw new UnauthorizedError('Invalid credentials');
  }

  return issueSession(user.id, user.email);
}

export async function refresh(refreshToken: string): Promise<SessionTokens> {
  const payload = verifyRefreshToken(refreshToken);
  const session = await prisma.session.findUnique({ where: { id: payload.sessionId } });
  if (!session || session.revokedAt) {
    throw new UnauthorizedError('Session expired');
  }

  return issueSession(payload.sub, session.userEmail, session.id);
}

async function issueSession(userId: string, email: string, existingSessionId?: string): Promise<SessionTokens> {
  const session =
    existingSessionId
      ? await prisma.session.update({
          where: { id: existingSessionId },
          data: { revokedAt: null }
        })
      : await prisma.session.create({
          data: {
            userId,
            userEmail: email
          }
        });

  const accessToken = createAccessToken(userId, email);
  const refreshToken = createRefreshToken(userId, session.id);

  return {
    accessToken,
    refreshToken,
    expiresInSeconds: 900
  };
}
