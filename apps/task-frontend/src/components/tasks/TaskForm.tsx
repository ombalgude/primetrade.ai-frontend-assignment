// apps/task-frontend/src/components/tasks/TaskForm.tsx
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@repo/ui/src/components/Button';
import { Input } from '@repo/ui/src/components/Input';
import { Modal } from '@repo/ui/src/components/Modal';
import { Textarea } from '@repo/ui/src/components/Textarea';
import { taskService } from '@/services/task-service';
import { Task } from '@repo/db';

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskCreated: (task: Task) => void;
  onTaskUpdated: (task: Task) => void;
  taskToEdit?: Task | null;
}

export function TaskForm({
  isOpen,
  onClose,
  onTaskCreated,
  onTaskUpdated,
  taskToEdit,
}: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isEditMode = !!taskToEdit;

  useEffect(() => {
    if (isEditMode) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description || '');
    } else {
      setTitle('');
      setDescription('');
    }
    setError('');
  }, [taskToEdit, isEditMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (isEditMode) {
        const updatedTask = await taskService.updateTask(taskToEdit.id, {
          title,
          description,
        });
        onTaskUpdated(updatedTask);
      } else {
        const newTask = await taskService.createTask({ title, description });
        onTaskCreated(newTask);
      }
      onClose();
    } catch (err) {
      setError(`Failed to ${isEditMode ? 'update' : 'create'} task.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? 'Edit your task' : 'Create a new task'}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="error-stamp bg-red-50 border border-red-300 p-3 rounded-lg text-red-700 w-full">
            {error}
          </div>
        )}
        <Input
          label="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Deploy new feature"
          required
          disabled={loading}
        />
        <Textarea
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., Deploy the new feature to production."
          disabled={loading}
          className="min-h-[120px]"
        />
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading
              ? isEditMode
                ? 'Updating...'
                : 'Creating...'
              : isEditMode
              ? 'Update Task'
              : 'Create Task'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
