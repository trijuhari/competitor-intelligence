import React from 'react';
import { cn } from './cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  interactive?: boolean;
  hairline?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  className, 
  hover = false, 
  interactive = false,
  hairline: _hairline,
  ...props 
}) => (
  <div 
    className={cn(
      'bg-surface border border-line rounded-xl shadow-card transition-all duration-200',
      hover && 'hover:border-line-strong hover:shadow-card-hover hover:-translate-y-0.5',
      interactive && 'cursor-pointer hover:border-accent hover:shadow-card-hover hover:-translate-y-0.5 active:scale-[0.99]',
      className
    )} 
    {...props} 
  />
);

interface CardHeaderProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  badge?: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ 
  title, 
  description, 
  actions, 
  badge,
  className 
}) => (
  <div className={cn('flex items-start justify-between gap-4 px-5 py-3.5 border-b border-line', className)}>
    <div className="min-w-0 flex-1">
      <div className="flex items-center gap-2">
        <h2 className="text-sm font-bold text-ink tracking-tight">{title}</h2>
        {badge}
      </div>
      {description && <p className="text-xs text-muted mt-0.5 leading-relaxed">{description}</p>}
    </div>
    {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
  </div>
);
