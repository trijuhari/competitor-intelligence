import React from 'react';
import { cn } from './cn';

export type Tone = 'neutral' | 'accent' | 'ok' | 'warn' | 'danger' | 'purple' | 'cyan';

const tones: Record<Tone, string> = {
  neutral: 'bg-sunken text-ink border-line',
  accent: 'bg-accent/10 text-accent border-accent/30 font-semibold',
  ok: 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/40 font-semibold',
  warn: 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/40 font-semibold',
  danger: 'bg-danger/15 text-danger border-danger/35 font-semibold',
  purple: 'bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/35 font-semibold',
  cyan: 'bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border-cyan-500/35 font-semibold',
};

export const Badge: React.FC<{ 
  tone?: Tone; 
  size?: 'xs' | 'sm';
  glow?: boolean;
  className?: string; 
  children: React.ReactNode 
}> = ({
  tone = 'neutral',
  size = 'xs',
  glow: _glow = false,
  className,
  children,
}) => (
  <span
    className={cn(
      'inline-flex items-center gap-1.5 rounded-full border font-medium num whitespace-nowrap transition-all duration-150',
      size === 'xs' ? 'h-5 px-2 text-2xs' : 'h-6 px-2.5 text-xs',
      tones[tone],
      className
    )}
  >
    {children}
  </span>
);

/* -------- Research status (Terverifikasi / Inferensi / Belum) -------- */

export type ResearchStatus = 'Terverifikasi' | 'Inferensi' | 'Belum' | string;

export const statusMeta = (status?: ResearchStatus) => {
  if (status === 'Terverifikasi') {
    return { 
      label: 'Terverifikasi', 
      short: 'Verified', 
      dot: 'bg-emerald-600 dark:bg-emerald-500', 
      text: 'text-emerald-800 dark:text-emerald-300 font-bold', 
      badgeBg: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-800 dark:text-emerald-300 font-bold',
      tone: 'ok' as Tone 
    };
  }
  if (status === 'Inferensi') {
    return { 
      label: 'Inferensi', 
      short: 'Inferensi', 
      dot: 'bg-amber-500', 
      text: 'text-amber-800 dark:text-amber-300 font-bold', 
      badgeBg: 'bg-amber-500/15 border-amber-500/40 text-amber-800 dark:text-amber-300 font-bold',
      tone: 'warn' as Tone 
    };
  }
  return { 
    label: 'Belum Terdata', 
    short: 'Belum', 
    dot: 'bg-slate-400 dark:bg-slate-600', 
    text: 'text-muted', 
    badgeBg: 'bg-sunken border-line text-muted font-medium',
    tone: 'neutral' as Tone 
  };
};

export const StatusDot: React.FC<{ status?: ResearchStatus; pulse?: boolean; className?: string }> = ({ 
  status, 
  pulse = false, 
  className 
}) => {
  const meta = statusMeta(status);
  return (
    <span className="relative inline-flex items-center justify-center shrink-0">
      {pulse && status === 'Terverifikasi' && (
        <span className="absolute inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 opacity-60 animate-ping-slow" />
      )}
      <span className={cn('inline-block w-2 h-2 rounded-full', meta.dot, className)} />
    </span>
  );
};

export const StatusLabel: React.FC<{ status?: ResearchStatus; className?: string }> = ({ status, className }) => {
  const m = statusMeta(status);
  return (
    <span className={cn('inline-flex items-center gap-1.5 text-xs', m.text, className)}>
      <StatusDot status={status} />
      {m.label}
    </span>
  );
};

export const StatusBadge: React.FC<{ status?: ResearchStatus; size?: 'xs' | 'sm'; className?: string }> = ({
  status,
  size = 'xs',
  className
}) => {
  const m = statusMeta(status);
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-medium num whitespace-nowrap transition-all duration-150',
        size === 'xs' ? 'h-5 px-2 text-2xs' : 'h-6 px-2.5 text-xs',
        m.badgeBg,
        className
      )}
    >
      <StatusDot status={status} pulse={status === 'Terverifikasi'} />
      <span>{m.short}</span>
    </span>
  );
};
