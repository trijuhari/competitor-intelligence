import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, ExternalLink, ShieldCheck, UserCheck, Calendar, FileText, 
  MessageSquare, Plus, CheckCircle, AlertTriangle, Building2, Cpu, Globe, Lock,
  Edit3, Save, Trash2
} from 'lucide-react';
import { getConfidenceBadge, getReviewStatusBadge } from '../../utils/helpers';
import { ConfidenceLevel, ReviewStatus } from '../../types';

export const FindingDetailModal: React.FC = () => {
  const { 
    selectedFindingModalId, 
    setSelectedFindingModalId, 
    findings, 
    banks, 
    technologies, 
    categories, 
    evidences, 
    interviews,
    currentUser,
    updateFinding,
    publishFinding,
    addEvidence,
    updateEvidence,
    deleteEvidence
  } = useApp();

  const [showAddEvidence, setShowAddEvidence] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newQuote, setNewQuote] = useState('');
  const [newSourceType, setNewSourceType] = useState<'publik' | 'wawancara'>('publik');
  const [newInterviewId, setNewInterviewId] = useState('');
  const [newPencatat, setNewPencatat] = useState(currentUser.nama || 'Rinaldi Firmansyah (Lead Admin)');

  // Finding Inline Edit State
  const [isEditingFinding, setIsEditingFinding] = useState(false);
  const [editCatatan, setEditCatatan] = useState('');
  const [editConfidence, setEditConfidence] = useState<ConfidenceLevel>('Confirmed');
  const [editStatus, setEditStatus] = useState<ReviewStatus>('Published');
  const [editTanggalVerifikasi, setEditTanggalVerifikasi] = useState('');

  // Evidence Inline Edit State
  const [editingEvidenceId, setEditingEvidenceId] = useState<string | null>(null);
  const [editEvTitle, setEditEvTitle] = useState('');
  const [editEvUrl, setEditEvUrl] = useState('');
  const [editEvQuote, setEditEvQuote] = useState('');
  const [editEvSourceType, setEditEvSourceType] = useState<'publik' | 'wawancara'>('publik');
  const [editEvInterviewId, setEditEvInterviewId] = useState('');
  const [editEvPencatat, setEditEvPencatat] = useState('');

  if (!selectedFindingModalId) return null;

  const finding = findings.find(f => f.id === selectedFindingModalId);
  if (!finding) return null;

  const bank = banks.find(b => b.id === finding.bankId);
  const tech = technologies.find(t => t.id === finding.technologyId);
  const category = categories.find(c => c.id === tech?.categoryId);
  
  const findingEvidences = evidences.filter(e => e.findingId === finding.id || finding.evidenceIds?.includes(e.id));
  const bankInterviews = interviews.filter(i => i.bankId === bank?.id);

  const confidenceBadge = getConfidenceBadge(finding.confidence);
  const reviewBadge = getReviewStatusBadge(finding.statusReview);

  const canEdit = currentUser.role === 'Admin' || currentUser.role === 'Analyst';

  // Sync edit form with finding when selected
  const startEditing = () => {
    setEditCatatan(finding.catatan || '');
    setEditConfidence(finding.confidence);
    setEditStatus(finding.statusReview);
    setEditTanggalVerifikasi(finding.tanggalVerifikasi || new Date().toISOString().slice(0, 10));
    setIsEditingFinding(true);
  };

  const handleSaveFindingEdits = (e: React.FormEvent) => {
    e.preventDefault();
    updateFinding(finding.id, {
      catatan: editCatatan,
      confidence: editConfidence,
      statusReview: editStatus,
      tanggalVerifikasi: editTanggalVerifikasi
    });
    setIsEditingFinding(false);
  };

  const handleCreateEvidence = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addEvidence({
      findingId: finding.id,
      tipeSumber: newSourceType,
      judul: newTitle,
      url: newSourceType === 'publik' ? newUrl : undefined,
      interviewId: newSourceType === 'wawancara' ? newInterviewId : undefined,
      tanggalAkses: new Date().toISOString().slice(0, 10),
      kutipanRingkas: newQuote,
      pencatat: newPencatat.trim() || currentUser.nama
    });

    setNewTitle('');
    setNewUrl('');
    setNewQuote('');
    setNewPencatat(currentUser.nama || 'Rinaldi Firmansyah (Lead Admin)');
    setShowAddEvidence(false);
  };

  const startEditEvidence = (ev: typeof evidences[0]) => {
    setEditingEvidenceId(ev.id);
    setEditEvTitle(ev.judul);
    setEditEvUrl(ev.url || '');
    setEditEvQuote(ev.kutipanRingkas || '');
    setEditEvSourceType(ev.tipeSumber);
    setEditEvInterviewId(ev.interviewId || '');
    setEditEvPencatat(ev.pencatat || currentUser.nama);
  };

  const handleSaveEvidenceEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvidenceId || !editEvTitle.trim()) return;

    updateEvidence(editingEvidenceId, {
      judul: editEvTitle,
      tipeSumber: editEvSourceType,
      url: editEvSourceType === 'publik' ? editEvUrl : undefined,
      interviewId: editEvSourceType === 'wawancara' ? editEvInterviewId : undefined,
      kutipanRingkas: editEvQuote,
      pencatat: editEvPencatat.trim() || currentUser.nama
    });

    setEditingEvidenceId(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold shadow-xs shrink-0"
              style={{ backgroundColor: `${bank?.brandColor}15`, color: bank?.brandColor }}
            >
              {bank?.logo || '🏦'}
            </div>
            <div>
              <div className="flex items-center space-x-2 flex-wrap">
                <span className="font-bold text-slate-900 text-lg">
                  {tech?.nama}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold border bg-slate-100 text-slate-700">
                  {category?.nama}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold border ${reviewBadge.bgColor}`}>
                  {reviewBadge.label}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Bank Pengguna: <strong className="text-slate-800">{bank?.nama} ({bank?.singkatan})</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {canEdit && !isEditingFinding && (
              <button
                onClick={startEditing}
                className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center space-x-1.5 shadow-xs transition"
              >
                <Edit3 className="w-3.5 h-3.5 text-blue-600" />
                <span>Edit Temuan</span>
              </button>
            )}

            <button
              onClick={() => {
                setSelectedFindingModalId(null);
                setIsEditingFinding(false);
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Inline Edit Form for Finding */}
          {isEditingFinding ? (
            <form onSubmit={handleSaveFindingEdits} className="p-5 bg-blue-50/50 rounded-2xl border border-blue-200 space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-blue-200/80 pb-2">
                <span className="font-bold text-blue-900 text-sm flex items-center space-x-2">
                  <Edit3 className="w-4 h-4 text-blue-600" />
                  <span>Edit Data Temuan ({bank?.singkatan} - {tech?.nama})</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsEditingFinding(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Tingkat Keyakinan (Confidence)</label>
                  <select
                    value={editConfidence}
                    onChange={e => setEditConfidence(e.target.value as ConfidenceLevel)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="Confirmed">Confirmed (Resmi / ≥2 Narasumber)</option>
                    <option value="Likely">Likely (≥2 Sumber Tidak Langsung / 1 Narasumber)</option>
                    <option value="Indicative">Indicative (1 Sinyal Awal)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Status Review</label>
                  <select
                    value={editStatus}
                    onChange={e => setEditStatus(e.target.value as ReviewStatus)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Reviewed">Reviewed</option>
                    <option value="Published">Published (Siap Workshop)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Tanggal Verifikasi</label>
                  <input
                    type="date"
                    value={editTanggalVerifikasi}
                    onChange={e => setEditTanggalVerifikasi(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Catatan Analisis Tim Konsultan</label>
                <textarea
                  rows={3}
                  value={editCatatan}
                  onChange={e => setEditCatatan(e.target.value)}
                  placeholder="Catatan peran teknologi ini di perbankan tersebut..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsEditingFinding(false)}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-slate-700 font-medium hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center space-x-1.5 shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            </form>
          ) : (
            <>
              {/* Confidence Banner */}
              <div className={`p-4 rounded-xl border flex items-start space-x-3 ${confidenceBadge.bgColor}`}>
                <span className="text-lg font-bold leading-none mt-0.5">{confidenceBadge.symbol}</span>
                <div className="text-xs space-y-1">
                  <div className="font-bold uppercase tracking-wider flex items-center space-x-1.5">
                    <span>Tingkat Keyakinan: {confidenceBadge.label}</span>
                  </div>
                  <p className="opacity-90 leading-relaxed">
                    {confidenceBadge.description}
                  </p>
                </div>
              </div>

              {/* Technology Profile */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">Vendor / Pemilik:</span>
                  <span className="font-semibold text-slate-800">{tech?.vendor || 'Open Source Community'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Model Lisensi:</span>
                  <span className="font-semibold text-slate-800 capitalize">{tech?.tipe}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Tanggal Pertama Terdeteksi:</span>
                  <span className="font-semibold text-slate-800">{finding.tanggalTerdeteksi || '-'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Terakhir Diverifikasi:</span>
                  <span className="font-semibold text-slate-800">{finding.tanggalVerifikasi || '-'}</span>
                </div>
                {tech?.deskripsi && (
                  <div className="col-span-1 md:col-span-2 pt-2 border-t border-slate-200/80">
                    <span className="text-slate-400 block font-medium">Deskripsi Teknologi:</span>
                    <p className="text-slate-700 leading-relaxed mt-0.5">{tech.deskripsi}</p>
                  </div>
                )}
                {finding.catatan && (
                  <div className="col-span-1 md:col-span-2 pt-2 border-t border-slate-200/80">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 block font-medium">Catatan Temuan Tim Konsultan:</span>
                      {canEdit && (
                        <button
                          onClick={startEditing}
                          className="text-[11px] text-blue-600 hover:underline flex items-center space-x-1 font-semibold"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Edit Catatan</span>
                        </button>
                      )}
                    </div>
                    <p className="text-slate-800 font-medium leading-relaxed mt-0.5 italic">"{finding.catatan}"</p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Evidences & Citations Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Bukti & Jejak Temuan ({findingEvidences.length})</span>
              </h4>

              {canEdit && (
                <button
                  onClick={() => setShowAddEvidence(!showAddEvidence)}
                  className="text-xs flex items-center space-x-1 font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Bukti</span>
                </button>
              )}
            </div>

            {/* Add Evidence Form Inline */}
            {showAddEvidence && (
              <form onSubmit={handleCreateEvidence} className="p-4 bg-blue-50/60 rounded-xl border border-blue-200 space-y-3 text-xs">
                <div className="font-semibold text-blue-900">Input Bukti Baru</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Tipe Sumber</label>
                    <select
                      value={newSourceType}
                      onChange={e => setNewSourceType(e.target.value as any)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
                    >
                      <option value="publik">Sumber Publik (Web/Laporan/Lowongan)</option>
                      <option value="wawancara">Wawancara Narasumber Bank</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Judul / Referensi</label>
                    <input
                      type="text"
                      placeholder="Contoh: Studi Kasus AWS Summit 2026"
                      value={newTitle}
                      onChange={e => setNewTitle(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {newSourceType === 'publik' ? (
                    <div>
                      <label className="block text-slate-600 font-medium mb-1">URL Publik</label>
                      <input
                        type="url"
                        placeholder="https://..."
                        value={newUrl}
                        onChange={e => setNewUrl(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-slate-600 font-medium mb-1">Pilih Catatan Wawancara</label>
                      <select
                        value={newInterviewId}
                        onChange={e => setNewInterviewId(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
                      >
                        <option value="">-- Pilih Narasumber Anonim --</option>
                        {bankInterviews.map(i => (
                          <option key={i.id} value={i.id}>{i.kodeNarasumber} ({i.divisi})</option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Dicatat oleh (Nama Pencatat / Analyst)</label>
                    <input
                      type="text"
                      placeholder="Contoh: Rinaldi Firmansyah (Lead Admin)"
                      value={newPencatat}
                      onChange={e => setNewPencatat(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">Kutipan / Pernyataan Ringkas</label>
                  <textarea
                    rows={2}
                    placeholder="Kutipan bukti atau ringkasan teknis..."
                    value={newQuote}
                    onChange={e => setNewQuote(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowAddEvidence(false)}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
                  >
                    Simpan Bukti
                  </button>
                </div>
              </form>
            )}

            {findingEvidences.length === 0 ? (
              <div className="p-4 rounded-xl border border-dashed border-slate-200 text-center text-xs text-slate-400">
                Belum ada berkas bukti spesifik yang ditautkan ke temuan ini.
              </div>
            ) : (
              <div className="space-y-3">
                {findingEvidences.map(ev => {
                  const linkedInterview = ev.interviewId ? interviews.find(i => i.id === ev.interviewId) : null;

                  if (editingEvidenceId === ev.id) {
                    return (
                      <form
                        key={ev.id}
                        onSubmit={handleSaveEvidenceEdit}
                        className="p-4 bg-amber-50/70 rounded-xl border border-amber-300 space-y-3 text-xs"
                      >
                        <div className="flex items-center justify-between font-bold text-amber-900 text-xs">
                          <span className="flex items-center space-x-1.5">
                            <Edit3 className="w-3.5 h-3.5 text-amber-700" />
                            <span>Edit Bukti: {ev.judul}</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => setEditingEvidenceId(null)}
                            className="text-slate-400 hover:text-slate-600"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-slate-700 font-semibold mb-1">Tipe Sumber</label>
                            <select
                              value={editEvSourceType}
                              onChange={e => setEditEvSourceType(e.target.value as any)}
                              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
                            >
                              <option value="publik">Sumber Publik (Web/Laporan/Lowongan)</option>
                              <option value="wawancara">Wawancara Narasumber Bank</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-slate-700 font-semibold mb-1">Judul / Referensi</label>
                            <input
                              type="text"
                              value={editEvTitle}
                              onChange={e => setEditEvTitle(e.target.value)}
                              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {editEvSourceType === 'publik' ? (
                            <div>
                              <label className="block text-slate-700 font-semibold mb-1">URL Publik</label>
                              <input
                                type="url"
                                value={editEvUrl}
                                onChange={e => setEditEvUrl(e.target.value)}
                                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
                              />
                            </div>
                          ) : (
                            <div>
                              <label className="block text-slate-700 font-semibold mb-1">Pilih Catatan Wawancara</label>
                              <select
                                value={editEvInterviewId}
                                onChange={e => setEditEvInterviewId(e.target.value)}
                                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
                              >
                                <option value="">-- Pilih Narasumber Anonim --</option>
                                {bankInterviews.map(i => (
                                  <option key={i.id} value={i.id}>{i.kodeNarasumber} ({i.divisi})</option>
                                ))}
                              </select>
                            </div>
                          )}

                          <div>
                            <label className="block text-slate-700 font-semibold mb-1">Dicatat oleh (Nama Pencatat / Analyst)</label>
                            <input
                              type="text"
                              value={editEvPencatat}
                              onChange={e => setEditEvPencatat(e.target.value)}
                              placeholder="Contoh: Rinaldi Firmansyah (Lead Admin)"
                              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-slate-700 font-semibold mb-1">Kutipan / Pernyataan Ringkas</label>
                          <textarea
                            rows={2}
                            value={editEvQuote}
                            onChange={e => setEditEvQuote(e.target.value)}
                            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
                            required
                          />
                        </div>

                        <div className="flex justify-end space-x-2 pt-1">
                          <button
                            type="button"
                            onClick={() => setEditingEvidenceId(null)}
                            className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-600 hover:bg-slate-100"
                          >
                            Batal
                          </button>
                          <button
                            type="submit"
                            className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold flex items-center space-x-1"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>Simpan Perubahan</span>
                          </button>
                        </div>
                      </form>
                    );
                  }

                  return (
                    <div 
                      key={ev.id}
                      className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs hover:border-slate-300 transition space-y-2 text-xs relative group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-0.5 rounded-md font-semibold text-[10px] uppercase tracking-wider ${
                            ev.tipeSumber === 'publik' ? 'bg-sky-100 text-sky-800' : 'bg-purple-100 text-purple-800'
                          }`}>
                            {ev.tipeSumber === 'publik' ? '🌐 Sumber Publik' : '🗣️ Wawancara Narasumber'}
                          </span>
                          <span className="font-bold text-slate-800">{ev.judul}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <span className="text-slate-400 text-[11px] flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{ev.tanggalAkses}</span>
                          </span>

                          {canEdit && (
                            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition">
                              <button
                                onClick={() => startEditEvidence(ev)}
                                className="p-1 text-slate-400 hover:text-blue-600 rounded transition"
                                title="Edit Bukti Ini"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Hapus bukti "${ev.judul}"?`)) {
                                    deleteEvidence(ev.id);
                                  }
                                }}
                                className="p-1 text-slate-400 hover:text-red-600 rounded transition"
                                title="Hapus Bukti Ini"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Excerpt quote */}
                      <blockquote className="p-2.5 bg-slate-50 border-l-2 border-blue-500 rounded-r-lg text-slate-700 italic">
                        {ev.kutipanRingkas}
                      </blockquote>

                      {/* Source details */}
                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                        <div>
                          {ev.tipeSumber === 'publik' && ev.url && (
                            <a 
                              href={ev.url} 
                              target="_blank" 
                              rel="noreferrer"
                              className="text-blue-600 hover:underline flex items-center space-x-1 font-medium"
                            >
                              <span>Buka Tautan Sumber</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                          {ev.tipeSumber === 'wawancara' && linkedInterview && (
                            <div className="flex items-center space-x-1 text-purple-700 font-medium">
                              <Lock className="w-3 h-3" />
                              <span>{linkedInterview.kodeNarasumber} · {linkedInterview.divisi} (UU PDP Compliant)</span>
                            </div>
                          )}
                        </div>
                        <div>
                          Dicatat oleh: <span className="font-medium text-slate-700">{ev.pencatat}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Reviewer Actions */}
          {canEdit && !isEditingFinding && (
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold text-slate-700">Ubah Status Review:</span>
                <select
                  value={finding.statusReview}
                  onChange={e => updateFinding(finding.id, { statusReview: e.target.value as ReviewStatus })}
                  className="text-xs px-2.5 py-1 rounded-lg border border-slate-300 bg-white font-medium"
                >
                  <option value="Draft">Draft</option>
                  <option value="Reviewed">Reviewed</option>
                  <option value="Published">Published (Siap Workshop)</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold text-slate-700">Ubah Confidence:</span>
                <select
                  value={finding.confidence}
                  onChange={e => updateFinding(finding.id, { confidence: e.target.value as ConfidenceLevel })}
                  className="text-xs px-2.5 py-1 rounded-lg border border-slate-300 bg-white font-medium"
                >
                  <option value="Confirmed">Confirmed (Resmi)</option>
                  <option value="Likely">Likely (≥2 Sumber / Wawancara)</option>
                  <option value="Indicative">Indicative (1 Sumber Awal)</option>
                </select>
              </div>

              {finding.statusReview !== 'Published' && (
                <button
                  onClick={() => publishFinding(finding.id)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 flex items-center space-x-1.5 transition"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Publikasikan Sekarang</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center space-x-1.5">
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            <span>Kerahasiaan narasumber dianonimkan sesuai tata kelola UU PDP & etika konsultan.</span>
          </div>
          <button
            onClick={() => {
              setSelectedFindingModalId(null);
              setIsEditingFinding(false);
            }}
            className="px-4 py-1.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold rounded-lg transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
