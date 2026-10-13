import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, ExternalLink, Calendar, ShieldCheck, 
  MessageSquare, Layers, CheckCircle2, Lock 
} from 'lucide-react';
import { getConfidenceBadge } from '../../utils/helpers';

export const BankProfilesView: React.FC = () => {
  const { 
    banks, 
    categories, 
    technologies, 
    findings, 
    evidences, 
    interviews,
    selectedBankId, 
    setSelectedBankId,
    setSelectedFindingModalId 
  } = useApp();

  const currentBank = banks.find(b => b.id === selectedBankId) || banks[0];
  const bankFindings = findings.filter(f => f.bankId === currentBank.id);
  const bankFindingIds = new Set(bankFindings.map(f => f.id));
  const bankEvidences = evidences.filter(e => bankFindingIds.has(e.findingId));
  const bankInterviews = interviews.filter(i => i.bankId === currentBank.id);

  // Group bank technologies by category
  const categorizedFindings = categories.map(cat => {
    const findingsInCat = bankFindings.filter(f => {
      const tech = technologies.find(t => t.id === f.technologyId);
      return tech?.categoryId === cat.id;
    });

    return {
      category: cat,
      findings: findingsInCat
    };
  }).filter(group => group.findings.length > 0);

  return (
    <div className="space-y-6 pb-16">
      {/* Page Header */}
      <div>
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Profil Bank & Lanskap Teknologi
          </h2>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
            F3 · Profil Detail
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Eksplorasi mendalam arsitektur per bank, produk digital unggulan, dan daftar jejak bukti yang terdokumentasi.
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
                  BRI
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Bank Banner */}
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
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur text-white font-bold">
                  {currentBank.singkatan}
                </span>
              </div>
              <p className="text-xs text-white/90 max-w-2xl mt-1.5 leading-relaxed">
                {currentBank.deskripsi}
              </p>

              {/* Digital Products Badges */}
              <div className="flex items-center space-x-2 flex-wrap gap-y-1.5 mt-3">
                <span className="text-xs text-white/70 font-medium mr-1">Produk Digital:</span>
                {currentBank.produkDigital.map(prod => (
                  <span 
                    key={prod}
                    className="px-2.5 py-0.5 rounded-lg bg-white/15 border border-white/25 text-xs text-white font-semibold backdrop-blur"
                  >
                    {prod}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats on the right */}
          <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 shrink-0 text-center">
            <div>
              <div className="text-2xl font-extrabold text-white">{bankFindings.length}</div>
              <div className="text-[11px] text-white/80 font-medium">Teknologi Teridentifikasi</div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div>
              <div className="text-2xl font-extrabold text-white">{bankEvidences.length}</div>
              <div className="text-[11px] text-white/80 font-medium">Berkas Bukti Publik</div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div>
              <div className="text-2xl font-extrabold text-white">{bankInterviews.length}</div>
              <div className="text-[11px] text-white/80 font-medium">Wawancara Terverifikasi</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack Grouped per Category */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
          <Layers className="w-5 h-5 text-blue-600" />
          <span>Komponen Tech Stack ({currentBank.singkatan}) per Kategori</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categorizedFindings.map(group => {
            return (
              <div 
                key={group.category.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition"
              >
                <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2.5">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                    <h4 className="font-extrabold text-slate-900 text-sm">{group.category.nama}</h4>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold">
                    {group.findings.length} teknologi
                  </span>
                </div>

                <div className="space-y-2.5">
                  {group.findings.map(finding => {
                    const tech = technologies.find(t => t.id === finding.technologyId);
                    if (!tech) return null;
                    const confidenceBadge = getConfidenceBadge(finding.confidence);

                    return (
                      <div
                        key={finding.id}
                        onClick={() => setSelectedFindingModalId(finding.id)}
                        className="p-3 rounded-xl bg-slate-50/70 hover:bg-blue-50/40 border border-slate-200/80 hover:border-blue-200 cursor-pointer transition flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="font-bold text-slate-900">{tech.nama}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            {tech.vendor} • <span className="capitalize">{tech.tipe}</span>
                          </div>
                          {finding.catatan && (
                            <p className="text-[11px] text-slate-600 italic mt-1 line-clamp-1">
                              "{finding.catatan}"
                            </p>
                          )}
                        </div>

                        <span className={`px-2 py-1 rounded-lg border font-bold text-[11px] shrink-0 ml-3 ${confidenceBadge.bgColor}`}>
                          {confidenceBadge.symbol} {confidenceBadge.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bibliography & Evidence List for this Bank */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900">
              Daftar Bukti & Jejak Rekaman Wawancara ({currentBank.singkatan})
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Sesuai Metodologi & Regulasi UU PDP
          </span>
        </div>

        {/* Anonymized Interview Cards */}
        {bankInterviews.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-purple-900 uppercase tracking-wider flex items-center space-x-1.5">
              <Lock className="w-3.5 h-3.5 text-purple-600" />
              <span>Catatan Wawancara Narasumber Internal (Anonim):</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {bankInterviews.map(inv => (
                <div key={inv.id} className="p-4 bg-purple-50/60 rounded-xl border border-purple-200 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-purple-950">{inv.kodeNarasumber}</span>
                    <span className="text-slate-500 text-[11px] flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{inv.tanggal}</span>
                    </span>
                  </div>
                  <div className="text-[11px] text-purple-800 font-medium">{inv.divisi}</div>
                  <p className="text-slate-700 leading-relaxed italic bg-white/70 p-2 rounded-lg border border-purple-100">
                    "{inv.ringkasan}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Public Evidences */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Sumber Publik & Studi Kasus Resmi:
          </h4>
          <div className="space-y-2">
            {bankEvidences.map(ev => (
              <div key={ev.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="font-bold text-slate-800">{ev.judul}</div>
                  <blockquote className="text-slate-600 italic">"{ev.kutipanRingkas}"</blockquote>
                  <div className="text-[11px] text-slate-400">
                    Diakses: {ev.tanggalAkses} · Pencatat: {ev.pencatat}
                  </div>
                </div>
                {ev.url && (
                  <a 
                    href={ev.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="shrink-0 p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition"
                    title="Buka Tautan"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
