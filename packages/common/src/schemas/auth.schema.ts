import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .max(64, 'Password must be at most 64 characters long');

export const emailSchema = z
  .string()
  .email('Please provide a valid email address')
  .min(5)
  .max(120);

export const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters long')
  .max(64, 'Name must be at most 64 characters long');

export const registerSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const tokenSchema = z.object({
  token: z.string().min(10),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;


