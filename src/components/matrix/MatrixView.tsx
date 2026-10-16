import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Filter, Download, Plus, Search, ExternalLink, ShieldCheck, 
  CheckCircle2, AlertTriangle, HelpCircle, ChevronLeft, ChevronRight, 
  RotateCcw, Layers, Database, Sparkles, Server, Cpu, Building2, Eye,
  FileSpreadsheet
} from 'lucide-react';
import { VerificationStatus } from '../../types';

const WORKSHOP_META: Record<string, { label: string; desc: string; color: string; bg: string; border: string }> = {
  WS1: { 
    label: 'WS1: Core & Digital Banking', 
    desc: 'Core Banking (CBS), Mobile Banking, Internet Banking, Digital Banking',
    color: 'text-blue-700 dark:text-blue-300',
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    border: 'border-blue-200 dark:border-blue-800'
  },
  WS2: { 
    label: 'WS2: EDW, MDM & BI', 
    desc: 'Enterprise Data Warehouse, Master Data Management, Business Intelligence',
    color: 'text-indigo-700 dark:text-indigo-300',
    bg: 'bg-indigo-50 dark:bg-indigo-950/40',
    border: 'border-indigo-200 dark:border-indigo-800'
  },
  WS3: { 
    label: 'WS3: Cloud, Infra & ITSM', 
    desc: 'Cloud Technology, Infrastructure, Network, IT Support (ITSM)',
    color: 'text-cyan-700 dark:text-cyan-300',
    bg: 'bg-cyan-50 dark:bg-cyan-950/40',
    border: 'border-cyan-200 dark:border-cyan-800'
  },
  WS4: { 
    label: 'WS4: Big Data & AI', 
    desc: 'Big Data Analytics, AI Technology & Machine Learning',
    color: 'text-purple-700 dark:text-purple-300',
    bg: 'bg-purple-50 dark:bg-purple-950/40',
    border: 'border-purple-200 dark:border-purple-800'
  }
};

const BANK_SLUGS = [
  { key: 'bri', label: 'BRI', fullName: 'Bank Rakyat Indonesia', isFocus: true, logo: '🟦' },
  { key: 'mandiri', label: 'Mandiri', fullName: 'Bank Mandiri', isFocus: false, logo: '🟨' },
  { key: 'bca', label: 'BCA', fullName: 'Bank Central Asia', isFocus: false, logo: '🔵' },
  { key: 'bni', label: 'BNI', fullName: 'Bank Negara Indonesia', isFocus: false, logo: '🟧' },
  { key: 'btn', label: 'BTN', fullName: 'Bank Tabungan Negara', isFocus: false, logo: '🔷' },
  { key: 'bsi', label: 'BSI', fullName: 'Bank Syariah Indonesia', isFocus: false, logo: '🟩' }
];

