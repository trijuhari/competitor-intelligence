import React from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { LoginPage } from './components/auth/LoginPage';
import { ForbiddenView } from './components/auth/ForbiddenView';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { MatrixView } from './components/matrix/MatrixView';
import { HeadToHeadView } from './components/headtohead/HeadToHeadView';
import { BankProfilesView } from './components/banks/BankProfilesView';
import { TechCatalogView } from './components/tech/TechCatalogView';
import { GapAnalysisView } from './components/gapanalysis/GapAnalysisView';
import { AdminCMSView } from './components/admin/AdminCMSView';
import { PresentationView } from './components/presentation/PresentationView';
import { StrategicDecisionMatrixView } from './components/strategy/StrategicDecisionMatrixView';
import { TcoCostSimulatorView } from './components/strategy/TcoCostSimulatorView';
import { GenAiReadinessView } from './components/strategy/GenAiReadinessView';
import { FindingDetailModal } from './components/matrix/FindingDetailModal';
import { ResearchDetailModal } from './components/matrix/ResearchDetailModal';
import { ShieldCheck, Lock, ExternalLink } from 'lucide-react';

export const AppContent: React.FC = () => {
  const { 
    isAuthenticated, 
    currentUser, 
    currentPath, 
    activeTab, 
    presentationMode 
  } = useApp();

  // 1. Unauthenticated or Login Route
  if (!isAuthenticated || currentPath === '/login') {
    return <LoginPage />;
  }

  // 2. Fullscreen Presentation Mode
  if (presentationMode || currentPath === '/executive/presentation') {
    return <PresentationView />;
  }

  // 3. Role-based URL Guards
  const isAdminZone = currentPath.startsWith('/admin');
  const isAnalystZone = currentPath.startsWith('/analyst');

  const isForbiddenAdmin = isAdminZone && currentUser.role !== 'Admin';
  const isForbiddenAnalyst = isAnalystZone && currentUser.role !== 'Admin' && currentUser.role !== 'Analyst';

  const renderMainContent = () => {
    if (isForbiddenAdmin) {
      return <ForbiddenView requiredRole="Administrator" />;
    }

    if (isForbiddenAnalyst) {
      return <ForbiddenView requiredRole="Tech Analyst atau Administrator" />;
    }

    // Role-routed views
    if (currentPath.startsWith('/admin') || activeTab === 'admin') {
      return <AdminCMSView />;
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

    if (currentPath.includes('tco-simulator') || activeTab === 'tco-simulator') {
      return <TcoCostSimulatorView />;
    }

    if (currentPath.includes('genai-readiness') || activeTab === 'genai-readiness') {
      return <GenAiReadinessView />;
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
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-blue-100 selection:text-blue-900">
      <div>
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          {renderMainContent()}
        </main>
      </div>

      {/* Global Finding Details Drawer/Modal */}
      <FindingDetailModal />
      <ResearchDetailModal />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-800">
              Competitor Intelligence Tech Stack · Bank BRI vs Himbara
            </span>
            <span>•</span>
            <span className="text-slate-400">Zona URL: <code className="bg-slate-100 px-1 py-0.5 rounded text-blue-700 font-mono">{currentPath}</code></span>
            <span>•</span>
            <span>Versi 1.0</span>
          </div>

          <div className="flex items-center space-x-4 text-[11px] text-slate-400">
            <div className="flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Autentikasi Aktif: <strong className="text-slate-700">{currentUser.role}</strong></span>
            </div>
            <span>•</span>
            <div className="flex items-center space-x-1">
              <Lock className="w-3.5 h-3.5 text-purple-600" />
              <span>Kepatuhan Privasi UU PDP</span>
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
