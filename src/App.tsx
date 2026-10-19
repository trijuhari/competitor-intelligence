import React, { useEffect, useState } from 'react';
import { useApp } from './context/AppContext';
import { AppSidebar } from './components/layout/AppSidebar';
import { Topbar } from './components/layout/Topbar';
import { LoginPage } from './components/auth/LoginPage';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { MatrixView } from './components/matrix/MatrixView';
import { HeadToHeadView } from './components/headtohead/HeadToHeadView';
import { BankProfilesView } from './components/banks/BankProfilesView';
import { TechCatalogView } from './components/tech/TechCatalogView';
import { GapAnalysisView } from './components/gapanalysis/GapAnalysisView';
import { AdminCMSView } from './components/admin/AdminCMSView';
import { ArchitectureBlueprintView } from './components/blueprint/ArchitectureBlueprintView';
import { ResearchDetailModal } from './components/matrix/ResearchDetailModal';
import { GoogleSheetsSyncModal } from './components/sync/GoogleSheetsSyncModal';
import { cn } from './components/ui';

export const AppContent: React.FC = () => {
  const {
    isAuthenticated,
    currentPath,
    activeTab,
    isSyncModalOpen,
    setIsSyncModalOpen,
    isSidebarOpen,
    toggleSidebar
  } = useApp();

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [currentPath]);

  // Global keyboard shortcut: Ctrl+B or Cmd+B to toggle sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        const target = e.target as HTMLElement;
        // Don't trigger if user is typing inside an input or textarea
        if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
          return;
        }
        e.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSidebar]);

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
    <div className="min-h-screen bg-canvas text-ink">
      {/* Desktop sidebar (collapsible) */}
      {isSidebarOpen && (
        <AppSidebar className="hidden lg:flex fixed inset-y-0 left-0 z-40 animate-fade-in" />
      )}

      {/* Mobile drawer */}
      {mobileNavOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/30 animate-fade-in" onClick={() => setMobileNavOpen(false)} />
          <AppSidebar className="relative animate-fade-in shadow-pop" onClose={() => setMobileNavOpen(false)} />
        </div>
      )}

      {/* Content area that dynamically expands when sidebar is hidden */}
      <div className={cn(
        'flex flex-col min-h-screen transition-[padding] duration-200 ease-in-out',
        isSidebarOpen ? 'lg:pl-64' : 'lg:pl-0'
      )}>
        <Topbar onOpenSidebar={() => setMobileNavOpen(true)} />
        <main className="flex-1 w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
          {renderMainContent()}
        </main>
      </div>

      {/* Global Finding Details Drawer/Modal */}
      <ResearchDetailModal />
      <GoogleSheetsSyncModal isOpen={isSyncModalOpen} onClose={() => setIsSyncModalOpen(false)} />
    </div>
  );
};

export const App: React.FC = () => {
  return <AppContent />;
};

export default App;
