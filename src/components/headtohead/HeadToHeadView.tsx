import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeftRight, CheckCircle2, AlertTriangle, 
  Search, RotateCcw, ExternalLink, Layers, ArrowRight
} from 'lucide-react';
import { BankLogo } from '../common/BankLogo';
import { 
  PageHeader, Card, CardHeader, Stat, Button, Badge, 
  Input, Select, StatusDot, cn 
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
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title={`Head-to-Head: ${bankA.label} vs ${bankB.label}`}
        description={`Komparasi langsung implementasi teknologi antara ${bankA.fullName} dan ${bankB.fullName} pada 408 kapabilitas riset.`}
        actions={
          <Button variant="secondary" onClick={() => navigate('/analyst/blueprint')}>
            <Layers />
            <span>Blueprint Arsitektur</span>
          </Button>
        }
      />

      {/* Comparison Matchup Card */}
      <Card className="p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Bank 1 Panel */}
          <div className="flex-1 flex items-center justify-between p-3 rounded-lg border border-line bg-surface">
            <div className="flex items-center gap-3 min-w-0">
              <BankLogo bankCode={bankA.slug} size={36} />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <Select
                    value={bankASlug}
                    onChange={e => setBankASlug(e.target.value)}
                    className="font-semibold text-ink text-sm border-0 bg-transparent p-0 pr-6 h-auto"
                  >
                    {BANK_OPTIONS.map(b => (
                      <option key={b.slug} value={b.slug} disabled={b.slug === bankBSlug}>
                        {b.fullName} ({b.label})
                      </option>
                    ))}
                  </Select>
                  {bankA.isFocus && <Badge tone="accent">Fokus</Badge>}
                </div>
                <div className="text-2xs text-muted mt-0.5 num">
                  {totalVerifiedA} terverifikasi · {onlyAVerifiedCount} keunggulan eksklusif
                </div>
              </div>
            </div>
          </div>

          {/* Swap Button */}
          <Button
            variant="secondary"
            size="icon"
            onClick={() => {
              const temp = bankASlug;
              setBankASlug(bankBSlug);
              setBankBSlug(temp);
            }}
            title="Tukar posisi bank"
            aria-label="Tukar posisi bank"
            className="self-center shrink-0"
          >
            <ArrowLeftRight />
          </Button>

          {/* Bank 2 Panel */}
          <div className="flex-1 flex items-center justify-between p-3 rounded-lg border border-line bg-surface">
            <div className="flex items-center gap-3 min-w-0">
              <BankLogo bankCode={bankB.slug} size={36} />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <Select
                    value={bankBSlug}
                    onChange={e => setBankBSlug(e.target.value)}
                    className="font-semibold text-ink text-sm border-0 bg-transparent p-0 pr-6 h-auto"
                  >
                    {BANK_OPTIONS.map(b => (
                      <option key={b.slug} value={b.slug} disabled={b.slug === bankASlug}>
                        {b.fullName} ({b.label})
                      </option>
                    ))}
                  </Select>
                  {bankB.isFocus && <Badge tone="accent">Fokus</Badge>}
                </div>
                <div className="text-2xs text-muted mt-0.5 num">
                  {totalVerifiedB} terverifikasi · {onlyBVerifiedCount} keunggulan eksklusif
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Summary Ribbon */}
      <Card className="divide-y md:divide-y-0 md:divide-x divide-line grid grid-cols-2 md:grid-cols-4">
        <Stat
          label="Total Kapabilitas"
          value={researchItems.length}
          hint="13 domain arsitektur"
        />
        <Stat
          label={`Keunggulan ${bankA.label}`}
          value={onlyAVerifiedCount}
          hint={`Terverifikasi di ${bankA.label} saja`}
          valueClassName="text-accent"
          onClick={() => setComparisonFilter('only-a')}
        />
        <Stat
          label={`Keunggulan ${bankB.label}`}
          value={onlyBVerifiedCount}
          hint={`Celah arsitektur bagi ${bankA.label}`}
          valueClassName="text-warn"
          onClick={() => setComparisonFilter('only-b')}
        />
        <Stat
          label="Keduanya Terverifikasi"
          value={bothVerifiedCount}
          hint="Standar paritas bersama"
          valueClassName="text-ok"
          onClick={() => setComparisonFilter('both-verified')}
        />
      </Card>

      {/* Filter and Control Bar */}
      <Card className="p-3.5 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 items-center">
          <div className="md:col-span-4">
            <Input
              placeholder="Cari kapabilitas, domain, atau merk stack…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
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
              <option value="WS1">WS1: Core & Digital</option>
              <option value="WS2">WS2: EDW & BI</option>
              <option value="WS3">WS3: Cloud & Infra</option>
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

        <div className="flex items-center justify-between text-2xs text-subtle pt-2 border-t border-line">
          <div>
            Menampilkan <strong className="text-ink num">{filteredComparisons.length}</strong> dari <strong className="text-ink num">{researchItems.length}</strong> kapabilitas riset
          </div>
          {(searchQuery || workshopFilter !== 'all' || domainFilter !== 'all' || comparisonFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setWorkshopFilter('all');
                setDomainFilter('all');
                setComparisonFilter('all');
              }}
              className="text-accent hover:underline font-medium inline-flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset filter</span>
            </button>
          )}
        </div>
      </Card>

      {/* Head-to-Head Comparison Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px] border-collapse">
            <thead>
              <tr className="border-b border-line bg-sunken text-xs text-muted">
                <th className="py-2.5 px-3 w-12 text-center font-medium">No</th>
                <th className="py-2.5 px-2 w-14 text-center font-medium">Pilar</th>
                <th className="py-2.5 px-3 w-44 font-medium">Domain & Kategori</th>
                <th className="py-2.5 px-4 min-w-[220px] font-medium">Kapabilitas</th>
                <th className="py-2.5 px-3 min-w-[200px] font-medium bg-accent-soft/30 text-accent">
                  <div className="flex items-center gap-1.5">
                    <BankLogo bankCode={bankA.slug} size={16} />
                    <span>{bankA.label}</span>
                  </div>
                </th>
                <th className="py-2.5 px-3 min-w-[200px] font-medium">
                  <div className="flex items-center gap-1.5">
                    <BankLogo bankCode={bankB.slug} size={16} />
                    <span>{bankB.label}</span>
                  </div>
                </th>
                <th className="py-2.5 px-3 w-36 text-center font-medium">Status Paritas</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-line">
              {filteredComparisons.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-subtle text-xs">
                    Tidak ada kapabilitas yang cocok dengan filter yang dipilih.
                  </td>
                </tr>
              ) : (
                filteredComparisons.map(({ item, detailA, detailB, diffType, hasDiffMerk }) => {
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

                      {/* Bank A Cell */}
                      <td className="py-2 px-3 align-top bg-accent-soft/10">
                        <button
                          type="button"
                          onClick={() => setSelectedResearchCell({ capId: item.id, bankCode: bankASlug })}
                          className="w-full text-left p-2 rounded-md border border-line bg-surface hover:bg-sunken/60 transition-colors text-xs"
                        >
                          <div className="font-semibold text-ink line-clamp-2">
                            {detailA.merk || '–'}
                          </div>
                          <div className="flex items-center justify-between mt-1 text-2xs">
                            <span className={cn(
                              'font-medium inline-flex items-center gap-1',
                              detailA.status === 'Terverifikasi' ? 'text-ok' : detailA.status === 'Inferensi' ? 'text-warn' : 'text-subtle'
                            )}>
                              <StatusDot status={detailA.status} />
                              {detailA.status === 'Terverifikasi' ? 'Verified' : detailA.status}
                            </span>
                            {detailA.link && <ExternalLink className="w-2.5 h-2.5 text-subtle" />}
                          </div>
                        </button>
                      </td>

                      {/* Bank B Cell */}
                      <td className="py-2 px-3 align-top">
                        <button
                          type="button"
                          onClick={() => setSelectedResearchCell({ capId: item.id, bankCode: bankBSlug })}
                          className="w-full text-left p-2 rounded-md border border-line bg-surface hover:bg-sunken/60 transition-colors text-xs"
                        >
                          <div className="font-semibold text-ink line-clamp-2">
                            {detailB.merk || '–'}
                          </div>
                          <div className="flex items-center justify-between mt-1 text-2xs">
                            <span className={cn(
                              'font-medium inline-flex items-center gap-1',
                              detailB.status === 'Terverifikasi' ? 'text-ok' : detailB.status === 'Inferensi' ? 'text-warn' : 'text-subtle'
                            )}>
                              <StatusDot status={detailB.status} />
                              {detailB.status === 'Terverifikasi' ? 'Verified' : detailB.status}
                            </span>
                            {detailB.link && <ExternalLink className="w-2.5 h-2.5 text-subtle" />}
                          </div>
                        </button>
                      </td>

                      {/* Parity Status Badge */}
                      <td className="py-2.5 px-3 text-center align-top">
                        {diffType === 'both-verified' ? (
                          <Badge tone="ok">Paritas Bersama</Badge>
                        ) : diffType === 'only-a' ? (
                          <Badge tone="accent">Unggul {bankA.label}</Badge>
                        ) : diffType === 'only-b' ? (
                          <Badge tone="warn">Unggul {bankB.label}</Badge>
                        ) : hasDiffMerk ? (
                          <Badge tone="neutral">Beda Solusi</Badge>
                        ) : (
                          <span className="text-subtle text-xs">–</span>
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
