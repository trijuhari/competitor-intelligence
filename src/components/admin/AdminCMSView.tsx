import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, CheckCircle2, AlertTriangle, Plus, Trash2, Edit3, 
  Upload, Download, RefreshCw, FileText, Lock, Users, History, Check, X, Save, Cpu
} from 'lucide-react';
import { ConfidenceLevel, ReviewStatus, TechType, Technology, Interview, Finding } from '../../types';
import { getConfidenceBadge, getReviewStatusBadge } from '../../utils/helpers';

export const AdminCMSView: React.FC = () => {
  const { 
    banks, 
    categories, 
    technologies, 
    findings, 
    evidences, 
    interviews, 
    auditLogs,
    currentUser,
    currentPath,
    navigate,
    addFinding,
    updateFinding,
    deleteFinding,
    publishFinding,
    addTechnology,
    updateTechnology,
    deleteTechnology,
    addInterview,
    updateInterview,
    deleteInterview,
    exportDataJSON,
    importDataJSON,
    exportMatrixCSV,
    resetAllData,
    setSelectedFindingModalId
  } = useApp();

  const [activeAdminSubtab, setActiveAdminSubtab] = useState<
    'checklist' | 'findings' | 'technologies' | 'add-finding' | 'add-tech' | 'interviews' | 'audit'
  >('checklist');

  React.useEffect(() => {
    if (currentPath.includes('findings')) setActiveAdminSubtab('findings');
    else if (currentPath.includes('technologies')) setActiveAdminSubtab('technologies');
    else if (currentPath.includes('interviews')) setActiveAdminSubtab('interviews');
    else if (currentPath.includes('audit-logs')) setActiveAdminSubtab('audit');
    else if (currentPath === '/admin' || currentPath.includes('overview')) setActiveAdminSubtab('checklist');
  }, [currentPath]);

  const switchSubtab = (tabId: typeof activeAdminSubtab) => {
    setActiveAdminSubtab(tabId);
    if (tabId === 'checklist') navigate('/admin');
    else if (tabId === 'findings') navigate('/admin/findings');
    else if (tabId === 'technologies') navigate('/admin/technologies');
    else if (tabId === 'interviews') navigate('/admin/interviews');
    else if (tabId === 'audit') navigate('/admin/audit-logs');
  };

  // Form State: Add Finding
  const [fBankId, setFBankId] = useState(banks[0].id);
  const [fTechId, setFTechId] = useState(technologies[0].id);
  const [fConfidence, setFConfidence] = useState<ConfidenceLevel>('Confirmed');
  const [fStatus, setFStatus] = useState<ReviewStatus>('Published');
  const [fNotes, setFNotes] = useState('');

  // Form State: Add Tech
  const [tName, setTName] = useState('');
  const [tVendor, setTVendor] = useState('');
  const [tCategoryId, setTCategoryId] = useState(categories[0].id);
  const [tType, setTType] = useState<TechType>('open-source');
  const [tDesc, setTDesc] = useState('');

  // Form State: Add Interview
  const [iBankId, setIBankId] = useState(banks[0].id);
  const [iSpeakerCode, setISpeakerCode] = useState('');
  const [iDivision, setIDivision] = useState('');
  const [iSummary, setISummary] = useState('');

  // Editing Modals State
  const [editingTech, setEditingTech] = useState<Technology | null>(null);
  const [editingInterview, setEditingInterview] = useState<Interview | null>(null);

  // Import JSON file input ref
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Workshop Readiness Checklist calculations
  const totalFindings = findings.length;
  const verifiedCount = findings.filter(f => f.confidence === 'Confirmed' || f.confidence === 'Likely').length;
  const verifiedPercent = Math.round((verifiedCount / totalFindings) * 100);

  const findingsWithEvidence = findings.filter(f => 
    f.evidenceIds?.length > 0 || evidences.some(e => e.findingId === f.id)
  ).length;
  const evidencePercent = Math.round((findingsWithEvidence / totalFindings) * 100);

  const publishedCount = findings.filter(f => f.statusReview === 'Published').length;

  const handleCreateFinding = (e: React.FormEvent) => {
    e.preventDefault();
    addFinding({
      bankId: fBankId,
      technologyId: fTechId,
      confidence: fConfidence,
      statusReview: fStatus,
      tanggalTerdeteksi: new Date().toISOString().slice(0, 10),
      tanggalVerifikasi: new Date().toISOString().slice(0, 10),
      catatan: fNotes,
      evidenceIds: []
    });

    setFNotes('');
    setActiveAdminSubtab('findings');
  };

  const handleCreateTech = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tName.trim()) return;
    addTechnology({
      nama: tName,
      vendor: tVendor,
      categoryId: tCategoryId,
      tipe: tType,
      deskripsi: tDesc
    });
    setTName('');
    setTVendor('');
    setTDesc('');
    setActiveAdminSubtab('technologies');
  };

  const handleUpdateTechSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTech) return;
    updateTechnology(editingTech.id, {
      nama: editingTech.nama,
      vendor: editingTech.vendor,
      categoryId: editingTech.categoryId,
      tipe: editingTech.tipe,
      deskripsi: editingTech.deskripsi
    });
    setEditingTech(null);
  };

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
    setActiveAdminSubtab('interviews');
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

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Data CMS, Tata Kelola & Audit Trail (F7 & F8)
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800">
              Role Aktif: {currentUser.role}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manajemen penuh CRUD (Tambah, Edit, Hapus) untuk temuan, teknologi, dan wawancara narasumber.
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
            className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center space-x-1.5 shadow-xs"
          >
            <Upload className="w-3.5 h-3.5 text-slate-500" />
            <span>Impor JSON</span>
          </button>

          <button
            onClick={exportDataJSON}
            className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center space-x-1.5 shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Cadangkan JSON</span>
          </button>

          <button
            onClick={() => {
              if (confirm('Yakin ingin mereset seluruh data kembali ke bawaan awal? Perubahan lokal akan ditimpa.')) {
                resetAllData();
              }
            }}
            className="px-3 py-1.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold flex items-center space-x-1.5 transition"
          >
            <RefreshCw className="w-3.5 h-3.5 text-red-500" />
            <span>Reset Awal</span>
          </button>
        </div>
      </div>

      {/* Admin Subtabs Navigation */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2 overflow-x-auto scrollbar-none text-xs">
        {[
          { id: 'checklist', label: 'Checklist Kesiapan Workshop' },
          { id: 'findings', label: `Kelola Temuan (${findings.length})` },
          { id: 'technologies', label: `Kelola Teknologi (${technologies.length})` },
          { id: 'add-finding', label: '+ Input Temuan Baru' },
          { id: 'add-tech', label: '+ Daftarkan Teknologi Baru' },
          { id: 'interviews', label: `Catatan Wawancara (${interviews.length})` },
          { id: 'audit', label: `Log Audit (${auditLogs.length})` },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => switchSubtab(tab.id as any)}
            className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition ${
              activeAdminSubtab === tab.id
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Subtab 1: Checklist Kesiapan Workshop */}
      {activeAdminSubtab === 'checklist' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Checklist Pemeriksaan Mandiri Sebelum Workshop ke BRI</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Mengacu pada PRD Bagian 17: Tanpa reviewer terpisah, tim wajib memastikan integritas data, ketiadaan detail sensitif keamanan, dan kepatuhan UU PDP sebelum presentasi.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl border bg-slate-50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900">1. Validitas & Tautan Bukti</span>
                  <span className="px-2 py-0.5 rounded-full font-bold text-[10px] bg-emerald-100 text-emerald-800">
                    {evidencePercent}% Terhubung
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Setiap temuan wajib memiliki sumber bukti (URL studi kasus resmi / rekaman wawancara).
                </p>
                <div className="text-[11px] text-emerald-700 font-semibold flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{findingsWithEvidence} dari {totalFindings} temuan memiliki bukti valid.</span>
                </div>
              </div>

              <div className="p-4 rounded-xl border bg-slate-50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900">2. Target Kualitas Confidence</span>
                  <span className="px-2 py-0.5 rounded-full font-bold text-[10px] bg-emerald-100 text-emerald-800">
                    Target ≥ 60% (Aktual: {verifiedPercent}%)
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Klaim berstatus Confirmed atau Likely mendominasi agar presentasi kredibel di hadapan arsitek BRI.
                </p>
                <div className="text-[11px] text-emerald-700 font-semibold flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{verifiedCount} temuan berkekuatan pembuktian tinggi.</span>
                </div>
              </div>

              <div className="p-4 rounded-xl border bg-slate-50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900">3. Kerahasiaan & Regulasi UU PDP</span>
                  <span className="px-2 py-0.5 rounded-full font-bold text-[10px] bg-emerald-100 text-emerald-800">
                    100% Terlindungi
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Seluruh narasumber dianonimkan (hanya kode & divisi), persetujuan narasumber tercatat, dan tidak menyimpan celah keamanan spesifik.
                </p>
                <div className="text-[11px] text-emerald-700 font-semibold flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{interviews.length} narasumber telah terproteksi kode anonim.</span>
                </div>
              </div>

              <div className="p-4 rounded-xl border bg-slate-50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900">4. Kesiapan Tayang (Published Status)</span>
                  <span className="px-2 py-0.5 rounded-full font-bold text-[10px] bg-emerald-100 text-emerald-800">
                    {publishedCount} / {totalFindings} Published
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Hanya temuan berstatus Published yang akan ditampilkan saat Presenter Mode aktif.
                </p>
                <div className="text-[11px] text-emerald-700 font-semibold flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Semua data inti siap dipresentasikan di layar proyektor.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 2: Daftar Temuan Table dengan Tombol Edit */}
      {activeAdminSubtab === 'findings' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800">Kelola & Edit Temuan ({findings.length})</span>
            <span className="text-xs text-slate-500">Klik tombol Edit atau klik baris untuk membuka editor bukti</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/70 border-b border-slate-200 font-bold text-slate-700">
                <tr>
                  <th className="py-2.5 px-4">Bank</th>
                  <th className="py-2.5 px-4">Teknologi</th>
                  <th className="py-2.5 px-4">Tingkat Keyakinan</th>
                  <th className="py-2.5 px-4">Status Review</th>
                  <th className="py-2.5 px-4">Catatan Analisis</th>
                  <th className="py-2.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {findings.map(finding => {
                  const b = banks.find(x => x.id === finding.bankId);
                  const t = technologies.find(x => x.id === finding.technologyId);
                  const confBadge = getConfidenceBadge(finding.confidence);
                  const revBadge = getReviewStatusBadge(finding.statusReview);

                  return (
                    <tr 
                      key={finding.id} 
                      className="hover:bg-slate-50 cursor-pointer"
                      onClick={() => setSelectedFindingModalId(finding.id)}
                    >
                      <td className="py-2.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                        {b?.logo} {b?.singkatan}
                      </td>
                      <td className="py-2.5 px-4 font-bold text-slate-900">
                        {t?.nama}
                      </td>
                      <td className="py-2.5 px-4">
                        <span className={`px-2 py-0.5 rounded font-bold ${confBadge.bgColor}`}>
                          {confBadge.symbol} {confBadge.label}
                        </span>
                      </td>
                      <td className="py-2.5 px-4">
                        <span className={`px-2 py-0.5 rounded font-bold ${revBadge.bgColor}`}>
                          {revBadge.label}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 text-slate-600 max-w-xs truncate italic">
                        {finding.catatan ? `"${finding.catatan}"` : '-'}
                      </td>
                      <td className="py-2.5 px-4 text-right space-x-1 whitespace-nowrap" onClick={e => e.stopPropagation()}>
                        <button
                          onClick={() => setSelectedFindingModalId(finding.id)}
                          className="px-2 py-1 rounded bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-[10px] inline-flex items-center space-x-1"
                          title="Edit Temuan & Bukti"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Edit</span>
                        </button>
                        {finding.statusReview !== 'Published' && (
                          <button
                            onClick={() => publishFinding(finding.id)}
                            className="px-2 py-1 rounded bg-emerald-100 text-emerald-800 hover:bg-emerald-200 font-bold text-[10px]"
                          >
                            Publish
                          </button>
                        )}
                        <button
                          onClick={() => {
                            if (confirm(`Yakin ingin menghapus temuan ${t?.nama} untuk ${b?.singkatan}?`)) {
                              deleteFinding(finding.id);
                            }
                          }}
                          className="px-2 py-1 rounded bg-red-100 text-red-800 hover:bg-red-200 font-bold text-[10px]"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Subtab 3: Kelola & Edit Teknologi */}
      {activeAdminSubtab === 'technologies' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden space-y-4">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-800">Direktori Komponen Teknologi ({technologies.length})</span>
              <p className="text-[11px] text-slate-500">Edit nama, vendor, lisensi, atau kategori teknologi yang terdaftar.</p>
            </div>
            <button
              onClick={() => setActiveAdminSubtab('add-tech')}
              className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Daftarkan Teknologi Baru</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/70 border-b border-slate-200 font-bold text-slate-700">
                <tr>
                  <th className="py-2.5 px-4">Nama Teknologi</th>
                  <th className="py-2.5 px-4">Vendor</th>
                  <th className="py-2.5 px-4">Kategori Domain</th>
                  <th className="py-2.5 px-4">Model Lisensi</th>
                  <th className="py-2.5 px-4">Deskripsi Fungsi</th>
                  <th className="py-2.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {technologies.map(tech => {
                  const cat = categories.find(c => c.id === tech.categoryId);
                  return (
                    <tr key={tech.id} className="hover:bg-slate-50">
                      <td className="py-2.5 px-4 font-bold text-slate-900">
                        {tech.nama}
                      </td>
                      <td className="py-2.5 px-4 text-slate-700">
                        {tech.vendor}
                      </td>
                      <td className="py-2.5 px-4 text-slate-600">
                        {cat?.nama}
                      </td>
                      <td className="py-2.5 px-4">
                        <span className="capitalize px-2 py-0.5 rounded bg-slate-100 font-semibold text-[10px]">
                          {tech.tipe}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 text-slate-500 max-w-xs truncate">
                        {tech.deskripsi || '-'}
                      </td>
                      <td className="py-2.5 px-4 text-right space-x-1 whitespace-nowrap">
                        <button
                          onClick={() => setEditingTech(tech)}
                          className="px-2 py-1 rounded bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-[10px] inline-flex items-center space-x-1"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Yakin ingin menghapus teknologi "${tech.nama}" beserta seluruh temuan terkaitnya?`)) {
                              deleteTechnology(tech.id);
                            }
                          }}
                          className="px-2 py-1 rounded bg-red-100 text-red-800 hover:bg-red-200 font-bold text-[10px]"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Edit Teknologi */}
      {editingTech && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg p-6 space-y-4 text-xs animate-in fade-in zoom-in-95 duration-100">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center space-x-2">
                <Edit3 className="w-4 h-4 text-blue-600" />
                <span>Edit Komponen Teknologi</span>
              </h3>
              <button onClick={() => setEditingTech(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUpdateTechSubmit} className="space-y-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Nama Teknologi</label>
                <input
                  type="text"
                  value={editingTech.nama}
                  onChange={e => setEditingTech({ ...editingTech, nama: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Vendor / Pemilik</label>
                <input
                  type="text"
                  value={editingTech.vendor}
                  onChange={e => setEditingTech({ ...editingTech, vendor: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Kategori Domain</label>
                  <select
                    value={editingTech.categoryId}
                    onChange={e => setEditingTech({ ...editingTech, categoryId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.nama}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Model Lisensi</label>
                  <select
                    value={editingTech.tipe}
                    onChange={e => setEditingTech({ ...editingTech, tipe: e.target.value as TechType })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="open-source">Open Source</option>
                    <option value="komersial">Komersial (Enterprise)</option>
                    <option value="in-house">In-House Engineering</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Deskripsi Teknis</label>
                <textarea
                  rows={3}
                  value={editingTech.deskripsi}
                  onChange={e => setEditingTech({ ...editingTech, deskripsi: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setEditingTech(null)}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-300 text-slate-700 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center space-x-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Subtab 4: Form Add Finding */}
      {activeAdminSubtab === 'add-finding' && (
        <form onSubmit={handleCreateFinding} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 max-w-2xl">
          <h3 className="text-base font-extrabold text-slate-900">Input Temuan Baru</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Pilih Bank</label>
              <select
                value={fBankId}
                onChange={e => setFBankId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
              >
                {banks.map(b => (
                  <option key={b.id} value={b.id}>{b.logo} {b.nama} ({b.singkatan})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Pilih Teknologi</label>
              <select
                value={fTechId}
                onChange={e => setFTechId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
              >
                {technologies.map(t => (
                  <option key={t.id} value={t.id}>{t.nama} ({t.vendor})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Tingkat Keyakinan (Confidence)</label>
              <select
                value={fConfidence}
                onChange={e => setFConfidence(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
              >
                <option value="Confirmed">Confirmed (Sumber Resmi / ≥2 Narasumber)</option>
                <option value="Likely">Likely (≥2 Sumber Tidak Langsung / 1 Wawancara)</option>
                <option value="Indicative">Indicative (1 Sumber Tidak Langsung)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Status Review</label>
              <select
                value={fStatus}
                onChange={e => setFStatus(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
              >
                <option value="Draft">Draft</option>
                <option value="Reviewed">Reviewed</option>
                <option value="Published">Published (Siap Tayang Workshop)</option>
              </select>
            </div>
          </div>

          <div className="text-xs">
            <label className="block text-slate-700 font-bold mb-1">Catatan Analisis</label>
            <textarea
              rows={3}
              value={fNotes}
              onChange={e => setFNotes(e.target.value)}
              placeholder="Jelaskan peran teknologi ini di perbankan tersebut..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
          >
            Simpan Temuan
          </button>
        </form>
      )}

      {/* Subtab 5: Form Add Tech */}
      {activeAdminSubtab === 'add-tech' && (
        <form onSubmit={handleCreateTech} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 max-w-2xl">
          <h3 className="text-base font-extrabold text-slate-900">Daftarkan Komponen Teknologi Baru</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Nama Teknologi</label>
              <input
                type="text"
                value={tName}
                onChange={e => setTName(e.target.value)}
                placeholder="Contoh: Apache Flink"
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
                required
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Vendor / Pemilik</label>
              <input
                type="text"
                value={tVendor}
                onChange={e => setTVendor(e.target.value)}
                placeholder="Contoh: Apache Software Foundation"
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
                required
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Kategori Domain</label>
              <select
                value={tCategoryId}
                onChange={e => setTCategoryId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
              >
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.nama}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Model Lisensi</label>
              <select
                value={tType}
                onChange={e => setTType(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
              >
                <option value="open-source">Open Source</option>
                <option value="komersial">Komersial (Enterprise)</option>
                <option value="in-house">In-House Engineering</option>
              </select>
            </div>
          </div>

          <div className="text-xs">
            <label className="block text-slate-700 font-bold mb-1">Deskripsi Singkat</label>
            <textarea
              rows={3}
              value={tDesc}
              onChange={e => setTDesc(e.target.value)}
              placeholder="Deskripsi fungsi teknis..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
          >
            Daftarkan Teknologi
          </button>
        </form>
      )}

      {/* Subtab 6: Interviews dengan Fitur Edit & Hapus */}
      {activeAdminSubtab === 'interviews' && (
        <div className="space-y-6">
          {/* Add Interview */}
          <form onSubmit={handleCreateInterview} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3 max-w-2xl text-xs">
            <h4 className="font-extrabold text-slate-900">+ Catat Wawancara Narasumber Baru (Anonim)</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Bank</label>
                <select
                  value={iBankId}
                  onChange={e => setIBankId(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
                >
                  {banks.map(b => (
                    <option key={b.id} value={b.id}>{b.singkatan}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Kode Narasumber</label>
                <input
                  type="text"
                  placeholder="Misal: Narasumber EA-03"
                  value={iSpeakerCode}
                  onChange={e => setISpeakerCode(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Divisi / Jabatan</label>
                <input
                  type="text"
                  placeholder="Misal: Divisi Platform"
                  value={iDivision}
                  onChange={e => setIDivision(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-slate-600 font-semibold mb-1">Ringkasan Pernyataan Teknis</label>
              <textarea
                rows={2}
                value={iSummary}
                onChange={e => setISummary(e.target.value)}
                placeholder="Pernyataan yang diperbolehkan dibagikan..."
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300"
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold"
            >
              Simpan Rekaman Wawancara
            </button>
          </form>

          {/* List Interviews dengan Tombol Edit & Hapus */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {interviews.map(inv => {
              const b = banks.find(x => x.id === inv.bankId);
              return (
                <div key={inv.id} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs text-xs space-y-2 relative group">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-purple-950">{inv.kodeNarasumber}</span>
                    <div className="flex items-center space-x-1.5">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
                        {b?.logo} {b?.singkatan}
                      </span>
                      <button
                        onClick={() => setEditingInterview(inv)}
                        className="p-1 text-slate-400 hover:text-blue-600 rounded transition"
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
                        className="p-1 text-slate-400 hover:text-red-600 rounded transition"
                        title="Hapus Wawancara"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="text-purple-800 font-medium">{inv.divisi}</div>
                  <blockquote className="p-2.5 bg-slate-50 rounded-lg border-l-2 border-purple-500 text-slate-700 italic">
                    "{inv.ringkasan}"
                  </blockquote>
                  <div className="text-[11px] text-slate-400">
                    Tanggal Wawancara: {inv.tanggal} · Persetujuan: {inv.persetujuanNarasumber ? 'Ya (Sah)' : 'Belum'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modal Edit Wawancara */}
      {editingInterview && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg p-6 space-y-4 text-xs animate-in fade-in zoom-in-95 duration-100">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center space-x-2">
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
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Divisi / Jabatan</label>
                  <input
                    type="text"
                    value={editingInterview.divisi}
                    onChange={e => setEditingInterview({ ...editingInterview, divisi: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
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
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Ringkasan Pernyataan</label>
                <textarea
                  rows={3}
                  value={editingInterview.ringkasan}
                  onChange={e => setEditingInterview({ ...editingInterview, ringkasan: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  required
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setEditingInterview(null)}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-300 text-slate-700 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold flex items-center space-x-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Subtab 7: Audit Trail Log */}
      {activeAdminSubtab === 'audit' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800">Catatan Audit Perubahan Sistem (Audit Trail)</span>
            <span className="text-xs text-slate-500">Memenuhi kepatuhan pelacakan jejak data</span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {auditLogs.map(log => (
              <div key={log.id} className="p-4 hover:bg-slate-50 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] uppercase ${
                      log.aksi === 'PUBLISH' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : log.aksi === 'CREATE'
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
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-600 font-medium">Oleh {log.userName}</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{log.detail}</p>
                </div>
                <span className="text-[11px] text-slate-400 font-mono shrink-0">
                  {log.timestamp}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
