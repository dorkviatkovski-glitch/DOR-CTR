import { Router } from 'express';
import { prisma } from '../../db/prisma.js';
import { asyncHandler } from '../../middleware/async-handler.js';

export const healthRouter = Router();

healthRouter.get(
  '/',
  asyncHandler(async (_req, res) => {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      data: {
        status: 'ok',
        service: 'cardx-api',
        dependencies: {
          database: 'ok'
        }
      }
    });
  })
);
