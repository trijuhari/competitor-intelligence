import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BarChart3, ShieldCheck, Zap, AlertCircle, CheckCircle2, 
  ArrowRight, Sparkles, Layers, Cpu, ArrowUpRight, 
  Database, TrendingUp, AlertTriangle, Building2, 
  Search, Filter, SlidersHorizontal, Activity, Award, Compass, RefreshCw
} from 'lucide-react';

const WORKSHOP_INFO: Record<string, { label: string; desc: string; color: string; bg: string; border: string; accent: string }> = {
  WS1: { 
    label: 'Core & Digital Banking', 
    desc: 'Core Banking (CBS), Mobile Banking, Internet Banking, Digital Payment & Open API',
    color: 'text-blue-700 dark:text-blue-300',
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    border: 'border-blue-200 dark:border-blue-800/80',
    accent: 'from-blue-600 to-indigo-600'
  },
  WS2: { 
    label: 'EDW, MDM & BI Analytics', 
    desc: 'Enterprise Data Warehouse, Master Data Management, Data Pipeline & BI Reporting',
    color: 'text-indigo-700 dark:text-indigo-300',
    bg: 'bg-indigo-50 dark:bg-indigo-950/40',
    border: 'border-indigo-200 dark:border-indigo-800/80',
    accent: 'from-indigo-600 to-violet-600'
  },
  WS3: { 
    label: 'Cloud, Infra, Network & ITSM', 
    desc: 'Container Platform, Hybrid Cloud, APM Observability, Zero-Trust Security & Network',
    color: 'text-cyan-700 dark:text-cyan-300',
    bg: 'bg-cyan-50 dark:bg-cyan-950/40',
    border: 'border-cyan-200 dark:border-cyan-800/80',
    accent: 'from-cyan-600 to-blue-600'
  },
  WS4: { 
    label: 'Big Data, AI & Machine Learning', 
    desc: 'Real-time Event Streaming, NoSQL Storage, MLOps, Generative AI & Virtual Assistant',
    color: 'text-purple-700 dark:text-purple-300',
    bg: 'bg-purple-50 dark:bg-purple-950/40',
    border: 'border-purple-200 dark:border-purple-800/80',
    accent: 'from-purple-600 to-fuchsia-600'
  }
};

const BANK_CONFIG = [
  { slug: 'bri', name: 'Bank BRI', label: 'BRI', isFocus: true, logo: '🟦', color: 'from-blue-900 to-blue-800', desc: 'Pemimpin Pasar Skala Mikro' },
  { slug: 'mandiri', name: 'Bank Mandiri', label: 'Mandiri', isFocus: false, logo: '🟨', color: 'from-amber-700 to-yellow-600', desc: 'Ekosistem Urban & Wholesale' },
  { slug: 'bca', name: 'Bank Central Asia', label: 'BCA', isFocus: false, logo: '🔵', color: 'from-blue-700 to-cyan-700', desc: 'Efisiensi Transaksi Ritel' },
  { slug: 'bni', name: 'Bank BNI', label: 'BNI', isFocus: false, logo: '🟧', color: 'from-orange-700 to-amber-600', desc: 'Global & Consumer Banking' },
  { slug: 'btn', name: 'Bank BTN', label: 'BTN', isFocus: false, logo: '🔷', color: 'from-sky-800 to-blue-700', desc: 'Spesialis Pembiayaan Perumahan' },
  { slug: 'bsi', name: 'Bank BSI', label: 'BSI', isFocus: false, logo: '🟩', color: 'from-emerald-800 to-teal-700', desc: 'Perbankan Syariah Terbesar' }
];

