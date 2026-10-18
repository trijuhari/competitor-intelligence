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
    <aside className={cn('flex flex-col h-full w-60 bg-surface border-r border-line select-none', className)}>
      {/* Brand & Collapse Header */}
      <div className="h-12 flex items-center justify-between gap-2 px-3.5 border-b border-line shrink-0">
        <button onClick={() => go('/executive/dashboard')} className="flex items-center gap-2.5 min-w-0 flex-1 text-left">
          <BankLogo bankCode="bri" size={22} />
          <div className="min-w-0 leading-tight">
            <div className="text-[13px] font-semibold text-ink truncate">Competitor Intel</div>
            <div className="text-2xs text-subtle truncate">BRI vs Himbara &amp; BCA</div>
          </div>
        </button>
        <button
          onClick={() => {
            if (onClose) onClose();
            else setIsSidebarOpen(false);
          }}
          className="p-1 rounded text-subtle hover:text-ink hover:bg-sunken transition-colors shrink-0"
          title={onClose ? 'Tutup menu' : 'Sembunyikan sidebar (Ctrl+B)'}
          aria-label={onClose ? 'Tutup menu' : 'Sembunyikan sidebar'}
        >
          {onClose ? <X className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto scrollbar-none px-2 py-3 space-y-5">
        {NAV_GROUPS.map(group => (
          <div key={group.id}>
            <div className="px-2 pb-1.5 text-2xs font-medium text-subtle">{group.label}</div>
            <ul className="space-y-px">
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
                        'relative w-full flex items-center gap-2.5 h-8 px-2 rounded-md text-[13px] transition-colors',
                        active
                          ? 'bg-sunken text-ink font-medium'
                          : 'text-muted hover:text-ink hover:bg-sunken/70'
                      )}
                    >
                      {active && <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-full bg-accent" />}
                      <Icon className={cn('w-4 h-4 shrink-0', active ? 'text-accent' : 'text-subtle')} />
                      <span className="flex-1 text-left truncate">{item.label}</span>
                      {count !== undefined && (
                        <span className="text-2xs text-subtle num">{count}</span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Data status */}
      <div className="px-3 py-2.5 border-t border-line flex items-center justify-between gap-2 text-xs">
        <span className="flex items-center gap-2 text-muted min-w-0">
          <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', isDbConnected ? 'bg-ok' : 'bg-warn')} />
          <span className="truncate">{isDbConnected ? 'Database tersambung' : 'Mode lokal'}</span>
        </span>
        <button
          onClick={() => setIsSyncModalOpen(true)}
          className="inline-flex items-center gap-1 text-muted hover:text-ink transition-colors"
          title="Sinkronisasi Google Sheets"
        >
          <RefreshCw className={cn('w-3.5 h-3.5', isSyncing && 'animate-spin')} />
          <span>Sync</span>
        </button>
      </div>

      {/* User */}
      <div className="p-2 border-t border-line">
        <Menu
          align="left"
          side="top"
          className="w-[224px]"
          trigger={(open, toggle) => (
            <button
              onClick={toggle}
              className={cn(
                'w-full flex items-center gap-2.5 p-1.5 rounded-md text-left transition-colors',
                open ? 'bg-sunken' : 'hover:bg-sunken'
              )}
            >
              <span className="w-7 h-7 rounded-md bg-accent-soft text-accent text-xs font-semibold flex items-center justify-center shrink-0">
                {initials}
              </span>
              <span className="min-w-0 flex-1 leading-tight">
                <span className="block text-[13px] font-medium text-ink truncate">{currentUser.nama}</span>
                <span className="block text-2xs text-subtle truncate">{currentUser.email}</span>
              </span>
              <ChevronsUpDown className="w-3.5 h-3.5 text-subtle shrink-0" />
            </button>
          )}
        >
          {close => (
            <>
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
