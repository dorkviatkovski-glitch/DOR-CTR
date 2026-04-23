import cors from 'cors';
import express from 'express';
import { errorHandler } from './middleware/error-handler.js';
import { authRouter } from './modules/auth/auth.router.js';
import { collectionRouter } from './modules/collection/collection.router.js';
import { healthRouter } from './modules/health/health.router.js';
import { marketplaceRouter } from './modules/marketplace/marketplace.router.js';
import { pricingRouter } from './modules/pricing/pricing.router.js';
import { profileRouter } from './modules/profile/profile.router.js';
import { sharedRouter } from './modules/shared/shared.router.js';

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/health', healthRouter);
  app.use('/auth', authRouter);
  app.use('/collection', collectionRouter);
  app.use('/marketplace', marketplaceRouter);
  app.use('/shared', sharedRouter);
  app.use('/pricing', pricingRouter);
  app.use('/profile', profileRouter);

  app.use(errorHandler);

  return app;
}
