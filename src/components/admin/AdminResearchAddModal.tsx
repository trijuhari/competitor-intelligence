import React, { useState } from 'react';
import { 
  X, Plus, Save, Layers, Building2, CheckCircle2, 
  AlertTriangle, HelpCircle, ExternalLink 
} from 'lucide-react';
import { ResearchItem, VerificationStatus, BankCapabilityDetail } from '../../types';

interface AdminResearchAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: Omit<ResearchItem, 'id' | 'no'>) => Promise<void>;
}

const BANK_TABS = [
  { key: 'bri', label: 'BRI (Fokus)', code: 'BRI' },
  { key: 'mandiri', label: 'Mandiri', code: 'Mandiri' },
  { key: 'bca', label: 'BCA', code: 'BCA' },
  { key: 'bni', label: 'BNI', code: 'BNI' },
  { key: 'btn', label: 'BTN', code: 'BTN' },
  { key: 'bsi', label: 'BSI', code: 'BSI' }
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

export const AdminResearchAddModal: React.FC<AdminResearchAddModalProps> = ({
  isOpen,
  onClose,
  onAdd
}) => {
  if (!isOpen) return null;

  const [workshop, setWorkshop] = useState('WS1');
  const [domain, setDomain] = useState(DOMAINS_LIST[0]);
  const [kategori, setKategori] = useState(CATEGORIES_LIST[0]);
  const [kapabilitas, setKapabilitas] = useState('');

  const [banksData, setBanksData] = useState<Record<string, BankCapabilityDetail>>(() => {
    const init: Record<string, BankCapabilityDetail> = {};
    BANK_TABS.forEach(b => {
      init[b.key] = {
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

  const [activeBankSlug, setActiveBankSlug] = useState('bri');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeBank = banksData[activeBankSlug];

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
      alert('Nama kapabilitas/sistem yang dicari wajib diisi!');
      return;
    }

    try {
      setIsSubmitting(true);
      await onAdd({
        workshop,
        domain,
        kategori,
        kapabilitas: kapabilitas.trim(),
        banks: banksData
      });
      // Reset form
      setKapabilitas('');
      onClose();
    } catch (err: any) {
      alert('Gagal menambahkan kapabilitas: ' + (err?.message || 'Terjadi kesalahan'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-2xl shadow-2xl border border-line w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden text-xs animate-in fade-in zoom-in-95 duration-100">
        {/* Header */}
        <div className="p-4 bg-blue-600 dark:bg-blue-700 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Plus className="w-5 h-5 text-blue-200" />
            <div>
              <h3 className="font-extrabold text-sm leading-tight">
                Tambah Kapabilitas Riset Baru (Sheet CSV)
              </h3>
              <p className="text-[11px] text-blue-100">
                Daftarkan kapabilitas/sistem teknologi baru dan inisialisasi status di 6 bank
              </p>
            </div>
          </div>
          <button 
            type="button" 
            onClick={onClose} 
            className="text-blue-200 hover:text-white p-1 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Section 1: Meta */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 space-y-3">
            <span className="font-extrabold text-slate-800 dark:text-slate-200 text-xs uppercase tracking-wider flex items-center space-x-1.5">
              <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>1. Klasifikasi Kapabilitas</span>
            </span>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                Kapabilitas / Sistem yang Dicari <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={2}
                value={kapabilitas}
                onChange={e => setKapabilitas(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
                placeholder="Contoh: Real-Time Fraud Detection Engine / API Gateway Enterprise"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Workshop</label>
                <select
                  value={workshop}
                  onChange={e => setWorkshop(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium text-slate-900 dark:text-slate-100"
                >
                  <option value="WS1">WS1: Core & Digital Banking</option>
                  <option value="WS2">WS2: EDW, MDM & BI</option>
                  <option value="WS3">WS3: Cloud, Infra & ITSM</option>
                  <option value="WS4">WS4: Big Data & AI</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Domain</label>
                <input
                  type="text"
                  list="add-domains-datalist"
                  value={domain}
                  onChange={e => setDomain(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium text-slate-900 dark:text-slate-100"
                  required
                />
                <datalist id="add-domains-datalist">
                  {DOMAINS_LIST.map(d => (
                    <option key={d} value={d} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Kategori</label>
                <input
                  type="text"
                  list="add-categories-datalist"
                  value={kategori}
                  onChange={e => setKategori(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium text-slate-900 dark:text-slate-100"
                  required
                />
                <datalist id="add-categories-datalist">
                  {CATEGORIES_LIST.map(k => (
                    <option key={k} value={k} />
                  ))}
                </datalist>
              </div>
            </div>
          </div>

          {/* Section 2: Bank Data (Optional pre-fill) */}
          <div className="bg-white dark:bg-slate-850 p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="font-extrabold text-slate-800 dark:text-slate-200 text-xs uppercase tracking-wider flex items-center space-x-1.5">
                <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>2. Evaluasi Implementasi di 6 Bank (Opsional)</span>
              </span>
              <span className="text-[11px] text-slate-400 dark:text-slate-500">
                Dapat diisi sekarang atau dilengkapi nanti.
              </span>
            </div>

            {/* Bank Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
              {BANK_TABS.map(b => {
                const bDetail = banksData[b.key];
                const isActive = activeBankSlug === b.key;

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
                    <span className="font-extrabold text-xs text-slate-900 dark:text-white">{b.label}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 truncate">
                      {bDetail.status}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Bank Fields */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/60 dark:bg-slate-800/40 space-y-3">
              <div className="font-bold text-xs text-slate-800 dark:text-slate-200">
                Rincian Evaluasi Bank {activeBank.bankCode}:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                    Nama Merk / Solusi Arsitektur
                  </label>
                  <input
                    type="text"
                    value={activeBank.merk}
                    onChange={e => handleBankChange('merk', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold"
                    placeholder="Contoh: IBM InfoSphere DataStage"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                    Status Verifikasi
                  </label>
                  <select
                    value={activeBank.status}
                    onChange={e => handleBankChange('status', e.target.value as VerificationStatus)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold text-slate-900 dark:text-slate-100"
                  >
                    <option value="Belum">– Belum (Belum Ada Data Terkonfirmasi)</option>
                    <option value="Terverifikasi">✓ Terverifikasi (Sumber Resmi)</option>
                    <option value="Inferensi">⚠ Inferensi (Sinyal Publik / Korelasi)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                  Link / Sumber Bukti Rujukan
                </label>
                <textarea
                  rows={2}
                  value={activeBank.link}
                  onChange={e => {
                    const val = e.target.value;
                    handleBankChange('link', val);
                    const matchUrl = val.match(/https?:\/\/[^\s\)]+/);
                    if (matchUrl) handleBankChange('url', matchUrl[0]);
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono text-xs"
                  placeholder="https://... atau Gartner MQ..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">URL Langsung</label>
                  <input
                    type="url"
                    value={activeBank.url || ''}
                    onChange={e => handleBankChange('url', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono text-[11px]"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Dicatat oleh (PIC)</label>
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

          {/* Footer Actions */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 font-semibold"
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center space-x-1.5 shadow-xs transition disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSubmitting ? 'Menyimpan...' : 'Daftarkan Kapabilitas Baru'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
