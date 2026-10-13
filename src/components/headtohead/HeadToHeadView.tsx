import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeftRight, Check, X, Shield, Sparkles, Building2, 
  ChevronRight, ArrowRight, TrendingUp, AlertTriangle 
} from 'lucide-react';
import { getConfidenceBadge } from '../../utils/helpers';

export const HeadToHeadView: React.FC = () => {
  const { 
    banks, 
    categories, 
    technologies, 
    findings, 
    setSelectedFindingModalId 
  } = useApp();

  const bri = banks.find(b => b.id === 'bank-bri')!;
  const competitorBanks = banks.filter(b => b.id !== 'bank-bri');
  const [selectedCompetitorId, setSelectedCompetitorId] = useState<string>('bank-mandiri');

  const competitor = banks.find(b => b.id === selectedCompetitorId)!;

  // Findings
  const briFindings = findings.filter(f => f.bankId === 'bank-bri');
  const compFindings = findings.filter(f => f.bankId === competitor.id);

  const briTechIds = new Set(briFindings.map(f => f.technologyId));
  const compTechIds = new Set(compFindings.map(f => f.technologyId));

  // Category comparison logic
  const categoryDiffs = categories.map(cat => {
    const catTechs = technologies.filter(t => t.categoryId === cat.id);
    
    const shared = catTechs.filter(t => briTechIds.has(t.id) && compTechIds.has(t.id));
    const onlyBri = catTechs.filter(t => briTechIds.has(t.id) && !compTechIds.has(t.id));
    const onlyComp = catTechs.filter(t => !briTechIds.has(t.id) && compTechIds.has(t.id));

    return {
      category: cat,
      shared,
      onlyBri,
      onlyComp,
      totalTracked: catTechs.length
    };
  });

  const totalShared = categoryDiffs.reduce((acc, c) => acc + c.shared.length, 0);
  const totalOnlyBri = categoryDiffs.reduce((acc, c) => acc + c.onlyBri.length, 0);
  const totalOnlyComp = categoryDiffs.reduce((acc, c) => acc + c.onlyComp.length, 0);

  return (
    <div className="space-y-6 pb-16">
      {/* Page Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Head-to-Head: Bank BRI vs {competitor.nama}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800">
              F5 · Diff View
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Komparasi langsung per kategori teknologi: temukan persamaan, keunggulan BRI, dan potensi celah arsitektur.
          </p>
        </div>

        {/* Competitor Selector Pills */}
        <div className="flex items-center space-x-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          <span className="text-xs font-semibold text-slate-500 px-2">Bandingkan dengan:</span>
          {competitorBanks.map(b => (
            <button
              key={b.id}
              onClick={() => setSelectedCompetitorId(b.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
                selectedCompetitorId === b.id
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>{b.logo}</span>
              <span>{b.singkatan}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Versus Banner Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left: BRI Summary Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-900 to-blue-800 text-white shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl">{bri.logo}</span>
            <span className="px-2.5 py-0.5 bg-blue-500/30 border border-blue-400/40 rounded-full text-[11px] font-extrabold text-blue-200">
              FOKUS UTAMA
            </span>
          </div>
          <h3 className="text-xl font-extrabold">{bri.singkatan}</h3>
          <p className="text-xs text-blue-200 mt-1 line-clamp-1">{bri.nama}</p>
          <div className="mt-4 pt-3 border-t border-blue-700/60 flex justify-between items-baseline">
            <span className="text-xs text-blue-200">Stack Teridentifikasi:</span>
            <span className="text-2xl font-extrabold text-white">{briFindings.length}</span>
          </div>
          <div className="mt-2 text-[11px] text-blue-200/90 flex items-center space-x-1">
            <span>Produk Unggulan:</span>
            <strong className="text-white">{bri.produkDigital[0]}</strong>
          </div>
        </div>

        {/* Center: Diff Summary Stat Card */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="text-center font-bold text-slate-500 text-xs uppercase tracking-wider mb-3">
              Ringkasan Perbedaan (Diff Matrix)
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-100">
                <div className="text-xl font-extrabold text-emerald-700">{totalShared}</div>
                <div className="text-[10px] text-emerald-800 font-semibold mt-0.5">Sama (Shared)</div>
              </div>
              <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-100">
                <div className="text-xl font-extrabold text-blue-700">{totalOnlyBri}</div>
                <div className="text-[10px] text-blue-800 font-semibold mt-0.5">Hanya BRI</div>
              </div>
              <div className="p-2.5 bg-orange-50 rounded-xl border border-orange-100">
                <div className="text-xl font-extrabold text-orange-700">{totalOnlyComp}</div>
                <div className="text-[10px] text-orange-800 font-semibold mt-0.5">Hanya {competitor.singkatan}</div>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 text-center">
            <span className="text-xs text-slate-500 font-medium">
              Tingkat Keselarasan Arsitektur: <strong>{Math.round((totalShared / (totalShared + totalOnlyBri + totalOnlyComp || 1)) * 100)}%</strong>
            </span>
          </div>
        </div>

        {/* Right: Competitor Summary Card */}
        <div 
          className="p-6 rounded-2xl text-white shadow-md relative overflow-hidden"
          style={{ backgroundColor: competitor.brandColor }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl">{competitor.logo}</span>
            <span className="px-2.5 py-0.5 bg-white/20 border border-white/30 rounded-full text-[11px] font-extrabold text-white">
              KOMPETITOR
            </span>
          </div>
          <h3 className="text-xl font-extrabold">{competitor.singkatan}</h3>
          <p className="text-xs text-white/80 mt-1 line-clamp-1">{competitor.nama}</p>
          <div className="mt-4 pt-3 border-t border-white/20 flex justify-between items-baseline">
            <span className="text-xs text-white/80">Stack Teridentifikasi:</span>
            <span className="text-2xl font-extrabold text-white">{compFindings.length}</span>
          </div>
          <div className="mt-2 text-[11px] text-white/90 flex items-center space-x-1">
            <span>Produk Unggulan:</span>
            <strong className="text-white">{competitor.produkDigital[0]}</strong>
          </div>
        </div>
      </div>

      {/* Category by Category Breakdown */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
          <span>Perbandingan Rinci per Kategori (11 Domain)</span>
        </h3>

        {categoryDiffs.map(diff => {
          return (
            <div 
              key={diff.category.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-slate-300 transition"
            >
              {/* Category Header */}
              <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center space-x-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    {diff.category.nama}
                  </h4>
                </div>

                <div className="flex items-center space-x-3 text-xs">
                  <span className="text-emerald-700 font-semibold">
                    ✓ {diff.shared.length} Bersama
                  </span>
                  <span className="text-blue-700 font-semibold">
                    ★ {diff.onlyBri.length} Hanya BRI
                  </span>
                  <span className="text-orange-700 font-semibold">
                    ▲ {diff.onlyComp.length} Hanya {competitor.singkatan}
                  </span>
                </div>
              </div>

              {/* 3 Columns Comparison */}
              <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {/* Col 1: Hanya BRI */}
                <div className="p-3.5 bg-blue-50/40 rounded-xl border border-blue-100 flex flex-col justify-between">
                  <div>
                    <div className="font-bold text-blue-900 flex items-center justify-between mb-2">
                      <span>Keunggulan Eksklusif BRI</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-extrabold">
                        {diff.onlyBri.length}
                      </span>
                    </div>
                    {diff.onlyBri.length === 0 ? (
                      <div className="text-slate-400 italic py-2">Tidak ada stack eksklusif di kategori ini.</div>
                    ) : (
                      <div className="space-y-2">
                        {diff.onlyBri.map(t => {
                          const f = findings.find(x => x.bankId === 'bank-bri' && x.technologyId === t.id);
                          return (
                            <div 
                              key={t.id}
                              onClick={() => f && setSelectedFindingModalId(f.id)}
                              className="p-2 bg-white rounded-lg border border-blue-200 hover:border-blue-300 cursor-pointer transition shadow-2xs"
                            >
                              <div className="font-bold text-slate-900">{t.nama}</div>
                              <div className="text-[11px] text-slate-500">{t.vendor}</div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Col 2: Shared Tech */}
                <div className="p-3.5 bg-emerald-50/40 rounded-xl border border-emerald-100 flex flex-col justify-between">
                  <div>
                    <div className="font-bold text-emerald-900 flex items-center justify-between mb-2">
                      <span>Stack Bersama (Sama-sama Memakai)</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-extrabold">
                        {diff.shared.length}
                      </span>
                    </div>
                    {diff.shared.length === 0 ? (
                      <div className="text-slate-400 italic py-2">Belum ada titik temu di kategori ini.</div>
                    ) : (
                      <div className="space-y-2">
                        {diff.shared.map(t => {
                          const fBri = findings.find(x => x.bankId === 'bank-bri' && x.technologyId === t.id);
                          return (
                            <div 
                              key={t.id}
                              onClick={() => fBri && setSelectedFindingModalId(fBri.id)}
                              className="p-2 bg-white rounded-lg border border-emerald-200 hover:border-emerald-300 cursor-pointer transition shadow-2xs"
                            >
                              <div className="font-bold text-slate-900 flex items-center justify-between">
                                <span>{t.nama}</span>
                                <span className="text-emerald-600 font-bold text-[10px]">✓ Kedua Bank</span>
                              </div>
                              <div className="text-[11px] text-slate-500">{t.vendor}</div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Col 3: Hanya Kompetitor */}
                <div className="p-3.5 bg-orange-50/40 rounded-xl border border-orange-100 flex flex-col justify-between">
                  <div>
                    <div className="font-bold text-orange-950 flex items-center justify-between mb-2">
                      <span>Celah / Hanya di {competitor.singkatan}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-orange-100 text-orange-900 font-extrabold">
                        {diff.onlyComp.length}
                      </span>
                    </div>
                    {diff.onlyComp.length === 0 ? (
                      <div className="text-slate-400 italic py-2">Kompetitor tidak memiliki stack unik di kategori ini.</div>
                    ) : (
                      <div className="space-y-2">
                        {diff.onlyComp.map(t => {
                          const fComp = findings.find(x => x.bankId === competitor.id && x.technologyId === t.id);
                          return (
                            <div 
                              key={t.id}
                              onClick={() => fComp && setSelectedFindingModalId(fComp.id)}
                              className="p-2 bg-white rounded-lg border border-orange-200 hover:border-orange-300 cursor-pointer transition shadow-2xs"
                            >
                              <div className="font-bold text-slate-900">{t.nama}</div>
                              <div className="text-[11px] text-slate-500">{t.vendor}</div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
