import React from 'react';
import { useApp } from '../../context/AppContext';
import { LogOut, Moon, Sun, RefreshCw, ChevronsUpDown, X, PanelLeftClose } from 'lucide-react';
import { NAV_GROUPS } from './nav';
import { BankLogo } from '../common/BankLogo';
import { Menu, MenuItem, MenuSeparator, cn } from '../ui';

interface AppSidebarProps {
  /** Mobile drawer: called after navigation / on close button. */
  onClose?: () => void;
  className?: string;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ onClose, className }) => {
  const {
    currentPath,
    navigate,
    currentUser,
    logout,
    researchItems,
    auditLogs,
    isSyncing,
    isDbConnected,
    setIsSyncModalOpen,
    setIsSidebarOpen,
    theme,
    toggleTheme,
  } = useApp();

  const counts: Record<string, number | undefined> = {
    matrix: researchItems.length,
    findings: researchItems.length,
    audit: auditLogs.length,
  };

  const initials = (currentUser.nama || 'A')
    .split(' ')
    .map(s => s[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const go = (path: string) => {
    navigate(path);
    onClose?.();
  };

  return (
    <aside className={cn('flex flex-col h-full w-64 bg-surface/95 backdrop-blur-xl border-r border-line select-none z-40', className)}>
      {/* Brand & Collapse Header */}
      <div className="h-14 flex items-center justify-between gap-3 px-4 border-b border-line shrink-0">
        <button onClick={() => go('/executive/dashboard')} className="flex items-center gap-3 min-w-0 flex-1 text-left group">
          <div className="relative">
            <BankLogo bankCode="bri" size={28} />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
          </div>
          <div className="min-w-0 leading-tight">
            <div className="text-[13.5px] font-bold text-ink truncate tracking-tight group-hover:text-accent transition-colors flex items-center gap-1.5">
              <span>Competitor Intel</span>
            </div>
            <div className="text-[11px] text-muted truncate flex items-center gap-1 mt-0.5">
              <span className="font-semibold text-accent">BRI</span>
              <span>vs Himbara &amp; BCA</span>
            </div>
          </div>
        </button>
        <button
          onClick={() => {
            if (onClose) onClose();
            else setIsSidebarOpen(false);
          }}
          className="p-1.5 rounded-lg text-subtle hover:text-ink hover:bg-sunken transition-colors shrink-0"
          title={onClose ? 'Tutup menu' : 'Sembunyikan sidebar (Ctrl+B)'}
          aria-label={onClose ? 'Tutup menu' : 'Sembunyikan sidebar'}
        >
          {onClose ? <X className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto scrollbar-none px-3 py-3.5 space-y-6">
        {NAV_GROUPS.map(group => (
          <div key={group.id} className="space-y-1">
            <div className="px-2.5 pb-1 text-[11px] font-bold tracking-wider uppercase text-subtle/80">
              {group.label}
            </div>
            <ul className="space-y-0.5">
              {group.items.map(item => {
                const Icon = item.icon;
                const active = item.match(currentPath);
                const count = counts[item.id];
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => go(item.path)}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'group relative w-full flex items-center gap-3 h-9 px-2.5 rounded-lg text-[13px] font-medium transition-all duration-150',
                        active
                          ? 'bg-gradient-to-r from-accent/15 via-accent/10 to-transparent text-accent font-semibold shadow-xs'
                          : 'text-muted hover:text-ink hover:bg-sunken/80'
                      )}
                    >
                      {active && (
                        <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-accent shadow-[0_0_8px_rgba(2,132,199,0.8)]" />
                      )}
                      <Icon className={cn(
                        'w-4 h-4 shrink-0 transition-transform duration-150 group-hover:scale-110',
                        active ? 'text-accent' : 'text-subtle group-hover:text-ink'
                      )} />
                      <span className="flex-1 text-left truncate">{item.label}</span>
                      {count !== undefined && (
                        <span className={cn(
                          'text-2xs px-1.5 py-0.2 rounded-full num font-mono transition-colors',
                          active ? 'bg-accent/20 text-accent font-semibold' : 'bg-sunken text-subtle group-hover:text-muted'
                        )}>
                          {count}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Live Data Telemetry Strip */}
      <div className="px-3.5 py-2.5 border-t border-line/80 bg-sunken/40 flex items-center justify-between gap-2 text-xs">
        <span className="flex items-center gap-2 text-muted min-w-0">
          <span className="relative flex h-2 w-2 shrink-0">
            {isDbConnected && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            )}
            <span className={cn('relative inline-flex rounded-full h-2 w-2', isDbConnected ? 'bg-emerald-500' : 'bg-amber-500')} />
          </span>
          <span className="truncate text-[11.5px] font-medium text-ink">
            {isDbConnected ? 'SQLite Connected' : 'Mode Offline'}
          </span>
        </span>
        <button
          onClick={() => setIsSyncModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-semibold text-accent hover:bg-accent/10 transition-colors"
          title="Sinkronisasi Google Sheets"
        >
          <RefreshCw className={cn('w-3 h-3', isSyncing && 'animate-spin')} />
          <span>Sync</span>
        </button>
      </div>

      {/* User Profile Card */}
      <div className="p-2.5 border-t border-line/80">
        <Menu
          align="left"
          side="top"
          className="w-[236px]"
          trigger={(open, toggle) => (
            <button
              onClick={toggle}
              className={cn(
                'w-full flex items-center gap-2.5 p-2 rounded-xl text-left transition-all duration-150 border border-transparent',
                open ? 'bg-sunken border-line' : 'hover:bg-sunken hover:border-line/60'
              )}
            >
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-sky-500 text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/30">
                {initials}
              </span>
              <span className="min-w-0 flex-1 leading-tight">
                <span className="block text-[13px] font-semibold text-ink truncate">{currentUser.nama}</span>
                <span className="block text-[11px] text-muted truncate font-mono">Lead Enterprise Architect</span>
              </span>
              <ChevronsUpDown className="w-3.5 h-3.5 text-subtle shrink-0" />
            </button>
          )}
        >
          {close => (
            <>
              <div className="px-2.5 py-1.5 border-b border-line/60 mb-1">
                <div className="text-xs font-semibold text-ink">{currentUser.nama}</div>
                <div className="text-2xs text-subtle font-mono truncate">{currentUser.email}</div>
              </div>
              <MenuItem
                icon={theme === 'dark' ? <Sun /> : <Moon />}
                onClick={() => { toggleTheme(); close(); }}
              >
                {theme === 'dark' ? 'Mode terang' : 'Mode gelap'}
              </MenuItem>
              <MenuSeparator />
              <MenuItem icon={<LogOut />} danger onClick={() => { close(); logout(); }}>
                Keluar
              </MenuItem>
            </>
          )}
        </Menu>
      </div>
    </aside>
  );
};

