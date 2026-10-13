import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Compass, Zap, Rocket, ShieldCheck, AlertOctagon, CheckCircle2, 
  ArrowUpRight, Filter, Layers, ChevronRight, Sparkles, Building2, Eye, Info
} from 'lucide-react';
import { TechType, Finding } from '../../types';

interface MatrixInitiative {
  id: string;
  name: string;
  domain: string;
  quadrant: 'quick-win' | 'strategic-bet' | 'hygiene' | 'tech-debt';
  strategy4R: 'Rehost' | 'Refactor' | 'Rearchitect' | 'Retire/Replace';
  businessImpactScore: number; // 1 - 10
  effortScore: number; // 1 - 10 (Complexity/Cost)
  briStatus: 'Adopted' | 'In Progress' | 'Evaluating' | 'Legacy';
  competitorStatus: string;
  rationale: string;
  timeframe: string;
  findingId?: string;
}

export const StrategicDecisionMatrixView: React.FC = () => {
  const { setSelectedFindingModalId, navigate } = useApp();

  const [selectedQuadrant, setSelectedQuadrant] = useState<string>('all');
  const [selected4R, setSelected4R] = useState<string>('all');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');

  const initiatives: MatrixInitiative[] = [
    // Quadrant: Quick Wins (High Impact, Low/Medium Effort)
    {
      id: 'init-snap-api',
      name: 'Standarisasi SNAP API & Merchant Mesh Gateway',
      domain: 'Integration & Open Banking',
      quadrant: 'quick-win',
      strategy4R: 'Refactor',
      businessImpactScore: 8.8,
      effortScore: 3.2,
      briStatus: 'Adopted',
      competitorStatus: 'Mandiri & BNI aktif ekspansi ekosistem lifestyle',
      rationale: 'Kepatuhan regulasi BI-SNAP sekaligus membuka monetisasi perbankan terbuka bagi jutaan AgenBRILink dengan latensi < 100ms.',
      timeframe: '0 - 6 Bulan',
      findingId: 'f-bri-snap'
    },
    {
      id: 'init-redis-cache',
      name: 'Multi-Tier In-Memory Token Caching (Redis Enterprise)',
      domain: 'Performance & In-Memory',
      quadrant: 'quick-win',
      strategy4R: 'Refactor',
      businessImpactScore: 8.5,
      effortScore: 3.5,
      briStatus: 'Adopted',
      competitorStatus: 'Mandiri Livin\' mengandalkan Redis cluster untuk auth token',
      rationale: 'Mencegah bottleneck basis data saat flash sale atau gajian (peak 25.000+ TPS). Menurunkan beban DB core hingga 45%.',
      timeframe: '3 - 6 Bulan',
      findingId: 'f-mdr-redis'
    },
    {
      id: 'init-dynatrace-apm',
      name: 'Full-Stack Distributed Tracing & APM (OpenTelemetry / Dynatrace)',
      domain: 'Observability',
      quadrant: 'quick-win',
      strategy4R: 'Refactor',
      businessImpactScore: 8.2,
      effortScore: 3.8,
      briStatus: 'Evaluating',
      competitorStatus: 'BNI menggunakan Dynatrace Perform di seluruh microservices wondr',
      rationale: 'Mengurangi Mean Time to Detect (MTTD) insiden sistemik dari hitungan jam ke menit dengan visualisasi end-to-end dependency.',
      timeframe: '3 - 9 Bulan',
      findingId: 'f-bni-dynatrace'
    },

    // Quadrant: Strategic Bets / Game Changers (High Impact, High Effort)
    {
      id: 'init-kafka-mesh',
      name: 'Event-Driven Real-Time Streaming Mesh (Confluent Kafka)',
      domain: 'Data & Event Streaming',
      quadrant: 'strategic-bet',
      strategy4R: 'Rearchitect',
      businessImpactScore: 9.6,
      effortScore: 7.8,
      briStatus: 'Adopted',
      competitorStatus: 'Mandiri & BNI mengombinasikan Kafka dengan engine ETL legacy',
      rationale: 'Tulang punggung real-time fraud scoring, credit scoring AgenBRILink, dan mutasi instan 24/7. Keunggulan mutlak BRI di Himbara.',
      timeframe: '12 - 24 Bulan',
      findingId: 'f-bri-kafka'
    },
    {
      id: 'init-hybrid-cloud',
      name: 'Isolated Hybrid Hyperscaler Bursting (AWS Jakarta Region)',
      domain: 'Cloud Infrastructure',
      quadrant: 'strategic-bet',
      strategy4R: 'Rearchitect',
      businessImpactScore: 9.0,
      effortScore: 8.2,
      briStatus: 'Evaluating',
      competitorStatus: 'Mandiri Livin\' Sukha sukses deploy fitur lifestyle di AWS Jakarta',
      rationale: 'Menampung lonjakan traffic fitur lifestyle non-core perbankan tanpa membebani on-premise datacenter, sambil tetap menjaga data core di on-prem (UU PDP).',
      timeframe: '18 - 36 Bulan',
      findingId: 'f-mdr-aws'
    },
    {
      id: 'init-genai-copilot',
      name: 'Autonomous Agentic AI & Real-Time Fraud Defense Cluster',
      domain: 'AI & Data Science',
      quadrant: 'strategic-bet',
      strategy4R: 'Rearchitect',
      businessImpactScore: 9.4,
      effortScore: 8.5,
      briStatus: 'In Progress',
      competitorStatus: 'Mandiri menggunakan Dataiku; BNI eksplorasi Davis AI',
      rationale: 'Pengambilan keputusan kredit mikro otomatis dan asisten finansial interaktif di BRImo dengan arsitektur private on-premise LLM.',
      timeframe: '12 - 24 Bulan'
    },

    // Quadrant: Operational Hygiene (Low/Mod Impact, Low Effort)
    {
      id: 'init-vault-secrets',
      name: 'Automated Zero-Trust Secrets & Key Rotation (HashiCorp Vault)',
      domain: 'Security & IAM',
      quadrant: 'hygiene',
      strategy4R: 'Rehost',
      businessImpactScore: 6.8,
      effortScore: 2.8,
      briStatus: 'In Progress',
      competitorStatus: 'BSI pasca-merger & Mandiri menstandarisasi Vault enterprise',
      rationale: 'Standar wajib pencegahan kebocoran credentials, memenuhi klausul audit keamanan siber BI dan klausul UU PDP No. 27/2022.',
      timeframe: '0 - 6 Bulan',
      findingId: 'f-bsi-vault'
    },
    {
      id: 'init-kotlin-clean',
      name: 'Strict Native Modular Architecture (Kotlin Coroutines / Swift)',
      domain: 'Mobile Frontend',
      quadrant: 'hygiene',
      strategy4R: 'Refactor',
      businessImpactScore: 6.5,
      effortScore: 3.5,
      briStatus: 'Adopted',
      competitorStatus: 'Seluruh bank Himbara meninggalkan hybrid demi native performance',
      rationale: 'Fondasi stabilitas crash-free rate > 99.8% pada aplikasi super-app BRImo dengan proteksi hardware key-store.',
      timeframe: 'Ongoing',
      findingId: 'f-bri-kotlin'
    },
    {
      id: 'init-container-openshift',
      name: 'Hybrid Kubernetes Cluster Hardening (Red Hat OpenShift)',
      domain: 'Cloud Infrastructure',
      quadrant: 'hygiene',
      strategy4R: 'Refactor',
      businessImpactScore: 7.2,
      effortScore: 4.0,
      briStatus: 'Adopted',
      competitorStatus: 'Standar konsensus Himbara (BRI, BTN, BNI mengadopsi OpenShift)',
      rationale: 'Mencegah perbedaan environment dev-staging-prod, mempercepat release cycle dari bulanan menjadi harian.',
      timeframe: 'Ongoing',
      findingId: 'f-bri-openshift'
    },

    // Quadrant: Tech Debt / Phase-Out Candidates (Low Value, High Cost/Effort)
    {
      id: 'init-datastage-retire',
      name: 'Migrasi Legacy Batch ETL (IBM DataStage) ke Streaming Pipeline',
      domain: 'Data & ETL',
      quadrant: 'tech-debt',
      strategy4R: 'Retire/Replace',
      businessImpactScore: 4.2,
      effortScore: 8.8,
      briStatus: 'Adopted', // BRI already avoided it!
      competitorStatus: 'Mandiri masih terikat lisensi legacy IBM InfoSphere DataStage',
      rationale: 'Biaya lisensi per-core sangat mahal dan pemrosesan batch T+1 menghambat analisis nasabah real-time. BRI wajib mempertahankan arsitektur Kafka/Spark streaming.',
      timeframe: 'Phase-Out Plan',
      findingId: 'f-mdr-ibm-datastage'
    },
    {
      id: 'init-monolith-angular',
      name: 'Decommission Legacy Backoffice Frameworks (AngularJS v1 / JSP)',
      domain: 'Web Frontend',
      quadrant: 'tech-debt',
      strategy4R: 'Retire/Replace',
      businessImpactScore: 3.8,
      effortScore: 6.5,
      briStatus: 'In Progress',
      competitorStatus: 'BTN masih memiliki footprint Angular backoffice legacy',
      rationale: 'Rentan kerentanan keamanan unpatched, sulit merekrut talenta muda, dan integrasi API modern terhambat.',
      timeframe: '6 - 12 Bulan'
    }
  ];

  // Filtering
  const filteredInitiatives = initiatives.filter(init => {
    if (selectedQuadrant !== 'all' && init.quadrant !== selectedQuadrant) return false;
    if (selected4R !== 'all' && init.strategy4R !== selected4R) return false;
    if (selectedDomain !== 'all' && init.domain !== selectedDomain) return false;
    return true;
  });

  const quickWins = initiatives.filter(i => i.quadrant === 'quick-win');
  const strategicBets = initiatives.filter(i => i.quadrant === 'strategic-bet');
  const hygiene = initiatives.filter(i => i.quadrant === 'hygiene');
  const techDebts = initiatives.filter(i => i.quadrant === 'tech-debt');

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Strategic Decision Matrix & Prioritization Framework
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
              MBB 2x2 & 4R Model
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Panduan pengambilan keputusan Direksi: Menyeimbangkan dampak bisnis (*Strategic Impact*) vs kompleksitas eksekusi (*Implementation Effort*).
          </p>
        </div>

        {/* Quick Action Badges */}
        <div className="flex items-center space-x-2 text-xs">
          <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold flex items-center space-x-1.5">
            <Zap className="w-3.5 h-3.5 text-emerald-600" />
            <span>{quickWins.length} Quick Wins</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-800 font-bold flex items-center space-x-1.5">
            <Rocket className="w-3.5 h-3.5 text-purple-600" />
            <span>{strategicBets.length} Strategic Bets</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 font-bold flex items-center space-x-1.5">
            <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
            <span>{techDebts.length} Tech Debt</span>
          </div>
        </div>
      </div>

      {/* 2x2 Interactive Quadrant Matrix Visualization */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base flex items-center space-x-2">
              <Compass className="w-5 h-5 text-blue-600" />
              <span>Matriks Prioritas Inisiatif 2x2 (Effort vs. Impact)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Klik pada salah satu inisiatif di bawah untuk melihat rincian bukti dan rasionalisasi arsitektur.
            </p>
          </div>

          {/* Quick Filters */}
          <div className="flex items-center space-x-2 flex-wrap gap-2 text-xs">
            <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl">
              {[
                { id: 'all', label: 'Semua Kuadran' },
                { id: 'quick-win', label: '⚡ Quick Wins' },
                { id: 'strategic-bet', label: '🚀 Strategic Bets' },
                { id: 'hygiene', label: '🛡️ Hygiene' },
                { id: 'tech-debt', label: '⚠️ Tech Debt' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedQuadrant(tab.id)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition text-xs ${
                    selectedQuadrant === tab.id
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <select
              value={selected4R}
              onChange={e => setSelected4R(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold"
            >
              <option value="all">Strategi 4R: Semua</option>
              <option value="Rehost">Rehost (Lift & Shift)</option>
              <option value="Refactor">Refactor (Modernize)</option>
              <option value="Rearchitect">Rearchitect (Cloud Native)</option>
              <option value="Retire/Replace">Retire / Replace</option>
            </select>
          </div>
        </div>

        {/* 2x2 Grid Representation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          {/* Top-Left: QUICK WINS */}
          <div className={`p-5 rounded-2xl border transition ${
            selectedQuadrant === 'all' || selectedQuadrant === 'quick-win'
              ? 'bg-gradient-to-br from-emerald-50/70 to-teal-50/40 border-emerald-300 shadow-sm'
              : 'opacity-40 border-slate-200 bg-slate-50'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="p-1.5 rounded-lg bg-emerald-600 text-white">
                  <Zap className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="font-extrabold text-emerald-950 text-sm">KUADRAN I: QUICK WINS</h4>
                  <p className="text-[11px] text-emerald-800">Dampak Tinggi (High Impact) · Kompleksitas Rendah (Low Effort)</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs">
                Time-to-Value: &lt; 6 Bulan
              </span>
            </div>

            <div className="space-y-3 mt-4">
              {quickWins.map(item => (
                <div 
                  key={item.id}
                  onClick={() => item.findingId && setSelectedFindingModalId(item.findingId)}
                  className="p-3.5 bg-white rounded-xl border border-emerald-200/80 shadow-2xs hover:border-emerald-400 hover:shadow-xs transition cursor-pointer space-y-1.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-extrabold text-slate-900 text-xs">{item.name}</span>
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold text-[10px] shrink-0">
                      {item.strategy4R}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{item.rationale}</p>
                  <div className="flex items-center justify-between text-[10px] pt-1 border-t border-slate-100">
                    <span className="text-slate-500">Domain: <strong>{item.domain}</strong></span>
                    <span className="text-emerald-700 font-bold flex items-center space-x-1">
                      <span>Status BRI: {item.briStatus}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top-Right: STRATEGIC BETS */}
          <div className={`p-5 rounded-2xl border transition ${
            selectedQuadrant === 'all' || selectedQuadrant === 'strategic-bet'
              ? 'bg-gradient-to-br from-purple-50/70 to-indigo-50/40 border-purple-300 shadow-sm'
              : 'opacity-40 border-slate-200 bg-slate-50'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="p-1.5 rounded-lg bg-purple-600 text-white">
                  <Rocket className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="font-extrabold text-purple-950 text-sm">KUADRAN II: STRATEGIC BETS</h4>
                  <p className="text-[11px] text-purple-800">Dampak Transformasional Tinggi · Butuh Investasi Besar (High Effort)</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-extrabold text-xs">
                Time-to-Value: 12 - 36 Bulan
              </span>
            </div>

            <div className="space-y-3 mt-4">
              {strategicBets.map(item => (
                <div 
                  key={item.id}
                  onClick={() => item.findingId && setSelectedFindingModalId(item.findingId)}
                  className="p-3.5 bg-white rounded-xl border border-purple-200/80 shadow-2xs hover:border-purple-400 hover:shadow-xs transition cursor-pointer space-y-1.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-extrabold text-slate-900 text-xs">{item.name}</span>
                    <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold text-[10px] shrink-0">
                      {item.strategy4R}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{item.rationale}</p>
                  <div className="flex items-center justify-between text-[10px] pt-1 border-t border-slate-100">
                    <span className="text-slate-500">Domain: <strong>{item.domain}</strong></span>
                    <span className="text-purple-700 font-bold flex items-center space-x-1">
                      <span>Status BRI: {item.briStatus}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom-Left: OPERATIONAL HYGIENE */}
          <div className={`p-5 rounded-2xl border transition ${
            selectedQuadrant === 'all' || selectedQuadrant === 'hygiene'
              ? 'bg-gradient-to-br from-sky-50/70 to-blue-50/40 border-sky-300 shadow-sm'
              : 'opacity-40 border-slate-200 bg-slate-50'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="p-1.5 rounded-lg bg-sky-600 text-white">
                  <ShieldCheck className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="font-extrabold text-sky-950 text-sm">KUADRAN III: OPERATIONAL HYGIENE</h4>
                  <p className="text-[11px] text-sky-800">Fondasi Wajib / Kepatuhan Regulasi · Kompleksitas Terkelola</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 font-extrabold text-xs">
                Baseline Standar
              </span>
            </div>

            <div className="space-y-3 mt-4">
              {hygiene.map(item => (
                <div 
                  key={item.id}
                  onClick={() => item.findingId && setSelectedFindingModalId(item.findingId)}
                  className="p-3.5 bg-white rounded-xl border border-sky-200/80 shadow-2xs hover:border-sky-400 hover:shadow-xs transition cursor-pointer space-y-1.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-extrabold text-slate-900 text-xs">{item.name}</span>
                    <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-bold text-[10px] shrink-0">
                      {item.strategy4R}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{item.rationale}</p>
                  <div className="flex items-center justify-between text-[10px] pt-1 border-t border-slate-100">
                    <span className="text-slate-500">Domain: <strong>{item.domain}</strong></span>
                    <span className="text-sky-700 font-bold flex items-center space-x-1">
                      <span>Status BRI: {item.briStatus}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom-Right: TECH DEBT / PHASE-OUT */}
          <div className={`p-5 rounded-2xl border transition ${
            selectedQuadrant === 'all' || selectedQuadrant === 'tech-debt'
              ? 'bg-gradient-to-br from-rose-50/70 to-red-50/40 border-rose-300 shadow-sm'
              : 'opacity-40 border-slate-200 bg-slate-50'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="p-1.5 rounded-lg bg-rose-600 text-white">
                  <AlertOctagon className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="font-extrabold text-rose-950 text-sm">KUADRAN IV: DECOMMISSION / TECH DEBT</h4>
                  <p className="text-[11px] text-rose-800">Nilai Rendah & Beban OPEX Tinggi · Prioritas Pengalihan Lisensi</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-extrabold text-xs">
                Eliminasi Beban
              </span>
            </div>

            <div className="space-y-3 mt-4">
              {techDebts.map(item => (
                <div 
                  key={item.id}
                  onClick={() => item.findingId && setSelectedFindingModalId(item.findingId)}
                  className="p-3.5 bg-white rounded-xl border border-rose-200/80 shadow-2xs hover:border-rose-400 hover:shadow-xs transition cursor-pointer space-y-1.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-extrabold text-slate-900 text-xs">{item.name}</span>
                    <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold text-[10px] shrink-0">
                      {item.strategy4R}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{item.rationale}</p>
                  <div className="flex items-center justify-between text-[10px] pt-1 border-t border-slate-100">
                    <span className="text-slate-500">Benchmark Peer: <strong>{item.competitorStatus}</strong></span>
                    <span className="text-rose-700 font-bold flex items-center space-x-1">
                      <span>Rekomendasi: {item.strategy4R}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MBB 4R Modernization Framework Explainer */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <h3 className="font-extrabold text-lg text-white">
                The 4R Modernization Playbook for Bank BRI (2026–2028)
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Framework rasionalisasi arsitektur konsultan MBB untuk memastikan setiap alokasi CAPEX menghasilkan efisiensi OPEX berkesinambungan.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
            <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 font-extrabold uppercase text-[10px]">
              1. REHOST
            </span>
            <h5 className="font-bold text-white text-sm">Lift-and-Shift Terkendali</h5>
            <p className="text-slate-400 leading-relaxed">
              Memindahkan komponen standar tanpa mengubah kode untuk kepatuhan regulasi cepat (contoh: deployment Vault di on-prem cluster).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
            <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-extrabold uppercase text-[10px]">
              2. REFACTOR
            </span>
            <h5 className="font-bold text-white text-sm">Optimasi Microservices</h5>
            <p className="text-slate-400 leading-relaxed">
              Mengoptimalkan kode & API containerized (OpenShift, Kotlin Clean Architecture) untuk meningkatkan throughput TPS tanpa ganti infra.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
            <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 font-extrabold uppercase text-[10px]">
              3. REARCHITECT
            </span>
            <h5 className="font-bold text-white text-sm">Cloud-Native Transformation</h5>
            <p className="text-slate-400 leading-relaxed">
              Membangun arsitektur event-driven sejati (Kafka streaming mesh, hybrid cloud burst di AWS Jakarta) untuk melipatgandakan kecepatan time-to-market.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
            <span className="px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 font-extrabold uppercase text-[10px]">
              4. RETIRE / REPLACE
            </span>
            <h5 className="font-bold text-white text-sm">Eliminasi Lisensi Legacy</h5>
            <p className="text-slate-400 leading-relaxed">
              Menghentikan lisensi proprietary mahal (seperti legacy batch ETL IBM DataStage atau basis data proprietary) dan menggantikannya dengan open-source enterprise.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
