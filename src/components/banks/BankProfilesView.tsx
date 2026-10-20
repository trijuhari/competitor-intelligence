import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, ExternalLink, RotateCcw, ArrowRight,
  Building2, CheckCircle2, AlertTriangle, Layers
} from 'lucide-react';
import { BankLogo } from '../common/BankLogo';
import { 
  PageHeader, Card, Stat, Button, Badge, 
  Input, Select, Meter, StatusDot, StatusBadge, cn 
} from '../ui';

const WORKSHOP_META: Record<string, { label: string; desc: string }> = {
  WS1: { label: 'WS1: Core & Digital', desc: 'Core CBS, Mobile App, Digital Bank' },
  WS2: { label: 'WS2: EDW & BI', desc: 'Data Warehouse, MDM, BI & Reporting' },
  WS3: { label: 'WS3: Cloud & Infra', desc: 'Cloud, Data Center, Network & ITSM' },
  WS4: { label: 'WS4: Big Data & AI', desc: 'Hadoop, AI/ML, NLP & Generative AI' }
};

export const BankProfilesView: React.FC = () => {
  const { 
    banks, 
    researchItems,
    selectedBankId, 
    setSelectedBankId,
    setSelectedResearchCell,
    navigate
  } = useApp();

  const currentBank = banks.find(b => b.id === selectedBankId) || banks[0];
  const bankSlug = currentBank.singkatan.toLowerCase();

  const [workshopFilter, setWorkshopFilter] = useState('all');
  const [domainFilter, setDomainFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const allDomains = useMemo(() => {
    return Array.from(new Set(researchItems.map(i => i.domain))).filter(Boolean);
  }, [researchItems]);

  const {
    bankCapabilities,
    verifiedCount,
    inferenceCount,
    belumCount,
    wsCounts
  } = useMemo(() => {
    let verified = 0;
    let inference = 0;
    let belum = 0;
    const wsMap: Record<string, { total: number; verified: number }> = {
      WS1: { total: 0, verified: 0 },
      WS2: { total: 0, verified: 0 },
      WS3: { total: 0, verified: 0 },
      WS4: { total: 0, verified: 0 }
    };

    const caps = researchItems.map(item => {
      const detail = item.banks[bankSlug] || {
        bankCode: currentBank.singkatan,
        merk: '-',
        link: '',
        url: '',
        pic: 'Admin',
        status: 'Belum'
      };

      if (wsMap[item.workshop]) {
        wsMap[item.workshop].total++;
        if (detail.status === 'Terverifikasi') wsMap[item.workshop].verified++;
      }

      if (detail.status === 'Terverifikasi') verified++;
      else if (detail.status === 'Inferensi') inference++;
      else belum++;

      return {
        item,
        detail
      };
    });

    return {
      bankCapabilities: caps,
      verifiedCount: verified,
      inferenceCount: inference,
      belumCount: belum,
      wsCounts: wsMap
    };
  }, [researchItems, bankSlug, currentBank.singkatan]);

  const filteredCaps = useMemo(() => {
    return bankCapabilities.filter(({ item, detail }) => {
      if (workshopFilter !== 'all' && item.workshop !== workshopFilter) return false;
      if (domainFilter !== 'all' && item.domain !== domainFilter) return false;
      if (statusFilter !== 'all' && detail.status !== statusFilter) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchCap = item.kapabilitas.toLowerCase().includes(q);
        const matchDom = item.domain.toLowerCase().includes(q);
        const matchMerk = detail.merk?.toLowerCase().includes(q);
        if (!matchCap && !matchDom && !matchMerk) return false;
      }

      return true;
    });
  }, [bankCapabilities, workshopFilter, domainFilter, statusFilter, searchQuery]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <PageHeader
        title={`Profil Institusi: ${currentBank.nama}`}
        description={`Katalog implementasi kapabilitas teknologi, produk digital unggulan, dan verifikasi adopsi stack ${currentBank.singkatan}.`}
        badge={
          <span className="px-2.5 py-0.5 rounded-full text-2xs font-bold bg-accent/15 text-accent border border-accent/25">
            Profil Bank
          </span>
        }
        actions={
          <Button variant="secondary" onClick={() => navigate('/analyst/matrix')} className="shadow-xs font-semibold">
            <span>Matriks Riset Lengkap</span>
            <ArrowRight className="w-4 h-4 text-accent" />
          </Button>
        }
      />

      {/* Bank Tabs Selector (Sleek Modern Pills) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {banks.map(bank => {
          const isSelected = bank.id === currentBank.id;
          return (
            <button
              key={bank.id}
              onClick={() => setSelectedBankId(bank.id)}
              className={cn(
                'flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-150 border whitespace-nowrap shadow-xs',
                isSelected
                  ? 'bg-accent text-white border-accent shadow-sm scale-[1.02]'
                  : 'bg-surface border-line text-muted hover:text-ink hover:bg-sunken'
              )}
            >
              <BankLogo bankCode={bank.singkatan} size={20} />
              <span>{bank.singkatan}</span>
              {bank.isFokusUtama && (
                <span className={cn('px-1.5 py-0.2 rounded-full text-[10px] font-bold', isSelected ? 'bg-white/25 text-white' : 'bg-accent/15 text-accent')}>
                  Fokus
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Bank Profile Header Card */}
      <div className="relative overflow-hidden rounded-2xl bg-surface border border-line p-6 shadow-card">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl border border-line bg-surface shadow-xs shrink-0">
              <BankLogo bankCode={currentBank.singkatan} size={54} />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-extrabold text-ink tracking-tight font-sans">
                  {currentBank.nama}
                </h2>
                {currentBank.isFokusUtama && (
                  <span className="px-2.5 py-0.5 rounded-full text-2xs font-bold bg-accent text-white shadow-xs">
                    Target Benchmark Utama
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-[13px] text-muted max-w-2xl leading-relaxed">
                {currentBank.deskripsi}
              </p>

              {currentBank.produkDigital && currentBank.produkDigital.length > 0 && (
                <div className="flex items-center flex-wrap gap-1.5 pt-2">
                  <span className="text-2xs font-bold text-subtle mr-1 uppercase tracking-wider">
                    Produk Digital:
                  </span>
                  {currentBank.produkDigital.map((prod, idx) => (
                    <span key={idx} className="px-2.5 py-0.5 rounded-full text-2xs font-semibold bg-sunken border border-line text-ink">
                      {prod}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 w-full md:w-auto shrink-0 border-t md:border-t-0 md:border-l border-line/80 pt-4 md:pt-0 md:pl-6">
            <div className="text-center px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 num">{verifiedCount}</div>
              <div className="text-2xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">Verified</div>
            </div>
            <div className="text-center px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <div className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 num">{inferenceCount}</div>
              <div className="text-2xs font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider">Inferensi</div>
            </div>
            <div className="text-center px-3 py-2 rounded-xl bg-sunken border border-line">
              <div className="text-2xl font-extrabold text-subtle num">{belumCount}</div>
              <div className="text-2xs font-bold text-subtle uppercase tracking-wider">Belum</div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Workshops Progress for this Bank */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {Object.entries(WORKSHOP_META).map(([key, meta]) => {
          const stats = wsCounts[key] || { total: 0, verified: 0 };
          const pct = Math.round((stats.verified / (stats.total || 1)) * 100);

          return (
            <Card key={key} className="p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-md text-2xs font-mono font-semibold bg-sunken border border-line text-muted">
                  {key}
                </span>
                <span className="text-sm font-extrabold num text-ink">{pct}%</span>
              </div>
              <div className="text-sm font-bold text-ink leading-tight">{meta.label.split(': ')[1]}</div>
              <Meter
                total={stats.total}
                segments={[{ value: stats.verified, className: 'bg-emerald-500' }]}
              />
              <div className="text-2xs text-subtle num font-mono">
                {stats.verified} dari {stats.total} kapabilitas terverifikasi
              </div>
            </Card>
          );
        })}
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4 space-y-3.5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-5">
            <Input
              placeholder={`Cari kapabilitas atau merk di ${currentBank.singkatan}…`}
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
              <option value="all">Semua Pilar</option>
              <option value="WS1">WS1: Core &amp; Digital</option>
              <option value="WS2">WS2: EDW &amp; BI</option>
              <option value="WS3">WS3: Cloud &amp; Infra</option>
              <option value="WS4">WS4: Big Data &amp; AI</option>
            </Select>
          </div>

          <div className="md:col-span-2">
            <Select
              value={domainFilter}
              onChange={e => setDomainFilter(e.target.value)}
              className="w-full"
            >
              <option value="all">Semua Domain</option>
              {allDomains.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </Select>
          </div>

          <div className="md:col-span-2">
            <Select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="w-full"
            >
              <option value="all">Semua Status</option>
              <option value="Terverifikasi">Terverifikasi</option>
              <option value="Inferensi">Inferensi</option>
              <option value="Belum">Belum Terdata</option>
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted pt-3 border-t border-line/80">
          <div>
            Menampilkan <strong className="text-ink num font-semibold">{filteredCaps.length}</strong> dari <strong className="text-ink num font-semibold">{bankCapabilities.length}</strong> kapabilitas untuk <strong>{currentBank.nama}</strong>
          </div>
          {(searchQuery || workshopFilter !== 'all' || domainFilter !== 'all' || statusFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setWorkshopFilter('all');
                setDomainFilter('all');
                setStatusFilter('all');
              }}
              className="text-accent hover:underline font-semibold inline-flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset filter</span>
            </button>
          )}
        </div>
      </Card>

      {/* Capabilities Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px] border-collapse">
            <thead>
              <tr className="border-b border-line bg-sunken/80 text-xs text-muted">
                <th className="py-3 px-3 w-12 text-center font-bold">No</th>
                <th className="py-3 px-2 w-14 text-center font-bold">Pilar</th>
                <th className="py-3 px-4 w-48 font-bold">Domain &amp; Kategori</th>
                <th className="py-3 px-4 min-w-[220px] font-bold">Kapabilitas</th>
                <th className="py-3 px-4 w-80 font-bold">Solusi / Merk ({currentBank.singkatan})</th>
                <th className="py-3 px-3 w-36 text-center font-bold">Status Verifikasi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-line/60">
              {filteredCaps.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-14 text-center text-subtle text-xs">
                    Tidak ada kapabilitas yang cocok dengan filter yang dipilih.
                  </td>
                </tr>
              ) : (
                filteredCaps.map(({ item, detail }) => (
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

                    <td className="py-3 px-4 align-top">
                      <button
                        type="button"
                        onClick={() => setSelectedResearchCell({ capId: item.id, bankCode: bankSlug })}
                        className="text-left group flex items-start gap-1.5"
                      >
                        <span className="font-bold text-ink group-hover:text-accent transition-colors leading-snug">
                          {detail.merk || '–'}
                        </span>
                        {detail.link && <ExternalLink className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />}
                      </button>
                      {detail.pic && detail.pic !== '-' && (
                        <div className="text-2xs text-subtle mt-0.5 font-mono">PIC: {detail.pic}</div>
                      )}
                    </td>

                    <td className="py-3 px-3 text-center align-top">
                      <StatusBadge status={detail.status} size="xs" />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
