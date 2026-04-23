import { z } from 'zod';

export const cardPricingParamsSchema = z.object({
  body: z.object({}).optional().default({}),
  query: z.object({}).optional().default({}),
  params: z.object({
    cardId: z.string().min(1)
  })
});