export const MatrixView: React.FC = () => {
  const { 
    researchItems,
    setSelectedResearchCell,
    exportResearchMatrixCSV,
    currentUser,
    setActiveTab,
    setIsSyncModalOpen
  } = useApp();

  // Filters
  const [workshopFilter, setWorkshopFilter] = useState<string>('all');
  const [domainFilter, setDomainFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(50);

  // Extract all unique Domains and Categories
  const allDomains = useMemo(() => {
    return Array.from(new Set(researchItems.map(item => item.domain))).filter(Boolean);
  }, [researchItems]);

  const allCategories = useMemo(() => {
    return Array.from(new Set(researchItems.map(item => item.kategori))).filter(Boolean);
  }, [researchItems]);

  // High-level statistics
  const stats = useMemo(() => {
    let verifiedCount = 0;
    let inferenceCount = 0;
    let belumCount = 0;
    const totalCells = researchItems.length * 6;

    researchItems.forEach(item => {
      BANK_SLUGS.forEach(b => {
        const detail = item.banks[b.key];
        if (detail?.status === 'Terverifikasi') verifiedCount++;
        else if (detail?.status === 'Inferensi') inferenceCount++;
        else belumCount++;
      });
    });

    const wsCounts: Record<string, number> = { WS1: 0, WS2: 0, WS3: 0, WS4: 0 };
    researchItems.forEach(item => {
      if (wsCounts[item.workshop] !== undefined) {
        wsCounts[item.workshop]++;
      }
    });

    return {
      total: researchItems.length,
      totalCells,
      verifiedCount,
      inferenceCount,
      belumCount,
      verifiedPct: Math.round((verifiedCount / (totalCells || 1)) * 100),
      inferencePct: Math.round((inferenceCount / (totalCells || 1)) * 100),
      belumPct: Math.round((belumCount / (totalCells || 1)) * 100),
      wsCounts
    };
  }, [researchItems]);

  // Filter 408 items
  const filteredResearchItems = useMemo(() => {
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
        const matchMerk = Object.values(item.banks).some(b => 
          b.merk?.toLowerCase().includes(q) || b.link?.toLowerCase().includes(q)
        );
        if (!matchCap && !matchDomain && !matchKategori && !matchMerk) return false;
      }

      return true;
    });
  }, [researchItems, workshopFilter, domainFilter, categoryFilter, statusFilter, searchQuery]);

  const totalFiltered = filteredResearchItems.length;
  const totalPages = pageSize === -1 ? 1 : Math.ceil(totalFiltered / pageSize);
  const effectivePage = Math.min(Math.max(currentPage, 1), totalPages || 1);

  const paginatedResearchItems = useMemo(() => {
    if (pageSize === -1) return filteredResearchItems;
    const start = (effectivePage - 1) * pageSize;
    return filteredResearchItems.slice(start, start + pageSize);
  }, [filteredResearchItems, effectivePage, pageSize]);

  const resetFilters = () => {
    setWorkshopFilter('all');
    setDomainFilter('all');
    setCategoryFilter('all');
    setStatusFilter('all');
    setSearchQuery('');
    setCurrentPage(1);
  };

  const isFilterActive = workshopFilter !== 'all' || domainFilter !== 'all' || 
    categoryFilter !== 'all' || statusFilter !== 'all' || searchQuery.trim() !== '';

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2.5">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Matriks Riset Kapabilitas Teknologi Perbankan
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300">
              408 Kapabilitas · 13 Domain · 6 Bank
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-3xl">
            Hasil inventarisasi riset komprehensif arsitektur teknologi perbankan Himbara (BRI, Mandiri, BNI, BTN, BSI) & BCA berdasarkan 4 Workshop, 13 Domain Arsitektur, dan 9 Kategori Sistem.
          </p>
        </div>

        {/* Primary Actions */}
        <div className="flex items-center space-x-2.5 flex-wrap">
          <button
            onClick={() => setIsSyncModalOpen(true)}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl border border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200 text-xs font-bold shadow-xs transition active:scale-95"
            title="Sinkronisasi dua arah dengan Google Sheets"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Sync Google Sheet</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          </button>

          <button
            onClick={exportResearchMatrixCSV}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-xs transition"
            title="Download seluruh data matriks ke file CSV spreadsheet"
          >
            <Download className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span>Ekspor CSV (408 Baris)</span>
          </button>

          {(currentUser.role === 'Admin' || currentUser.role === 'Analyst') && (
            <button
              onClick={() => setActiveTab('admin')}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition"
            >
              <Plus className="w-4 h-4" />
              <span>Kelola Data Admin</span>
            </button>
          )}
        </div>
      </div>

      {/* Top KPI Statistics Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card hover:shadow-card-hover transition-all">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">Total Kapabilitas</div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-0.5 tracking-tight">{stats.total}</div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">13 Domain Arsitektur</div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50/80 to-teal-50/40 dark:from-emerald-950/40 dark:to-teal-950/20 p-3.5 rounded-2xl border border-emerald-200/80 dark:border-emerald-800/80 shadow-card hover:shadow-card-hover transition-all">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Terverifikasi</span>
          </div>
          <div className="text-2xl font-black text-emerald-950 dark:text-emerald-100 mt-0.5 tracking-tight">{stats.verifiedCount}</div>
          <div className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">{stats.verifiedPct}% dari 2.448 sel</div>
        </div>

        <div className="bg-gradient-to-br from-amber-50/80 to-yellow-50/40 dark:from-amber-950/40 dark:to-yellow-950/20 p-3.5 rounded-2xl border border-amber-200/80 dark:border-amber-800/80 shadow-card hover:shadow-card-hover transition-all">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            <span>Inferensi</span>
          </div>
          <div className="text-2xl font-black text-amber-950 dark:text-amber-100 mt-0.5 tracking-tight">{stats.inferenceCount}</div>
          <div className="text-[10px] text-amber-700 dark:text-amber-400 font-semibold">{stats.inferencePct}% sinyal publik</div>
        </div>

        <div className="bg-gradient-to-br from-blue-50/80 to-sky-50/40 dark:from-blue-950/40 dark:to-sky-950/20 p-3.5 rounded-2xl border border-blue-200/80 dark:border-blue-800/80 shadow-card hover:shadow-card-hover transition-all">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-blue-800 dark:text-blue-300">WS1 Core & Digital</div>
          <div className="text-2xl font-black text-blue-950 dark:text-blue-100 mt-0.5 tracking-tight">{stats.wsCounts.WS1}</div>
          <div className="text-[10px] text-blue-700 dark:text-blue-400 font-medium">CBS, M-Banking, Web</div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50/80 to-violet-50/40 dark:from-indigo-950/40 dark:to-violet-950/20 p-3.5 rounded-2xl border border-indigo-200/80 dark:border-indigo-800/80 shadow-card hover:shadow-card-hover transition-all">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-800 dark:text-indigo-300">WS2 EDW & BI</div>
          <div className="text-2xl font-black text-indigo-950 dark:text-indigo-100 mt-0.5 tracking-tight">{stats.wsCounts.WS2}</div>
          <div className="text-[10px] text-indigo-700 dark:text-indigo-400 font-medium">Data Warehouse & MDM</div>
        </div>

        <div className="bg-gradient-to-br from-cyan-50/80 to-teal-50/40 dark:from-cyan-950/40 dark:to-teal-950/20 p-3.5 rounded-2xl border border-cyan-200/80 dark:border-cyan-800/80 shadow-card hover:shadow-card-hover transition-all">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-800 dark:text-cyan-300">WS3 Cloud & Infra</div>
          <div className="text-2xl font-black text-cyan-950 dark:text-cyan-100 mt-0.5 tracking-tight">{stats.wsCounts.WS3}</div>
          <div className="text-[10px] text-cyan-700 dark:text-cyan-400 font-medium">Cloud, Jaringan, ITSM</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50/80 to-fuchsia-50/40 dark:from-purple-950/40 dark:to-fuchsia-950/20 p-3.5 rounded-2xl border border-purple-200/80 dark:border-purple-800/80 shadow-card hover:shadow-card-hover transition-all">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-purple-800 dark:text-purple-300">WS4 Big Data & AI</div>
          <div className="text-2xl font-black text-purple-950 dark:text-purple-100 mt-0.5 tracking-tight">{stats.wsCounts.WS4}</div>
          <div className="text-[10px] text-purple-700 dark:text-purple-400 font-medium">Hadoop, GenAI & ML</div>
        </div>
      </div>

      {/* Workshop Tabs Navigation */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => { setWorkshopFilter('all'); setCurrentPage(1); }}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center space-x-2 ${
            workshopFilter === 'all'
              ? 'bg-slate-900 dark:bg-blue-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          <span>Semua Workshop</span>
          <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
            workshopFilter === 'all' ? 'bg-slate-800 dark:bg-blue-700 text-slate-200 dark:text-blue-100' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
          }`}>
            {researchItems.length}
          </span>
        </button>

        {Object.entries(WORKSHOP_META).map(([key, meta]) => {
          const count = stats.wsCounts[key] || 0;
          const isActive = workshopFilter === key;
          return (
            <button
              key={key}
              onClick={() => { setWorkshopFilter(key); setCurrentPage(1); }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center space-x-2 border ${
                isActive
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span>{meta.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                isActive ? 'bg-blue-700 text-blue-100' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filters & Control Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search Bar */}
          <div className="md:col-span-4 relative">
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari kapabilitas, domain, sistem, atau merk..."
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-slate-800 transition"
            />
          </div>

          {/* Domain Dropdown */}
          <div className="md:col-span-3">
            <select
              value={domainFilter}
              onChange={e => { setDomainFilter(e.target.value); setCurrentPage(1); }}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs bg-slate-50 dark:bg-slate-800/90 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 dark:text-slate-200 font-medium"
            >
              <option value="all">Semua Domain ({allDomains.length})</option>
              {allDomains.map(d => (
                <option key={d} value={d}>
                  {d} ({researchItems.filter(r => r.domain === d).length})
                </option>
              ))}
            </select>
          </div>

          {/* Kategori Dropdown */}
          <div className="md:col-span-2">
            <select
              value={categoryFilter}
              onChange={e => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs bg-slate-50 dark:bg-slate-800/90 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 dark:text-slate-200 font-medium"
            >
              <option value="all">Semua Kategori ({allCategories.length})</option>
              {allCategories.map(k => (
                <option key={k} value={k}>
                  {k} ({researchItems.filter(r => r.kategori === k).length})
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="md:col-span-2">
            <select
              value={statusFilter}
              onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs bg-slate-50 dark:bg-slate-800/90 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 dark:text-slate-200 font-medium"
            >
              <option value="all">Semua Status Bukti</option>
              <option value="Terverifikasi">Hanya Terverifikasi (✓)</option>
              <option value="Inferensi">Hanya Inferensi (⚠)</option>
              <option value="Belum">Hanya Belum Terdata (–)</option>
            </select>
          </div>

          {/* Reset Button */}
          <div className="md:col-span-1 flex justify-end">
            {isFilterActive && (
              <button
                onClick={resetFilters}
                className="p-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition"
                title="Reset semua filter"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Pagination and Summary Line */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center space-x-2">
            <span>
              Menampilkan <strong className="text-slate-800 dark:text-slate-200">{totalFiltered === 0 ? 0 : (effectivePage - 1) * (pageSize === -1 ? totalFiltered : pageSize) + 1}</strong> – <strong className="text-slate-800 dark:text-slate-200">{pageSize === -1 ? totalFiltered : Math.min(effectivePage * pageSize, totalFiltered)}</strong> dari <strong className="text-slate-800 dark:text-slate-200">{totalFiltered}</strong> kapabilitas
            </span>
            {isFilterActive && (
              <span className="text-[11px] bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                Filter Aktif
              </span>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5">
              <span className="text-[11px]">Baris per halaman:</span>
              <select
                value={pageSize}
                onChange={e => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
                className="px-2 py-1 rounded-lg border border-slate-300 dark:border-slate-700 text-xs bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
              >
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={200}>200</option>
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

      {/* Research Matrix Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/90 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 text-xs font-bold">
                <th className="py-3.5 px-3 w-12 text-center border-r border-slate-200 dark:border-slate-700/80">
                  No
                </th>
                <th className="py-3.5 px-3 w-20 text-center border-r border-slate-200 dark:border-slate-700/80">
                  Workshop
                </th>
                <th className="py-3.5 px-4 w-64 border-r border-slate-200 dark:border-slate-700/80">
                  Domain & Kategori
                </th>
                <th className="py-3.5 px-4 w-72 sticky left-0 bg-slate-100/95 dark:bg-slate-800/95 z-20 border-r border-slate-200 dark:border-slate-700/80 shadow-xs">
                  Kapabilitas / Sistem yang Dicari
                </th>
                {BANK_SLUGS.map(b => (
                  <th
                    key={b.key}
                    className={`py-3.5 px-3 text-center min-w-[190px] ${
                      b.isFocus 
                        ? 'bg-blue-100/70 dark:bg-blue-950/60 border-x-2 border-blue-400 dark:border-blue-600 text-blue-950 dark:text-blue-100' 
                        : 'border-r border-slate-200 dark:border-slate-700/80'
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-1.5">
                      <span className="text-base">{b.logo}</span>
                      <span className="font-extrabold text-sm">{b.label}</span>
                      {b.isFocus && (
                        <span className="text-[9px] px-1.5 py-0.2 bg-blue-600 text-white rounded font-extrabold">
                          FOKUS
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] font-normal text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                      {b.fullName}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-xs">
              {paginatedResearchItems.length === 0 ? (
                <tr>
                  <td colSpan={4 + BANK_SLUGS.length} className="py-16 text-center text-slate-400 dark:text-slate-500">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Database className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                      <div className="text-sm font-semibold text-slate-600 dark:text-slate-300">Tidak ada kapabilitas yang cocok</div>
                      <p className="text-xs text-slate-400 dark:text-slate-500">Silakan ubah filter atau kata kunci pencarian Anda</p>
                      <button
                        onClick={resetFilters}
                        className="mt-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition"
                      >
                        Reset Filter
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedResearchItems.map(item => {
                  const wsInfo = WORKSHOP_META[item.workshop] || {
                    label: item.workshop,
                    color: 'text-slate-700 dark:text-slate-300',
                    bg: 'bg-slate-100 dark:bg-slate-800',
                    border: 'border-slate-200 dark:border-slate-700'
                  };

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition group">
                      <td className="py-3 px-3 text-center font-mono text-slate-400 dark:text-slate-500 text-[11px] border-r border-slate-100 dark:border-slate-800 align-top">
                        {item.no}
                      </td>

                      <td className="py-3 px-3 text-center border-r border-slate-100 dark:border-slate-800 align-top">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold border ${wsInfo.bg} ${wsInfo.color} ${wsInfo.border}`}>
                          {item.workshop}
                        </span>
                      </td>

                      <td className="py-3 px-4 border-r border-slate-100 dark:border-slate-800 align-top">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 text-[11px]">
                          {item.domain}
                        </div>
                        <div className="mt-1">
                          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                            {item.kategori}
                          </span>
                        </div>
                      </td>

                      <td className="py-3 px-4 font-bold sticky left-0 bg-white dark:bg-slate-900 group-hover:bg-slate-50/90 dark:group-hover:bg-slate-850 z-10 border-r border-slate-200 dark:border-slate-800 shadow-xs align-top">
                        <div className="text-xs text-slate-900 dark:text-slate-100 leading-snug">
                          {item.kapabilitas}
                        </div>
                        <div className="text-[10px] text-slate-400 dark:text-slate-500 font-normal mt-0.5">
                          ID: {item.id}
                        </div>
                      </td>

                      {/* 6 Bank Cells */}
                      {BANK_SLUGS.map(b => {
                        const detail = item.banks[b.key] || {
                          bankCode: b.label,
                          merk: '-',
                          link: '',
                          url: '',
                          pic: 'Admin',
                          status: 'Belum'
                        };

                        const isVerified = detail.status === 'Terverifikasi';
                        const isInference = detail.status === 'Inferensi';
                        const isBelum = detail.status === 'Belum' || !detail.status;
                        const hasLink = !!(detail.url || (detail.link && detail.link.startsWith('http')));

                        let cellBg = isBelum 
                          ? 'bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100/90 dark:hover:bg-slate-800/80 border-slate-200/80 dark:border-slate-800 text-slate-500 dark:text-slate-400'
                          : isVerified
                          ? 'bg-gradient-to-b from-emerald-50/70 to-emerald-50/30 dark:from-emerald-950/40 dark:to-emerald-950/20 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 border-emerald-200/90 dark:border-emerald-800/70 text-emerald-950 dark:text-emerald-100 shadow-2xs'
                          : 'bg-gradient-to-b from-amber-50/70 to-amber-50/30 dark:from-amber-950/40 dark:to-amber-950/20 hover:bg-amber-50 dark:hover:bg-amber-950/60 border-amber-200/90 dark:border-amber-800/70 text-amber-950 dark:text-amber-100 shadow-2xs';

                        return (
                          <td
                            key={b.key}
                            className={`py-2 px-2.5 align-top ${
                              b.isFocus 
                                ? 'bg-blue-50/20 dark:bg-blue-950/20 border-x-2 border-blue-400/80 dark:border-blue-600/60 group-hover:bg-blue-50/30 dark:group-hover:bg-blue-950/30' 
                                : 'border-r border-slate-100 dark:border-slate-800'
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() => setSelectedResearchCell({ capId: item.id, bankCode: b.key })}
                              className={`w-full text-left p-2.5 rounded-2xl border transition-all duration-150 group/card relative flex flex-col justify-between min-h-[76px] hover:shadow-card hover:-translate-y-0.5 active:scale-[0.99] ${cellBg}`}
                              title={`Klik untuk melihat detail & bukti sumber (${b.label} - ${detail.status})`}
                            >
                              <div className="space-y-1">
                                <div className="flex items-start justify-between gap-1.5">
                                  <div className={`font-bold text-[11px] leading-snug line-clamp-2 ${
                                    isBelum ? 'text-slate-400 dark:text-slate-500 italic font-normal' : 'text-slate-900 dark:text-slate-100 tracking-tight'
                                  }`}>
                                    {detail.merk || '–'}
                                  </div>
                                  {hasLink && (
                                    <ExternalLink className="w-3 h-3 text-slate-400 dark:text-slate-500 flex-shrink-0 group-hover/card:text-blue-600 dark:group-hover/card:text-blue-400 transition" />
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center justify-between mt-2.5 pt-1.5 border-t border-black/5 dark:border-white/10 text-[9px]">
                                <div className="flex items-center space-x-1">
                                  {isVerified && (
                                    <span className="flex items-center space-x-1 text-emerald-700 dark:text-emerald-300 font-extrabold">
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                      <span>Verified</span>
                                    </span>
                                  )}
                                  {isInference && (
                                    <span className="flex items-center space-x-1 text-amber-800 dark:text-amber-300 font-bold">
                                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                      <span>Inferensi</span>
                                    </span>
                                  )}
                                  {isBelum && (
                                    <span className="text-slate-400 dark:text-slate-500 font-medium">
                                      – Belum
                                    </span>
                                  )}
                                </div>

                                {detail.pic && detail.pic !== '-' && (
                                  <span className="text-[9px] text-slate-400 dark:text-slate-500 font-medium truncate max-w-[65px]" title={`PIC: ${detail.pic}`}>
                                    {detail.pic}
                                  </span>
                                )}
                              </div>
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Matrix Legend */}
        <div className="bg-slate-50 dark:bg-slate-900/90 p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between flex-wrap gap-4 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center space-x-5 flex-wrap gap-y-2">
            <span className="font-bold text-slate-800 dark:text-slate-200">Legenda Status Bukti:</span>
            
            <div className="flex items-center space-x-1.5">
              <span className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 flex items-center justify-center font-bold text-[10px]">✓</span>
              <span><strong>Terverifikasi:</strong> Sumber resmi (studi kasus vendor, siaran press, laporan tahunan)</span>
            </div>

            <div className="flex items-center space-x-1.5">
              <span className="w-4 h-4 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700 flex items-center justify-center font-bold text-[10px]">⚠</span>
              <span><strong>Inferensi:</strong> Sinyal publik / artikel industri / korelasi arsitektur</span>
            </div>

            <div className="flex items-center space-x-1.5">
              <span className="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-slate-700 flex items-center justify-center font-bold text-[10px]">–</span>
              <span><strong>Belum:</strong> Belum ada data publik yang terkonfirmasi</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            💡 <em>Tips:</em> Klik pada sembarang kartu sel untuk membuka rincian link sumber bukti dan melakukan koreksi (Admin/Analyst).
          </div>
        </div>
      </div>
    </div>
  );
};
