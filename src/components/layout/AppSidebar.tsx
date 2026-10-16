import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BarChart3, Grid3X3, ArrowLeftRight, TrendingUp, Building2, Cpu,
  Compass, DollarSign, Bot, Database, FileSpreadsheet, History,
  ShieldCheck, Activity, PanelLeftClose, Sun, Moon, LogOut,
  ArrowUpRight, Shield, Layers
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
    setIsSidebarOpen,
    theme,
    toggleTheme,
    logout
  } = useApp();

  const isRoleAdmin = currentUser.role === 'Admin';

  // Primary Analytics & Executive Navigation Items
  const primaryNavItems = [
    {
      id: 'exec',
      label: 'Executive Overview',
      caption: 'Dashboard Direksi & Dewan',
      path: '/executive/dashboard',
      icon: BarChart3
    },
    {
      id: 'matrix',
      label: 'Matriks Riset (408)',
      caption: 'Sheet Riset Kapabilitas 6 Bank',
      path: '/analyst/matrix',
      icon: Grid3X3,
      badge: `${researchItems.length}`,
      badgeColor: 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300'
    },
    {
      id: 'h2h',
      label: 'Head-to-Head Battlecard',
      caption: 'Komparasi Langsung 2 Bank',
      path: '/analyst/head-to-head',
      icon: ArrowLeftRight
    },
    {
      id: 'gap',
      label: 'Gap Analysis',
      caption: 'Peluang & Kelemahan BRI',
      path: '/analyst/gap-analysis',
      icon: TrendingUp
    },
    {
      id: 'banks',
      label: 'Profil 6 Bank',
      caption: 'Struktur Arsitektur Bank',
      path: '/analyst/banks',
      icon: Building2
    },
    {
      id: 'tech',
      label: 'Katalog Kapabilitas',
      caption: 'Daftar Teknologi Terpasang',
      path: '/analyst/tech-catalog',
      icon: Cpu
    },
    {
      id: 'decision-matrix',
      label: 'Decision Matrix',
      caption: 'Matriks Keputusan Strategis',
      path: '/analyst/decision-matrix',
      icon: Compass
    },
    {
      id: 'tco-simulator',
      label: 'TCO Cost Simulator',
      caption: 'Simulasi Biaya & Investasi',
      path: '/analyst/tco-simulator',
      icon: DollarSign
    },
    {
      id: 'genai-readiness',
      label: 'GenAI Readiness',
      caption: 'Evaluasi Kesiapan AI 6 Bank',
      path: '/analyst/genai-readiness',
      icon: Bot
    }
  ];

  // Admin Governance Modules
  const adminNavSections = [
    {
      group: 'MODUL TATA KELOLA DATA',
      items: [
        {
          id: 'findings',
          label: 'Temuan Riset (408)',
          caption: 'Matriks Kapabilitas 6 Bank',
          path: '/admin/findings',
          icon: Database,
          badge: `${researchItems.length}`,
          badgeColor: 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300'
        },
        {
          id: 'sync',
          label: 'Sinkronisasi & Backup',
          caption: 'Google Sheets & Cadangan',
          path: '/admin/sync',
          icon: FileSpreadsheet,
          badge: isSyncing ? 'Syncing...' : 'Live',
          badgeColor: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300'
        }
      ]
    },
    {
      group: 'KEPATUHAN & AUDIT TRAIL',
      items: [
        {
          id: 'audit',
          label: 'Log Audit Trail',
          caption: 'Jejak Perubahan Sistem',
          path: '/admin/audit-logs',
          icon: History,
          badge: `${auditLogs.length}`,
          badgeColor: 'bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300'
        },
        {
          id: 'checklist',
          label: 'Checklist Kesiapan',
          caption: 'Workshop & Tata Kelola Direksi',
          path: '/admin/checklist',
          icon: ShieldCheck,
          badge: '100% Siap',
          badgeColor: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300'
        }
      ]
    }
  ];

  const isItemActive = (itemPath: string) => {
    if (itemPath === '/admin/findings') {
      return currentPath === '/admin' || currentPath.startsWith('/admin/findings');
    }
    return currentPath === itemPath || (itemPath !== '/' && currentPath.startsWith(itemPath));
  };

  return (
    <aside className="w-full lg:w-72 xl:w-80 shrink-0 transition-all duration-300 ease-in-out animate-in fade-in slide-in-from-left-4">
      <div className="sticky top-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-card space-y-4 max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-thin">
        {/* Sidebar Header & Collapse Toggle */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-blue-900 dark:from-slate-800 dark:via-blue-950 dark:to-slate-900 text-white shadow-md shadow-blue-950/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-sm shadow-inner">
                🏦
              </div>
              <div>
                <h3 className="font-extrabold text-sm tracking-tight text-white leading-tight">Navigasi Sistem</h3>
                <p className="text-[10px] text-blue-200/80 font-medium">BRI Competitor Intelligence</p>
              </div>
            </div>

            {/* Collapse Sidebar Button */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-blue-100 hover:text-white text-xs font-bold transition-all active:scale-95"
              title="Sembunyikan Sidebar Navigasi"
              aria-label="Collapse sidebar"
            >
              <PanelLeftClose className="w-3.5 h-3.5" />
              <span className="text-[10px]">Tutup</span>
            </button>
          </div>
        </div>

        {/* --------------------------------------------------- */}
        {/* SECTION 1: PORTAL & ANALITIK UTAMA                  */}
        {/* --------------------------------------------------- */}
        <div className="space-y-1">
          <div className="px-3 text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center justify-between">
            <span>PORTAL & ANALITIK UTAMA</span>
            <span className="text-[9px] text-blue-600 dark:text-blue-400 font-extrabold">Navigasi</span>
          </div>
          <div className="space-y-1">
            {primaryNavItems.map(item => {
              const Icon = item.icon;
              const active = isItemActive(item.path);

              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center justify-between p-2 rounded-2xl text-left transition-all duration-150 group ${
                    active
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25 font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100/90 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white font-medium'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <div className={`p-1.5 rounded-xl transition ${
                      active
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                    }`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs truncate font-bold leading-tight">
                        {item.label}
                      </div>
                      <div className={`text-[10px] truncate ${
                        active ? 'text-blue-100' : 'text-slate-400 dark:text-slate-500'
                      }`}>
                        {item.caption}
                      </div>
                    </div>
                  </div>

                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold shrink-0 ml-2 ${
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
          <div className="space-y-4 pt-2 border-t border-slate-200/80 dark:border-slate-800/80">
            {adminNavSections.map((sec, idx) => (
              <div key={idx} className="space-y-1">
                <div className="px-3 text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center justify-between">
                  <span>{sec.group}</span>
                  <span className="text-[9px] text-amber-600 dark:text-amber-400 font-extrabold">Admin</span>
                </div>
                <div className="space-y-1">
                  {sec.items.map(tab => {
                    const Icon = tab.icon;
                    const active = isItemActive(tab.path);

                    return (
                      <button
                        key={tab.id}
                        onClick={() => navigate(tab.path)}
                        className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-left transition-all duration-150 group ${
                          active
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25 font-bold'
                            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white font-medium'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5 min-w-0">
                          <div className={`p-1.5 rounded-xl transition ${
                            active 
                              ? 'bg-white/20 text-white' 
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs truncate font-bold leading-tight">
                              {tab.label}
                            </div>
                            <div className={`text-[10px] truncate ${
                              active ? 'text-blue-100' : 'text-slate-400 dark:text-slate-500'
                            }`}>
                              {tab.caption}
                            </div>
                          </div>
                        </div>

                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold shrink-0 ml-2 ${
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
            ))}
          </div>
        )}

        {/* --------------------------------------------------- */}
        {/* SECTION 3: SERVER MONITOR STATUS CARD               */}
        {/* --------------------------------------------------- */}
        <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800/80 space-y-2">
          <div className="p-3 rounded-2xl bg-slate-50/90 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Activity className="w-3 h-3 text-blue-500" />
                Status Server
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-600 dark:text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Online
              </span>
            </div>

            <div className="space-y-1 text-[11px]">
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                <span>SQLite Database:</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {isDbConnected ? '408 Records Live' : 'Offline'}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                <span>Google Sheet:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {isSyncing ? 'Sinkronisasi...' : 'Terkoneksi'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsSyncModalOpen(true)}
              className="w-full mt-1 py-1.5 px-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center justify-center space-x-1.5 shadow-xs transition active:scale-95"
            >
              <FileSpreadsheet className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>Panel Sinkronisasi Sheet</span>
            </button>
          </div>

          {/* User Profile & Quick Actions */}
          <div className="p-2.5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2 truncate">
              <span className="text-base">{currentUser.avatar || '👤'}</span>
              <div className="truncate">
                <div className="font-bold text-slate-800 dark:text-slate-200 truncate text-[11px]">{currentUser.nama}</div>
                <div className="text-[10px] text-blue-600 dark:text-blue-400 font-extrabold uppercase">{currentUser.role}</div>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={toggleTheme}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-amber-400 transition"
                title={theme === 'dark' ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
              >
                {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={logout}
                className="p-1.5 rounded-lg border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition"
                title="Keluar dari akun"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
