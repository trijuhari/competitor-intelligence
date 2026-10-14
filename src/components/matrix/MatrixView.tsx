import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Filter, Download, Plus, Search, ExternalLink, ShieldCheck, 
  CheckCircle2, AlertTriangle, HelpCircle, ChevronLeft, ChevronRight, 
  RotateCcw, Layers, Database, Sparkles, Server, Cpu, Building2, Eye
} from 'lucide-react';
import { ConfidenceLevel, VerificationStatus } from '../../types';
import { getConfidenceBadge } from '../../utils/helpers';

const WORKSHOP_META: Record<string, { label: string; desc: string; color: string; bg: string; border: string }> = {
  WS1: { 
    label: 'WS1: Core & Digital Banking', 
    desc: 'Core Banking (CBS), Mobile Banking, Internet Banking, Digital Banking',
    color: 'text-blue-700',
    bg: 'bg-blue-50',
    border: 'border-blue-200'
  },
  WS2: { 
    label: 'WS2: EDW, MDM & BI', 
    desc: 'Enterprise Data Warehouse, Master Data Management, Business Intelligence',
    color: 'text-indigo-700',
    bg: 'bg-indigo-50',
    border: 'border-indigo-200'
  },
  WS3: { 
    label: 'WS3: Cloud, Infra & ITSM', 
    desc: 'Cloud Technology, Infrastructure, Network, IT Support (ITSM)',
    color: 'text-cyan-700',
    bg: 'bg-cyan-50',
    border: 'border-cyan-200'
  },
  WS4: { 
    label: 'WS4: Big Data & AI', 
    desc: 'Big Data Analytics, AI Technology & Machine Learning',
    color: 'text-purple-700',
    bg: 'bg-purple-50',
    border: 'border-purple-200'
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
    banks, 
    categories, 
    technologies, 
    findings, 
    evidences,
    researchItems,
    setSelectedResearchCell,
    exportResearchMatrixCSV,
    exportMatrixCSV,
    setSelectedFindingModalId,
    currentUser,
    setActiveTab
  } = useApp();

  // Mode: 'sheet' (408 Capabilities CSV Matrix) or 'catalog' (72 Tech Stack Catalog)
  const [activeMode, setActiveMode] = useState<'sheet' | 'catalog'>('sheet');

  // Sheet Matrix Filters
  const [workshopFilter, setWorkshopFilter] = useState<string>('all');
  const [domainFilter, setDomainFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(50);

  // Catalog (Legacy) Filters
  const [legacyCategory, setLegacyCategory] = useState<string>('all');
  const [legacySearch, setLegacySearch] = useState<string>('');
  const [legacyConfidence, setLegacyConfidence] = useState<ConfidenceLevel[]>([
    'Confirmed', 'Likely', 'Indicative'
  ]);
  const [legacyPublishedOnly, setLegacyPublishedOnly] = useState<boolean>(true);

  // Extract all unique Domains and Categories from researchItems
  const allDomains = useMemo(() => {
    return Array.from(new Set(researchItems.map(item => item.domain))).filter(Boolean);
  }, [researchItems]);

  const allCategories = useMemo(() => {
    return Array.from(new Set(researchItems.map(item => item.kategori))).filter(Boolean);
  }, [researchItems]);

  // Calculate high-level stats for 408 Research items
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
      verifiedPct: Math.round((verifiedCount / totalCells) * 100),
      inferencePct: Math.round((inferenceCount / totalCells) * 100),
      belumPct: Math.round((belumCount / totalCells) * 100),
      wsCounts
    };
  }, [researchItems]);

  // Filter 408 Research Items
  const filteredResearchItems = useMemo(() => {
    return researchItems.filter(item => {
      // Workshop Filter
      if (workshopFilter !== 'all' && item.workshop !== workshopFilter) return false;

      // Domain Filter
      if (domainFilter !== 'all' && item.domain !== domainFilter) return false;

      // Category Filter
      if (categoryFilter !== 'all' && item.kategori !== categoryFilter) return false;

      // Status Filter across bank cells
      if (statusFilter !== 'all') {
        const hasStatus = Object.values(item.banks).some(b => b.status === statusFilter);
        if (!hasStatus) return false;
      }

      // Search Query
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

  // Reset pagination when filters change
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

  // Filter for Legacy Catalog View
  const filteredTechs = technologies.filter(tech => {
    if (legacyCategory !== 'all' && tech.categoryId !== legacyCategory) return false;
    if (legacySearch.trim()) {
      const q = legacySearch.toLowerCase();
      const matchName = tech.nama.toLowerCase().includes(q);
      const matchVendor = tech.vendor.toLowerCase().includes(q);
      const matchDesc = tech.deskripsi.toLowerCase().includes(q);
      if (!matchName && !matchVendor && !matchDesc) return false;
    }
    return true;
  });

  const categoriesToShow = legacyCategory === 'all'
    ? categories
    : categories.filter(c => c.id === legacyCategory);

  const toggleConfidence = (level: ConfidenceLevel) => {
    setLegacyConfidence(prev => 
      prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
    );
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header & Mode Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2.5">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Matriks Riset Kapabilitas Teknologi Perbankan
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
              408 Kapabilitas · 13 Domain · 6 Bank
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl">
            Hasil inventarisasi riset komprehensif arsitektur teknologi perbankan Himbara (BRI, Mandiri, BNI, BTN, BSI) & BCA berdasarkan 4 Workshop, 13 Domain Arsitektur, dan 9 Kategori Sistem.
          </p>
        </div>

        {/* View Mode Toggle & Primary Actions */}
        <div className="flex items-center space-x-2.5 flex-wrap">
          {/* Mode Switcher Tabs */}
          <div className="bg-slate-200/80 p-1 rounded-xl flex items-center space-x-1 text-xs font-semibold">
            <button
              onClick={() => setActiveMode('sheet')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center space-x-1.5 ${
                activeMode === 'sheet'
                  ? 'bg-white text-blue-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Matriks Sheet (408 Baris)</span>
            </button>
            <button
              onClick={() => setActiveMode('catalog')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center space-x-1.5 ${
                activeMode === 'catalog'
                  ? 'bg-white text-blue-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Katalog Stack (72 Stack)</span>
            </button>
          </div>

          {/* Export CSV Button */}
          <button
            onClick={activeMode === 'sheet' ? exportResearchMatrixCSV : exportMatrixCSV}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs transition"
            title="Download seluruh data matriks ke file CSV spreadsheet"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Ekspor CSV</span>
          </button>

          {(currentUser.role === 'Admin' || currentUser.role === 'Analyst') && (
            <button
              onClick={() => setActiveTab('admin')}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition"
            >
              <Plus className="w-4 h-4" />
              <span>Input Temuan</span>
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: SHEET MATRIX (408 CAPABILITIES)                                  */}
      {/* ========================================================================= */}
      {activeMode === 'sheet' && (
        <div className="space-y-5">
          {/* Top KPI Statistics Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Kapabilitas</div>
              <div className="text-xl font-extrabold text-slate-900 mt-0.5">{stats.total}</div>
              <div className="text-[10px] text-slate-500">13 Domain Arsitektur</div>
            </div>

            <div className="bg-white p-3 rounded-xl border border-emerald-200 bg-emerald-50/20 shadow-xs">
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Terverifikasi</span>
              </div>
              <div className="text-xl font-extrabold text-emerald-900 mt-0.5">{stats.verifiedCount}</div>
              <div className="text-[10px] text-emerald-700 font-medium">{stats.verifiedPct}% dari 2.448 sel</div>
            </div>

            <div className="bg-white p-3 rounded-xl border border-amber-200 bg-amber-50/20 shadow-xs">
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-700 flex items-center space-x-1">
                <AlertTriangle className="w-3 h-3 text-amber-600" />
                <span>Inferensi</span>
              </div>
              <div className="text-xl font-extrabold text-amber-900 mt-0.5">{stats.inferenceCount}</div>
              <div className="text-[10px] text-amber-700 font-medium">{stats.inferencePct}% sinyal publik</div>
            </div>

            <div className="bg-white p-3 rounded-xl border border-blue-200 bg-blue-50/20 shadow-xs">
              <div className="text-[10px] font-bold uppercase tracking-wider text-blue-700">WS1 Core & Digital</div>
              <div className="text-xl font-extrabold text-blue-900 mt-0.5">{stats.wsCounts.WS1}</div>
              <div className="text-[10px] text-blue-600">CBS, M-Banking, Internet</div>
            </div>

            <div className="bg-white p-3 rounded-xl border border-indigo-200 bg-indigo-50/20 shadow-xs">
              <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">WS2 EDW & BI</div>
              <div className="text-xl font-extrabold text-indigo-900 mt-0.5">{stats.wsCounts.WS2}</div>
              <div className="text-[10px] text-indigo-600">Data Warehouse & MDM</div>
            </div>

            <div className="bg-white p-3 rounded-xl border border-cyan-200 bg-cyan-50/20 shadow-xs">
              <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-700">WS3 Cloud & Infra</div>
              <div className="text-xl font-extrabold text-cyan-900 mt-0.5">{stats.wsCounts.WS3}</div>
              <div className="text-[10px] text-cyan-600">Cloud, Jaringan, ITSM</div>
            </div>

            <div className="bg-white p-3 rounded-xl border border-purple-200 bg-purple-50/20 shadow-xs">
              <div className="text-[10px] font-bold uppercase tracking-wider text-purple-700">WS4 Big Data & AI</div>
              <div className="text-xl font-extrabold text-purple-900 mt-0.5">{stats.wsCounts.WS4}</div>
              <div className="text-[10px] text-purple-600">Hadoop, GenAI & ML</div>
            </div>
          </div>

          {/* Workshop Tabs Navigation */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => { setWorkshopFilter('all'); setCurrentPage(1); }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center space-x-2 ${
                workshopFilter === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>Semua Workshop</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                workshopFilter === 'all' ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-600'
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
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{meta.label}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    isActive ? 'bg-blue-700 text-blue-100' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Filters & Control Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              {/* Search Bar */}
              <div className="md:col-span-4 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari kapabilitas, domain, sistem, atau merk..."
                  value={searchQuery}
                  onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition"
                />
              </div>

              {/* Domain Dropdown */}
              <div className="md:col-span-3">
                <select
                  value={domainFilter}
                  onChange={e => { setDomainFilter(e.target.value); setCurrentPage(1); }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 font-medium"
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
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 font-medium"
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
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 font-medium"
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
                    className="p-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-600 transition"
                    title="Reset semua filter"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Pagination and Summary Line */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
              <div className="flex items-center space-x-2">
                <span>
                  Menampilkan <strong className="text-slate-800">{totalFiltered === 0 ? 0 : (effectivePage - 1) * (pageSize === -1 ? totalFiltered : pageSize) + 1}</strong> – <strong className="text-slate-800">{pageSize === -1 ? totalFiltered : Math.min(effectivePage * pageSize, totalFiltered)}</strong> dari <strong className="text-slate-800">{totalFiltered}</strong> kapabilitas
                </span>
                {isFilterActive && (
                  <span className="text-[11px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200">
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
                    className="px-2 py-1 rounded-lg border border-slate-300 text-xs bg-white text-slate-700"
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
                      className="p-1 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none text-slate-600"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="px-2 text-xs font-semibold text-slate-700">
                      Hal {effectivePage} / {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={effectivePage >= totalPages}
                      className="p-1 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none text-slate-600"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Research Matrix Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                {/* Table Header */}
                <thead>
                  <tr className="bg-slate-100/90 border-b border-slate-200 text-slate-700 text-xs font-bold">
                    <th className="py-3.5 px-3 w-12 text-center border-r border-slate-200">
                      No
                    </th>
                    <th className="py-3.5 px-3 w-20 text-center border-r border-slate-200">
                      Workshop
                    </th>
                    <th className="py-3.5 px-4 w-64 border-r border-slate-200">
                      Domain & Kategori
                    </th>
                    <th className="py-3.5 px-4 w-72 sticky left-0 bg-slate-100/95 z-20 border-r border-slate-200 shadow-xs">
                      Kapabilitas / Sistem yang Dicari
                    </th>
                    {BANK_SLUGS.map(b => (
                      <th
                        key={b.key}
                        className={`py-3.5 px-3 text-center min-w-[190px] ${
                          b.isFocus 
                            ? 'bg-blue-100/70 border-x-2 border-blue-400 text-blue-950' 
                            : 'border-r border-slate-200'
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
                        <div className="text-[10px] font-normal text-slate-500 mt-0.5 truncate">
                          {b.fullName}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-slate-100 text-xs">
                  {paginatedResearchItems.length === 0 ? (
                    <tr>
                      <td colSpan={4 + BANK_SLUGS.length} className="py-16 text-center text-slate-400">
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <Database className="w-8 h-8 text-slate-300" />
                          <div className="text-sm font-semibold text-slate-600">Tidak ada kapabilitas yang cocok</div>
                          <p className="text-xs text-slate-400">Silakan ubah filter atau kata kunci pencarian Anda</p>
                          <button
                            onClick={resetFilters}
                            className="mt-2 px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg hover:bg-blue-100 transition"
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
                        color: 'text-slate-700',
                        bg: 'bg-slate-100',
                        border: 'border-slate-200'
                      };

                      return (
                        <tr key={item.id} className="hover:bg-slate-50/70 transition group">
                          {/* No Column */}
                          <td className="py-3 px-3 text-center font-mono text-slate-400 text-[11px] border-r border-slate-100 align-top">
                            {item.no}
                          </td>

                          {/* Workshop Column */}
                          <td className="py-3 px-3 text-center border-r border-slate-100 align-top">
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold border ${wsInfo.bg} ${wsInfo.color} ${wsInfo.border}`}>
                              {item.workshop}
                            </span>
                          </td>

                          {/* Domain & Kategori Column */}
                          <td className="py-3 px-4 border-r border-slate-100 align-top">
                            <div className="font-semibold text-slate-800 text-[11px]">
                              {item.domain}
                            </div>
                            <div className="mt-1">
                              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                                {item.kategori}
                              </span>
                            </div>
                          </td>

                          {/* Kapabilitas Column (Sticky) */}
                          <td className="py-3 px-4 font-bold text-slate-900 sticky left-0 bg-white group-hover:bg-slate-50/90 z-10 border-r border-slate-200 shadow-xs align-top">
                            <div className="text-xs text-slate-900 leading-snug">
                              {item.kapabilitas}
                            </div>
                            <div className="text-[10px] text-slate-400 font-normal mt-0.5">
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

                            // Styling based on status
                            let cellBg = isBelum 
                              ? 'bg-slate-50/60 hover:bg-slate-100/80 border-slate-200 text-slate-500'
                              : isVerified
                              ? 'bg-emerald-50/50 hover:bg-emerald-50 border-emerald-200 text-emerald-950'
                              : 'bg-amber-50/40 hover:bg-amber-50 border-amber-200 text-amber-950';

                            return (
                              <td
                                key={b.key}
                                className={`py-2 px-2.5 align-top ${
                                  b.isFocus 
                                    ? 'bg-blue-50/20 border-x-2 border-blue-400/70 group-hover:bg-blue-50/30' 
                                    : 'border-r border-slate-100'
                                }`}
                              >
                                <button
                                  type="button"
                                  onClick={() => setSelectedResearchCell({ capId: item.id, bankCode: b.key })}
                                  className={`w-full text-left p-2 rounded-xl border transition group/card relative flex flex-col justify-between min-h-[72px] shadow-2xs hover:shadow-xs hover:scale-[1.01] ${cellBg}`}
                                  title={`Klik untuk melihat detail & bukti sumber (${b.label} - ${detail.status})`}
                                >
                                  {/* Merk / Stack Name */}
                                  <div className="space-y-1">
                                    <div className="flex items-start justify-between gap-1">
                                      <div className={`font-bold text-[11px] leading-tight line-clamp-2 ${
                                        isBelum ? 'text-slate-400 italic font-normal' : 'text-slate-900'
                                      }`}>
                                        {detail.merk || '–'}
                                      </div>
                                      {hasLink && (
                                        <ExternalLink className="w-3 h-3 text-slate-400 flex-shrink-0 group-hover/card:text-blue-600 transition" />
                                      )}
                                    </div>
                                  </div>

                                  {/* Status Badge & Meta Footer */}
                                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-black/5 text-[9px]">
                                    <div className="flex items-center space-x-1">
                                      {isVerified && (
                                        <span className="flex items-center space-x-0.5 text-emerald-700 font-extrabold">
                                          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                                          <span>Verified</span>
                                        </span>
                                      )}
                                      {isInference && (
                                        <span className="flex items-center space-x-0.5 text-amber-800 font-bold">
                                          <AlertTriangle className="w-2.5 h-2.5 text-amber-600" />
                                          <span>Inferensi</span>
                                        </span>
                                      )}
                                      {isBelum && (
                                        <span className="text-slate-400">
                                          – Belum
                                        </span>
                                      )}
                                    </div>

                                    {detail.pic && detail.pic !== '-' && (
                                      <span className="text-[9px] text-slate-400 font-medium truncate max-w-[65px]" title={`PIC: ${detail.pic}`}>
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

            {/* Matrix Legend & Guidance Footer */}
            <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between flex-wrap gap-4 text-xs text-slate-600">
              <div className="flex items-center space-x-5 flex-wrap gap-y-2">
                <span className="font-bold text-slate-800">Legenda Status Bukti:</span>
                
                <div className="flex items-center space-x-1.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center justify-center font-bold text-[10px]">✓</span>
                  <span><strong>Terverifikasi:</strong> Sumber resmi (studi kasus vendor, siaran pers, laporan tahunan)</span>
                </div>

                <div className="flex items-center space-x-1.5">
                  <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-800 border border-amber-300 flex items-center justify-center font-bold text-[10px]">⚠</span>
                  <span><strong>Inferensi:</strong> Sinyal publik / artikel industri / korelasi arsitektur</span>
                </div>

                <div className="flex items-center space-x-1.5">
                  <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-500 border border-slate-300 flex items-center justify-center font-bold text-[10px]">–</span>
                  <span><strong>Belum:</strong> Belum ada data publik yang terkonfirmasi</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 font-medium">
                💡 <em>Tips:</em> Klik pada sembarang kartu sel untuk membuka rincian link sumber bukti dan melakukan koreksi (Admin/Analyst).
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: LEGACY CATALOG MATRIX (72 TECH STACK)                            */}
      {/* ========================================================================= */}
      {activeMode === 'catalog' && (
        <div className="space-y-4">
          {/* Legacy Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari stack teknologi, vendor, atau komponen..."
                  value={legacySearch}
                  onChange={e => setLegacySearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition"
                />
              </div>

              {/* Confidence Filter Pills */}
              <div className="flex items-center space-x-2 flex-wrap text-xs">
                <span className="text-slate-400 font-medium mr-1 text-[11px] uppercase tracking-wider">Tingkat Bukti:</span>
                {(['Confirmed', 'Likely', 'Indicative'] as ConfidenceLevel[]).map(level => {
                  const isActive = legacyConfidence.includes(level);
                  const badge = getConfidenceBadge(level);
                  return (
                    <button
                      key={level}
                      onClick={() => toggleConfidence(level)}
                      className={`px-2.5 py-1 rounded-lg font-semibold border transition flex items-center space-x-1.5 ${
                        isActive 
                          ? badge.bgColor 
                          : 'bg-slate-50 text-slate-400 border-slate-200 opacity-60'
                      }`}
                    >
                      <span className="font-bold">{badge.symbol}</span>
                      <span>{badge.label}</span>
                    </button>
                  );
                })}

                <label className="flex items-center space-x-1.5 pl-3 border-l border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={legacyPublishedOnly}
                    onChange={e => setLegacyPublishedOnly(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                  />
                  <span className="text-slate-600 text-xs font-medium">Hanya Published</span>
                </label>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center space-x-1.5 overflow-x-auto pt-2 border-t border-slate-100 scrollbar-none">
              <button
                onClick={() => setLegacyCategory('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  legacyCategory === 'all'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Semua Kategori ({categories.length})
              </button>
              {categories.map(c => {
                const count = technologies.filter(t => t.categoryId === c.id).length;
                const isActive = legacyCategory === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setLegacyCategory(c.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center space-x-1.5 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <span>{c.nama}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-blue-700 text-blue-100' : 'bg-slate-200 text-slate-600'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Catalog Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 text-xs font-bold">
                    <th className="py-3.5 px-4 w-72 sticky left-0 bg-slate-100/95 z-20 shadow-xs">
                      Teknologi & Vendor
                    </th>
                    {banks.map(bank => {
                      const isBRI = bank.id === 'bank-bri';
                      return (
                        <th 
                          key={bank.id} 
                          className={`py-3.5 px-4 text-center min-w-[150px] ${
                            isBRI 
                              ? 'bg-blue-100/70 border-x-2 border-blue-400 text-blue-950' 
                              : 'border-r border-slate-200'
                          }`}
                        >
                          <div className="flex items-center justify-center space-x-1.5">
                            <span className="text-base">{bank.logo}</span>
                            <span className="font-extrabold">{bank.singkatan}</span>
                            {isBRI && (
                              <span className="text-[9px] px-1.5 py-0.2 bg-blue-600 text-white rounded font-extrabold">
                                FOKUS
                              </span>
                            )}
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 text-xs">
                  {categoriesToShow.map(cat => {
                    const techsInCat = filteredTechs.filter(t => t.categoryId === cat.id);
                    if (techsInCat.length === 0) return null;

                    return (
                      <React.Fragment key={cat.id}>
                        <tr className="bg-slate-50/90 font-bold text-slate-800 border-t-2 border-slate-200">
                          <td colSpan={banks.length + 1} className="py-2.5 px-4 sticky left-0 z-10 bg-slate-50">
                            <div className="flex items-center space-x-2">
                              <span className="w-2 h-2 rounded-full bg-blue-600" />
                              <span className="text-slate-900 font-extrabold uppercase tracking-wide text-[11px]">
                                {cat.nama}
                              </span>
                              <span className="text-slate-400 font-normal text-[11px]">
                                ({techsInCat.length} teknologi)
                              </span>
                            </div>
                          </td>
                        </tr>

                        {techsInCat.map(tech => (
                          <tr key={tech.id} className="hover:bg-slate-50/80 transition group">
                            <td className="py-3 px-4 font-medium text-slate-900 sticky left-0 bg-white group-hover:bg-slate-50/90 z-10 border-r border-slate-200 shadow-xs">
                              <div className="font-bold text-slate-900 text-xs">{tech.nama}</div>
                              <div className="text-[11px] text-slate-500">{tech.vendor} • {tech.tipe}</div>
                            </td>

                            {banks.map(bank => {
                              const isBRI = bank.id === 'bank-bri';
                              const finding = findings.find(f => f.bankId === bank.id && f.technologyId === tech.id);
                              const isValid = finding && (!legacyPublishedOnly || finding.statusReview === 'Published');
                              const isAllowed = isValid && legacyConfidence.includes(finding.confidence);
                              const badge = isValid && isAllowed ? getConfidenceBadge(finding.confidence) : null;
                              const evCount = isValid ? (finding.evidenceIds?.length || 0) : 0;

                              return (
                                <td 
                                  key={bank.id}
                                  className={`py-2 px-3 text-center align-middle ${
                                    isBRI ? 'bg-blue-50/20 border-x-2 border-blue-400/80' : 'border-r border-slate-100'
                                  }`}
                                >
                                  {badge && isValid ? (
                                    <button
                                      onClick={() => setSelectedFindingModalId(finding.id)}
                                      className={`w-full py-1.5 px-2 rounded-xl border text-xs font-bold transition flex items-center justify-center space-x-1.5 ${badge.bgColor}`}
                                    >
                                      <span>{badge.symbol}</span>
                                      <span className="text-[11px]">{badge.label}</span>
                                      {evCount > 0 && (
                                        <span className="ml-1 px-1.5 py-0.2 rounded-full bg-white text-[10px] text-slate-700 font-extrabold">
                                          {evCount}
                                        </span>
                                      )}
                                    </button>
                                  ) : (
                                    <span className="text-slate-300">–</span>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
