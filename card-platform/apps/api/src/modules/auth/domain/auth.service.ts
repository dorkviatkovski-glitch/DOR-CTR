import { AuthCredentialsSchema, type AuthCredentialsDto, type AuthResponseDto } from '@cardx/types';
import { AppError } from '../../../common/errors.js';
import { validateOrThrow } from '../../../common/validate.js';

const users = new Map<string, { email: string; password: string }>();

export function signup(payload: unknown): AuthResponseDto {
  const input = validateOrThrow<AuthCredentialsDto>(AuthCredentialsSchema, payload, 'Invalid signup payload');

  if (users.has(input.email)) {
    throw new AppError(409, 'AUTH_ALREADY_EXISTS', 'A user with that email already exists');
  }

  users.set(input.email, input);

  return {
    token: `mock-token-${input.email}`,
    next: '/collection',
    user: { email: input.email }
  };
}

export function login(payload: unknown): AuthResponseDto {
  const input = validateOrThrow<AuthCredentialsDto>(AuthCredentialsSchema, payload, 'Invalid login payload');
  const user = users.get(input.email);

  if (!user || user.password !== input.password) {
    throw new AppError(401, 'AUTH_INVALID_CREDENTIALS', 'Invalid email or password');
  }

  return {
    token: `mock-token-${input.email}`,
    next: '/collection',
    user: { email: input.email }
  };
}
