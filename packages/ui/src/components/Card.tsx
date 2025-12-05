import * as React from 'react';
import { cn } from '../lib/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  variant?: 'default' | 'sticky' | 'elevated';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, title, description, children, variant = 'default', ...props }, ref) => {
    const variantClasses = {
      default: 'paper-card',
      sticky: 'sticky-note',
      elevated: 'paper-card shadow-card-hover',
    };

    return (
      <div
        ref={ref}
        className={cn(
          variantClasses[variant],
          'p-6',
          className
        )}
        {...props}
      >
        {(title || description) && (
          <div className="mb-4 space-y-2">
            {title && (
              <h3 className="handwritten-title text-lg">{title}</h3>
            )}
            {description && (
              <p className="text-sm text-soft-gray">{description}</p>
            )}
          </div>
        )}
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
