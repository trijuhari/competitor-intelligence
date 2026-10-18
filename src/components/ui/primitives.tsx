import React, { useEffect, useRef, useState } from 'react';
import { cn } from './cn';

/* ---------------- PageHeader ---------------- */

export const PageHeader: React.FC<{
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  leading?: React.ReactNode;
}> = ({ title, description, actions, leading }) => (
  <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between pb-5">
    <div className="flex items-center gap-3 min-w-0">
      {leading}
      <div className="min-w-0">
        <h1 className="text-xl font-semibold text-ink">{title}</h1>
        {description && <p className="text-[13px] text-muted mt-1 max-w-2xl">{description}</p>}
      </div>
    </div>
    {actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
  </div>
);

/* ---------------- Stat ---------------- */

export const Stat: React.FC<{
  label: React.ReactNode;
  value: React.ReactNode;
  hint?: React.ReactNode;
  valueClassName?: string;
  onClick?: () => void;
  className?: string;
}> = ({ label, value, hint, valueClassName, onClick, className }) => {
  const Comp: any = onClick ? 'button' : 'div';
  return (
    <Comp
      onClick={onClick}
      className={cn(
        'text-left px-4 py-3.5 flex flex-col gap-1 min-w-0',
        onClick && 'hover:bg-sunken transition-colors',
        className
      )}
    >
      <span className="text-xs text-muted">{label}</span>
      <span className={cn('text-2xl font-semibold num tracking-tight text-ink', valueClassName)}>{value}</span>
      {hint && <span className="text-xs text-subtle">{hint}</span>}
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
  options: { value: T; label: React.ReactNode }[];
  className?: string;
}) {
  return (
    <div className={cn('inline-flex p-0.5 rounded-md bg-sunken border border-line', className)}>
      {options.map(o => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={cn(
            'h-6 px-2.5 rounded-[5px] text-xs font-medium whitespace-nowrap transition-colors num',
            value === o.value ? 'bg-surface text-ink shadow-subtle' : 'text-muted hover:text-ink'
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/* ---------------- Input / Select ---------------- */

const fieldBase =
  'h-8 rounded-md border border-line bg-surface text-[13px] text-ink placeholder:text-subtle focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-colors';

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { icon?: React.ReactNode }
>(({ className, icon, ...props }, ref) => (
  <div className={cn('relative', className)}>
    {icon && (
      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-subtle [&_svg]:w-3.5 [&_svg]:h-3.5">
        {icon}
      </span>
    )}
    <input ref={ref} className={cn(fieldBase, 'w-full px-2.5', icon && 'pl-8')} {...props} />
  </div>
));
Input.displayName = 'Input';

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = ({ className, children, ...props }) => (
  <select className={cn(fieldBase, 'px-2 pr-7 cursor-pointer', className)} {...props}>
    {children}
  </select>
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
            'absolute z-50 min-w-[200px] bg-surface rounded-lg shadow-pop p-1 animate-fade-in',
            align === 'right' ? 'right-0' : 'left-0',
            side === 'bottom' ? 'top-full mt-1' : 'bottom-full mb-1',
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
      'w-full flex items-center gap-2.5 px-2 h-8 rounded-md text-[13px] text-left transition-colors [&_svg]:w-4 [&_svg]:h-4',
      danger ? 'text-danger hover:bg-danger-soft' : 'text-ink hover:bg-sunken'
    )}
  >
    {icon && <span className={danger ? '' : 'text-muted'}>{icon}</span>}
    <span className="flex-1 truncate">{children}</span>
    {hint && <span className="text-xs text-subtle">{hint}</span>}
  </button>
);

export const MenuSeparator = () => <div className="my-1 h-px bg-line" />;

/* ---------------- Meter (horizontal bar) ---------------- */

export const Meter: React.FC<{
  segments: { value: number; className: string; title?: string }[];
  total: number;
  className?: string;
}> = ({ segments, total, className }) => (
  <div className={cn('flex h-1.5 w-full overflow-hidden rounded-full bg-sunken', className)}>
    {segments.map((s, i) => (
      <div
        key={i}
        title={s.title}
        className={cn('h-full transition-[width] duration-500', s.className)}
        style={{ width: `${(s.value / (total || 1)) * 100}%` }}
      />
    ))}
  </div>
);
