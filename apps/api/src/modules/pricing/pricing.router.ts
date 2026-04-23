import { Router } from 'express';
import type { PricingEstimate } from '@cardx/types';
import { validate } from '../../middleware/validate.js';
import { cardPricingParamsSchema } from './pricing.dto.js';

export const pricingRouter = Router();

pricingRouter.get('/cards/:cardId', validate(cardPricingParamsSchema), (req, res) => {
  const response: PricingEstimate = {
    cardId: req.params.cardId,
    estimatedValue: 3200,
    sourceCount: 14,
    trend: 'up',
    confidence: 'medium'
  };

  res.json({ data: response });
});
