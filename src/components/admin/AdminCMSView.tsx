import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, CheckCircle2, Plus,
  Upload, Download, RefreshCw, History, 
  Check, X, Save, Search, Database, FileSpreadsheet,
  AlertTriangle, Clock, ArrowUpRight, Sparkles,
  Layers, HardDrive, ShieldAlert, Cpu
} from 'lucide-react';
import { AdminResearchMatrixTab } from './AdminResearchMatrixTab';

type AdminTab = 'findings' | 'sync' | 'audit' | 'checklist';

export const AdminCMSView: React.FC = () => {
  const { 
    auditLogs,
    currentUser,
    currentPath,
    navigate,
    researchItems,
    exportDataJSON,
    importDataJSON,
    resetAllData,
    setIsSyncModalOpen,
    isSyncing,
    isDbConnected,
    syncStatus,
    exportResearchMatrixCSV
  } = useApp();

  const [activeAdminSubtab, setActiveAdminSubtab] = useState<AdminTab>('findings');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Sync state with URL path
  useEffect(() => {
    if (currentPath.includes('checklist')) setActiveAdminSubtab('checklist');
    else if (currentPath.includes('sync')) setActiveAdminSubtab('sync');
    else if (currentPath.includes('audit-logs') || currentPath.includes('audit')) setActiveAdminSubtab('audit');
    else setActiveAdminSubtab('findings');
  }, [currentPath]);

  const switchSubtab = (tabId: AdminTab) => {
    setActiveAdminSubtab(tabId);
    if (tabId === 'checklist') navigate('/admin/checklist');
    else if (tabId === 'sync') navigate('/admin/sync');
    else if (tabId === 'audit') navigate('/admin/audit-logs');
    else navigate('/admin/findings');
  };

  // Import JSON file input ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Search & Filter States for Audit Logs
  const [searchAudit, setSearchAudit] = useState('');
  const [auditActionFilter, setAuditActionFilter] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importDataJSON(content);
      if (success) {
        alert('Data berhasil diimpor!');
      } else {
        alert('Gagal mengimpor file. Pastikan format JSON valid.');
      }
    };
    reader.readAsText(file);
  };

  // Filtered Audit Logs
  const filteredAuditLogs = auditLogs.filter(log => {
    if (auditActionFilter && log.aksi !== auditActionFilter) return false;
    if (!searchAudit.trim()) return true;
    const q = searchAudit.toLowerCase();
    return (
      log.entitas.toLowerCase().includes(q) ||
      log.detail.toLowerCase().includes(q) ||
      log.userName.toLowerCase().includes(q) ||
      log.aksi.toLowerCase().includes(q)
    );
  });

  const tabList: { id: AdminTab; label: string; icon: React.ElementType; badge?: string | number }[] = [
    { id: 'findings', label: 'Matriks Riset 408 Baris', icon: Database, badge: researchItems.length },
    { id: 'sync', label: 'Pusat Sinkronisasi & Backup', icon: FileSpreadsheet, badge: 'Live' },
    { id: 'audit', label: 'Log Audit Trail', icon: History, badge: auditLogs.length },
    { id: 'checklist', label: 'Checklist Kesiapan', icon: ShieldCheck, badge: '100%' }
  ];

  return (
    <div className="pb-16 relative space-y-6">
      {/* Hidden File Input for JSON Import */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        accept=".json" 
        className="hidden" 
      />

      {/* Hero Control Bar */}
      <div className="bg-surface p-6 rounded-2xl border border-line shadow-card relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60 shadow-2xs">
                <Sparkles className="w-3 h-3 text-blue-500 animate-pulse" />
                <span>Admin Management Cockpit</span>
              </span>
              <span className="text-[11px] font-mono text-ink-muted">
                v2.5 Enterprise
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight font-heading">
              Kelola Basis Data Intelijen Perbankan
            </h1>
            <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
              Pusat kendali 408 baris kapabilitas arsitektur 6 bank nasional, sinkronisasi dua arah Google Sheets, dan kepatuhan audit trail.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center flex-wrap gap-2.5 shrink-0">
            {activeAdminSubtab === 'findings' && (
              <>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-bold text-xs flex items-center space-x-2 shadow-glow-blue active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Input Temuan Baru</span>
                </button>

                <button
                  onClick={exportResearchMatrixCSV}
                  className="px-3.5 py-2.5 rounded-xl border border-line bg-surface hover:bg-surface-raised text-ink text-xs font-bold flex items-center space-x-1.5 shadow-2xs transition-all active:scale-[0.98] cursor-pointer"
                  title="Download CSV matriks riset"
                >
                  <Download className="w-4 h-4 text-ink-muted" />
                  <span>Ekspor CSV</span>
                </button>
              </>
            )}

            <button
              onClick={() => setIsSyncModalOpen(true)}
              className="px-3.5 py-2.5 rounded-xl border border-emerald-300/60 dark:border-emerald-800/60 bg-emerald-50/70 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center space-x-2 shadow-glow-emerald transition-all active:scale-[0.98] cursor-pointer"
              title="Buka Pusat Sinkronisasi Google Sheets"
            >
              <FileSpreadsheet className={`w-4 h-4 text-emerald-600 dark:text-emerald-400 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>Sync Sheet</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
            </button>

            <button
              onClick={exportDataJSON}
              className="px-3 py-2.5 rounded-xl border border-line bg-surface hover:bg-surface-raised text-ink text-xs font-semibold flex items-center space-x-1.5 shadow-2xs transition-all active:scale-[0.98] cursor-pointer"
              title="Download seluruh data ke JSON"
            >
              <Download className="w-3.5 h-3.5 text-ink-muted" />
              <span className="hidden sm:inline">Backup JSON</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-2.5 rounded-xl border border-line bg-surface hover:bg-surface-raised text-ink text-xs font-semibold flex items-center space-x-1.5 shadow-2xs transition-all active:scale-[0.98] cursor-pointer"
              title="Impor backup data JSON"
            >
              <Upload className="w-3.5 h-3.5 text-ink-muted" />
              <span className="hidden sm:inline">Impor JSON</span>
            </button>
          </div>
        </div>

        {/* Dynamic Subtab Pill Switcher */}
        <div className="mt-6 pt-5 border-t border-line flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {tabList.map(tab => {
            const Icon = tab.icon;
            const isActive = activeAdminSubtab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => switchSubtab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white shadow-glow-blue'
                    : 'bg-surface-raised/70 border border-line text-ink-muted hover:text-ink hover:bg-surface-raised'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-ink-muted'}`} />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-surface border border-line text-ink-muted'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ======================================================= */}
      {/* TAB 1: KELOLA TEMUAN RISET (408 DARI SHEET)             */}
      {/* ======================================================= */}
      {activeAdminSubtab === 'findings' && (
        <AdminResearchMatrixTab 
          isAddModalOpen={isAddModalOpen} 
          setIsAddModalOpen={setIsAddModalOpen} 
        />
      )}

      {/* ======================================================= */}
      {/* TAB 2: PUSAT SINKRONISASI GOOGLE SHEETS & BACKUP        */}
      {/* ======================================================= */}
      {activeAdminSubtab === 'sync' && (
        <div className="space-y-6">
          {/* Google Sheets Live Hub Card */}
          <div className="bg-surface p-6 rounded-2xl border border-line shadow-card space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-line">
              <div className="flex items-center space-x-3.5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-glow-emerald">
                  <FileSpreadsheet className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-ink tracking-tight flex items-center gap-2">
                    <span>Integrasi Google Spreadsheet Live</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-800">
                      Aktif & Terhubung
                    </span>
                  </h3>
                  <p className="text-xs text-ink-muted mt-0.5">
                    Menghubungkan aplikasi langsung ke Google Spreadsheet riset teknologi perbankan 6 bank nasional.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsSyncModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold flex items-center space-x-2 shadow-glow-emerald transition-all active:scale-[0.98] cursor-pointer"
                >
                  <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? 'Sedang Menarik Data...' : 'Mulai Sinkronisasi Sekarang'}</span>
                </button>
                <a
                  href={syncStatus?.sheet_url || 'https://docs.google.com/spreadsheets/d/1L0WBGmZVrzIHOojtZjYSeSEEggNsMPOG9AhQQj0-PoY/edit?gid=0#gid=0'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-line bg-surface hover:bg-surface-raised text-ink-muted hover:text-ink transition shadow-2xs"
                  title="Buka Google Sheet di Tab Baru"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Spreadsheet Info Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-surface-raised p-4 rounded-xl border border-line space-y-1.5">
                <div className="text-[11px] font-bold text-ink-muted uppercase tracking-wider">
                  Target Google Sheet URL
                </div>
                <div className="text-xs font-mono text-ink truncate font-semibold" title={syncStatus?.sheet_url}>
                  {syncStatus?.sheet_url || 'https://docs.google.com/spreadsheets/d/1L0WBGmZVrzIHOojtZjYSeSEEggNsMPOG9AhQQj0-PoY/edit?gid=0#gid=0'}
                </div>
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Otomatis mengekstrak format CSV publik</span>
                </div>
              </div>

              <div className="bg-surface-raised p-4 rounded-xl border border-line space-y-1.5">
                <div className="text-[11px] font-bold text-ink-muted uppercase tracking-wider">
                  Total Kapabilitas Terekstrak
                </div>
                <div className="text-2xl font-black text-ink font-heading">
                  {researchItems.length} Kapabilitas
                </div>
                <div className="text-[10px] text-ink-muted">
                  2,448 sel evaluasi (6 Bank × 408 Kapabilitas)
                </div>
              </div>

              <div className="bg-surface-raised p-4 rounded-xl border border-line space-y-1.5">
                <div className="text-[11px] font-bold text-ink-muted uppercase tracking-wider">
                  Status Sinkronisasi Terakhir
                </div>
                <div className="text-xs font-bold text-ink flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-500" />
                  <span>{syncStatus?.last_sync_time || 'Baru saja'}</span>
                </div>
                <div className="text-[10px] text-ink-muted truncate">
                  {syncStatus?.last_sync_summary || '408 kapabilitas berhasil dimuat ke database SQLite.'}
                </div>
              </div>
            </div>
          </div>

          {/* Data Backup & Migration Hub */}
          <div className="bg-surface p-6 rounded-2xl border border-line shadow-card space-y-5">
            <div className="border-b border-line pb-3.5">
              <h3 className="text-base font-extrabold text-ink tracking-tight flex items-center gap-2">
                <Database className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Cadangan Basis Data & Migrasi JSON / CSV</span>
              </h3>
              <p className="text-xs text-ink-muted mt-0.5">
                Simpan salinan utuh seluruh data sistem untuk kebutuhan arsip, pemulihan bencana (disaster recovery), atau migrasi.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-surface-raised p-4 rounded-xl border border-line space-y-3">
                <div className="font-extrabold text-ink">Ekspor Salinan JSON Lengkap</div>
                <p className="text-ink-muted text-[11px]">
                  Mencakup seluruh 408 kapabilitas riset arsitektur, profil 6 bank, dan jejak riwayat audit.
                </p>
                <button
                  onClick={exportDataJSON}
                  className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold flex items-center justify-center space-x-2 transition shadow-glow-blue active:scale-[0.98] cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download JSON</span>
                </button>
              </div>

              <div className="bg-surface-raised p-4 rounded-xl border border-line space-y-3">
                <div className="font-extrabold text-ink">Impor Salinan JSON</div>
                <p className="text-ink-muted text-[11px]">
                  Pulihkan data dari file backup JSON sebelumnya secara aman ke dalam penyimpanan SQLite.
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-2.5 px-3 rounded-xl border border-line bg-surface hover:bg-surface-raised text-ink font-bold flex items-center justify-center space-x-2 transition shadow-2xs active:scale-[0.98] cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Unggah File JSON</span>
                </button>
              </div>

              <div className="bg-surface-raised p-4 rounded-xl border border-line space-y-3">
                <div className="font-extrabold text-ink">Ekspor Matriks CSV (Excel)</div>
                <p className="text-ink-muted text-[11px]">
                  Unduh tabel 408 kapabilitas x 6 bank lengkap dengan status, evaluasi, dan tautan bukti riset.
                </p>
                <button
                  onClick={exportResearchMatrixCSV}
                  className="w-full py-2.5 px-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200/80 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-bold flex items-center justify-center space-x-2 transition active:scale-[0.98] cursor-pointer"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Download CSV</span>
                </button>
              </div>
            </div>
          </div>

          {/* Danger Zone: Reset Data */}
          <div className="p-5 bg-rose-50/40 dark:bg-rose-950/20 rounded-3xl border border-rose-200/80 dark:border-rose-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3.5">
              <div className="p-2.5 rounded-2xl bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-rose-950 dark:text-rose-200 text-xs">Zona Berbahaya: Reset Basis Data</h4>
                <p className="text-[11px] text-rose-700 dark:text-rose-300/80 mt-0.5">
                  Mengembalikan seluruh data ke kondisi awal bawaan paket. Perubahan lokal akan ditimpa.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                if (confirm('Yakin ingin mereset seluruh data kembali ke bawaan awal? Perubahan lokal akan ditimpa.')) {
                  resetAllData();
                }
              }}
              className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center space-x-1.5 shadow-xs transition active:scale-[0.98] shrink-0 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Data ke Bawaan</span>
            </button>
          </div>
        </div>
      )}

      {/* ======================================================= */}
      {/* TAB 3: AUDIT TRAIL LOG                                  */}
      {/* ======================================================= */}
      {activeAdminSubtab === 'audit' && (
        <div className="space-y-6">
          {/* Quick Stat Overview for Audit Logs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="bg-surface p-4 rounded-xl border border-line shadow-card">
              <div className="text-[10px] font-bold text-ink-muted uppercase tracking-wider">Total Log</div>
              <div className="text-2xl font-black text-ink mt-1 font-heading">{auditLogs.length}</div>
              <div className="text-[10px] text-ink-muted">Aktivitas tercatat</div>
            </div>

            <div className="bg-blue-50/80 dark:bg-blue-950/40 p-4 rounded-xl border border-blue-200 dark:border-blue-800 shadow-card">
              <div className="text-[10px] font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">CREATE</div>
              <div className="text-2xl font-black text-blue-700 dark:text-blue-300 mt-1 font-heading">
                {auditLogs.filter(l => l.aksi === 'CREATE').length}
              </div>
              <div className="text-[10px] text-ink-muted">Entitas dibuat</div>
            </div>

            <div className="bg-amber-50/80 dark:bg-amber-950/40 p-4 rounded-xl border border-amber-200 dark:border-amber-800 shadow-card">
              <div className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">UPDATE</div>
              <div className="text-2xl font-black text-amber-700 dark:text-amber-300 mt-1 font-heading">
                {auditLogs.filter(l => l.aksi === 'UPDATE').length}
              </div>
              <div className="text-[10px] text-ink-muted">Perubahan data</div>
            </div>

            <div className="bg-rose-50/80 dark:bg-rose-950/40 p-4 rounded-xl border border-rose-200 dark:border-rose-900 shadow-card">
              <div className="text-[10px] font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider">DELETE</div>
              <div className="text-2xl font-black text-rose-700 dark:text-rose-300 mt-1 font-heading">
                {auditLogs.filter(l => l.aksi === 'DELETE').length}
              </div>
              <div className="text-[10px] text-ink-muted">Penghapusan entitas</div>
            </div>
          </div>

          {/* Audit Log Table & Filters */}
          <div className="bg-surface rounded-2xl border border-line shadow-card overflow-hidden">
            <div className="p-5 bg-surface-raised/80 border-b border-line flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <span className="text-sm font-extrabold text-ink tracking-tight font-heading">
                  Catatan Audit Perubahan Sistem ({filteredAuditLogs.length} dari {auditLogs.length})
                </span>
                <p className="text-[11px] text-ink-muted mt-0.5">Memenuhi standar kepatuhan pelacakan jejak data (Audit Trail)</p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5">
                <div className="flex items-center space-x-1 overflow-x-auto pb-1 sm:pb-0">
                  {['SEMUA', 'CREATE', 'UPDATE', 'DELETE'].map(action => (
                    <button
                      key={action}
                      onClick={() => setAuditActionFilter(action === 'SEMUA' ? null : action)}
                      className={`px-3 py-1 rounded-xl text-[10px] font-bold transition whitespace-nowrap cursor-pointer ${
                        (auditActionFilter === action || (action === 'SEMUA' && !auditActionFilter))
                          ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white shadow-glow-blue'
                          : 'bg-surface border border-line text-ink-muted hover:text-ink hover:bg-surface-raised'
                      }`}
                    >
                      {action}
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
                  <input
                    type="text"
                    placeholder="Cari aksi, entitas, user..."
                    value={searchAudit}
                    onChange={e => setSearchAudit(e.target.value)}
                    className="w-full pl-8 pr-8 py-2 rounded-xl border border-line bg-surface text-ink text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-ink-muted"
                  />
                  {searchAudit && (
                    <button 
                      onClick={() => setSearchAudit('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink cursor-pointer"
                      title="Hapus pencarian"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="divide-y divide-line text-xs max-h-[600px] overflow-y-auto">
              {filteredAuditLogs.length === 0 ? (
                <div className="p-12 text-center text-ink-muted">
                  Tidak ada catatan audit yang cocok dengan pencarian "{searchAudit}"{auditActionFilter ? ` dan filter [${auditActionFilter}]` : ''}.
                </div>
              ) : (
                filteredAuditLogs.map(log => (
                  <div key={log.id} className="p-4 hover:bg-surface-raised/60 flex items-start justify-between gap-4 transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-0.5 rounded-md font-extrabold text-[10px] uppercase ${
                          log.aksi === 'CREATE'
                            ? 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300'
                            : log.aksi === 'UPDATE'
                            ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                            : log.aksi === 'DELETE'
                            ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300'
                            : 'bg-surface text-ink'
                        }`}>
                          {log.aksi}
                        </span>
                        <span className="font-extrabold text-ink">{log.entitas}</span>
                        <span className="text-ink-muted">•</span>
                        <span className="text-ink-muted font-medium">Oleh {log.userName}</span>
                      </div>
                      <p className="text-ink leading-relaxed font-normal">{log.detail}</p>
                    </div>
                    <span className="text-[11px] text-ink-muted font-mono shrink-0">
                      {log.timestamp}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================= */}
      {/* TAB 4: CHECKLIST KESIAPAN WORKSHOP & ARSITEKTUR         */}
      {/* ======================================================= */}
      {activeAdminSubtab === 'checklist' && (
        <div className="space-y-6">
          <div className="bg-surface p-6 rounded-2xl border border-line shadow-card space-y-5">
            <div>
              <h3 className="text-base font-extrabold text-ink tracking-tight flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>Checklist Pemeriksaan Kesiapan Workshop & Analisis Arsitektur</span>
              </h3>
              <p className="text-xs text-ink-muted mt-1">
                Kepatuhan tata kelola riset: pastikan integritas bukti empiris dan ketiadaan celah sensitif sebelum sesi konsultasi bersama Dewan Direksi dan arsitek Bank BRI.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-surface-raised p-5 rounded-xl border border-line space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-ink">1. Validitas & Tautan Bukti Riset</span>
                  <span className="px-2.5 py-0.5 rounded-full font-bold text-[10px] bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    100% Terdokumentasi
                  </span>
                </div>
                <p className="text-ink-muted leading-relaxed font-normal">
                  Seluruh 408 kapabilitas arsitektur memiliki status bukti evaluasi yang jelas (Terverifikasi, Inferensi, Belum) di seluruh 6 bank.
                </p>
                <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold flex items-center space-x-1.5 pt-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>2,448 sel evaluasi siap dikomparasikan.</span>
                </div>
              </div>

              <div className="bg-surface-raised p-5 rounded-xl border border-line space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-ink">2. Standarisasi 4 Workshop & 13 Domain</span>
                  <span className="px-2.5 py-0.5 rounded-full font-bold text-[10px] bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    Terstandar MBB
                  </span>
                </div>
                <p className="text-ink-muted leading-relaxed font-normal">
                  Struktur workshop dikelompokkan ke dalam WS1 (Core & Digital), WS2 (EDW & BI), WS3 (Cloud & Infra), dan WS4 (Big Data & AI).
                </p>
                <div className="text-[11px] text-blue-700 dark:text-blue-400 font-semibold flex items-center space-x-1.5 pt-1">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>Mencakup 13 domain arsitektur perbankan modern.</span>
                </div>
              </div>

              <div className="bg-surface-raised p-5 rounded-xl border border-line space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-ink">3. Tata Kelola & Integritas Keamanan Data</span>
                  <span className="px-2.5 py-0.5 rounded-full font-bold text-[10px] bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    Aman & Patuh
                  </span>
                </div>
                <p className="text-ink-muted leading-relaxed font-normal">
                  Seluruh data riset dikelola dengan standar kepatuhan informasi perbankan, terisolasi dalam kontrol akses peran (RBAC), dan dilindungi jejak audit penuh.
                </p>
                <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold flex items-center space-x-1.5 pt-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>100% data terproteksi dan diaudit secara otomatis.</span>
                </div>
              </div>

              <div className="bg-surface-raised p-5 rounded-xl border border-line space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-ink">4. Kesiapan Matriks Analitik & Benchmark Eksekutif</span>
                  <span className="px-2.5 py-0.5 rounded-full font-bold text-[10px] bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    100% Siap
                  </span>
                </div>
                <p className="text-ink-muted leading-relaxed font-normal">
                  Matriks analitik komprehensif 408 kapabilitas siap digunakan untuk evaluasi arsitektur teknologi & komparasi 6 bank secara real-time.
                </p>
                <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold flex items-center space-x-1.5 pt-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Semua data matriks terverifikasi dan on-point.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
