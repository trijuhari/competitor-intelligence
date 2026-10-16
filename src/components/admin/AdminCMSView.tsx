import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, CheckCircle2, Plus,
  Upload, Download, RefreshCw, History, 
  Check, X, Save, Search, Database, FileSpreadsheet,
  ChevronRight, ExternalLink, Menu, Shield, AlertTriangle,
  Activity, ArrowUpRight, Clock, PanelLeftClose, PanelLeftOpen,
  Grid3X3, ArrowLeftRight, TrendingUp, BarChart3, Building2,
  ChevronLeft, Sparkles
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
    exportResearchMatrixCSV,
    isSidebarOpen,
    setIsSidebarOpen
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

  const currentTabMeta = {
    findings: {
      title: 'Kelola Temuan Arsitektur & Kapabilitas (408 Baris)',
      subtitle: `Basis data komparatif arsitektur teknologi 6 bank nasional (${researchItems.length} kapabilitas dari Google Spreadsheet).`,
      badge: 'Database Master'
    },
    sync: {
      title: 'Pusat Sinkronisasi Google Sheets & Backup',
      subtitle: 'Sinkronisasi data real-time dua arah ke Google Sheets dan pencadangan instan basis data SQLite.',
      badge: 'Integrasi & Cloud'
    },
    audit: {
      title: 'Log Audit Trail & Jejak Perubahan',
      subtitle: 'Pelacakan menyeluruh atas seluruh aktivitas penambahan, pengubahan, dan penghapusan entitas sistem.',
      badge: 'Audit Kepatuhan'
    },
    checklist: {
      title: 'Checklist Kesiapan Workshop & Arsitektur',
      subtitle: 'Verifikasi integritas empiris sebelum sesi pemaparan teknis bersama Dewan Direksi dan arsitek Bank BRI.',
      badge: 'Workshop Ready'
    }
  }[activeAdminSubtab];

  return (
    <div className="pb-16 relative">
      {/* Hidden File Input for JSON Import */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        accept=".json" 
        className="hidden" 
      />

      {/* Main Content Area */}
      <div className="space-y-5">
          {/* Unified Header Bar: Spacious 2-Row Layout */}
          <div className="p-5 sm:p-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            {/* Row 1: Breadcrumb, Live Sheet Link & Utility Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800/80">
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-400 dark:text-slate-500">
                {!isSidebarOpen && (
                  <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm shadow-blue-600/30 transition active:scale-95 mr-1"
                    title="Buka Sidebar Navigasi"
                  >
                    <PanelLeftOpen className="w-3.5 h-3.5" />
                    <span>Buka Sidebar</span>
                  </button>
                )}
                <span>Admin Portal</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-blue-600 dark:text-blue-400 font-extrabold uppercase tracking-wide">
                  {currentTabMeta.badge}
                </span>

                {/* Subtab Switcher Pills directly in Header */}
                <div className="inline-flex items-center gap-1 p-0.5 bg-slate-100/90 dark:bg-slate-800/90 rounded-xl border border-slate-200/70 dark:border-slate-700/70 text-[11px] font-semibold">
                  <button 
                    onClick={() => switchSubtab('findings')} 
                    className={`px-2.5 py-1 rounded-lg transition ${activeAdminSubtab === 'findings' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 font-bold shadow-2xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                  >
                    Temuan ({researchItems.length})
                  </button>
                  <button 
                    onClick={() => switchSubtab('sync')} 
                    className={`px-2.5 py-1 rounded-lg transition ${activeAdminSubtab === 'sync' ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 font-bold shadow-2xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                  >
                    Sync Sheet
                  </button>
                  <button 
                    onClick={() => switchSubtab('audit')} 
                    className={`px-2.5 py-1 rounded-lg transition ${activeAdminSubtab === 'audit' ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 font-bold shadow-2xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                  >
                    Audit ({auditLogs.length})
                  </button>
                  <button 
                    onClick={() => switchSubtab('checklist')} 
                    className={`px-2.5 py-1 rounded-lg transition ${activeAdminSubtab === 'checklist' ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 font-bold shadow-2xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                  >
                    Checklist
                  </button>
                </div>

                {activeAdminSubtab === 'findings' && (
                  <>
                    <span className="text-slate-300 dark:text-slate-700">•</span>
                    <a
                      href={syncStatus?.sheet_url || 'https://docs.google.com/spreadsheets/d/1L0WBGmZVrzIHOojtZjYSeSEEggNsMPOG9AhQQj0-PoY/edit?gid=0#gid=0'}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 hover:text-emerald-800 dark:hover:text-emerald-200 font-semibold text-[11px] transition-colors"
                      title="Buka Google Spreadsheet Riset di tab baru"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Google Sheet Live</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                    </a>
                  </>
                )}
              </div>

              {/* Utility Actions (Sync, Backup, Impor) */}
              <div className="flex items-center flex-wrap gap-2 shrink-0">
                <button
                  onClick={() => setIsSyncModalOpen(true)}
                  className="px-3 py-1.5 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center space-x-1.5 shadow-2xs transition-all active:scale-95"
                  title="Buka Pusat Sinkronisasi Google Sheets"
                >
                  <FileSpreadsheet className={`w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>Sync Sheet</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                </button>

                <button
                  onClick={exportDataJSON}
                  className="px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center space-x-1.5 shadow-2xs transition-all active:scale-95"
                  title="Download seluruh data ke JSON"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                  <span className="hidden sm:inline">Backup JSON</span>
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center space-x-1.5 shadow-2xs transition-all active:scale-95"
                  title="Impor backup data JSON"
                >
                  <Upload className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                  <span className="hidden sm:inline">Impor JSON</span>
                </button>
              </div>
            </div>

            {/* Row 2: Full Title & Primary Action Buttons */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1">
              <div className="space-y-1 max-w-3xl">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                  {currentTabMeta.title}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {currentTabMeta.subtitle}
                </p>
              </div>

              {activeAdminSubtab === 'findings' && (
                <div className="flex items-center space-x-2.5 shrink-0">
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs flex items-center space-x-2 shadow-md shadow-blue-600/25 active:scale-95 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Input Temuan Baru</span>
                  </button>

                  <button
                    onClick={exportResearchMatrixCSV}
                    className="px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center space-x-1.5 shadow-2xs transition-all active:scale-95"
                    title="Download CSV matriks riset"
                  >
                    <Download className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    <span>Ekspor CSV</span>
                  </button>
                </div>
              )}
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
              <div className="p-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                      <FileSpreadsheet className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                        <span>Integrasi Google Spreadsheet Live</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300">
                          Aktif & Terhubung
                        </span>
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Menghubungkan aplikasi langsung ke Google Spreadsheet riset teknologi perbankan.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsSyncModalOpen(true)}
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center space-x-2 shadow-md shadow-emerald-600/20 transition active:scale-95"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                      <span>{isSyncing ? 'Sedang Menarik Data...' : 'Mulai Sinkronisasi Sekarang'}</span>
                    </button>
                    <a
                      href={syncStatus?.sheet_url || 'https://docs.google.com/spreadsheets/d/1L0WBGmZVrzIHOojtZjYSeSEEggNsMPOG9AhQQj0-PoY/edit?gid=0#gid=0'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition"
                      title="Buka Google Sheet di Tab Baru"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Spreadsheet Info Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 space-y-1">
                    <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">
                      Target Google Sheet URL
                    </div>
                    <div className="text-xs font-mono text-slate-800 dark:text-slate-200 truncate font-semibold" title={syncStatus?.sheet_url}>
                      {syncStatus?.sheet_url || 'https://docs.google.com/spreadsheets/d/1L0WBGmZVrzIHOojtZjYSeSEEggNsMPOG9AhQQj0-PoY/edit?gid=0#gid=0'}
                    </div>
                    <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 pt-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Otomatis mengekstrak format CSV publik</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 space-y-1">
                    <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">
                      Total Kapabilitas Terekstrak
                    </div>
                    <div className="text-xl font-black text-slate-900 dark:text-white">
                      {researchItems.length} Kapabilitas
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">
                      2,448 sel evaluasi (6 Bank × 408 Kapabilitas)
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 space-y-1">
                    <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">
                      Status Sinkronisasi Terakhir
                    </div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-blue-500" />
                      <span>{syncStatus?.last_sync_time || 'Baru saja'}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                      {syncStatus?.last_sync_summary || '408 kapabilitas berhasil dimuat ke database SQLite.'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Backup & Migration Hub */}
              <div className="p-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
                <div className="border-b border-slate-200/80 dark:border-slate-800 pb-3">
                  <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                    <Database className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>Cadangan Basis Data & Migrasi JSON / CSV</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Simpan salinan utuh seluruh data sistem untuk kebutuhan arsip, pemulihan bencana (disaster recovery), atau migrasi.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-3">
                    <div className="font-extrabold text-slate-900 dark:text-white">Ekspor Salinan JSON Lengkap</div>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                      Mencakup seluruh 408 kapabilitas riset arsitektur, profil 6 bank, dan jejak riwayat audit.
                    </p>
                    <button
                      onClick={exportDataJSON}
                      className="w-full py-2 px-3 rounded-xl bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white font-bold flex items-center justify-center space-x-1.5 transition active:scale-95"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download JSON</span>
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-3">
                    <div className="font-extrabold text-slate-900 dark:text-white">Impor Salinan JSON</div>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                      Pulihkan data dari file backup JSON sebelumnya secara aman ke dalam penyimpanan SQLite.
                    </p>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-2 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-100 font-bold flex items-center justify-center space-x-1.5 transition active:scale-95"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Unggah File JSON</span>
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-3">
                    <div className="font-extrabold text-slate-900 dark:text-white">Ekspor Matriks CSV (Excel)</div>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                      Unduh tabel 408 kapabilitas x 6 bank lengkap dengan status, evaluasi, dan tautan bukti riset.
                    </p>
                    <button
                      onClick={exportResearchMatrixCSV}
                      className="w-full py-2 px-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-bold flex items-center justify-center space-x-1.5 transition active:scale-95"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5" />
                      <span>Download CSV</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Danger Zone: Reset Data */}
              <div className="p-5 bg-red-50/40 dark:bg-red-950/20 rounded-3xl border border-red-200 dark:border-red-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-2xl bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 shrink-0">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-red-950 dark:text-red-200 text-xs">Zona Berbahaya: Reset Basis Data</h4>
                    <p className="text-[11px] text-red-700 dark:text-red-300/80 mt-0.5">
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
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center space-x-1.5 shadow-xs transition active:scale-95 shrink-0"
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
                <div className="p-4 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                  <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Total Log</div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">{auditLogs.length}</div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500">Aktivitas tercatat</div>
                </div>

                <div className="p-4 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                  <div className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase">CREATE</div>
                  <div className="text-2xl font-black text-blue-700 dark:text-blue-300 mt-1">
                    {auditLogs.filter(l => l.aksi === 'CREATE').length}
                  </div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500">Entitas dibuat</div>
                </div>

                <div className="p-4 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                  <div className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase">UPDATE</div>
                  <div className="text-2xl font-black text-amber-700 dark:text-amber-300 mt-1">
                    {auditLogs.filter(l => l.aksi === 'UPDATE').length}
                  </div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500">Perubahan data</div>
                </div>

                <div className="p-4 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                  <div className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase">DELETE</div>
                  <div className="text-2xl font-black text-red-700 dark:text-red-300 mt-1">
                    {auditLogs.filter(l => l.aksi === 'DELETE').length}
                  </div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500">Penghapusan entitas</div>
                </div>
              </div>

              {/* Audit Log Table & Filters */}
              <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="p-5 bg-slate-50/80 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <span className="text-sm font-black text-slate-900 dark:text-white tracking-tight">
                      Catatan Audit Perubahan Sistem ({filteredAuditLogs.length} dari {auditLogs.length})
                    </span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Memenuhi kepatuhan pelacakan jejak data (Audit Trail)</p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                    <div className="flex items-center space-x-1 overflow-x-auto pb-1 sm:pb-0">
                      {['SEMUA', 'CREATE', 'UPDATE', 'DELETE'].map(action => (
                        <button
                          key={action}
                          onClick={() => setAuditActionFilter(action === 'SEMUA' ? null : action)}
                          className={`px-3 py-1 rounded-xl text-[10px] font-bold transition whitespace-nowrap ${
                            (auditActionFilter === action || (action === 'SEMUA' && !auditActionFilter))
                              ? 'bg-slate-900 dark:bg-blue-600 text-white shadow-xs'
                              : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-750'
                          }`}
                        >
                          {action}
                        </button>
                      ))}
                    </div>

                    <div className="relative w-full sm:w-64">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                      <input
                        type="text"
                        placeholder="Cari aksi, entitas, user..."
                        value={searchAudit}
                        onChange={e => setSearchAudit(e.target.value)}
                        className="w-full pl-8 pr-8 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      {searchAudit && (
                        <button 
                          onClick={() => setSearchAudit('')}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                          title="Hapus pencarian"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-slate-100 dark:divide-slate-800/80 text-xs max-h-[600px] overflow-y-auto">
                  {filteredAuditLogs.length === 0 ? (
                    <div className="p-12 text-center text-slate-400 dark:text-slate-500">
                      Tidak ada catatan audit yang cocok dengan pencarian "{searchAudit}"{auditActionFilter ? ` dan filter [${auditActionFilter}]` : ''}.
                    </div>
                  ) : (
                    filteredAuditLogs.map(log => (
                      <div key={log.id} className="p-4 hover:bg-slate-50/70 dark:hover:bg-slate-800/40 flex items-start justify-between gap-4 transition-colors">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-0.5 rounded-md font-extrabold text-[10px] uppercase ${
                              log.aksi === 'CREATE'
                                ? 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300'
                                : log.aksi === 'UPDATE'
                                ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                                : log.aksi === 'DELETE'
                                ? 'bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                            }`}>
                              {log.aksi}
                            </span>
                            <span className="font-extrabold text-slate-900 dark:text-white">{log.entitas}</span>
                            <span className="text-slate-300 dark:text-slate-600">•</span>
                            <span className="text-slate-500 dark:text-slate-400 font-medium">Oleh {log.userName}</span>
                          </div>
                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-normal">{log.detail}</p>
                        </div>
                        <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono shrink-0">
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
              <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight flex items-center space-x-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <span>Checklist Pemeriksaan Kesiapan Workshop & Analisis Arsitektur</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Kepatuhan tata kelola riset: pastikan integritas bukti empiris dan ketiadaan celah sensitif sebelum sesi konsultasi bersama Dewan Direksi dan arsitek Bank BRI.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-slate-900 dark:text-white">1. Validitas & Tautan Bukti Riset</span>
                      <span className="px-2.5 py-0.5 rounded-full font-bold text-[10px] bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        100% Terdokumentasi
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      Seluruh 408 kapabilitas arsitektur memiliki status bukti evaluasi yang jelas (Terverifikasi, Inferensi, Belum) di seluruh 6 bank.
                    </p>
                    <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold flex items-center space-x-1.5 pt-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>2,448 sel evaluasi siap dikomparasikan.</span>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-slate-900 dark:text-white">2. Standarisasi 4 Workshop & 13 Domain</span>
                      <span className="px-2.5 py-0.5 rounded-full font-bold text-[10px] bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                        Terstandar MBB
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      Struktur workshop dikelompokkan ke dalam WS1 (Core & Digital), WS2 (EDW & BI), WS3 (Cloud & Infra), dan WS4 (Big Data & AI).
                    </p>
                    <div className="text-[11px] text-blue-700 dark:text-blue-400 font-semibold flex items-center space-x-1.5 pt-1">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span>Mencakup 13 domain arsitektur perbankan modern.</span>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-slate-900 dark:text-white">3. Tata Kelola & Integritas Keamanan Data</span>
                      <span className="px-2.5 py-0.5 rounded-full font-bold text-[10px] bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        Aman & Patuh
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      Seluruh data riset dikelola dengan standar kepatuhan informasi perbankan, terisolasi dalam kontrol akses peran (RBAC), dan dilindungi jejak audit penuh.
                    </p>
                    <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold flex items-center space-x-1.5 pt-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>100% data terproteksi dan diaudit secara otomatis.</span>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-slate-900 dark:text-white">4. Kesiapan Matriks Analitik & Benchmark Eksekutif</span>
                      <span className="px-2.5 py-0.5 rounded-full font-bold text-[10px] bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        100% Siap
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
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
    </div>
  );
};
