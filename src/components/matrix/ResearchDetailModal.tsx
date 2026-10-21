import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, ExternalLink, ShieldCheck, CheckCircle2, AlertTriangle, HelpCircle, 
  Building2, Cpu, Globe, UserCheck, Save, Copy, Check, ArrowRight,
  Sparkles, Link2
} from 'lucide-react';
import { VerificationStatus, BankCapabilityDetail } from '../../types';
import { formatDashLineBreaks } from '../../utils/helpers';
import { BankLogo } from '../common/BankLogo';
import { Button, Badge, StatusDot, StatusBadge, cn } from '../ui';

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

  const currentBankDetail: BankCapabilityDetail = (item.banks && item.banks[activeBankSlug]) || {
    bankCode: activeBankSlug.toUpperCase(),
    merk: '-',
    link: '',
    url: '',
    pic: 'Admin',
    status: 'Belum'
  };

  const currentBankObj = banks.find(
    b => b.slug?.toLowerCase() === activeBankSlug.toLowerCase() || b.singkatan?.toLowerCase() === activeBankSlug.toLowerCase()
  );

  const canEdit = false; // Mode Read-Only: Perubahan data dilakukan terpusat via Google Sheets

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

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/50 flex items-center justify-center p-3 sm:p-5 animate-fade-in">
      <div 
        className="bg-surface border border-line rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden text-ink animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-sunken border-b border-line flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-accent text-white font-extrabold text-[10px]">
                {item.workshop}
              </span>
              <span className="text-subtle">#{item.no}</span>
              <span className="text-subtle">·</span>
              <span className="font-bold text-accent">{item.domain}</span>
              <span className="text-subtle">·</span>
              <span className="px-2 py-0.5 rounded-md bg-surface border border-line text-muted text-[10px]">
                {item.kategori}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight leading-snug">
              {item.kapabilitas}
            </h2>
          </div>

          <button
            onClick={() => setSelectedResearchCell(null)}
            className="p-2 text-subtle hover:text-ink rounded-xl hover:bg-sunken transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 6 Banks Tab Selector (Sleek Horizontal Pills) */}
        <div className="px-6 py-3 bg-sunken/40 border-b border-line flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-2xs text-subtle font-bold uppercase tracking-wider mr-1">Bank:</span>
          {['bri', 'mandiri', 'bca', 'bni', 'btn', 'bsi'].map(slug => {
            const b = item.banks[slug];
            const isActive = activeBankSlug === slug;
            const isBRI = slug === 'bri';

            return (
              <button
                key={slug}
                onClick={() => {
                  setActiveBankSlug(slug);
                  setIsEditing(false);
                }}
                className={cn(
                  'px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap border',
                  isActive
                    ? isBRI 
                      ? 'bg-accent text-white border-accent shadow-md shadow-blue-500/30'
                      : 'bg-surface text-ink border-line-strong shadow-xs'
                    : 'bg-surface/60 border-line text-muted hover:text-ink hover:bg-sunken'
                )}
              >
                <BankLogo bankCode={slug} size={16} />
                <span className="uppercase">{slug}</span>
                <StatusDot status={b?.status} />
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 text-xs max-h-[70vh] overflow-y-auto">
          {/* Active Bank Overview Card */}
          <div className="p-5 rounded-2xl bg-sunken/40 border border-line space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-3 pb-3.5 border-b border-line/80">
              <div className="flex items-center gap-3">
                <BankLogo bankCode={activeBankSlug} size={36} />
                <div>
                  <div className="font-bold text-base text-ink flex items-center gap-2">
                    <span>{currentBankObj?.nama || currentBankDetail.bankCode}</span>
                    {activeBankSlug === 'bri' && (
                      <span className="px-2 py-0.2 rounded-full bg-accent text-white text-[10px] font-bold">
                        Fokus Benchmark
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-muted font-mono mt-0.5">
                    PIC Penguji: <strong className="text-ink">{currentBankDetail.pic || 'Admin'}</strong>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <StatusBadge status={currentBankDetail.status} size="sm" />
            </div>

            {/* Readonly View vs Edit Form */}
            {!isEditing ? (
              <div className="space-y-4">
                {/* Tech Merk Display */}
                <div>
                  <span className="text-subtle font-mono text-[11px] block uppercase tracking-wider mb-1.5 font-bold">
                    Merk / Stack Name yang Digunakan:
                  </span>
                  <div className="p-4 rounded-xl bg-surface border border-line text-[13.5px] font-bold text-accent whitespace-pre-line leading-relaxed shadow-xs">
                    {formatDashLineBreaks(currentBankDetail.merk) || '– Belum Terdata –'}
                  </div>
                </div>

                {/* Evidence / Source Link */}
                <div>
                  <span className="text-subtle font-mono text-[11px] block uppercase tracking-wider mb-1.5 font-bold">
                    Link Rujukan &amp; Bukti Sumber:
                  </span>
                  <div className="p-4 rounded-xl bg-surface border border-line space-y-2.5 shadow-xs">
                    {currentBankDetail.link ? (
                      <>
                        <p className="text-ink leading-relaxed font-sans text-xs">
                          {currentBankDetail.link}
                        </p>
                        {currentBankDetail.url && (
                          <div className="pt-2 border-t border-line/60">
                            <a
                              href={currentBankDetail.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors font-bold text-xs"
                            >
                              <span>Buka Sumber Rujukan Asli</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-subtle italic py-1">
                        Belum ada rujukan publik yang tercatat untuk kapabilitas ini.
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions Bar */}
                <div className="flex items-center justify-between pt-2 flex-wrap gap-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleCopyCitation}
                    className="gap-2 font-semibold"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-subtle" />}
                    <span>{copied ? 'Berhasil Disalin!' : 'Salin Kutipan Riset'}</span>
                  </Button>

                  <div className="flex items-center gap-1.5 text-[11px] text-muted font-medium bg-surface-raised px-2.5 py-1.5 rounded-xl border border-line">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Tersinkronisasi dari Google Sheets (Read-Only)</span>
                  </div>
                </div>
              </div>
            ) : (
              /* Inline Edit Form for Admin */
              <form onSubmit={handleSave} className="space-y-4 pt-2">
                <div>
                  <label className="text-ink font-semibold block mb-1">
                    Merk / Stack Name:
                  </label>
                  <input
                    type="text"
                    value={editMerk}
                    onChange={e => setEditMerk(e.target.value)}
                    placeholder="Misal: Silverlake SIBS, SAP ERP, Red Hat OpenShift..."
                    className="w-full px-3 py-2 rounded-xl bg-surface border border-line text-ink focus:outline-none focus:border-accent text-xs"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-ink font-semibold block mb-1">
                      Status Verifikasi:
                    </label>
                    <select
                      value={editStatus}
                      onChange={e => setEditStatus(e.target.value as VerificationStatus)}
                      className="w-full px-3 py-2 rounded-xl bg-surface border border-line text-ink focus:outline-none focus:border-accent text-xs"
                    >
                      <option value="Terverifikasi">Terverifikasi (Terbukti Publik/Studi Kasus)</option>
                      <option value="Inferensi">Inferensi (Indikasi Industri/Lowongan Kerja)</option>
                      <option value="Belum">Belum Terdata / Evaluasi</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-ink font-semibold block mb-1">
                      PIC Pencatat:
                    </label>
                    <input
                      type="text"
                      value={editPic}
                      onChange={e => setEditPic(e.target.value)}
                      placeholder="Admin"
                      className="w-full px-3 py-2 rounded-xl bg-surface border border-line text-ink focus:outline-none focus:border-accent text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-ink font-semibold block mb-1">
                    Link / Sumber Rujukan:
                  </label>
                  <textarea
                    rows={3}
                    value={editLink}
                    onChange={e => setEditLink(e.target.value)}
                    placeholder="URL rujukan artikel berita, rilis resmi, atau studi kasus..."
                    className="w-full px-3 py-2 rounded-xl bg-surface border border-line text-ink focus:outline-none focus:border-accent text-xs"
                  />
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(false)}
                    className="font-semibold"
                  >
                    Batal
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    type="submit"
                    className="font-semibold"
                  >
                    Simpan Perubahan
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
