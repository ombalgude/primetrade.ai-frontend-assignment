import * as React from 'react';
import { cn } from '../lib/cn';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <label className="flex flex-col gap-2 text-sm font-medium text-ink">
        {label && <span className="handwritten-title text-base">{label}</span>}
        <textarea
          className={cn(
            'w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-ink shadow-ink-light transition-all duration-120 focus:outline-none focus:border-accent-blue focus:shadow-card focus:ring-2 focus:ring-accent-blue/20 placeholder:text-soft-gray disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-gray-50 resize-vertical',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <span className="error-stamp">{error}</span>
        )}
      </label>
    );
  }
);

Textarea.displayName = 'Textarea';