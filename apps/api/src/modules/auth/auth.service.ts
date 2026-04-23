import argon2 from 'argon2';
import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';
import type {
  AuthSuccessResponse,
  LogoutSuccessResponse,
  RefreshSuccessResponse,
} from '@cardx/types';
import type { LoginDto, LogoutDto, RefreshDto, SignupDto } from './auth.dto.js';
import { AuthRepository } from './auth.repository.js';

const ACCESS_TTL_SECONDS = 15 * 60;
const REFRESH_TTL_SECONDS = 60 * 60 * 24 * 7;

const jwtSecret = process.env.JWT_SECRET ?? 'dev-secret-change-me';

export class AuthService {
  constructor(private readonly repository = new AuthRepository()) {}

  async signup(payload: SignupDto): Promise<AuthSuccessResponse> {
    const passwordHash = await argon2.hash(payload.password);
    const user = await this.repository.createUser(payload.email, passwordHash);

    return this.issueAuthTokens(user.id, user.email);
  }

  async login(payload: LoginDto): Promise<AuthSuccessResponse> {
    const user = await this.repository.findUserByEmail(payload.email);
    if (!user) {
      throw new Error('INVALID_CREDENTIALS');
    }

    const isValid = await argon2.verify(user.passwordHash, payload.password).catch(() => false);
    if (!isValid) {
      throw new Error('INVALID_CREDENTIALS');
    }

    return this.issueAuthTokens(user.id, user.email);
  }

  async refresh(payload: RefreshDto): Promise<RefreshSuccessResponse> {
    const tokenRecord = await this.repository.consumeRefreshToken(payload.refreshToken);
    if (!tokenRecord) {
      throw new Error('INVALID_REFRESH_TOKEN');
    }

    const decoded = jwt.verify(payload.refreshToken, jwtSecret) as jwt.JwtPayload;
    const userId = decoded.sub;
    const email = decoded.email;

    if (!userId || typeof email !== 'string') {
      throw new Error('INVALID_REFRESH_TOKEN');
    }

    const nextAuth = await this.issueAuthTokens(userId, email);
    await this.repository.revokeRefreshToken(tokenRecord.id, 'rotated');

    return {
      tokens: nextAuth.tokens,
    };
  }

  async logout(payload: LogoutDto): Promise<LogoutSuccessResponse> {
    const tokenRecord = await this.repository.consumeRefreshToken(payload.refreshToken);
    if (tokenRecord) {
      await this.repository.revokeRefreshToken(tokenRecord.id);
      await this.repository.revokeAllUserRefreshTokens(tokenRecord.userId);
    }

    return { success: true };
  }

  verifyAccessToken(token: string): { sub: string; email: string } {
    const decoded = jwt.verify(token, jwtSecret) as jwt.JwtPayload;
    const sub = decoded.sub;
    const email = decoded.email;

    if (!sub || typeof email !== 'string') {
      throw new Error('INVALID_ACCESS_TOKEN');
    }

    return { sub, email };
  }

  private async issueAuthTokens(userId: string, email: string): Promise<AuthSuccessResponse> {
    const accessToken = jwt.sign({ email }, jwtSecret, {
      subject: userId,
      expiresIn: ACCESS_TTL_SECONDS,
      issuer: 'cardx-api',
      audience: 'cardx-app',
    });

    const refreshToken = jwt.sign({ email, nonce: crypto.randomUUID() }, jwtSecret, {
      subject: userId,
      expiresIn: REFRESH_TTL_SECONDS,
      issuer: 'cardx-api',
      audience: 'cardx-app',
    });

    await this.repository.storeRefreshToken(userId, refreshToken, new Date(Date.now() + REFRESH_TTL_SECONDS * 1000));

    return {
      user: { id: userId, email },
      tokens: {
        accessToken,
        refreshToken,
        expiresInSeconds: ACCESS_TTL_SECONDS,
      },
    };
  }
}
