import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, ExternalLink, Calendar, ShieldCheck, 
  MessageSquare, Layers, CheckCircle2, Lock, AlertTriangle, 
  HelpCircle, Search, Filter, RotateCcw, Database, ArrowRight 
} from 'lucide-react';

const WORKSHOP_META: Record<string, { label: string; color: string; bg: string; border: string }> = {
  WS1: { label: 'WS1: Core & Digital', color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200' },
  WS2: { label: 'WS2: EDW & BI', color: 'text-indigo-700', bg: 'bg-indigo-50', border: 'border-indigo-200' },
  WS3: { label: 'WS3: Cloud & Infra', color: 'text-cyan-700', bg: 'bg-cyan-50', border: 'border-cyan-200' },
  WS4: { label: 'WS4: Big Data & AI', color: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-200' }
};

export const BankProfilesView: React.FC = () => {
  const { 
    banks, 
    researchItems,
    selectedBankId, 
    setSelectedBankId,
    setSelectedResearchCell 
  } = useApp();

  const currentBank = banks.find(b => b.id === selectedBankId) || banks[0];
  const bankSlug = currentBank.singkatan.toLowerCase();

  const [workshopFilter, setWorkshopFilter] = useState('all');
  const [domainFilter, setDomainFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract all domains
  const allDomains = useMemo(() => {
    return Array.from(new Set(researchItems.map(i => i.domain))).filter(Boolean);
  }, [researchItems]);

  // Bank stats from 408 capabilities
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

  // Filtered capabilities
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
    <div className="space-y-6 pb-16">
      {/* Page Header */}
      <div>
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Profil Bank & Lanskap Arsitektur Teknologi
          </h2>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
            408 Kapabilitas Riset
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Eksplorasi mendalam profil implementasi teknologi di setiap bank BUMN (BRI, Mandiri, BNI, BTN, BSI) & BCA berdasarkan 4 Workshop dan 13 Domain Arsitektur.
        </p>
      </div>

      {/* Bank Tabs Selector */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {banks.map(bank => {
          const isSelected = bank.id === currentBank.id;
          return (
            <button
              key={bank.id}
              onClick={() => setSelectedBankId(bank.id)}
              className={`flex items-center space-x-2.5 px-4 py-2.5 rounded-xl font-bold text-xs transition border ${
                isSelected
                  ? 'bg-white text-slate-900 border-slate-300 shadow-sm ring-2 ring-blue-500/20'
                  : 'bg-slate-100/70 text-slate-600 border-transparent hover:bg-slate-200/70'
              }`}
            >
              <span className="text-lg">{bank.logo}</span>
              <span>{bank.singkatan}</span>
              {bank.isFokusUtama && (
                <span className="text-[9px] bg-blue-600 text-white px-1.5 py-0.2 rounded font-extrabold">
                  FOKUS
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Bank Hero Banner */}
      <div 
        className="rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden"
        style={{ 
          background: currentBank.isFokusUtama 
            ? 'linear-gradient(135deg, #00529C 0%, #002B49 100%)' 
            : currentBank.brandColor 
        }}
      >
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl shrink-0 shadow-md">
              {currentBank.logo}
            </div>
            <div>
              <div className="flex items-center space-x-2 flex-wrap">
                <h3 className="text-2xl font-extrabold text-white">{currentBank.nama}</h3>
                {currentBank.isFokusUtama && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 text-white border border-white/30">
                    Fokus Penelitian
                  </span>
                )}
              </div>
              <p className="text-sm text-white/80 mt-1 max-w-xl">
                {currentBank.deskripsi}
              </p>
            </div>
          </div>

          {/* Quick Metrics in Banner */}
          <div className="flex items-center space-x-3 shrink-0">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl text-center min-w-[90px]">
              <div className="text-2xl font-black text-white">{verifiedCount}</div>
              <div className="text-[10px] text-white/70 uppercase tracking-wider font-bold">Terverifikasi</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl text-center min-w-[90px]">
              <div className="text-2xl font-black text-white">{inferenceCount}</div>
              <div className="text-[10px] text-white/70 uppercase tracking-wider font-bold">Inferensi</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl text-center min-w-[90px]">
              <div className="text-2xl font-black text-white">{belumCount}</div>
              <div className="text-[10px] text-white/70 uppercase tracking-wider font-bold">Belum</div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Workshops Progress for this Bank */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {Object.entries(WORKSHOP_META).map(([key, meta]) => {
          const stats = wsCounts[key] || { total: 0, verified: 0 };
          const pct = Math.round((stats.verified / (stats.total || 1)) * 100);

          return (
            <div key={key} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold border ${meta.bg} ${meta.color} ${meta.border}`}>
                  {key}
                </span>
                <span className="text-xs font-bold text-slate-700">{pct}% Verified</span>
              </div>
              <div className="text-xs font-extrabold text-slate-900">{meta.label.split(': ')[1]}</div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: `${pct}%` }} />
              </div>
              <div className="text-[10px] text-slate-400">
                {stats.verified} dari {stats.total} kapabilitas terverifikasi
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Cari kapabilitas ${currentBank.singkatan}, merk, atau sumber...`}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white"
            />
          </div>

          <div className="md:col-span-3">
            <select
              value={workshopFilter}
              onChange={e => setWorkshopFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-slate-50 font-medium"
            >
              <option value="all">Semua Workshop</option>
              <option value="WS1">WS1: Core & Digital</option>
              <option value="WS2">WS2: EDW & BI</option>
              <option value="WS3">WS3: Cloud & Infra</option>
              <option value="WS4">WS4: Big Data & AI</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-slate-50 font-medium"
            >
              <option value="all">Semua Status</option>
              <option value="Terverifikasi">Terverifikasi (✓)</option>
              <option value="Inferensi">Inferensi (⚠)</option>
              <option value="Belum">Belum (–)</option>
            </select>
          </div>

          <div className="md:col-span-2 flex justify-end">
            {(searchQuery || workshopFilter !== 'all' || domainFilter !== 'all' || statusFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setWorkshopFilter('all');
                  setDomainFilter('all');
                  setStatusFilter('all');
                }}
                className="text-xs text-blue-600 hover:underline font-semibold flex items-center space-x-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filter</span>
              </button>
            )}
          </div>
        </div>

        <div className="text-xs text-slate-500 pt-2 border-t border-slate-100">
          Menampilkan <strong className="text-slate-800">{filteredCaps.length}</strong> dari <strong className="text-slate-800">{researchItems.length}</strong> kapabilitas riset di {currentBank.nama}
        </div>
      </div>

      {/* Capabilities Table for Current Bank */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/90 border-b border-slate-200 text-slate-700 font-bold">
                <th className="py-3.5 px-3 w-12 text-center border-r border-slate-200">No</th>
                <th className="py-3.5 px-3 w-20 text-center border-r border-slate-200">WS</th>
                <th className="py-3.5 px-3 w-48 border-r border-slate-200">Domain & Kategori</th>
                <th className="py-3.5 px-4 min-w-[220px] border-r border-slate-200">Kapabilitas / Sistem</th>
                <th className="py-3.5 px-4 min-w-[220px] border-r border-slate-200">Merk / Solusi di {currentBank.singkatan}</th>
                <th className="py-3.5 px-3 w-32 text-center border-r border-slate-200">Status Bukti</th>
                <th className="py-3.5 px-4 min-w-[220px]">Rujukan Sumber Bukti</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredCaps.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    Tidak ada kapabilitas yang cocok dengan filter aktif.
                  </td>
                </tr>
              ) : (
                filteredCaps.map(({ item, detail }) => {
                  const isVerified = detail.status === 'Terverifikasi';
                  const isInference = detail.status === 'Inferensi';
                  const isBelum = detail.status === 'Belum' || !detail.status;

                  return (
                    <tr 
                      key={item.id} 
                      onClick={() => setSelectedResearchCell({ capId: item.id, bankCode: bankSlug })}
                      className="hover:bg-slate-50 transition cursor-pointer group"
                    >
                      <td className="py-3 px-3 text-center font-mono text-slate-400 border-r border-slate-100 align-top">
                        {item.no}
                      </td>

                      <td className="py-3 px-2 text-center border-r border-slate-100 align-top">
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-slate-100 text-slate-700 border border-slate-200">
                          {item.workshop}
                        </span>
                      </td>

                      <td className="py-3 px-3 border-r border-slate-100 align-top">
                        <div className="font-semibold text-slate-800 leading-tight">{item.domain}</div>
                        <div className="text-[10px] text-slate-400 mt-1">{item.kategori}</div>
                      </td>

                      <td className="py-3 px-4 font-bold text-slate-900 border-r border-slate-100 align-top">
                        <div className="leading-snug group-hover:text-blue-600 transition">{item.kapabilitas}</div>
                        <div className="text-[10px] text-slate-400 font-normal mt-0.5">ID: {item.id}</div>
                      </td>

                      <td className="py-3 px-4 border-r border-slate-100 align-top font-bold text-slate-900">
                        <div className="line-clamp-2">{detail.merk || '– Belum terdata'}</div>
                      </td>

                      <td className="py-3 px-3 text-center border-r border-slate-100 align-top">
                        {isVerified && (
                          <span className="px-2 py-1 rounded-md text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            ✓ Verified
                          </span>
                        )}
                        {isInference && (
                          <span className="px-2 py-1 rounded-md text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-200">
                            ⚠ Inferensi
                          </span>
                        )}
                        {isBelum && (
                          <span className="text-slate-400 text-[10px]">– Belum</span>
                        )}
                      </td>

                      <td className="py-3 px-4 align-top text-slate-600">
                        {detail.link ? (
                          <div className="line-clamp-2 text-[11px] leading-relaxed">
                            {detail.link}
                          </div>
                        ) : (
                          <span className="text-slate-300 italic text-[11px]">Belum ada rujukan bukti</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
