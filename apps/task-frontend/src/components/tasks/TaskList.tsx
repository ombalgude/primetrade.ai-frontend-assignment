// apps/task-frontend/src/components/tasks/TaskList.tsx
 'use client';

import { Task } from '@repo/db';
import { TaskItem } from './TaskItem';
import Skeleton from '@/components/ui/Skeleton';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange?: (task: Task) => void;
}

export function TaskList({ tasks, loading, error, onEdit, onDelete, onStatusChange }: TaskListProps) {
  if (loading) {
    return (
      <div className="py-6">
        <div className="space-y-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <div className="text-center text-soft-gray">Loading your tasks...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="paper-card p-8 border-red-300 bg-red-50">
        <p className="text-red-700 font-semibold">{error}</p>
      </div>
    );
  }

  if (!Array.isArray(tasks)) {
    console.warn('TaskList expected an array for `tasks` but received:', tasks);
    return (
      <div className="paper-card p-8 text-center border-dashed border-gray-400">
        <p className="text-soft-gray">Unable to load tasks.</p>
      </div>
    );
  }

  return (
    <div>
      {tasks.length === 0 ? (
        <div className="paper-card p-12 border-dashed border-2 border-gray-400 text-center">
          <svg className="mx-auto h-12 w-12 text-soft-gray/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-soft-gray text-lg">
            No tasks yet
          </p>
          <p className="text-soft-gray/70 text-sm mt-1">
            Click "Add New Task" to get started!
          </p>
        </div>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
