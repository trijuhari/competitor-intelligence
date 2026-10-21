import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, Download, CheckCircle2, 
  AlertTriangle, HelpCircle, ExternalLink, RotateCcw, 
  ChevronLeft, ChevronRight, Layers, Building2, Eye, Database,
  FileSpreadsheet, X, Sparkles, Filter
} from 'lucide-react';
import { ResearchItem, VerificationStatus } from '../../types';
import { formatDashLineBreaks } from '../../utils/helpers';
import { StatusBadge } from '../ui/Badge';
import { extractUniqueWorkshops, getWorkshopLabel, getWorkshopMeta } from '../../utils/workshop';

const WORKSHOP_META: Record<string, { label: string; color: string; bg: string; border: string }> = {
  WS1: { label: 'WS1: Core & Digital', color: 'text-blue-700 dark:text-blue-300', bg: 'bg-blue-50 dark:bg-blue-950/50', border: 'border-blue-200/80 dark:border-blue-800/80' },
  WS2: { label: 'WS2: EDW & BI', color: 'text-indigo-700 dark:text-indigo-300', bg: 'bg-indigo-50 dark:bg-indigo-950/50', border: 'border-indigo-200/80 dark:border-indigo-800/80' },
  WS3: { label: 'WS3: Cloud & Infra', color: 'text-cyan-700 dark:text-cyan-300', bg: 'bg-cyan-50 dark:bg-cyan-950/50', border: 'border-cyan-200/80 dark:border-cyan-800/80' },
  WS4: { label: 'WS4: Big Data & AI', color: 'text-purple-700 dark:text-purple-300', bg: 'bg-purple-50 dark:bg-purple-950/50', border: 'border-purple-200/80 dark:border-purple-800/80' }
};

const BANK_SLUGS = [
  { key: 'bri', label: 'BRI', isFocus: true, color: 'text-blue-600 dark:text-blue-400' },
  { key: 'mandiri', label: 'Mandiri', isFocus: false, color: 'text-amber-600 dark:text-amber-400' },
  { key: 'bca', label: 'BCA', isFocus: false, color: 'text-sky-600 dark:text-sky-400' },
  { key: 'bni', label: 'BNI', isFocus: false, color: 'text-orange-600 dark:text-orange-400' },
  { key: 'btn', label: 'BTN', isFocus: false, color: 'text-blue-500 dark:text-blue-400' },
  { key: 'bsi', label: 'BSI', isFocus: false, color: 'text-emerald-600 dark:text-emerald-400' }
];

interface AdminResearchMatrixTabProps {
  isAddModalOpen?: boolean;
  setIsAddModalOpen?: (open: boolean) => void;
}

