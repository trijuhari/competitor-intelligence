import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, ExternalLink, ChevronLeft, ChevronRight, 
  RotateCcw, ArrowRight, Download, Flame
} from 'lucide-react';
import { formatDashLineBreaks } from '../../utils/helpers';
import { BankLogo } from '../common/BankLogo';
import { 
  PageHeader, Card, Stat, Button, Badge, 
  Input, Select, SegmentedControl, StatusDot, cn 
} from '../ui';

const WORKSHOP_META: Record<string, { label: string; desc: string }> = {
  WS1: { label: 'WS1: Core & Digital Banking', desc: 'Core Banking (CBS), Mobile, Web, Payment' },
  WS2: { label: 'WS2: EDW, MDM & BI', desc: 'Data Warehouse, MDM, BI & Reporting' },
  WS3: { label: 'WS3: Cloud, Infra & ITSM', desc: 'Cloud, Data Center, Network, ITSM' },
  WS4: { label: 'WS4: Big Data & AI', desc: 'Big Data Analytics, AI/ML, NLP, GenAI' }
};

const BANK_SLUGS = [
  { key: 'bri', label: 'BRI', fullName: 'Bank Rakyat Indonesia', isFocus: true },
  { key: 'mandiri', label: 'Mandiri', fullName: 'Bank Mandiri', isFocus: false },
  { key: 'bca', label: 'BCA', fullName: 'Bank Central Asia', isFocus: false },
  { key: 'bni', label: 'BNI', fullName: 'Bank Negara Indonesia', isFocus: false },
  { key: 'btn', label: 'BTN', fullName: 'Bank Tabungan Negara', isFocus: false },
  { key: 'bsi', label: 'BSI', fullName: 'Bank Syariah Indonesia', isFocus: false }
];

