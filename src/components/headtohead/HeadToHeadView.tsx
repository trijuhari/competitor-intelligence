import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeftRight, CheckCircle2, AlertTriangle, 
  Search, RotateCcw, ExternalLink, Layers, ArrowRight,
  Swords, ShieldCheck, Zap
} from 'lucide-react';
import { BankLogo } from '../common/BankLogo';
import { 
  PageHeader, Card, CardHeader, Stat, Button, Badge, 
  Input, Select, StatusDot, StatusBadge, cn 
} from '../ui';

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

  const {
    comparisons,
    bothVerifiedCount,
    onlyAVerifiedCount,
    onlyBVerifiedCount,
    bothBelumCount,
    differentMerkCount,
    totalVerifiedA,
    totalVerifiedB
  } = useMemo(() => {
    let bothV = 0;
    let onlyAV = 0;
    let onlyBV = 0;
    let bothB = 0;
    let diffMerk = 0;
    let totalVA = 0;
    let totalVB = 0;

    const list = researchItems.map(item => {
      const detailA = item.banks[bankASlug] || { merk: '-', status: 'Belum', link: '', pic: 'Admin' };
      const detailB = item.banks[bankBSlug] || { merk: '-', status: 'Belum', link: '', pic: 'Admin' };

      const isAVerified = detailA.status === 'Terverifikasi';
      const isBVerified = detailB.status === 'Terverifikasi';
      const isAHasData = detailA.status === 'Terverifikasi' || detailA.status === 'Inferensi';
      const isBHasData = detailB.status === 'Terverifikasi' || detailB.status === 'Inferensi';

      if (isAVerified) totalVA++;
      if (isBVerified) totalVB++;

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
      differentMerkCount: diffMerk,
      totalVerifiedA: totalVA,
      totalVerifiedB: totalVB
    };
  }, [researchItems, bankASlug, bankBSlug]);

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
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <PageHeader
        title={`Head-to-Head: ${bankA.label} vs ${bankB.label}`}
        description={`Komparasi langsung implementasi teknologi antara ${bankA.fullName} dan ${bankB.fullName} pada 408 kapabilitas riset.`}
        badge={
          <span className="px-2.5 py-0.5 rounded-full text-2xs font-bold bg-accent/15 text-accent border border-accent/25">
            Battlecard Komparasi
          </span>
        }
        actions={
          <Button variant="secondary" onClick={() => navigate('/analyst/blueprint')} className="shadow-xs font-semibold">
            <Layers className="w-4 h-4 text-accent" />
            <span>Blueprint Arsitektur</span>
          </Button>
        }
      />

      {/* Comparison Matchup Battlecard */}
      <div className="relative overflow-hidden rounded-2xl bg-surface/90 backdrop-blur-xl border border-line p-5 sm:p-6 shadow-card top-hairline">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Bank 1 Panel */}
          <div className="w-full md:flex-1 p-4 rounded-xl border border-blue-500/30 bg-gradient-to-r from-blue-500/10 via-surface/90 to-surface shadow-xs">
            <div className="flex items-center gap-3.5">
              <BankLogo bankCode={bankA.slug} size={42} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <Select
                    value={bankASlug}
                    onChange={e => setBankASlug(e.target.value)}
                    className="font-bold text-ink text-base border-0 bg-transparent p-0 pr-6 h-auto cursor-pointer focus:ring-0"
                  >
                    {BANK_OPTIONS.map(b => (
                      <option key={b.slug} value={b.slug} disabled={b.slug === bankBSlug}>
                        {b.fullName} ({b.label})
                      </option>
                    ))}
                  </Select>
                  {bankA.isFocus && (
                    <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-accent text-white">
                      Fokus
                    </span>
                  )}
                </div>
                <div className="text-xs text-muted mt-1 flex items-center gap-2 font-mono">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">{totalVerifiedA} Verified</span>
                  <span className="text-subtle">·</span>
                  <span className="text-accent font-semibold">{onlyAVerifiedCount} Moats</span>
                </div>
              </div>
            </div>
          </div>

          {/* Center VS Swap Badge */}
          <div className="flex flex-col items-center justify-center gap-1 shrink-0">
            <Button
              variant="secondary"
              size="icon"
              onClick={() => {
                const temp = bankASlug;
                setBankASlug(bankBSlug);
                setBankBSlug(temp);
              }}
              title="Tukar posisi perbandingan bank"
              className="w-10 h-10 rounded-full border border-line hover:border-accent shadow-md hover:rotate-180 transition-all duration-300"
            >
              <ArrowLeftRight className="w-4 h-4 text-accent" />
            </Button>
            <span className="text-[10px] font-extrabold font-mono uppercase tracking-widest text-subtle">
              VS
            </span>
          </div>

          {/* Bank 2 Panel */}
          <div className="w-full md:flex-1 p-4 rounded-xl border border-line bg-surface/90 shadow-xs">
            <div className="flex items-center gap-3.5">
              <BankLogo bankCode={bankB.slug} size={42} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <Select
                    value={bankBSlug}
                    onChange={e => setBankBSlug(e.target.value)}
                    className="font-bold text-ink text-base border-0 bg-transparent p-0 pr-6 h-auto cursor-pointer focus:ring-0"
                  >
                    {BANK_OPTIONS.map(b => (
                      <option key={b.slug} value={b.slug} disabled={b.slug === bankASlug}>
                        {b.fullName} ({b.label})
                      </option>
                    ))}
                  </Select>
                  {bankB.isFocus && (
                    <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-accent text-white">
                      Fokus
                    </span>
                  )}
                </div>
                <div className="text-xs text-muted mt-1 flex items-center gap-2 font-mono">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">{totalVerifiedB} Verified</span>
                  <span className="text-subtle">·</span>
                  <span className="text-amber-600 dark:text-amber-400 font-semibold">{onlyBVerifiedCount} Moats</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Stat Cards (4 Dynamic Cards) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-xl bg-surface/90 border border-line shadow-card top-hairline">
          <div className="text-2xs font-bold tracking-wider uppercase text-subtle mb-1">Total Kapabilitas</div>
          <div className="text-2xl lg:text-3xl font-extrabold num text-ink">{researchItems.length}</div>
          <div className="text-xs text-subtle mt-1">13 domain arsitektur</div>
        </div>

        <div 
          onClick={() => setComparisonFilter('only-a')}
          className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/25 shadow-card top-hairline cursor-pointer hover:border-blue-500/40 transition-colors"
        >
          <div className="text-2xs font-bold tracking-wider uppercase text-accent mb-1">Keunggulan {bankA.label}</div>
          <div className="text-2xl lg:text-3xl font-extrabold num text-accent">{onlyAVerifiedCount}</div>
          <div className="text-xs text-muted mt-1">Terverifikasi di {bankA.label} saja</div>
        </div>

        <div 
          onClick={() => setComparisonFilter('only-b')}
          className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 shadow-card top-hairline cursor-pointer hover:border-amber-500/40 transition-colors"
        >
          <div className="text-2xs font-bold tracking-wider uppercase text-amber-600 dark:text-amber-400 mb-1">Keunggulan {bankB.label}</div>
          <div className="text-2xl lg:text-3xl font-extrabold num text-amber-600 dark:text-amber-400">{onlyBVerifiedCount}</div>
          <div className="text-xs text-muted mt-1">Celah arsitektur bagi {bankA.label}</div>
        </div>

        <div 
          onClick={() => setComparisonFilter('both-verified')}
          className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25 shadow-card top-hairline cursor-pointer hover:border-emerald-500/40 transition-colors"
        >
          <div className="text-2xs font-bold tracking-wider uppercase text-emerald-600 dark:text-emerald-400 mb-1">Keduanya Terverifikasi</div>
          <div className="text-2xl lg:text-3xl font-extrabold num text-emerald-600 dark:text-emerald-400">{bothVerifiedCount}</div>
          <div className="text-xs text-muted mt-1">Standar paritas bersama</div>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <Card className="p-4 space-y-3.5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-4">
            <Input
              placeholder="Cari kapabilitas, domain, merk stack…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onClear={() => setSearchQuery('')}
              icon={<Search />}
              className="w-full"
            />
          </div>

          <div className="md:col-span-2">
            <Select
              value={workshopFilter}
              onChange={e => setWorkshopFilter(e.target.value)}
              className="w-full"
            >
              <option value="all">Semua Pilar</option>
              <option value="WS1">WS1: Core &amp; Digital</option>
              <option value="WS2">WS2: EDW &amp; BI</option>
              <option value="WS3">WS3: Cloud &amp; Infra</option>
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

          <div className="md:col-span-3">
            <Select
              value={comparisonFilter}
              onChange={e => setComparisonFilter(e.target.value)}
              className="w-full"
            >
              <option value="all">Semua Status Komparasi</option>
              <option value="only-a">Hanya Keunggulan {bankA.label}</option>
              <option value="only-b">Hanya Keunggulan {bankB.label}</option>
              <option value="both-verified">Keduanya Terverifikasi</option>
              <option value="diff-merk">Perbedaan Merk / Solusi</option>
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted pt-3 border-t border-line/80">
          <div>
            Menampilkan <strong className="text-ink num font-semibold">{filteredComparisons.length}</strong> dari <strong className="text-ink num font-semibold">{researchItems.length}</strong> kapabilitas riset
          </div>
          {(searchQuery || workshopFilter !== 'all' || domainFilter !== 'all' || comparisonFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setWorkshopFilter('all');
                setDomainFilter('all');
                setComparisonFilter('all');
              }}
              className="text-accent hover:underline font-semibold inline-flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset filter</span>
            </button>
          )}
        </div>
      </Card>

      {/* Head-to-Head Comparison Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px] border-collapse">
            <thead>
              <tr className="border-b border-line bg-sunken/80 text-xs text-muted">
                <th className="py-3 px-3 w-12 text-center font-bold">No</th>
                <th className="py-3 px-2 w-14 text-center font-bold">Pilar</th>
                <th className="py-3 px-4 w-44 font-bold">Domain &amp; Kategori</th>
                <th className="py-3 px-4 min-w-[220px] font-bold">Kapabilitas</th>
                <th className="py-3 px-4 min-w-[210px] font-bold bg-accent/10 text-accent border-x border-accent/20">
                  <div className="flex items-center gap-2">
                    <BankLogo bankCode={bankA.slug} size={18} />
                    <span>{bankA.label}</span>
                  </div>
                </th>
                <th className="py-3 px-4 min-w-[210px] font-bold">
                  <div className="flex items-center gap-2">
                    <BankLogo bankCode={bankB.slug} size={18} />
                    <span>{bankB.label}</span>
                  </div>
                </th>
                <th className="py-3 px-3 w-40 text-center font-bold">Status Paritas</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-line/60">
              {filteredComparisons.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-14 text-center text-subtle text-xs">
                    Tidak ada kapabilitas yang cocok dengan filter yang dipilih.
                  </td>
                </tr>
              ) : (
                filteredComparisons.map(({ item, detailA, detailB, diffType, hasDiffMerk }) => {
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

                      {/* Bank A Cell */}
                      <td className="py-2 px-3 align-top bg-accent/5 border-x border-accent/15">
                        <button
                          type="button"
                          onClick={() => setSelectedResearchCell({ capId: item.id, bankCode: bankASlug })}
                          className="w-full text-left p-2.5 rounded-xl border border-line/80 bg-surface hover:border-accent/50 hover:shadow-glow-blue transition-all duration-150 text-xs"
                        >
                          <div className="font-bold text-ink line-clamp-2 leading-snug">
                            {detailA.merk || '–'}
                          </div>
                          <div className="flex items-center justify-between mt-2 pt-1 border-t border-line/60 text-2xs">
                            <StatusBadge status={detailA.status} size="xs" />
                            {detailA.link && <ExternalLink className="w-3 h-3 text-accent" />}
                          </div>
                        </button>
                      </td>

                      {/* Bank B Cell */}
                      <td className="py-2 px-3 align-top">
                        <button
                          type="button"
                          onClick={() => setSelectedResearchCell({ capId: item.id, bankCode: bankBSlug })}
                          className="w-full text-left p-2.5 rounded-xl border border-line/80 bg-surface hover:border-line-strong hover:shadow-card-hover transition-all duration-150 text-xs"
                        >
                          <div className="font-bold text-ink line-clamp-2 leading-snug">
                            {detailB.merk || '–'}
                          </div>
                          <div className="flex items-center justify-between mt-2 pt-1 border-t border-line/60 text-2xs">
                            <StatusBadge status={detailB.status} size="xs" />
                            {detailB.link && <ExternalLink className="w-3 h-3 text-subtle" />}
                          </div>
                        </button>
                      </td>

                      {/* Parity Status Badge */}
                      <td className="py-3 px-3 text-center align-top">
                        {diffType === 'both-verified' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-2xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25">
                            Paritas Bersama
                          </span>
                        ) : diffType === 'only-a' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-2xs font-bold bg-blue-500/10 text-accent border border-blue-500/25">
                            Unggul {bankA.label}
                          </span>
                        ) : diffType === 'only-b' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-2xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/25">
                            Unggul {bankB.label}
                          </span>
                        ) : hasDiffMerk ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-2xs font-medium bg-sunken text-muted border border-line">
                            Beda Solusi
                          </span>
                        ) : (
                          <span className="text-subtle text-xs font-mono">–</span>
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
