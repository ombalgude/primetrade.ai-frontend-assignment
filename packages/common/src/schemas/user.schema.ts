import { z } from 'zod';
import { emailSchema, nameSchema } from './auth.schema';

export const userProfileSchema = z.object({
  id: z.string().uuid(),
  email: emailSchema,
  name: nameSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const userProfileUpdateSchema = z.object({
  name: nameSchema.optional(),
});

export type UserProfile = z.infer<typeof userProfileSchema>;
export type UserProfileUpdateInput = z.infer<typeof userProfileUpdateSchema>;


