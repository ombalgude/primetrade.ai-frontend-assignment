import type {
  TaskCreateInput,
  TaskQueryParams,
  TaskUpdateInput,
} from '@repo/common';
import prisma, { Prisma } from '@repo/db';

import { createHttpError } from '../utils/http-error';
import { serializeTask } from '../utils/task';

export const listTasks = async (userId: string, params: TaskQueryParams) => {
  const { page, limit, search, status, priority } = params;
  const where = {
    userId,
    ...(status ? { status } : {}),
    ...(priority ? { priority } : {}),
    ...(search
      ? {
          OR: [
            { title: { contains: search, mode: Prisma.QueryMode.insensitive } },
            {
              description: { contains: search, mode: Prisma.QueryMode.insensitive },
            },
          ],
        }
      : {}),
  };

  const [tasks, total] = await Promise.all([
    prisma.task.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.task.count({ where }),
  ]);

  return {
    data: tasks.map(serializeTask),
    meta: {
      total,
      page,
      pages: Math.ceil(total / limit) || 1,
      limit,
    },
  };
};

export const createTask = async (userId: string, payload: TaskCreateInput) => {
  const task = await prisma.task.create({
    data: {
      ...payload,
      status: payload.status ?? 'PENDING',
      priority: payload.priority ?? 'MEDIUM',
      userId,
    },
  });

  return serializeTask(task);
};

export const updateTask = async (
  userId: string,
  taskId: string,
  payload: TaskUpdateInput,
) => {
  const task = await prisma.task.findUnique({
    where: { id: taskId, userId },
  });

  if (!task) {
    throw createHttpError(404, 'Task not found');
  }

  const updated = await prisma.task.update({
    where: { id: taskId },
    data: payload,
  });

  return serializeTask(updated);
};

export const deleteTask = async (userId: string, taskId: string) => {
  const task = await prisma.task.findUnique({
    where: { id: taskId, userId },
  });

  if (!task) {
    throw createHttpError(404, 'Task not found');
  }

  await prisma.task.delete({ where: { id: taskId } });

  return { success: true };
};

