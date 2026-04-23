import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z.string().url(),
  API_NAME: z.string().min(1).default('cardx-api'),
  API_VERSION: z.string().min(1).default('0.1.0')
});

export type Env = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env);
