import { Router } from 'express';
import { env } from '../../config/env.js';
import type { HealthResponse } from '../../contracts/health.js';

export const healthRouter = Router();

healthRouter.get('/', (_req, res) => {
  const payload: HealthResponse = {
    status: 'ok',
    service: 'cardx-api',
    version: env.API_VERSION,
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  };

  res.json(payload);
});
