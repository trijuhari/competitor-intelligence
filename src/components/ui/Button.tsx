import React from 'react';
import { cn } from './cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'soft' | 'outline';
type Size = 'sm' | 'md' | 'lg' | 'icon';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  glow?: boolean;
}

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-white shadow-sm hover:bg-accent/90 border border-accent font-semibold active:scale-[0.98]',
  secondary: 'bg-surface text-ink border border-line hover:border-line-strong hover:bg-sunken shadow-sm active:scale-[0.98]',
  soft: 'bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 active:scale-[0.98]',
  outline: 'bg-transparent text-ink border border-line hover:border-accent hover:text-accent active:scale-[0.98]',
  ghost: 'text-muted hover:text-ink hover:bg-sunken border border-transparent active:scale-[0.98]',
  danger: 'bg-danger/10 text-danger hover:bg-danger/20 border border-danger/25 active:scale-[0.98]',
};

const sizes: Record<Size, string> = {
  sm: 'h-7 px-2.5 text-xs gap-1.5 rounded-lg',
  md: 'h-8 px-3 text-[13px] gap-2 rounded-lg',
  lg: 'h-10 px-4 text-sm gap-2.5 rounded-xl font-semibold',
  icon: 'h-8 w-8 justify-center rounded-lg',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'secondary', size = 'md', glow = false, className, type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        'inline-flex items-center rounded-lg font-medium whitespace-nowrap transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none [&_svg]:w-4 [&_svg]:h-4 [&_svg]:shrink-0',
        variants[variant],
        sizes[size],
        glow && 'shadow-glow-blue',
        className
      )}
      {...props}
    />
  )
);
Button.displayName = 'Button';
