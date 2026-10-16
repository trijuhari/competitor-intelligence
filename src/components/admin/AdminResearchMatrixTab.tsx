import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, Plus, Download, Edit3, Trash2, CheckCircle2, 
  AlertTriangle, HelpCircle, ExternalLink, RotateCcw, 
  ChevronLeft, ChevronRight, Layers, Building2, Eye, Database,
  FileSpreadsheet
} from 'lucide-react';
import { ResearchItem, VerificationStatus } from '../../types';
import { AdminResearchEditModal } from './AdminResearchEditModal';
import { AdminResearchAddModal } from './AdminResearchAddModal';

const WORKSHOP_META: Record<string, { label: string; color: string; bg: string; border: string }> = {
  WS1: { label: 'WS1: Core & Digital', color: 'text-blue-700 dark:text-blue-300', bg: 'bg-blue-50 dark:bg-blue-950/40', border: 'border-blue-200 dark:border-blue-800' },
  WS2: { label: 'WS2: EDW & BI', color: 'text-indigo-700 dark:text-indigo-300', bg: 'bg-indigo-50 dark:bg-indigo-950/40', border: 'border-indigo-200 dark:border-indigo-800' },
  WS3: { label: 'WS3: Cloud & Infra', color: 'text-cyan-700 dark:text-cyan-300', bg: 'bg-cyan-50 dark:bg-cyan-950/40', border: 'border-cyan-200 dark:border-cyan-800' },
  WS4: { label: 'WS4: Big Data & AI', color: 'text-purple-700 dark:text-purple-300', bg: 'bg-purple-50 dark:bg-purple-950/40', border: 'border-purple-200 dark:border-purple-800' }
};

const BANK_SLUGS = [
  { key: 'bri', label: 'BRI', isFocus: true },
  { key: 'mandiri', label: 'Mandiri', isFocus: false },
  { key: 'bca', label: 'BCA', isFocus: false },
  { key: 'bni', label: 'BNI', isFocus: false },
  { key: 'btn', label: 'BTN', isFocus: false },
  { key: 'bsi', label: 'BSI', isFocus: false }
];

