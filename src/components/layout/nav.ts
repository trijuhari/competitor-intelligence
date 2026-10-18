import {
  LayoutDashboard, Grid3X3, ArrowLeftRight, TrendingUp, Layers, Building2, Cpu,
  Database, RefreshCw, History, ListChecks, type LucideIcon
} from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: LucideIcon;
  match: (path: string) => boolean;
}

export interface NavGroup {
  id: string;
  label: string;
  items: NavItem[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    id: 'analysis',
    label: 'Analisis',
    items: [
      {
        id: 'overview',
        label: 'Overview',
        path: '/executive/dashboard',
        icon: LayoutDashboard,
        match: p => p === '/' || p.includes('dashboard'),
      },
      {
        id: 'matrix',
        label: 'Matriks riset',
        path: '/analyst/matrix',
        icon: Grid3X3,
        match: p => p.includes('matrix'),
      },
      {
        id: 'h2h',
        label: 'Head-to-head',
        path: '/analyst/head-to-head',
        icon: ArrowLeftRight,
        match: p => p.includes('head-to-head'),
      },
      {
        id: 'gap',
        label: 'Gap analysis',
        path: '/analyst/gap-analysis',
        icon: TrendingUp,
        match: p => p.includes('gap-analysis'),
      },
      {
        id: 'blueprint',
        label: 'Blueprint arsitektur',
        path: '/analyst/blueprint',
        icon: Layers,
        match: p => p.includes('blueprint'),
      },
    ],
  },
  {
    id: 'reference',
    label: 'Referensi',
    items: [
      {
        id: 'banks',
        label: 'Profil bank',
        path: '/analyst/banks',
        icon: Building2,
        match: p => p.includes('banks'),
      },
      {
        id: 'tech',
        label: 'Katalog kapabilitas',
        path: '/analyst/tech-catalog',
        icon: Cpu,
        match: p => p.includes('tech-catalog'),
      },
    ],
  },
  {
    id: 'admin',
    label: 'Admin',
    items: [
      {
        id: 'findings',
        label: 'Temuan riset',
        path: '/admin/findings',
        icon: Database,
        match: p => p === '/admin' || p.startsWith('/admin/findings'),
      },
      {
        id: 'sync',
        label: 'Sinkronisasi',
        path: '/admin/sync',
        icon: RefreshCw,
        match: p => p.startsWith('/admin/sync'),
      },
      {
        id: 'audit',
        label: 'Audit log',
        path: '/admin/audit',
        icon: History,
        match: p => p.startsWith('/admin/audit'),
      },
      {
        id: 'checklist',
        label: 'Checklist',
        path: '/admin/checklist',
        icon: ListChecks,
        match: p => p.startsWith('/admin/checklist'),
      },
    ],
  },
];

export const findActiveNav = (path: string) => {
  for (const g of NAV_GROUPS) {
    const item = g.items.find(i => i.match(path));
    if (item) return { group: g, item };
  }
  return { group: NAV_GROUPS[0], item: NAV_GROUPS[0].items[0] };
};
