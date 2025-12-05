// apps/task-frontend/src/app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { Task } from '@repo/db';
import { withAuth } from '@/components/auth/withAuth';
import { TaskForm } from '@/components/tasks/TaskForm';
import { TaskList } from '@/components/tasks/TaskList';
import Skeleton from '@/components/ui/Skeleton';
import { useAuthStore } from '@/store/auth-store';
import { Button } from '@repo/ui/src/components/Button';
import { useToast } from '@repo/ui/src/components/Toast';
import { taskService } from '@/services/task-service';

function DashboardPage() {
  const { user, clearAuth } = useAuthStore();
  const { show: showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await taskService.getTasks();
        setTasks(fetchedTasks);
      } catch (err) {
        setError('Failed to fetch tasks.');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskCreated = (newTask: Task) => {
    setTasks((prevTasks) => [newTask, ...prevTasks]);
    showToast({ type: 'success', title: 'Task created successfully!' });
  };

  const handleTaskUpdated = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    showToast({ type: 'success', title: 'Task updated successfully!' });
  };

  const handleDelete = async (id: string) => {
    try {
      await taskService.deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      showToast({ type: 'success', title: 'Task deleted successfully!' });
    } catch (err) {
      showToast({ type: 'error', title: 'Failed to delete task' });
    }
  };

  const handleEdit = (task: Task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleOpenModal = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTaskToEdit(null);
  };

  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const completedTasks = tasks.filter(t => t.status === 'COMPLETED').length;

  return (
    <div className="min-h-screen bg-paper ruled-paper">
      <div className="container mx-auto px-4 py-12 sm:px-6">
        {/* Header section */}
        <div className="mb-12 space-y-2">
          <h1 className="handwritten-title text-5xl text-ink">{today}</h1>
          <p className="text-soft-gray text-lg">Welcome back, <span className="font-semibold text-ink">{user?.name}</span></p>
        </div>

        {/* Stats cards */}
        <div className="mb-12 grid gap-4 sm:grid-cols-3">
          {loading ? (
            <>
              <div className="paper-card p-5"><Skeleton className="h-20" /></div>
              <div className="paper-card p-5"><Skeleton className="h-20" /></div>
              <div className="paper-card p-5"><Skeleton className="h-20" /></div>
            </>
          ) : (
            <>
              <div className="paper-card p-5">
                <p className="text-xs uppercase tracking-wider text-soft-gray font-semibold">Total Tasks</p>
                <p className="mt-2 text-4xl font-bold text-accent-blue">{tasks.length}</p>
              </div>
              <div className="paper-card p-5">
                <p className="text-xs uppercase tracking-wider text-soft-gray font-semibold">Completed</p>
                <p className="mt-2 text-4xl font-bold text-accent-green">{completedTasks}</p>
              </div>
              <div className="paper-card p-5">
                <p className="text-xs uppercase tracking-wider text-soft-gray font-semibold">In Progress</p>
                <p className="mt-2 text-4xl font-bold text-kraft-brown">{tasks.length - completedTasks}</p>
              </div>
            </>
          )}
        </div>

        {/* Action bar */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="handwritten-title text-2xl text-ink">Your Tasks</h2>
          <Button onClick={handleOpenModal} variant="primary">
            + Add New Task
          </Button>
        </div>

        {/* Task list */}
        <TaskList
          tasks={tasks}
          loading={loading}
          error={error}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={handleTaskUpdated}
        />
      </div>

      {/* Task form modal */}
      <TaskForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onTaskCreated={handleTaskCreated}
        onTaskUpdated={handleTaskUpdated}
        taskToEdit={taskToEdit}
      />
    </div>
  );
}

export default withAuth(DashboardPage);

