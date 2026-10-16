import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BarChart3, Grid3X3, ArrowLeftRight, Building2, Cpu, 
  TrendingUp, Shield, Download, CheckCircle2, ChevronDown, 
  LogOut, Lock, User as UserIcon, FileText, Compass, DollarSign, Bot, Database,
  FileSpreadsheet, Sun, Moon, PanelLeftClose, PanelLeftOpen
} from 'lucide-react';
export const Navbar: React.FC = () => {
  const { 
    currentUser, 
    currentPath, 
    navigate, 
    logout, 
    findings,
    isDbConnected,
    exportDataJSON,
    exportMatrixCSV,
    exportResearchMatrixCSV,
    researchItems,
    setIsSyncModalOpen,
    isSyncing,
    theme,
    toggleTheme,
    isSidebarOpen,
    toggleSidebar
  } = useApp();

  const [exportDropdownOpen, setExportDropdownOpen] = useState(false);

  // Stats for badge from 408 capabilities
  const verifiedCount = React.useMemo(() => {
    let count = 0;
    researchItems.forEach(item => {
      Object.values(item.banks).forEach(b => {
        if (b.status === 'Terverifikasi') count++;
      });
    });
    return count;
  }, [researchItems]);

  // Determine nav items based on user role
  const isRoleAdmin = currentUser.role === 'Admin';
  const isRoleAnalyst = currentUser.role === 'Analyst';
  const isRoleExecutive = currentUser.role === 'Viewer';

  const roleBadgeInfo = isRoleAdmin
    ? { label: 'Portal Administrator', color: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800' }
    : isRoleAnalyst
    ? { label: 'Workspace Analis', color: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' }
    : { label: 'Portal Executive', color: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800' };

  return (
    <header className="sticky top-0 z-40 bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors duration-200">
      {/* Top Bar with Branding & Role Context */}
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand & Sidebar Toggle */}
          <div className="flex items-center space-x-3">
            {/* Sidebar Toggle Button */}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-white/70 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 shadow-2xs transition-all active:scale-95 flex items-center justify-center shrink-0"
              title={isSidebarOpen ? "Sembunyikan Sidebar Navigasi" : "Buka Sidebar Navigasi"}
              aria-label="Toggle sidebar"
            >
              {isSidebarOpen ? (
                <PanelLeftClose className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              ) : (
                <PanelLeftOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              )}
            </button>

            <div className="flex items-center space-x-3.5 cursor-pointer" onClick={() => navigate(isRoleAdmin ? '/admin' : isRoleAnalyst ? '/analyst/matrix' : '/executive/dashboard')}>
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

          {/* Quick Metrics & Actions */}
          <div className="flex items-center space-x-2">
            {/* Database Connection Badge */}
            <div className={`hidden lg:flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all ${
              isDbConnected 
                ? 'bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800/80 shadow-2xs' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
            }`}>
              <span className={`w-2 h-2 rounded-full ${isDbConnected ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
              <span>{isDbConnected ? 'SQLite Live' : 'Offline Mode'}</span>
            </div>

            {/* Google Sheets Sync Button */}
            <button
              onClick={() => setIsSyncModalOpen(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-emerald-300/80 dark:border-emerald-700 bg-emerald-50/80 dark:bg-emerald-950/40 hover:bg-emerald-100/90 dark:hover:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold shadow-2xs transition-all active:scale-95"
              title="Pusat Sinkronisasi Google Sheets"
            >
              <FileSpreadsheet className={`w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 ${isSyncing ? 'animate-spin' : ''}`} />
              <span className="hidden md:inline">Google Sheet</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </button>

            {/* Export Menu (Only Admin and Analyst) */}
            {!isRoleExecutive && (
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
            )}

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

            {/* User Profile Badge */}
            <div className="flex items-center space-x-2 pl-2 pr-3 py-1 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-slate-50/90 dark:bg-slate-800/90 text-xs shadow-2xs">
              <span className="text-base">{currentUser.avatar || '👤'}</span>
              <div className="text-left leading-tight hidden md:block">
                <div className="font-bold text-slate-800 dark:text-slate-100">{currentUser.nama.split(' ')[0]}</div>
                <div className="text-[10px] text-blue-700 dark:text-blue-400 font-extrabold uppercase tracking-wide">{currentUser.role}</div>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border border-red-200/80 dark:border-red-900/60 bg-red-50/70 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-700 dark:text-red-300 text-xs font-bold flex items-center space-x-1 transition shadow-2xs active:scale-95"
              title="Keluar dari akun"
            >
              <LogOut className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
