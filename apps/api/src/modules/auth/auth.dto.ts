import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(8)
  .max(128)
  .regex(/[A-Z]/, 'Password must include an uppercase character')
  .regex(/[a-z]/, 'Password must include a lowercase character')
  .regex(/[0-9]/, 'Password must include a number');

export const signupSchema = z.object({
  body: z.object({
    email: z.string().email(),
    displayName: z.string().min(2).max(40),
    password: passwordSchema
  }),
  query: z.object({}).optional().default({}),
  params: z.object({}).optional().default({})
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8)
  }),
  query: z.object({}).optional().default({}),
  params: z.object({}).optional().default({})
});

export const refreshSchema = z.object({
  body: z.object({
    refreshToken: z.string().min(20)
  }),
  query: z.object({}).optional().default({}),
  params: z.object({}).optional().default({})
});
