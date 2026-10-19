import React from 'react';
import { cn } from './cn';

export type Tone = 'neutral' | 'accent' | 'ok' | 'warn' | 'danger' | 'purple' | 'cyan';

const tones: Record<Tone, string> = {
  neutral: 'bg-sunken text-muted border-line',
  accent: 'bg-accent/10 text-accent border-accent/25 shadow-[0_0_12px_rgba(2,132,199,0.1)]',
  ok: 'bg-ok/10 text-ok border-ok/25 shadow-[0_0_12px_rgba(16,185,129,0.1)]',
  warn: 'bg-warn/10 text-warn border-warn/25 shadow-[0_0_12px_rgba(245,158,11,0.1)]',
  danger: 'bg-danger/10 text-danger border-danger/25 shadow-[0_0_12px_rgba(239,68,68,0.1)]',
  purple: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/25',
  cyan: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/25',
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
  glow = false,
  className,
  children,
}) => (
  <span
    className={cn(
      'inline-flex items-center gap-1.5 rounded-full border font-medium num whitespace-nowrap transition-all duration-150',
      size === 'xs' ? 'h-5 px-2 text-2xs' : 'h-6 px-2.5 text-xs',
      tones[tone],
      glow && tone === 'ok' && 'shadow-glow-emerald',
      glow && tone === 'accent' && 'shadow-glow-blue',
      glow && tone === 'warn' && 'shadow-glow-amber',
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
      dot: 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]', 
      text: 'text-emerald-700 dark:text-emerald-400 font-semibold', 
      badgeBg: 'bg-emerald-500/10 border-emerald-500/25 text-emerald-700 dark:text-emerald-400',
      tone: 'ok' as Tone 
    };
  }
  if (status === 'Inferensi') {
    return { 
      label: 'Inferensi', 
      short: 'Inferensi', 
      dot: 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]', 
      text: 'text-amber-700 dark:text-amber-400 font-semibold', 
      badgeBg: 'bg-amber-500/10 border-amber-500/25 text-amber-700 dark:text-amber-400',
      tone: 'warn' as Tone 
    };
  }
  return { 
    label: 'Belum Terdata', 
    short: 'Belum', 
    dot: 'bg-slate-400 dark:bg-slate-600', 
    text: 'text-muted', 
    badgeBg: 'bg-slate-100 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700/60 text-muted',
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
