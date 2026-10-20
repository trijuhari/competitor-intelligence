import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, ExternalLink, ChevronLeft, ChevronRight, 
  RotateCcw, ArrowRight, Download, CheckCircle2,
  AlertTriangle, HelpCircle, Filter, Sparkles, Layers
} from 'lucide-react';
import { formatDashLineBreaks } from '../../utils/helpers';
import { BankLogo } from '../common/BankLogo';
import { 
  PageHeader, Card, Stat, Button, Badge, 
  Input, Select, SegmentedControl, StatusDot, StatusBadge, cn 
} from '../ui';
import { extractUniqueWorkshops, getWorkshopLabel } from '../../utils/workshop';

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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(50);

  const allWorkshops = useMemo(() => {
    return extractUniqueWorkshops(researchItems);
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
    const wsCounts: Record<string, number> = {};
    allWorkshops.forEach(ws => { wsCounts[ws] = 0; });
    const totalCells = researchItems.length * BANK_SLUGS.length;

    researchItems.forEach(item => {
      if (item.workshop) {
        wsCounts[item.workshop] = (wsCounts[item.workshop] || 0) + 1;
      }
      BANK_SLUGS.forEach(b => {
        const detail = item.banks?.[b.key];
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
      workshopCounts: wsCounts,
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

      if (statusFilter !== 'all') {
        const hasStatus = Object.values(item.banks || {}).some(b => b.status === statusFilter);
        if (!hasStatus) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchCap = item.kapabilitas.toLowerCase().includes(q);
        const matchDomain = item.domain.toLowerCase().includes(q);
        const matchKategori = item.kategori.toLowerCase().includes(q);
        const matchMerk = Object.values(item.banks || {}).some(b => 
          b.merk?.toLowerCase().includes(q) || b.link?.toLowerCase().includes(q)
        );
        if (!matchCap && !matchDomain && !matchKategori && !matchMerk) return false;
      }

      return true;
    });
  }, [researchItems, workshopFilter, domainFilter, categoryFilter, statusFilter, searchQuery]);

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
    setCurrentPage(1);
  };

  const isFilterActive = workshopFilter !== 'all' || domainFilter !== 'all' || 
    categoryFilter !== 'all' || statusFilter !== 'all' || searchQuery.trim() !== '';

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <PageHeader
        title="Matriks Riset Kapabilitas Teknologi"
        description="Basis data riset komparatif teknologi perbankan 6 bank nasional di 408 kapabilitas, 13 domain arsitektur, dan 4 pilar workshop."
        badge={
          <span className="px-2.5 py-0.5 rounded-full text-2xs font-bold bg-accent/15 text-accent border border-accent/25">
            408 Baris Valid
          </span>
        }
        actions={
          <div className="flex items-center gap-2.5">
            <Button variant="secondary" onClick={exportResearchMatrixCSV} className="shadow-xs font-semibold">
              <Download className="w-4 h-4 text-emerald-500" />
              <span>Export CSV</span>
            </Button>
            <Button variant="primary" onClick={() => navigate('/analyst/head-to-head')} className="shadow-md font-semibold">
              <span>Bandingkan Head-to-Head</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        }
      />

      {/* KPI Statistics Ribbon (4 Dynamic Metric Cards) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-xl bg-surface border border-line shadow-card">
          <div className="text-2xs font-bold tracking-wider uppercase text-subtle mb-1">Total Kapabilitas</div>
          <div className="text-2xl lg:text-3xl font-extrabold num text-ink">{stats.total}</div>
          <div className="text-xs text-muted font-medium mt-1">{stats.totalCells.toLocaleString()} titik evaluasi total</div>
        </div>

        <div className="p-4 rounded-xl bg-surface border-2 border-emerald-500/40 shadow-card">
          <div className="text-2xs font-bold tracking-wider uppercase text-emerald-800 dark:text-emerald-300 mb-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
            Terverifikasi
          </div>
          <div className="text-2xl lg:text-3xl font-extrabold num text-emerald-800 dark:text-emerald-300">{stats.verifiedCount}</div>
          <div className="text-xs text-muted font-medium mt-1">{stats.verifiedPct}% seluruh titik sel</div>
        </div>

        <div className="p-4 rounded-xl bg-surface border-2 border-amber-500/40 shadow-card">
          <div className="text-2xs font-bold tracking-wider uppercase text-amber-800 dark:text-amber-300 mb-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            Inferensi Industri
          </div>
          <div className="text-2xl lg:text-3xl font-extrabold num text-amber-800 dark:text-amber-300">{stats.inferenceCount}</div>
          <div className="text-xs text-muted font-medium mt-1">{stats.inferencePct}% sinyal publik terindikasi</div>
        </div>

        <div className="p-4 rounded-xl bg-surface border border-line shadow-card">
          <div className="text-2xs font-bold tracking-wider uppercase text-subtle mb-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-400" />
            Belum Terdata
          </div>
          <div className="text-2xl lg:text-3xl font-extrabold num text-ink">{stats.belumCount}</div>
          <div className="text-xs text-muted font-medium mt-1">{stats.belumPct}% belum ada data publik</div>
        </div>
      </div>

      {/* Workshop Quick Switcher */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <SegmentedControl
          value={workshopFilter}
          onChange={(v) => { setWorkshopFilter(v); setCurrentPage(1); }}
          options={[
            { value: 'all', label: 'Semua Workshop', count: stats.total },
            ...allWorkshops.map(ws => ({
              value: ws,
              label: getWorkshopLabel(ws),
              count: stats.workshopCounts[ws]
            }))
          ]}
        />
      </div>

      {/* Filter and Search Panel */}
      <Card className="p-4 space-y-3.5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-4">
            <Input
              placeholder="Cari kapabilitas, domain, teknologi, merk…"
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              onClear={() => setSearchQuery('')}
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-line/80 text-xs text-muted">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span>
              Menampilkan <strong className="text-ink num font-semibold">{totalFiltered === 0 ? 0 : (effectivePage - 1) * (pageSize === -1 ? totalFiltered : pageSize) + 1}</strong> – <strong className="text-ink num font-semibold">{pageSize === -1 ? totalFiltered : Math.min(effectivePage * pageSize, totalFiltered)}</strong> dari <strong className="text-ink num font-semibold">{totalFiltered}</strong> kapabilitas
            </span>
            {isFilterActive && (
              <span className="px-2 py-0.5 rounded-full text-2xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/25">
                Filter Aktif
              </span>
            )}
            {isFilterActive && (
              <button
                onClick={resetFilters}
                className="text-accent hover:underline font-semibold inline-flex items-center gap-1 ml-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-subtle font-medium">Baris:</span>
              <Select
                value={pageSize}
                onChange={e => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
                className="h-8 text-xs px-2.5"
              >
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={-1}>Semua ({totalFiltered})</option>
              </Select>
            </div>

            {pageSize !== -1 && totalPages > 1 && (
              <div className="flex items-center gap-1 bg-sunken/60 p-0.5 rounded-lg border border-line">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted hover:text-ink"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={effectivePage <= 1}
                  aria-label="Halaman sebelumnya"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="px-2 text-xs font-semibold text-ink num font-mono">
                  {effectivePage} / {totalPages}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted hover:text-ink"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={effectivePage >= totalPages}
                  aria-label="Halaman berikutnya"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Research Matrix Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px] border-collapse">
            <thead>
              <tr className="border-b border-line bg-sunken text-xs text-muted">
                <th className="py-3 px-3 w-12 text-center font-bold">No</th>
                <th className="py-3 px-2 w-14 text-center font-bold">Pilar</th>
                <th className="py-3 px-4 w-48 font-bold">Domain &amp; Kategori</th>
                <th className="py-3 px-4 min-w-[220px] font-bold sticky left-0 bg-sunken z-20 border-r border-line text-ink">
                  Kapabilitas / Sistem
                </th>
                {BANK_SLUGS.map(b => (
                  <th
                    key={b.key}
                    className={cn(
                      'py-3 px-3 text-center min-w-[180px] max-w-[220px] font-bold',
                      b.isFocus && 'bg-accent/10 text-accent border-x border-accent/25'
                    )}
                  >
                    <div className="inline-flex items-center justify-center gap-2">
                      <BankLogo bankCode={b.key} size={20} />
                      <span className="tracking-tight">{b.label}</span>
                      {b.isFocus && (
                        <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-accent text-white shadow-xs">
                          Fokus
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-line">
              {paginatedResearchItems.length === 0 ? (
                <tr>
                  <td colSpan={4 + BANK_SLUGS.length} className="py-16 text-center text-subtle text-xs">
                    <div className="text-base font-semibold text-ink mb-1">Tidak ada hasil yang cocok</div>
                    <div>Coba sesuaikan kata kunci atau reset filter pencarian Anda.</div>
                    <Button variant="secondary" size="sm" onClick={resetFilters} className="mt-4 font-semibold">
                      Reset Filter
                    </Button>
                  </td>
                </tr>
              ) : (
                paginatedResearchItems.map(item => (
                  <tr key={item.id} className="hover:bg-sunken/40 transition-colors group">
                    <td className="py-3 px-3 text-center num text-muted text-xs align-top font-mono font-bold">
                      {item.no}
                    </td>

                    <td className="py-3 px-2 text-center align-top">
                      <span className="px-2 py-0.5 rounded-md text-2xs font-mono font-bold bg-sunken border border-line text-ink">
                        {item.workshop}
                      </span>
                    </td>

                    <td className="py-3 px-4 align-top">
                      <div className="font-bold text-ink leading-snug">{item.domain}</div>
                      <div className="text-2xs text-muted font-medium mt-0.5 leading-snug">{item.kategori}</div>
                    </td>

                    <td className="py-3 px-4 font-bold text-ink align-top sticky left-0 bg-surface group-hover:bg-sunken/80 transition-colors z-10 border-r border-line">
                      <div className="leading-snug">{item.kapabilitas}</div>
                      <div className="text-[11px] text-muted mt-0.5 num font-mono">ID: {item.id}</div>
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
                            'py-1.5 px-2 align-top min-w-[180px] max-w-[220px]',
                            b.isFocus && 'bg-accent/5 border-x border-accent/20'
                          )}
                        >
                          <button
                            type="button"
                            onClick={() => setSelectedResearchCell({ capId: item.id, bankCode: b.key })}
                            className={cn(
                              'group/cell w-full text-left p-2.5 rounded-xl border text-xs transition-all duration-150 flex flex-col justify-between min-h-[72px] shadow-xs',
                              isVerified 
                                ? 'bg-surface hover:border-emerald-500 hover:shadow-sm border-line' 
                                : isInference
                                ? 'bg-surface hover:border-amber-500 hover:shadow-sm border-line'
                                : 'bg-sunken/30 hover:bg-surface border-line/70 text-subtle hover:border-line'
                            )}
                            title={`Klik untuk melihat detail & bukti sumber (${b.label} - ${detail.status})`}
                          >
                            <div className="flex items-start justify-between gap-1.5 w-full">
                              <span className={cn(
                                'font-semibold leading-snug line-clamp-2',
                                isBelum ? 'text-subtle' : 'text-ink'
                              )}>
                                {formatDashLineBreaks(detail.merk)}
                              </span>
                              {hasLink && (
                                <ExternalLink className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5 opacity-80 group-hover/cell:opacity-100 transition-opacity" />
                              )}
                            </div>

                            <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-line/60 text-2xs w-full">
                              <StatusBadge status={detail.status} size="xs" />

                              {detail.pic && detail.pic !== '-' && (
                                <span className="text-subtle truncate max-w-[65px] font-mono text-[10.5px]" title={`PIC: ${detail.pic}`}>
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
        <div className="p-4 border-t border-line/80 bg-sunken/40 flex items-center justify-between flex-wrap gap-4 text-xs text-muted">
          <div className="flex items-center gap-6 flex-wrap">
            <span className="font-bold text-ink">Status Pembuktian:</span>
            <span className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
              <StatusDot status="Terverifikasi" pulse />
              <span>Terverifikasi (Dokumen resmi/Studi kasus publik/Wawancara)</span>
            </span>
            <span className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold">
              <StatusDot status="Inferensi" />
              <span>Inferensi (Job posting/Artikel/Sinyal teknis)</span>
            </span>
            <span className="inline-flex items-center gap-2 text-muted">
              <StatusDot status="Belum" />
              <span>Belum Terdata</span>
            </span>
          </div>

          <span className="text-2xs text-subtle font-medium">
            💡 Klik kartu sel untuk melihat rincian bukti sumber atau memperbarui data.
          </span>
        </div>
      </Card>
    </div>
  );
};