export const DashboardOverview: React.FC = () => {
  const { 
    researchItems,
    setActiveTab, 
    setSelectedBankId 
  } = useApp();

  const [activeWorkshopFilter, setActiveWorkshopFilter] = useState<string>('all');
  const [searchDomainQuery, setSearchDomainQuery] = useState<string>('');

  const totalCapabilities = researchItems.length;
  const totalEvaluations = totalCapabilities * 6;

  // Real data calculations
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
      desc: b.desc,
      verifiedCount: 0,
      inferenceCount: 0,
      belumCount: 0,
      verifiedPct: 0
    }));

    const briLeading: any[] = [];
    const compGaps: any[] = [];
    const consensus: any[] = [];

    researchItems.forEach(item => {
      if (wsMap[item.workshop] !== undefined) wsMap[item.workshop]++;

      if (!domainMap[item.domain]) {
        domainMap[item.domain] = {
          total: 0,
          ws: item.workshop,
          bankVerified: { bri: 0, mandiri: 0, bca: 0, bni: 0, btn: 0, bsi: 0 }
        };
      }
      domainMap[item.domain].total++;

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

      // 1. BRI Leading (BRI verified, competitors not verified)
      if (briStatus === 'Terverifikasi' && !hasCompetitorVerified) {
        briLeading.push(item);
      }

      // 2. Competitor Gaps (Competitor verified, BRI Belum/Inferensi)
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
  const industryVerifiedPct = Math.round((overallVerified / (totalEvaluations || 1)) * 100);

  // Filtered Domain Stats
  const filteredDomainStats = useMemo(() => {
    return domainStats.filter(dom => {
      if (activeWorkshopFilter !== 'all' && dom.workshop !== activeWorkshopFilter) return false;
      if (searchDomainQuery.trim()) {
        const q = searchDomainQuery.toLowerCase();
        if (!dom.domain.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [domainStats, activeWorkshopFilter, searchDomainQuery]);

  return (
    <div className="space-y-8 pb-16">
      {/* Analytics Control Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              Executive Analytics Dashboard
            </span>
            <span className="text-slate-400 dark:text-slate-600">•</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Himbara & BCA Benchmark 2026
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
            Dashboard Intelijen Arsitektur Bank BRI
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Pusat analitik komparasi teknologi perbankan: Evaluasi <strong>{totalCapabilities} kapabilitas</strong> di <strong>6 bank terkemuka</strong>, <strong>4 pilar workshop</strong>, dan <strong>13 domain arsitektur</strong>.
          </p>
        </div>

        <div className="flex items-center flex-wrap gap-2.5 shrink-0">
          <button
            onClick={() => setActiveTab('matrix')}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center space-x-2 shadow-md shadow-blue-600/20 transition-all active:scale-95"
          >
            <Database className="w-4 h-4 text-white" />
            <span>Buka Matriks Sheet ({totalCapabilities} Kapabilitas)</span>
          </button>
        </div>
      </div>

      {/* Modern High-Impact Analytics KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* KPI 1: Total Capabilities */}
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card hover:shadow-card-hover transition-all duration-200 group">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold">
            <span>Total Kapabilitas</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{totalCapabilities}</span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/60">
              100% Live
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80">
            <span>Evaluasi Status:</span>
            <strong className="text-slate-700 dark:text-slate-300 font-mono">{totalEvaluations.toLocaleString()} Titik</strong>
          </div>
        </div>

        {/* KPI 2: BRI Verified Maturity */}
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card hover:shadow-card-hover transition-all duration-200 group">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold">
            <span>Maturitas Terverifikasi BRI</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">{briData?.verifiedPct || 0}%</span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 font-mono">
              ({briData?.verifiedCount || 0} Caps)
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80">
            <span>Rata-rata Industri:</span>
            <strong className="text-slate-700 dark:text-slate-300 font-mono">{industryVerifiedPct}%</strong>
          </div>
        </div>

        {/* KPI 3: Celah Kritis (Competitor Gaps) */}
        <div 
          onClick={() => setActiveTab('gap-analysis')}
          className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-5 rounded-2xl border border-orange-200/80 dark:border-orange-800/60 shadow-card hover:shadow-card-hover transition-all duration-200 cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-orange-700 dark:text-orange-400 font-semibold">
            <span>Celah Arsitektur (Gaps)</span>
            <div className="w-8 h-8 rounded-xl bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-black text-orange-600 dark:text-orange-400 tracking-tight">{competitorGaps.length}</span>
            <span className="text-xs font-bold text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-orange-950/60 px-1.5 py-0.5 rounded border border-orange-200 dark:border-orange-800/60">
              Perlu Ditutup
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80">
            <span>Aksi Disarankan:</span>
            <strong className="text-orange-600 dark:text-orange-400 flex items-center group-hover:translate-x-0.5 transition-transform">
              Buka Analisis Paritas &rarr;
            </strong>
          </div>
        </div>

        {/* KPI 4: Benteng Eksklusif BRI */}
        <div 
          onClick={() => setActiveTab('matrix')}
          className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-5 rounded-2xl border border-blue-200/80 dark:border-blue-800/60 shadow-card hover:shadow-card-hover transition-all duration-200 cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-blue-700 dark:text-blue-400 font-semibold">
            <span>Keunggulan Eksklusif BRI</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-black text-blue-600 dark:text-blue-400 tracking-tight">{briLeadingCaps.length}</span>
            <span className="text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-950/60 px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-800/60">
              Defensive Moats
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80">
            <span>Throughput & Volume:</span>
            <strong className="text-blue-600 dark:text-blue-400">25.000+ TPS</strong>
          </div>
        </div>
      </div>

      {/* 4 Workshop Architecture Pillars Breakdown */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center space-x-2">
              <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>4 Pilar Workshop Arsitektur Perbankan</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Pemisahan terstruktur 408 kapabilitas untuk workshop arsitektur teknis dan perencanaan modernisasi.
            </p>
          </div>

          {/* Quick Workshop Filter Pills */}
          <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-xs">
            <button
              onClick={() => setActiveWorkshopFilter('all')}
              className={`px-3 py-1 rounded-lg font-bold transition ${
                activeWorkshopFilter === 'all' 
                  ? 'bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-2xs' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Semua ({totalCapabilities})
            </button>
            {Object.keys(WORKSHOP_INFO).map(key => (
              <button
                key={key}
                onClick={() => setActiveWorkshopFilter(key)}
                className={`px-2.5 py-1 rounded-lg font-bold transition ${
                  activeWorkshopFilter === key 
                    ? 'bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-2xs' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {key} ({workshopCounts[key] || 0})
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(WORKSHOP_INFO).map(([key, info]) => {
            const count = workshopCounts[key] || 0;
            const pct = Math.round((count / (totalCapabilities || 1)) * 100);
            const isSelected = activeWorkshopFilter === key;

            return (
              <div 
                key={key} 
                onClick={() => setActiveWorkshopFilter(activeWorkshopFilter === key ? 'all' : key)}
                className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between group ${
                  isSelected 
                    ? 'bg-blue-50/50 dark:bg-blue-950/40 border-blue-500 dark:border-blue-500 ring-2 ring-blue-500/20 shadow-md' 
                    : 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-card hover:shadow-card-hover hover:-translate-y-0.5'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider ${info.bg} ${info.color} border ${info.border}`}>
                      {key}
                    </span>
                    <span className="text-xs font-black text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition flex items-center">
                      <span>{pct}%</span>
                      <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
                    </span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition tracking-tight">
                    {info.label}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {info.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{count}</span>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">Kapabilitas Riset</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${info.accent} rounded-full transition-all duration-500`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6 Banks Benchmark Comparison Leaderboard */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>Peringkat Cakupan Bukti & Maturitas 6 Bank</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Perbandingan empiris tingkat adopsi teknologi terverifikasi (Verified vs Inferensi vs Belum Terdeteksi).
            </p>
          </div>
          <button
            onClick={() => setActiveTab('banks')}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center space-x-1"
          >
            <span>Bandingkan Profil Lengkap</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bankStats.map((b, rankIdx) => (
            <div 
              key={b.slug}
              className={`p-5 rounded-2xl border transition-all duration-200 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm shadow-card hover:shadow-card-hover relative hover:-translate-y-0.5 ${
                b.isFocus 
                  ? 'border-blue-500 dark:border-blue-500 ring-2 ring-blue-500/20 bg-gradient-to-b from-blue-50/20 to-white dark:from-blue-950/30 dark:to-slate-900' 
                  : 'border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {b.isFocus ? (
                <div className="absolute top-3.5 right-3.5 px-2.5 py-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-[10px] font-black uppercase tracking-wide shadow-xs">
                  FOKUS UTAMA
                </div>
              ) : (
                <div className="absolute top-3.5 right-3.5 text-xs font-mono font-bold text-slate-400 dark:text-slate-500">
                  #{rankIdx + 1}
                </div>
              )}

              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">{b.logo}</span>
                <div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-sm tracking-tight">{b.name}</h3>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">{b.desc}</span>
                </div>
              </div>

              {/* Stacked Progress Bar */}
              <div className="space-y-1.5 my-3.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Tingkat Terverifikasi:</span>
                  <span className="font-extrabold text-slate-900 dark:text-white">{b.verifiedCount} / {totalCapabilities} ({b.verifiedPct}%)</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden flex p-0.5 shadow-inner">
                  <div 
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${(b.verifiedCount / totalCapabilities) * 100}%` }}
                    title={`Terverifikasi: ${b.verifiedCount}`}
                  />
                  <div 
                    className="bg-amber-400 h-full rounded-full transition-all duration-500 ml-0.5" 
                    style={{ width: `${(b.inferenceCount / totalCapabilities) * 100}%` }}
                    title={`Inferensi: ${b.inferenceCount}`}
                  />
                </div>
              </div>

              {/* 3 Metric Pills */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
                <div className="bg-emerald-50/70 dark:bg-emerald-950/40 p-2 rounded-xl border border-emerald-100 dark:border-emerald-800/60">
                  <div className="text-emerald-700 dark:text-emerald-300 font-black text-sm">{b.verifiedCount}</div>
                  <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center justify-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Verified
                  </div>
                </div>
                <div className="bg-amber-50/70 dark:bg-amber-950/40 p-2 rounded-xl border border-amber-100 dark:border-amber-800/60">
                  <div className="text-amber-700 dark:text-amber-300 font-black text-sm">{b.inferenceCount}</div>
                  <div className="text-[10px] text-amber-600 dark:text-amber-400 font-medium flex items-center justify-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    Inferensi
                  </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-2 rounded-xl border border-slate-200 dark:border-slate-700/60">
                  <div className="text-slate-700 dark:text-slate-300 font-black text-sm">{b.belumCount}</div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-400 font-medium flex items-center justify-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                    Belum
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedBankId(`bank-${b.slug}`);
                  setActiveTab('banks');
                }}
                className="w-full mt-3.5 py-2 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center space-x-1.5 transition-all active:scale-95 duration-150"
              >
                <span>Lihat Detail Arsitektur {b.label}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Strategic Triage Analytics: Gaps, Moats & Industry Consensus */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card 1: Gaps Priority */}
        <div className="bg-gradient-to-br from-amber-50/90 via-orange-50/70 to-rose-50/50 dark:from-amber-950/30 dark:via-orange-950/20 dark:to-rose-950/15 p-6 rounded-3xl border border-orange-200/80 dark:border-orange-800/60 shadow-card hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-orange-800 dark:text-orange-300 font-extrabold text-xs uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              <AlertTriangle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              <span>Prioritas Celah Arsitektur (Gap)</span>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-orange-950 dark:text-orange-100 tracking-tight">
              {competitorGaps.length} <span className="text-base font-bold text-orange-700 dark:text-orange-400 font-sans">Kapabilitas</span>
            </div>
            <p className="text-xs text-orange-900/80 dark:text-orange-200/80 mt-2 leading-relaxed">
              Teknologi di mana kompetitor (Mandiri, BCA, atau BNI) telah terverifikasi mengadopsi solusi modern, namun status BRI masih dalam inferensi atau belum terkonfirmasi.
            </p>

            <div className="mt-4 space-y-2">
              {competitorGaps.slice(0, 3).map((item, idx) => (
                <div key={idx} className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm p-3 rounded-2xl border border-orange-200/70 dark:border-orange-800/60 text-xs shadow-2xs">
                  <div className="font-bold text-slate-900 dark:text-slate-100 leading-tight line-clamp-1">{item.kapabilitas}</div>
                  <div className="text-[10px] text-orange-700 dark:text-orange-300 mt-1 font-medium flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 rounded-md bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-200 font-bold">{item.workshop}</span>
                    <span>•</span>
                    <span className="truncate">{item.domain}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActiveTab('gap-analysis')}
            className="mt-5 w-full py-2.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center space-x-1.5 shadow-sm shadow-orange-500/20 active:scale-95"
          >
            <span>Analisis Detail Celah (Gap View)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card 2: BRI Moats */}
        <div className="bg-gradient-to-br from-blue-50/90 via-indigo-50/70 to-sky-50/50 dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-sky-950/15 p-6 rounded-3xl border border-blue-200/80 dark:border-blue-800/60 shadow-card hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-blue-800 dark:text-blue-300 font-extrabold text-xs uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Benteng Keunggulan BRI (Moat)</span>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-blue-950 dark:text-blue-100 tracking-tight">
              {briLeadingCaps.length} <span className="text-base font-bold text-blue-700 dark:text-blue-400 font-sans">Kapabilitas</span>
            </div>
            <p className="text-xs text-blue-900/80 dark:text-blue-200/80 mt-2 leading-relaxed">
              Arsitektur unggulan di mana implementasi BRI telah terkonfirmasi resmi (misal: satelit BRIsat, super-app BRImo 4.7 rating, Confluent Kafka, micro-banking agent).
            </p>

            <div className="mt-4 space-y-2">
              {briLeadingCaps.slice(0, 3).map((item, idx) => (
                <div key={idx} className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm p-3 rounded-2xl border border-blue-200/70 dark:border-blue-800/60 text-xs shadow-2xs">
                  <div className="font-bold text-slate-900 dark:text-slate-100 leading-tight line-clamp-1">{item.kapabilitas}</div>
                  <div className="text-[10px] text-blue-700 dark:text-blue-300 mt-1 font-semibold flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-200 font-bold">Terverifikasi</span>
                    <span className="truncate">{item.banks?.bri?.merk || 'Solusi Resmi BRI'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActiveTab('matrix')}
            className="mt-5 w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center space-x-1.5 shadow-sm shadow-blue-600/20 active:scale-95"
          >
            <span>Eksplorasi Matriks Riset</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card 3: Industry Consensus */}
        <div className="bg-gradient-to-br from-emerald-50/90 via-teal-50/70 to-cyan-50/50 dark:from-emerald-950/30 dark:via-teal-950/20 dark:to-cyan-950/15 p-6 rounded-3xl border border-emerald-200/80 dark:border-emerald-800/60 shadow-card hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-emerald-800 dark:text-emerald-300 font-extrabold text-xs uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Standar Konsensus Perbankan</span>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-emerald-950 dark:text-emerald-100 tracking-tight">
              {consensusCaps.length} <span className="text-base font-bold text-emerald-700 dark:text-emerald-400 font-sans">Kapabilitas</span>
            </div>
            <p className="text-xs text-emerald-900/80 dark:text-emerald-200/80 mt-2 leading-relaxed">
              Arsitektur standar yang telah diadopsi bersama oleh BRI dan ≥ 2 bank lain (misal: Silverlake SIBS, BI-FAST, Kubernetes OpenShift, Dynatrace APM).
            </p>

            <div className="mt-4 space-y-2">
              {consensusCaps.slice(0, 3).map((item, idx) => (
                <div key={idx} className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm p-3 rounded-2xl border border-emerald-200/70 dark:border-emerald-800/60 text-xs shadow-2xs">
                  <div className="font-bold text-slate-900 dark:text-slate-100 leading-tight line-clamp-1">{item.kapabilitas}</div>
                  <div className="text-[10px] text-emerald-700 dark:text-emerald-300 mt-1 font-medium flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 font-bold">{item.workshop}</span>
                    <span>•</span>
                    <span className="truncate">{item.domain}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActiveTab('head-to-head')}
            className="mt-5 w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center space-x-1.5 shadow-sm shadow-emerald-600/20 active:scale-95"
          >
            <span>Komparasi Head-to-Head</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 13 Domains Heatmap Analytics Table */}
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-card overflow-hidden space-y-4 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 dark:border-slate-800 pb-4">
          <div>
            <h2 className="font-extrabold text-base text-slate-900 dark:text-white tracking-tight flex items-center space-x-2">
              <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Matriks Kematangan 13 Domain Arsitektur</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Cakupan adopsi teknologi terverifikasi di setiap domain perbankan untuk 6 bank Himbara & BCA.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari domain..."
                value={searchDomainQuery}
                onChange={e => setSearchDomainQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold font-mono border border-slate-200 dark:border-slate-700">
              {filteredDomainStats.length} Domain
            </span>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-slate-800">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/90 dark:bg-slate-800/90 border-b border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4 border-r border-slate-200/60 dark:border-slate-750">Domain Arsitektur</th>
                <th className="py-3 px-3 w-24 text-center border-r border-slate-200/60 dark:border-slate-750">Workshop</th>
                <th className="py-3 px-3 w-28 text-center border-r border-slate-200/60 dark:border-slate-750">Total Caps</th>
                {BANK_CONFIG.map(b => (
                  <th key={b.slug} className={`py-3 px-3 text-center min-w-[100px] border-r border-slate-200/60 dark:border-slate-750 ${b.isFocus ? 'bg-blue-50/80 dark:bg-blue-950/50 text-blue-900 dark:text-blue-200 font-black' : ''}`}>
                    <div className="flex items-center justify-center gap-1.5">
                      <span>{b.logo}</span>
                      <span>{b.label}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredDomainStats.map((dom, i) => {
                const ws = WORKSHOP_INFO[dom.workshop] || {
                  bg: 'bg-slate-100 dark:bg-slate-800',
                  color: 'text-slate-700 dark:text-slate-300',
                  border: 'border-slate-200 dark:border-slate-700'
                };

                return (
                  <tr key={i} className="hover:bg-blue-50/30 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white border-r border-slate-100 dark:border-slate-800">
                      {dom.domain}
                    </td>
                    <td className="py-3 px-3 text-center border-r border-slate-100 dark:border-slate-800">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold border ${ws.bg} ${ws.color} ${ws.border}`}>
                        {dom.workshop}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center font-extrabold text-slate-800 dark:text-slate-200 border-r border-slate-100 dark:border-slate-800">
                      {dom.total}
                    </td>
                    {BANK_CONFIG.map(b => {
                      const vCount = dom.bankVerified[b.slug] || 0;
                      const pct = Math.round((vCount / dom.total) * 100);

                      let badgeStyle = 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500';
                      if (pct >= 60) {
                        badgeStyle = 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 font-bold';
                      } else if (pct >= 30) {
                        badgeStyle = 'bg-sky-50 dark:bg-sky-950/50 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-800 font-semibold';
                      } else if (pct > 0) {
                        badgeStyle = 'bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 font-medium';
                      }

                      return (
                        <td key={b.slug} className={`py-2.5 px-3 text-center border-r border-slate-100 dark:border-slate-800 ${b.isFocus ? 'bg-blue-50/30 dark:bg-blue-950/20 font-bold' : ''}`}>
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] ${badgeStyle}`}>
                            {pct > 0 && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>}
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
