import { z } from 'zod';

export const taskStatusSchema = z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']);
export const taskPrioritySchema = z.enum(['LOW', 'MEDIUM', 'HIGH']);

export const baseTaskSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(120),
  description: z.string().max(2000).optional().nullable(),
  status: taskStatusSchema,
  priority: taskPrioritySchema,
  dueDate: z.string().datetime().optional().nullable(),
  userId: z.string().uuid(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const createTaskSchema = baseTaskSchema.pick({
  title: true,
  description: true,
  status: true,
  priority: true,
  dueDate: true,
}).partial({
  status: true,
  priority: true,
});

export const updateTaskSchema = createTaskSchema.partial();

export const taskQuerySchema = z.object({
  search: z.string().optional(),
  status: taskStatusSchema.optional(),
  priority: taskPrioritySchema.optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});

export type Task = z.infer<typeof baseTaskSchema>;
export type TaskCreateInput = z.infer<typeof createTaskSchema>;
export type TaskUpdateInput = z.infer<typeof updateTaskSchema>;
export type TaskQueryParams = z.infer<typeof taskQuerySchema>;


