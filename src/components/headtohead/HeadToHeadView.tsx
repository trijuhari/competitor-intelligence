import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeftRight, Check, X, Shield, Sparkles, Building2, 
  ChevronRight, ArrowRight, TrendingUp, AlertTriangle, CheckCircle2, 
  HelpCircle, ExternalLink, Filter, Search, RotateCcw, Database, Layers
} from 'lucide-react';
import { BankLogo } from '../common/BankLogo';

const BANK_OPTIONS = [
  { slug: 'bri', label: 'BRI', fullName: 'Bank Rakyat Indonesia', isFocus: true },
  { slug: 'mandiri', label: 'Mandiri', fullName: 'Bank Mandiri', isFocus: false },
  { slug: 'bca', label: 'BCA', fullName: 'Bank Central Asia', isFocus: false },
  { slug: 'bni', label: 'BNI', fullName: 'Bank Negara Indonesia', isFocus: false },
  { slug: 'btn', label: 'BTN', fullName: 'Bank Tabungan Negara', isFocus: false },
  { slug: 'bsi', label: 'BSI', fullName: 'Bank Syariah Indonesia', isFocus: false }
];

export const HeadToHeadView: React.FC = () => {
  const { 
    researchItems,
    setSelectedResearchCell,
    navigate
  } = useApp();

  const [bankASlug, setBankASlug] = useState<string>('bri');
  const [bankBSlug, setBankBSlug] = useState<string>('mandiri');

  const [workshopFilter, setWorkshopFilter] = useState<string>('all');
  const [domainFilter, setDomainFilter] = useState<string>('all');
  const [comparisonFilter, setComparisonFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const bankA = BANK_OPTIONS.find(b => b.slug === bankASlug) || BANK_OPTIONS[0];
  const bankB = BANK_OPTIONS.find(b => b.slug === bankBSlug) || BANK_OPTIONS[1];

  const allDomains = useMemo(() => {
    return Array.from(new Set(researchItems.map(i => i.domain))).filter(Boolean);
  }, [researchItems]);

  // Comparison metrics across 408 items
  const {
    comparisons,
    bothVerifiedCount,
    onlyAVerifiedCount,
    onlyBVerifiedCount,
    bothBelumCount,
    differentMerkCount
  } = useMemo(() => {
    let bothV = 0;
    let onlyAV = 0;
    let onlyBV = 0;
    let bothB = 0;
    let diffMerk = 0;

    const list = researchItems.map(item => {
      const detailA = item.banks[bankASlug] || { merk: '-', status: 'Belum', link: '', pic: 'Admin' };
      const detailB = item.banks[bankBSlug] || { merk: '-', status: 'Belum', link: '', pic: 'Admin' };

      const isAVerified = detailA.status === 'Terverifikasi';
      const isBVerified = detailB.status === 'Terverifikasi';
      const isAHasData = detailA.status === 'Terverifikasi' || detailA.status === 'Inferensi';
      const isBHasData = detailB.status === 'Terverifikasi' || detailB.status === 'Inferensi';

      let diffType: 'both-verified' | 'only-a' | 'only-b' | 'both-data' | 'both-none' = 'both-none';

      if (isAVerified && isBVerified) {
        diffType = 'both-verified';
        bothV++;
      } else if (isAVerified && !isBVerified) {
        diffType = 'only-a';
        onlyAV++;
      } else if (!isAVerified && isBVerified) {
        diffType = 'only-b';
        onlyBV++;
      } else if (isAHasData || isBHasData) {
        diffType = 'both-data';
      } else {
        diffType = 'both-none';
        bothB++;
      }

      const hasDiffMerk = detailA.merk && detailB.merk && detailA.merk !== '-' && detailB.merk !== '-' &&
        detailA.merk.toLowerCase().trim() !== detailB.merk.toLowerCase().trim();

      if (hasDiffMerk) diffMerk++;

      return {
        item,
        detailA,
        detailB,
        diffType,
        hasDiffMerk
      };
    });

    return {
      comparisons: list,
      bothVerifiedCount: bothV,
      onlyAVerifiedCount: onlyAV,
      onlyBVerifiedCount: onlyBV,
      bothBelumCount: bothB,
      differentMerkCount: diffMerk
    };
  }, [researchItems, bankASlug, bankBSlug]);

  // Filtered comparisons
  const filteredComparisons = useMemo(() => {
    return comparisons.filter(c => {
      if (workshopFilter !== 'all' && c.item.workshop !== workshopFilter) return false;
      if (domainFilter !== 'all' && c.item.domain !== domainFilter) return false;

      if (comparisonFilter === 'both-verified' && c.diffType !== 'both-verified') return false;
      if (comparisonFilter === 'only-a' && c.diffType !== 'only-a') return false;
      if (comparisonFilter === 'only-b' && c.diffType !== 'only-b') return false;
      if (comparisonFilter === 'diff-merk' && !c.hasDiffMerk) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchCap = c.item.kapabilitas.toLowerCase().includes(q);
        const matchDom = c.item.domain.toLowerCase().includes(q);
        const matchMerkA = c.detailA.merk?.toLowerCase().includes(q);
        const matchMerkB = c.detailB.merk?.toLowerCase().includes(q);
        if (!matchCap && !matchDom && !matchMerkA && !matchMerkB) return false;
      }

      return true;
    });
  }, [comparisons, workshopFilter, domainFilter, comparisonFilter, searchQuery]);

  return (
    <div className="space-y-6 pb-16">
      {/* Page Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center -space-x-2">
              <BankLogo bankCode={bankA.slug} size="sm" className="ring-2 ring-white dark:ring-slate-900 shadow-xs" />
              <BankLogo bankCode={bankB.slug} size="sm" className="ring-2 ring-white dark:ring-slate-900 shadow-xs" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Head-to-Head: {bankA.label} vs {bankB.label}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300">
              408 Kapabilitas Riset
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Komparasi langsung implementasi teknologi antara {bankA.fullName} ({bankA.label}) dan {bankB.fullName} ({bankB.label}) berdasarkan 408 kapabilitas dan 13 domain arsitektur.
          </p>
        </div>

        {/* Bank Selection Switchers - Strictly 1 Line Horizontal */}
        <div 
          className="flex flex-row items-center gap-2 sm:gap-2.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-2 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card shrink-0 flex-nowrap whitespace-nowrap overflow-x-auto"
          style={{ flexWrap: 'nowrap' }}
        >
          {/* Bank 1 Selector */}
          <div className="flex items-center gap-2 bg-slate-50/90 dark:bg-slate-800/80 px-2.5 py-1.5 rounded-xl border border-slate-200/70 dark:border-slate-700/70 shadow-2xs shrink-0">
            <BankLogo bankCode={bankA.slug} size={24} className="shrink-0" />
            <span className="text-slate-400 dark:text-slate-500 font-extrabold text-[10px] uppercase tracking-wider shrink-0">Bank 1:</span>
            <select
              value={bankASlug}
              onChange={e => setBankASlug(e.target.value)}
              className="w-32 sm:w-40 md:w-44 bg-transparent font-black text-slate-800 dark:text-slate-200 text-xs focus:outline-hidden cursor-pointer truncate"
            >
              {BANK_OPTIONS.map(b => (
                <option key={b.slug} value={b.slug} disabled={b.slug === bankBSlug} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-semibold">
                  {b.label} – {b.fullName}
                </option>
              ))}
            </select>
          </div>

          {/* Interactive Swap Button */}
          <button
            type="button"
            onClick={() => {
              const temp = bankASlug;
              setBankASlug(bankBSlug);
              setBankBSlug(temp);
            }}
            title="Tukar Posisi Bank 1 & 2"
            aria-label="Tukar Posisi Bank"
            className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-blue-600 dark:bg-slate-800 dark:hover:bg-blue-600 text-slate-400 hover:text-white dark:text-slate-400 dark:hover:text-white flex items-center justify-center transition-all shrink-0 shadow-2xs cursor-pointer active:scale-95"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
          </button>

          {/* Bank 2 Selector */}
          <div className="flex items-center gap-2 bg-slate-50/90 dark:bg-slate-800/80 px-2.5 py-1.5 rounded-xl border border-slate-200/70 dark:border-slate-700/70 shadow-2xs shrink-0">
            <BankLogo bankCode={bankB.slug} size={24} className="shrink-0" />
            <span className="text-slate-400 dark:text-slate-500 font-extrabold text-[10px] uppercase tracking-wider shrink-0">Bank 2:</span>
            <select
              value={bankBSlug}
              onChange={e => setBankBSlug(e.target.value)}
              className="w-32 sm:w-40 md:w-44 bg-transparent font-black text-slate-800 dark:text-slate-200 text-xs focus:outline-hidden cursor-pointer truncate"
            >
              {BANK_OPTIONS.map(b => (
                <option key={b.slug} value={b.slug} disabled={b.slug === bankASlug} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-semibold">
                  {b.label} – {b.fullName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Visual Matchup Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800/80 shadow-card p-5 text-white">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
          {/* Bank A Side */}
          <div className="md:col-span-5 flex items-center space-x-4 bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10 hover:border-blue-500/30 transition">
            <BankLogo bankCode={bankA.slug} size={52} className="shadow-lg shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-black text-white tracking-tight truncate">{bankA.fullName}</h3>
                {bankA.isFocus && (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-blue-500 text-white shrink-0 uppercase tracking-wider">
                    Fokus
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Kode: {bankA.label} • Bank Utama</p>
              <div className="flex items-center space-x-3 mt-2 text-[11px] text-slate-300">
                <span className="flex items-center space-x-1 font-semibold text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{comparisons.filter(c => c.detailA.status === 'Terverifikasi').length} Terverifikasi</span>
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-blue-300 font-semibold">{onlyAVerifiedCount} Keunggulan</span>
              </div>
            </div>
          </div>

          {/* VS Center Badge */}
          <div className="md:col-span-1 flex flex-col items-center justify-center my-2 md:my-0">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white font-black text-sm tracking-wider shadow-lg shadow-amber-500/20 ring-4 ring-slate-900">
              VS
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Duel</span>
          </div>

          {/* Bank B Side */}
          <div className="md:col-span-5 flex items-center space-x-4 bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10 hover:border-amber-500/30 transition">
            <BankLogo bankCode={bankB.slug} size={52} className="shadow-lg shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-black text-white tracking-tight truncate">{bankB.fullName}</h3>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-slate-700 text-slate-300 shrink-0 uppercase tracking-wider">
                  Benchmark
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Kode: {bankB.label} • Kompetitor Komparasi</p>
              <div className="flex items-center space-x-3 mt-2 text-[11px] text-slate-300">
                <span className="flex items-center space-x-1 font-semibold text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{comparisons.filter(c => c.detailB.status === 'Terverifikasi').length} Terverifikasi</span>
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-orange-300 font-semibold">{onlyBVerifiedCount} Keunggulan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Shortcut to Interactive Architecture Blueprint */}
        <div className="mt-4 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center space-x-2 text-slate-300 text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Ingin melihat komparasi visual topologi per layer arsitektur enterprise?</span>
          </div>
          <button
            type="button"
            onClick={() => navigate('/analyst/blueprint')}
            className="px-3.5 py-1.5 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 text-white font-bold text-xs flex items-center space-x-1.5 transition border border-blue-400/30 hover:border-blue-400/60 cursor-pointer shadow-xs active:scale-95 shrink-0"
          >
            <Layers className="w-3.5 h-3.5 text-blue-300" />
            <span>Buka Blueprint Arsitektur (5 Layer)</span>
            <ArrowRight className="w-3 h-3 text-blue-200" />
          </button>
        </div>
      </div>

      {/* Versus Comparison Summary Ribbon */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card hover:shadow-card-hover transition-all">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">Total Kapabilitas</div>
          <div className="text-3xl font-black text-slate-900 dark:text-white mt-1 tracking-tight">{researchItems.length}</div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">13 Domain Arsitektur</div>
        </div>

        <div className="bg-gradient-to-br from-blue-50/80 dark:from-blue-950/40 to-indigo-50/40 dark:to-indigo-950/20 p-4 rounded-2xl border border-blue-200/80 dark:border-blue-900/50 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-blue-800 dark:text-blue-300 flex items-center space-x-1.5">
              <Shield className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Keunggulan {bankA.label}</span>
            </div>
            <BankLogo bankCode={bankA.slug} size={22} className="shrink-0" />
          </div>
          <div>
            <div className="text-3xl font-black text-blue-950 dark:text-blue-100 mt-2 tracking-tight">{onlyAVerifiedCount}</div>
            <div className="text-[10px] text-blue-700 dark:text-blue-400 font-medium">Terverifikasi di {bankA.label} saja</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50/80 dark:from-orange-950/40 to-amber-50/40 dark:to-amber-950/20 p-4 rounded-2xl border border-orange-200/80 dark:border-orange-900/50 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-orange-800 dark:text-orange-300 flex items-center space-x-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
              <span>Keunggulan {bankB.label}</span>
            </div>
            <BankLogo bankCode={bankB.slug} size={22} className="shrink-0" />
          </div>
          <div>
            <div className="text-3xl font-black text-orange-950 dark:text-orange-100 mt-2 tracking-tight">{onlyBVerifiedCount}</div>
            <div className="text-[10px] text-orange-700 dark:text-orange-400 font-medium">Celah arsitektur bagi {bankA.label}</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50/80 dark:from-emerald-950/40 to-teal-50/40 dark:to-teal-950/20 p-4 rounded-2xl border border-emerald-200/80 dark:border-emerald-900/50 shadow-card hover:shadow-card-hover transition-all">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center space-x-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Keduanya Terverifikasi</span>
          </div>
          <div className="text-3xl font-black text-emerald-950 dark:text-emerald-100 mt-1 tracking-tight">{bothVerifiedCount}</div>
          <div className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium">Standar Paritas Bersama</div>
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
              placeholder="Cari kapabilitas, domain, atau merk stack..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:bg-white dark:focus:bg-slate-750"
            >
            </input>
          </div>

          {/* Workshop Filter */}
          <div className="md:col-span-2">
            <select
              value={workshopFilter}
              onChange={e => setWorkshopFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium"
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
              onChange={e => setDomainFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium"
            >
              <option value="all">Semua Domain ({allDomains.length})</option>
              {allDomains.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Comparison Status Filter */}
          <div className="md:col-span-3">
            <select
              value={comparisonFilter}
              onChange={e => setComparisonFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium"
            >
              <option value="all">Semua Status Komparasi</option>
              <option value="only-a">Hanya Keunggulan {bankA.label}</option>
              <option value="only-b">Hanya Keunggulan {bankB.label}</option>
              <option value="both-verified">Keduanya Terverifikasi</option>
              <option value="diff-merk">Perbedaan Merk / Solusi</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div>
            Menampilkan <strong className="text-slate-800 dark:text-slate-200">{filteredComparisons.length}</strong> dari <strong className="text-slate-800 dark:text-slate-200">{researchItems.length}</strong> kapabilitas riset
          </div>
          {(searchQuery || workshopFilter !== 'all' || domainFilter !== 'all' || comparisonFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setWorkshopFilter('all');
                setDomainFilter('all');
                setComparisonFilter('all');
              }}
              className="text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center space-x-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filter</span>
            </button>
          )}
        </div>
      </div>

      {/* Head-to-Head Comparison Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/90 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold">
                <th className="py-3.5 px-3 w-12 text-center border-r border-slate-200 dark:border-slate-700">No</th>
                <th className="py-3.5 px-3 w-20 text-center border-r border-slate-200 dark:border-slate-700">WS</th>
                <th className="py-3.5 px-3 w-48 border-r border-slate-200 dark:border-slate-700">Domain & Kategori</th>
                <th className="py-3.5 px-4 min-w-[220px] border-r border-slate-200 dark:border-slate-700">Kapabilitas / Sistem</th>
                <th className="py-3.5 px-3 min-w-[200px] border-r border-slate-200 dark:border-slate-700 bg-blue-50/70 dark:bg-blue-950/50 text-blue-950 dark:text-blue-200 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <BankLogo bankCode={bankA.slug} size={22} className="shadow-2xs" />
                    <span className="font-black">{bankA.label}</span>
                    {bankA.isFocus && <span className="text-[9px] bg-blue-600 text-white px-1.5 py-0.2 rounded font-bold">FOKUS</span>}
                  </div>
                </th>
                <th className="py-3.5 px-3 min-w-[200px] border-r border-slate-200 dark:border-slate-700 bg-amber-50/70 dark:bg-amber-950/50 text-amber-950 dark:text-amber-200 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <BankLogo bankCode={bankB.slug} size={22} className="shadow-2xs" />
                    <span className="font-black">{bankB.label}</span>
                  </div>
                </th>
                <th className="py-3.5 px-3 w-36 text-center">Analisis Paritas</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredComparisons.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 dark:text-slate-500">
                    Tidak ada kapabilitas yang cocok dengan filter yang dipilih.
                  </td>
                </tr>
              ) : (
                filteredComparisons.map(({ item, detailA, detailB, diffType, hasDiffMerk }) => {
                  return (
                    <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition">
                      <td className="py-3 px-3 text-center font-mono text-slate-400 dark:text-slate-500 border-r border-slate-100 dark:border-slate-800/60 align-top">
                        {item.no}
                      </td>

                      <td className="py-3 px-2 text-center border-r border-slate-100 dark:border-slate-800/60 align-top">
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                          {item.workshop}
                        </span>
                      </td>

                      <td className="py-3 px-3 border-r border-slate-100 dark:border-slate-800/60 align-top">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 leading-tight">{item.domain}</div>
                        <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">{item.kategori}</div>
                      </td>

                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white border-r border-slate-100 dark:border-slate-800/60 align-top">
                        <div className="leading-snug">{item.kapabilitas}</div>
                        <div className="text-[10px] text-slate-400 dark:text-slate-500 font-normal mt-0.5">ID: {item.id}</div>
                      </td>

                      {/* Bank A Cell */}
                      <td className="py-2.5 px-3 border-r border-slate-100 dark:border-slate-800/60 align-top bg-blue-50/10 dark:bg-blue-950/10">
                        <button
                          type="button"
                          onClick={() => setSelectedResearchCell({ capId: item.id, bankCode: bankASlug })}
                          className={`w-full text-left p-2 rounded-xl border text-xs transition hover:scale-101 ${
                            detailA.status === 'Terverifikasi'
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/80 text-emerald-950 dark:text-emerald-200'
                              : detailA.status === 'Inferensi'
                              ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/80 text-amber-950 dark:text-amber-200'
                              : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500'
                          }`}
                        >
                          <div className="font-bold leading-tight line-clamp-2">
                            {detailA.merk || '–'}
                          </div>
                          <div className="flex items-center justify-between mt-1 text-[9px]">
                            <span className="font-bold">
                              {detailA.status === 'Terverifikasi' ? '✓ Verified' : detailA.status === 'Inferensi' ? '⚠ Inferensi' : '– Belum'}
                            </span>
                            {detailA.link && <ExternalLink className="w-2.5 h-2.5 text-slate-400 dark:text-slate-500" />}
                          </div>
                        </button>
                      </td>

                      {/* Bank B Cell */}
                      <td className="py-2.5 px-3 border-r border-slate-100 dark:border-slate-800/60 align-top bg-amber-50/10 dark:bg-amber-950/10">
                        <button
                          type="button"
                          onClick={() => setSelectedResearchCell({ capId: item.id, bankCode: bankBSlug })}
                          className={`w-full text-left p-2 rounded-xl border text-xs transition hover:scale-101 ${
                            detailB.status === 'Terverifikasi'
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/80 text-emerald-950 dark:text-emerald-200'
                              : detailB.status === 'Inferensi'
                              ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/80 text-amber-950 dark:text-amber-200'
                              : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500'
                          }`}
                        >
                          <div className="font-bold leading-tight line-clamp-2">
                            {detailB.merk || '–'}
                          </div>
                          <div className="flex items-center justify-between mt-1 text-[9px]">
                            <span className="font-bold">
                              {detailB.status === 'Terverifikasi' ? '✓ Verified' : detailB.status === 'Inferensi' ? '⚠ Inferensi' : '– Belum'}
                            </span>
                            {detailB.link && <ExternalLink className="w-2.5 h-2.5 text-slate-400 dark:text-slate-500" />}
                          </div>
                        </button>
                      </td>

                      {/* Status Paritas */}
                      <td className="py-3 px-3 text-center align-top">
                        {diffType === 'both-verified' ? (
                          <span className="px-2 py-1 rounded-lg text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                            Paritas Bersama
                          </span>
                        ) : diffType === 'only-a' ? (
                          <span className="px-2 py-1 rounded-lg text-[10px] font-extrabold bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                            Unggul {bankA.label}
                          </span>
                        ) : diffType === 'only-b' ? (
                          <span className="px-2 py-1 rounded-lg text-[10px] font-extrabold bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 border border-orange-200 dark:border-orange-800">
                            Unggul {bankB.label}
                          </span>
                        ) : hasDiffMerk ? (
                          <span className="px-2 py-1 rounded-lg text-[10px] font-extrabold bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                            Beda Solusi
                          </span>
                        ) : (
                          <span className="text-slate-400 dark:text-slate-500 text-[10px]">– Belum Terbukti</span>
                        )}
                      </td>
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
