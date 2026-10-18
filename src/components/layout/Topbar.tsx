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
    theme, 
    toggleTheme,
    isSidebarOpen,
    toggleSidebar
  } = useApp();

  const { group, item } = findActiveNav(currentPath);

  return (
    <header className="sticky top-0 z-30 h-12 bg-canvas/90 backdrop-blur-sm border-b border-line">
      <div className="h-full w-full px-4 lg:px-8 flex items-center gap-3">
        {/* Mobile drawer button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden -ml-2" 
          onClick={onOpenSidebar} 
          aria-label="Buka menu"
        >
          <MenuIcon />
        </Button>

        {/* Desktop sidebar toggle button */}
        <Button
          variant="ghost"
          size="icon"
          className="hidden lg:inline-flex -ml-2 text-subtle hover:text-ink"
          onClick={toggleSidebar}
          title={isSidebarOpen ? 'Sembunyikan sidebar (Ctrl+B)' : 'Tampilkan sidebar (Ctrl+B)'}
          aria-label={isSidebarOpen ? 'Sembunyikan sidebar' : 'Tampilkan sidebar'}
        >
          {isSidebarOpen ? <PanelLeftClose /> : <PanelLeftOpen />}
        </Button>

        {/* Breadcrumb navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[13px] min-w-0">
          <span className="text-subtle">{group.label}</span>
          <ChevronRight className="w-3.5 h-3.5 text-line-strong shrink-0" />
          <span className="text-ink font-medium truncate">{item.label}</span>
        </nav>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-1.5">
          <Menu
            trigger={(_, toggle) => (
              <Button size="sm" onClick={toggle}>
                <Download />
                <span className="hidden sm:inline">Export</span>
              </Button>
            )}
            className="w-60"
          >
            {close => (
              <>
                <MenuItem
                  icon={<FileSpreadsheet />}
                  hint={`${researchItems.length} baris`}
                  onClick={() => { exportResearchMatrixCSV(); close(); }}
                >
                  Matriks riset (CSV)
                </MenuItem>
                <MenuItem icon={<FileJson />} onClick={() => { exportDataJSON(); close(); }}>
                  Backup lengkap (JSON)
                </MenuItem>
              </>
            )}
          </Menu>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Ganti tema"
            title={theme === 'dark' ? 'Mode terang' : 'Mode gelap'}
          >
            {theme === 'dark' ? <Sun /> : <Moon />}
          </Button>
        </div>
      </div>
    </header>
  );
};
