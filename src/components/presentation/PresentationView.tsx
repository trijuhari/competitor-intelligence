import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, ChevronLeft, ChevronRight, Maximize2, Minimize2, 
  Layers, ShieldCheck, CheckCircle2, AlertTriangle, FileText, 
  Sparkles, Lock, ArrowRight, HelpCircle 
} from 'lucide-react';
import { getConfidenceBadge } from '../../utils/helpers';

export const PresentationView: React.FC = () => {
  const { 
    banks, 
    categories, 
    technologies, 
    findings, 
    evidences, 
    interviews,
    setPresentationMode 
  } = useApp();

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Filter only Published findings for workshop
  const publishedFindings = findings.filter(f => f.statusReview === 'Published');

  // Slides structure:
  // Slide 0: Executive Title Slide
  // Slide 1: Metodologi & Framework Confidence
  // Slide 2: Landscape Overview & Coverage
  // Slide 3..13: Category Deep Dives (11 categories)
  // Slide 14: Head-to-Head Highlight: BRI vs Mandiri
  // Slide 15: Gap Analysis & Strategic Recommendations for BRI
  // Slide 16: Kesimpulan & Penutup Workshop

  const totalCategorySlides = categories.length;
  const totalSlides = 3 + totalCategorySlides + 3; // 19 slides

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        setCurrentSlideIndex(prev => Math.min(prev + 1, totalSlides - 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlideIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Escape') {
        setPresentationMode(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalSlides, setPresentationMode]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(console.error);
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(console.error);
      setIsFullscreen(false);
    }
  };

  const nextSlide = () => setCurrentSlideIndex(prev => Math.min(prev + 1, totalSlides - 1));
  const prevSlide = () => setCurrentSlideIndex(prev => Math.max(prev - 1, 0));

  // Render Slide Content based on currentSlideIndex
  const renderSlideContent = () => {
    // Slide 0: Cover
    if (currentSlideIndex === 0) {
      return (
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto h-full space-y-6">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-400 uppercase tracking-widest">
            Executive Briefing · Workshop Presentation
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Competitor Intelligence:<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-orange-400">
              Tech Stack Bank BRI vs Himbara
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl leading-relaxed">
            Pemetaan komprehensif arsitektur teknologi Bank BRI dan bank Himbara (Mandiri, BNI, BTN, BSI) berbasis bukti teruji.
          </p>

          <div className="flex items-center space-x-6 text-xs text-slate-400 pt-6 border-t border-slate-800">
            <div>Fokus: <strong>PT Bank Rakyat Indonesia (Persero) Tbk</strong></div>
            <div>•</div>
            <div>Tanggal: <strong>13 Oktober 2026</strong></div>
            <div>•</div>
            <div>Status: <strong>Workshop Edition (100% Published)</strong></div>
          </div>
        </div>
      );
    }

    // Slide 1: Metodologi & Confidence Framework
    if (currentSlideIndex === 1) {
      return (
        <div className="max-w-5xl mx-auto h-full flex flex-col justify-center space-y-6 text-white">
          <div>
            <div className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">
              Prinsip Kerja & Metodologi
            </div>
            <h2 className="text-3xl font-extrabold text-white">
              Sistem Keyakinan Data (Confidence Framework) & Sumber Terverifikasi
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Seluruh klaim disusun atas dasar bukti empiris tanpa akses sistem internal, mematuhi etika konsultan dan UU PDP.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-700/60 space-y-2">
              <div className="text-emerald-400 font-bold text-base flex items-center space-x-1.5">
                <span>✓ Confirmed</span>
              </div>
              <div className="font-semibold text-slate-200">Sumber Resmi Langsung:</div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Studi kasus resmi vendor (AWS, Confluent, Red Hat), keynote konferensi engineering resmi, siaran pers perseroan, atau dikonfirmasi ≥2 narasumber independen.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-blue-950/40 border border-blue-700/60 space-y-2">
              <div className="text-blue-400 font-bold text-base flex items-center space-x-1.5">
                <span>~ Likely</span>
              </div>
              <div className="font-semibold text-slate-200">Kuat Terindikasi:</div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                ≥2 sumber tidak langsung independen atau 1 narasumber wawancara internal bank yang relevan (divisi arsitektur/platform digital).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-700/60 space-y-2">
              <div className="text-amber-400 font-bold text-base flex items-center space-x-1.5">
                <span>? Indicative</span>
              </div>
              <div className="font-semibold text-slate-200">Sinyal Awal:</div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                1 sumber tidak langsung, seperti kualifikasi spesifikasi lowongan kerja rekrutmen atau metadata library publik.
              </p>
            </div>
          </div>

          {/* UU PDP Anonymity notice */}
          <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-800/50 flex items-center space-x-3 text-xs text-purple-200">
            <Lock className="w-5 h-5 text-purple-400 shrink-0" />
            <div>
              <strong>Perlindungan Privasi (UU PDP):</strong> Identitas seluruh narasumber perbankan disamarkan dengan kode anonim (misal: <em>Narasumber EA-01</em>) dan hanya divisinya yang dicatat untuk menjaga kerahasiaan.
            </div>
          </div>
        </div>
      );
    }

    // Slide 2: Landscape Overview
    if (currentSlideIndex === 2) {
      return (
        <div className="max-w-5xl mx-auto h-full flex flex-col justify-center space-y-6 text-white">
          <div>
            <div className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">
              Lanskap Umum
            </div>
            <h2 className="text-3xl font-extrabold text-white">
              Cakupan Arsitektur 5 Bank Himbara
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Distribusi adopsi komponen stack terverifikasi di seluruh bank BUMN.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {banks.map(bank => {
              const bankF = publishedFindings.filter(f => f.bankId === bank.id);
              const confirmedCount = bankF.filter(f => f.confidence === 'Confirmed').length;
              const isBRI = bank.id === 'bank-bri';

              return (
                <div 
                  key={bank.id} 
                  className={`p-4 rounded-2xl border flex flex-col justify-between ${
                    isBRI ? 'bg-blue-900/60 border-blue-400 ring-2 ring-blue-500/30' : 'bg-slate-900/70 border-slate-800'
                  }`}
                >
                  <div>
                    <div className="text-2xl mb-1">{bank.logo}</div>
                    <div className="font-extrabold text-base">{bank.singkatan}</div>
                    <div className="text-[11px] text-slate-400">{bank.produkDigital[0]}</div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Total Stack:</span>
                      <strong className="text-white">{bankF.length}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Confirmed:</span>
                      <strong className="text-emerald-400">{confirmedCount}</strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 text-xs text-slate-300 leading-relaxed">
            💡 <strong>Insight Eksekutif:</strong> Bank BRI memimpin dalam volume teknologi perbankan terverifikasi (terutama sistem throughput tinggi dan distributed storage), diikuti ketat oleh Bank Mandiri pada arsitektur hybrid cloud dan lifestyle banking.
          </div>
        </div>
      );
    }

    // Slide 3..13: Category Slides
    if (currentSlideIndex >= 3 && currentSlideIndex < 3 + totalCategorySlides) {
      const catIndex = currentSlideIndex - 3;
      const currentCat = categories[catIndex];
      const catTechs = technologies.filter(t => t.categoryId === currentCat.id);

      return (
        <div className="max-w-5xl mx-auto h-full flex flex-col justify-center space-y-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-orange-400 uppercase tracking-widest">
                Domain Kategori {catIndex + 1} dari {totalCategorySlides}
              </div>
              <h2 className="text-3xl font-extrabold text-white mt-0.5">
                {currentCat.nama}
              </h2>
              <p className="text-xs text-slate-300 mt-1 max-w-3xl">
                {currentCat.deskripsi}
              </p>
            </div>
          </div>

          {/* Category Matrix Table in Slide */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-800/70 border-b border-slate-700 text-slate-300">
                  <th className="py-2.5 px-4">Teknologi</th>
                  <th className="py-2.5 px-3">Vendor / Tipe</th>
                  {banks.map(b => (
                    <th key={b.id} className={`py-2.5 px-3 text-center ${b.id === 'bank-bri' ? 'text-blue-300 bg-blue-900/30' : ''}`}>
                      {b.singkatan}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs">
                {catTechs.map(tech => {
                  return (
                    <tr key={tech.id} className="hover:bg-slate-800/40">
                      <td className="py-2.5 px-4 font-bold text-white">
                        {tech.nama}
                      </td>
                      <td className="py-2.5 px-3 text-slate-400 capitalize">
                        {tech.vendor} ({tech.tipe})
                      </td>
                      {banks.map(b => {
                        const finding = publishedFindings.find(f => f.bankId === b.id && f.technologyId === tech.id);
                        const isBRI = b.id === 'bank-bri';
                        const badge = finding ? getConfidenceBadge(finding.confidence) : null;

                        return (
                          <td key={b.id} className={`py-2.5 px-3 text-center ${isBRI ? 'bg-blue-900/20' : ''}`}>
                            {badge ? (
                              <span className={`inline-block px-2 py-0.5 rounded font-bold text-[11px] ${badge.bgColor}`}>
                                {badge.symbol} {badge.label}
                              </span>
                            ) : (
                              <span className="text-slate-600">–</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Subcategories example */}
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Subkategori Terkait:</span>
            <span>{currentCat.contohSubkategori.join(' • ')}</span>
          </div>
        </div>
      );
    }

    // Slide 14: Head-to-Head Highlight BRI vs Mandiri
    if (currentSlideIndex === 3 + totalCategorySlides) {
      const mandiri = banks.find(b => b.id === 'bank-mandiri')!;
      return (
        <div className="max-w-5xl mx-auto h-full flex flex-col justify-center space-y-6 text-white">
          <div>
            <div className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-1">
              Komparasi Strategis
            </div>
            <h2 className="text-3xl font-extrabold text-white">
              Head-to-Head Utama: Bank BRI vs Bank Mandiri
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Dua kutub digital banking terbesar di Indonesia dengan diferensiasi segmentasi nasabah.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-blue-950/40 border border-blue-600/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-blue-300 text-sm">Keunggulan Arsitektur Bank BRI</span>
                <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-extrabold text-[10px]">BRImo</span>
              </div>
              <ul className="space-y-2 text-slate-300 leading-relaxed list-disc list-inside">
                <li>Adopsi Apache Cassandra cluster untuk menampung miliaran mutasi rekening tanpa downtime.</li>
                <li>Pondasi messaging real-time Apache Kafka Confluent menangani 25.000+ TPS AgenBRILink.</li>
                <li>Ekosistem Open API SNAP terluas terhubung ke ribuan mitra fintech & korporat.</li>
                <li>Sabrina virtual assistant NLP internal terintegrasi ke core perbankan.</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-sky-950/40 border border-sky-600/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sky-300 text-sm">Keunggulan Arsitektur Bank Mandiri</span>
                <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-900 font-extrabold text-[10px]">Livin'</span>
              </div>
              <ul className="space-y-2 text-slate-300 leading-relaxed list-disc list-inside">
                <li>Pemanfaatan AWS Hybrid Cloud region Jakarta untuk lifestyle marketplace Livin' Sukha.</li>
                <li>Microservices ultra-fast berbasis Go (Golang) dan Redis cluster terdistribusi.</li>
                <li>Platform analitik kolaboratif Dataiku untuk data science squad bisnis.</li>
                <li>Zero-trust security dengan HashiCorp Vault enterprise credential rotation.</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    // Slide 15: Gap Analysis & Recommendations
    if (currentSlideIndex === 3 + totalCategorySlides + 1) {
      return (
        <div className="max-w-5xl mx-auto h-full flex flex-col justify-center space-y-6 text-white">
          <div>
            <div className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-1">
              Rekomendasi Roadmap
            </div>
            <h2 className="text-3xl font-extrabold text-white">
              Rekomendasi Arsitektur untuk Workshop BRI
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Inisiatif modernisasi teknologi prioritas untuk mempertahankan dominasi pasar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700 space-y-2">
              <div className="font-extrabold text-orange-400 text-sm">1. Evaluasi Hybrid Cloud</div>
              <p className="text-slate-300 leading-relaxed">
                Mengkaji penggunaan public cloud terisolasi (Jakarta region) untuk modul *non-financial lifestyle* di BRImo guna mempercepat integrasi merchant baru tanpa membebani on-premise core.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700 space-y-2">
              <div className="font-extrabold text-blue-400 text-sm">2. Akselerasi MLOps Terpadu</div>
              <p className="text-slate-300 leading-relaxed">
                Memperkuat platform Kubeflow & MLflow agar divisi bisnis dan risiko dapat melakukan deployment model credit scoring UMKM secara mandiri dengan tata kelola terpusat.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700 space-y-2">
              <div className="font-extrabold text-emerald-400 text-sm">3. Zero-Trust Secrets Lifecycle</div>
              <p className="text-slate-300 leading-relaxed">
                Standarisasi manajemen secrets otomatis dan rotasi kredensial dinamis untuk memperkuat postur keamanan perbankan menghadapi risiko siber modern dan kepatuhan UU PDP.
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Slide 16: Closing & Q&A
    return (
      <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto h-full space-y-6 text-white">
        <div className="w-16 h-16 rounded-2xl bg-blue-600/30 border border-blue-500/50 flex items-center justify-center text-3xl">
          💬
        </div>

        <h2 className="text-4xl sm:text-5xl font-black text-white">
          Sesi Diskusi & Tanya Jawab
        </h2>

        <p className="text-base text-slate-300 max-w-xl">
          Terima kasih. Kami membuka ruang eksplorasi detail untuk setiap kategori stack dan bukti yang diinginkan tim BRI.
        </p>

        <div className="pt-4 flex items-center space-x-3">
          <button
            onClick={() => setPresentationMode(false)}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition"
          >
            Kembali ke Aplikasi Utama
          </button>
        </div>
      </div>
    );
  };

  // Speaker notes content
  const speakerNotesContent = [
    "Slide 1: Buka presentasi, sampaikan salam pembuka ke tim BRI, jelaskan tujuan benchmarking.",
    "Slide 2: Tekankan integritas data, skema confidence (Confirmed vs Likely), dan kepatuhan UU PDP pada narasumber wawancara.",
    "Slide 3: Tunjukkan posisi BRI sebagai pemilik portofolio teknologi terlengkap di Himbara.",
    ...categories.map(c => `Kategori ${c.nama}: Jelaskan perbandingan komponen stack, mana yang standar bersama dan mana yang unik.`),
    "Head-to-Head: Bahas perbandingan gaya arsitektur BRI (fokus skalabilitas mikro masif) vs Mandiri (lifestyle cloud-first).",
    "Rekomendasi: Arahkan audiens pada 3 inisiatif taktis untuk roadmap IT BRI tahun 2027.",
    "Penutup: Undang manajemen dan arsitek BRI untuk memberikan feedback dan berdiskusi."
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col justify-between overflow-hidden select-none">
      {/* Top Controls Bar */}
      <div className="px-6 py-4 bg-slate-900/80 backdrop-blur border-b border-slate-800 flex items-center justify-between z-20">
        <div className="flex items-center space-x-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-extrabold text-sm text-slate-200">
            Mode Presentasi Workshop (BRI vs Himbara)
          </span>
          <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-medium">
            Slide {currentSlideIndex + 1} / {totalSlides}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
              showSpeakerNotes ? 'bg-orange-600 border-orange-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'
            }`}
          >
            <span>Catatan Pembicara</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            title="Layar Penuh"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setPresentationMode(false)}
            className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800/60 transition"
            title="Keluar Mode Presentasi (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Slide Canvas */}
      <div className="flex-1 p-6 sm:p-12 overflow-y-auto relative flex items-center justify-center">
        {renderSlideContent()}

        {/* Floating Speaker Notes Panel */}
        {showSpeakerNotes && (
          <div className="absolute bottom-6 right-6 w-80 bg-slate-900/95 border border-slate-700 rounded-2xl p-4 shadow-2xl z-30 text-xs backdrop-blur-md">
            <div className="font-bold text-orange-400 uppercase tracking-wider text-[10px] mb-1">
              Catatan Pembicara (Speaker Notes)
            </div>
            <p className="text-slate-200 leading-relaxed">
              {speakerNotesContent[currentSlideIndex] || 'Bahas temuan secara interaktif.'}
            </p>
          </div>
        )}
      </div>

      {/* Bottom Navigation Controls */}
      <div className="px-6 py-3.5 bg-slate-900/80 backdrop-blur border-t border-slate-800 flex items-center justify-between z-20">
        <div className="text-xs text-slate-500 hidden sm:block">
          Gunakan tombol panah <strong>← / →</strong> atau <strong>Spasi</strong> untuk berganti slide.
        </div>

        {/* Slide jump pills */}
        <div className="flex items-center space-x-1 overflow-x-auto max-w-md mx-auto scrollbar-none">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition ${
                currentSlideIndex === idx ? 'bg-orange-500 scale-125' : 'bg-slate-700 hover:bg-slate-500'
              }`}
              title={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={prevSlide}
            disabled={currentSlideIndex === 0}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-xs font-semibold flex items-center space-x-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Sebelumnya</span>
          </button>

          <button
            onClick={nextSlide}
            disabled={currentSlideIndex === totalSlides - 1}
            className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-30 disabled:pointer-events-none text-xs font-bold flex items-center space-x-1"
          >
            <span>Berikutnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
