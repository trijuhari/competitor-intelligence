import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  DollarSign, TrendingDown, TrendingUp, PieChart, Sliders, ShieldAlert, 
  Sparkles, CheckCircle2, ArrowRight, Building2, HelpCircle, Layers, Cpu
} from 'lucide-react';

export const TcoCostSimulatorView: React.FC = () => {
  const { banks } = useApp();

  // Interactive Simulator Controls
  const [annualItBudgetTrillion, setAnnualItBudgetTrillion] = useState<number>(4.5); // Rp 4.5 Triliun
  const [openSourceShiftPct, setOpenSourceShiftPct] = useState<number>(45); // 45% shift
  const [cloudNativeAdoptionPct, setCloudNativeAdoptionPct] = useState<number>(60); // 60% cloud native

  // Calculations
  const annualItBudgetMiliar = annualItBudgetTrillion * 1000;
  
  // Baseline Run vs Change
  // Bank BRI baseline: 62% Run, 38% Change
  const baselineRunMiliar = annualItBudgetMiliar * 0.62;
  const baselineChangeMiliar = annualItBudgetMiliar * 0.38;

  // Potential savings from migrating proprietary licenses (DataStage, Oracle, commercial middleware)
  // Max license savings is estimated at 12% of total budget when shift reaches 100%
  const licenseSavingsMiliar = Math.round(annualItBudgetMiliar * (openSourceShiftPct / 100) * 0.115);
  
  // Infra efficiency savings from cloud-native auto-scaling & container density
  const infraEfficiencyMiliar = Math.round(annualItBudgetMiliar * (cloudNativeAdoptionPct / 100) * 0.065);
  
  const totalAnnualSavingsMiliar = licenseSavingsMiliar + infraEfficiencyMiliar;
  
  // New Run-the-Bank after savings
  const simulatedRunMiliar = Math.max(100, baselineRunMiliar - totalAnnualSavingsMiliar);
  // Reallocated to Change-the-Bank innovation!
  const simulatedChangeMiliar = baselineChangeMiliar + totalAnnualSavingsMiliar;
  
  const simulatedRunPct = Math.round((simulatedRunMiliar / annualItBudgetMiliar) * 100);
  const simulatedChangePct = 100 - simulatedRunPct;

  // Payback period in months (estimating upfront refactoring investment of 1.2x annual savings)
  const estimatedPaybackMonths = Math.max(8, Math.round(14 - (openSourceShiftPct * 0.05)));

  // Vendor lock-in risk score (100 is high risk, lower is better)
  const vendorLockinRisk = Math.max(18, Math.round(75 - (openSourceShiftPct * 0.55)));

  const peerRunChangeData = [
    {
      bank: 'Bank BRI (Simulasi)',
      singkatan: 'BRI (Target)',
      runPct: simulatedRunPct,
      changePct: simulatedChangePct,
      color: '#1e40af',
      isFocal: true,
      highlight: 'Efisiensi tertinggi berkat Kafka & OpenShift'
    },
    {
      bank: 'Bank BRI (Baseline 2026)',
      singkatan: 'BRI (Current)',
      runPct: 62,
      changePct: 38,
      color: '#3b82f6',
      isFocal: false,
      highlight: 'Alokasi inovasi sudah di atas rata-rata industri'
    },
    {
      bank: 'Bank Mandiri',
      singkatan: 'Mandiri',
      runPct: 71,
      changePct: 29,
      color: '#0284c7',
      isFocal: false,
      highlight: 'Beban OPEX tinggi: IBM DataStage + Oracle Exadata'
    },
    {
      bank: 'Bank BNI',
      singkatan: 'BNI',
      runPct: 68,
      changePct: 32,
      color: '#f97316',
      isFocal: false,
      highlight: 'Biaya lisensi Dynatrace Perform & enterprise cloud'
    },
    {
      bank: 'Bank BTN',
      singkatan: 'BTN',
      runPct: 76,
      changePct: 24,
      color: '#eab308',
      isFocal: false,
      highlight: 'Beban pemeliharaan backoffice legacy'
    },
    {
      bank: 'Bank BSI',
      singkatan: 'BSI',
      runPct: 74,
      changePct: 26,
      color: '#10b981',
      isFocal: false,
      highlight: 'Investasi merger & integrasi data eks-3 bank'
    }
  ];

  const licenseExposureDomains = [
    {
      domain: 'Data Integration & ETL',
      mandiriApproach: 'Proprietary (IBM InfoSphere DataStage)',
      mandiriCostIdx: 'Sangat Tinggi ($$$$)',
      briApproach: 'Open-Source Enterprise (Apache Kafka + Spark)',
      briCostIdx: 'Efisien ($$)',
      verdict: 'BRI unggul 45-60% dalam efisiensi TCO pemrosesan data real-time.'
    },
    {
      domain: 'Container & PaaS Orchestration',
      mandiriApproach: 'Hybrid AWS EKS + On-Premise',
      mandiriCostIdx: 'Tinggi ($$$)',
      briApproach: 'Red Hat OpenShift Enterprise On-Premise',
      briCostIdx: 'Terkontrol ($$)',
      verdict: 'Konsistensi lisensi subscription per-core tanpa hidden data transfer fees.'
    },
    {
      domain: 'Database & Big Data Storage',
      mandiriApproach: 'Oracle Exadata + AWS RDS',
      mandiriCostIdx: 'Sangat Tinggi ($$$$)',
      briApproach: 'Apache Cassandra + Distributed PostgreSQL',
      briCostIdx: 'Efisien ($$)',
      verdict: 'Menghindari biaya lisensi Oracle processor core multiplier.'
    },
    {
      domain: 'APM & Observability',
      mandiriApproach: 'Proprietary APM Enterprise',
      mandiriCostIdx: 'Tinggi ($$$)',
      briApproach: 'Prometheus, Grafana, OpenTelemetry + Pilot APM',
      briCostIdx: 'Efisien ($)',
      verdict: 'Open observability stack memangkas biaya per-host monitoring agent.'
    }
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              TCO & Run-vs-Change Financial Impact Simulator
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/70">
              Strategic IT Financial Modeling
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Kuantifikasi beban lisensi teknologi proprietary vs open-source enterprise, dan simulasi pengalihan anggaran pemeliharaan (*OPEX*) ke inovasi (*CAPEX*).
          </p>
        </div>
      </div>

      {/* Simulator Inputs & Key Financial Outcomes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Interactive Sliders */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-6">
          <div className="flex items-center space-x-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Sliders className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">
              Parameter Keuangan & Target Migrasi BRI
            </h3>
          </div>

          {/* Slider 1: Annual IT Budget */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300">Total Anggaran IT Tahunan:</span>
              <span className="font-extrabold text-blue-900 dark:text-blue-400 text-sm">
                Rp {annualItBudgetTrillion.toFixed(1)} Triliun
              </span>
            </div>
            <input 
              type="range"
              min="2.0"
              max="7.0"
              step="0.5"
              value={annualItBudgetTrillion}
              onChange={e => setAnnualItBudgetTrillion(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500">
              <span>Rp 2.0 T</span>
              <span>Rp 4.5 T (Baseline)</span>
              <span>Rp 7.0 T</span>
            </div>
          </div>

          {/* Slider 2: Open Source Shift Target */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300">Target Eliminasi Lisensi Proprietary:</span>
              <span className="font-extrabold text-emerald-700 dark:text-emerald-400 text-sm">
                {openSourceShiftPct}% Migrasi
              </span>
            </div>
            <input 
              type="range"
              min="10"
              max="90"
              step="5"
              value={openSourceShiftPct}
              onChange={e => setOpenSourceShiftPct(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500">
              <span>10% (Konservatif)</span>
              <span>45% (Moderat)</span>
              <span>90% (Agresif)</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
              Pengalihan lisensi vendor lock-in (IBM, Oracle) ke stack Apache / Cloud-Native.
            </p>
          </div>

          {/* Slider 3: Cloud Native Adoption */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300">Densitas Komputasi Cloud-Native:</span>
              <span className="font-extrabold text-purple-700 dark:text-purple-400 text-sm">
                {cloudNativeAdoptionPct}% Auto-scaling
              </span>
            </div>
            <input 
              type="range"
              min="20"
              max="90"
              step="5"
              value={cloudNativeAdoptionPct}
              onChange={e => setCloudNativeAdoptionPct(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500">
              <span>20%</span>
              <span>60% (Standar)</span>
              <span>90%</span>
            </div>
          </div>
        </div>

        {/* Right 2 Columns: Financial Output Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Output Card 1: Annual OPEX Savings */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-900 to-teal-950 text-white shadow-md relative overflow-hidden flex flex-col justify-between">
            <div className="absolute right-0 top-0 -mt-6 -mr-6 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl" />
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-emerald-300 font-bold uppercase tracking-wider">
                  Potensi Efisiensi OPEX Lisensi
                </span>
                <span className="p-1 rounded-lg bg-emerald-500/30 text-emerald-200">
                  <TrendingDown className="w-4 h-4" />
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white">
                Rp {totalAnnualSavingsMiliar.toLocaleString()} Miliar
              </div>
              <span className="text-xs text-emerald-200/90 font-medium">
                per tahun dihemat dari eliminasi lisensi per-core
              </span>
            </div>

            <div className="mt-4 pt-3 border-t border-emerald-800/80 text-[11px] text-emerald-100/80">
              • Lisensi Software: ~Rp {licenseSavingsMiliar} Miliar<br />
              • Efisiensi Infra Compute: ~Rp {infraEfficiencyMiliar} Miliar
            </div>
          </div>

          {/* Output Card 2: Reallocated Innovation Budget */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-900 to-indigo-950 text-white shadow-md relative overflow-hidden flex flex-col justify-between">
            <div className="absolute right-0 top-0 -mt-6 -mr-6 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl" />
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-blue-300 font-bold uppercase tracking-wider">
                  Realokasi Change-the-Bank (Inovasi)
                </span>
                <span className="p-1 rounded-lg bg-blue-500/30 text-blue-200">
                  <TrendingUp className="w-4 h-4" />
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white">
                Rp {simulatedChangeMiliar.toLocaleString()} Miliar
              </div>
              <span className="text-xs text-blue-200/90 font-medium">
                Porsi inovasi melonjak ke <strong>{simulatedChangePct}%</strong> (dari 38%)
              </span>
            </div>

            <div className="mt-4 pt-3 border-t border-blue-800/80 text-[11px] text-blue-100/80">
              Dana dialihkan untuk ekspansi fitur GenAI BRImo & microservices AgenBRILink tanpa menaikkan total anggaran IT.
            </div>
          </div>

          {/* Output Card 3: Payback Period */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200/50 dark:border-amber-800/40 flex items-center justify-center font-bold text-lg shrink-0">
              ⏱️
            </div>
            <div>
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400">Estimasi Payback Period</div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">{estimatedPaybackMonths} Bulan</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Waktu balik modal investasi re-architecture</div>
            </div>
          </div>

          {/* Output Card 4: Vendor Lock-in Risk */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/40 flex items-center justify-center font-bold text-lg shrink-0">
              🛡️
            </div>
            <div>
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400">Skor Risiko Vendor Lock-In</div>
              <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400">{vendorLockinRisk} / 100</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Kedaulatan teknologi arsitektur BRI sangat aman</div>
            </div>
          </div>
        </div>
      </div>

      {/* Benchmark Rasio Run-the-Bank vs Change-the-Bank Himbara */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-6">
        <div>
          <h3 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center space-x-2">
            <PieChart className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>Benchmark Rasio Run-the-Bank (OPEX) vs. Change-the-Bank (CAPEX) Himbara</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Bank digital terdepan di dunia (Top Quartile) menjaga porsi <strong>Change-the-Bank di atas 35-45%</strong> untuk memenangkan kompetisi produk.
          </p>
        </div>

        <div className="space-y-4">
          {peerRunChangeData.map((item, idx) => (
            <div key={idx} className={`p-4 rounded-2xl border transition ${
              item.isFocal ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-300 dark:border-blue-800 shadow-xs' : 'bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/70'
            }`}>
              <div className="flex items-center justify-between mb-2 text-xs">
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-slate-900 dark:text-white text-sm">{item.bank}</span>
                  {item.isFocal && (
                    <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white font-extrabold text-[10px]">
                      TARGET OPTIMAL
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-4 text-xs font-bold">
                  <span className="text-slate-500 dark:text-slate-400">Run: {item.runPct}%</span>
                  <span className="text-blue-700 dark:text-blue-400">Change: {item.changePct}%</span>
                </div>
              </div>

              {/* Stacked Progress Bar */}
              <div className="w-full h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
                <div 
                  className="h-full bg-slate-400 dark:bg-slate-600 flex items-center justify-center text-[10px] text-white font-bold transition-all duration-500" 
                  style={{ width: `${item.runPct}%` }}
                  title={`Run-the-Bank: ${item.runPct}%`}
                >
                  {item.runPct > 15 && `Run ${item.runPct}%`}
                </div>
                <div 
                  className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-[10px] text-white font-bold transition-all duration-500" 
                  style={{ width: `${item.changePct}%` }}
                  title={`Change-the-Bank: ${item.changePct}%`}
                >
                  {item.changePct > 15 && `Change ${item.changePct}%`}
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                <span>{item.highlight}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Domain License Cost Exposure Breakdown */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-4">
        <div>
          <h3 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center space-x-2">
            <Layers className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>Paparan Biaya Lisensi Per Domain: BRI vs. Bank Mandiri</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Analisis detail di mana letak keunggulan biaya struktural BRI dibanding arsitektur Mandiri:
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/70 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-300">
              <tr>
                <th className="py-3 px-4">Domain Arsitektur</th>
                <th className="py-3 px-4">Pendekatan Bank Mandiri</th>
                <th className="py-3 px-4">Beban Lisensi Mandiri</th>
                <th className="py-3 px-4">Pendekatan Bank BRI</th>
                <th className="py-3 px-4">Beban Lisensi BRI</th>
                <th className="py-3 px-4">Kesimpulan Finansial MBB</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {licenseExposureDomains.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white whitespace-nowrap">
                    {row.domain}
                  </td>
                  <td className="py-3 px-4 text-slate-700 dark:text-slate-300 font-medium">
                    {row.mandiriApproach}
                  </td>
                  <td className="py-3 px-4 text-rose-700 dark:text-rose-400 font-extrabold whitespace-nowrap">
                    {row.mandiriCostIdx}
                  </td>
                  <td className="py-3 px-4 text-slate-900 dark:text-white font-bold">
                    {row.briApproach}
                  </td>
                  <td className="py-3 px-4 text-emerald-700 dark:text-emerald-400 font-extrabold whitespace-nowrap">
                    {row.briCostIdx}
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                    {row.verdict}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MBB CFO Strategic Takeaway */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white shadow-xl space-y-3">
        <div className="flex items-center space-x-2 text-orange-400 font-extrabold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Strategic CFO Takeaway for Bank BRI</span>
        </div>
        <p className="text-sm text-slate-200 leading-relaxed">
          "Keberhasilan Bank BRI membangun ekosistem core streaming di atas Confluent Kafka dan Red Hat OpenShift telah melindungi BRI dari jebakan biaya lisensi proprietary tahunan (*license tax*) seperti yang dialami kompetitor dengan IBM DataStage dan Oracle Exadata. Dengan mengarahkan penghematan lisensi tahunan sebesar ~Rp 300–500 Miliar langsung ke porsi <strong>Change-the-Bank</strong>, BRI memiliki daya tembak finansial lebih besar untuk mendanai inovasi AI & GenAI tanpa perlu menambah alokasi CAPEX keseluruhan."
        </p>
      </div>
    </div>
  );
};
