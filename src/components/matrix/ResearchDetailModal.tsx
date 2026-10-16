import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, ExternalLink, ShieldCheck, CheckCircle2, AlertTriangle, HelpCircle, 
  Building2, Cpu, Globe, UserCheck, Save, Copy, Check, ArrowRight
} from 'lucide-react';
import { VerificationStatus, BankCapabilityDetail } from '../../types';
import { formatDashLineBreaks } from '../../utils/helpers';

export const ResearchDetailModal: React.FC = () => {
  const { 
    selectedResearchCell, 
    setSelectedResearchCell, 
    researchItems, 
    updateResearchCell, 
    banks, 
    currentUser 
  } = useApp();

  const [copied, setCopied] = useState(false);
  const [activeBankSlug, setActiveBankSlug] = useState<string>('bri');
  const [isEditing, setIsEditing] = useState(false);

  // Form states
  const [editMerk, setEditMerk] = useState('');
  const [editStatus, setEditStatus] = useState<VerificationStatus>('Belum');
  const [editLink, setEditLink] = useState('');
  const [editPic, setEditPic] = useState('Admin');

  useEffect(() => {
    if (selectedResearchCell) {
      setActiveBankSlug(selectedResearchCell.bankCode.toLowerCase());
      setIsEditing(false);
    }
  }, [selectedResearchCell]);

  if (!selectedResearchCell) return null;

  const item = researchItems.find(r => r.id === selectedResearchCell.capId);
  if (!item) return null;

  const currentBankDetail: BankCapabilityDetail = item.banks[activeBankSlug] || {
    bankCode: activeBankSlug.toUpperCase(),
    merk: '-',
    link: '',
    url: '',
    pic: 'Admin',
    status: 'Belum'
  };

  const currentBankObj = banks.find(b => b.singkatan.toLowerCase() === activeBankSlug.toLowerCase());

  const canEdit = currentUser.role === 'Admin' || currentUser.role === 'Analyst';

  const handleStartEdit = () => {
    setEditMerk(currentBankDetail.merk);
    setEditStatus(currentBankDetail.status);
    setEditLink(currentBankDetail.link);
    setEditPic(currentBankDetail.pic || 'Admin');
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateResearchCell(item.id, activeBankSlug, {
      merk: editMerk,
      status: editStatus,
      link: editLink,
      url: editLink.match(/https?:\/\/[^\s\)\;\,]+/)?.[0] || '',
      pic: editPic
    });
    setIsEditing(false);
  };

  const handleCopyCitation = () => {
    const text = `[${item.workshop}] Domain: ${item.domain} | Kategori: ${item.kategori} | Kapabilitas: ${item.kapabilitas}\nBank: ${currentBankDetail.bankCode}\nMerk/Stack: ${currentBankDetail.merk}\nStatus: ${currentBankDetail.status}\nLink/Sumber: ${currentBankDetail.link}\nPIC: ${currentBankDetail.pic}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusBadge = (status: VerificationStatus) => {
    switch (status) {
      case 'Terverifikasi':
        return {
          bg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
          dot: 'bg-emerald-500',
          label: 'Terverifikasi (Fakta Resmi / Dokumen Publik)'
        };
      case 'Inferensi':
        return {
          bg: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
          dot: 'bg-amber-400',
          label: 'Inferensi (Korelasi Industri / Pola Teknis)'
        };
      default:
        return {
          bg: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
          dot: 'bg-rose-400',
          label: 'Belum Terdata / Evaluasi (–)'
        };
    }
  };

  const currentStatusBadge = getStatusBadge(currentBankDetail.status);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden text-white animate-in fade-in zoom-in-95 duration-150"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-slate-800/80 border-b border-slate-700/80 flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2 text-xs font-mono">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500 text-white font-extrabold text-[10px]">
                {item.workshop}
              </span>
              <span className="text-slate-400">#{item.no}</span>
              <span className="text-slate-500">·</span>
              <span className="text-orange-400 font-bold">{item.domain}</span>
              <span className="text-slate-500">·</span>
              <span className="px-2 py-0.5 rounded bg-slate-700/80 text-slate-300 text-[10px]">
                {item.kategori}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
              {item.kapabilitas}
            </h2>
          </div>

          <button
            onClick={() => setSelectedResearchCell(null)}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 6 Banks Tab Selector */}
        <div className="px-6 py-3 bg-slate-950/50 border-b border-slate-800 flex items-center space-x-2 overflow-x-auto scrollbar-none">
          <span className="text-xs text-slate-400 font-bold mr-1 uppercase tracking-wider text-[10px]">Bank:</span>
          {['bri', 'mandiri', 'bca', 'bni', 'btn', 'bsi'].map(slug => {
            const b = item.banks[slug];
            const isActive = activeBankSlug === slug;
            const isBRI = slug === 'bri';
            const statusColor = b?.status === 'Terverifikasi' ? 'bg-emerald-500' : b?.status === 'Inferensi' ? 'bg-amber-400' : 'bg-slate-600';

            return (
              <button
                key={slug}
                onClick={() => {
                  setActiveBankSlug(slug);
                  setIsEditing(false);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-2 whitespace-nowrap ${
                  isActive
                    ? isBRI 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30 ring-2 ring-blue-400'
                      : 'bg-slate-700 text-white shadow-md'
                    : 'bg-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${statusColor}`} />
                <span className="uppercase">{slug}</span>
                {b?.status === 'Terverifikasi' && <span className="text-[10px]">✓</span>}
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 text-xs max-h-[70vh] overflow-y-auto">
          {/* Active Bank Overview Card */}
          <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/80 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-700/60">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{currentBankObj?.logo || '🏦'}</span>
                <div>
                  <div className="font-extrabold text-base text-white flex items-center space-x-2">
                    <span>{currentBankObj?.nama || currentBankDetail.bankCode}</span>
                    {activeBankSlug === 'bri' && (
                      <span className="px-2 py-0.5 rounded bg-blue-600 text-white text-[9px] font-black uppercase">
                        Target Analisis
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    PIC Penguji Data: <strong className="text-slate-200">{currentBankDetail.pic || 'Admin'}</strong>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className={`px-3 py-1.5 rounded-xl border flex items-center space-x-2 ${currentStatusBadge.bg}`}>
                <span className={`w-2 h-2 rounded-full ${currentStatusBadge.dot}`} />
                <span className="font-bold text-xs">{currentBankDetail.status}</span>
              </div>
            </div>

            {/* Readonly View vs Edit Form */}
            {!isEditing ? (
              <div className="space-y-4">
                {/* Tech Merk Display */}
                <div>
                  <span className="text-slate-400 font-mono text-[11px] block uppercase tracking-wider mb-1">
                    Merk / Stack Name yang Digunakan:
                  </span>
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 text-sm font-black text-blue-300 whitespace-pre-line leading-relaxed">
                    {formatDashLineBreaks(currentBankDetail.merk) || 'Belum Diketahui / TBD'}
                  </div>
                </div>

                {/* Evidence / Source Link */}
                <div>
                  <span className="text-slate-400 font-mono text-[11px] block uppercase tracking-wider mb-1">
                    Link Rujukan & Bukti Sumber:
                  </span>
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-2">
                    {currentBankDetail.link ? (
                      <>
                        <p className="text-slate-300 leading-relaxed font-sans text-xs">
                          {currentBankDetail.link}
                        </p>
                        {currentBankDetail.url && (
                          <div className="pt-2 border-t border-slate-800">
                            <a
                              href={currentBankDetail.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 transition font-bold text-[11px]"
                            >
                              <span>Buka Sumber Rujukan Asli</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-slate-500 italic py-1">
                        Belum ada rujukan publik yang tercatat untuk kapabilitas ini.
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions Bar */}
                <div className="flex items-center justify-between pt-2 flex-wrap gap-2">
                  <button
                    onClick={handleCopyCitation}
                    className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold transition"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
                    <span>{copied ? 'Berhasil Disalin!' : 'Salin Kutipan Riset'}</span>
                  </button>

                  {canEdit && (
                    <button
                      onClick={handleStartEdit}
                      className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition shadow-md shadow-blue-900/30"
                    >
                      <Save className="w-4 h-4" />
                      <span>Edit Data Kapabilitas</span>
                    </button>
                  )}
                </div>
              </div>
            ) : (
              /* Inline Edit Form for Admin / Analyst */
              <form onSubmit={handleSave} className="space-y-4 pt-2">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">
                    Merk / Stack Name:
                  </label>
                  <input
                    type="text"
                    value={editMerk}
                    onChange={e => setEditMerk(e.target.value)}
                    placeholder="Misal: Silverlake SIBS, SAP ERP, Red Hat OpenShift..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 font-bold block mb-1">
                      Status Verifikasi:
                    </label>
                    <select
                      value={editStatus}
                      onChange={e => setEditStatus(e.target.value as VerificationStatus)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                    >
                      <option value="Terverifikasi">Terverifikasi (Terbukti di Publik/Laporan)</option>
                      <option value="Inferensi">Inferensi (Indikasi Industri/Korelasi)</option>
                      <option value="Belum">Belum Diketahui / TBD</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-300 font-bold block mb-1">
                      PIC Pencatat:
                    </label>
                    <input
                      type="text"
                      value={editPic}
                      onChange={e => setEditPic(e.target.value)}
                      placeholder="Admin"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">
                    Link / Sumber Rujukan:
                  </label>
                  <textarea
                    rows={3}
                    value={editLink}
                    onChange={e => setEditLink(e.target.value)}
                    placeholder="URL rujukan artikel berita, rilis resmi, atau studi kasus..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                  />
                </div>

                <div className="flex items-center justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold transition"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition shadow-md shadow-emerald-900/30"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
