'use client';

import * as React from 'react';
import { cn } from '../lib/cn';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
}

interface ToastContextValue {
  messages: ToastMessage[];
  show: (message: Omit<ToastMessage, 'id'>) => void;
  dismiss: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextValue | undefined>(
  undefined
);

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

const typeStyles: Record<ToastType, string> = {
  success: 'border-success bg-surface text-text',
  error: 'border-danger bg-surface text-text',
  info: 'border-primary bg-surface text-text',
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = React.useState<ToastMessage[]>([]);

  const show: ToastContextValue['show'] = React.useCallback((message) => {
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        ...message,
      },
    ]);
  }, []);

  const dismiss: ToastContextValue['dismiss'] = React.useCallback((id) => {
    setMessages((prev) => prev.filter((message) => message.id !== id));
  }, []);

  React.useEffect(() => {
    if (messages.length === 0) return;

    const timers = messages.map((message) =>
      setTimeout(() => dismiss(message.id), 4000)
    );

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [messages, dismiss]);

  return (
    <ToastContext.Provider value={{ messages, show, dismiss }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex flex-col items-center gap-3 px-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              'pointer-events-auto w-full max-w-sm rounded-lg border p-4 shadow-lg',
              typeStyles[message.type]
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">{message.title}</p>
                {message.description && (
                  <p className="mt-1 text-sm text-text-dark">
                    {message.description}
                  </p>
                )}
              </div>
              <button
                className="text-sm font-semibold text-text-muted transition hover:text-text"
                onClick={() => dismiss(message.id)}
              >
                Close
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};


