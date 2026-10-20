import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Download, FileSpreadsheet, FileJson, Moon, Sun, ChevronRight,
  PanelLeftClose, PanelLeftOpen, Menu as MenuIcon 
} from 'lucide-react';
import { findActiveNav } from './nav';
import { Button, Menu, MenuItem } from '../ui';

export const Topbar: React.FC<{ onOpenSidebar: () => void }> = ({ onOpenSidebar }) => {
  const { 
    currentPath, 
    exportDataJSON, 
    exportResearchMatrixCSV, 
    researchItems, 
    banks,
    theme, 
    toggleTheme,
    isSidebarOpen,
    toggleSidebar
  } = useApp();

  const { group, item } = React.useMemo(() => findActiveNav(currentPath), [currentPath]);

  const domainCount = React.useMemo(() => {
    const set = new Set(researchItems.map(i => i.domain).filter(Boolean));
    return set.size || 13;
  }, [researchItems]);

  return (
    <header className="sticky top-0 z-30 h-14 bg-surface border-b border-line shadow-xs transition-colors">
      <div className="h-full w-full px-4 lg:px-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          {/* Mobile drawer button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden -ml-2 text-muted hover:text-ink" 
            onClick={onOpenSidebar} 
            aria-label="Buka menu"
          >
            <MenuIcon className="w-5 h-5" />
          </Button>

          {/* Desktop sidebar toggle button */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden lg:inline-flex -ml-2 text-subtle hover:text-ink transition-transform active:scale-95"
            onClick={toggleSidebar}
            title={isSidebarOpen ? 'Sembunyikan sidebar (Ctrl+B)' : 'Tampilkan sidebar (Ctrl+B)'}
            aria-label={isSidebarOpen ? 'Sembunyikan sidebar' : 'Tampilkan sidebar'}
          >
            {isSidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
          </Button>

          {/* Breadcrumb navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px] min-w-0">
            <span className="text-subtle font-medium">{group.label}</span>
            <ChevronRight className="w-3.5 h-3.5 text-line-strong shrink-0" />
            <span className="text-ink font-semibold truncate bg-accent/10 px-2 py-0.5 rounded-md text-accent border border-accent/20">
              {item.label}
            </span>
          </nav>
        </div>

        {/* Center pill: Global Context Indicator (hidden on small screens) */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-sunken border border-line text-xs font-semibold text-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span>{researchItems.length} Kapabilitas Arsitektur</span>
          <span className="text-subtle">·</span>
          <span>{domainCount} Domain</span>
          <span className="text-subtle">·</span>
          <span>{banks?.length || 6} Bank Benchmark</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <Menu
            trigger={(_, toggle) => (
              <Button size="sm" variant="secondary" onClick={toggle} className="gap-2 font-medium">
                <Download className="w-3.5 h-3.5 text-muted" />
                <span className="hidden sm:inline">Export</span>
              </Button>
            )}
            className="w-64"
          >
            {close => (
              <>
                <div className="px-2.5 py-1.5 text-2xs font-semibold text-subtle uppercase tracking-wider">
                  Unduh Dokumen Riset
                </div>
                <MenuItem
                  icon={<FileSpreadsheet className="text-emerald-500" />}
                  hint={`${researchItems.length} baris`}
                  onClick={() => { exportResearchMatrixCSV(); close(); }}
                >
                  Matriks Riset (CSV)
                </MenuItem>
                <MenuItem 
                  icon={<FileJson className="text-blue-500" />} 
                  hint="Semua Entitas"
                  onClick={() => { exportDataJSON(); close(); }}
                >
                  Full Database Backup (JSON)
                </MenuItem>
              </>
            )}
          </Menu>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Ganti tema"
            className="text-subtle hover:text-ink transition-transform duration-200 hover:rotate-12"
            title={theme === 'dark' ? 'Mode terang' : 'Mode gelap'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </Button>
        </div>
      </div>
    </header>
  );
};
