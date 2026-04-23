import type { AppErrorDto } from '@cardx/types/src/index.js';
import { randomUUID } from 'node:crypto';
import type { NextFunction, Request, Response } from 'express';

export class AppError extends Error {
  status: number;
  code: string;
  details?: unknown;

  constructor(status: number, code: string, message: string, details?: unknown) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export function errorMiddleware(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    const payload: AppErrorDto = {
      code: err.code,
      message: err.message,
      details: err.details,
      requestId: randomUUID()
    };
    return res.status(err.status).json({ error: payload });
  }

  const payload: AppErrorDto = {
    code: 'INTERNAL_ERROR',
    message: 'Unexpected server error',
    requestId: randomUUID()
  };
  return res.status(500).json({ error: payload });
}
