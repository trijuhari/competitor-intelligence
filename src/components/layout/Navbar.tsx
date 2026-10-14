import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BarChart3, Grid3X3, ArrowLeftRight, Building2, Cpu, 
  TrendingUp, Shield, Presentation, Download, CheckCircle2, ChevronDown, 
  LogOut, Lock, User as UserIcon, FileText, Compass, DollarSign, Bot 
} from 'lucide-react';
import { ExecutiveBoardMemoModal } from '../strategy/ExecutiveBoardMemoModal';

export const Navbar: React.FC = () => {
  const { 
    currentUser, 
    currentPath, 
    navigate, 
    logout, 
    setPresentationMode,
    findings,
    isDbConnected,
    exportDataJSON,
    exportMatrixCSV,
    exportResearchMatrixCSV,
    researchItems
  } = useApp();

  const [exportDropdownOpen, setExportDropdownOpen] = useState(false);
  const [isBoardMemoOpen, setIsBoardMemoOpen] = useState(false);

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

  const navItems = isRoleAdmin
    ? [
        { path: '/admin', label: 'Riset Sheet (408)', icon: Grid3X3 },
        { path: '/admin/checklist', label: 'Checklist Kesiapan', icon: Shield },
        { path: '/admin/findings', label: 'Audit Temuan', icon: CheckCircle2 },
        { path: '/admin/interviews', label: 'Narasumber Anonim', icon: Building2 },
        { path: '/admin/audit-logs', label: 'Log Audit', icon: TrendingUp },
        { path: '/analyst/matrix', label: 'Matriks Riset ↗', icon: Grid3X3, isSecondary: true },
        { path: '/executive/dashboard', label: 'Executive Portal ↗', icon: BarChart3, isSecondary: true },
      ]
    : isRoleAnalyst
    ? [
        { path: '/analyst/matrix', label: 'Matriks Riset (408)', icon: Grid3X3 },
        { path: '/analyst/head-to-head', label: 'Head-to-Head (BRI vs X)', icon: ArrowLeftRight },
        { path: '/analyst/gap-analysis', label: 'Gap Analysis', icon: TrendingUp },
        { path: '/analyst/tech-catalog', label: 'Katalog Kapabilitas', icon: Cpu },
        { path: '/analyst/banks', label: 'Profil 6 Bank', icon: Building2 },
        { path: '/analyst/decision-matrix', label: 'Decision Matrix', icon: Compass },
        { path: '/analyst/tco-simulator', label: 'TCO Simulator', icon: DollarSign },
        { path: '/analyst/genai-readiness', label: 'GenAI Readiness', icon: Bot },
        { path: '/executive/dashboard', label: 'Executive Overview ↗', icon: BarChart3, isSecondary: true },
      ]
    : [
        { path: '/executive/dashboard', label: 'Executive Overview', icon: BarChart3 },
        { path: '/executive/matrix', label: 'Matriks Riset (408)', icon: Grid3X3 },
        { path: '/executive/head-to-head', label: 'Head-to-Head Battlecard', icon: ArrowLeftRight },
        { path: '/executive/gap-analysis', label: 'Gap Analysis', icon: TrendingUp },
        { path: '/executive/banks', label: 'Profil 6 Bank', icon: Building2 },
        { path: '/executive/decision-matrix', label: 'Decision Matrix', icon: Compass },
        { path: '/executive/presentation', label: 'Mode Presentasi', icon: Presentation },
      ];

  const roleBadgeInfo = isRoleAdmin
    ? { label: 'Portal Administrator', color: 'bg-blue-100 text-blue-800 border-blue-200' }
    : isRoleAnalyst
    ? { label: 'Workspace Analis', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' }
    : { label: 'Portal Executive', color: 'bg-purple-100 text-purple-800 border-purple-200' };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/80 shadow-xs transition-all">
      {/* Top Bar with Branding & Role Context */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center space-x-3.5 cursor-pointer" onClick={() => navigate(isRoleAdmin ? '/admin' : isRoleAnalyst ? '/analyst/matrix' : '/executive/dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#002B49] via-[#00529C] to-blue-500 flex items-center justify-center text-white shadow-md shadow-blue-900/25 ring-1 ring-white/20 shrink-0 transform transition-transform hover:scale-105">
              <span className="text-xl">🏦</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-slate-900 via-blue-950 to-blue-800 bg-clip-text text-transparent">
                  BRI Competitor Intelligence
                </span>
                <span className={`px-2 py-0.5 text-[10px] font-extrabold tracking-wide uppercase rounded-full border shadow-2xs ${roleBadgeInfo.color}`}>
                  {roleBadgeInfo.label}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block"></span>
                Benchmark Arsitektur Teknologi BRI vs Mandiri, BCA, BNI, BTN & BSI
              </p>
            </div>
          </div>

          {/* Quick Metrics & Actions */}
          <div className="flex items-center space-x-2">
            {/* Database Connection Badge */}
            <div className={`hidden lg:flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all ${
              isDbConnected 
                ? 'bg-emerald-50/80 text-emerald-800 border-emerald-200/80 shadow-2xs' 
                : 'bg-slate-100 text-slate-600 border-slate-200'
            }`}>
              <span className={`w-2 h-2 rounded-full ${isDbConnected ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
              <span>{isDbConnected ? 'SQLite Live' : 'Offline Mode'}</span>
            </div>

            {/* Export Menu (Only Admin and Analyst) */}
            {!isRoleExecutive && (
              <div className="relative">
                <button
                  onClick={() => setExportDropdownOpen(!exportDropdownOpen)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-200/80 bg-white/70 hover:bg-slate-100 text-slate-700 text-xs font-semibold shadow-2xs transition-all duration-150"
                  title="Ekspor Data"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span className="hidden sm:inline">Export</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {exportDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-52 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200/80 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 ring-1 ring-black/5"
                    onMouseLeave={() => setExportDropdownOpen(false)}
                  >
                    <button
                      onClick={() => { exportResearchMatrixCSV(); setExportDropdownOpen(false); }}
                      className="w-full text-left px-3.5 py-2.5 text-xs text-slate-700 hover:bg-blue-50/70 hover:text-blue-700 flex items-center space-x-2.5 font-medium transition"
                    >
                      <span className="text-base">📊</span>
                      <div>
                        <div className="font-semibold text-slate-800">Ekspor Riset CSV</div>
                        <div className="text-[10px] text-slate-400">408 kapabilitas × 6 bank</div>
                      </div>
                    </button>
                    <button
                      onClick={() => { exportDataJSON(); setExportDropdownOpen(false); }}
                      className="w-full text-left px-3.5 py-2.5 text-xs text-slate-700 hover:bg-blue-50/70 hover:text-blue-700 flex items-center space-x-2.5 font-medium transition"
                    >
                      <span className="text-base">💾</span>
                      <div>
                        <div className="font-semibold text-slate-800">Cadangkan Full JSON</div>
                        <div className="text-[10px] text-slate-400">Seluruh tabel & log audit</div>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Board Memo Button (1-Click Executive PDF) */}
            <button
              onClick={() => setIsBoardMemoOpen(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold shadow-sm shadow-orange-500/20 transition-all active:scale-95 duration-150"
              title="Cetak Executive Board Memorandum (PDF/A4)"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Board Memo</span>
            </button>

            {/* Mode Presentasi Button */}
            <button
              onClick={() => {
                if (currentPath !== '/executive/presentation') {
                  navigate('/executive/presentation');
                } else {
                  setPresentationMode(true);
                }
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-700 hover:via-indigo-700 hover:to-violet-700 text-white text-xs font-bold shadow-sm shadow-indigo-600/25 transition-all active:scale-95 duration-150"
            >
              <Presentation className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Presentasi</span>
            </button>

            {/* User Profile Badge */}
            <div className="flex items-center space-x-2 pl-2 pr-3 py-1 rounded-xl border border-slate-200/80 bg-slate-50/90 text-xs shadow-2xs">
              <span className="text-base">{currentUser.avatar || '👤'}</span>
              <div className="text-left leading-tight hidden md:block">
                <div className="font-bold text-slate-800">{currentUser.nama.split(' ')[0]}</div>
                <div className="text-[10px] text-blue-700 font-extrabold uppercase tracking-wide">{currentUser.role}</div>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border border-red-200/80 bg-red-50/70 hover:bg-red-100 text-red-700 hover:text-red-800 text-xs font-bold flex items-center space-x-1 transition shadow-2xs active:scale-95"
              title="Keluar dari akun"
            >
              <LogOut className="w-3.5 h-3.5 text-red-600" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs based on Role with Modern Segmented Bar */}
        <div className="py-2 overflow-x-auto scrollbar-none">
          <nav className="inline-flex p-1 bg-slate-100/80 backdrop-blur rounded-2xl border border-slate-200/60 space-x-1 min-w-full sm:min-w-0">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentPath === item.path || (item.path === '/admin' && currentPath === '/admin/overview');

              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                    isActive
                      ? 'bg-white text-blue-700 font-bold shadow-xs shadow-slate-900/5 ring-1 ring-slate-200/70'
                      : item.isSecondary
                      ? 'text-slate-500 hover:text-blue-700 hover:bg-white/60 font-medium'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 font-medium'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600' : item.isSecondary ? 'text-slate-400' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Global Board Memorandum Modal */}
      <ExecutiveBoardMemoModal 
        isOpen={isBoardMemoOpen} 
        onClose={() => setIsBoardMemoOpen(false)} 
      />
    </header>
  );
};
