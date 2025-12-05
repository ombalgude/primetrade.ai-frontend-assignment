import * as React from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../lib/cn';

export interface ModalProps {
  isOpen: boolean;
  title?: string;
  description?: string;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  description,
  onClose,
  children,
}) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/10 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className={cn(
          'w-full max-w-lg paper-card p-8',
          'animate-in fade-in zoom-in duration-200'
        )}
        onClick={(event) => event.stopPropagation()}
      >
        {(title || description) && (
          <div className="mb-6 space-y-2">
            {title && (
              <h3 className="handwritten-title text-2xl text-ink">{title}</h3>
            )}
            {description && (
              <p className="text-sm text-soft-gray">{description}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </div>,
    document.body
  );
};
