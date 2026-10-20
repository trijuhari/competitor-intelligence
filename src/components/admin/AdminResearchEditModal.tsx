import React, { useState } from 'react';
import { 
  X, Save, Trash2, ExternalLink, ShieldCheck, CheckCircle2, 
  AlertTriangle, HelpCircle, Building2, UserCheck, Layers, Cpu, Link as LinkIcon
} from 'lucide-react';
import { ResearchItem, VerificationStatus, BankCapabilityDetail } from '../../types';

interface AdminResearchEditModalProps {
  item: ResearchItem;
  isOpen: boolean;
  onClose: () => void;
  onSave: (capId: string, updates: Partial<ResearchItem>) => Promise<void>;
  onDelete: (capId: string) => Promise<void>;
}

const BANK_TABS = [
  { key: 'bri', label: 'BRI (Fokus)', code: 'BRI', color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-300' },
  { key: 'mandiri', label: 'Mandiri', code: 'Mandiri', color: 'text-yellow-700', bg: 'bg-yellow-50', border: 'border-yellow-300' },
  { key: 'bca', label: 'BCA', code: 'BCA', color: 'text-blue-800', bg: 'bg-blue-50', border: 'border-blue-300' },
  { key: 'bni', label: 'BNI', code: 'BNI', color: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-300' },
  { key: 'btn', label: 'BTN', code: 'BTN', color: 'text-sky-700', bg: 'bg-sky-50', border: 'border-sky-300' },
  { key: 'bsi', label: 'BSI', code: 'BSI', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-300' }
];

const DOMAINS_LIST = [
  'Core Banking System (CBS)',
  'Mobile Banking',
  'Internet Banking',
  'Digital Banking',
  'Enterprise Data Warehouse (EDW)',
  'Master Data Management (MDM)',
  'Business Intelligence (BI)',
  'Cloud Technology',
  'Infrastructure',
  'Network',
  'IT Support (ITSM)',
  'Big Data Analytics',
  'AI Technology'
];

const CATEGORIES_LIST = [
  'Software/Sistem',
  'Tool',
  'Hardware',
  'Arsitektur',
  'Standar/Protokol',
  'Keamanan',
  'Metrik/Benchmark',
  'Layanan/Komersial',
  'Regulasi'
];

export const AdminResearchEditModal: React.FC<AdminResearchEditModalProps> = ({
  item,
  isOpen,
  onClose,
  onSave,
  onDelete
}) => {
  if (!isOpen) return null;

  // Metadata states
  const [workshop, setWorkshop] = useState(item.workshop || 'WS1');
  const [domain, setDomain] = useState(item.domain || '');
  const [kategori, setKategori] = useState(item.kategori || '');
  const [kapabilitas, setKapabilitas] = useState(item.kapabilitas || '');

  // 6 Banks states
  const [banksData, setBanksData] = useState<Record<string, BankCapabilityDetail>>(() => {
    const init: Record<string, BankCapabilityDetail> = {};
    BANK_TABS.forEach(b => {
      init[b.key] = item.banks[b.key] ? { ...item.banks[b.key] } : {
        bankCode: b.code,
        merk: '-',
        link: '',
        url: '',
        pic: 'Admin',
        status: 'Belum'
      };
    });
    return init;
  });

  const [activeBankSlug, setActiveBankSlug] = useState<string>('bri');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const activeBank = banksData[activeBankSlug] || {
    bankCode: activeBankSlug.toUpperCase(),
    merk: '-',
    link: '',
    url: '',
    pic: 'Admin',
    status: 'Belum'
  };

  const handleBankChange = (field: keyof BankCapabilityDetail, value: any) => {
    setBanksData(prev => ({
      ...prev,
      [activeBankSlug]: {
        ...prev[activeBankSlug],
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!kapabilitas.trim()) {
      alert('Nama Kapabilitas wajib diisi!');
      return;
    }

    try {
      setIsSubmitting(true);
      await onSave(item.id, {
        workshop,
        domain,
        kategori,
        kapabilitas,
        banks: banksData
      });
      onClose();
    } catch (err: any) {
      alert('Gagal menyimpan: ' + (err?.message || 'Terjadi kesalahan sistem'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (confirm(`Yakin ingin menghapus kapabilitas #${item.no}: "${item.kapabilitas}" beserta seluruh evaluasi 6 bank?`)) {
      try {
        setIsDeleting(true);
        await onDelete(item.id);
        onClose();
      } catch (err: any) {
        alert('Gagal menghapus: ' + (err?.message || 'Terjadi kesalahan sistem'));
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden text-xs animate-in fade-in zoom-in-95 duration-100">
        {/* Modal Header */}
        <div className="p-4 bg-slate-900 dark:bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <span className="px-2 py-0.5 rounded font-mono font-bold bg-blue-600 text-[11px]">
              No. {item.no}
            </span>
            <div>
              <h3 className="font-extrabold text-sm leading-tight text-white">
                Edit Kapabilitas Riset CSV (Sheet)
              </h3>
              <p className="text-[11px] text-slate-300">
                Pembaruan metadata kapabilitas dan evaluasi implementasi di 6 bank
              </p>
            </div>
          </div>
          <button 
            type="button" 
            onClick={onClose} 
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Section 1: Metadata Kapabilitas */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-slate-800 dark:text-slate-200 text-xs uppercase tracking-wider flex items-center space-x-1.5">
                <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>1. Metadata Kapabilitas Arsitektur</span>
              </span>
              <span className="text-[11px] text-slate-400 dark:text-slate-500">ID: {item.id}</span>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                Kapabilitas / Sistem yang Dicari <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={2}
                value={kapabilitas}
                onChange={e => setKapabilitas(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
                placeholder="Contoh: Core Banking System (CBS) / Mobile Banking App"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Workshop */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Workshop</label>
                <select
                  value={workshop}
                  onChange={e => setWorkshop(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="WS1">WS1: Core & Digital Banking</option>
                  <option value="WS2">WS2: EDW, MDM & BI</option>
                  <option value="WS3">WS3: Cloud, Infra & ITSM</option>
                  <option value="WS4">WS4: Big Data & AI</option>
                </select>
              </div>

              {/* Domain */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Domain</label>
                <input
                  type="text"
                  list="domains-datalist"
                  value={domain}
                  onChange={e => setDomain(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500"
                  placeholder="Pilih atau ketik domain"
                  required
                />
                <datalist id="domains-datalist">
                  {DOMAINS_LIST.map(d => (
                    <option key={d} value={d} />
                  ))}
                </datalist>
              </div>

              {/* Kategori */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Kategori</label>
                <input
                  type="text"
                  list="categories-datalist"
                  value={kategori}
                  onChange={e => setKategori(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500"
                  placeholder="Pilih atau ketik kategori"
                  required
                />
                <datalist id="categories-datalist">
                  {CATEGORIES_LIST.map(k => (
                    <option key={k} value={k} />
                  ))}
                </datalist>
              </div>
            </div>
          </div>

          {/* Section 2: Evaluasi 6 Bank */}
          <div className="bg-white dark:bg-slate-850 p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="font-extrabold text-slate-800 dark:text-slate-200 text-xs uppercase tracking-wider flex items-center space-x-1.5">
                <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>2. Evaluasi Implementasi di 6 Bank</span>
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Pilih tab bank di bawah untuk mengubah rincian merk, status, dan link bukti.
              </span>
            </div>

            {/* Bank Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
              {BANK_TABS.map(b => {
                const bDetail = banksData[b.key] || ({} as any);
                const isActive = activeBankSlug === b.key;
                const isVerified = bDetail.status === 'Terverifikasi';
                const isInference = bDetail.status === 'Inferensi';

                return (
                  <button
                    key={b.key}
                    type="button"
                    onClick={() => setActiveBankSlug(b.key)}
                    className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between ${
                      isActive 
                        ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/60 shadow-xs ring-2 ring-blue-500/20' 
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-xs text-slate-900 dark:text-white">{b.label}</span>
                      {isVerified ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      ) : isInference ? (
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      ) : (
                        <HelpCircle className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
                      )}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-1">
                      {bDetail.merk || '–'}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Bank Form */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/60 dark:bg-slate-800/40 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                <span className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center space-x-1.5">
                  <span>Bank {activeBank.bankCode}</span>
                  {activeBankSlug === 'bri' && (
                    <span className="px-2 py-0.2 bg-blue-600 text-white rounded text-[10px] font-bold">
                      FOKUS
                    </span>
                  )}
                </span>
                <span className="text-[11px] text-slate-400 dark:text-slate-500">
                  Status Saat Ini: <strong className="text-slate-700 dark:text-slate-300">{activeBank.status}</strong>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Merk / Solusi */}
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                    Nama Merk / Solusi Arsitektur
                  </label>
                  <input
                    type="text"
                    value={activeBank.merk}
                    onChange={e => handleBankChange('merk', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold"
                    placeholder="Contoh: IBM InfoSphere DataStage / Oracle CBS"
                  />
                </div>

                {/* Status Verifikasi */}
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                    Status Verifikasi
                  </label>
                  <select
                    value={activeBank.status}
                    onChange={e => handleBankChange('status', e.target.value as VerificationStatus)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold text-slate-900 dark:text-slate-100"
                  >
                    <option value="Terverifikasi">✓ Terverifikasi (Sumber Resmi Vendor/Bank)</option>
                    <option value="Inferensi">⚠ Inferensi (Sinyal Publik / Korelasi Arsitektur)</option>
                    <option value="Belum">– Belum (Belum Ada Data Terkonfirmasi)</option>
                  </select>
                </div>
              </div>

              {/* Link / Sumber Bukti */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1 flex items-center justify-between">
                  <span>Link / Sumber Bukti Rujukan</span>
                  {activeBank.url && (
                    <a 
                      href={activeBank.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1 text-[11px] font-medium"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Buka URL</span>
                    </a>
                  )}
                </label>
                <textarea
                  rows={3}
                  value={activeBank.link}
                  onChange={e => {
                    const val = e.target.value;
                    handleBankChange('link', val);
                    const matchUrl = val.match(/https?:\/\/[^\s\)]+/);
                    if (matchUrl) {
                      handleBankChange('url', matchUrl[0]);
                    }
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-mono"
                  placeholder="Masukkan URL atau kutipan bukti sumber, misalnya: https://infobanknews.com/... atau Gartner MQ..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* URL Langsung */}
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                    URL Langsung (Klik Aktif)
                  </label>
                  <input
                    type="url"
                    value={activeBank.url || ''}
                    onChange={e => handleBankChange('url', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono text-[11px]"
                    placeholder="https://..."
                  />
                </div>

                {/* PIC */}
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                    Dicatat oleh (PIC)
                  </label>
                  <input
                    type="text"
                    value={activeBank.pic || 'Admin'}
                    onChange={e => handleBankChange('pic', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                    placeholder="Admin"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between flex-wrap gap-2">
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting || isSubmitting}
              className="px-3 py-2 rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/60 text-red-700 dark:text-red-300 font-bold flex items-center space-x-1.5 transition disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
              <span>Hapus Kapabilitas Ini</span>
            </button>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 font-semibold transition"
              >
                Batal
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center space-x-1.5 shadow-xs transition disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isSubmitting ? 'Menyimpan...' : 'Simpan Seluruh Perubahan'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