export const AdminResearchMatrixTab: React.FC = () => {
  const { 
    researchItems, 
    updateResearchCapability, 
    addResearchCapability, 
    deleteResearchCapability,
    setSelectedResearchCell,
    exportResearchMatrixCSV,
    setIsSyncModalOpen,
    syncStatus,
    isSyncing
  } = useApp();

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [workshopFilter, setWorkshopFilter] = useState('all');
  const [domainFilter, setDomainFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  // Modals state
  const [editingItem, setEditingItem] = useState<ResearchItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Domains & Categories lists
  const allDomains = useMemo(() => {
    return Array.from(new Set(researchItems.map(i => i.domain))).filter(Boolean);
  }, [researchItems]);

  const allCategories = useMemo(() => {
    return Array.from(new Set(researchItems.map(i => i.kategori))).filter(Boolean);
  }, [researchItems]);

  // Statistics
  const stats = useMemo(() => {
    let verified = 0;
    let inference = 0;
    let belum = 0;
    const totalCells = researchItems.length * 6;

    researchItems.forEach(item => {
      BANK_SLUGS.forEach(b => {
        const status = item.banks[b.key]?.status;
        if (status === 'Terverifikasi') verified++;
        else if (status === 'Inferensi') inference++;
        else belum++;
      });
    });

    return {
      total: researchItems.length,
      totalCells,
      verified,
      inference,
      belum
    };
  }, [researchItems]);

  // Filtered items
  const filteredItems = useMemo(() => {
    return researchItems.filter(item => {
      if (workshopFilter !== 'all' && item.workshop !== workshopFilter) return false;
      if (domainFilter !== 'all' && item.domain !== domainFilter) return false;
      if (categoryFilter !== 'all' && item.kategori !== categoryFilter) return false;

      if (statusFilter !== 'all') {
        const hasStatus = Object.values(item.banks).some(b => b.status === statusFilter);
        if (!hasStatus) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchCap = item.kapabilitas.toLowerCase().includes(q);
        const matchDomain = item.domain.toLowerCase().includes(q);
        const matchKategori = item.kategori.toLowerCase().includes(q);
        const matchBanks = Object.values(item.banks).some(b => 
          b.merk?.toLowerCase().includes(q) || b.link?.toLowerCase().includes(q) || b.pic?.toLowerCase().includes(q)
        );
        if (!matchCap && !matchDomain && !matchKategori && !matchBanks) return false;
      }

      return true;
    });
  }, [researchItems, workshopFilter, domainFilter, categoryFilter, statusFilter, searchQuery]);

  const totalFiltered = filteredItems.length;
  const totalPages = pageSize === -1 ? 1 : Math.ceil(totalFiltered / pageSize);
  const effectivePage = Math.min(Math.max(currentPage, 1), totalPages || 1);

  const paginatedItems = useMemo(() => {
    if (pageSize === -1) return filteredItems;
    const start = (effectivePage - 1) * pageSize;
    return filteredItems.slice(start, start + pageSize);
  }, [filteredItems, effectivePage, pageSize]);

  const resetFilters = () => {
    setSearchQuery('');
    setWorkshopFilter('all');
    setDomainFilter('all');
    setCategoryFilter('all');
    setStatusFilter('all');
    setCurrentPage(1);
  };

  const isFilterActive = searchQuery.trim() !== '' || workshopFilter !== 'all' || 
    domainFilter !== 'all' || categoryFilter !== 'all' || statusFilter !== 'all';

  return (
    <div className="space-y-5">
      {/* Header & Primary Actions */}
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2.5">
            <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight flex items-center space-x-2">
              <Database className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>Kelola Temuan Arsitektur & Kapabilitas (408 Baris)</span>
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              Data Utama Sheet
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 max-w-2xl leading-relaxed">
            Modul pengelolaan data utama riset perbankan Himbara & BCA. Edit temuan, status verifikasi (Terverifikasi, Inferensi, Belum), merk teknologi, serta tautan bukti rujukan setiap bank.
          </p>
        </div>

        <div className="flex items-center space-x-2.5 flex-wrap">
          <button
            onClick={() => setIsSyncModalOpen(true)}
            className="px-3.5 py-2.5 rounded-xl border border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center space-x-1.5 shadow-2xs active:scale-95 transition-all"
            title="Buka Pusat Sinkronisasi Google Sheets"
          >
            <FileSpreadsheet className={`w-4 h-4 text-emerald-600 dark:text-emerald-400 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>Sync Google Sheet</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold flex items-center space-x-1.5 shadow-sm shadow-blue-600/20 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ Input Temuan Baru</span>
          </button>

          <button
            onClick={exportResearchMatrixCSV}
            className="px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center space-x-1.5 shadow-xs transition"
          >
            <Download className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span>Ekspor CSV</span>
          </button>
        </div>
      </div>

      {/* Google Sheets Live Sync Ribbon */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50/50 to-white dark:from-emerald-950/40 dark:via-teal-950/20 dark:to-slate-900 p-3.5 rounded-2xl border border-emerald-200/90 dark:border-emerald-800/80 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 flex items-center justify-center shrink-0">
            <FileSpreadsheet className="w-4 h-4 text-emerald-700 dark:text-emerald-300" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-slate-900 dark:text-white">Google Spreadsheet Riset Terhubung:</span>
              <a 
                href={syncStatus?.sheet_url || 'https://docs.google.com/spreadsheets/d/1L0WBGmZVrzIHOojtZjYSeSEEggNsMPOG9AhQQj0-PoY/edit?gid=0#gid=0'} 
                target="_blank" 
                rel="noreferrer"
                className="font-mono text-[11px] text-blue-700 dark:text-blue-400 hover:underline flex items-center space-x-1 truncate"
              >
                <span className="truncate">1L0WBGmZVrzIHOojtZjYSeSEEggNsMPOG9AhQQj0-PoY</span>
                <ExternalLink className="w-3 h-3 shrink-0 ml-0.5" />
              </a>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">
              {syncStatus?.last_sync_time 
                ? `Terakhir sinkronisasi: ${syncStatus.last_sync_time} (${syncStatus.last_sync_status})` 
                : 'Data terhubung dan siap disinkronisasi dua arah.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsSyncModalOpen(true)}
          className="shrink-0 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center space-x-1.5 shadow-2xs transition active:scale-95"
        >
          <span>Pusat Sinkronisasi</span>
          <span>→</span>
        </button>
      </div>

      {/* KPI Stats Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card hover:shadow-card-hover transition-all">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">Total Temuan Kapabilitas</div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-0.5 tracking-tight">{stats.total}</div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">13 Domain Arsitektur</div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50/80 to-teal-50/40 dark:from-emerald-950/40 dark:to-teal-950/20 p-4 rounded-2xl border border-emerald-200/80 dark:border-emerald-800/80 shadow-card hover:shadow-card-hover transition-all">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Terverifikasi</span>
          </div>
          <div className="text-2xl font-black text-emerald-950 dark:text-emerald-100 mt-0.5 tracking-tight">{stats.verified}</div>
          <div className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">dari {stats.totalCells} sel evaluasi</div>
        </div>

        <div className="bg-gradient-to-br from-amber-50/80 to-yellow-50/40 dark:from-amber-950/40 dark:to-yellow-950/20 p-4 rounded-2xl border border-amber-200/80 dark:border-amber-800/80 shadow-card hover:shadow-card-hover transition-all">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            <span>Inferensi Industri</span>
          </div>
          <div className="text-2xl font-black text-amber-950 dark:text-amber-100 mt-0.5 tracking-tight">{stats.inference}</div>
          <div className="text-[10px] text-amber-700 dark:text-amber-400 font-semibold">Sinyal media & publikasi</div>
        </div>

        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card hover:shadow-card-hover transition-all">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600"></span>
            <span>Belum Terdata</span>
          </div>
          <div className="text-2xl font-black text-slate-700 dark:text-slate-200 mt-0.5 tracking-tight">{stats.belum}</div>
          <div className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Menunggu riset tambahan</div>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search Box */}
          <div className="md:col-span-4 relative">
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari kapabilitas, domain, sistem, merk, atau link..."
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-slate-750"
            />
          </div>

          {/* Workshop Filter */}
          <div className="md:col-span-2">
            <select
              value={workshopFilter}
              onChange={e => { setWorkshopFilter(e.target.value); setCurrentPage(1); }}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:bg-white dark:focus:bg-slate-750 font-medium"
            >
              <option value="all">Semua Workshop</option>
              <option value="WS1">WS1: Core & Digital</option>
              <option value="WS2">WS2: EDW & BI</option>
              <option value="WS3">WS3: Cloud & Infra</option>
              <option value="WS4">WS4: Big Data & AI</option>
            </select>
          </div>

          {/* Domain Filter */}
          <div className="md:col-span-3">
            <select
              value={domainFilter}
              onChange={e => { setDomainFilter(e.target.value); setCurrentPage(1); }}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:bg-white dark:focus:bg-slate-750 font-medium"
            >
              <option value="all">Semua Domain ({allDomains.length})</option>
              {allDomains.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="md:col-span-2">
            <select
              value={statusFilter}
              onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:bg-white dark:focus:bg-slate-750 font-medium"
            >
              <option value="all">Semua Status</option>
              <option value="Terverifikasi">Terverifikasi (✓)</option>
              <option value="Inferensi">Inferensi (⚠)</option>
              <option value="Belum">Belum Terdata (–)</option>
            </select>
          </div>

          {/* Reset Button */}
          <div className="md:col-span-1 flex justify-end">
            {isFilterActive && (
              <button
                onClick={resetFilters}
                className="p-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition"
                title="Reset Filter"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Pagination Sub-bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
          <div>
            Menampilkan <strong className="text-slate-800 dark:text-slate-200">{totalFiltered === 0 ? 0 : (effectivePage - 1) * (pageSize === -1 ? totalFiltered : pageSize) + 1}</strong> – <strong className="text-slate-800 dark:text-slate-200">{pageSize === -1 ? totalFiltered : Math.min(effectivePage * pageSize, totalFiltered)}</strong> dari <strong className="text-slate-800 dark:text-slate-200">{totalFiltered}</strong> kapabilitas
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5">
              <span>Baris per halaman:</span>
              <select
                value={pageSize}
                onChange={e => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
                className="px-2 py-1 rounded-lg border border-slate-300 dark:border-slate-700 text-xs bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
              >
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={-1}>Semua ({totalFiltered})</option>
              </select>
            </div>

            {pageSize !== -1 && totalPages > 1 && (
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={effectivePage <= 1}
                  className="p-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none text-slate-600 dark:text-slate-300"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Hal {effectivePage} / {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={effectivePage >= totalPages}
                  className="p-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none text-slate-600 dark:text-slate-300"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Main Admin Data Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/90 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 font-bold">
                <th className="py-3.5 px-3 w-12 text-center border-r border-slate-200 dark:border-slate-700/80">No</th>
                <th className="py-3.5 px-3 w-16 text-center border-r border-slate-200 dark:border-slate-700/80">WS</th>
                <th className="py-3.5 px-3 w-48 border-r border-slate-200 dark:border-slate-700/80">Domain & Kategori</th>
                <th className="py-3.5 px-4 min-w-[200px] border-r border-slate-200 dark:border-slate-700/80">Kapabilitas / Sistem</th>
                {BANK_SLUGS.map(b => (
                  <th key={b.key} className={`py-3.5 px-2.5 text-center min-w-[130px] border-r border-slate-200 dark:border-slate-700/80 ${b.isFocus ? 'bg-blue-50/70 dark:bg-blue-950/40 text-blue-900 dark:text-blue-300' : ''}`}>
                    <span className="font-extrabold">{b.label}</span>
                    {b.isFocus && <span className="ml-1 px-1 py-0.2 bg-blue-600 text-white text-[9px] rounded font-bold">FOKUS</span>}
                  </th>
                ))}
                <th className="py-3.5 px-3 w-24 text-center">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {paginatedItems.length === 0 ? (
                <tr>
                  <td colSpan={5 + BANK_SLUGS.length} className="py-12 text-center text-slate-400 dark:text-slate-500">
                    Tidak ada kapabilitas yang cocok dengan filter atau kata kunci "{searchQuery}".
                  </td>
                </tr>
              ) : (
                paginatedItems.map(item => {
                  const ws = WORKSHOP_META[item.workshop] || {
                    label: item.workshop,
                    color: 'text-slate-700 dark:text-slate-300',
                    bg: 'bg-slate-100 dark:bg-slate-800',
                    border: 'border-slate-200 dark:border-slate-700'
                  };

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition group">
                      {/* No */}
                      <td className="py-3 px-3 text-center font-mono text-slate-400 dark:text-slate-500 border-r border-slate-100 dark:border-slate-800/60 align-top">
                        {item.no}
                      </td>

                      {/* Workshop */}
                      <td className="py-3 px-2 text-center border-r border-slate-100 dark:border-slate-800/60 align-top">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold border ${ws.bg} ${ws.color} ${ws.border}`}>
                          {item.workshop}
                        </span>
                      </td>

                      {/* Domain & Kategori */}
                      <td className="py-3 px-3 border-r border-slate-100 dark:border-slate-800/60 align-top">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 leading-tight">
                          {item.domain}
                        </div>
                        <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                          {item.kategori}
                        </div>
                      </td>

                      {/* Kapabilitas */}
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white border-r border-slate-100 dark:border-slate-800/60 align-top">
                        <div className="leading-snug">
                          {item.kapabilitas}
                        </div>
                        <div className="text-[10px] text-slate-400 dark:text-slate-500 font-normal mt-0.5">
                          ID: {item.id}
                        </div>
                      </td>

                      {/* 6 Bank Columns */}
                      {BANK_SLUGS.map(b => {
                        const bDetail = item.banks[b.key] || {
                          bankCode: b.label,
                          merk: '-',
                          link: '',
                          status: 'Belum'
                        };

                        const isVerified = bDetail.status === 'Terverifikasi';
                        const isInference = bDetail.status === 'Inferensi';
                        const isBelum = bDetail.status === 'Belum' || !bDetail.status;

                        return (
                          <td 
                            key={b.key} 
                            className={`py-2 px-2 border-r border-slate-100 dark:border-slate-800/60 align-top ${b.isFocus ? 'bg-blue-50/20 dark:bg-blue-950/20' : ''}`}
                          >
                            <button
                              type="button"
                              onClick={() => setSelectedResearchCell({ capId: item.id, bankCode: b.key })}
                              className={`w-full text-left p-1.5 rounded-lg border text-[11px] transition hover:scale-102 ${
                                isVerified 
                                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/70 text-emerald-950 dark:text-emerald-200'
                                  : isInference
                                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/70 text-amber-950 dark:text-amber-200'
                                  : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 text-slate-400 dark:text-slate-500'
                              }`}
                              title={`Klik untuk edit rincian bukti ${b.label}`}
                            >
                              <div className="font-semibold truncate leading-tight">
                                {bDetail.merk || '–'}
                              </div>
                              <div className="flex items-center space-x-1 mt-1 text-[9px]">
                                {isVerified && <span className="text-emerald-700 dark:text-emerald-400 font-bold">✓ Verified</span>}
                                {isInference && <span className="text-amber-700 dark:text-amber-400 font-bold">⚠ Inferensi</span>}
                                {isBelum && <span className="text-slate-400 dark:text-slate-500">– Belum</span>}
                              </div>
                            </button>
                          </td>
                        );
                      })}

                      {/* Actions: Edit & Delete */}
                      <td className="py-3 px-3 text-center align-top">
                        <div className="flex items-center justify-center space-x-1">
                          <button
                            type="button"
                            onClick={() => setEditingItem(item)}
                            className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 transition"
                            title="Edit seluruh baris & 6 bank"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={async () => {
                              if (confirm(`Hapus kapabilitas #${item.no}: "${item.kapabilitas}"?`)) {
                                await deleteResearchCapability(item.id);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-red-50 dark:bg-red-950/50 hover:bg-red-100 dark:hover:bg-red-900/60 text-red-600 dark:text-red-400 transition"
                            title="Hapus kapabilitas ini"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <AdminResearchEditModal
          item={editingItem}
          isOpen={!!editingItem}
          onClose={() => setEditingItem(null)}
          onSave={updateResearchCapability}
          onDelete={deleteResearchCapability}
        />
      )}

      {/* Add Modal */}
      {isAddModalOpen && (
        <AdminResearchAddModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={addResearchCapability}
        />
      )}
    </div>
  );
};
