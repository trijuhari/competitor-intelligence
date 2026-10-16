import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BarChart3, Grid3X3, ArrowLeftRight, TrendingUp, Building2, Cpu,
  Database, FileSpreadsheet, History, ShieldCheck, PanelLeftClose
} from 'lucide-react';

export const AppSidebar: React.FC = () => {
  const { 
    currentPath, 
    navigate, 
    currentUser, 
    researchItems, 
    auditLogs, 
    isSyncing, 
    isDbConnected, 
    setIsSyncModalOpen,
    setIsSidebarOpen
  } = useApp();

  const isRoleAdmin = currentUser.role === 'Admin';

  // Primary Analytics Navigation Items
  const primaryNavItems = [
    {
      id: 'exec',
      label: 'Executive Overview',
      path: '/executive/dashboard',
      icon: BarChart3
    },
    {
      id: 'matrix',
      label: 'Matriks Riset (408)',
      path: '/analyst/matrix',
      icon: Grid3X3,
      badge: `${researchItems.length}`,
      badgeColor: 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300'
    },
    {
      id: 'h2h',
      label: 'Head-to-Head Battlecard',
      path: '/analyst/head-to-head',
      icon: ArrowLeftRight
    },
    {
      id: 'gap',
      label: 'Gap Analysis',
      path: '/analyst/gap-analysis',
      icon: TrendingUp
    },
    {
      id: 'banks',
      label: 'Profil 6 Bank',
      path: '/analyst/banks',
      icon: Building2
    },
    {
      id: 'tech',
      label: 'Katalog Kapabilitas',
      path: '/analyst/tech-catalog',
      icon: Cpu
    }
  ];

  // Admin Governance Modules
  const adminNavItems = [
    {
      id: 'findings',
      label: 'Temuan Riset (408)',
      path: '/admin/findings',
      icon: Database,
      badge: `${researchItems.length}`,
      badgeColor: 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300'
    },
    {
      id: 'sync',
      label: 'Sinkronisasi & Backup',
      path: '/admin/sync',
      icon: FileSpreadsheet,
      badge: isSyncing ? 'Syncing...' : 'Live',
      badgeColor: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300'
    },
    {
      id: 'audit',
      label: 'Log Audit Trail',
      path: '/admin/audit-logs',
      icon: History,
      badge: `${auditLogs.length}`,
      badgeColor: 'bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300'
    },
    {
      id: 'checklist',
      label: 'Checklist Kesiapan',
      path: '/admin/checklist',
      icon: ShieldCheck,
      badge: '100%',
      badgeColor: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300'
    }
  ];

  const isItemActive = (itemPath: string) => {
    if (itemPath === '/admin/findings') {
      return currentPath === '/admin' || currentPath.startsWith('/admin/findings');
    }
    return currentPath === itemPath || (itemPath !== '/' && currentPath.startsWith(itemPath));
  };

  return (
    <aside className="w-full lg:w-64 xl:w-72 shrink-0 transition-all duration-300 ease-in-out">
      {/* Sidebar Card without any scrollbar */}
      <div className="sticky top-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl border border-slate-200/80 dark:border-slate-800 p-3.5 shadow-card space-y-3 select-none">
        {/* Compact Sidebar Header & Collapse Toggle */}
        <div className="p-2.5 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-blue-900 dark:from-slate-800 dark:via-blue-950 dark:to-slate-900 text-white shadow-md shadow-blue-950/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 min-w-0">
              <span className="text-base">🏦</span>
              <div className="min-w-0">
                <h3 className="font-extrabold text-xs tracking-tight text-white leading-tight truncate">Navigasi Sistem</h3>
                <p className="text-[10px] text-blue-200/80 font-medium truncate">BRI Competitor Intel</p>
              </div>
            </div>

            {/* Collapse Sidebar Button */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center space-x-1 px-2 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-blue-100 hover:text-white text-[11px] font-bold transition-all active:scale-95 shrink-0"
              title="Sembunyikan Sidebar Navigasi"
              aria-label="Collapse sidebar"
            >
              <PanelLeftClose className="w-3.5 h-3.5" />
              <span>Tutup</span>
            </button>
          </div>
        </div>

        {/* --------------------------------------------------- */}
        {/* SECTION 1: PORTAL & ANALITIK UTAMA                  */}
        {/* --------------------------------------------------- */}
        <div className="space-y-0.5">
          <div className="px-2 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center justify-between">
            <span>PORTAL & ANALITIK</span>
          </div>
          <div className="space-y-0.5">
            {primaryNavItems.map(item => {
              const Icon = item.icon;
              const active = isItemActive(item.path);

              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-left transition-all duration-150 group ${
                    active
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30 font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100/90 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white font-medium'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <div className={`p-1 rounded-lg transition ${
                      active
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                    }`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs truncate font-bold">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`px-1.5 py-0.5 rounded-md text-[9px] font-black shrink-0 ml-1.5 ${
                      active ? 'bg-white/20 text-white' : item.badgeColor
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* --------------------------------------------------- */}
        {/* SECTION 2: MODUL TATA KELOLA (Khusus Administrator) */}
        {/* --------------------------------------------------- */}
        {isRoleAdmin && (
          <div className="space-y-0.5 pt-2 border-t border-slate-200/80 dark:border-slate-800/80">
            <div className="px-2 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center justify-between">
              <span>TATA KELOLA & AUDIT</span>
              <span className="text-[9px] text-amber-600 dark:text-amber-400 font-extrabold">Admin</span>
            </div>
            <div className="space-y-0.5">
              {adminNavItems.map(tab => {
                const Icon = tab.icon;
                const active = isItemActive(tab.path);

                return (
                  <button
                    key={tab.id}
                    onClick={() => navigate(tab.path)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-left transition-all duration-150 group ${
                      active
                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30 font-bold'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white font-medium'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 min-w-0">
                      <div className={`p-1 rounded-lg transition ${
                        active 
                          ? 'bg-white/20 text-white' 
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                      }`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs truncate font-bold">{tab.label}</span>
                    </div>

                    <span className={`px-1.5 py-0.5 rounded-md text-[9px] font-black shrink-0 ml-1.5 ${
                      active 
                        ? 'bg-white/20 text-white' 
                        : tab.badgeColor
                    }`}>
                      {tab.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* --------------------------------------------------- */}
        {/* SECTION 3: SYSTEM STATUS (Clean & Compact)          */}
        {/* --------------------------------------------------- */}
        <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between px-1 text-[11px] text-slate-500 dark:text-slate-400">
          <div className="flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-medium text-[10px]">
              SQLite: <strong className="text-slate-700 dark:text-slate-200 font-bold">{isDbConnected ? '408 Live' : 'Offline'}</strong>
            </span>
          </div>

          <button
            onClick={() => setIsSyncModalOpen(true)}
            className="inline-flex items-center space-x-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition"
            title="Buka panel sinkronisasi Google Sheet"
          >
            <FileSpreadsheet className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>Sync Sheet</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
