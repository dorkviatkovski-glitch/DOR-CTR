import argon2 from 'argon2';
import crypto from 'node:crypto';

type UserCredential = {
  id: string;
  email: string;
  passwordHash: string;
};

type RefreshTokenRecord = {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: Date;
  revokedAt?: Date;
  replacedBy?: string;
};

const users = new Map<string, UserCredential>();
const refreshTokens = new Map<string, RefreshTokenRecord>();

export class AuthRepository {
  async createUser(email: string, passwordHash: string): Promise<UserCredential> {
    const existing = await this.findUserByEmail(email);
    if (existing) {
      throw new Error('USER_EXISTS');
    }

    const user: UserCredential = {
      id: crypto.randomUUID(),
      email,
      passwordHash,
    };

    users.set(user.id, user);
    return user;
  }

  async findUserByEmail(email: string): Promise<UserCredential | null> {
    for (const user of users.values()) {
      if (user.email === email) {
        return user;
      }
    }

    return null;
  }

  async storeRefreshToken(userId: string, rawToken: string, expiresAt: Date): Promise<RefreshTokenRecord> {
    const tokenHash = await argon2.hash(rawToken);
    const record: RefreshTokenRecord = {
      id: crypto.randomUUID(),
      userId,
      tokenHash,
      expiresAt,
    };

    refreshTokens.set(record.id, record);
    return record;
  }

  async revokeRefreshToken(recordId: string, replacedBy?: string): Promise<void> {
    const existing = refreshTokens.get(recordId);
    if (!existing) {
      return;
    }

    existing.revokedAt = new Date();
    existing.replacedBy = replacedBy;
    refreshTokens.set(recordId, existing);
  }

  async consumeRefreshToken(rawToken: string): Promise<RefreshTokenRecord | null> {
    for (const tokenRecord of refreshTokens.values()) {
      const isMatch = await argon2.verify(tokenRecord.tokenHash, rawToken).catch(() => false);
      if (!isMatch) {
        continue;
      }

      if (tokenRecord.revokedAt || tokenRecord.expiresAt <= new Date()) {
        return null;
      }

      return tokenRecord;
    }

    return null;
  }

  async revokeAllUserRefreshTokens(userId: string): Promise<void> {
    for (const [id, tokenRecord] of refreshTokens.entries()) {
      if (tokenRecord.userId === userId && !tokenRecord.revokedAt) {
        tokenRecord.revokedAt = new Date();
        refreshTokens.set(id, tokenRecord);
      }
    }
  }
}
