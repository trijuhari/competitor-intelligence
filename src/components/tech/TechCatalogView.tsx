import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, Filter, Cpu, ExternalLink, Building2, CheckCircle2, 
  Layers, AlertTriangle, HelpCircle, RotateCcw, ChevronLeft, ChevronRight, Database 
} from 'lucide-react';
import { ResearchItem } from '../../types';

const WORKSHOP_META: Record<string, { label: string; color: string; bg: string; border: string }> = {
  WS1: { label: 'WS1: Core & Digital', color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200' },
  WS2: { label: 'WS2: EDW & BI', color: 'text-indigo-700', bg: 'bg-indigo-50', border: 'border-indigo-200' },
  WS3: { label: 'WS3: Cloud & Infra', color: 'text-cyan-700', bg: 'bg-cyan-50', border: 'border-cyan-200' },
  WS4: { label: 'WS4: Big Data & AI', color: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-200' }
};

const BANK_BADGES = [
  { slug: 'bri', label: 'BRI', logo: '🟦', isFocus: true },
  { slug: 'mandiri', label: 'Mandiri', logo: '🟨', isFocus: false },
  { slug: 'bca', label: 'BCA', logo: '🔵', isFocus: false },
  { slug: 'bni', label: 'BNI', logo: '🟧', isFocus: false },
  { slug: 'btn', label: 'BTN', logo: '🔷', isFocus: false },
  { slug: 'bsi', label: 'BSI', logo: '🟩', isFocus: false }
];

export const TechCatalogView: React.FC = () => {
  const { 
    researchItems,
    setSelectedResearchCell 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWorkshop, setSelectedWorkshop] = useState<string>('all');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBankFilter, setSelectedBankFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(30);

  const allDomains = useMemo(() => {
    return Array.from(new Set(researchItems.map(i => i.domain))).filter(Boolean);
  }, [researchItems]);

  const allCategories = useMemo(() => {
    return Array.from(new Set(researchItems.map(i => i.kategori))).filter(Boolean);
  }, [researchItems]);

  const filteredItems = useMemo(() => {
    return researchItems.filter(item => {
      if (selectedWorkshop !== 'all' && item.workshop !== selectedWorkshop) return false;
      if (selectedDomain !== 'all' && item.domain !== selectedDomain) return false;
      if (selectedCategory !== 'all' && item.kategori !== selectedCategory) return false;

      if (selectedBankFilter !== 'all') {
        const bDetail = item.banks[selectedBankFilter];
        if (!bDetail || bDetail.status === 'Belum') return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchCap = item.kapabilitas.toLowerCase().includes(q);
        const matchDom = item.domain.toLowerCase().includes(q);
        const matchKat = item.kategori.toLowerCase().includes(q);
        const matchMerk = Object.values(item.banks).some(b => 
          b.merk?.toLowerCase().includes(q) || b.link?.toLowerCase().includes(q)
        );
        if (!matchCap && !matchDom && !matchKat && !matchMerk) return false;
      }

      return true;
    });
  }, [researchItems, selectedWorkshop, selectedDomain, selectedCategory, selectedBankFilter, searchQuery]);

  const totalFiltered = filteredItems.length;
  const totalPages = Math.ceil(totalFiltered / pageSize) || 1;
  const effectivePage = Math.min(Math.max(currentPage, 1), totalPages);

  const paginatedItems = useMemo(() => {
    const start = (effectivePage - 1) * pageSize;
    return filteredItems.slice(start, start + pageSize);
  }, [filteredItems, effectivePage, pageSize]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedWorkshop('all');
    setSelectedDomain('all');
    setSelectedCategory('all');
    setSelectedBankFilter('all');
    setCurrentPage(1);
  };

  const isFilterActive = searchQuery.trim() !== '' || selectedWorkshop !== 'all' || 
    selectedDomain !== 'all' || selectedCategory !== 'all' || selectedBankFilter !== 'all';

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Katalog Direktori Kapabilitas & Sistem Teknologi
          </h2>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800">
            {researchItems.length} Kapabilitas Riset
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1 max-w-3xl">
          Direktori lengkap 408 kapabilitas teknologi perbankan Himbara & BCA, mencakup 13 domain arsitektur, 9 kategori sistem, dan pemetaan implementasi di 6 bank.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-4 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama kapabilitas, domain, sistem, atau merk..."
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white"
            />
          </div>

          <div className="md:col-span-2">
            <select
              value={selectedWorkshop}
              onChange={e => { setSelectedWorkshop(e.target.value); setCurrentPage(1); }}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-slate-50 font-medium"
            >
              <option value="all">Semua Workshop</option>
              <option value="WS1">WS1: Core & Digital</option>
              <option value="WS2">WS2: EDW & BI</option>
              <option value="WS3">WS3: Cloud & Infra</option>
              <option value="WS4">WS4: Big Data & AI</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedDomain}
              onChange={e => { setSelectedDomain(e.target.value); setCurrentPage(1); }}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-slate-50 font-medium"
            >
              <option value="all">Semua Domain ({allDomains.length})</option>
              {allDomains.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <select
              value={selectedBankFilter}
              onChange={e => { setSelectedBankFilter(e.target.value); setCurrentPage(1); }}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-slate-50 font-medium"
            >
              <option value="all">Semua Bank</option>
              {BANK_BADGES.map(b => (
                <option key={b.slug} value={b.slug}>Diadopsi {b.label}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-1 flex justify-end">
            {isFilterActive && (
              <button
                onClick={resetFilters}
                className="p-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-600 transition"
                title="Reset filter"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Pagination Sub-bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
          <div>
            Menampilkan <strong className="text-slate-800">{totalFiltered === 0 ? 0 : (effectivePage - 1) * pageSize + 1}</strong> – <strong className="text-slate-800">{Math.min(effectivePage * pageSize, totalFiltered)}</strong> dari <strong className="text-slate-800">{totalFiltered}</strong> kapabilitas
          </div>

          {totalPages > 1 && (
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

      {/* Capabilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedItems.map(item => {
          const ws = WORKSHOP_META[item.workshop] || {
            label: item.workshop,
            color: 'text-slate-700',
            bg: 'bg-slate-100',
            border: 'border-slate-200'
          };

          return (
            <div
              key={item.id}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold border ${ws.bg} ${ws.color} ${ws.border}`}>
                    {item.workshop}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    ID: {item.id}
                  </span>
                </div>

                <h3 className="font-extrabold text-slate-900 text-sm leading-snug line-clamp-2">
                  {item.kapabilitas}
                </h3>

                <div className="flex items-center space-x-2 mt-2 text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">{item.domain}</span>
                  <span>•</span>
                  <span>{item.kategori}</span>
                </div>
              </div>

              {/* 6 Banks implementation grid */}
              <div className="pt-3 border-t border-slate-100 space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Implementasi di 6 Bank:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {BANK_BADGES.map(b => {
                    const detail = item.banks[b.slug] || { merk: '-', status: 'Belum' };
                    const isVerified = detail.status === 'Terverifikasi';
                    const isInference = detail.status === 'Inferensi';

                    return (
                      <button
                        key={b.slug}
                        type="button"
                        onClick={() => setSelectedResearchCell({ capId: item.id, bankCode: b.slug })}
                        className={`p-1.5 rounded-lg border text-left text-[10px] transition hover:scale-102 ${
                          isVerified 
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-950 font-bold'
                            : isInference
                            ? 'bg-amber-50 border-amber-200 text-amber-950 font-medium'
                            : 'bg-slate-50 border-slate-200 text-slate-400'
                        }`}
                        title={`${b.label}: ${detail.merk || 'Belum'} (${detail.status})`}
                      >
                        <div className="flex items-center justify-between text-[9px] text-slate-500 font-bold">
                          <span>{b.label}</span>
                          {isVerified && <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />}
                          {isInference && <AlertTriangle className="w-2.5 h-2.5 text-amber-600" />}
                        </div>
                        <div className="truncate mt-0.5 leading-tight">
                          {detail.merk || '–'}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
