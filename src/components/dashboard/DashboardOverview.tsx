import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowRight, Search, ShieldCheck, AlertTriangle, CheckCircle2,
  Layers, ArrowUpRight, Database, ExternalLink, Zap, Sparkles,
  TrendingUp, Award, ArrowLeftRight, ChevronRight
} from 'lucide-react';
import { BankLogo } from '../common/BankLogo';
import { 
  PageHeader, Card, CardHeader, Stat, Button, Badge, 
  Input, SegmentedControl, Meter, StatusDot, cn 
} from '../ui';

const WORKSHOP_META: Record<string, { label: string; desc: string; icon: string; gradient: string }> = {
  WS1: { 
    label: 'Core & Digital Banking', 
    desc: 'Core banking, mobile/internet banking, API gateway, payment switch & QRIS.',
    icon: '⚡',
    gradient: 'from-blue-600/20 to-sky-600/10'
  },
  WS2: { 
    label: 'EDW, MDM & BI Analytics', 
    desc: 'Enterprise data warehouse, master data management, pipeline data & reporting BI.',
    icon: '📊',
    gradient: 'from-indigo-600/20 to-purple-600/10'
  },
  WS3: { 
    label: 'Cloud, Infra & Observability', 
    desc: 'Container platform, hybrid cloud, zero-trust security & APM observability.',
    icon: '☁️',
    gradient: 'from-cyan-600/20 to-teal-600/10'
  },
  WS4: { 
    label: 'Big Data, AI & ML', 
    desc: 'Event streaming real-time, storage NoSQL, MLOps, LLM & virtual assistant.',
    icon: '🤖',
    gradient: 'from-violet-600/20 to-fuchsia-600/10'
  }
};

const BANK_CONFIG = [
  { slug: 'bri', name: 'Bank Rakyat Indonesia', label: 'BRI', isFocus: true, desc: 'Pemimpin pasar segmen mikro & ultra-mikro' },
  { slug: 'mandiri', name: 'Bank Mandiri', label: 'Mandiri', isFocus: false, desc: 'Ekosistem wholesale & corporate banking' },
  { slug: 'bca', name: 'Bank Central Asia', label: 'BCA', isFocus: false, desc: 'Efisiensi transaksi & digital ritel' },
  { slug: 'bni', name: 'Bank Negara Indonesia', label: 'BNI', isFocus: false, desc: 'Global transactional & consumer banking' },
  { slug: 'btn', name: 'Bank Tabungan Negara', label: 'BTN', isFocus: false, desc: 'Spesialis pembiayaan KPR & perumahan' },
  { slug: 'bsi', name: 'Bank Syariah Indonesia', label: 'BSI', isFocus: false, desc: 'Bank syariah terbesar & digital Islamic ecosystem' }
];

