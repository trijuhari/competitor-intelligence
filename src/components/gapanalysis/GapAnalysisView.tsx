import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  AlertTriangle, ShieldCheck, CheckCircle2, 
  Search, ExternalLink, RotateCcw, ArrowRight,
  TrendingDown, Award, Users, Filter, Sparkles
} from 'lucide-react';
import { BankLogo } from '../common/BankLogo';
import { 
  PageHeader, Card, CardHeader, Stat, Button, Badge, 
  Input, Select, StatusDot, StatusBadge, cn 
} from '../ui';

const COMPETITORS = [
  { slug: 'mandiri', label: 'Mandiri', fullName: 'Bank Mandiri' },
  { slug: 'bca', label: 'BCA', fullName: 'Bank Central Asia' },
  { slug: 'bni', label: 'BNI', fullName: 'Bank Negara Indonesia' },
  { slug: 'btn', label: 'BTN', fullName: 'Bank Tabungan Negara' },
  { slug: 'bsi', label: 'BSI', fullName: 'Bank Syariah Indonesia' }
];

export const GapAnalysisView: React.FC = () => {
  const { 
    researchItems,
    setSelectedResearchCell,
    navigate
  } = useApp();

  const [activeTab, setActiveTabState] = useState<'gaps' | 'advantages' | 'consensus'>('gaps');
  const [workshopFilter, setWorkshopFilter] = useState('all');
  const [domainFilter, setDomainFilter] = useState('all');
  const [competitorFilter, setCompetitorFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const allDomains = useMemo(() => {
    return Array.from(new Set(researchItems.map(i => i.domain))).filter(Boolean);
  }, [researchItems]);

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
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <PageHeader
        title="Gap Analysis &amp; Peluang Strategis"
        description="Pemetaan komparatif celah teknologi arsitektur di mana kompetitor telah mengadopsi solusi modern, keunggulan eksklusif BRI, dan standar konsensus industri."
        badge={
          <span className="px-2.5 py-0.5 rounded-full text-2xs font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/25">
            Analisis Kesenjangan
          </span>
        }
        actions={
          <Button variant="secondary" onClick={() => navigate('/analyst/matrix')} className="shadow-xs font-semibold">
            <span>Buka Matriks Riset</span>
            <ArrowRight className="w-4 h-4 text-accent" />
          </Button>
        }
      />

      {/* Strategic Triage Summary Tabs (3 Interactive Hero Stat Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Tab 1: Gaps */}
        <div
          onClick={() => setActiveTabState('gaps')}
          className={cn(
            'group relative p-5 rounded-2xl border transition-all duration-200 cursor-pointer top-hairline flex flex-col justify-between',
            activeTab === 'gaps'
              ? 'bg-amber-500/10 border-amber-500/40 shadow-glow-amber'
              : 'bg-surface/90 border-line hover:border-line-strong hover:shadow-card-hover'
          )}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold tracking-wider uppercase text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              Celah untuk BRI (Gaps)
            </span>
            <span className={cn(
              'px-2 py-0.5 rounded-full text-2xs font-bold font-mono',
              activeTab === 'gaps' ? 'bg-amber-500 text-white' : 'bg-sunken text-subtle'
            )}>
              {gapsList.length} Celah
            </span>
          </div>
          <div className="text-3xl lg:text-4xl font-extrabold num text-amber-600 dark:text-amber-400">
            {gapsList.length}
          </div>
          <div className="mt-4 pt-3 border-t border-line/60 text-xs text-muted">
            Kompetitor terverifikasi, BRI belum terkonfirmasi
          </div>
        </div>

        {/* Tab 2: Moats */}
        <div
          onClick={() => setActiveTabState('advantages')}
          className={cn(
            'group relative p-5 rounded-2xl border transition-all duration-200 cursor-pointer top-hairline flex flex-col justify-between',
            activeTab === 'advantages'
              ? 'bg-emerald-500/10 border-emerald-500/40 shadow-glow-emerald'
              : 'bg-surface/90 border-line hover:border-line-strong hover:shadow-card-hover'
          )}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold tracking-wider uppercase text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              Keunggulan Eksklusif BRI
            </span>
            <span className={cn(
              'px-2 py-0.5 rounded-full text-2xs font-bold font-mono',
              activeTab === 'advantages' ? 'bg-emerald-500 text-white' : 'bg-sunken text-subtle'
            )}>
              {advantagesList.length} Moats
            </span>
          </div>
          <div className="text-3xl lg:text-4xl font-extrabold num text-emerald-600 dark:text-emerald-400">
            {advantagesList.length}
          </div>
          <div className="mt-4 pt-3 border-t border-line/60 text-xs text-muted">
            Hanya terverifikasi di Bank BRI (Moats)
          </div>
        </div>

        {/* Tab 3: Consensus */}
        <div
          onClick={() => setActiveTabState('consensus')}
          className={cn(
            'group relative p-5 rounded-2xl border transition-all duration-200 cursor-pointer top-hairline flex flex-col justify-between',
            activeTab === 'consensus'
              ? 'bg-blue-500/10 border-blue-500/40 shadow-glow-blue'
              : 'bg-surface/90 border-line hover:border-line-strong hover:shadow-card-hover'
          )}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold tracking-wider uppercase text-accent flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              Standar Paritas Bersama
            </span>
            <span className={cn(
              'px-2 py-0.5 rounded-full text-2xs font-bold font-mono',
              activeTab === 'consensus' ? 'bg-accent text-white' : 'bg-sunken text-subtle'
            )}>
              {consensusList.length} Standar
            </span>
          </div>
          <div className="text-3xl lg:text-4xl font-extrabold num text-accent">
            {consensusList.length}
          </div>
          <div className="mt-4 pt-3 border-t border-line/60 text-xs text-muted">
            Terverifikasi di BRI dan &ge;2 bank kompetitor
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <Card className="p-4 space-y-3.5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-4">
            <Input
              placeholder="Cari kapabilitas, domain, solusi kompetitor…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onClear={() => setSearchQuery('')}
              icon={<Search />}
              className="w-full"
            />
          </div>

          <div className="md:col-span-3">
            <Select
              value={workshopFilter}
              onChange={e => setWorkshopFilter(e.target.value)}
              className="w-full"
            >
              <option value="all">Semua Pilar (WS1 - WS4)</option>
              <option value="WS1">WS1: Core &amp; Digital Banking</option>
              <option value="WS2">WS2: EDW, MDM &amp; BI</option>
              <option value="WS3">WS3: Cloud, Infra &amp; ITSM</option>
              <option value="WS4">WS4: Big Data &amp; AI</option>
            </Select>
          </div>

          <div className="md:col-span-3">
            <Select
              value={domainFilter}
              onChange={e => setDomainFilter(e.target.value)}
              className="w-full"
            >
              <option value="all">Semua Domain ({allDomains.length})</option>
              {allDomains.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </Select>
          </div>

          {activeTab === 'gaps' && (
            <div className="md:col-span-2">
              <Select
                value={competitorFilter}
                onChange={e => setCompetitorFilter(e.target.value)}
                className="w-full"
              >
                <option value="all">Semua Bank</option>
                {COMPETITORS.map(c => (
                  <option key={c.slug} value={c.slug}>{c.label}</option>
                ))}
              </Select>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-muted pt-3 border-t border-line/80">
          <div>
            Menampilkan <strong className="text-ink num font-semibold">{filteredList.length}</strong> kapabilitas riset
          </div>
          {(searchQuery || workshopFilter !== 'all' || domainFilter !== 'all' || competitorFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setWorkshopFilter('all');
                setDomainFilter('all');
                setCompetitorFilter('all');
              }}
              className="text-accent hover:underline font-semibold inline-flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset filter</span>
            </button>
          )}
        </div>
      </Card>

      {/* Main Results Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px] border-collapse">
            <thead>
              <tr className="border-b border-line bg-sunken/80 text-xs text-muted">
                <th className="py-3 px-3 w-12 text-center font-bold">No</th>
                <th className="py-3 px-2 w-14 text-center font-bold">Pilar</th>
                <th className="py-3 px-4 w-44 font-bold">Domain &amp; Kategori</th>
                <th className="py-3 px-4 min-w-[220px] font-bold">Kapabilitas</th>
                <th className="py-3 px-4 w-64 font-bold bg-accent/10 text-accent border-x border-accent/20">
                  Status Bank BRI
                </th>
                <th className="py-3 px-4 min-w-[280px] font-bold">
                  {activeTab === 'gaps' ? 'Kompetitor yang Mengadopsi (Bukti Nyata)' : activeTab === 'advantages' ? 'Analisis Keunggulan Moat BRI' : 'Standar Konsensus Kompetitor'}
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-line/60">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-14 text-center text-subtle text-xs">
                    Tidak ada kapabilitas yang cocok dengan filter aktif.
                  </td>
                </tr>
              ) : (
                filteredList.map((entry) => {
                  const { item, bri } = entry;
                  return (
                    <tr key={item.id} className="hover:bg-sunken/30 transition-colors">
                      <td className="py-3 px-3 text-center num text-subtle text-xs align-top font-mono">
                        {item.no}
                      </td>

                      <td className="py-3 px-2 text-center align-top">
                        <span className="px-2 py-0.5 rounded-md text-2xs font-mono font-semibold bg-sunken border border-line text-muted">
                          {item.workshop}
                        </span>
                      </td>

                      <td className="py-3 px-4 align-top">
                        <div className="font-semibold text-ink leading-snug">{item.domain}</div>
                        <div className="text-2xs text-subtle mt-0.5">{item.kategori}</div>
                      </td>

                      <td className="py-3 px-4 font-semibold text-ink align-top">
                        <div className="leading-snug">{item.kapabilitas}</div>
                        <div className="text-2xs text-subtle mt-0.5 num font-mono">ID: {item.id}</div>
                      </td>

                      {/* BRI Status */}
                      <td className="py-2 px-3 align-top bg-accent/5 border-x border-accent/15">
                        <button
                          type="button"
                          onClick={() => setSelectedResearchCell({ capId: item.id, bankCode: 'bri' })}
                          className="w-full text-left p-2.5 rounded-xl border border-line/80 bg-surface hover:border-accent/50 hover:shadow-glow-blue transition-all duration-150 text-xs"
                        >
                          <div className="font-bold text-ink line-clamp-2 leading-snug">
                            {bri?.merk && bri?.merk !== '-' ? bri.merk : '– Belum Terdata –'}
                          </div>
                          <div className="flex items-center justify-between mt-2 pt-1 border-t border-line/60 text-2xs">
                            <StatusBadge status={bri?.status} size="xs" />
                            {bri?.link && <ExternalLink className="w-3 h-3 text-accent" />}
                          </div>
                        </button>
                      </td>

                      {/* Competitors Adoptions */}
                      <td className="py-2 px-3 align-top space-y-1.5">
                        {activeTab === 'gaps' && (
                          <div className="space-y-1.5">
                            {entry.verifiedCompetitors?.map((vc: any, vIdx: number) => (
                              <button
                                key={vIdx}
                                type="button"
                                onClick={() => setSelectedResearchCell({ capId: item.id, bankCode: vc.bank.slug })}
                                className="w-full text-left p-2 rounded-xl border border-line/80 bg-surface/90 hover:border-emerald-500/50 hover:shadow-glow-emerald text-ink flex items-center justify-between text-xs transition-all duration-150"
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <BankLogo bankCode={vc.bank.slug} size={18} />
                                  <span className="font-bold text-ink text-xs">{vc.bank.label}:</span>
                                  <span className="text-muted truncate font-medium">{vc.detail.merk}</span>
                                </div>
                                <StatusBadge status="Terverifikasi" size="xs" />
                              </button>
                            ))}
                          </div>
                        )}

                        {activeTab === 'advantages' && (
                          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-xs space-y-1">
                            <div className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-400">
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>Moat Eksklusif Bank BRI</span>
                            </div>
                            <p className="text-2xs text-muted leading-relaxed">
                              Implementasi telah terverifikasi resmi tanpa jejak adopsi yang sepadan di kompetitor.
                            </p>
                          </div>
                        )}

                        {activeTab === 'consensus' && (
                          <div className="space-y-1.5">
                            <div className="flex flex-wrap gap-1.5">
                              {entry.verifiedCompetitors?.map((vc: any, vIdx: number) => (
                                <span 
                                  key={vIdx} 
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-line bg-surface text-2xs font-medium text-ink shadow-2xs"
                                >
                                  <BankLogo bankCode={vc.bank.slug} size={16} />
                                  <span className="text-muted font-bold">{vc.bank.label}:</span>
                                  <span className="font-semibold">{vc.detail.merk}</span>
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
      </Card>
    </div>
  );
};
