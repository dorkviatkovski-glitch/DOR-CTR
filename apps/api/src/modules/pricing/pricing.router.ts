import { Router } from 'express';
import { pricingService } from '../../services/pricing.service.js';

export const pricingRouter = Router();

pricingRouter.get('/collections/:collectionId/portfolio', async (req, res) => {
  const result = await pricingService.getPortfolioTotals(req.params.collectionId);
  res.json(result);
});
