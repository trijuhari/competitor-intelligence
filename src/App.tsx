import React from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { LoginPage } from './components/auth/LoginPage';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { MatrixView } from './components/matrix/MatrixView';
import { HeadToHeadView } from './components/headtohead/HeadToHeadView';
import { BankProfilesView } from './components/banks/BankProfilesView';
import { TechCatalogView } from './components/tech/TechCatalogView';
import { GapAnalysisView } from './components/gapanalysis/GapAnalysisView';
import { AdminCMSView } from './components/admin/AdminCMSView';
import { StrategicDecisionMatrixView } from './components/strategy/StrategicDecisionMatrixView';
import { ArchitectureBlueprintView } from './components/blueprint/ArchitectureBlueprintView';
import { FindingDetailModal } from './components/matrix/FindingDetailModal';
import { ResearchDetailModal } from './components/matrix/ResearchDetailModal';
import { GoogleSheetsSyncModal } from './components/sync/GoogleSheetsSyncModal';
import { ShieldCheck, Lock, ExternalLink } from 'lucide-react';

export const AppContent: React.FC = () => {
  const { 
    isAuthenticated, 
    currentUser, 
    currentPath, 
    activeTab, 
    isSyncModalOpen,
    setIsSyncModalOpen
  } = useApp();

  // 1. Unauthenticated or Login Route
  if (!isAuthenticated || currentPath === '/login') {
    return <LoginPage />;
  }

  const renderMainContent = () => {
    // Role-routed views (All users are Admin with full access)
    if (currentPath.startsWith('/admin') || activeTab === 'admin') {
      return <AdminCMSView />;
    }

    if (currentPath.includes('blueprint') || activeTab === 'blueprint') {
      return <ArchitectureBlueprintView />;
    }

    if (currentPath.includes('matrix') || activeTab === 'matrix') {
      return <MatrixView />;
    }

    if (currentPath.includes('head-to-head') || activeTab === 'head-to-head') {
      return <HeadToHeadView />;
    }

    if (currentPath.includes('gap-analysis') || activeTab === 'gap-analysis') {
      return <GapAnalysisView />;
    }

    if (currentPath.includes('decision-matrix') || activeTab === 'decision-matrix') {
      return <StrategicDecisionMatrixView />;
    }

    if (currentPath.includes('tech-catalog') || activeTab === 'tech-catalog') {
      return <TechCatalogView />;
    }

    if (currentPath.includes('banks') || activeTab === 'banks') {
      return <BankProfilesView />;
    }

    // Default to Executive Dashboard Overview
    return <DashboardOverview />;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col justify-between selection:bg-blue-100 dark:selection:bg-blue-900/60 selection:text-blue-900 dark:selection:text-blue-100 transition-colors duration-200">
      <div>
        <Navbar />

        <main className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 transition-all duration-300">
          {renderMainContent()}
        </main>
      </div>

      {/* Global Finding Details Drawer/Modal */}
      <FindingDetailModal />
      <ResearchDetailModal />
      <GoogleSheetsSyncModal isOpen={isSyncModalOpen} onClose={() => setIsSyncModalOpen(false)} />

      {/* Footer */}
      <footer className="bg-white/70 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800/80 mt-20 py-8 text-xs text-slate-500 dark:text-slate-400 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2.5 flex-wrap">
            <span className="font-extrabold text-slate-800 dark:text-slate-200 tracking-tight">
              Competitor Intelligence Tech Stack · Bank BRI vs Himbara & BCA
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-slate-500 dark:text-slate-400 text-[11px]">Zona URL: <code className="bg-slate-100 dark:bg-slate-800 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded-md font-mono text-[10px] border border-slate-200 dark:border-slate-700">{currentPath}</code></span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold border border-slate-200/60 dark:border-slate-700/60">Versi 2.0 (408 Kapabilitas)</span>
          </div>

          <div className="flex items-center space-x-4 text-[11px] text-slate-500 dark:text-slate-400">
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/80 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Autentikasi: <strong className="text-emerald-950 dark:text-emerald-200">{currentUser.role}</strong></span>
            </div>
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300 border border-purple-200/80 dark:border-purple-800/80 font-semibold">
              <Lock className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>Kepatuhan UU PDP</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export const App: React.FC = () => {
  return <AppContent />;
};

export default App;