export const MatrixView: React.FC = () => {
  const { 
    researchItems,
    setSelectedResearchCell,
    exportResearchMatrixCSV,
    navigate
  } = useApp();

  // Filters
  const [workshopFilter, setWorkshopFilter] = useState<string>('all');
  const [domainFilter, setDomainFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [direksiThreatsOnly, setDireksiThreatsOnly] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(50);

  // Direksi Focus count: items where Mandiri or BCA is verified while BRI is not
  const direksiThreatsCount = useMemo(() => {
    return researchItems.filter(item => {
      const briNotVerif = item.banks?.bri?.status !== 'Terverifikasi';
      const mandiriOrBcaVerif = item.banks?.mandiri?.status === 'Terverifikasi' || item.banks?.bca?.status === 'Terverifikasi';
      return briNotVerif && mandiriOrBcaVerif;
    }).length;
  }, [researchItems]);

  const allDomains = useMemo(() => {
    return Array.from(new Set(researchItems.map(item => item.domain))).filter(Boolean);
  }, [researchItems]);

  const allCategories = useMemo(() => {
    return Array.from(new Set(researchItems.map(item => item.kategori))).filter(Boolean);
  }, [researchItems]);

  // Statistics
  const stats = useMemo(() => {
    let verifiedCount = 0;
    let inferenceCount = 0;
    let belumCount = 0;
    const totalCells = researchItems.length * BANK_SLUGS.length;

    researchItems.forEach(item => {
      BANK_SLUGS.forEach(b => {
        const detail = item.banks[b.key];
        if (detail?.status === 'Terverifikasi') verifiedCount++;
        else if (detail?.status === 'Inferensi') inferenceCount++;
        else belumCount++;
      });
    });

    return {
      total: researchItems.length,
      totalCells,
      verifiedCount,
      inferenceCount,
      belumCount,
      verifiedPct: Math.round((verifiedCount / (totalCells || 1)) * 100),
      inferencePct: Math.round((inferenceCount / (totalCells || 1)) * 100),
      belumPct: Math.round((belumCount / (totalCells || 1)) * 100),
    };
  }, [researchItems]);

  // Filtered items
  const filteredResearchItems = useMemo(() => {
    return researchItems.filter(item => {
      if (workshopFilter !== 'all' && item.workshop !== workshopFilter) return false;
      if (domainFilter !== 'all' && item.domain !== domainFilter) return false;
      if (categoryFilter !== 'all' && item.kategori !== categoryFilter) return false;

      if (direksiThreatsOnly) {
        const briNotVerif = item.banks?.bri?.status !== 'Terverifikasi';
        const mandiriOrBcaVerif = item.banks?.mandiri?.status === 'Terverifikasi' || item.banks?.bca?.status === 'Terverifikasi';
        if (!briNotVerif || !mandiriOrBcaVerif) return false;
      }

      if (statusFilter !== 'all') {
        const hasStatus = Object.values(item.banks).some(b => b.status === statusFilter);
        if (!hasStatus) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchCap = item.kapabilitas.toLowerCase().includes(q);
        const matchDomain = item.domain.toLowerCase().includes(q);
        const matchKategori = item.kategori.toLowerCase().includes(q);
        const matchMerk = Object.values(item.banks).some(b => 
          b.merk?.toLowerCase().includes(q) || b.link?.toLowerCase().includes(q)
        );
        if (!matchCap && !matchDomain && !matchKategori && !matchMerk) return false;
      }

      return true;
    });
  }, [researchItems, workshopFilter, domainFilter, categoryFilter, statusFilter, searchQuery, direksiThreatsOnly]);

  const totalFiltered = filteredResearchItems.length;
  const totalPages = pageSize === -1 ? 1 : Math.ceil(totalFiltered / pageSize);
  const effectivePage = Math.min(Math.max(currentPage, 1), totalPages || 1);

  const paginatedResearchItems = useMemo(() => {
    if (pageSize === -1) return filteredResearchItems;
    const start = (effectivePage - 1) * pageSize;
    return filteredResearchItems.slice(start, start + pageSize);
  }, [filteredResearchItems, effectivePage, pageSize]);

  const resetFilters = () => {
    setWorkshopFilter('all');
    setDomainFilter('all');
    setCategoryFilter('all');
    setStatusFilter('all');
    setSearchQuery('');
    setDireksiThreatsOnly(false);
    setCurrentPage(1);
  };

  const isFilterActive = workshopFilter !== 'all' || domainFilter !== 'all' || 
    categoryFilter !== 'all' || statusFilter !== 'all' || searchQuery.trim() !== '' || direksiThreatsOnly;

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="Matriks Riset Kapabilitas Teknologi"
        description="Basis data riset komparasi teknologi perbankan Himbara & BCA di 408 kapabilitas, 13 domain, dan 6 bank."
        actions={
          <div className="flex items-center gap-2">
            <Button 
              variant={direksiThreatsOnly ? 'primary' : 'secondary'}
              onClick={() => {
                setDireksiThreatsOnly(!direksiThreatsOnly);
                setCurrentPage(1);
              }}
              className={direksiThreatsOnly ? 'bg-warn text-white border-warn hover:bg-warn/90' : ''}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Fokus Direksi: Gap Mandiri & BCA ({direksiThreatsCount})</span>
            </Button>
            <Button variant="secondary" onClick={exportResearchMatrixCSV}>
              <Download />
              <span>Export CSV</span>
            </Button>
            <Button variant="secondary" onClick={() => navigate('/analyst/head-to-head')}>
              Head-to-head
              <ArrowRight />
            </Button>
          </div>
        }
      />

      {/* KPI Statistics Ribbon */}
      <Card className="divide-y md:divide-y-0 md:divide-x divide-line grid grid-cols-2 md:grid-cols-4">
        <Stat
          label="Total Kapabilitas"
          value={stats.total}
          hint={`${stats.totalCells.toLocaleString()} titik evaluasi total`}
        />
        <Stat
          label="Titik Terverifikasi"
          value={stats.verifiedCount}
          hint={`${stats.verifiedPct}% dari seluruh sel matriks`}
          valueClassName="text-ok"
        />
        <Stat
          label="Titik Inferensi"
          value={stats.inferenceCount}
          hint={`${stats.inferencePct}% sinyal publik / arsitektur`}
          valueClassName="text-warn"
        />
        <Stat
          label="Belum Terkonfirmasi"
          value={stats.belumCount}
          hint={`${stats.belumPct}% belum ada data publik`}
          valueClassName="text-subtle"
        />
      </Card>

      {/* Workshop Segmented Control */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <SegmentedControl
          value={workshopFilter}
          onChange={(v) => { setWorkshopFilter(v); setCurrentPage(1); }}
          options={[
            { value: 'all', label: `Semua Workshop (${stats.total})` },
            { value: 'WS1', label: 'WS1: Core & Digital' },
            { value: 'WS2', label: 'WS2: EDW & BI' },
            { value: 'WS3', label: 'WS3: Cloud & Infra' },
            { value: 'WS4', label: 'WS4: Big Data & AI' },
          ]}
        />
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-3.5 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 items-center">
          <div className="md:col-span-4">
            <Input
              placeholder="Cari kapabilitas, domain, atau merk stack…"
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              icon={<Search />}
              className="w-full"
            />
          </div>

          <div className="md:col-span-3">
            <Select
              value={domainFilter}
              onChange={e => { setDomainFilter(e.target.value); setCurrentPage(1); }}
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
              value={categoryFilter}
              onChange={e => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
              className="w-full"
            >
              <option value="all">Semua Kategori ({allCategories.length})</option>
              {allCategories.map(k => (
                <option key={k} value={k}>
                  {k} ({researchItems.filter(r => r.kategori === k).length})
                </option>
              ))}
            </Select>
          </div>

          <div className="md:col-span-2">
            <Select
              value={statusFilter}
              onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              className="w-full"
            >
              <option value="all">Semua Status</option>
              <option value="Terverifikasi">Terverifikasi</option>
              <option value="Inferensi">Inferensi</option>
              <option value="Belum">Belum Terdata</option>
            </Select>
          </div>
        </div>

        {/* Filter Summary & Pagination Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-line text-2xs text-subtle">
          <div className="flex items-center gap-2">
            <span>
              Menampilkan <strong className="text-ink num">{totalFiltered === 0 ? 0 : (effectivePage - 1) * (pageSize === -1 ? totalFiltered : pageSize) + 1}</strong> – <strong className="text-ink num">{pageSize === -1 ? totalFiltered : Math.min(effectivePage * pageSize, totalFiltered)}</strong> dari <strong className="text-ink num">{totalFiltered}</strong> kapabilitas
            </span>
            {isFilterActive && (
              <Badge tone="warn">Filter Aktif</Badge>
            )}
            {isFilterActive && (
              <button
                onClick={resetFilters}
                className="text-accent hover:underline font-medium inline-flex items-center gap-1 ml-2"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset filter</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span>Baris:</span>
              <Select
                value={pageSize}
                onChange={e => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
                className="h-7 text-2xs px-2 py-0"
              >
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={-1}>Semua ({totalFiltered})</option>
              </Select>
            </div>

            {pageSize !== -1 && totalPages > 1 && (
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={effectivePage <= 1}
                  aria-label="Halaman sebelumnya"
                >
                  <ChevronLeft />
                </Button>
                <span className="px-1 text-2xs font-medium text-ink num">
                  {effectivePage} / {totalPages}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={effectivePage >= totalPages}
                  aria-label="Halaman berikutnya"
                >
                  <ChevronRight />
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Executive Callout Banner when Direksi Focus filter is active */}
      {direksiThreatsOnly && (
        <div className="p-3.5 rounded-lg border border-warn/30 bg-warn-soft/30 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-start sm:items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-warn/15 text-warn flex items-center justify-center shrink-0">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-ink flex items-center gap-2">
                <span>Mode Fokus Direksi: Radar Ancaman Mandiri & BCA</span>
                <Badge tone="warn">{filteredResearchItems.length} Kapabilitas Kritis</Badge>
              </div>
              <p className="text-muted text-2xs mt-0.5">
                Menampilkan 20 kapabilitas di mana Bank Mandiri atau BCA telah terverifikasi mengadopsi solusi produksi, sementara BRI belum terverifikasi.
              </p>
            </div>
          </div>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => setDireksiThreatsOnly(false)}
            className="shrink-0 text-muted hover:text-ink text-xs"
          >
            Tampilkan Semua Data
          </Button>
        </div>
      )}

      {/* Research Matrix Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px] border-collapse">
            <thead>
              <tr className="border-b border-line bg-sunken text-xs text-muted">
                <th className="py-2.5 px-3 w-12 text-center font-medium">No</th>
                <th className="py-2.5 px-2 w-14 text-center font-medium">Pilar</th>
                <th className="py-2.5 px-3 w-48 font-medium">Domain & Kategori</th>
                <th className="py-2.5 px-4 min-w-[220px] font-medium sticky left-0 bg-sunken z-20">
                  Kapabilitas / Sistem
                </th>
                {BANK_SLUGS.map(b => {
                  const isThreatTarget = direksiThreatsOnly && (b.key === 'mandiri' || b.key === 'bca');
                  return (
                    <th
                      key={b.key}
                      className={cn(
                        'py-2.5 px-3 text-center min-w-[170px] max-w-[210px] font-medium transition-colors',
                        b.isFocus && 'bg-accent-soft/30 text-accent font-semibold',
                        isThreatTarget && 'bg-warn-soft/40 text-warn font-semibold border-b-2 border-warn'
                      )}
                    >
                      <div className="inline-flex items-center justify-center gap-1.5">
                        <BankLogo bankCode={b.key} size={16} />
                        <span>{b.label}</span>
                        {b.isFocus && <Badge tone="accent">Fokus</Badge>}
                        {isThreatTarget && <Badge tone="warn">Kompetitor</Badge>}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody className="divide-y divide-line">
              {paginatedResearchItems.length === 0 ? (
                <tr>
                  <td colSpan={4 + BANK_SLUGS.length} className="py-16 text-center text-subtle text-xs">
                    <div>Tidak ada kapabilitas yang cocok dengan kriteria filter.</div>
                    <Button variant="secondary" size="sm" onClick={resetFilters} className="mt-3">
                      Reset filter
                    </Button>
                  </td>
                </tr>
              ) : (
                paginatedResearchItems.map(item => (
                  <tr key={item.id} className="hover:bg-sunken/40 transition-colors group">
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

                    <td className="py-2.5 px-4 font-medium text-ink align-top sticky left-0 bg-surface group-hover:bg-sunken/40 transition-colors z-10">
                      <div className="leading-snug">{item.kapabilitas}</div>
                      <div className="text-2xs text-subtle mt-0.5 num">ID: {item.id}</div>
                    </td>

                    {/* 6 Bank Cells */}
                    {BANK_SLUGS.map(b => {
                      const detail = item.banks[b.key] || {
                        bankCode: b.label,
                        merk: '-',
                        link: '',
                        url: '',
                        pic: 'Admin',
                        status: 'Belum'
                      };

                      const isVerified = detail.status === 'Terverifikasi';
                      const isInference = detail.status === 'Inferensi';
                      const isBelum = detail.status === 'Belum' || !detail.status;
                      const hasLink = !!(detail.url || (detail.link && detail.link.startsWith('http')));

                      return (
                        <td
                          key={b.key}
                          className={cn(
                            'py-1.5 px-2 align-top min-w-[170px] max-w-[210px]',
                            b.isFocus && 'bg-accent-soft/10'
                          )}
                        >
                          <button
                            type="button"
                            onClick={() => setSelectedResearchCell({ capId: item.id, bankCode: b.key })}
                            className={cn(
                              'w-full text-left p-2 rounded-md border text-xs transition-colors flex flex-col justify-between min-h-[68px]',
                              isVerified 
                                ? 'bg-surface hover:bg-sunken/60 border-line' 
                                : isInference
                                ? 'bg-surface hover:bg-sunken/60 border-line'
                                : 'bg-surface/50 hover:bg-sunken/40 border-line/60 text-subtle'
                            )}
                            title={`Klik untuk melihat detail & bukti sumber (${b.label} - ${detail.status})`}
                          >
                            <div className="flex items-start justify-between gap-1">
                              <span className={cn(
                                'font-medium leading-snug line-clamp-2',
                                isBelum ? 'text-subtle' : 'text-ink'
                              )}>
                                {formatDashLineBreaks(detail.merk)}
                              </span>
                              {hasLink && (
                                <ExternalLink className="w-3 h-3 text-subtle shrink-0 mt-0.5" />
                              )}
                            </div>

                            <div className="flex items-center justify-between mt-2 pt-1 border-t border-line/60 text-2xs">
                              <span className={cn(
                                'font-medium inline-flex items-center gap-1',
                                isVerified ? 'text-ok' : isInference ? 'text-warn' : 'text-subtle'
                              )}>
                                <StatusDot status={detail.status} />
                                {isVerified ? 'Verified' : isInference ? 'Inferensi' : 'Belum'}
                              </span>

                              {detail.pic && detail.pic !== '-' && (
                                <span className="text-subtle truncate max-w-[60px]" title={`PIC: ${detail.pic}`}>
                                  {detail.pic}
                                </span>
                              )}
                            </div>
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Matrix Legend Footer */}
        <div className="p-3.5 border-t border-line bg-sunken/40 flex items-center justify-between flex-wrap gap-4 text-xs text-muted">
          <div className="flex items-center gap-5 flex-wrap">
            <span className="font-semibold text-ink">Status verifikasi:</span>
            <span className="inline-flex items-center gap-1.5 text-ok font-medium">
              <StatusDot status="Terverifikasi" />
              <span>Terverifikasi (sumber resmi/studi kasus)</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-warn font-medium">
              <StatusDot status="Inferensi" />
              <span>Inferensi (sinyal publik/artikel)</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-subtle">
              <StatusDot status="Belum" />
              <span>Belum terkonfirmasi</span>
            </span>
          </div>

          <span className="text-2xs text-subtle">
            Klik sel kartu untuk melihat rincian bukti sumber dan memperbarui data.
          </span>
        </div>
      </Card>
    </div>
  );
};
