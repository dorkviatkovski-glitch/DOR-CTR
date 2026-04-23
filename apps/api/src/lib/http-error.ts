import type { AuthErrorResponse } from '@cardx/types';
import type { Response } from 'express';

export const sendAuthError = (
  res: Response,
  status: 401 | 403,
  message: string,
  code: 'UNAUTHORIZED' | 'FORBIDDEN',
  details?: Record<string, unknown>
): Response<AuthErrorResponse> => {
  return res.status(status).json({
    error: {
      code,
      message,
      ...(details ? { details } : {})
    }
  });
};
