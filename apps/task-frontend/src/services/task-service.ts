// apps/task-frontend/src/services/task-service.ts
import {
  TaskCreateInput as CreateTaskSchema,
  TaskUpdateInput as UpdateTaskSchema,
} from '@repo/common/src/schemas/task.schema';
import { api } from '@/lib/api';

export const taskService = {
  getTasks: async () => {
    const { data } = await api.get('/tasks');
    // backend returns { data: Task[], meta: { ... } }
    return data.data;
  },

  createTask: async (task: CreateTaskSchema) => {
    const { data } = await api.post('/tasks', task);
    // backend returns { task }
    return data.task;
  },

  updateTask: async (id: string, task: UpdateTaskSchema) => {
    const { data } = await api.put(`/tasks/${id}`, task);
    // backend returns { task }
    return data.task;
  },

  deleteTask: async (id: string) => {
    const { data } = await api.delete(`/tasks/${id}`);
    return data;
  },
};
