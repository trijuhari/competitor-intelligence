import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  TrendingUp, AlertTriangle, CheckCircle2, ArrowRight, 
  Lightbulb, ShieldCheck, Sparkles, Zap, Building2, 
  Filter, Search, ExternalLink, HelpCircle, ArrowUpRight, RotateCcw
} from 'lucide-react';

const WORKSHOP_PILLARS: Record<string, { label: string; desc: string; color: string; bg: string; border: string }> = {
  WS1: { label: 'WS1: Core & Digital Banking', desc: 'Core CBS, Mobile App, Digital Bank', color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200' },
  WS2: { label: 'WS2: EDW, MDM & BI', desc: 'Data Warehouse, MDM, BI & Reporting', color: 'text-indigo-700', bg: 'bg-indigo-50', border: 'border-indigo-200' },
  WS3: { label: 'WS3: Cloud, Infra & ITSM', desc: 'Cloud, Data Center, Network & ITSM', color: 'text-cyan-700', bg: 'bg-cyan-50', border: 'border-cyan-200' },
  WS4: { label: 'WS4: Big Data & AI', desc: 'Hadoop, AI/ML, NLP & Generative AI', color: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-200' }
};

const COMPETITORS = [
  { slug: 'mandiri', label: 'Mandiri', fullName: 'Bank Mandiri', logo: '🟨' },
  { slug: 'bca', label: 'BCA', fullName: 'Bank Central Asia', logo: '🔵' },
  { slug: 'bni', label: 'BNI', fullName: 'Bank Negara Indonesia', logo: '🟧' },
  { slug: 'btn', label: 'BTN', fullName: 'Bank Tabungan Negara', logo: '🔷' },
  { slug: 'bsi', label: 'BSI', fullName: 'Bank Syariah Indonesia', logo: '🟩' }
];

export const GapAnalysisView: React.FC = () => {
  const { 
    researchItems,
    setSelectedResearchCell 
  } = useApp();

  const [activeTab, setActiveTabState] = useState<'gaps' | 'advantages' | 'consensus'>('gaps');
  const [workshopFilter, setWorkshopFilter] = useState('all');
  const [domainFilter, setDomainFilter] = useState('all');
  const [competitorFilter, setCompetitorFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const allDomains = useMemo(() => {
    return Array.from(new Set(researchItems.map(i => i.domain))).filter(Boolean);
  }, [researchItems]);

  // Dynamic analysis from 408 items
  const {
    gapsList,
    advantagesList,
    consensusList
  } = useMemo(() => {
    const gaps: any[] = [];
    const advantages: any[] = [];
    const consensus: any[] = [];

    researchItems.forEach(item => {
      const bri = item.banks.bri || { merk: '-', status: 'Belum', link: '', pic: 'Admin' };
      const isBriVerified = bri.status === 'Terverifikasi';

      // Check competitors
      const verifiedCompetitors: any[] = [];
      COMPETITORS.forEach(comp => {
        const cDetail = item.banks[comp.slug];
        if (cDetail && cDetail.status === 'Terverifikasi') {
          verifiedCompetitors.push({
            bank: comp,
            detail: cDetail
          });
        }
      });

      // 1. GAP for BRI: Competitors verified, but BRI is NOT verified (Belum or Inferensi)
      if (verifiedCompetitors.length > 0 && !isBriVerified) {
        gaps.push({
          item,
          bri,
          verifiedCompetitors,
          urgency: verifiedCompetitors.length >= 2 ? 'Tinggi' : 'Sedang'
        });
      }

      // 2. ADVANTAGE for BRI: BRI is verified, and NO competitor is verified
      if (isBriVerified && verifiedCompetitors.length === 0) {
        advantages.push({
          item,
          bri
        });
      }

      // 3. CONSENSUS: BRI is verified and >= 2 competitors are verified
      if (isBriVerified && verifiedCompetitors.length >= 2) {
        consensus.push({
          item,
          bri,
          verifiedCompetitors
        });
      }
    });

    return {
      gapsList: gaps,
      advantagesList: advantages,
      consensusList: consensus
    };
  }, [researchItems]);

  // Filter current list
  const activeList = activeTab === 'gaps' ? gapsList : activeTab === 'advantages' ? advantagesList : consensusList;

  const filteredList = useMemo(() => {
    return activeList.filter(entry => {
      const { item } = entry;
      if (workshopFilter !== 'all' && item.workshop !== workshopFilter) return false;
      if (domainFilter !== 'all' && item.domain !== domainFilter) return false;

      if (activeTab === 'gaps' && competitorFilter !== 'all') {
        const hasSpecificComp = entry.verifiedCompetitors?.some((vc: any) => vc.bank.slug === competitorFilter);
        if (!hasSpecificComp) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchCap = item.kapabilitas.toLowerCase().includes(q);
        const matchDom = item.domain.toLowerCase().includes(q);
        const matchKat = item.kategori.toLowerCase().includes(q);
        const matchBri = entry.bri?.merk?.toLowerCase().includes(q);
        const matchComp = entry.verifiedCompetitors?.some((vc: any) => vc.detail.merk?.toLowerCase().includes(q));
        if (!matchCap && !matchDom && !matchKat && !matchBri && !matchComp) return false;
      }

      return true;
    });
  }, [activeList, workshopFilter, domainFilter, competitorFilter, searchQuery, activeTab]);

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Analisis Kesenjangan & Peluang Strategis (Gap Analysis)
          </h2>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-orange-800">
            408 Kapabilitas Riset
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1 max-w-3xl">
          Pemetaan sistematis celah teknologi di mana kompetitor (Mandiri, BCA, BNI, BTN, BSI) telah terverifikasi mengadopsi solusi modern, dibandingkan dengan keunggulan eksklusif dan standar konsensus industri Bank BRI.
        </p>
      </div>

      {/* Strategic Triage Summary Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Tab 1: Celah Arsitektur */}
        <button
          onClick={() => setActiveTabState('gaps')}
          className={`p-6 rounded-3xl border text-left transition-all duration-200 flex flex-col justify-between hover:-translate-y-0.5 active:scale-[0.99] ${
            activeTab === 'gaps'
              ? 'bg-gradient-to-br from-amber-50/90 via-orange-50/70 to-rose-50/50 border-orange-300 ring-2 ring-orange-500/25 shadow-card'
              : 'bg-white/80 backdrop-blur-sm border-slate-200/80 hover:border-slate-300 shadow-card'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-xs text-orange-800 uppercase tracking-wider flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              <AlertTriangle className="w-4 h-4 text-orange-600" />
              <span>Celah untuk BRI (Gaps)</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-orange-200/80 text-orange-950 border border-orange-300/80 shadow-2xs">
              Prioritas Tindakan
            </span>
          </div>
          <div className="text-4xl font-black text-orange-950 mt-4 tracking-tight">
            {gapsList.length} <span className="text-base font-bold text-orange-700 font-sans">Kapabilitas</span>
          </div>
          <p className="text-[11px] text-orange-900/80 mt-2 leading-relaxed">
            Kompetitor telah terverifikasi resmi, BRI masih inferensi/belum terdata
          </p>
        </button>

        {/* Tab 2: Keunggulan Eksklusif BRI */}
        <button
          onClick={() => setActiveTabState('advantages')}
          className={`p-6 rounded-3xl border text-left transition-all duration-200 flex flex-col justify-between hover:-translate-y-0.5 active:scale-[0.99] ${
            activeTab === 'advantages'
              ? 'bg-gradient-to-br from-blue-50/90 via-indigo-50/70 to-sky-50/50 border-blue-300 ring-2 ring-blue-500/25 shadow-card'
              : 'bg-white/80 backdrop-blur-sm border-slate-200/80 hover:border-slate-300 shadow-card'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-xs text-blue-800 uppercase tracking-wider flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Keunggulan Terbukti BRI</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-200/80 text-blue-950 border border-blue-300/80 shadow-2xs">
              Differentiator
            </span>
          </div>
          <div className="text-4xl font-black text-blue-950 mt-4 tracking-tight">
            {advantagesList.length} <span className="text-base font-bold text-blue-700 font-sans">Kapabilitas</span>
          </div>
          <p className="text-[11px] text-blue-900/80 mt-2 leading-relaxed">
            Implementasi BRI terverifikasi resmi, belum ditemukan jejak publik di bank lain
          </p>
        </button>

        {/* Tab 3: Standar Konsensus Industri */}
        <button
          onClick={() => setActiveTabState('consensus')}
          className={`p-6 rounded-3xl border text-left transition-all duration-200 flex flex-col justify-between hover:-translate-y-0.5 active:scale-[0.99] ${
            activeTab === 'consensus'
              ? 'bg-gradient-to-br from-emerald-50/90 via-teal-50/70 to-cyan-50/50 border-emerald-300 ring-2 ring-emerald-500/25 shadow-card'
              : 'bg-white/80 backdrop-blur-sm border-slate-200/80 hover:border-slate-300 shadow-card'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-xs text-emerald-800 uppercase tracking-wider flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Standar Paritas Industri</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-200/80 text-emerald-950 border border-emerald-300/80 shadow-2xs">
              Konsensus
            </span>
          </div>
          <div className="text-4xl font-black text-emerald-950 mt-4 tracking-tight">
            {consensusList.length} <span className="text-base font-bold text-emerald-700 font-sans">Kapabilitas</span>
          </div>
          <p className="text-[11px] text-emerald-900/80 mt-2 leading-relaxed">
            Diadopsi dan terverifikasi di BRI dan ≥ 2 bank kompetitor
          </p>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-4 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari kapabilitas, domain, atau merk solusi..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white"
            />
          </div>

          <div className="md:col-span-3">
            <select
              value={workshopFilter}
              onChange={e => setWorkshopFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-slate-50 font-medium"
            >
              <option value="all">Semua Workshop (WS1 - WS4)</option>
              <option value="WS1">WS1: Core & Digital Banking</option>
              <option value="WS2">WS2: EDW, MDM & BI</option>
              <option value="WS3">WS3: Cloud, Infra & ITSM</option>
              <option value="WS4">WS4: Big Data & AI</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <select
              value={domainFilter}
              onChange={e => setDomainFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-slate-50 font-medium"
            >
              <option value="all">Semua Domain ({allDomains.length})</option>
              {allDomains.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {activeTab === 'gaps' && (
            <div className="md:col-span-2">
              <select
                value={competitorFilter}
                onChange={e => setCompetitorFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-slate-50 font-medium"
              >
                <option value="all">Semua Bank Kompetitor</option>
                {COMPETITORS.map(c => (
                  <option key={c.slug} value={c.slug}>{c.label}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <div>
            Menampilkan <strong className="text-slate-800">{filteredList.length}</strong> kapabilitas riset
          </div>
          {(searchQuery || workshopFilter !== 'all' || domainFilter !== 'all' || competitorFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setWorkshopFilter('all');
                setDomainFilter('all');
                setCompetitorFilter('all');
              }}
              className="text-blue-600 hover:underline font-semibold flex items-center space-x-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filter</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Results Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/90 border-b border-slate-200 text-slate-700 font-bold">
                <th className="py-3.5 px-3 w-12 text-center border-r border-slate-200">No</th>
                <th className="py-3.5 px-3 w-20 text-center border-r border-slate-200">Workshop</th>
                <th className="py-3.5 px-3 w-48 border-r border-slate-200">Domain & Kategori</th>
                <th className="py-3.5 px-4 min-w-[220px] border-r border-slate-200">Kapabilitas / Sistem</th>
                <th className="py-3.5 px-3 w-64 border-r border-slate-200 bg-blue-50/70 text-blue-950">Status Bank BRI</th>
                <th className="py-3.5 px-3 min-w-[240px]">
                  {activeTab === 'gaps' ? 'Kompetitor yang Mengadopsi' : activeTab === 'advantages' ? 'Analisis Keunggulan' : 'Standar Konsensus Kompetitor'}
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    Tidak ada kapabilitas yang cocok dengan filter aktif.
                  </td>
                </tr>
              ) : (
                filteredList.map((entry, idx) => {
                  const { item, bri } = entry;
                  return (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3 px-3 text-center font-mono text-slate-400 border-r border-slate-100 align-top">
                        {item.no}
                      </td>

                      <td className="py-3 px-2 text-center border-r border-slate-100 align-top">
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-slate-100 text-slate-700 border border-slate-200">
                          {item.workshop}
                        </span>
                      </td>

                      <td className="py-3 px-3 border-r border-slate-100 align-top">
                        <div className="font-semibold text-slate-800 leading-tight">{item.domain}</div>
                        <div className="text-[10px] text-slate-400 mt-1">{item.kategori}</div>
                      </td>

                      <td className="py-3 px-4 font-bold text-slate-900 border-r border-slate-100 align-top">
                        <div className="leading-snug">{item.kapabilitas}</div>
                        <div className="text-[10px] text-slate-400 font-normal mt-0.5">ID: {item.id}</div>
                      </td>

                      {/* BRI Status */}
                      <td className="py-2.5 px-3 border-r border-slate-100 align-top bg-blue-50/10">
                        <button
                          type="button"
                          onClick={() => setSelectedResearchCell({ capId: item.id, bankCode: 'bri' })}
                          className={`w-full text-left p-2 rounded-xl border text-xs transition hover:scale-101 ${
                            bri?.status === 'Terverifikasi'
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-950 font-bold'
                              : bri?.status === 'Inferensi'
                              ? 'bg-amber-50 border-amber-200 text-amber-950 font-semibold'
                              : 'bg-slate-50 border-slate-200 text-slate-400'
                          }`}
                        >
                          <div className="leading-tight">{bri?.merk || '– Belum Terkonfirmasi'}</div>
                          <div className="flex items-center justify-between mt-1 text-[9px]">
                            <span className="font-bold">
                              {bri?.status === 'Terverifikasi' ? '✓ Verified' : bri?.status === 'Inferensi' ? '⚠ Inferensi' : '– Belum'}
                            </span>
                            {bri?.link && <ExternalLink className="w-2.5 h-2.5 text-slate-400" />}
                          </div>
                        </button>
                      </td>

                      {/* Competitors Adoptions */}
                      <td className="py-2.5 px-3 align-top space-y-1.5">
                        {activeTab === 'gaps' && (
                          <div className="space-y-1">
                            {entry.verifiedCompetitors?.map((vc: any, vIdx: number) => (
                              <button
                                key={vIdx}
                                type="button"
                                onClick={() => setSelectedResearchCell({ capId: item.id, bankCode: vc.bank.slug })}
                                className="w-full text-left p-1.5 rounded-lg bg-orange-50/70 hover:bg-orange-100/70 border border-orange-200 text-slate-900 flex items-center justify-between text-xs transition"
                              >
                                <div>
                                  <span className="font-bold mr-1.5">{vc.bank.logo} {vc.bank.label}:</span>
                                  <span className="font-medium text-orange-950">{vc.detail.merk}</span>
                                </div>
                                <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 text-[9px] font-bold rounded">
                                  ✓ Verified
                                </span>
                              </button>
                            ))}
                          </div>
                        )}

                        {activeTab === 'advantages' && (
                          <div className="p-2 rounded-xl bg-blue-50/60 border border-blue-200 text-blue-900 text-xs">
                            <div className="font-bold flex items-center space-x-1">
                              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                              <span>Keunggulan Kompetitif BRI</span>
                            </div>
                            <p className="text-[11px] text-blue-700/80 mt-0.5">
                              Implementasi telah terverifikasi resmi sementara kompetitor belum memiliki jejak pembuktian publik yang sepadan.
                            </p>
                          </div>
                        )}

                        {activeTab === 'consensus' && (
                          <div className="space-y-1">
                            <span className="text-[10px] text-slate-400 font-medium">Bank kompetitor yang juga terverifikasi:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {entry.verifiedCompetitors?.map((vc: any, vIdx: number) => (
                                <span key={vIdx} className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-[10px]">
                                  {vc.bank.logo} {vc.bank.label}: {vc.detail.merk}
                                </span>
                              ))}
                            </div>
                          </div>
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
