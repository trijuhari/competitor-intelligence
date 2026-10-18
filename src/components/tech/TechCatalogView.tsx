import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, ExternalLink, ChevronLeft, ChevronRight, RotateCcw
} from 'lucide-react';
import { BankLogo } from '../common/BankLogo';
import { 
  PageHeader, Card, Button, Badge, 
  Input, Select, StatusDot, cn 
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
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="Katalog Kapabilitas Teknologi"
        description="Daftar 408 kapabilitas perbankan yang dievaluasi dengan status adopsi pada masing-masing dari 6 bank."
      />

      {/* Filter and Search Bar */}
      <Card className="p-3.5 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 items-center">
          <div className="md:col-span-4">
            <Input
              placeholder="Cari kapabilitas, domain, atau merk…"
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
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
              <option value="WS1">WS1: Core & Digital</option>
              <option value="WS2">WS2: EDW & BI</option>
              <option value="WS3">WS3: Cloud & Infra</option>
              <option value="WS4">WS4: Big Data & AI</option>
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

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-line text-2xs text-subtle">
          <div className="flex items-center gap-2">
            <span>
              Menampilkan <strong className="text-ink num">{totalFiltered === 0 ? 0 : (effectivePage - 1) * pageSize + 1}</strong> – <strong className="text-ink num">{Math.min(effectivePage * pageSize, totalFiltered)}</strong> dari <strong className="text-ink num">{totalFiltered}</strong> kapabilitas
            </span>
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

          {totalPages > 1 && (
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
      </Card>

      {/* Capabilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedItems.map(item => (
          <Card key={item.id} className="p-4 flex flex-col justify-between space-y-3.5 hover:border-line-strong transition-colors">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge tone="neutral">{item.workshop}</Badge>
                <span className="text-2xs font-mono text-subtle num">ID: {item.id}</span>
              </div>

              <h3 className="font-semibold text-ink text-[13px] leading-snug line-clamp-2">
                {item.kapabilitas}
              </h3>

              <div className="flex items-center gap-1.5 mt-1.5 text-2xs text-subtle">
                <span className="font-medium text-muted">{item.domain}</span>
                <span>·</span>
                <span className="truncate">{item.kategori}</span>
              </div>
            </div>

            {/* 6 Banks implementation grid */}
            <div className="pt-2.5 border-t border-line space-y-1.5">
              <span className="text-2xs font-medium text-subtle block">
                Implementasi di 6 bank:
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
                        'p-1.5 rounded-md border text-left text-2xs transition-colors',
                        isVerified
                          ? 'bg-ok-soft/30 border-ok/30 text-ink'
                          : isInference
                          ? 'bg-warn-soft/30 border-warn/30 text-ink'
                          : 'bg-surface border-line text-subtle hover:bg-sunken/40'
                      )}
                      title={`${b.label}: ${detail.merk || 'Belum'} (${detail.status})`}
                    >
                      <div className="flex items-center justify-between text-2xs text-muted font-medium">
                        <span className="flex items-center gap-1">
                          <BankLogo bankCode={b.slug} size={12} />
                          <span>{b.label}</span>
                        </span>
                        <StatusDot status={detail.status} />
                      </div>
                      <div className="truncate mt-0.5 font-medium leading-tight text-ink">
                        {detail.merk || '–'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
