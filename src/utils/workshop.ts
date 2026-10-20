/**
 * Dynamic Workshop Helper
 * Automatically extracts all unique workshops (WS1, WS2, WS3, WS4, WS5, etc.) from dataset
 */

export interface WorkshopMeta {
  label: string;
  desc: string;
  icon: string;
  color?: string;
  bg?: string;
  border?: string;
  gradient?: string;
}

export const KNOWN_WORKSHOPS: Record<string, WorkshopMeta> = {
  WS1: {
    label: 'Core & Digital Banking',
    desc: 'Core banking, mobile/internet banking, API gateway, payment switch & QRIS.',
    icon: '⚡',
    color: 'text-blue-700 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-950/60',
    border: 'border-blue-200 dark:border-blue-800',
    gradient: 'from-blue-600/20 to-sky-600/10'
  },
  WS2: {
    label: 'EDW, MDM & BI Analytics',
    desc: 'Enterprise data warehouse, master data management, pipeline data & reporting BI.',
    icon: '📊',
    color: 'text-indigo-700 dark:text-indigo-400',
    bg: 'bg-indigo-50 dark:bg-indigo-950/60',
    border: 'border-indigo-200 dark:border-indigo-800',
    gradient: 'from-indigo-600/20 to-purple-600/10'
  },
  WS3: {
    label: 'Cloud, Infra & Observability',
    desc: 'Container platform, hybrid cloud, zero-trust security & APM observability.',
    icon: '☁️',
    color: 'text-emerald-700 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-950/60',
    border: 'border-emerald-200 dark:border-emerald-800',
    gradient: 'from-cyan-600/20 to-teal-600/10'
  },
  WS4: {
    label: 'Big Data, AI & ML',
    desc: 'Event streaming real-time, storage NoSQL, MLOps, LLM & virtual assistant.',
    icon: '🤖',
    color: 'text-purple-700 dark:text-purple-400',
    bg: 'bg-purple-50 dark:bg-purple-950/60',
    border: 'border-purple-200 dark:border-purple-800',
    gradient: 'from-violet-600/20 to-fuchsia-600/10'
  },
  WS5: {
    label: 'Security, Compliance & Governance',
    desc: 'Cyber security, zero trust, audit compliance & risk management.',
    icon: '🛡️',
    color: 'text-amber-700 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-950/60',
    border: 'border-amber-200 dark:border-amber-800',
    gradient: 'from-amber-600/20 to-yellow-600/10'
  },
  WS6: {
    label: 'Open Banking & Ecosystem',
    desc: 'Partner integrations, third-party fintech open APIs & digital ecosystem.',
    icon: '🌐',
    color: 'text-rose-700 dark:text-rose-400',
    bg: 'bg-rose-50 dark:bg-rose-950/60',
    border: 'border-rose-200 dark:border-rose-800',
    gradient: 'from-rose-600/20 to-pink-600/10'
  }
};

/**
 * Returns a human-friendly label for any workshop (e.g. "WS1: Core & Digital Banking", or "WS5" if unknown)
 */
export function getWorkshopLabel(ws: string): string {
  if (!ws) return '';
  const meta = KNOWN_WORKSHOPS[ws.toUpperCase()];
  if (meta) {
    return `${ws}: ${meta.label}`;
  }
  return ws;
}

/**
 * Returns metadata (icon, desc, color) with a sensible fallback for any custom workshop added in Google Sheets
 */
export function getWorkshopMeta(ws: string): WorkshopMeta {
  const normalized = (ws || '').toUpperCase();
  if (KNOWN_WORKSHOPS[normalized]) {
    return KNOWN_WORKSHOPS[normalized];
  }
  return {
    label: ws || 'Workshop',
    desc: `Pilar kapabilitas dan standarisasi arsitektur ${ws}.`,
    icon: '🏛️',
    color: 'text-slate-700 dark:text-slate-300',
    bg: 'bg-slate-100 dark:bg-slate-800',
    border: 'border-slate-200 dark:border-slate-700',
    gradient: 'from-slate-600/20 to-zinc-600/10'
  };
}

/**
 * Extracts and sorts all unique workshops from an array of research items
 */
export function extractUniqueWorkshops(items: Array<{ workshop?: string }>): string[] {
  const set = new Set<string>();
  if (Array.isArray(items)) {
    items.forEach(i => {
      if (i.workshop && typeof i.workshop === 'string' && i.workshop.trim()) {
        set.add(i.workshop.trim());
      }
    });
  }
  
  if (set.size === 0) {
    return ['WS1', 'WS2', 'WS3', 'WS4'];
  }

  return Array.from(set).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}
