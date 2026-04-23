import { z } from 'zod';

export const addCardSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    setName: z.string().min(1),
    rarity: z.string().min(1),
    condition: z.string().min(1)
  }),
  query: z.object({}).optional().default({}),
  params: z.object({}).optional().default({})
});
