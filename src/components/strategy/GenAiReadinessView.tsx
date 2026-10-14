import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Cpu, Sparkles, Database, ShieldCheck, CheckCircle2, AlertTriangle, 
  ArrowRight, Layers, Bot, Network, Lock, Activity, Award
} from 'lucide-react';

interface BankAiScore {
  bankId: string;
  name: string;
  logo: string;
  overallScore: number; // 0 - 10
  streamingScore: number;
  lakehouseScore: number;
  infraScore: number;
  governanceScore: number;
  keyStrengths: string;
  keyBottlenecks: string;
  color: string;
}

export const GenAiReadinessView: React.FC = () => {
  const { banks } = useApp();
  const [selectedPillar, setSelectedPillar] = useState<string>('all');

  const bankScores: BankAiScore[] = [
    {
      bankId: 'bank-bri',
      name: 'Bank BRI',
      logo: '🟦',
      overallScore: 8.9,
      streamingScore: 9.6,
      lakehouseScore: 8.8,
      infraScore: 8.5,
      governanceScore: 8.7,
      keyStrengths: 'Confluent Kafka backbone + Apache Cassandra distributed storage; kapabilitas pemrosesan real-time AgenBRILink 25.000 TPS.',
      keyBottlenecks: 'Orkestrasi centralized enterprise feature store untuk AI cross-selling produk non-mikro.',
      color: '#1e40af'
    },
    {
      bankId: 'bank-mandiri',
      name: 'Bank Mandiri',
      logo: '🔷',
      overallScore: 8.4,
      streamingScore: 7.8,
      lakehouseScore: 8.9,
      infraScore: 8.8,
      governanceScore: 8.1,
      keyStrengths: 'Dataiku Enterprise Platform + AWS Cloud machine learning services di Livin\' Sukha.',
      keyBottlenecks: 'Ketergantungan pemrosesan batch T+1 pada legacy IBM InfoSphere DataStage memperlambat real-time feature generation.',
      color: '#0284c7'
    },
    {
      bankId: 'bank-bca',
      name: 'Bank BCA',
      logo: '🏦',
      overallScore: 8.8,
      streamingScore: 8.9,
      lakehouseScore: 9.0,
      infraScore: 9.1,
      governanceScore: 8.5,
      keyStrengths: 'Cloudera AI Workbench & Inference terpusat on-premise; Red Hat OpenShift & 3scale API Management; Tier III/IV DC mandiri.',
      keyBottlenecks: 'Pola adopsi model proprietary on-premise membutuhkan investasi komputasi hardware dedicated yang tinggi.',
      color: '#003882'
    },
    {
      bankId: 'bank-bni',
      name: 'Bank BNI',
      logo: '🟧',
      overallScore: 8.0,
      streamingScore: 8.1,
      lakehouseScore: 8.3,
      infraScore: 8.2,
      governanceScore: 7.7,
      keyStrengths: 'Cloudera AI Inference + NVIDIA NIM (on-premise sovereign LLM) & Apache Iceberg open lakehouse; AI-KYC pemangkas waktu review dokumen ke hitungan jam.',
      keyBottlenecks: 'Pipeline migrasi data lakehouse dan harmonisasi customer profile eks-legacy mobile banking ke wondr.',
      color: '#f97316'
    },
    {
      bankId: 'bank-bsi',
      name: 'Bank BSI',
      logo: '🟩',
      overallScore: 7.2,
      streamingScore: 7.0,
      lakehouseScore: 7.4,
      infraScore: 7.5,
      governanceScore: 7.0,
      keyStrengths: 'Migrasi Core Banking Temenos R10->R24 tuntas Mei 2026; Byond by BSI availability 99.99% melayani 10 juta+ nasabah.',
      keyBottlenecks: 'Fase akhir harmonisasi modul core syariah T24 dan integrasi multi-source data pasca merger.',
      color: '#10b981'
    },
    {
      bankId: 'bank-btn',
      name: 'Bank BTN',
      logo: '🟨',
      overallScore: 6.7,
      streamingScore: 6.6,
      lakehouseScore: 6.5,
      infraScore: 7.0,
      governanceScore: 6.5,
      keyStrengths: 'Adopsi Red Hat OpenShift modernisasi container ekosistem KPR digital dan peluncuran Bale by BTN.',
      keyBottlenecks: 'Kapasitas analytics data perumahan masih bertahap menuju arsitektur lakehouse terdistribusi.',
      color: '#eab308'
    }
  ];

  const pillars = [
    {
      id: 'pillar-streaming',
      title: '1. Real-Time Streaming & Event Mesh',
      icon: Network,
      briWeight: 'Sangat Unggul (9.6/10)',
      mandiriWeight: 'Menengah (7.8/10)',
      description: 'Kemampuan mengalirkan mutasi, klik, dan transaksi secara real-time ke inference model AI tanpa jeda batch harian.',
      briDetails: 'Apache Kafka cluster memproses 25.000 TPS real-time fraud scoring dan dynamic limit AgenBRILink.',
      implication: 'Keunggulan mutlak bagi BRI untuk meluncurkan asisten proaktif saat nasabah sedang bertransaksi.'
    },
    {
      id: 'pillar-lakehouse',
      title: '2. Lakehouse & Feature Store Unification',
      icon: Database,
      briWeight: 'Unggul (8.8/10)',
      mandiriWeight: 'Sangat Unggul (8.9/10)',
      description: 'Fondasi data mart terpadu dengan metadata lineage otomatis untuk supply feature training model ML.',
      briDetails: 'Apache Cassandra 40+ nodes menampung triliunan mutasi historis; integrasi Lakehouse Iceberg sedang berjalan.',
      implication: 'Mandiri unggul sedikit karena ekosistem Dataiku, namun terhambat batch legacy DataStage.'
    },
    {
      id: 'pillar-infra',
      title: '3. Private GenAI Compute & Model Mesh',
      icon: Cpu,
      briWeight: 'Kuat (8.5/10)',
      mandiriWeight: 'Sangat Kuat (8.8/10)',
      description: 'Ketersediaan infrastruktur komputasi inferensi (GPU cluster on-prem vs private hyperscaler gateway) dengan latensi < 200ms.',
      briDetails: 'Private On-Premises Kubernetes GPU worker nodes di OpenShift demi kepatuhan kedaulatan data.',
      implication: 'Mandiri memanfaatkan AWS Cloud Jakarta Region, sementara BRI memprioritaskan keamanan zero-trust di on-prem.'
    },
    {
      id: 'pillar-governance',
      title: '4. AI Governance, Explainability & UU PDP',
      icon: ShieldCheck,
      briWeight: 'Sangat Kuat (8.7/10)',
      mandiriWeight: 'Kuat (8.1/10)',
      description: 'Pencegahan halusinasi AI, audit trail keputusan kredit (explainable AI OJK), dan penyamaran PII otomatis (UU PDP No. 27/2022).',
      briDetails: 'Audit trail terintegrasi, hashing identitas nasabah, dan strict model validation governance.',
      implication: 'BRI terdepan dalam mitigasi risiko regulatory AI di segmen pembiayaan UMKM/Ultra Mikro.'
    }
  ];

  const filteredPillars = selectedPillar === 'all' 
    ? pillars 
    : pillars.filter(p => p.id === selectedPillar);

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              GenAI & Modern Data Architecture Readiness Benchmark (2026/2027)
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
              Future-Ready Banking Index
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Evaluasi kesiapan arsitektur data, komputasi inference, dan tata kelola UU PDP Bank BRI vs Himbara untuk era *Autonomous Agentic Banking*.
          </p>
        </div>
      </div>

      {/* Leaderboard Readiness Scorecards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {bankScores.map((score, idx) => {
          const isBRI = score.bankId === 'bank-bri';
          return (
            <div 
              key={score.bankId}
              className={`p-5 rounded-2xl border transition flex flex-col justify-between ${
                isBRI 
                  ? 'bg-gradient-to-br from-blue-900 to-indigo-900 text-white shadow-md border-blue-500' 
                  : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{score.logo}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                    isBRI ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    Rank #{idx + 1}
                  </span>
                </div>
                <h4 className={`font-extrabold text-base ${isBRI ? 'text-white' : 'text-slate-900'}`}>
                  {score.name}
                </h4>
                <div className="mt-2 flex items-baseline space-x-1">
                  <span className={`text-3xl font-black ${isBRI ? 'text-orange-400' : 'text-blue-600'}`}>
                    {score.overallScore}
                  </span>
                  <span className={`text-xs ${isBRI ? 'text-blue-200' : 'text-slate-400'}`}>/ 10</span>
                </div>
              </div>

              <div className={`mt-4 pt-3 border-t text-[11px] space-y-1.5 ${
                isBRI ? 'border-blue-700/80 text-blue-100' : 'border-slate-100 text-slate-600'
              }`}>
                <div className="flex justify-between">
                  <span>Streaming Mesh:</span>
                  <strong className={isBRI ? 'text-emerald-300' : 'text-slate-800'}>{score.streamingScore}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Lakehouse/Feature:</span>
                  <strong className={isBRI ? 'text-emerald-300' : 'text-slate-800'}>{score.lakehouseScore}</strong>
                </div>
                <div className="flex justify-between">
                  <span>AI Compute Infra:</span>
                  <strong className={isBRI ? 'text-emerald-300' : 'text-slate-800'}>{score.infraScore}</strong>
                </div>
                <div className="flex justify-between">
                  <span>UU PDP Governance:</span>
                  <strong className={isBRI ? 'text-emerald-300' : 'text-slate-800'}>{score.governanceScore}</strong>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4 Pillars Deep-Dive Comparison */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base flex items-center space-x-2">
              <Bot className="w-5 h-5 text-purple-600" />
              <span>4 Pilar Kesiapan Arsitektur AI & Data Modern</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Perbandingan arsitektural antara Bank BRI (Pemimpin Streaming) vs Bank Mandiri (Pemimpin Platform Kolaboratif).
            </p>
          </div>

          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl text-xs">
            <button
              onClick={() => setSelectedPillar('all')}
              className={`px-3 py-1 rounded-lg font-bold transition ${
                selectedPillar === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Semua Pilar
            </button>
            {pillars.map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedPillar(p.id)}
                className={`px-3 py-1 rounded-lg font-bold transition ${
                  selectedPillar === p.id ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                {p.title.split('.')[1]}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredPillars.map(pillar => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="p-2 rounded-xl bg-purple-100 text-purple-800">
                      <Icon className="w-4 h-4" />
                    </span>
                    <h4 className="font-extrabold text-slate-900 text-sm">{pillar.title}</h4>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 font-extrabold">
                      BRI: {pillar.briWeight}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-800 font-semibold">
                      Mandiri: {pillar.mandiriWeight}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-blue-200 space-y-1">
                    <span className="font-bold text-blue-900 text-[11px] uppercase tracking-wider">
                      🟦 Postur Teknis Bank BRI
                    </span>
                    <p className="text-slate-700 leading-relaxed">{pillar.briDetails}</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-purple-200 space-y-1">
                    <span className="font-bold text-purple-900 text-[11px] uppercase tracking-wider">
                      💡 Implikasi Strategis MBB
                    </span>
                    <p className="text-slate-700 leading-relaxed">{pillar.implication}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3-Wave Strategic Roadmap for BRI */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div>
          <div className="flex items-center space-x-2 text-orange-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Roadmap Transformasi AI & Data Bank BRI (2026–2028)</span>
          </div>
          <h3 className="text-xl font-extrabold text-white mt-1">
            3-Wave Phased Execution Plan to Autonomous Banking
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <div className="flex justify-between items-center">
              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold text-[10px]">
                WAVE 1 (0-6 Bulan)
              </span>
              <span className="text-slate-400 font-semibold text-[10px]">Foundation</span>
            </div>
            <h5 className="font-extrabold text-white text-sm">Enterprise Feature Store</h5>
            <p className="text-slate-300 leading-relaxed">
              Mengintegrasikan Cassandra dan Kafka menjadi real-time feature store terpusat. Mengeliminasi silo data antar divisi produk BRImo dan mikro.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <div className="flex justify-between items-center">
              <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold text-[10px]">
                WAVE 2 (6-18 Bulan)
              </span>
              <span className="text-slate-400 font-semibold text-[10px]">Intelligence</span>
            </div>
            <h5 className="font-extrabold text-white text-sm">Private LLM Co-Pilot & Fraud Agent</h5>
            <p className="text-slate-300 leading-relaxed">
              Peluncuran AI Financial Advisor interaktif di aplikasi BRImo dan scoring pencegahan fraud transaksi social-engineering secara otonom.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <div className="flex justify-between items-center">
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                WAVE 3 (18-36 Bulan)
              </span>
              <span className="text-slate-400 font-semibold text-[10px]">Scale</span>
            </div>
            <h5 className="font-extrabold text-white text-sm">Autonomous Banking Ecosystem</h5>
            <p className="text-slate-300 leading-relaxed">
              Persetujuan kredit mikro instan end-to-end dengan AI agent, personalisasi penawaran real-time di 1.000.000+ AgenBRILink di seluruh Indonesia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
