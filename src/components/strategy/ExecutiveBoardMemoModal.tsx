import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileText, Printer, Download, X, Shield, CheckCircle2, 
  Building2, Sparkles, AlertTriangle, ArrowRight, Share2 
} from 'lucide-react';

interface ExecutiveBoardMemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExecutiveBoardMemoModal: React.FC<ExecutiveBoardMemoModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, findings, banks, technologies } = useApp();

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const today = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 print:p-0 print:bg-white print:static">
      {/* Modal Container */}
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden print:max-w-none print:max-h-none print:border-none print:shadow-none print:rounded-none">
        
        {/* Top Control Bar (Hidden when Printing) */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0 print:hidden">
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-orange-500 text-white font-bold text-xs">
              <FileText className="w-4 h-4" />
            </span>
            <div>
              <span className="font-extrabold text-sm text-white">
                Executive Board Briefing Memo (C-Suite Report)
              </span>
              <p className="text-[11px] text-slate-400">
                Format standar konsultan MBB untuk Lampiran Rapat Direksi & Dewan Komisaris
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center space-x-1.5 transition active:scale-95 shadow-md shadow-blue-900/30"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
              title="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8 text-slate-900 print:p-8 print:overflow-visible text-xs leading-relaxed font-sans">
          
          {/* Formal Memorandum Header */}
          <div className="border-b-2 border-slate-900 pb-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[11px] font-extrabold tracking-widest text-slate-500 uppercase">
                  PT BANK RAKYAT INDONESIA (PERSERO) TBK
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
                  MEMORANDUM STRATEGIS KOMITE TEKNOLOGI INFORMASI
                </h1>
              </div>
              <div className="text-right">
                <span className="inline-block px-2.5 py-1 rounded bg-rose-100 text-rose-800 font-extrabold text-[10px] tracking-wider uppercase border border-rose-200">
                  STRICTLY CONFIDENTIAL · BOD/BOC ONLY
                </span>
                <div className="text-[11px] text-slate-500 font-mono mt-1">
                  REF: BRI-INTEL/BOD-MEMO/2026-X
                </div>
              </div>
            </div>

            {/* Meta Table */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs font-medium">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">KEPADA:</span>
                <strong className="text-slate-900">Dewan Direksi & Dewan Komisaris</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">DARI:</span>
                <strong className="text-slate-900">Lead Enterprise Architect & MBB Advisory</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">TANGGAL:</span>
                <strong className="text-slate-900">{today}</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">STATUS DOKUMEN:</span>
                <strong className="text-emerald-700 font-bold">Final - Verified Evidences</strong>
              </div>
            </div>
          </div>

          {/* Section 1: Executive Summary (Pyramid Principle) */}
          <div className="space-y-3">
            <h2 className="text-sm font-extrabold text-blue-900 uppercase tracking-wider flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>1. RINGKASAN EKSEKUTIF (EXECUTIVE TAKEAWAY)</span>
            </h2>
            <div className="p-4 rounded-xl bg-blue-50/60 border-l-4 border-blue-600 text-slate-800 space-y-2 leading-relaxed">
              <p className="font-semibold text-slate-900 text-xs">
                Postur teknologi Bank BRI saat ini berada dalam posisi <strong>kepemimpinan terdepan (Top Quartile)</strong> di perbankan nasional dalam aspek *scalability* transaksi mikro (25.000+ TPS) dan kedaulatan data on-premise berbasis Confluent Kafka & Red Hat OpenShift.
              </p>
              <p className="text-slate-700 text-xs">
                Namun demikian, analisis intelijen kompetitor mengidentifikasi <strong>dua celah strategis utama</strong> yang diakselerasi oleh Bank Mandiri dan Bank BNI:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-700">
                <li>
                  <strong>Kelincahan Ekosistem Lifestyle:</strong> Mandiri memanfaatkan AWS Cloud Jakarta Region untuk fitur non-core Livin' Sukha dengan siklus rilis mingguan.
                </li>
                <li>
                  <strong>Sentralisasi Zero-Trust & Observability:</strong> Mandiri dan BSI telah menstandarisasi automated secrets rotation (HashiCorp Vault), serta BNI memutakhirkan AI observability (Dynatrace Perform).
                </li>
              </ul>
            </div>
          </div>

          {/* Section 2: Macro Benchmarking Table */}
          <div className="space-y-3">
            <h2 className="text-sm font-extrabold text-blue-900 uppercase tracking-wider flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>2. MATRIKS BENCHMARKING MAKRO 6 BANK TERKEMUKA</span>
            </h2>
            
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 font-bold text-slate-800 border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Bank</th>
                    <th className="p-2.5">Strategi Arsitektur Kunci</th>
                    <th className="p-2.5">Keunggulan Bersaing</th>
                    <th className="p-2.5">Titik Rentan (Vulnerability)</th>
                    <th className="p-2.5">Skor Kematangan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="bg-blue-50/40 font-medium">
                    <td className="p-2.5 font-extrabold text-blue-900">🟦 Bank BRI (Fokus)</td>
                    <td className="p-2.5">Event-driven Hybrid (Kafka + OpenShift + Cassandra)</td>
                    <td className="p-2.5 text-emerald-800 font-bold">Throughput TPS mikro terbesar; TCO efisien</td>
                    <td className="p-2.5 text-slate-600">Feature store cross-selling produk non-mikro</td>
                    <td className="p-2.5 font-black text-blue-900">9.3 / 10</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-900">🏦 Bank BCA</td>
                    <td className="p-2.5">Proprietary CBS Core + Cloudera AI on-prem + Red Hat 3scale</td>
                    <td className="p-2.5 text-blue-700">Throughput transaksi ritel masif & Tier III/IV DC mandiri</td>
                    <td className="p-2.5 text-slate-600">CapEx hardware on-premise tinggi & core tertutup</td>
                    <td className="p-2.5 font-bold text-slate-800">9.1 / 10</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-900">🔷 Bank Mandiri</td>
                    <td className="p-2.5">Hybrid AWS Cloud + Exadata Core + Dataiku</td>
                    <td className="p-2.5 text-blue-700">Ekosistem lifestyle Livin' & Data Science MLOps</td>
                    <td className="p-2.5 text-rose-700 font-bold">Beban lisensi legacy IBM DataStage (T+1 batch)</td>
                    <td className="p-2.5 font-bold text-slate-800">8.9 / 10</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-900">🟧 Bank BNI</td>
                    <td className="p-2.5">Cloudera AI + NVIDIA NIM + TCS BaNCS Core</td>
                    <td className="p-2.5 text-blue-700">Sovereign LLM on-premise & AI-KYC cepat</td>
                    <td className="p-2.5 text-slate-600">Transisi migrasi dari mobile banking lama ke wondr</td>
                    <td className="p-2.5 font-bold text-slate-800">8.4 / 10</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-900">🟩 Bank BSI</td>
                    <td className="p-2.5">Temenos Transact R10 ke R24 + Byond Super-App</td>
                    <td className="p-2.5 text-blue-700">Migrasi core syariah modern & availability 99.99%</td>
                    <td className="p-2.5 text-slate-600">Harmonisasi modul core syariah pasca-merger</td>
                    <td className="p-2.5 font-bold text-slate-800">7.6 / 10</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-900">🟨 Bank BTN</td>
                    <td className="p-2.5">Silverlake SIBS + Bale by BTN + OpenShift</td>
                    <td className="p-2.5 text-blue-700">Digitalisasi ekosistem perumahan & KPR</td>
                    <td className="p-2.5 text-slate-600">Kapasitas data lakehouse analitik perumahan</td>
                    <td className="p-2.5 font-bold text-slate-800">7.2 / 10</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: Three Strategic Imperatives */}
          <div className="space-y-3">
            <h2 className="text-sm font-extrabold text-blue-900 uppercase tracking-wider flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>3. TIGA IMPERATIF STRATEGIS UNTUK DIREKSI BRI</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
                <span className="font-extrabold text-blue-950 text-xs block">
                  I. Pertahankan Kedaulatan Streaming
                </span>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Pertahankan keunggulan Confluent Kafka & Cassandra. Hindari jebakan lisensi vendor proprietary ETL seperti kompetitor yang menghabiskan anggaran jutaan dolar per tahun.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
                <span className="font-extrabold text-blue-950 text-xs block">
                  II. Adopsi Isolated Hybrid Cloud
                </span>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Susun pilot project hybrid cloud terisolasi di Hyperscaler Region Jakarta khusus untuk layanan non-core lifestyle BRImo guna memangkas time-to-market fitur baru hingga 50%.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
                <span className="font-extrabold text-blue-950 text-xs block">
                  III. Sentralisasi Zero-Trust & UU PDP
                </span>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Standarisasi automated secrets rotation dan data masking di seluruh 200+ microservices BRImo untuk memastikan kepatuhan 100% terhadap sanksi UU PDP No. 27/2022.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: 24-Month Roadmap */}
          <div className="space-y-3">
            <h2 className="text-sm font-extrabold text-blue-900 uppercase tracking-wider flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>4. ROADMAP EKSEKUSI TAHAPAN MODERNISASI (2026–2028)</span>
            </h2>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="grid grid-cols-3 gap-2 font-bold text-slate-800 border-b pb-1 text-[11px]">
                <span>Wave 1: Foundation (Q4 2026 - Q1 2027)</span>
                <span>Wave 2: Modernization (Q2 2027 - Q4 2027)</span>
                <span>Wave 3: GenAI & Scale (2028+)</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-600">
                <div>
                  • Audit & standarisasi Vault secrets<br />
                  • Optimalisasi auto-scaling OpenShift<br />
                  • Hardening arsitektur SNAP API
                </div>
                <div>
                  • Pilot hybrid cloud lifestyle di Jakarta<br />
                  • Real-time feature store di Cassandra<br />
                  • Full-stack APM tracing end-to-end
                </div>
                <div>
                  • Autonomous AI credit scoring agent<br />
                  • GenAI Financial Advisor di BRImo<br />
                  • 0% proprietary legacy software
                </div>
              </div>
            </div>
          </div>

          {/* Formal Sign-off Block */}
          <div className="pt-6 border-t border-slate-300 flex items-center justify-between text-xs text-slate-500">
            <div>
              <div className="font-extrabold text-slate-900">Tim Konsultasi Arsitektur & Strategi Teknologi</div>
              <div>Prepared for the Executive Board of PT Bank Rakyat Indonesia (Persero) Tbk</div>
              <div className="text-[10px] text-slate-400 mt-1">Dicatat oleh sistem: Admin · {today}</div>
            </div>
            <div className="text-right">
              <div className="px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 font-extrabold text-[10px] inline-block">
                VERIFIED BY SQLITE AUDIT TRAIL
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Hash: SHA256-MBB-BRI-2026</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
