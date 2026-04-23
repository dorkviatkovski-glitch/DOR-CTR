import { AuthRequest, AuthResponse, LoginResponse } from '@cardx/types';
import { apiRequest } from '@/features/shared/api-client';

export function signup(payload: AuthRequest) {
  return apiRequest<AuthResponse, AuthRequest>('/auth/signup', {
    method: 'POST',
    body: payload
  });
}

export function login(payload: AuthRequest) {
  return apiRequest<LoginResponse, AuthRequest>('/auth/login', {
    method: 'POST',
    body: payload
  });
}
