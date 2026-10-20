import React, { useEffect, useRef, useState } from 'react';
import { cn } from './cn';
import { X, ChevronDown } from 'lucide-react';

/* ---------------- PageHeader ---------------- */

export const PageHeader: React.FC<{
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  badge?: React.ReactNode;
  leading?: React.ReactNode;
}> = ({ title, description, actions, badge, leading }) => (
  <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between pb-6">
    <div className="flex items-start gap-3.5 min-w-0">
      {leading && <div className="shrink-0 mt-1">{leading}</div>}
      <div className="min-w-0">
        <div className="flex items-center gap-2.5 flex-wrap">
          <h1 className="text-2xl font-bold tracking-tight text-ink font-sans">{title}</h1>
          {badge}
        </div>
        {description && <p className="text-[13.5px] text-muted mt-1 leading-relaxed max-w-3xl">{description}</p>}
      </div>
    </div>
    {actions && <div className="flex items-center gap-2.5 flex-wrap shrink-0">{actions}</div>}
  </div>
);

/* ---------------- Stat ---------------- */

export const Stat: React.FC<{
  label: React.ReactNode;
  value: React.ReactNode;
  hint?: React.ReactNode;
  icon?: React.ReactNode;
  trend?: { text: string; positive?: boolean };
  badge?: React.ReactNode;
  valueClassName?: string;
  onClick?: () => void;
  className?: string;
}> = ({ label, value, hint, icon, trend, badge, valueClassName, onClick, className }) => {
  const Comp: any = onClick ? 'button' : 'div';
  return (
    <Comp
      onClick={onClick}
      className={cn(
        'group relative text-left p-4 rounded-xl bg-surface border border-line flex flex-col justify-between min-w-0 shadow-card transition-all duration-200',
        onClick && 'cursor-pointer hover:border-line-strong hover:shadow-card-hover hover:-translate-y-0.5 active:scale-[0.99]',
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 mb-2 w-full">
        <span className="text-xs font-medium text-muted tracking-wide truncate">{label}</span>
        {icon && <span className="text-subtle group-hover:text-ink transition-colors [&_svg]:w-4 [&_svg]:h-4">{icon}</span>}
        {badge}
      </div>

      <div className="flex items-baseline gap-2">
        <span className={cn('text-2xl lg:text-3xl font-bold num tracking-tight text-ink', valueClassName)}>{value}</span>
        {trend && (
          <span className={cn(
            'text-2xs font-semibold px-1.5 py-0.5 rounded-full',
            trend.positive ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
          )}>
            {trend.text}
          </span>
        )}
      </div>

      {hint && <div className="text-xs text-subtle mt-1.5 leading-snug">{hint}</div>}
    </Comp>
  );
};

/* ---------------- SegmentedControl ---------------- */

export function SegmentedControl<T extends string>({
  value,
  onChange,
  options,
  className,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: React.ReactNode; count?: number }[];
  className?: string;
}) {
  return (
    <div className={cn('inline-flex p-1 rounded-xl bg-sunken border border-line gap-0.5', className)}>
      {options.map(o => {
        const active = value === o.value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={cn(
              'h-7 px-3 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 num flex items-center gap-1.5',
              active 
                ? 'bg-surface text-ink shadow-sm border border-line font-bold' 
                : 'text-muted hover:text-ink hover:bg-surface/50'
            )}
          >
            <span>{o.label}</span>
            {o.count !== undefined && (
              <span className={cn(
                'text-[10px] px-1.5 py-0.2 rounded-full font-mono',
                active ? 'bg-accent/15 text-accent font-bold' : 'bg-sunken text-subtle'
              )}>
                {o.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ---------------- Input / Select ---------------- */

const fieldBase =
  'h-9 rounded-lg border border-line bg-surface text-[13px] text-ink placeholder:text-subtle focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-150 shadow-xs';

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { icon?: React.ReactNode; onClear?: () => void }
>(({ className, icon, onClear, value, ...props }, ref) => (
  <div className={cn('relative', className)}>
    {icon && (
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-subtle [&_svg]:w-4 [&_svg]:h-4 pointer-events-none">
        {icon}
      </span>
    )}
    <input ref={ref} value={value} className={cn(fieldBase, 'w-full px-3', icon && 'pl-9', onClear && value && 'pr-8')} {...props} />
    {onClear && value && (
      <button
        type="button"
        onClick={onClear}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-subtle hover:text-ink p-0.5 rounded transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    )}
  </div>
));
Input.displayName = 'Input';

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = ({ className, children, ...props }) => (
  <div className="relative inline-block">
    <select className={cn(fieldBase, 'px-3 pr-8 cursor-pointer appearance-none bg-surface', className)} {...props}>
      {children}
    </select>
    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-subtle pointer-events-none" />
  </div>
);

/* ---------------- Menu (click-outside dropdown) ---------------- */

export const Menu: React.FC<{
  trigger: (open: boolean, toggle: () => void) => React.ReactNode;
  children: (close: () => void) => React.ReactNode;
  align?: 'left' | 'right';
  side?: 'top' | 'bottom';
  className?: string;
}> = ({ trigger, children, align = 'right', side = 'bottom', className }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      {trigger(open, () => setOpen(o => !o))}
      {open && (
        <div
          className={cn(
            'absolute z-50 min-w-[210px] bg-surface border border-line rounded-xl shadow-pop p-1.5 animate-fade-in',
            align === 'right' ? 'right-0' : 'left-0',
            side === 'bottom' ? 'top-full mt-1.5' : 'bottom-full mb-1.5',
            className
          )}
        >
          {children(() => setOpen(false))}
        </div>
      )}
    </div>
  );
};

export const MenuItem: React.FC<{
  icon?: React.ReactNode;
  hint?: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
  children: React.ReactNode;
}> = ({ icon, hint, onClick, danger, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'w-full flex items-center gap-2.5 px-2.5 h-8.5 rounded-lg text-[13px] text-left transition-colors [&_svg]:w-4 [&_svg]:h-4',
      danger ? 'text-danger hover:bg-danger/10' : 'text-ink hover:bg-sunken'
    )}
  >
    {icon && <span className={danger ? '' : 'text-muted'}>{icon}</span>}
    <span className="flex-1 truncate font-medium">{children}</span>
    {hint && <span className="text-2xs text-subtle font-mono">{hint}</span>}
  </button>
);

export const MenuSeparator = () => <div className="my-1 h-px bg-line/80" />;

/* ---------------- Meter (horizontal bar) ---------------- */

export const Meter: React.FC<{
  segments: { value: number; className: string; title?: string }[];
  total: number;
  className?: string;
}> = ({ segments, total, className }) => (
  <div className={cn('flex h-2 w-full overflow-hidden rounded-full bg-sunken/80 border border-line/40', className)}>
    {segments.map((s, i) => (
      <div
        key={i}
        title={s.title}
        className={cn('h-full transition-[width] duration-700 ease-out', s.className)}
        style={{ width: `${(s.value / (total || 1)) * 100}%` }}
      />
    ))}
  </div>
);

