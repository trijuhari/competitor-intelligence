import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, ExternalLink, ChevronLeft, ChevronRight, RotateCcw,
  Cpu, Layers, Sparkles
} from 'lucide-react';
import { BankLogo } from '../common/BankLogo';
import { 
  PageHeader, Card, Button, Badge, 
  Input, Select, StatusDot, StatusBadge, cn 
} from '../ui';

const BANK_BADGES = [
  { slug: 'bri', label: 'BRI', isFocus: true },
  { slug: 'mandiri', label: 'Mandiri', isFocus: false },
  { slug: 'bca', label: 'BCA', isFocus: false },
  { slug: 'bni', label: 'BNI', isFocus: false },
  { slug: 'btn', label: 'BTN', isFocus: false },
  { slug: 'bsi', label: 'BSI', isFocus: false }
];

export const TechCatalogView: React.FC = () => {
  const { 
    researchItems,
    setSelectedResearchCell 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWorkshop, setSelectedWorkshop] = useState<string>('all');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBankFilter, setSelectedBankFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(30);

  const allDomains = useMemo(() => {
    return Array.from(new Set(researchItems.map(i => i.domain))).filter(Boolean);
  }, [researchItems]);

  const allCategories = useMemo(() => {
    return Array.from(new Set(researchItems.map(i => i.kategori))).filter(Boolean);
  }, [researchItems]);

  const filteredItems = useMemo(() => {
    return researchItems.filter(item => {
      if (selectedWorkshop !== 'all' && item.workshop !== selectedWorkshop) return false;
      if (selectedDomain !== 'all' && item.domain !== selectedDomain) return false;
      if (selectedCategory !== 'all' && item.kategori !== selectedCategory) return false;

      if (selectedBankFilter !== 'all') {
        const bDetail = item.banks[selectedBankFilter];
        if (!bDetail || bDetail.status === 'Belum') return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchCap = item.kapabilitas.toLowerCase().includes(q);
        const matchDomain = item.domain.toLowerCase().includes(q);
        const matchKat = item.kategori.toLowerCase().includes(q);
        const matchMerk = Object.values(item.banks).some(b => 
          b.merk?.toLowerCase().includes(q)
        );
        if (!matchCap && !matchDomain && !matchKat && !matchMerk) return false;
      }

      return true;
    });
  }, [researchItems, selectedWorkshop, selectedDomain, selectedCategory, selectedBankFilter, searchQuery]);

  const totalFiltered = filteredItems.length;
  const totalPages = Math.ceil(totalFiltered / pageSize) || 1;
  const effectivePage = Math.min(Math.max(currentPage, 1), totalPages);

  const paginatedItems = useMemo(() => {
    const start = (effectivePage - 1) * pageSize;
    return filteredItems.slice(start, start + pageSize);
  }, [filteredItems, effectivePage, pageSize]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedWorkshop('all');
    setSelectedDomain('all');
    setSelectedCategory('all');
    setSelectedBankFilter('all');
    setCurrentPage(1);
  };

  const isFilterActive = searchQuery !== '' || selectedWorkshop !== 'all' || 
    selectedDomain !== 'all' || selectedCategory !== 'all' || selectedBankFilter !== 'all';

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <PageHeader
        title="Katalog Kapabilitas Teknologi"
        description="Eksplorasi 408 kapabilitas perbankan enterprise yang dievaluasi dengan status adopsi pada masing-masing dari 6 bank nasional."
        badge={
          <span className="px-2.5 py-0.5 rounded-full text-2xs font-bold bg-accent/15 text-accent border border-accent/25">
            Katalog Kartu
          </span>
        }
      />

      {/* Filter and Search Bar */}
      <Card className="p-4 space-y-3.5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-4">
            <Input
              placeholder="Cari kapabilitas, domain, merk…"
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              onClear={() => setSearchQuery('')}
              icon={<Search />}
              className="w-full"
            />
          </div>

          <div className="md:col-span-2">
            <Select
              value={selectedWorkshop}
              onChange={e => { setSelectedWorkshop(e.target.value); setCurrentPage(1); }}
              className="w-full"
            >
              <option value="all">Semua Pilar</option>
              <option value="WS1">WS1: Core &amp; Digital</option>
              <option value="WS2">WS2: EDW &amp; BI</option>
              <option value="WS3">WS3: Cloud &amp; Infra</option>
              <option value="WS4">WS4: Big Data &amp; AI</option>
            </Select>
          </div>

          <div className="md:col-span-2">
            <Select
              value={selectedDomain}
              onChange={e => { setSelectedDomain(e.target.value); setCurrentPage(1); }}
              className="w-full"
            >
              <option value="all">Semua Domain ({allDomains.length})</option>
              {allDomains.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </Select>
          </div>

          <div className="md:col-span-2">
            <Select
              value={selectedCategory}
              onChange={e => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
              className="w-full"
            >
              <option value="all">Semua Kategori ({allCategories.length})</option>
              {allCategories.map(k => (
                <option key={k} value={k}>{k}</option>
              ))}
            </Select>
          </div>

          <div className="md:col-span-2">
            <Select
              value={selectedBankFilter}
              onChange={e => { setSelectedBankFilter(e.target.value); setCurrentPage(1); }}
              className="w-full"
            >
              <option value="all">Semua Bank</option>
              {BANK_BADGES.map(b => (
                <option key={b.slug} value={b.slug}>{b.label}</option>
              ))}
            </Select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-line/80 text-xs text-muted">
          <div className="flex items-center gap-2">
            <span>
              Menampilkan <strong className="text-ink num font-semibold">{totalFiltered === 0 ? 0 : (effectivePage - 1) * pageSize + 1}</strong> – <strong className="text-ink num font-semibold">{Math.min(effectivePage * pageSize, totalFiltered)}</strong> dari <strong className="text-ink num font-semibold">{totalFiltered}</strong> kapabilitas
            </span>
            {isFilterActive && (
              <button
                onClick={resetFilters}
                className="text-accent hover:underline font-semibold inline-flex items-center gap-1 ml-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset filter</span>
              </button>
            )}
          </div>

          {totalPages > 1 && (
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
      </Card>

      {/* Capabilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedItems.map(item => (
          <div 
            key={item.id} 
            className="group p-5 rounded-2xl bg-surface/90 backdrop-blur-md border border-line hover:border-accent/40 hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between space-y-4 top-hairline"
          >
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="px-2 py-0.5 rounded-md text-2xs font-mono font-semibold bg-sunken border border-line text-muted">
                  {item.workshop}
                </span>
                <span className="text-2xs font-mono text-subtle num">ID: {item.id}</span>
              </div>

              <h3 className="font-bold text-ink text-sm leading-snug line-clamp-2 group-hover:text-accent transition-colors">
                {item.kapabilitas}
              </h3>

              <div className="flex items-center gap-1.5 mt-2 text-2xs text-subtle">
                <span className="font-semibold text-muted">{item.domain}</span>
                <span>·</span>
                <span className="truncate">{item.kategori}</span>
              </div>
            </div>

            {/* 6 Banks implementation mini grid */}
            <div className="pt-3 border-t border-line/60 space-y-2">
              <span className="text-2xs font-bold text-subtle block uppercase tracking-wider">
                Adopsi di 6 Bank:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {BANK_BADGES.map(b => {
                  const detail = item.banks[b.slug] || { merk: '-', status: 'Belum' };
                  const isVerified = detail.status === 'Terverifikasi';
                  const isInference = detail.status === 'Inferensi';

                  return (
                    <button
                      key={b.slug}
                      type="button"
                      onClick={() => setSelectedResearchCell({ capId: item.id, bankCode: b.slug })}
                      className={cn(
                        'p-2 rounded-xl border text-left text-2xs transition-all duration-150',
                        isVerified
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-ink hover:border-emerald-500'
                          : isInference
                          ? 'bg-amber-500/10 border-amber-500/30 text-ink hover:border-amber-500'
                          : 'bg-sunken/40 border-line/60 text-subtle hover:bg-surface hover:text-ink'
                      )}
                      title={`${b.label}: ${detail.merk || 'Belum'} (${detail.status})`}
                    >
                      <div className="flex items-center justify-between text-2xs text-muted font-bold">
                        <span className="flex items-center gap-1">
                          <BankLogo bankCode={b.slug} size={13} />
                          <span>{b.label}</span>
                        </span>
                        <StatusDot status={detail.status} />
                      </div>
                      <div className="truncate mt-1 font-semibold leading-tight text-ink text-[11px]">
                        {detail.merk || '–'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
