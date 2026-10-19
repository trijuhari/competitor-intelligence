import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowRight, Search, ShieldCheck, AlertTriangle, CheckCircle2,
  Layers, ArrowUpRight, Database, ExternalLink
} from 'lucide-react';
import { BankLogo } from '../common/BankLogo';
import { 
  PageHeader, Card, CardHeader, Stat, Button, Badge, 
  Input, SegmentedControl, Meter, cn 
} from '../ui';

const WORKSHOP_META: Record<string, { label: string; desc: string }> = {
  WS1: { 
    label: 'Core & Digital Banking', 
    desc: 'Core banking, mobile/internet banking, API gateway, payment switch & QRIS.' 
  },
  WS2: { 
    label: 'EDW, MDM & BI Analytics', 
    desc: 'Enterprise data warehouse, master data management, pipeline data & reporting BI.' 
  },
  WS3: { 
    label: 'Cloud, Infra & Observability', 
    desc: 'Container platform, hybrid cloud, zero-trust security & APM observability.' 
  },
  WS4: { 
    label: 'Big Data, AI & ML', 
    desc: 'Event streaming real-time, storage NoSQL, MLOps, LLM & virtual assistant.' 
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
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="Executive Overview"
        description="Analitik komparasi arsitektur teknologi Bank BRI terhadap 5 bank kompetitor Himbara & BCA berdasarkan 408 kapabilitas riset."
        actions={
          <>
            <Button variant="secondary" onClick={() => navigate('/analyst/head-to-head')}>
              Head-to-head
            </Button>
            <Button variant="primary" onClick={() => navigate('/analyst/matrix')}>
              Buka matriks riset
            </Button>
          </>
        }
      />

      {/* KPI Summary Strip */}
      <Card className="divide-y md:divide-y-0 md:divide-x divide-line grid grid-cols-2 md:grid-cols-4">
        <Stat
          label="Total Kapabilitas"
          value={totalCapabilities}
          hint="13 domain · 4 pilar workshop"
          onClick={() => navigate('/analyst/matrix')}
        />
        <Stat
          label="Maturitas Terverifikasi BRI"
          value={`${briData?.verifiedPct || 0}%`}
          hint={`${briData?.verifiedCount || 0} terverifikasi · rata-rata industri ${industryVerifiedPct}%`}
          valueClassName="text-accent"
        />
        <Stat
          label="Celah Arsitektur (Gaps)"
          value={competitorGaps.length}
          hint="Kompetitor terverifikasi, BRI belum"
          valueClassName="text-warn"
          onClick={() => navigate('/analyst/gap-analysis')}
        />
        <Stat
          label="Keunggulan Eksklusif BRI"
          value={briLeadingCaps.length}
          hint="Terverifikasi di BRI saja"
          valueClassName="text-ok"
          onClick={() => setTriageTab('moats')}
        />
      </Card>

      {/* Hero Asset: 13 Domains x 6 Banks Coverage Heatmap */}
      <Card>
        <CardHeader
          title="Matriks Kematangan 13 Domain Arsitektur"
          description="Cakupan adopsi teknologi terverifikasi per domain arsitektur pada 6 bank."
          actions={
            <div className="flex items-center gap-2">
              <Input
                placeholder="Filter domain…"
                value={domainSearch}
                onChange={e => setDomainSearch(e.target.value)}
                icon={<Search />}
                className="w-44 md:w-56"
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
              <tr className="border-b border-line bg-sunken text-xs text-muted">
                <th className="py-2.5 px-4 font-medium">Domain Arsitektur</th>
                <th className="py-2.5 px-2 text-center font-medium w-16">Pilar</th>
                <th className="py-2.5 px-3 text-center font-medium w-16">Total</th>
                {BANK_CONFIG.map(b => (
                  <th 
                    key={b.slug} 
                    className={cn(
                      'py-2.5 px-3 text-center font-medium min-w-[100px]',
                      b.isFocus && 'bg-accent-soft/40 text-accent font-semibold'
                    )}
                  >
                    <div className="inline-flex items-center justify-center gap-1.5">
                      <BankLogo bankCode={b.slug} size={16} />
                      <span>{b.label}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filteredDomainStats.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-subtle text-xs">
                    Tidak ada domain yang cocok dengan filter.
                  </td>
                </tr>
              ) : (
                filteredDomainStats.map((dom, i) => (
                  <tr key={i} className="hover:bg-sunken/50 transition-colors">
                    <td className="py-2.5 px-4 font-medium text-ink">
                      {dom.domain}
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <Badge tone="neutral">{dom.workshop}</Badge>
                    </td>
                    <td className="py-2.5 px-3 text-center font-medium num text-muted">
                      {dom.total}
                    </td>
                    {BANK_CONFIG.map(b => {
                      const vCount = dom.bankVerified[b.slug] || 0;
                      const pct = Math.round((vCount / dom.total) * 100);

                      let tone: 'ok' | 'accent' | 'warn' | 'neutral' = 'neutral';
                      if (pct >= 50) tone = 'ok';
                      else if (pct >= 25) tone = 'accent';
                      else if (pct > 0) tone = 'warn';

                      return (
                        <td 
                          key={b.slug} 
                          className={cn(
                            'py-2.5 px-3 text-center',
                            b.isFocus && 'bg-accent-soft/20'
                          )}
                        >
                          <Badge tone={tone} className="w-16 justify-center">
                            {vCount}/{dom.total}
                          </Badge>
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

      {/* Two Column Section: Leaderboard + Strategic Triage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: 6 Banks Maturity Leaderboard */}
        <Card className="lg:col-span-7">
          <CardHeader
            title="Peringkat Cakupan Verifikasi 6 Bank"
            description="Perbandingan proporsi kapabilitas terverifikasi, inferensi, dan belum terdeteksi."
            actions={
              <Button variant="ghost" size="sm" onClick={() => navigate('/analyst/banks')}>
                Profil lengkap
                <ArrowRight />
              </Button>
            }
          />

          <div className="p-4 space-y-4">
            {bankStats.map((b, rank) => (
              <div 
                key={b.slug} 
                className={cn(
                  'p-3 rounded-md border border-line transition-colors',
                  b.isFocus ? 'bg-accent-soft/30 border-accent/30' : 'bg-surface hover:bg-sunken/40'
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <BankLogo bankCode={b.slug} size={26} />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[13px] font-semibold text-ink truncate">{b.name}</span>
                        {b.isFocus && <Badge tone="accent">Fokus</Badge>}
                      </div>
                      <p className="text-2xs text-subtle truncate">{b.desc}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-sm font-semibold num text-ink">{b.verifiedPct}%</span>
                    <span className="text-2xs text-subtle block num">{b.verifiedCount} / {totalCapabilities}</span>
                  </div>
                </div>

                <div className="mt-3">
                  <Meter
                    total={totalCapabilities}
                    segments={[
                      { value: b.verifiedCount, className: 'bg-ok', title: `Terverifikasi: ${b.verifiedCount}` },
                      { value: b.inferenceCount, className: 'bg-warn', title: `Inferensi: ${b.inferenceCount}` },
                    ]}
                  />
                </div>

                <div className="mt-2.5 flex items-center justify-between text-2xs text-subtle pt-2 border-t border-line/60">
                  <div className="flex items-center gap-3 num">
                    <span className="flex items-center gap-1 text-ok font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-ok" />
                      {b.verifiedCount} verified
                    </span>
                    <span className="flex items-center gap-1 text-warn font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-warn" />
                      {b.inferenceCount} inferensi
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-line-strong" />
                      {b.belumCount} belum
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedBankId(`bank-${b.slug}`);
                      navigate('/analyst/banks');
                    }}
                    className="text-muted hover:text-ink font-medium transition-colors"
                  >
                    Detail &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Right: Strategic Triage (Gaps, Moats, Consensus) */}
        <Card className="lg:col-span-5">
          <CardHeader
            title="Prioritas Telaah Strategis"
            description="Klasifikasi temuan untuk tindak lanjut arsitek & analis."
            actions={
              <SegmentedControl
                value={triageTab}
                onChange={setTriageTab}
                options={[
                  { value: 'gaps', label: `Gaps (${competitorGaps.length})` },
                  { value: 'moats', label: `Moats (${briLeadingCaps.length})` },
                  { value: 'consensus', label: `Standar (${consensusCaps.length})` },
                ]}
              />
            }
          />

          <div className="p-4 space-y-2.5">
            {triageItems.slice(0, 6).map((item, idx) => (
              <div 
                key={idx}
                className="p-3 rounded-md border border-line bg-surface hover:bg-sunken/60 transition-colors flex flex-col gap-1.5 cursor-pointer"
                onClick={() => {
                  setSelectedResearchCell({ capId: item.id, bankCode: 'bri' });
                }}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[13px] font-medium text-ink leading-snug line-clamp-1">
                    {item.kapabilitas}
                  </span>
                  <Badge tone={triageTab === 'gaps' ? 'warn' : triageTab === 'moats' ? 'ok' : 'accent'}>
                    {item.workshop}
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-2xs text-subtle">
                  <span className="truncate">{item.domain} · {item.kategori}</span>
                  <span className="flex items-center gap-1 text-muted hover:text-ink shrink-0 font-medium">
                    Lihat detail
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}

            <div className="pt-2">
              <Button
                variant="secondary"
                size="sm"
                className="w-full justify-center"
                onClick={() => {
                  if (triageTab === 'gaps') navigate('/analyst/gap-analysis');
                  else navigate('/analyst/matrix');
                }}
              >
                {triageTab === 'gaps' ? 'Buka Gap Analysis View' : 'Eksplorasi di Matriks Riset'}
                <ArrowRight />
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Workshop Architecture Pillars */}
      <div>
        <div className="mb-3">
          <h2 className="text-[13px] font-semibold text-ink">4 Pilar Workshop Arsitektur</h2>
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
                className="p-4 rounded-lg border border-line bg-surface hover:border-line-strong hover:bg-sunken/30 transition-colors cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge tone="neutral">{key}</Badge>
                    <span className="text-xs num text-subtle">{pct}%</span>
                  </div>
                  <h3 className="text-[13px] font-semibold text-ink">{info.label}</h3>
                  <p className="text-xs text-muted mt-1 line-clamp-2 leading-relaxed">{info.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-line flex items-center justify-between text-xs">
                  <span className="text-lg font-semibold num text-ink">{count}</span>
                  <span className="text-subtle">Kapabilitas &rarr;</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
