import { z } from 'zod';
import { AppError } from './errors.js';

export function validateOrThrow<T>(schema: z.Schema<T>, payload: unknown, message = 'Validation failed'): T {
  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    throw new AppError(400, 'VALIDATION_ERROR', message, parsed.error.flatten());
  }

  return parsed.data;
}
