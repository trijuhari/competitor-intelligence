import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BarChart3, Grid3X3, ArrowLeftRight, Building2, Cpu, 
  TrendingUp, Download, ChevronDown, 
  LogOut, Sun, Moon, Database, RefreshCw, History, ShieldCheck,
  FileSpreadsheet, Layers
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    currentUser, 
    currentPath, 
    navigate, 
    logout, 
    exportDataJSON, 
    exportResearchMatrixCSV,
    researchItems,
    auditLogs,
    isSyncing,
    setIsSyncModalOpen,
    theme,
    toggleTheme
  } = useApp();

  const [exportDropdownOpen, setExportDropdownOpen] = useState(false);
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);

  // Single Role: Administrator
  const roleBadgeInfo = { 
    label: 'Portal Administrator', 
    color: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800' 
  };

  // 1. Menu Portal & Analitik (Primary Header Navigation - shown on all pages)
  const portalNavItems = [
    { 
      path: '/executive/dashboard', 
      label: 'Executive Overview', 
      icon: BarChart3,
      isActive: currentPath === '/executive/dashboard' || currentPath === '/' || currentPath.includes('dashboard')
    },
    { 
      path: '/analyst/matrix', 
      label: 'Matriks Riset (408)', 
      icon: Grid3X3, 
      badge: `${researchItems.length}`,
      isActive: currentPath.includes('matrix')
    },
    { 
      path: '/analyst/blueprint', 
      label: 'Blueprint Arsitektur', 
      icon: Layers,
      badge: 'Visual',
      isActive: currentPath.includes('blueprint')
    },
    { 
      path: '/analyst/head-to-head', 
      label: 'Head-to-Head Battlecard', 
      icon: ArrowLeftRight,
      isActive: currentPath.includes('head-to-head')
    },
    { 
      path: '/analyst/gap-analysis', 
      label: 'Gap Analysis', 
      icon: TrendingUp,
      isActive: currentPath.includes('gap-analysis')
    },
    { 
      path: '/analyst/banks', 
      label: 'Profil 6 Bank', 
      icon: Building2,
      isActive: currentPath.includes('banks')
    },
    { 
      path: '/analyst/tech-catalog', 
      label: 'Katalog Kapabilitas', 
      icon: Cpu,
      isActive: currentPath.includes('tech-catalog')
    },
  ];

  // 2. Menu Tata Kelola & Audit (Admin Dropdown Items)
  const adminMenuItems = [
    {
      path: '/admin/findings',
      label: 'Temuan Riset (408)',
      icon: Database,
      badge: `${researchItems.length}`,
      badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300'
    },
    {
      path: '/admin/sync',
      label: 'Sinkronisasi & Backup',
      icon: RefreshCw,
      badge: isSyncing ? 'Sync...' : 'Live',
      badgeColor: isSyncing ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300'
    },
    {
      path: '/admin/audit',
      label: 'Log Audit Trail',
      icon: History,
      badge: `${auditLogs.length}`,
      badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300'
    },
    {
      path: '/admin/checklist',
      label: 'Checklist Kesiapan',
      icon: ShieldCheck,
      badge: '100%',
      badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-300'
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors duration-200">
      {/* Top Bar with Branding & Administrator Actions */}
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-3.5 cursor-pointer" onClick={() => navigate('/executive/dashboard')}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#002B49] via-[#00529C] to-blue-500 flex items-center justify-center text-white shadow-md shadow-blue-900/25 ring-1 ring-white/20 shrink-0 transform transition-transform hover:scale-105">
                <span className="text-xl">🏦</span>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-slate-900 via-blue-950 to-blue-800 dark:from-white dark:via-blue-100 dark:to-blue-300 bg-clip-text text-transparent">
                    BRI Competitor Intelligence
                  </span>
                  <span className={`px-2 py-0.5 text-[10px] font-extrabold tracking-wide uppercase rounded-full border shadow-2xs ${roleBadgeInfo.color}`}>
                    {roleBadgeInfo.label}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block"></span>
                  Benchmark Arsitektur Teknologi BRI vs Mandiri, BCA, BNI, BTN & BSI
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions (Export, Theme, Admin Hub Dropdown) */}
          <div className="flex items-center space-x-2">
            {/* Export Menu */}
            <div className="relative">
              <button
                onClick={() => setExportDropdownOpen(!exportDropdownOpen)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-white/70 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-2xs transition-all duration-150"
                title="Ekspor Data"
              >
                <Download className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                <span className="hidden sm:inline">Export</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {exportDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-52 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-800 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 ring-1 ring-black/5"
                  onMouseLeave={() => setExportDropdownOpen(false)}
                >
                  <button
                    onClick={() => { exportResearchMatrixCSV(); setExportDropdownOpen(false); }}
                    className="w-full text-left px-3.5 py-2.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-blue-50/70 dark:hover:bg-slate-800/80 hover:text-blue-700 dark:hover:text-blue-300 flex items-center space-x-2.5 font-medium transition"
                  >
                    <span className="text-base">📊</span>
                    <div>
                      <div className="font-semibold text-slate-800 dark:text-slate-100">Ekspor Riset CSV</div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500">408 kapabilitas × 6 bank</div>
                    </div>
                  </button>
                  <button
                    onClick={() => { exportDataJSON(); setExportDropdownOpen(false); }}
                    className="w-full text-left px-3.5 py-2.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-blue-50/70 dark:hover:bg-slate-800/80 hover:text-blue-700 dark:hover:text-blue-300 flex items-center space-x-2.5 font-medium transition"
                  >
                    <span className="text-base">💾</span>
                    <div>
                      <div className="font-semibold text-slate-800 dark:text-slate-100">Cadangkan Full JSON</div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500">Seluruh tabel & log audit</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Light / Dark Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-white/70 dark:bg-slate-800 text-slate-700 dark:text-amber-300 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-2xs transition-all active:scale-95 duration-150 flex items-center justify-center"
              title={theme === 'dark' ? 'Ganti ke Mode Terang (Light Mode)' : 'Ganti ke Mode Gelap (Dark Mode)'}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 transition-transform duration-300 hover:-rotate-12" />
              )}
            </button>

            {/* Administrator & Tata Kelola Dropdown Trigger */}
            <div className="relative">
              <button
                onClick={() => setIsAdminMenuOpen(!isAdminMenuOpen)}
                className={`flex items-center space-x-2.5 pl-2.5 pr-3 py-1.5 rounded-xl border text-xs font-semibold shadow-2xs transition-all active:scale-95 ${
                  isAdminMenuOpen || currentPath.startsWith('/admin')
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 ring-2 ring-blue-500/20'
                    : 'border-slate-200/80 dark:border-slate-700 bg-white/80 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100'
                }`}
                title="Menu Tata Kelola & Audit Administrator"
              >
                <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center text-sm font-bold shadow-xs shrink-0">
                  👨‍💼
                </div>
                <div className="text-left leading-tight hidden sm:block">
                  <div className="font-extrabold text-xs text-slate-900 dark:text-white flex items-center gap-1">
                    <span>Admin</span>
                    <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${isAdminMenuOpen ? 'rotate-180' : ''}`} />
                  </div>
                  <div className="text-[10px] text-blue-600 dark:text-blue-400 font-extrabold uppercase tracking-wider">
                    Tata Kelola & Audit
                  </div>
                </div>
                <span className="sm:hidden">
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </span>
              </button>

              {/* Backdrop for closing dropdown */}
              {isAdminMenuOpen && (
                <div 
                  className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[1px]" 
                  onClick={() => setIsAdminMenuOpen(false)} 
                />
              )}

              {/* Dropdown Menu Popup */}
              {isAdminMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-slate-200/90 dark:border-slate-800 p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150 ring-1 ring-black/5 space-y-2">
                  {/* Admin User Header Info */}
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-blue-900 text-white shadow-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2.5 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-lg font-bold shadow-sm shrink-0">
                          👨‍💼
                        </div>
                        <div className="min-w-0">
                          <div className="font-extrabold text-xs text-white leading-tight truncate">{currentUser.nama}</div>
                          <div className="text-[10px] text-blue-300 font-mono mt-0.5 truncate">{currentUser.email}</div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-blue-500/30 border border-blue-400/40 text-blue-200 shrink-0">
                        Admin
                      </span>
                    </div>
                  </div>

                  {/* Section: TATA KELOLA & AUDIT */}
                  <div className="space-y-0.5">
                    <div className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center justify-between">
                      <span>TATA KELOLA & AUDIT</span>
                      <span className="text-[9px] text-amber-600 dark:text-amber-400 font-extrabold">ADMIN</span>
                    </div>

                    {adminMenuItems.map(item => {
                      const Icon = item.icon;
                      const isActive = currentPath === item.path;
                      return (
                        <button
                          key={item.path}
                          onClick={() => {
                            navigate(item.path);
                            setIsAdminMenuOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all group ${
                            isActive
                              ? 'bg-blue-600 text-white font-bold shadow-sm'
                              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          <div className="flex items-center space-x-2.5">
                            <div className={`p-1.5 rounded-lg ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'}`}>
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-xs font-semibold">{item.label}</span>
                          </div>
                          <span className={`px-2 py-0.5 rounded-md text-[9px] font-black ${
                            isActive ? 'bg-white/20 text-white' : item.badgeColor
                          }`}>
                            {item.badge}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Quick SQLite Status & Sync Action */}
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 flex items-center justify-between text-[11px]">
                    <div className="flex items-center space-x-1.5 font-bold text-slate-600 dark:text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>SQLite: <strong className="text-slate-900 dark:text-white">{researchItems.length} Live</strong></span>
                    </div>
                    <button
                      onClick={() => {
                        setIsAdminMenuOpen(false);
                        setIsSyncModalOpen(true);
                      }}
                      className="inline-flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 font-bold transition"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5" />
                      <span>Sync Sheet</span>
                    </button>
                  </div>

                  {/* Divider & Tombol Keluar (Disatukan di menu) */}
                  <div className="border-t border-slate-100 dark:border-slate-800 pt-1">
                    <button
                      onClick={() => {
                        setIsAdminMenuOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-left text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition active:scale-98"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Keluar dari Akun (Logout)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Global Navigation Row: PORTAL & ANALITIK (Rendered on ALL pages without sidebar) */}
        <div className="pb-2.5 overflow-x-auto scrollbar-none flex items-center">
          <nav className="inline-flex p-1 bg-slate-100/90 dark:bg-slate-800/90 backdrop-blur rounded-2xl border border-slate-200/70 dark:border-slate-700/70 space-x-1">
            {portalNavItems.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                    item.isActive
                      ? 'bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-300 font-bold shadow-xs ring-1 ring-slate-200/70 dark:ring-slate-600'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-700/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`px-1.5 py-0.2 rounded-md text-[9px] font-black ${
                      item.isActive ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
