import { z } from 'zod';

export const createListingSchema = z.object({
  body: z.object({
    cardName: z.string().min(1),
    price: z.number().positive(),
    seller: z.string().min(1),
    condition: z.string().optional()
  }),
  query: z.object({}).optional().default({}),
  params: z.object({}).optional().default({})
});
