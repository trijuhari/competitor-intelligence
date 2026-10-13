import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  TrendingUp, AlertTriangle, CheckCircle2, ArrowRight, 
  Lightbulb, ShieldCheck, Sparkles, Zap, Building2 
} from 'lucide-react';

export const GapAnalysisView: React.FC = () => {
  const { 
    technologies, 
    categories, 
    banks, 
    findings, 
    setSelectedFindingModalId 
  } = useApp();

  const briFindings = findings.filter(f => f.bankId === 'bank-bri');
  const briTechIds = new Set(briFindings.map(f => f.technologyId));

  // Gaps where BRI does NOT have the tech, but 1 or more competitors DO
  const gapTechnologies = technologies.filter(t => !briTechIds.has(t.id)).map(tech => {
    const adoptingBanks = findings
      .filter(f => f.technologyId === tech.id && f.bankId !== 'bank-bri')
      .map(f => {
        const b = banks.find(x => x.id === f.bankId);
        return { bank: b, finding: f };
      });

    const category = categories.find(c => c.id === tech.categoryId);

    // Determine impact urgency
    let priority: 'Tinggi' | 'Sedang' | 'Rendah' = 'Sedang';
    let rekomendasi = '';

    if (tech.id === 'tech-aws-hybrid' || tech.id === 'tech-gcp') {
      priority = 'Tinggi';
      rekomendasi = 'Mandiri telah memanfaatkan AWS Region Jakarta untuk ekosistem lifestyle Livin\' Sukha. BRI perlu mengkaji hybrid cloud terisolasi untuk fitur non-core lifestyle BRImo guna memangkas time-to-market.';
    } else if (tech.id === 'tech-dataiku' || tech.id === 'tech-fico-scoring') {
      priority = 'Tinggi';
      rekomendasi = 'Mandiri menggunakan collaborative data science platform terpusat (Dataiku). BRI dapat memperkuat MLOps pipeline internal agar data scientist bisnis dapat deploy model credit scoring mandiri.';
    } else if (tech.id === 'tech-hashicorp-vault') {
      priority = 'Tinggi';
      rekomendasi = 'Mandiri & BSI mengonfirmasi HashiCorp Vault untuk automated zero-trust secrets rotation. Standar mitigasi ransomware dan kepatuhan UU PDP.';
    } else if (tech.id === 'tech-angular') {
      priority = 'Rendah';
      rekomendasi = 'Stack backoffice legacy di BTN. BRI lebih unggul dengan standarisasi React & Next.js modern.';
    } else {
      priority = 'Sedang';
      rekomendasi = 'Perlu dimonitor melalui pilot project arsitektur untuk menjaga paritas kapabilitas dengan kompetitor.';
    }

    return {
      tech,
      category,
      adoptingBanks,
      priority,
      rekomendasi
    };
  }).filter(g => g.adoptingBanks.length > 0);

  // BRI Advantages (Technologies where BRI leads)
  const briLeadingTechs = technologies.filter(t => briTechIds.has(t.id)).map(tech => {
    const competitorAdoptions = findings.filter(f => f.technologyId === tech.id && f.bankId !== 'bank-bri');
    const category = categories.find(c => c.id === tech.categoryId);

    return {
      tech,
      category,
      competitorCount: competitorAdoptions.length,
      isExclusive: competitorAdoptions.length === 0
    };
  }).filter(b => b.isExclusive);

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Analisis Kesenjangan & Peluang Strategis (Gap Analysis)
          </h2>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-orange-800">
            V1.5 · Strategic Insights
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Identifikasi otomatis perbedaan teknologi yang telah diadopsi kompetitor (Mandiri, BNI, BTN, BSI) beserta rekomendasi taktis bagi tim arsitek BRI.
        </p>
      </div>

      {/* Summary Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border border-orange-200">
          <div className="flex items-center space-x-2 text-orange-800 font-extrabold text-sm mb-1">
            <AlertTriangle className="w-4 h-4 text-orange-600" />
            <span>Potensi Celah Teknologi (Gap untuk BRI)</span>
          </div>
          <div className="text-2xl font-black text-orange-950 mt-2">
            {gapTechnologies.length} Komponen Stack
          </div>
          <p className="text-xs text-orange-900/80 mt-1 leading-relaxed">
            Ditemukan pada kompetitor namun belum terdeteksi adopsinya di ekosistem BRI. Memerlukan evaluasi apakah ini merupakan kebutuhan strategis atau perbedaan fokus bisnis.
          </p>
        </div>

        <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
          <div className="flex items-center space-x-2 text-blue-800 font-extrabold text-sm mb-1">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Keunggulan Kompetitif Eksklusif BRI</span>
          </div>
          <div className="text-2xl font-black text-blue-950 mt-2">
            {briLeadingTechs.length} Komponen Stack
          </div>
          <p className="text-xs text-blue-900/80 mt-1 leading-relaxed">
            Teknologi skala masif (Cassandra cluster, MinIO S3 on-premise, Sabrina NLP engine) yang memberi keunggulan unjuk kerja bagi operasional ultra-mikro BRI.
          </p>
        </div>
      </div>

      {/* Gaps List Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-slate-900 flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-orange-500" />
            <span>Daftar Celah Arsitektur & Rekomendasi Roadmap</span>
          </h3>
          <span className="text-xs text-slate-500">
            Dikelompokkan berdasarkan tingkat urgensi
          </span>
        </div>

        <div className="space-y-3">
          {gapTechnologies.map(item => {
            return (
              <div 
                key={item.tech.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition space-y-3"
              >
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-extrabold text-slate-900 text-sm">{item.tech.nama}</h4>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
                        {item.category?.nama}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        item.priority === 'Tinggi' 
                          ? 'bg-rose-100 text-rose-800 border border-rose-200' 
                          : item.priority === 'Sedang'
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        Prioritas {item.priority}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500">
                      Vendor / Pemilik: <strong className="text-slate-700">{item.tech.vendor}</strong>
                    </div>
                  </div>

                  {/* Competitor badges */}
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[11px] text-slate-500 font-medium mr-1">Diadopsi oleh:</span>
                    {item.adoptingBanks.map(({ bank, finding }) => (
                      <button
                        key={bank?.id}
                        onClick={() => setSelectedFindingModalId(finding.id)}
                        className="px-2.5 py-1 rounded-lg bg-orange-50 hover:bg-orange-100 border border-orange-200 text-orange-900 text-xs font-bold transition flex items-center space-x-1"
                        title="Klik untuk melihat bukti temuan"
                      >
                        <span>{bank?.logo}</span>
                        <span>{bank?.singkatan}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.tech.deskripsi}
                </p>

                {/* Recommendation Box */}
                <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-200/80 flex items-start space-x-2 text-xs">
                  <Lightbulb className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-blue-950 block mb-0.5">Rekomendasi untuk Tim Arsitektur BRI:</span>
                    <p className="text-blue-900 leading-relaxed">
                      {item.rekomendasi}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* BRI Exclusive Strengths */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h3 className="text-base font-extrabold text-slate-900 flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Keunggulan Kompetitif BRI yang Belum Dimiliki Kompetitor</span>
        </h3>
        <p className="text-xs text-slate-500">
          Infrastruktur unik yang menopang volume transaksi skala raksasa BRI (AgenBRILink, UMKM micro-lending):
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {briLeadingTechs.map(item => (
            <div key={item.tech.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
              <div className="font-extrabold text-slate-900">{item.tech.nama}</div>
              <div className="text-[11px] text-blue-600 font-medium">{item.category?.nama}</div>
              <p className="text-slate-600 text-[11px] mt-1 line-clamp-2">{item.tech.deskripsi}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