export const DashboardOverview: React.FC = () => {
  const { 
    researchItems,
    navigate,
    setSelectedBankId,
    setSelectedResearchCell
  } = useApp();

  const [workshopFilter, setWorkshopFilter] = useState<string>('all');
  const [domainSearch, setDomainSearch] = useState<string>('');
  const [triageTab, setTriageTab] = useState<'gaps' | 'moats' | 'consensus'>('gaps');

  const totalCapabilities = researchItems.length;
  const totalEvaluations = totalCapabilities * BANK_CONFIG.length;

  const {
    overallVerified,
    bankStats,
    workshopCounts,
    domainStats,
    briLeadingCaps,
    competitorGaps,
    consensusCaps
  } = useMemo(() => {
    let verified = 0;
    const wsMap: Record<string, number> = { WS1: 0, WS2: 0, WS3: 0, WS4: 0 };
    const domainMap: Record<string, { total: number; ws: string; bankVerified: Record<string, number> }> = {};

    const bStats = BANK_CONFIG.map(b => ({
      slug: b.slug,
      name: b.name,
      label: b.label,
      isFocus: b.isFocus,
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
          bStat.inferenceCount++;
        } else {
          bStat.belumCount++;
        }
      });

      const briStatus = item.banks.bri?.status || 'Belum';

      // 1. BRI Leading (BRI verified, peers not)
      if (briStatus === 'Terverifikasi' && !hasCompetitorVerified) {
        briLeading.push(item);
      }

      // 2. Competitor Gaps (Competitor verified, BRI Belum or Inferensi)
      if (hasCompetitorVerified && briStatus !== 'Terverifikasi') {
        compGaps.push(item);
      }

      // 3. Consensus (BRI verified and >= 2 peers verified)
      if (briStatus === 'Terverifikasi' && verifiedBankCount >= 3) {
        consensus.push(item);
      }
    });

    bStats.forEach(b => {
      b.verifiedPct = Math.round((b.verifiedCount / (totalCapabilities || 1)) * 100);
    });

    // Sort peers by verified count descending
    bStats.sort((a, b) => b.verifiedCount - a.verifiedCount);

    return {
      overallVerified: verified,
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

  const filteredDomainStats = useMemo(() => {
    return domainStats.filter(dom => {
      if (workshopFilter !== 'all' && dom.workshop !== workshopFilter) return false;
      if (domainSearch.trim()) {
        const q = domainSearch.toLowerCase();
        if (!dom.domain.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [domainStats, workshopFilter, domainSearch]);

  const triageItems = triageTab === 'gaps' 
    ? competitorGaps 
    : triageTab === 'moats' 
    ? briLeadingCaps 
    : consensusCaps;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Executive Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-950/40 via-surface/90 to-surface/95 border border-line p-6 lg:p-8 shadow-card top-hairline">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent/15 text-accent border border-accent/25 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                Live Architecture Intelligence
              </span>
              <span className="text-2xs font-mono text-subtle px-2 py-0.5 rounded-md bg-sunken border border-line">
                v1.0 Ready
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-ink font-sans">
              Executive Competitor Intelligence
            </h1>
            <p className="text-sm sm:text-[15px] text-muted leading-relaxed">
              Analitik benchmark komparatif arsitektur teknologi Bank BRI terhadap 5 bank Himbara &amp; BCA berbasis pembuktian nyata (408 kapabilitas, 13 domain arsitektur).
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => navigate('/analyst/head-to-head')}
              className="font-semibold shadow-xs"
            >
              <ArrowLeftRight className="w-4 h-4 text-accent" />
              <span>Duel Head-to-Head</span>
            </Button>
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => navigate('/analyst/matrix')}
              className="font-semibold shadow-md"
            >
              <span>Buka Matriks Riset</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Summary Strip (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Capabilities */}
        <div 
          onClick={() => navigate('/analyst/matrix')}
          className="group relative p-5 rounded-2xl bg-surface/90 backdrop-blur-md border border-line hover:border-accent/40 shadow-card hover:shadow-card-hover transition-all duration-200 cursor-pointer flex flex-col justify-between top-hairline"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold tracking-wider uppercase text-subtle">Total Kapabilitas</span>
              <span className="p-2 rounded-xl bg-blue-500/10 text-accent group-hover:scale-110 transition-transform">
                <Database className="w-4 h-4" />
              </span>
            </div>
            <div className="text-3xl lg:text-4xl font-extrabold num tracking-tight text-ink">
              {totalCapabilities}
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-between text-xs">
            <span className="text-muted">13 Domain · 4 Pilar WS</span>
            <span className="text-accent font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              Lihat tabel <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Card 2: BRI Verified Maturity */}
        <div 
          onClick={() => navigate('/analyst/banks')}
          className="group relative p-5 rounded-2xl bg-gradient-to-b from-blue-500/10 via-surface/90 to-surface/95 backdrop-blur-md border border-blue-500/30 hover:border-blue-500/50 shadow-card hover:shadow-glow-blue transition-all duration-200 cursor-pointer flex flex-col justify-between top-hairline"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold tracking-wider uppercase text-accent">Maturitas BRI</span>
              <span className="p-2 rounded-xl bg-blue-500/15 text-accent group-hover:scale-110 transition-transform">
                <TrendingUp className="w-4 h-4" />
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl lg:text-4xl font-extrabold num tracking-tight text-accent">
                {briData?.verifiedPct || 0}%
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                +{Math.max(0, (briData?.verifiedPct || 0) - industryVerifiedPct)}% vs Industri
              </span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-between text-xs text-muted">
            <span>{briData?.verifiedCount || 0} Terverifikasi</span>
            <span className="text-subtle font-mono">Avg: {industryVerifiedPct}%</span>
          </div>
        </div>

        {/* Card 3: Architecture Gaps */}
        <div 
          onClick={() => navigate('/analyst/gap-analysis')}
          className="group relative p-5 rounded-2xl bg-surface/90 backdrop-blur-md border border-line hover:border-amber-500/40 shadow-card hover:shadow-glow-amber transition-all duration-200 cursor-pointer flex flex-col justify-between top-hairline"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold tracking-wider uppercase text-amber-600 dark:text-amber-400">
                Celah Arsitektur (Gaps)
              </span>
              <span className="p-2 rounded-xl bg-amber-500/10 text-amber-500 group-hover:scale-110 transition-transform">
                <AlertTriangle className="w-4 h-4" />
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl lg:text-4xl font-extrabold num tracking-tight text-amber-600 dark:text-amber-400">
                {competitorGaps.length}
              </span>
              <span className="text-xs text-muted font-medium">Kapabilitas</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-between text-xs">
            <span className="text-muted">Kompetitor unggul</span>
            <span className="text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              Telaah celah <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Card 4: BRI Exclusive Moats */}
        <div 
          onClick={() => setTriageTab('moats')}
          className="group relative p-5 rounded-2xl bg-surface/90 backdrop-blur-md border border-line hover:border-emerald-500/40 shadow-card hover:shadow-glow-emerald transition-all duration-200 cursor-pointer flex flex-col justify-between top-hairline"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold tracking-wider uppercase text-emerald-600 dark:text-emerald-400">
                Keunggulan Eksklusif BRI
              </span>
              <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition-transform">
                <Award className="w-4 h-4" />
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl lg:text-4xl font-extrabold num tracking-tight text-emerald-600 dark:text-emerald-400">
                {briLeadingCaps.length}
              </span>
              <span className="text-xs text-muted font-medium">Moats Eksklusif</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-between text-xs">
            <span className="text-muted">Hanya di BRI</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              Lihat moats <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>

      {/* 6 Banks Competitive Landscape Bar */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-ink tracking-tight">Lanskap 6 Bank Nasional</h2>
            <p className="text-xs text-muted">Perbandingan adopsi kapabilitas teknologi perbankan antar institusi.</p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate('/analyst/banks')} className="text-accent font-semibold">
            <span>Profil Lengkap</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {bankStats.map(b => (
            <div
              key={b.slug}
              onClick={() => {
                setSelectedBankId(`bank-${b.slug}`);
                navigate('/analyst/banks');
              }}
              className={cn(
                'group relative p-4 rounded-xl border backdrop-blur-md transition-all duration-200 cursor-pointer flex flex-col justify-between top-hairline',
                b.isFocus 
                  ? 'bg-gradient-to-b from-blue-500/15 via-surface/90 to-surface/95 border-blue-500/40 shadow-glow-blue hover:border-blue-500' 
                  : 'bg-surface/90 border-line hover:border-line-strong hover:shadow-card-hover hover:-translate-y-0.5'
              )}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <BankLogo bankCode={b.slug} size={32} />
                  {b.isFocus ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-accent text-white shadow-xs">
                      Fokus
                    </span>
                  ) : (
                    <span className="text-2xs font-mono text-subtle font-semibold">
                      #{bankStats.indexOf(b) + 1}
                    </span>
                  )}
                </div>

                <div className="text-sm font-bold text-ink truncate group-hover:text-accent transition-colors">
                  {b.label}
                </div>
                <div className="text-2xs text-subtle truncate mt-0.5">{b.name}</div>
              </div>

              <div className="mt-4 pt-3 border-t border-line/60 space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-muted font-medium">Terverifikasi</span>
                  <span className="text-sm font-extrabold num text-ink">{b.verifiedPct}%</span>
                </div>
                <div className="w-full bg-sunken rounded-full h-1.5 overflow-hidden">
                  <div 
                    className={cn(
                      'h-full rounded-full transition-all duration-500',
                      b.isFocus ? 'bg-gradient-to-r from-blue-600 to-sky-400' : 'bg-emerald-500'
                    )}
                    style={{ width: `${b.verifiedPct}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-subtle font-mono">
                  <span>{b.verifiedCount} verified</span>
                  <span>{b.inferenceCount} inferensi</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid: 13 Domains x 6 Banks Coverage Heatmap */}
      <Card>
        <CardHeader
          title="Matriks Kematangan 13 Domain Arsitektur"
          description="Cakupan adopsi teknologi terverifikasi per domain arsitektur pada 6 bank."
          badge={
            <span className="px-2.5 py-0.5 rounded-full text-2xs font-semibold bg-accent/10 text-accent border border-accent/20">
              {filteredDomainStats.length} Domain
            </span>
          }
          actions={
            <div className="flex items-center gap-2.5 flex-wrap">
              <Input
                placeholder="Cari domain arsitektur…"
                value={domainSearch}
                onChange={e => setDomainSearch(e.target.value)}
                onClear={() => setDomainSearch('')}
                icon={<Search />}
                className="w-48 sm:w-60"
              />
              <SegmentedControl
                value={workshopFilter}
                onChange={setWorkshopFilter}
                options={[
                  { value: 'all', label: 'Semua' },
                  { value: 'WS1', label: 'WS1' },
                  { value: 'WS2', label: 'WS2' },
                  { value: 'WS3', label: 'WS3' },
                  { value: 'WS4', label: 'WS4' },
                ]}
              />
            </div>
          }
        />

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px] border-collapse">
            <thead>
              <tr className="border-b border-line/80 bg-sunken/60 text-xs text-muted">
                <th className="py-3 px-4 font-semibold">Domain Arsitektur</th>
                <th className="py-3 px-2 text-center font-semibold w-16">Pilar</th>
                <th className="py-3 px-3 text-center font-semibold w-20">Total</th>
                {BANK_CONFIG.map(b => (
                  <th 
                    key={b.slug} 
                    className={cn(
                      'py-3 px-3 text-center font-semibold min-w-[110px]',
                      b.isFocus && 'bg-accent/10 text-accent font-bold border-x border-accent/20'
                    )}
                  >
                    <div className="inline-flex items-center justify-center gap-1.5">
                      <BankLogo bankCode={b.slug} size={18} />
                      <span>{b.label}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {filteredDomainStats.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-subtle text-xs">
                    Tidak ada domain arsitektur yang cocok dengan filter.
                  </td>
                </tr>
              ) : (
                filteredDomainStats.map((dom, i) => (
                  <tr key={i} className="hover:bg-sunken/40 transition-colors">
                    <td className="py-3 px-4 font-semibold text-ink">
                      {dom.domain}
                    </td>
                    <td className="py-3 px-2 text-center">
                      <span className="px-2 py-0.5 rounded-md text-2xs font-mono font-medium bg-sunken border border-line text-muted">
                        {dom.workshop}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center font-bold num text-muted font-mono">
                      {dom.total}
                    </td>
                    {BANK_CONFIG.map(b => {
                      const vCount = dom.bankVerified[b.slug] || 0;
                      const pct = Math.round((vCount / dom.total) * 100);

                      let badgeClass = 'bg-slate-100 dark:bg-slate-800/80 text-muted border-slate-200 dark:border-slate-700/60';
                      let barColor = 'bg-slate-400';
                      if (pct >= 50) {
                        badgeClass = 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25';
                        barColor = 'bg-emerald-500';
                      } else if (pct >= 25) {
                        badgeClass = 'bg-blue-500/10 text-blue-600 dark:text-sky-400 border-blue-500/25';
                        barColor = 'bg-blue-500';
                      } else if (pct > 0) {
                        badgeClass = 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25';
                        barColor = 'bg-amber-500';
                      }

                      return (
                        <td 
                          key={b.slug} 
                          className={cn(
                            'py-3 px-3 text-center',
                            b.isFocus && 'bg-accent/5 border-x border-accent/15'
                          )}
                        >
                          <div className="flex flex-col items-center gap-1">
                            <span className={cn('inline-flex items-center justify-center w-16 px-2 py-0.5 rounded-full border text-2xs font-bold font-mono', badgeClass)}>
                              {vCount}/{dom.total}
                            </span>
                            <div className="w-12 bg-sunken rounded-full h-1 overflow-hidden">
                              <div className={cn('h-full rounded-full', barColor)} style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Two Columns: Competitive Ranking Leaderboard & Strategic Triage Cockpit */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: 6 Banks Detailed Verification Leaderboard */}
        <Card className="lg:col-span-7">
          <CardHeader
            title="Peringkat Kapabilitas Terverifikasi 6 Bank"
            description="Perbandingan proporsi kapabilitas terverifikasi, inferensi industri, dan belum terdata."
            actions={
              <Button variant="ghost" size="sm" onClick={() => navigate('/analyst/banks')} className="font-semibold text-accent">
                <span>Semua Bank</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            }
          />

          <div className="p-5 space-y-4">
            {bankStats.map((b, rank) => (
              <div 
                key={b.slug} 
                className={cn(
                  'p-4 rounded-xl border transition-all duration-200',
                  b.isFocus 
                    ? 'bg-gradient-to-r from-blue-500/10 via-surface/90 to-surface/95 border-blue-500/40 shadow-xs' 
                    : 'bg-surface/80 border-line hover:border-line-strong hover:bg-sunken/30'
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={cn(
                      'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono shrink-0',
                      rank === 0 ? 'bg-amber-500/20 text-amber-500' : 'bg-sunken text-subtle'
                    )}>
                      #{rank + 1}
                    </span>
                    <BankLogo bankCode={b.slug} size={28} />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-ink truncate">{b.name}</span>
                        {b.isFocus && (
                          <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-accent text-white">
                            Fokus Benchmark
                          </span>
                        )}
                      </div>
                      <p className="text-2xs text-subtle truncate mt-0.5">{b.desc}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-base font-extrabold num text-ink">{b.verifiedPct}%</span>
                    <span className="text-2xs text-subtle block num font-mono">{b.verifiedCount} / {totalCapabilities}</span>
                  </div>
                </div>

                <div className="mt-3">
                  <Meter
                    total={totalCapabilities}
                    segments={[
                      { value: b.verifiedCount, className: 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]', title: `Terverifikasi: ${b.verifiedCount}` },
                      { value: b.inferenceCount, className: 'bg-amber-500', title: `Inferensi: ${b.inferenceCount}` },
                    ]}
                  />
                </div>

                <div className="mt-3 flex items-center justify-between text-2xs text-subtle pt-2 border-t border-line/60">
                  <div className="flex items-center gap-3 num font-medium">
                    <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {b.verifiedCount} Verified
                    </span>
                    <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      {b.inferenceCount} Inferensi
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      {b.belumCount} Belum
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedBankId(`bank-${b.slug}`);
                      navigate('/analyst/banks');
                    }}
                    className="text-accent hover:underline font-semibold flex items-center gap-1 transition-colors"
                  >
                    <span>Detail</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Right: Strategic Triage Cockpit (Gaps, Moats, Consensus) */}
        <Card className="lg:col-span-5">
          <CardHeader
            title="Prioritas Tindak Lanjut Arsitektur"
            description="Klasifikasi temuan untuk pembahasan workshop & perancangan arsitektur."
            actions={
              <SegmentedControl
                value={triageTab}
                onChange={setTriageTab}
                options={[
                  { value: 'gaps', label: `Gaps`, count: competitorGaps.length },
                  { value: 'moats', label: `Moats`, count: briLeadingCaps.length },
                  { value: 'consensus', label: `Standar`, count: consensusCaps.length },
                ]}
              />
            }
          />

          <div className="p-5 space-y-3">
            {triageItems.slice(0, 6).map((item, idx) => (
              <div 
                key={idx}
                className="group p-3.5 rounded-xl border border-line bg-surface/90 hover:border-accent/40 hover:bg-sunken/40 transition-all duration-150 flex flex-col gap-2 cursor-pointer shadow-xs"
                onClick={() => {
                  setSelectedResearchCell({ capId: item.id, bankCode: 'bri' });
                }}
              >
                <div className="flex items-start justify-between gap-2.5">
                  <span className="text-[13px] font-bold text-ink leading-snug line-clamp-1 group-hover:text-accent transition-colors">
                    {item.kapabilitas}
                  </span>
                  <Badge tone={triageTab === 'gaps' ? 'warn' : triageTab === 'moats' ? 'ok' : 'accent'}>
                    {item.workshop}
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-2xs text-subtle">
                  <span className="truncate font-medium">{item.domain} · {item.kategori}</span>
                  <span className="flex items-center gap-1 text-accent font-semibold shrink-0 group-hover:translate-x-0.5 transition-transform">
                    <span>Inspeksi</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}

            <div className="pt-2">
              <Button
                variant="secondary"
                size="md"
                className="w-full justify-center font-semibold"
                onClick={() => {
                  if (triageTab === 'gaps') navigate('/analyst/gap-analysis');
                  else navigate('/analyst/matrix');
                }}
              >
                <span>{triageTab === 'gaps' ? 'Buka Gap Analysis View' : 'Eksplorasi di Matriks Riset'}</span>
                <ArrowRight className="w-4 h-4 text-accent" />
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* 4 Workshop Architecture Pillars Showcase */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-ink tracking-tight">4 Pilar Workshop Arsitektur</h2>
          <p className="text-xs text-muted">Distribusi 408 kapabilitas untuk sesi modernisasi teknologi perbankan.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(WORKSHOP_META).map(([key, info]) => {
            const count = workshopCounts[key] || 0;
            const pct = Math.round((count / (totalCapabilities || 1)) * 100);

            return (
              <div 
                key={key} 
                onClick={() => navigate('/analyst/matrix')}
                className="group relative p-5 rounded-2xl border border-line bg-surface/90 hover:border-accent/40 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between top-hairline"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{info.icon}</span>
                    <span className="px-2 py-0.5 rounded-full text-2xs font-mono font-bold bg-sunken border border-line text-muted">
                      {key} · {pct}%
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-ink tracking-tight group-hover:text-accent transition-colors">
                    {info.label}
                  </h3>
                  <p className="text-xs text-muted mt-1.5 line-clamp-2 leading-relaxed">
                    {info.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-line/60 flex items-center justify-between text-xs">
                  <span className="text-xl font-extrabold num text-ink font-mono">{count} <span className="text-xs font-normal text-subtle">kapabilitas</span></span>
                  <span className="text-accent font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Buka <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
