import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, ExternalLink, RotateCcw, ArrowRight
} from 'lucide-react';
import { BankLogo } from '../common/BankLogo';
import { 
  PageHeader, Card, Stat, Button, Badge, 
  Input, Select, Meter, StatusDot, cn 
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
        const matchLink = detail.link?.toLowerCase().includes(q);
        if (!matchCap && !matchDom && !matchMerk && !matchLink) return false;
      }

      return true;
    });
  }, [bankCapabilities, workshopFilter, domainFilter, statusFilter, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Profil Bank & Lanskap Arsitektur"
        description="Eksplorasi mendalam profil implementasi teknologi di setiap bank BUMN (BRI, Mandiri, BNI, BTN, BSI) & BCA."
        actions={
          <Button variant="secondary" onClick={() => navigate('/analyst/head-to-head')}>
            Bandingkan di Head-to-Head
            <ArrowRight />
          </Button>
        }
      />

      {/* Bank Tabs Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {banks.map(bank => {
          const isSelected = bank.id === currentBank.id;
          return (
            <button
              key={bank.id}
              onClick={() => setSelectedBankId(bank.id)}
              className={cn(
                'flex items-center gap-2 px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors border whitespace-nowrap',
                isSelected
                  ? 'bg-surface border-line-strong text-ink shadow-subtle'
                  : 'bg-sunken/50 border-line text-muted hover:text-ink hover:bg-sunken'
              )}
            >
              <BankLogo bankCode={bank.singkatan} size={18} />
              <span>{bank.singkatan}</span>
              {bank.isFokusUtama && <Badge tone="accent">Fokus</Badge>}
            </button>
          );
        })}
      </div>

      {/* Selected Bank Profile Header Card */}
      <Card className="p-5 space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2 rounded-lg border border-line bg-surface shrink-0">
              <BankLogo bankCode={currentBank.singkatan} size={48} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-semibold text-ink">{currentBank.nama}</h2>
                {currentBank.isFokusUtama && <Badge tone="accent">Target Analisis Utama</Badge>}
              </div>
              <p className="text-[13px] text-muted mt-1 max-w-xl leading-relaxed">
                {currentBank.deskripsi}
              </p>

              {currentBank.produkDigital && currentBank.produkDigital.length > 0 && (
                <div className="flex items-center flex-wrap gap-1.5 mt-2.5">
                  <span className="text-2xs font-medium text-subtle mr-1">
                    Produk digital:
                  </span>
                  {currentBank.produkDigital.map((prod, idx) => (
                    <Badge key={idx} tone="neutral">{prod}</Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-2 w-full md:w-auto shrink-0 border-t md:border-t-0 md:border-l border-line pt-3 md:pt-0 md:pl-5">
            <div className="text-center px-3">
              <div className="text-xl font-semibold text-ok num">{verifiedCount}</div>
              <div className="text-2xs text-subtle uppercase">Verified</div>
            </div>
            <div className="text-center px-3">
              <div className="text-xl font-semibold text-warn num">{inferenceCount}</div>
              <div className="text-2xs text-subtle uppercase">Inferensi</div>
            </div>
            <div className="text-center px-3">
              <div className="text-xl font-semibold text-subtle num">{belumCount}</div>
              <div className="text-2xs text-subtle uppercase">Belum</div>
            </div>
          </div>
        </div>
      </Card>

      {/* 4 Workshops Progress for this Bank */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {Object.entries(WORKSHOP_META).map(([key, meta]) => {
          const stats = wsCounts[key] || { total: 0, verified: 0 };
          const pct = Math.round((stats.verified / (stats.total || 1)) * 100);

          return (
            <Card key={key} className="p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <Badge tone="neutral">{key}</Badge>
                <span className="text-xs font-semibold num text-ink">{pct}%</span>
              </div>
              <div className="text-[13px] font-medium text-ink leading-tight">{meta.label.split(': ')[1]}</div>
              <Meter
                total={stats.total}
                segments={[{ value: stats.verified, className: 'bg-ok' }]}
              />
              <div className="text-2xs text-subtle num">
                {stats.verified} dari {stats.total} kapabilitas terverifikasi
              </div>
            </Card>
          );
        })}
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-3.5 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 items-center">
          <div className="md:col-span-5">
            <Input
              placeholder={`Cari kapabilitas atau merk di ${currentBank.singkatan}…`}
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
              <option value="all">Semua Pilar</option>
              <option value="WS1">WS1: Core & Digital</option>
              <option value="WS2">WS2: EDW & BI</option>
              <option value="WS3">WS3: Cloud & Infra</option>
              <option value="WS4">WS4: Big Data & AI</option>
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

        <div className="flex items-center justify-between text-2xs text-subtle pt-2 border-t border-line">
          <div>
            Menampilkan <strong className="text-ink num">{filteredCaps.length}</strong> dari <strong className="text-ink num">{bankCapabilities.length}</strong> kapabilitas untuk <strong>{currentBank.nama}</strong>
          </div>
          {(searchQuery || workshopFilter !== 'all' || domainFilter !== 'all' || statusFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setWorkshopFilter('all');
                setDomainFilter('all');
                setStatusFilter('all');
              }}
              className="text-accent hover:underline font-medium inline-flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset filter</span>
            </button>
          )}
        </div>
      </Card>

      {/* Capabilities Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px] border-collapse">
            <thead>
              <tr className="border-b border-line bg-sunken text-xs text-muted">
                <th className="py-2.5 px-3 w-12 text-center font-medium">No</th>
                <th className="py-2.5 px-2 w-14 text-center font-medium">Pilar</th>
                <th className="py-2.5 px-3 w-48 font-medium">Domain & Kategori</th>
                <th className="py-2.5 px-4 min-w-[220px] font-medium">Kapabilitas</th>
                <th className="py-2.5 px-4 w-72 font-medium">Solusi / Merk ({currentBank.singkatan})</th>
                <th className="py-2.5 px-3 w-32 text-center font-medium">Status Verifikasi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-line">
              {filteredCaps.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-subtle text-xs">
                    Tidak ada kapabilitas yang cocok dengan filter yang dipilih.
                  </td>
                </tr>
              ) : (
                filteredCaps.map(({ item, detail }) => (
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

                    <td className="py-2.5 px-4 align-top">
                      <button
                        type="button"
                        onClick={() => setSelectedResearchCell({ capId: item.id, bankCode: bankSlug })}
                        className="text-left group flex items-start gap-1.5"
                      >
                        <span className="font-semibold text-ink group-hover:text-accent transition-colors leading-snug">
                          {detail.merk || '–'}
                        </span>
                        {detail.link && <ExternalLink className="w-3 h-3 text-subtle shrink-0 mt-0.5" />}
                      </button>
                      {detail.pic && detail.pic !== '-' && (
                        <div className="text-2xs text-subtle mt-0.5">PIC: {detail.pic}</div>
                      )}
                    </td>

                    <td className="py-2.5 px-3 text-center align-top">
                      <span className={cn(
                        'inline-flex items-center gap-1.5 text-xs font-medium',
                        detail.status === 'Terverifikasi' ? 'text-ok' : detail.status === 'Inferensi' ? 'text-warn' : 'text-subtle'
                      )}>
                        <StatusDot status={detail.status} />
                        {detail.status || 'Belum'}
                      </span>
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
