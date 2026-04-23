import { z } from 'zod';

export const inviteSchema = z.object({
  body: z.object({
    email: z.string().email(),
    role: z.enum(['owner', 'editor', 'viewer']).default('viewer')
  }),
  query: z.object({}).optional().default({}),
  params: z.object({
    id: z.string().min(1)
  })
});
