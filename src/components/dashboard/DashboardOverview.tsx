import React, { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BarChart3, ShieldCheck, Zap, AlertCircle, CheckCircle2, 
  ArrowRight, Users, Sparkles, Layers, Cpu, ArrowUpRight, 
  Presentation, Database, TrendingUp, AlertTriangle, Building2, HelpCircle
} from 'lucide-react';

const WORKSHOP_INFO: Record<string, { label: string; desc: string; color: string; bg: string; border: string }> = {
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
    desc: 'Cloud Technology, Infrastructure, Network, IT Support & ITSM',
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

const BANK_CONFIG = [
  { slug: 'bri', name: 'Bank BRI', label: 'BRI', isFocus: true, logo: '🟦', color: 'from-blue-900 to-blue-800' },
  { slug: 'mandiri', name: 'Bank Mandiri', label: 'Mandiri', isFocus: false, logo: '🟨', color: 'from-amber-700 to-yellow-600' },
  { slug: 'bca', name: 'Bank Central Asia', label: 'BCA', isFocus: false, logo: '🔵', color: 'from-blue-700 to-cyan-700' },
  { slug: 'bni', name: 'Bank BNI', label: 'BNI', isFocus: false, logo: '🟧', color: 'from-orange-700 to-amber-600' },
  { slug: 'btn', name: 'Bank BTN', label: 'BTN', isFocus: false, logo: '🔷', color: 'from-sky-800 to-blue-700' },
  { slug: 'bsi', name: 'Bank BSI', label: 'BSI', isFocus: false, logo: '🟩', color: 'from-emerald-800 to-teal-700' }
];

export const DashboardOverview: React.FC = () => {
  const { 
    researchItems,
    banks, 
    setActiveTab, 
    setSelectedBankId, 
    setSelectedResearchCell,
    setPresentationMode 
  } = useApp();

  // Metrics from 408 Research Items
  const totalCapabilities = researchItems.length;
  const totalEvaluations = totalCapabilities * 6;

  const {
    overallVerified,
    overallInference,
    overallBelum,
    bankStats,
    workshopCounts,
    domainStats,
    briLeadingCaps,
    competitorGaps,
    consensusCaps
  } = useMemo(() => {
    let verified = 0;
    let inference = 0;
    let belum = 0;

    const wsMap: Record<string, number> = { WS1: 0, WS2: 0, WS3: 0, WS4: 0 };
    const domainMap: Record<string, { total: number; ws: string; bankVerified: Record<string, number> }> = {};

    const bStats = BANK_CONFIG.map(b => ({
      slug: b.slug,
      name: b.name,
      label: b.label,
      isFocus: b.isFocus,
      logo: b.logo,
      verifiedCount: 0,
      inferenceCount: 0,
      belumCount: 0,
      verifiedPct: 0
    }));

    const briLeading: any[] = [];
    const compGaps: any[] = [];
    const consensus: any[] = [];

    researchItems.forEach(item => {
      // Workshop count
      if (wsMap[item.workshop] !== undefined) wsMap[item.workshop]++;

      // Domain mapping
      if (!domainMap[item.domain]) {
        domainMap[item.domain] = {
          total: 0,
          ws: item.workshop,
          bankVerified: { bri: 0, mandiri: 0, bca: 0, bni: 0, btn: 0, bsi: 0 }
        };
      }
      domainMap[item.domain].total++;

      // Bank evaluations
      let verifiedBankCount = 0;
      let hasCompetitorVerified = false;

      bStats.forEach(bStat => {
        const detail = item.banks[bStat.slug];
        const status = detail?.status || 'Belum';

        if (status === 'Terverifikasi') {
          verified++;
          bStat.verifiedCount++;
          domainMap[item.domain].bankVerified[bStat.slug]++;
          verifiedBankCount++;
          if (bStat.slug !== 'bri') hasCompetitorVerified = true;
        } else if (status === 'Inferensi') {
          inference++;
          bStat.inferenceCount++;
        } else {
          belum++;
          bStat.belumCount++;
        }
      });

      const briStatus = item.banks.bri?.status || 'Belum';

      // 1. BRI Leading (BRI verified, others not verified)
      if (briStatus === 'Terverifikasi' && !hasCompetitorVerified) {
        briLeading.push(item);
      }

      // 2. Competitor Gaps (Competitor verified, BRI is Belum or Inferensi)
      if (hasCompetitorVerified && briStatus !== 'Terverifikasi') {
        compGaps.push(item);
      }

      // 3. Consensus (BRI verified and >= 2 competitors verified)
      if (briStatus === 'Terverifikasi' && verifiedBankCount >= 3) {
        consensus.push(item);
      }
    });

    bStats.forEach(b => {
      b.verifiedPct = Math.round((b.verifiedCount / (totalCapabilities || 1)) * 100);
    });

    return {
      overallVerified: verified,
      overallInference: inference,
      overallBelum: belum,
      bankStats: bStats,
      workshopCounts: wsMap,
      domainStats: Object.entries(domainMap).map(([dom, data]) => ({
        domain: dom,
        workshop: data.ws,
        total: data.total,
        bankVerified: data.bankVerified
      })),
      briLeadingCaps: briLeading,
      competitorGaps: compGaps,
      consensusCaps: consensus
    };
  }, [researchItems, totalCapabilities]);

  const briData = bankStats.find(b => b.slug === 'bri');

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Executive Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-950 text-white p-8 sm:p-10 shadow-xl shadow-blue-900/15">
        <div className="absolute right-0 top-0 -mt-12 -mr-12 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 -mb-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>Materi Konsultasi & Workshop Arsitektur Teknologi Perbankan (MBB Style)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Competitor Intelligence: Riset Arsitektur 408 Kapabilitas Bank BRI vs Himbara & BCA
          </h1>

          <p className="text-sm sm:text-base text-blue-100/90 max-w-3xl leading-relaxed">
            Platform komparasi teknologi perbankan berbasis bukti (*evidence-based*). Mengumpulkan dan meneliti <strong>408 kapabilitas arsitektur</strong> di seluruh bank BUMN (BRI, Mandiri, BNI, BTN, BSI) dan BCA yang terstruktur ke dalam <strong>4 Workshop</strong> dan <strong>13 Domain Teknologi</strong>.
          </p>

          <div className="flex items-center flex-wrap gap-3 pt-3">
            <button
              onClick={() => setPresentationMode(true)}
              className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-lg shadow-orange-500/25 flex items-center space-x-2 transition active:scale-95"
            >
              <Presentation className="w-4 h-4" />
              <span>Mulai Workshop / Mode Presentasi</span>
            </button>

            <button
              onClick={() => setActiveTab('matrix')}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 backdrop-blur flex items-center space-x-2 transition"
            >
              <Database className="w-4 h-4" />
              <span>Buka Matriks Riset Sheet (408 Baris)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Workshop Architecture Pillars */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              4 Workshop Arsitektur Teknologi Perbankan
            </h3>
            <p className="text-xs text-slate-500">
              Klasifikasi 408 kapabilitas riset teknologi ke dalam 4 pilar workshop konsultasi.
            </p>
          </div>
          <button 
            onClick={() => setActiveTab('matrix')}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center space-x-1"
          >
            <span>Lihat Seluruh Matriks</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(WORKSHOP_INFO).map(([key, info]) => {
            const count = workshopCounts[key] || 0;
            const pct = Math.round((count / (totalCapabilities || 1)) * 100);

            return (
              <div 
                key={key} 
                onClick={() => setActiveTab('matrix')}
                className={`p-5 rounded-2xl border bg-white shadow-xs hover:shadow-md transition cursor-pointer group flex flex-col justify-between ${info.border}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-extrabold ${info.bg} ${info.color}`}>
                      {key}
                    </span>
                    <span className="text-xs font-extrabold text-slate-400 group-hover:text-blue-600 transition flex items-center">
                      <span>{pct}%</span>
                      <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm group-hover:text-blue-600 transition">
                    {info.label.split(': ')[1]}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {info.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-2xl font-black text-slate-900">{count}</span>
                  <span className="text-[11px] text-slate-400 font-medium">Kapabilitas Riset</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6 Banks Maturity & Verification Standing */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              Tingkat Bukti & Cakupan Kapabilitas 6 Bank
            </h3>
            <p className="text-xs text-slate-500">
              Evaluasi status pembuktian teknologi (Terverifikasi vs Inferensi) di setiap bank Himbara & BCA dari total 408 kapabilitas.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bankStats.map(b => (
            <div 
              key={b.slug}
              className={`p-5 rounded-2xl border transition bg-white shadow-xs hover:border-slate-300 relative ${
                b.isFocus ? 'border-2 border-blue-500 shadow-sm ring-2 ring-blue-500/10' : 'border-slate-200'
              }`}
            >
              {b.isFocus && (
                <div className="absolute top-3 right-3 px-2 py-0.5 bg-blue-600 text-white rounded text-[10px] font-bold">
                  FOKUS UTAMA
                </div>
              )}

              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">{b.logo}</span>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">{b.name}</h4>
                  <span className="text-[11px] text-slate-400">Kode: {b.label}</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5 my-3">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Tingkat Terverifikasi:</span>
                  <span className="font-bold text-slate-800">{b.verifiedCount} / {totalCapabilities} ({b.verifiedPct}%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex">
                  <div 
                    className="bg-emerald-500 h-full" 
                    style={{ width: `${(b.verifiedCount / totalCapabilities) * 100}%` }}
                    title={`Terverifikasi: ${b.verifiedCount}`}
                  />
                  <div 
                    className="bg-amber-400 h-full" 
                    style={{ width: `${(b.inferenceCount / totalCapabilities) * 100}%` }}
                    title={`Inferensi: ${b.inferenceCount}`}
                  />
                </div>
              </div>

              {/* Mini Stats Breakdown */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
                <div className="bg-emerald-50/60 p-1.5 rounded-lg border border-emerald-100">
                  <div className="text-emerald-700 font-extrabold text-xs">{b.verifiedCount}</div>
                  <div className="text-[9px] text-emerald-600 font-medium">Verified</div>
                </div>
                <div className="bg-amber-50/60 p-1.5 rounded-lg border border-amber-100">
                  <div className="text-amber-700 font-extrabold text-xs">{b.inferenceCount}</div>
                  <div className="text-[9px] text-amber-600 font-medium">Inferensi</div>
                </div>
                <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-200">
                  <div className="text-slate-600 font-extrabold text-xs">{b.belumCount}</div>
                  <div className="text-[9px] text-slate-400 font-medium">Belum</div>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedBankId(`bank-${b.slug}`);
                  setActiveTab('banks');
                }}
                className="w-full mt-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center justify-center space-x-1 transition"
              >
                <span>Lihat Profil Arsitektur {b.label}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Strategic Triage: Gaps vs Advantages */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card 1: Celah Arsitektur Kompetitor */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-2xl border border-orange-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-orange-800 font-extrabold text-xs uppercase tracking-wider mb-2">
              <AlertTriangle className="w-4 h-4 text-orange-600" />
              <span>Prioritas Celah Arsitektur (Gap)</span>
            </div>
            <div className="text-3xl font-black text-orange-950">
              {competitorGaps.length} Kapabilitas
            </div>
            <p className="text-xs text-orange-900/80 mt-2 leading-relaxed">
              Teknologi di mana kompetitor (Mandiri, BCA, atau BNI) telah terverifikasi mengadopsi solusi modern, namun status BRI masih dalam inferensi atau belum terkonfirmasi.
            </p>

            <div className="mt-4 space-y-2">
              {competitorGaps.slice(0, 3).map((item, idx) => (
                <div key={idx} className="bg-white/90 p-2.5 rounded-xl border border-orange-200/60 text-xs">
                  <div className="font-bold text-slate-900 leading-tight">{item.kapabilitas}</div>
                  <div className="text-[10px] text-orange-700 mt-0.5">{item.workshop} • {item.domain}</div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActiveTab('gap-analysis')}
            className="mt-5 w-full py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl transition flex items-center justify-center space-x-1.5 shadow-xs"
          >
            <span>Analisis Detail Celah (Gap View)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card 2: Keunggulan Eksklusif BRI */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-blue-800 font-extrabold text-xs uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Keunggulan Terverifikasi BRI</span>
            </div>
            <div className="text-3xl font-black text-blue-950">
              {briLeadingCaps.length} Kapabilitas
            </div>
            <p className="text-xs text-blue-900/80 mt-2 leading-relaxed">
              Teknologi di mana implementasi BRI telah terkonfirmasi resmi (misal: satelit BRIsat, ekosistem super-app BRImo, Google Apigee open finance, micro-banking agent).
            </p>

            <div className="mt-4 space-y-2">
              {briLeadingCaps.slice(0, 3).map((item, idx) => (
                <div key={idx} className="bg-white/90 p-2.5 rounded-xl border border-blue-200/60 text-xs">
                  <div className="font-bold text-slate-900 leading-tight">{item.kapabilitas}</div>
                  <div className="text-[10px] text-blue-700 mt-0.5">{item.banks?.bri?.merk || 'Solusi Terverifikasi'}</div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActiveTab('matrix')}
            className="mt-5 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition flex items-center justify-center space-x-1.5 shadow-xs"
          >
            <span>Eksplorasi Matriks Riset</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card 3: Standar Konsensus Industri */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-2xl border border-emerald-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-emerald-800 font-extrabold text-xs uppercase tracking-wider mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Standar Konsensus Perbankan</span>
            </div>
            <div className="text-3xl font-black text-emerald-950">
              {consensusCaps.length} Kapabilitas
            </div>
            <p className="text-xs text-emerald-900/80 mt-2 leading-relaxed">
              Arsitektur standar yang telah diadopsi bersama oleh BRI dan ≥ 2 bank lain (misal: Silverlake SIBS, BI-FAST, Kubernetes Openshift, Kafka event streaming).
            </p>

            <div className="mt-4 space-y-2">
              {consensusCaps.slice(0, 3).map((item, idx) => (
                <div key={idx} className="bg-white/90 p-2.5 rounded-xl border border-emerald-200/60 text-xs">
                  <div className="font-bold text-slate-900 leading-tight">{item.kapabilitas}</div>
                  <div className="text-[10px] text-emerald-700 mt-0.5">{item.workshop} • {item.domain}</div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActiveTab('head-to-head')}
            className="mt-5 w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition flex items-center justify-center space-x-1.5 shadow-xs"
          >
            <span>Komparasi Head-to-Head</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 13 Domains Heatmap Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-sm text-slate-900">
              Matriks Kematangan 13 Domain Arsitektur
            </h3>
            <p className="text-xs text-slate-500">
              Distribusi 408 kapabilitas per domain dan jumlah teknologi terverifikasi di masing-masing bank.
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono">13 Domain</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                <th className="py-3 px-4 border-r border-slate-200">Domain Arsitektur</th>
                <th className="py-3 px-3 w-20 text-center border-r border-slate-200">Workshop</th>
                <th className="py-3 px-3 w-20 text-center border-r border-slate-200">Total Kapabilitas</th>
                {BANK_CONFIG.map(b => (
                  <th key={b.slug} className={`py-3 px-3 text-center min-w-[90px] border-r border-slate-200 ${b.isFocus ? 'bg-blue-50/70 text-blue-900 font-black' : ''}`}>
                    {b.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {domainStats.map((dom, i) => {
                const ws = WORKSHOP_INFO[dom.workshop] || {
                  bg: 'bg-slate-100',
                  color: 'text-slate-700',
                  border: 'border-slate-200'
                };

                return (
                  <tr key={i} className="hover:bg-slate-50 transition">
                    <td className="py-2.5 px-4 font-bold text-slate-900 border-r border-slate-100">
                      {dom.domain}
                    </td>
                    <td className="py-2.5 px-3 text-center border-r border-slate-100">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold border ${ws.bg} ${ws.color} ${ws.border}`}>
                        {dom.workshop}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center font-bold text-slate-700 border-r border-slate-100">
                      {dom.total}
                    </td>
                    {BANK_CONFIG.map(b => {
                      const vCount = dom.bankVerified[b.slug] || 0;
                      const pct = Math.round((vCount / dom.total) * 100);

                      return (
                        <td key={b.slug} className={`py-2 px-3 text-center border-r border-slate-100 ${b.isFocus ? 'bg-blue-50/20' : ''}`}>
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                            vCount > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-400'
                          }`}>
                            {vCount} ({pct}%)
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
