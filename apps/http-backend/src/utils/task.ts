import type { Task } from '@repo/db';

export type SerializedTask = {
  id: string;
  title: string;
  description?: string | null;
  status: Task['status'];
  priority: Task['priority'];
  dueDate?: Date | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export const serializeTask = (task: Task): SerializedTask => ({
  id: task.id,
  title: task.title,
  description: task.description,
  status: task.status,
  priority: task.priority,
  dueDate: task.dueDate,
  userId: task.userId,
  createdAt: task.createdAt,
  updatedAt: task.updatedAt,
});


