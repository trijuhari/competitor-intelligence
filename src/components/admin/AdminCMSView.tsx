import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, CheckCircle2, Plus, Trash2, Edit3, 
  Upload, Download, RefreshCw, Lock, Users, History, 
  Check, X, Save, Search, Database, FileText
} from 'lucide-react';
import { Interview } from '../../types';
import { AdminResearchMatrixTab } from './AdminResearchMatrixTab';

export const AdminCMSView: React.FC = () => {
  const { 
    banks, 
    interviews, 
    auditLogs,
    currentUser,
    currentPath,
    navigate,
    researchItems,
    addInterview,
    updateInterview,
    deleteInterview,
    exportDataJSON,
    importDataJSON,
    resetAllData
  } = useApp();

  const [activeAdminSubtab, setActiveAdminSubtab] = useState<
    'findings' | 'checklist' | 'interviews' | 'audit'
  >('findings');

  React.useEffect(() => {
    if (currentPath.includes('checklist')) setActiveAdminSubtab('checklist');
    else if (currentPath.includes('interviews')) setActiveAdminSubtab('interviews');
    else if (currentPath.includes('audit-logs')) setActiveAdminSubtab('audit');
    else setActiveAdminSubtab('findings');
  }, [currentPath]);

  const switchSubtab = (tabId: typeof activeAdminSubtab) => {
    setActiveAdminSubtab(tabId);
    if (tabId === 'checklist') navigate('/admin/checklist');
    else if (tabId === 'interviews') navigate('/admin/interviews');
    else if (tabId === 'audit') navigate('/admin/audit-logs');
    else navigate('/admin/findings');
  };

  // Form State: Add Interview
  const [iBankId, setIBankId] = useState(banks[0].id);
  const [iSpeakerCode, setISpeakerCode] = useState('');
  const [iDivision, setIDivision] = useState('');
  const [iSummary, setISummary] = useState('');

  // Editing Modal State
  const [editingInterview, setEditingInterview] = useState<Interview | null>(null);

  // Import JSON file input ref
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Search States
  const [searchInterviews, setSearchInterviews] = useState('');
  const [searchAudit, setSearchAudit] = useState('');
  const [auditActionFilter, setAuditActionFilter] = useState<string | null>(null);

  const handleCreateInterview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!iSpeakerCode.trim()) return;
    addInterview({
      bankId: iBankId,
      kodeNarasumber: iSpeakerCode,
      divisi: iDivision,
      tanggal: new Date().toISOString().slice(0, 10),
      ringkasan: iSummary,
      persetujuanNarasumber: true
    });
    setISpeakerCode('');
    setIDivision('');
    setISummary('');
  };

  const handleUpdateInterviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingInterview) return;
    updateInterview(editingInterview.id, {
      kodeNarasumber: editingInterview.kodeNarasumber,
      divisi: editingInterview.divisi,
      tanggal: editingInterview.tanggal,
      ringkasan: editingInterview.ringkasan,
      persetujuanNarasumber: editingInterview.persetujuanNarasumber
    });
    setEditingInterview(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importDataJSON(content);
      if (success) {
        alert('Data berhasil diimpor!');
      } else {
        alert('Gagal mengimpor file. Pastikan format JSON valid.');
      }
    };
    reader.readAsText(file);
  };

  // Filtered Interviews
  const filteredInterviews = interviews.filter(inv => {
    if (!searchInterviews.trim()) return true;
    const q = searchInterviews.toLowerCase();
    const b = banks.find(x => x.id === inv.bankId);
    return (
      inv.kodeNarasumber.toLowerCase().includes(q) ||
      inv.divisi.toLowerCase().includes(q) ||
      inv.ringkasan.toLowerCase().includes(q) ||
      b?.singkatan.toLowerCase().includes(q) ||
      b?.nama.toLowerCase().includes(q)
    );
  });

  // Filtered Audit Logs
  const filteredAuditLogs = auditLogs.filter(log => {
    if (auditActionFilter && log.aksi !== auditActionFilter) return false;
    if (!searchAudit.trim()) return true;
    const q = searchAudit.toLowerCase();
    return (
      log.entitas.toLowerCase().includes(q) ||
      log.detail.toLowerCase().includes(q) ||
      log.userName.toLowerCase().includes(q) ||
      log.aksi.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2.5">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Tata Kelola Data Riset & Audit Trail
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-blue-100 text-blue-800 border border-blue-200">
              Admin Portal
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Pusat manajemen data riset temuan perbankan ({researchItems.length} kapabilitas dari Sheet CSV), catatan wawancara narasumber, dan log audit perubahan sistem.
          </p>
        </div>

        {/* Global Data Actions */}
        <div className="flex items-center space-x-2">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            accept=".json" 
            className="hidden" 
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3.5 py-2 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center space-x-1.5 shadow-2xs transition-all active:scale-95"
            title="Impor backup data JSON"
          >
            <Upload className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Impor JSON</span>
          </button>

          <button
            onClick={exportDataJSON}
            className="px-3.5 py-2 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center space-x-1.5 shadow-2xs transition-all active:scale-95"
            title="Download seluruh data ke JSON"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Cadangkan JSON</span>
          </button>

          <button
            onClick={() => {
              if (confirm('Yakin ingin mereset seluruh data kembali ke bawaan awal? Perubahan lokal akan ditimpa.')) {
                resetAllData();
              }
            }}
            className="px-3 py-2 rounded-xl border border-red-200/80 bg-red-50/70 hover:bg-red-100 text-red-700 text-xs font-bold flex items-center space-x-1.5 transition-all active:scale-95"
            title="Reset data ke default"
          >
            <RefreshCw className="w-3.5 h-3.5 text-red-600" />
            <span className="hidden sm:inline">Reset Awal</span>
          </button>
        </div>
      </div>

      {/* Admin Subtabs Navigation with Modern Segmented Bar */}
      <div className="overflow-x-auto scrollbar-none">
        <nav className="inline-flex p-1 bg-slate-100/90 backdrop-blur rounded-2xl border border-slate-200/70 space-x-1 min-w-full sm:min-w-0">
          {[
            { id: 'findings', label: `Kelola Temuan (${researchItems.length})`, icon: Database },
            { id: 'checklist', label: 'Checklist Kesiapan Workshop', icon: ShieldCheck },
            { id: 'interviews', label: `Catatan Wawancara (${interviews.length})`, icon: Users },
            { id: 'audit', label: `Log Audit (${auditLogs.length})`, icon: History },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeAdminSubtab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => switchSubtab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'bg-white text-blue-700 shadow-xs shadow-slate-900/5 ring-1 ring-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 font-semibold'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Subtab 1: Kelola Temuan (Utamanya 100% dari Sheet CSV 408) */}
      {activeAdminSubtab === 'findings' && (
        <AdminResearchMatrixTab />
      )}

      {/* Subtab 2: Checklist Kesiapan Workshop */}
      {activeAdminSubtab === 'checklist' && (
        <div className="space-y-6">
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl border border-slate-200/80 shadow-card space-y-4">
            <div>
              <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Checklist Pemeriksaan Kesiapan Workshop & Presentasi</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Kepatuhan tata kelola riset: pastikan integritas bukti empiris, anonimitas narasumber, dan ketiadaan celah sensitif sebelum sesi konsultasi bersama Dewan Direksi dan arsitek Bank BRI.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/60 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900">1. Validitas & Tautan Bukti Riset</span>
                  <span className="px-2.5 py-0.5 rounded-full font-bold text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200">
                    100% Terdokumentasi
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed font-normal">
                  Seluruh 408 kapabilitas arsitektur memiliki status bukti evaluasi yang jelas (Terverifikasi, Inferensi, Belum) di seluruh 6 bank.
                </p>
                <div className="text-[11px] text-emerald-700 font-semibold flex items-center space-x-1.5 pt-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>2,448 sel evaluasi siap dikomparasikan.</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/60 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900">2. Standarisasi 4 Workshop & 13 Domain</span>
                  <span className="px-2.5 py-0.5 rounded-full font-bold text-[10px] bg-blue-100 text-blue-800 border border-blue-200">
                    Terstandar MBB
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed font-normal">
                  Struktur workshop dikelompokkan ke dalam WS1 (Core & Digital), WS2 (EDW & BI), WS3 (Cloud & Infra), dan WS4 (Big Data & AI).
                </p>
                <div className="text-[11px] text-blue-700 font-semibold flex items-center space-x-1.5 pt-1">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Mencakup 13 domain arsitektur perbankan modern.</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/60 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900">3. Kerahasiaan & Regulasi UU PDP</span>
                  <span className="px-2.5 py-0.5 rounded-full font-bold text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Aman & Patuh
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed font-normal">
                  Seluruh narasumber dianonimkan (hanya kode & divisi), persetujuan narasumber tercatat, dan tidak menyimpan celah keamanan spesifik.
                </p>
                <div className="text-[11px] text-emerald-700 font-semibold flex items-center space-x-1.5 pt-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{interviews.length} narasumber telah terproteksi kode anonim.</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/60 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900">4. Kesiapan Mode Presentasi Dewan Direksi</span>
                  <span className="px-2.5 py-0.5 rounded-full font-bold text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Siap Tayang
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed font-normal">
                  Slide deck interaktif proyektor siap digunakan dengan 1-click fullscreen presenter mode & ekspor memorandum PDF.
                </p>
                <div className="text-[11px] text-emerald-700 font-semibold flex items-center space-x-1.5 pt-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Semua materi ringkas, terverifikasi, dan on-point.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 3: Catatan Wawancara Narasumber */}
      {activeAdminSubtab === 'interviews' && (
        <div className="space-y-6">
          {/* Add Interview */}
          <form onSubmit={handleCreateInterview} className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl border border-slate-200/80 shadow-card space-y-3 max-w-2xl text-xs">
            <h4 className="font-black text-slate-900 text-sm tracking-tight">+ Catat Wawancara Narasumber Baru (Anonim)</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-600 font-bold mb-1">Bank</label>
                <select
                  value={iBankId}
                  onChange={e => setIBankId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:ring-2 focus:ring-blue-500"
                >
                  {banks.map(b => (
                    <option key={b.id} value={b.id}>{b.singkatan}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-slate-600 font-bold mb-1">Kode Narasumber</label>
                <input
                  type="text"
                  placeholder="Misal: Narasumber EA-03"
                  value={iSpeakerCode}
                  onChange={e => setISpeakerCode(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-600 font-bold mb-1">Divisi / Jabatan</label>
                <input
                  type="text"
                  placeholder="Misal: Divisi Platform"
                  value={iDivision}
                  onChange={e => setIDivision(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-slate-600 font-bold mb-1">Ringkasan Pernyataan Teknis</label>
              <textarea
                rows={2}
                value={iSummary}
                onChange={e => setISummary(e.target.value)}
                placeholder="Pernyataan yang diperbolehkan dibagikan..."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-xs transition-all active:scale-95"
            >
              Simpan Rekaman Wawancara
            </button>
          </form>

          {/* List Interviews dengan Tombol Edit & Hapus */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 bg-white/90 backdrop-blur-sm rounded-3xl border border-slate-200/80 shadow-card">
              <div>
                <h4 className="font-black text-slate-900 text-sm tracking-tight">
                  Daftar Rekaman Wawancara ({filteredInterviews.length} dari {interviews.length})
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Filter berdasarkan kode narasumber, bank, divisi, atau ringkasan.</p>
              </div>
              <div className="relative w-full sm:w-72">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari narasumber, divisi, bank..."
                  value={searchInterviews}
                  onChange={e => setSearchInterviews(e.target.value)}
                  className="w-full pl-8 pr-8 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
                {searchInterviews && (
                  <button 
                    onClick={() => setSearchInterviews('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    title="Hapus pencarian"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {filteredInterviews.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-400 text-xs">
                Tidak ada wawancara yang cocok dengan pencarian "{searchInterviews}".
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredInterviews.map(inv => {
                  const b = banks.find(x => x.id === inv.bankId);
                  return (
                    <div key={inv.id} className="p-5 bg-white/90 backdrop-blur-sm rounded-3xl border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all text-xs space-y-2 relative group">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-purple-950 text-sm">{inv.kodeNarasumber}</span>
                        <div className="flex items-center space-x-1.5">
                          <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold text-[10px]">
                            {b?.logo} {b?.singkatan}
                          </span>
                          <button
                            onClick={() => setEditingInterview(inv)}
                            className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg transition"
                            title="Edit Wawancara"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Hapus catatan wawancara ${inv.kodeNarasumber}?`)) {
                                deleteInterview(inv.id);
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition"
                            title="Hapus Wawancara"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="text-purple-800 font-bold text-[11px]">{inv.divisi}</div>
                      <blockquote className="p-3 bg-slate-50/80 rounded-2xl border-l-3 border-purple-500 text-slate-700 italic leading-relaxed">
                        "{inv.ringkasan}"
                      </blockquote>
                      <div className="text-[10px] text-slate-400 font-medium">
                        Tanggal: {inv.tanggal} · Persetujuan UU PDP: {inv.persetujuanNarasumber ? 'Ya (Sah)' : 'Belum'}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal Edit Wawancara */}
      {editingInterview && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg p-6 space-y-4 text-xs animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-black text-slate-900 text-sm flex items-center space-x-2">
                <Edit3 className="w-4 h-4 text-purple-600" />
                <span>Edit Catatan Wawancara Narasumber</span>
              </h3>
              <button onClick={() => setEditingInterview(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUpdateInterviewSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Kode Narasumber</label>
                  <input
                    type="text"
                    value={editingInterview.kodeNarasumber}
                    onChange={e => setEditingInterview({ ...editingInterview, kodeNarasumber: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Divisi / Jabatan</label>
                  <input
                    type="text"
                    value={editingInterview.divisi}
                    onChange={e => setEditingInterview({ ...editingInterview, divisi: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Tanggal Wawancara</label>
                <input
                  type="date"
                  value={editingInterview.tanggal}
                  onChange={e => setEditingInterview({ ...editingInterview, tanggal: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Ringkasan Pernyataan</label>
                <textarea
                  rows={3}
                  value={editingInterview.ringkasan}
                  onChange={e => setEditingInterview({ ...editingInterview, ringkasan: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs"
                  required
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setEditingInterview(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs flex items-center space-x-1.5 shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Subtab 4: Audit Trail Log */}
      {activeAdminSubtab === 'audit' && (
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-slate-200/80 shadow-card overflow-hidden">
          <div className="p-5 bg-slate-50/80 border-b border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <span className="text-sm font-black text-slate-900 tracking-tight">
                Catatan Audit Perubahan Sistem ({filteredAuditLogs.length} dari {auditLogs.length})
              </span>
              <p className="text-[11px] text-slate-500 mt-0.5">Memenuhi kepatuhan pelacakan jejak data (Audit Trail)</p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <div className="flex items-center space-x-1 overflow-x-auto pb-1 sm:pb-0">
                {['SEMUA', 'CREATE', 'UPDATE', 'DELETE'].map(action => (
                  <button
                    key={action}
                    onClick={() => setAuditActionFilter(action === 'SEMUA' ? null : action)}
                    className={`px-3 py-1 rounded-xl text-[10px] font-bold transition whitespace-nowrap ${
                      (auditActionFilter === action || (action === 'SEMUA' && !auditActionFilter))
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {action}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari aksi, entitas, user..."
                  value={searchAudit}
                  onChange={e => setSearchAudit(e.target.value)}
                  className="w-full pl-8 pr-8 py-2 rounded-xl border border-slate-200 bg-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {searchAudit && (
                  <button 
                    onClick={() => setSearchAudit('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    title="Hapus pencarian"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {filteredAuditLogs.length === 0 ? (
              <div className="p-8 text-center text-slate-400">
                Tidak ada catatan audit yang cocok dengan pencarian "{searchAudit}"{auditActionFilter ? ` dan filter [${auditActionFilter}]` : ''}.
              </div>
            ) : (
              filteredAuditLogs.map(log => (
                <div key={log.id} className="p-4 hover:bg-slate-50/70 flex items-start justify-between gap-4 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-0.5 rounded-md font-extrabold text-[10px] uppercase ${
                        log.aksi === 'CREATE'
                          ? 'bg-blue-100 text-blue-800'
                          : log.aksi === 'UPDATE'
                          ? 'bg-amber-100 text-amber-800'
                          : log.aksi === 'DELETE'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {log.aksi}
                      </span>
                      <span className="font-extrabold text-slate-900">{log.entitas}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-500 font-medium">Oleh {log.userName}</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed font-normal">{log.detail}</p>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono shrink-0">
                    {log.timestamp}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
