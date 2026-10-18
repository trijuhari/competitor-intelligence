import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  AlertTriangle, ShieldCheck, CheckCircle2, 
  Search, ExternalLink, RotateCcw, ArrowRight, Flame
} from 'lucide-react';
import { BankLogo } from '../common/BankLogo';
import { 
  PageHeader, Card, CardHeader, Stat, Button, Badge, 
  Input, Select, StatusDot, cn 
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
  const [competitorFilter, setCompetitorFilter] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const focus = new URLSearchParams(window.location.search).get('focus');
      if (focus === 'mandiri_bca') return 'mandiri_bca';
    }
    return 'all';
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Handle URL change or deep-link
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const focus = new URLSearchParams(window.location.search).get('focus');
      if (focus === 'mandiri_bca') {
        setActiveTabState('gaps');
        setCompetitorFilter('mandiri_bca');
      }
    }
  }, []);

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

  // Direksi Focus count: items where Mandiri or BCA is verified while BRI is not
  const mandiriBcaThreatsCount = useMemo(() => {
    return gapsList.filter(entry => 
      entry.verifiedCompetitors?.some((vc: any) => vc.bank.slug === 'mandiri' || vc.bank.slug === 'bca')
    ).length;
  }, [gapsList]);

  const activeList = activeTab === 'gaps' ? gapsList : activeTab === 'advantages' ? advantagesList : consensusList;

  const filteredList = useMemo(() => {
    return activeList.filter(entry => {
      const { item } = entry;
      if (workshopFilter !== 'all' && item.workshop !== workshopFilter) return false;
      if (domainFilter !== 'all' && item.domain !== domainFilter) return false;

      if (activeTab === 'gaps' && competitorFilter !== 'all') {
        if (competitorFilter === 'mandiri_bca') {
          const hasMandiriOrBca = entry.verifiedCompetitors?.some((vc: any) => 
            vc.bank.slug === 'mandiri' || vc.bank.slug === 'bca'
          );
          if (!hasMandiriOrBca) return false;
        } else {
          const hasSpecificComp = entry.verifiedCompetitors?.some((vc: any) => vc.bank.slug === competitorFilter);
          if (!hasSpecificComp) return false;
        }
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
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="Gap Analysis & Peluang Strategis"
        description="Pemetaan celah teknologi di mana bank kompetitor telah terverifikasi mengadopsi solusi modern, dibandingkan keunggulan eksklusif dan standar paritas industri."
        actions={
          <div className="flex items-center gap-2">
            <Button 
              variant={competitorFilter === 'mandiri_bca' && activeTab === 'gaps' ? 'primary' : 'secondary'}
              onClick={() => {
                setActiveTabState('gaps');
                setCompetitorFilter(prev => prev === 'mandiri_bca' ? 'all' : 'mandiri_bca');
              }}
              className={competitorFilter === 'mandiri_bca' && activeTab === 'gaps' ? 'bg-warn text-white border-warn hover:bg-warn/90' : ''}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Fokus Direksi: Mandiri & BCA ({mandiriBcaThreatsCount})</span>
            </Button>
            <Button variant="secondary" onClick={() => navigate('/analyst/matrix')}>
              Buka matriks riset
              <ArrowRight />
            </Button>
          </div>
        }
      />

      {/* Strategic Triage Summary Tabs */}
      <Card className="divide-y md:divide-y-0 md:divide-x divide-line grid grid-cols-1 md:grid-cols-3">
        <Stat
          label="Celah untuk BRI (Gaps)"
          value={gapsList.length}
          hint="Kompetitor terverifikasi, BRI belum"
          valueClassName={activeTab === 'gaps' ? 'text-warn font-bold' : 'text-ink'}
          className={activeTab === 'gaps' ? 'bg-warn-soft/40' : ''}
          onClick={() => setActiveTabState('gaps')}
        />
        <Stat
          label="Keunggulan Eksklusif BRI"
          value={advantagesList.length}
          hint="Terverifikasi di BRI saja"
          valueClassName={activeTab === 'advantages' ? 'text-ok font-bold' : 'text-ink'}
          className={activeTab === 'advantages' ? 'bg-ok-soft/40' : ''}
          onClick={() => setActiveTabState('advantages')}
        />
        <Stat
          label="Standar Paritas Bersama"
          value={consensusList.length}
          hint="Terverifikasi di BRI dan ≥2 kompetitor"
          valueClassName={activeTab === 'consensus' ? 'text-accent font-bold' : 'text-ink'}
          className={activeTab === 'consensus' ? 'bg-accent-soft/40' : ''}
          onClick={() => setActiveTabState('consensus')}
        />
      </Card>

      {/* Filter Bar */}
      <Card className="p-3.5 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 items-center">
          <div className="md:col-span-4">
            <Input
              placeholder="Cari kapabilitas, domain, atau merk solusi…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
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
              <option value="WS1">WS1: Core & Digital Banking</option>
              <option value="WS2">WS2: EDW, MDM & BI</option>
              <option value="WS3">WS3: Cloud, Infra & ITSM</option>
              <option value="WS4">WS4: Big Data & AI</option>
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
                <option value="all">Semua Kompetitor</option>
                <option value="mandiri_bca">⚔️ Mandiri & BCA (Fokus Direksi - {mandiriBcaThreatsCount})</option>
                {COMPETITORS.map(c => (
                  <option key={c.slug} value={c.slug}>{c.label}</option>
                ))}
              </Select>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-2xs text-subtle pt-2 border-t border-line">
          <div>
            Menampilkan <strong className="text-ink num">{filteredList.length}</strong> kapabilitas
            {competitorFilter === 'mandiri_bca' && (
              <span className="ml-2 text-warn font-medium">(Filter Fokus Direksi: Mandiri & BCA)</span>
            )}
          </div>
          {(searchQuery || workshopFilter !== 'all' || domainFilter !== 'all' || competitorFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setWorkshopFilter('all');
                setDomainFilter('all');
                setCompetitorFilter('all');
              }}
              className="text-accent hover:underline font-medium inline-flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset filter</span>
            </button>
          )}
        </div>
      </Card>

      {/* Executive Callout Banner when Direksi Focus filter is active */}
      {activeTab === 'gaps' && competitorFilter === 'mandiri_bca' && (
        <div className="p-3.5 rounded-lg border border-warn/30 bg-warn-soft/30 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-start sm:items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-warn/15 text-warn flex items-center justify-center shrink-0">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-ink flex items-center gap-2">
                <span>Mode Fokus Direksi: Radar Ancaman Mandiri & BCA</span>
                <Badge tone="warn">{filteredList.length} Celah Kritis</Badge>
              </div>
              <p className="text-muted text-2xs mt-0.5">
                Menampilkan kapabilitas di mana Bank Mandiri atau BCA telah terverifikasi mengadopsi solusi modern di level produksi, sementara BRI belum terverifikasi.
              </p>
            </div>
          </div>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => setCompetitorFilter('all')}
            className="shrink-0 text-muted hover:text-ink text-xs"
          >
            Reset ke Semua Kompetitor
          </Button>
        </div>
      )}

      {/* Main Results Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px] border-collapse">
            <thead>
              <tr className="border-b border-line bg-sunken text-xs text-muted">
                <th className="py-2.5 px-3 w-12 text-center font-medium">No</th>
                <th className="py-2.5 px-2 w-14 text-center font-medium">Pilar</th>
                <th className="py-2.5 px-3 w-44 font-medium">Domain & Kategori</th>
                <th className="py-2.5 px-4 min-w-[220px] font-medium">Kapabilitas</th>
                <th className="py-2.5 px-3 w-60 font-medium bg-accent-soft/30 text-accent">Status Bank BRI</th>
                <th className="py-2.5 px-3 min-w-[260px] font-medium">
                  {activeTab === 'gaps' ? 'Kompetitor yang Mengadopsi' : activeTab === 'advantages' ? 'Analisis Keunggulan' : 'Standar Konsensus Kompetitor'}
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-line">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-subtle text-xs">
                    Tidak ada kapabilitas yang cocok dengan filter aktif.
                  </td>
                </tr>
              ) : (
                filteredList.map((entry) => {
                  const { item, bri } = entry;
                  return (
                    <tr key={item.id} className="hover:bg-sunken/40 transition-colors">
                      <td className="py-2.5 px-3 text-center num text-subtle text-xs align-top">
                        {item.no}
                      </td>

                      <td className="py-2.5 px-2 text-center align-top">
                        <Badge tone="neutral">{item.workshop}</Badge>
                      </td>

                      <td className="py-2.5 px-3 align-top">
                        <div className="font-medium text-ink leading-tight">{item.domain}</div>
                        <div className="text-2xs text-subtle mt-0.5">{item.kategori}</div>
                      </td>

                      <td className="py-2.5 px-4 font-medium text-ink align-top">
                        <div className="leading-snug">{item.kapabilitas}</div>
                        <div className="text-2xs text-subtle mt-0.5 num">ID: {item.id}</div>
                      </td>

                      {/* BRI Status */}
                      <td className="py-2 px-3 align-top bg-accent-soft/10">
                        <button
                          type="button"
                          onClick={() => setSelectedResearchCell({ capId: item.id, bankCode: 'bri' })}
                          className="w-full text-left p-2 rounded-md border border-line bg-surface hover:bg-sunken/60 transition-colors text-xs"
                        >
                          <div className="font-semibold text-ink line-clamp-2">
                            {bri?.merk || '– Belum Terkonfirmasi'}
                          </div>
                          <div className="flex items-center justify-between mt-1 text-2xs">
                            <span className={cn(
                              'font-medium inline-flex items-center gap-1',
                              bri?.status === 'Terverifikasi' ? 'text-ok' : bri?.status === 'Inferensi' ? 'text-warn' : 'text-subtle'
                            )}>
                              <StatusDot status={bri?.status} />
                              {bri?.status === 'Terverifikasi' ? 'Verified' : bri?.status || 'Belum'}
                            </span>
                            {bri?.link && <ExternalLink className="w-2.5 h-2.5 text-subtle" />}
                          </div>
                        </button>
                      </td>

                      {/* Competitors Adoptions */}
                      <td className="py-2 px-3 align-top space-y-1">
                        {activeTab === 'gaps' && (
                          <div className="space-y-1">
                            {entry.verifiedCompetitors?.map((vc: any, vIdx: number) => (
                              <button
                                key={vIdx}
                                type="button"
                                onClick={() => setSelectedResearchCell({ capId: item.id, bankCode: vc.bank.slug })}
                                className="w-full text-left p-1.5 rounded-md border border-line bg-surface hover:bg-sunken/60 text-ink flex items-center justify-between text-xs transition-colors"
                              >
                                <div className="flex items-center gap-1.5 min-w-0">
                                  <BankLogo bankCode={vc.bank.slug} size={16} />
                                  <span className="font-medium text-ink text-2xs">{vc.bank.label}:</span>
                                  <span className="text-muted truncate">{vc.detail.merk}</span>
                                </div>
                                <Badge tone="ok">Verified</Badge>
                              </button>
                            ))}
                          </div>
                        )}

                        {activeTab === 'advantages' && (
                          <div className="p-2 rounded-md bg-accent-soft text-accent text-xs">
                            <span className="font-semibold block">Differentiator BRI</span>
                            <span className="text-2xs text-muted mt-0.5 block">
                              Implementasi telah terverifikasi resmi tanpa jejak adopsi yang sepadan di kompetitor.
                            </span>
                          </div>
                        )}

                        {activeTab === 'consensus' && (
                          <div className="space-y-1">
                            <div className="flex flex-wrap gap-1">
                              {entry.verifiedCompetitors?.map((vc: any, vIdx: number) => (
                                <span 
                                  key={vIdx} 
                                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-line bg-surface text-2xs font-medium text-ink"
                                >
                                  <BankLogo bankCode={vc.bank.slug} size={14} />
                                  <span className="text-muted">{vc.bank.label}:</span>
                                  <span>{vc.detail.merk}</span>
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
