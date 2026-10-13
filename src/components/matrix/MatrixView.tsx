import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Filter, Download, Plus, Search, ExternalLink, ShieldCheck, 
  Check, HelpCircle, Minus, ChevronRight, Layers, Info 
} from 'lucide-react';
import { getConfidenceBadge } from '../../utils/helpers';
import { ConfidenceLevel } from '../../types';

export const MatrixView: React.FC = () => {
  const { 
    banks, 
    categories, 
    technologies, 
    findings, 
    evidences,
    setSelectedFindingModalId,
    exportMatrixCSV,
    currentUser,
    setActiveTab
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [confidenceFilters, setConfidenceFilters] = useState<ConfidenceLevel[]>([
    'Confirmed', 'Likely', 'Indicative'
  ]);
  const [publishedOnly, setPublishedOnly] = useState<boolean>(true);

  // Filter technologies
  const filteredTechs = technologies.filter(tech => {
    // Category filter
    if (selectedCategory !== 'all' && tech.categoryId !== selectedCategory) {
      return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = tech.nama.toLowerCase().includes(q);
      const matchVendor = tech.vendor.toLowerCase().includes(q);
      const matchDesc = tech.deskripsi.toLowerCase().includes(q);
      if (!matchName && !matchVendor && !matchDesc) return false;
    }
    return true;
  });

  // Group technologies by category
  const categoriesToShow = selectedCategory === 'all'
    ? categories
    : categories.filter(c => c.id === selectedCategory);

  const toggleConfidence = (level: ConfidenceLevel) => {
    setConfidenceFilters(prev => 
      prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
    );
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Page Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Matriks Perbandingan Tech Stack (Matrix View)
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
              F2 · Core Feature
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Klik pada setiap sel bank untuk menginspeksi rincian bukti sumber, rekaman wawancara, dan tanggal verifikasi.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={exportMatrixCSV}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs transition"
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
              <span>Input Temuan Baru</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari teknologi, vendor, atau kata kunci..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition"
            />
          </div>

          {/* Confidence Filter Pills */}
          <div className="flex items-center space-x-2 flex-wrap text-xs">
            <span className="text-slate-400 font-medium mr-1 text-[11px] uppercase tracking-wider">Tingkat Bukti:</span>
            {(['Confirmed', 'Likely', 'Indicative'] as ConfidenceLevel[]).map(level => {
              const isActive = confidenceFilters.includes(level);
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

            {/* Published Only Toggle */}
            <label className="flex items-center space-x-1.5 pl-3 border-l border-slate-200 cursor-pointer">
              <input
                type="checkbox"
                checked={publishedOnly}
                onChange={e => setPublishedOnly(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
              />
              <span className="text-slate-600 text-xs font-medium">Hanya Published</span>
            </label>
          </div>
        </div>

        {/* Category Horizontal Filter Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pt-2 border-t border-slate-100 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Semua Kategori ({categories.length})
          </button>
          {categories.map(c => {
            const count = technologies.filter(t => t.categoryId === c.id).length;
            const isActive = selectedCategory === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
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

      {/* Matrix Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            {/* Table Header */}
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
                      <div className="text-[10px] font-normal text-slate-500 mt-0.5">
                        {bank.produkDigital[0]}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>

            {/* Table Body Grouped by Category */}
            <tbody className="divide-y divide-slate-100 text-xs">
              {categoriesToShow.map(cat => {
                const techsInCat = filteredTechs.filter(t => t.categoryId === cat.id);
                if (techsInCat.length === 0) return null;

                return (
                  <React.Fragment key={cat.id}>
                    {/* Category Divider Header Row */}
                    <tr className="bg-slate-50/90 font-bold text-slate-800 border-t-2 border-slate-200">
                      <td colSpan={banks.length + 1} className="py-2.5 px-4 sticky left-0 z-10 bg-slate-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="w-2 h-2 rounded-full bg-blue-600" />
                            <span className="text-slate-900 font-extrabold uppercase tracking-wide text-[11px]">
                              {cat.nama}
                            </span>
                            <span className="text-slate-400 font-normal text-[11px]">
                              ({techsInCat.length} teknologi dipantau)
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-500 font-normal hidden sm:inline">
                            {cat.deskripsi}
                          </span>
                        </div>
                      </td>
                    </tr>

                    {/* Tech Rows in this Category */}
                    {techsInCat.map(tech => {
                      const adoptionCount = findings.filter(f => f.technologyId === tech.id).length;
                      const isDifferentiator = adoptionCount <= 2;

                      return (
                        <tr key={tech.id} className="hover:bg-slate-50/80 transition group">
                          {/* Tech Name Column (Sticky) */}
                          <td className="py-3 px-4 font-medium text-slate-900 sticky left-0 bg-white group-hover:bg-slate-50/90 z-10 border-r border-slate-200 shadow-xs">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center space-x-1.5">
                                  <span className="font-bold text-slate-900 text-xs">{tech.nama}</span>
                                  {isDifferentiator ? (
                                    <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-purple-100 text-purple-800 border border-purple-200" title="Komponen pembeda arsitektur spesifik (diadopsi ≤ 2 bank)">
                                      Differentiator
                                    </span>
                                  ) : (
                                    <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-slate-100 text-slate-600" title="Standar konsensus industri (diadopsi ≥ 3 bank)">
                                      Commodity
                                    </span>
                                  )}
                                </div>
                                <div className="text-[11px] text-slate-500 flex items-center space-x-1.5 mt-0.5">
                                  <span>{tech.vendor}</span>
                                  <span>•</span>
                                  <span className="capitalize">{tech.tipe}</span>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Bank Cells */}
                          {banks.map(bank => {
                            const isBRI = bank.id === 'bank-bri';
                            const finding = findings.find(f => f.bankId === bank.id && f.technologyId === tech.id);
                            
                            // Check published filter
                            const isValidFinding = finding && (!publishedOnly || finding.statusReview === 'Published');
                            const isConfidenceAllowed = isValidFinding && confidenceFilters.includes(finding.confidence);

                            const badge = isValidFinding && isConfidenceAllowed
                              ? getConfidenceBadge(finding.confidence)
                              : null;

                            const evidenceCount = isValidFinding 
                              ? (finding.evidenceIds?.length || evidences.filter(e => e.findingId === finding.id).length)
                              : 0;

                            return (
                              <td 
                                key={bank.id}
                                className={`py-2 px-3 text-center align-middle ${
                                  isBRI 
                                    ? 'bg-blue-50/20 border-x-2 border-blue-400/80 group-hover:bg-blue-50/40' 
                                    : 'border-r border-slate-100'
                                }`}
                              >
                                {badge && isValidFinding ? (
                                  <button
                                    onClick={() => setSelectedFindingModalId(finding.id)}
                                    className={`w-full py-1.5 px-2 rounded-xl border text-xs font-bold transition flex items-center justify-center space-x-1.5 group/btn shadow-xs hover:scale-102 ${badge.bgColor}`}
                                    title={`Klik untuk melihat detail & bukti (${badge.label})`}
                                  >
                                    <span>{badge.symbol}</span>
                                    <span className="text-[11px] font-semibold">{badge.label}</span>
                                    {evidenceCount > 0 && (
                                      <span className="ml-1 px-1.5 py-0.2 rounded-full bg-white/80 dark:bg-black/30 text-[10px] font-extrabold text-slate-700">
                                        {evidenceCount}
                                      </span>
                                    )}
                                  </button>
                                ) : (
                                  <span className="text-slate-300 font-semibold select-none">–</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Matrix Legend Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between flex-wrap gap-3 text-xs text-slate-600">
          <div className="flex items-center space-x-4 flex-wrap gap-y-2">
            <span className="font-bold text-slate-700">Legenda Status Bukti:</span>
            <div className="flex items-center space-x-1.5">
              <span className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center justify-center font-bold text-xs">✓</span>
              <span><strong>Confirmed:</strong> Sumber resmi langsung (studi kasus vendor / pengumuman resmi)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-5 h-5 rounded-md bg-blue-100 text-blue-800 border border-blue-300 flex items-center justify-center font-bold text-xs">~</span>
              <span><strong>Likely:</strong> ≥2 sumber tidak langsung atau wawancara</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-5 h-5 rounded-md bg-amber-100 text-amber-800 border border-amber-300 flex items-center justify-center font-bold text-xs">?</span>
              <span><strong>Indicative:</strong> 1 sumber sinyal awal (lowongan/web tag)</span>
            </div>
            <div className="flex items-center space-x-1.5 text-slate-400">
              <span><strong>–</strong> Tidak ditemukan</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 font-medium">
            *Setiap angka pada badge menunjukkan jumlah berkas bukti atau catatan wawancara terkait.
          </div>
        </div>
      </div>
    </div>
  );
};
