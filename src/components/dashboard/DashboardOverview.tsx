import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BarChart3, ShieldCheck, Zap, AlertCircle, CheckCircle2, 
  ArrowRight, Users, Sparkles, Layers, Cpu, ArrowUpRight, Presentation 
} from 'lucide-react';

export const DashboardOverview: React.FC = () => {
  const { 
    banks, 
    categories, 
    technologies, 
    findings, 
    evidences, 
    interviews,
    setActiveTab, 
    setSelectedBankId, 
    setSelectedFindingModalId,
    setPresentationMode 
  } = useApp();

  // Metrics Calculation
  const totalTech = technologies.length;
  const totalFindings = findings.length;
  const publishedFindings = findings.filter(f => f.statusReview === 'Published').length;
  const confirmedFindings = findings.filter(f => f.confidence === 'Confirmed').length;
  const likelyFindings = findings.filter(f => f.confidence === 'Likely').length;
  const confirmedRate = Math.round(((confirmedFindings + likelyFindings) / totalFindings) * 100);

  // Bank stats
  const bankStats = banks.map(bank => {
    const bankFindings = findings.filter(f => f.bankId === bank.id);
    const coveredCategories = new Set(
      bankFindings.map(f => {
        const t = technologies.find(tech => tech.id === f.technologyId);
        return t?.categoryId;
      }).filter(Boolean)
    );
    const coveragePercent = Math.round((coveredCategories.size / categories.length) * 100);

    return {
      bank,
      totalTechCount: bankFindings.length,
      confirmedCount: bankFindings.filter(f => f.confidence === 'Confirmed').length,
      coveragePercent,
      categoryCount: coveredCategories.size
    };
  });

  const briStats = bankStats.find(s => s.bank.id === 'bank-bri');

  // Strategic Groupings:
  // 1. "Hanya BRI" - Tech that only BRI uses
  const techUsedByBRI = new Set(findings.filter(f => f.bankId === 'bank-bri').map(f => f.technologyId));
  const techUsedByCompetitors = new Set(findings.filter(f => f.bankId !== 'bank-bri').map(f => f.technologyId));

  const onlyBRITech = technologies.filter(t => techUsedByBRI.has(t.id) && !techUsedByCompetitors.has(t.id));

  // 2. "Hanya Kompetitor" - Tech used by at least 1 competitor, but NOT found in BRI yet!
  const onlyCompetitorsTech = technologies.filter(t => !techUsedByBRI.has(t.id) && techUsedByCompetitors.has(t.id));

  // 3. "Dipakai Bersama / Standar Himbara" - Tech used by BRI AND at least 2 competitors
  const commonHimbaraTech = technologies.filter(t => {
    const bankCount = findings.filter(f => f.technologyId === t.id).length;
    return techUsedByBRI.has(t.id) && bankCount >= 3;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Executive Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-950 text-white p-8 sm:p-10 shadow-xl shadow-blue-900/15">
        <div className="absolute right-0 top-0 -mt-12 -mr-12 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 -mb-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>Materi Konsultasi & Workshop Arsitektur Teknologi BRI</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Competitor Intelligence: Tech Stack Bank BRI vs Himbara
          </h1>

          <p className="text-sm sm:text-base text-blue-100/90 max-w-3xl leading-relaxed">
            Platform komparasi teknologi perbankan berbasis bukti (*evidence-based*). Mengumpulkan sinyal dari sumber publik resmi dan wawancara narasumber internal untuk memetakan keunggulan, celah (*gap*), dan tren arsitektur di seluruh bank BUMN.
          </p>

          <div className="flex items-center flex-wrap gap-3 pt-3">
            <button
              onClick={() => setPresentationMode(true)}
              className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-lg shadow-orange-500/25 flex items-center space-x-2 transition active:scale-95"
            >
              <Presentation className="w-4 h-4" />
              <span>Mulai Workshop / Layar Penuh</span>
            </button>

            <button
              onClick={() => setActiveTab('matrix')}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 backdrop-blur flex items-center space-x-2 transition"
            >
              <span>Buka Matriks Per Kategori</span>
              <ArrowRight className="w-4 h-4 text-blue-200" />
            </button>

            <button
              onClick={() => setActiveTab('gap-analysis')}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 backdrop-blur flex items-center space-x-2 transition"
            >
              <span>Analisis Celah (Gap Analysis)</span>
              <ArrowUpRight className="w-4 h-4 text-orange-300" />
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: BRI Tech Count */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Teknologi Teridentifikasi BRI</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              🏦
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-900">{briStats?.totalTechCount || 0}</span>
            <span className="text-xs text-slate-500 font-medium">komponen stack</span>
          </div>
          <div className="mt-3 flex items-center text-xs text-emerald-600 font-semibold space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Cakupan 100% (11/11 Kategori Terisi)</span>
          </div>
        </div>

        {/* KPI 2: Total Dataset */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Katalog Stack Terlacak</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-900">{totalTech}</span>
            <span className="text-xs text-slate-500 font-medium">teknologi di 5 bank</span>
          </div>
          <div className="mt-3 flex items-center text-xs text-indigo-600 font-medium space-x-1">
            <Layers className="w-3.5 h-3.5" />
            <span>Tersebar di {categories.length} taksonomi kategori</span>
          </div>
        </div>

        {/* KPI 3: Evidence & Audited Rate */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Tingkat Keyakinan (Audited)</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-emerald-700">{confirmedRate}%</span>
            <span className="text-xs text-slate-500 font-medium">Confirmed / Likely</span>
          </div>
          <div className="mt-3 flex items-center text-xs text-slate-500 font-medium space-x-1">
            <span>{evidences.length} berkas bukti & {interviews.length} wawancara</span>
          </div>
        </div>

        {/* KPI 4: Workshop Readiness */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Status Publikasi Temuan</span>
            <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-900">{publishedFindings}</span>
            <span className="text-xs text-slate-500 font-medium">dari {totalFindings} published</span>
          </div>
          <div className="mt-3 flex items-center text-xs text-emerald-600 font-semibold space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Siap dipresentasikan ke audiens</span>
          </div>
        </div>
      </div>

      {/* Strategic Callouts (Hanya BRI, Hanya Kompetitor, Standar Himbara) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Box 1: Keunggulan Eksklusif BRI */}
        <div className="bg-white rounded-2xl border border-blue-200 p-6 shadow-xs flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/50 rounded-full blur-2xl pointer-events-none" />
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-blue-600" />
                <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide">
                  Eksklusif Bank BRI ({onlyBRITech.length})
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-xs font-bold">
                Keunggulan Spesifik
              </span>
            </div>

            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              Teknologi yang berhasil diverifikasi di BRI namun <strong>belum terdeteksi diadopsi</strong> oleh kompetitor Himbara lainnya:
            </p>

            <div className="space-y-2.5">
              {onlyBRITech.map(t => {
                const cat = categories.find(c => c.id === t.categoryId);
                const finding = findings.find(f => f.bankId === 'bank-bri' && f.technologyId === t.id);
                return (
                  <div 
                    key={t.id}
                    onClick={() => finding && setSelectedFindingModalId(finding.id)}
                    className="p-2.5 rounded-xl bg-blue-50/50 hover:bg-blue-50 border border-blue-100 text-xs cursor-pointer transition flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-blue-950">{t.nama}</div>
                      <div className="text-[11px] text-blue-700">{cat?.nama} · {t.vendor}</div>
                    </div>
                    <span className="text-blue-600 font-semibold text-xs">Lihat Bukti →</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
            *Didominasi oleh kebutuhan konkurensi masif mikro (Cassandra, MinIO, AI Sabrina in-house).
          </div>
        </div>

        {/* Box 2: Celah / Gap Adopsi Kompetitor */}
        <div className="bg-white rounded-2xl border border-orange-200 p-6 shadow-xs flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100/50 rounded-full blur-2xl pointer-events-none" />
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-orange-500" />
                <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide">
                  Celah / Gap Potensial ({onlyCompetitorsTech.length})
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-orange-50 text-orange-700 text-xs font-bold">
                Dipakai Kompetitor
              </span>
            </div>

            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              Teknologi yang sudah diadopsi oleh Mandiri/BNI/BTN namun <strong>belum tercatat ada di stack BRI</strong>:
            </p>

            <div className="space-y-2.5">
              {onlyCompetitorsTech.map(t => {
                const cat = categories.find(c => c.id === t.categoryId);
                const banksUsing = findings.filter(f => f.technologyId === t.id && f.bankId !== 'bank-bri');
                const firstFinding = banksUsing[0];

                return (
                  <div 
                    key={t.id}
                    onClick={() => firstFinding && setSelectedFindingModalId(firstFinding.id)}
                    className="p-2.5 rounded-xl bg-orange-50/50 hover:bg-orange-50 border border-orange-100 text-xs cursor-pointer transition flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-slate-900">{t.nama}</div>
                      <div className="text-[11px] text-orange-800">
                        {cat?.nama} · Digunakan di: {banksUsing.map(f => banks.find(b => b.id === f.bankId)?.singkatan).join(', ')}
                      </div>
                    </div>
                    <span className="text-orange-600 font-semibold text-xs">Detail →</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100">
            <button
              onClick={() => setActiveTab('gap-analysis')}
              className="w-full text-center text-xs font-bold text-orange-700 hover:text-orange-800"
            >
              Lihat Analisis Strategis & Rekomendasi Roadmap →
            </button>
          </div>
        </div>

        {/* Box 3: Standar Bersama Himbara */}
        <div className="bg-white rounded-2xl border border-emerald-200 p-6 shadow-xs flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/50 rounded-full blur-2xl pointer-events-none" />
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide">
                  Standar Industri Himbara ({commonHimbaraTech.length})
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-xs font-bold">
                Konsensus Stack
              </span>
            </div>

            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              Teknologi inti yang telah diadopsi secara luas baik oleh BRI maupun mayoritas bank Himbara (≥3 bank):
            </p>

            <div className="space-y-2.5">
              {commonHimbaraTech.slice(0, 5).map(t => {
                const cat = categories.find(c => c.id === t.categoryId);
                const bankCount = findings.filter(f => f.technologyId === t.id).length;
                return (
                  <div 
                    key={t.id}
                    onClick={() => setActiveTab('matrix')}
                    className="p-2.5 rounded-xl bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-100 text-xs cursor-pointer transition flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-slate-900">{t.nama}</div>
                      <div className="text-[11px] text-emerald-800">{cat?.nama} · {t.vendor}</div>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                      {bankCount} / 5 Bank
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
            *Red Hat OpenShift, Apache Kafka, Java Spring Boot & BI-FAST menjadi fondasi wajib bank BUMN.
          </div>
        </div>
      </div>

      {/* Bank Comparison Matrix Overview (Card Grid) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Perbandingan Profil 5 Bank Himbara</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Ringkasan volume temuan, tingkat verifikasi resmi, dan cakupan taksonomi kategori
            </p>
          </div>
          <button
            onClick={() => setActiveTab('head-to-head')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center space-x-1"
          >
            <span>Bandingkan Head-to-Head BRI vs Bank Lain</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {bankStats.map(stat => {
            const isBRI = stat.bank.id === 'bank-bri';
            return (
              <div 
                key={stat.bank.id}
                onClick={() => {
                  setSelectedBankId(stat.bank.id);
                  setActiveTab('banks');
                }}
                className={`p-4 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                  isBRI 
                    ? 'border-blue-400 bg-blue-50/40 hover:bg-blue-50 shadow-sm' 
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{stat.bank.logo}</span>
                    {isBRI && (
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-blue-600 text-white">
                        Fokus Utama
                      </span>
                    )}
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">{stat.bank.singkatan}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{stat.bank.produkDigital.join(', ')}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/80 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Teknologi:</span>
                    <span className="font-extrabold text-slate-900">{stat.totalTechCount} item</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Terkonfirmasi:</span>
                    <span className="font-bold text-emerald-600">{stat.confirmedCount} item</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Cakupan Kategori:</span>
                    <span className="font-bold text-slate-800">{stat.categoryCount}/11 ({stat.coveragePercent}%)</span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden mt-1">
                    <div 
                      className="h-full rounded-full" 
                      style={{ 
                        width: `${stat.coveragePercent}%`, 
                        backgroundColor: stat.bank.brandColor 
                      }} 
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
