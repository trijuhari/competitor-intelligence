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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-xs">
      {/* Top Bar with Branding & Role Context */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center text-white shadow-md shadow-blue-900/20 font-bold text-xl shrink-0">
              🏦
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg tracking-tight text-slate-900">
                  BRI Competitor Intelligence
                </span>
                <span className={`px-2 py-0.5 text-[11px] font-bold rounded-full border ${roleBadgeInfo.color}`}>
                  {roleBadgeInfo.label}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Benchmark Arsitektur Teknologi BRI vs Mandiri, BNI, BTN & BSI
              </p>
            </div>
          </div>

          {/* Quick Metrics & Actions */}
          <div className="flex items-center space-x-2.5">
            {/* Database Connection Badge */}
            <div className={`hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${
              isDbConnected 
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                : 'bg-slate-100 text-slate-600 border-slate-200'
            }`}>
              <span className={`w-2 h-2 rounded-full ${isDbConnected ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
              <span>{isDbConnected ? 'SQLite DB Aktif' : 'Offline Mode'}</span>
            </div>

            {/* Export Menu (Only Admin and Analyst) */}
            {!isRoleExecutive && (
              <div className="relative">
                <button
                  onClick={() => setExportDropdownOpen(!exportDropdownOpen)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition"
                  title="Ekspor Data"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span className="hidden sm:inline">Export</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {exportDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-50 animate-in fade-in zoom-in-95 duration-100"
                    onMouseLeave={() => setExportDropdownOpen(false)}
                  >
                    <button
                      onClick={() => { exportResearchMatrixCSV(); setExportDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center space-x-2 font-medium"
                    >
                      <span>📊 Ekspor Riset Sheet (408 CSV)</span>
                    </button>
                    <button
                      onClick={() => { exportDataJSON(); setExportDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center space-x-2 font-medium"
                    >
                      <span>💾 Cadangkan Semua (JSON)</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Board Memo Button (1-Click Executive PDF) */}
            <button
              onClick={() => setIsBoardMemoOpen(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold shadow-xs transition active:scale-95"
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
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 text-xs font-bold shadow-xs transition active:scale-95"
            >
              <Presentation className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mode Presentasi</span>
            </button>

            {/* User Profile Badge */}
            <div className="flex items-center space-x-2 pl-2 pr-3 py-1 rounded-xl border border-slate-200 bg-slate-50/80 text-xs">
              <span className="text-base">{currentUser.avatar || '👤'}</span>
              <div className="text-left leading-tight hidden md:block">
                <div className="font-bold text-slate-900">{currentUser.nama.split(' ')[0]}</div>
                <div className="text-[10px] text-blue-700 font-extrabold uppercase">{currentUser.role}</div>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border border-red-200 bg-red-50/60 hover:bg-red-100 text-red-700 hover:text-red-800 text-xs font-bold flex items-center space-x-1 transition shadow-2xs"
              title="Keluar dari akun"
            >
              <LogOut className="w-3.5 h-3.5 text-red-600" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs based on Role */}
        <nav className="flex space-x-1 overflow-x-auto pb-2 scrollbar-none border-t border-slate-100 pt-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentPath === item.path || (item.path === '/admin' && currentPath === '/admin/overview');

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : item.isSecondary
                    ? 'text-slate-500 hover:text-blue-700 hover:bg-blue-50/60 border border-dashed border-slate-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : item.isSecondary ? 'text-slate-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Global Board Memorandum Modal */}
      <ExecutiveBoardMemoModal 
        isOpen={isBoardMemoOpen} 
        onClose={() => setIsBoardMemoOpen(false)} 
      />
    </header>
  );
};
