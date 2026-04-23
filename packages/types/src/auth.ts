export type AuthErrorCode = 'UNAUTHORIZED' | 'FORBIDDEN';

export interface ErrorEnvelope<TCode extends string = string> {
  error: {
    code: TCode;
    message: string;
    details?: Record<string, unknown>;
  };
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresInSeconds: number;
}

export interface AuthUser {
  id: string;
  email: string;
}

export interface AuthSuccessResponse {
  user: AuthUser;
  tokens: AuthTokens;
}

export interface RefreshSuccessResponse {
  tokens: AuthTokens;
}

export interface LogoutSuccessResponse {
  success: true;
}

export type AuthErrorResponse = ErrorEnvelope<AuthErrorCode>;
