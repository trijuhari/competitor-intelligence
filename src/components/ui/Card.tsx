import React from 'react';
import { cn } from './cn';

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn('bg-surface border border-line rounded-lg', className)} {...props} />
);

interface CardHeaderProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ title, description, actions, className }) => (
  <div className={cn('flex items-start justify-between gap-4 px-4 py-3 border-b border-line', className)}>
    <div className="min-w-0">
      <h2 className="text-[13px] font-semibold text-ink">{title}</h2>
      {description && <p className="text-xs text-muted mt-0.5">{description}</p>}
    </div>
    {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
  </div>
);
