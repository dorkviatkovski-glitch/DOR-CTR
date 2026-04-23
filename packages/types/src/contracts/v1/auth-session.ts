export type AuthProvider = 'password' | 'oauth_google' | 'oauth_apple';

export interface UserSession {
  userId: string;
  email: string;
  provider: AuthProvider;
  accessToken: string;
  refreshToken?: string;
  expiresAtIso: string;
}

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface SignupRequestDto {
  email: string;
  password: string;
  displayName?: string;
}

export interface AuthResponseDto {
  session: UserSession;
  nextRoute: '/collection' | '/onboarding';
}
