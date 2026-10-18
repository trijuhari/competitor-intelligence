import React from 'react';
import { cn } from './cn';

export type Tone = 'neutral' | 'accent' | 'ok' | 'warn' | 'danger';

const tones: Record<Tone, string> = {
  neutral: 'bg-sunken text-muted border-line',
  accent: 'bg-accent-soft text-accent border-accent/20',
  ok: 'bg-ok-soft text-ok border-ok/20',
  warn: 'bg-warn-soft text-warn border-warn/20',
  danger: 'bg-danger-soft text-danger border-danger/20',
};

export const Badge: React.FC<{ tone?: Tone; className?: string; children: React.ReactNode }> = ({
  tone = 'neutral',
  className,
  children,
}) => (
  <span
    className={cn(
      'inline-flex items-center gap-1 h-5 px-1.5 rounded border text-2xs font-medium num whitespace-nowrap',
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
  if (status === 'Terverifikasi') return { label: 'Terverifikasi', short: 'Verified', dot: 'bg-ok', text: 'text-ok', tone: 'ok' as Tone };
  if (status === 'Inferensi') return { label: 'Inferensi', short: 'Inferensi', dot: 'bg-warn', text: 'text-warn', tone: 'warn' as Tone };
  return { label: 'Belum', short: 'Belum', dot: 'bg-line-strong', text: 'text-subtle', tone: 'neutral' as Tone };
};

export const StatusDot: React.FC<{ status?: ResearchStatus; className?: string }> = ({ status, className }) => (
  <span className={cn('inline-block w-1.5 h-1.5 rounded-full shrink-0', statusMeta(status).dot, className)} />
);

export const StatusLabel: React.FC<{ status?: ResearchStatus; className?: string }> = ({ status, className }) => {
  const m = statusMeta(status);
  return (
    <span className={cn('inline-flex items-center gap-1.5 text-xs', m.text, className)}>
      <StatusDot status={status} />
      {m.label}
    </span>
  );
};
