import { Router } from 'express';

export const pricingRouter = Router();

pricingRouter.get('/cards/:cardId', (req, res) => {
  res.json({
    cardId: req.params.cardId,
    estimatedValue: 3200,
    sourceCount: 14,
    trend: 'up',
    confidence: 'medium'
  });
});
