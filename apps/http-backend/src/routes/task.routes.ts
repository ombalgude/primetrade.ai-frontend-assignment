import { Router } from 'express';
import {
  createTaskSchema,
  taskQuerySchema,
  updateTaskSchema,
} from '@repo/common';

import { authenticate } from '../middleware/auth.middleware';
import {
  getTasks,
  postTask,
  putTask,
  removeTask,
} from '../controllers/task.controller';
import {
  validateBody,
  validateQuery,
} from '../middleware/validation.middleware';

const taskRouter = Router();

taskRouter.use(authenticate);
taskRouter.get('/', validateQuery(taskQuerySchema), getTasks);
taskRouter.post('/', validateBody(createTaskSchema), postTask);
taskRouter.put('/:id', validateBody(updateTaskSchema), putTask);
taskRouter.delete('/:id', removeTask);

export default taskRouter;

