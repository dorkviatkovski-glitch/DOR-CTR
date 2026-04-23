import type { NextFunction, Request, Response } from 'express';
import { ApiError } from '../contracts/api-error.js';

export function notFoundHandler(_req: Request, _res: Response, next: NextFunction): void {
  next(new ApiError(404, 'NOT_FOUND', 'Requested resource was not found'));
}

export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction): void {
  const requestId = req.header('x-request-id') ?? undefined;

  if (err instanceof ApiError) {
    res.status(err.statusCode).json(err.toJSON(requestId));
    return;
  }

  const fallback = new ApiError(500, 'INTERNAL_SERVER_ERROR', 'Unexpected server error');
  res.status(500).json(fallback.toJSON(requestId));
}
