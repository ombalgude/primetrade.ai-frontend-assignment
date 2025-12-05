// apps/task-frontend/src/components/tasks/TaskItem.tsx
'use client';

import { Task } from '@repo/db';
import { Button } from '@repo/ui/src/components/Button';
import { useState } from 'react';
import { taskService } from '@/services/task-service';

type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange?: (task: Task) => void;
}

const statusConfig = {
  PENDING: {
    label: 'Pending',
    color: 'bg-yellow-50 border-yellow-300',
    badge: 'bg-yellow-100 text-yellow-800',
  },
  IN_PROGRESS: {
    label: 'In Progress',
    color: 'bg-blue-50 border-blue-300',
    badge: 'bg-accent-blue/10 text-accent-blue',
  },
  COMPLETED: {
    label: 'Completed',
    color: 'bg-green-50 border-green-300',
    badge: 'bg-accent-green/10 text-accent-green',
  },
};

export function TaskItem({ task, onEdit, onDelete, onStatusChange }: TaskItemProps) {
  const [updating, setUpdating] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const config = statusConfig[task.status as keyof typeof statusConfig];

  const handleStatusChange = async (newStatus: Task['status']) => {
    setUpdating(true);
    setMenuOpen(false);
    try {
      const updated = await taskService.updateTask(task.id, { status: newStatus });
      if (onStatusChange) onStatusChange(updated);
    } catch (err) {
      console.error('Failed to update status', err);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <li className={`paper-card p-5 border-l-4 transition-all hover:shadow-card-hover ${config.color}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="handwritten-title text-lg text-ink">{task.title}</h3>
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                disabled={updating}
                className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${config.badge} transition-opacity hover:opacity-80 disabled:opacity-60`}
              >
                {config.label}
                <svg className="inline-block ml-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>

              {menuOpen && (
                <div className="absolute top-full mt-1 right-0 z-50 w-40 rounded-lg bg-white border border-gray-300 shadow-card py-1">
                  {Object.entries(statusConfig).map(([status, cfg]) => (
                    <button
                      key={status}
                      className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors"
                      onClick={() => handleStatusChange(status as Task['status'])}
                    >
                      {cfg.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {task.description && (
            <p className="text-soft-gray text-sm mb-3">{task.description}</p>
          )}

          <div className="flex items-center gap-2 text-xs text-soft-gray/70">
            <span>Created {new Date(task.createdAt).toLocaleDateString()}</span>
            {task.updatedAt && task.updatedAt !== task.createdAt && (
              <>
                <span>•</span>
                <span>Updated {new Date(task.updatedAt).toLocaleDateString()}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex gap-2 shrink-0">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onEdit(task)}
            className="!px-3"
          >
            Edit
          </Button>
          <Button 
            variant="danger" 
            size="sm" 
            onClick={() => onDelete(task.id)}
            className="!px-3"
          >
            Delete
          </Button>
        </div>
      </div>
    </li>
  );
}
