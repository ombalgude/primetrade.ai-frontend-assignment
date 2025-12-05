import type {
  TaskCreateInput,
  TaskQueryParams,
  TaskUpdateInput,
} from '@repo/common';
import { Request, Response } from 'express';

import { createHttpError } from '../utils/http-error';
import {
  createTask,
  deleteTask,
  listTasks,
  updateTask as updateTaskService,
} from '../services/task.service';
import type { AuthenticatedRequest } from '../types/request';
import { asyncHandler } from '../utils/async-handler';

const getUserId = (req: Request) => {
  const authReq = req as AuthenticatedRequest;
  const userId = authReq.user?.id;
  if (!userId) {
    throw createHttpError(401, 'Authentication required');
  }
  return userId;
};

export const getTasks = asyncHandler(async (req: Request, res: Response) => {
  const userId = getUserId(req);
  const query = req.query as unknown as TaskQueryParams;
  const result = await listTasks(userId, query);
  res.json(result);
});

export const postTask = asyncHandler(async (req: Request, res: Response) => {
  const userId = getUserId(req);
  const payload = req.body as TaskCreateInput;
  const task = await createTask(userId, payload);
  res.status(201).json({ task });
});

export const putTask = asyncHandler(async (req: Request, res: Response) => {
  const userId = getUserId(req);
  const payload = req.body as TaskUpdateInput;
  const taskId = req.params.id;
  const task = await updateTaskService(userId, taskId, payload);
  res.json({ task });
});

export const removeTask = asyncHandler(async (req: Request, res: Response) => {
  const userId = getUserId(req);
  const taskId = req.params.id;
  const result = await deleteTask(userId, taskId);
  res.status(200).json(result);
});