export const AdminResearchMatrixTab: React.FC<AdminResearchMatrixTabProps> = ({
  isAddModalOpen: propIsAddModalOpen,
  setIsAddModalOpen: propSetIsAddModalOpen
}) => {
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
  const [internalAddModalOpen, setInternalAddModalOpen] = useState(false);

  const isAddModalOpen = propIsAddModalOpen !== undefined ? propIsAddModalOpen : internalAddModalOpen;
  const setIsAddModalOpen = propSetIsAddModalOpen || setInternalAddModalOpen;

  // Domains & Categories lists
  const allWorkshops = useMemo(() => {
    return extractUniqueWorkshops(researchItems);
  }, [researchItems]);

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
        const hasStatus = Object.values(item.banks || {}).some(b => b.status === statusFilter);
        if (!hasStatus) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchCap = item.kapabilitas.toLowerCase().includes(q);
        const matchDomain = item.domain.toLowerCase().includes(q);
        const matchKategori = item.kategori.toLowerCase().includes(q);
        const matchBanks = Object.values(item.banks || {}).some(b => 
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
      {/* KPI Stats Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-surface p-4 rounded-2xl border border-line shadow-card hover:shadow-card-hover transition-all">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-ink-muted">Total Temuan Kapabilitas</div>
          <div className="text-2xl font-black text-ink mt-0.5 tracking-tight font-heading">{stats.total}</div>
          <div className="text-[10px] text-ink-muted font-medium">13 Domain Arsitektur</div>
        </div>

        <div className="bg-emerald-50/80 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-300 dark:border-emerald-800 shadow-card hover:shadow-card-hover transition-all">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Terverifikasi</span>
          </div>
          <div className="text-2xl font-black text-emerald-950 dark:text-emerald-100 mt-0.5 tracking-tight font-heading">{stats.verified}</div>
          <div className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">dari {stats.totalCells} sel evaluasi</div>
        </div>

        <div className="bg-amber-50/80 dark:bg-amber-950/40 p-4 rounded-2xl border border-amber-300 dark:border-amber-800 shadow-card hover:shadow-card-hover transition-all">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span>Inferensi Industri</span>
          </div>
          <div className="text-2xl font-black text-amber-950 dark:text-amber-100 mt-0.5 tracking-tight font-heading">{stats.inference}</div>
          <div className="text-[10px] text-amber-700 dark:text-amber-400 font-semibold">Sinyal media & publikasi</div>
        </div>

        <div className="bg-rose-50/80 dark:bg-rose-950/40 p-4 rounded-2xl border border-rose-300 dark:border-rose-900 shadow-card hover:shadow-card-hover transition-all">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-rose-800 dark:text-rose-300 flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            <span>Belum Terdata</span>
          </div>
          <div className="text-2xl font-black text-rose-950 dark:text-rose-100 mt-0.5 tracking-tight font-heading">{stats.belum}</div>
          <div className="text-[10px] text-rose-700 dark:text-rose-400 font-semibold">Menunggu riset tambahan</div>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-surface p-4 rounded-2xl border border-line shadow-card space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search Box */}
          <div className="md:col-span-4 relative">
            <Search className="w-4 h-4 text-ink-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari kapabilitas, domain, sistem, merk, atau PIC..."
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full pl-9 pr-9 py-2 rounded-xl border border-line text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-surface text-ink placeholder-ink-muted shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Workshop Filter */}
          <div className="md:col-span-2">
            <select
              value={workshopFilter}
              onChange={e => { setWorkshopFilter(e.target.value); setCurrentPage(1); }}
              className="w-full px-3 py-2 rounded-xl border border-line text-xs bg-surface text-ink focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium shadow-2xs"
            >
              <option value="all">Semua Workshop ({allWorkshops.length})</option>
              {allWorkshops.map(ws => (
                <option key={ws} value={ws}>{getWorkshopLabel(ws)}</option>
              ))}
            </select>
          </div>

          {/* Domain Filter */}
          <div className="md:col-span-3">
            <select
              value={domainFilter}
              onChange={e => { setDomainFilter(e.target.value); setCurrentPage(1); }}
              className="w-full px-3 py-2 rounded-xl border border-line text-xs bg-surface text-ink focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium shadow-2xs truncate"
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
              className="w-full px-3 py-2 rounded-xl border border-line text-xs bg-surface text-ink focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium shadow-2xs"
            >
              <option value="all">Semua Status</option>
              <option value="Terverifikasi">Terverifikasi (✓)</option>
              <option value="Inferensi">Inferensi (⚠)</option>
              <option value="Belum">Belum Terdata (–)</option>
            </select>
          </div>

          {/* Reset Button */}
          <div className="md:col-span-1 flex justify-end">
            {isFilterActive ? (
              <button
                onClick={resetFilters}
                className="p-2 rounded-xl border border-line hover:bg-surface-raised text-ink-muted hover:text-ink transition shadow-2xs cursor-pointer"
                title="Reset Filter"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            ) : (
              <div className="p-2 text-ink-muted opacity-30">
                <Filter className="w-4 h-4" />
              </div>
            )}
          </div>
        </div>

        {/* Pagination Sub-bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2.5 border-t border-line text-xs text-ink-muted">
          <div>
            Menampilkan <strong className="text-ink">{totalFiltered === 0 ? 0 : (effectivePage - 1) * (pageSize === -1 ? totalFiltered : pageSize) + 1}</strong> – <strong className="text-ink">{pageSize === -1 ? totalFiltered : Math.min(effectivePage * pageSize, totalFiltered)}</strong> dari <strong className="text-ink">{totalFiltered}</strong> kapabilitas
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5">
              <span>Baris:</span>
              <select
                value={pageSize}
                onChange={e => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
                className="px-2 py-1 rounded-lg border border-line text-xs bg-surface text-ink shadow-2xs"
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
                  className="p-1.5 rounded-lg border border-line hover:bg-surface-raised disabled:opacity-30 disabled:pointer-events-none text-ink cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span className="px-2 text-xs font-semibold text-ink">
                  {effectivePage} / {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={effectivePage >= totalPages}
                  className="p-1.5 rounded-lg border border-line hover:bg-surface-raised disabled:opacity-30 disabled:pointer-events-none text-ink cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Admin Data Table */}
      <div className="bg-surface rounded-2xl border border-line shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-surface-raised border-b border-line text-ink font-extrabold sticky top-0 z-20">
                <th className="py-3.5 px-3 w-12 text-center border-r border-line shrink-0">No</th>
                <th className="py-3.5 px-3 w-16 text-center border-r border-line shrink-0">WS</th>
                <th className="py-3.5 px-3 w-44 min-w-[150px] max-w-[180px] border-r border-line">Domain & Kategori</th>
                <th className="py-3.5 px-4 w-64 min-w-[200px] max-w-[260px] border-r border-line">Kapabilitas / Sistem</th>
                {BANK_SLUGS.map(b => (
                  <th 
                    key={b.key} 
                    className={`py-3.5 px-3 text-center w-48 min-w-[170px] max-w-[210px] border-r border-line ${
                      b.isFocus 
                        ? 'bg-blue-50/80 dark:bg-blue-950/60 text-blue-900 dark:text-blue-200' 
                        : ''
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-1.5">
                      <span className="font-extrabold">{b.label}</span>
                      {b.isFocus && (
                        <span className="px-1.5 py-0.2 bg-gradient-to-r from-blue-600 to-sky-500 text-white text-[9px] rounded-full font-bold shadow-xs">
                          ANCHOR
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-line">
              {paginatedItems.length === 0 ? (
                <tr>
                  <td colSpan={4 + BANK_SLUGS.length} className="py-16 text-center text-ink-muted">
                    Tidak ada kapabilitas yang cocok dengan filter atau kata kunci "{searchQuery}".
                  </td>
                </tr>
              ) : (
                paginatedItems.map(item => {
                  const ws = getWorkshopMeta(item.workshop);

                  return (
                    <tr key={item.id} className="hover:bg-surface-raised/50 transition-colors group">
                      {/* No */}
                      <td className="py-3 px-3 text-center font-mono text-ink-muted border-r border-line align-top w-12 shrink-0">
                        {item.no}
                      </td>

                      {/* Workshop */}
                      <td className="py-3 px-2 text-center border-r border-line align-top w-16 shrink-0">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold border shadow-2xs ${ws.bg} ${ws.color} ${ws.border}`}>
                          {item.workshop}
                        </span>
                      </td>

                      {/* Domain & Kategori */}
                      <td className="py-3 px-3 border-r border-line align-top w-44 min-w-[150px] max-w-[180px]">
                        <div className="font-bold text-ink leading-tight break-words">
                          {item.domain}
                        </div>
                        <div className="text-[10px] text-ink-muted mt-1 break-words">
                          {item.kategori}
                        </div>
                      </td>

                      {/* Kapabilitas */}
                      <td className="py-3 px-4 font-bold text-ink border-r border-line align-top w-64 min-w-[200px] max-w-[260px]">
                        <div className="leading-snug break-words whitespace-normal text-ink">
                          {item.kapabilitas}
                        </div>
                        <div className="text-[10px] text-ink-muted font-mono mt-1">
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
                            className={`py-2 px-2 border-r border-line align-top w-48 min-w-[170px] max-w-[210px] ${
                              b.isFocus ? 'bg-blue-50/20 dark:bg-blue-950/20' : ''
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() => setSelectedResearchCell({ capId: item.id, bankCode: b.key })}
                              className={`w-full text-left p-2.5 rounded-xl border text-[11px] transition duration-150 hover:shadow-card hover:-translate-y-0.5 active:scale-[0.98] flex flex-col justify-between min-h-[64px] cursor-pointer ${
                                isVerified 
                                  ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-300/60 dark:border-emerald-800/70 text-emerald-950 dark:text-emerald-100'
                                  : isInference
                                  ? 'bg-amber-50/70 dark:bg-amber-950/40 border-amber-300/60 dark:border-amber-800/70 text-amber-950 dark:text-amber-100'
                                  : 'bg-rose-50/40 dark:bg-rose-950/30 border-rose-200/70 dark:border-rose-900/60 text-rose-950 dark:text-rose-200'
                              }`}
                              title={`Klik untuk melihat rincian bukti ${b.label}`}
                            >
                              <div className="font-semibold break-words whitespace-pre-line leading-snug">
                                {formatDashLineBreaks(bDetail.merk)}
                              </div>
                              <div className="flex items-center space-x-1.5 mt-2 text-[9px] shrink-0">
                                {isVerified && (
                                  <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-extrabold">
                                    <CheckCircle2 className="w-3 h-3" />
                                    <span>Verified</span>
                                  </span>
                                )}
                                {isInference && (
                                  <span className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-400 font-extrabold">
                                    <AlertTriangle className="w-3 h-3" />
                                    <span>Inferensi</span>
                                  </span>
                                )}
                                {isBelum && (
                                  <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-rose-100/80 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                                    – Belum
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
      </div>
    </div>
  );
};
