import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, ChevronLeft, ChevronRight, Maximize2, Minimize2, 
  Layers, ShieldCheck, CheckCircle2, AlertTriangle, FileText, 
  Sparkles, Lock, ArrowRight, HelpCircle, TrendingUp, Award,
  Cpu, Building2, Zap, Target, Compass, BarChart3, Database
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
    researchItems,
    setPresentationMode 
  } = useApp();

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [slide17PeerFilter, setSlide17PeerFilter] = useState<string>('all');

  // Filter only Published findings for workshop presentation
  const publishedFindings = findings.filter(f => f.statusReview === 'Published');

  // Slide Outline (MBB Consulting Style):
  // Slide 0: Executive Cover (Title Slide)
  // Slide 1: Executive Context & Macro Imperatives (The "Burning Platform")
  // Slide 2: Fact-Based Benchmarking Methodology & Evidence Hierarchy
  // Slide 3: Executive Synthesis: The 4 Core Architectural Takeaways
  // Slide 4: Comparative Capability Maturity Heatmap (5 Banks Overview)
  // Slide 5..15: 11 Domain Deep Dives (Core Banking, Cloud, Containers, API, Messaging, DB, CI/CD, Observability, Security, Mobile, AI)
  // Slide 16: Head-to-Head Architectural Tension: BRI vs. Bank Mandiri
  // Slide 17: Competitive Threat Radar & Capability Gaps
  // Slide 18: Strategic 3-Horizon Modernization Roadmap for Bank BRI
  // Slide 19: Boardroom Discussion Framework & Q&A

  const totalCategorySlides = categories.length; // 11
  const totalSlides = 5 + totalCategorySlides + 4; // 20 slides total

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

  // Category slide consulting metadata
  const categoryConsultingMeta: Record<string, {
    actionTitle: string;
    subheadline: string;
    tradeoff: string;
    briImplication: string;
  }> = {
    'cat-core-banking': {
      actionTitle: "CORE BANKING: Polarisasi Silverlake SIBS vs TCS BaNCS & Migrasi Temenos R24 Syariah",
      subheadline: "BRI, Mandiri, dan BTN mempertahankan Silverlake SIBS (+ SAP ERP); BCA dengan sistem inti proprietary tertutup; BNI mengandalkan TCS BaNCS; dan BSI menuntaskan migrasi Temenos Transact R10->R24 pada Mei 2026.",
      tradeoff: "Keseimbangan antara stabilitas rekonsiliasi buku besar GL ACID vs agilitas modernisasi sistem inti digital.",
      briImplication: "Pertahankan stabilitas core Silverlake SIBS dan perkuat integrasi SAP ERP dengan sidecar microservices read-cache (Cassandra & Kafka) agar transaksi nasabah masif tidak membebani core batch."
    },
    'cat-mobile': {
      actionTitle: "SUPER-APP ECOSYSTEM: BRImo Memimpin Rating (4.7) di Hadapan wondr by BNI, Livin', dan Byond by BSI",
      subheadline: "Pertarungan mobile super-app perbankan nasional: BRImo unggul rating 4.7 (>1 juta ulasan), Livin' Mandiri ekspansif di lifestyle, wondr BNI meluncurkan arsitektur 3 dimensi, dan Byond BSI mencapai 99.99% availability.",
      tradeoff: "Performa native (Kotlin/Swift Clean Arch) dengan SDK keamanan tingkat tinggi vs kecepatan rilis fitur dan ukuran aplikasi.",
      briImplication: "Pertahankan keunggulan rating kepuasan pengguna BRImo (4.7) dan akselerasi modular feature loading agar performa tetap responsif di perangkat spesifikasi menengah-bawah."
    },
    'cat-front-end': {
      actionTitle: "CORPORATE & WHOLESALE PORTAL: Integrasi Single Sign-On QLola by BRI Melawan Kopra & BNIdirect",
      subheadline: "Konsolidasi layanan korporasi dan cash management: QLola by BRI (CMS, Trade, SCM, Global FX) bersaing ketat dengan Kopra by Mandiri, BNIdirect, dan BEWIZE by BSI.",
      tradeoff: "Konsolidasi modul multi-produk dalam satu platform terpadu (SSO) vs kompleksitas otorisasi dan performa render portal web.",
      briImplication: "Tingkatkan integrasi otomatis QLola Supply Chain Management dengan ekosistem pinjaman rekanan UMKM BRI guna memperdalam retensi likuiditas nasabah korporasi."
    },
    'cat-payment-api': {
      actionTitle: "OPEN FINANCE & PAYMENT: Standarisasi QRIS Tap, BI-FAST, dan Orkestrasi BRIAPI via Google Apigee",
      subheadline: "Kepatuhan SNAP BI dan adopsi API Gateway enterprise: BRIAPI bermitra dengan Google Apigee, BCA mengadopsi Red Hat 3scale, seluruh bank mendukung QRIS cross-border dan BI-FAST Rp2.500.",
      tradeoff: "Throughput API super-tinggi (sub-50ms latency) vs inspeksi keamanan payload mendalam, enkripsi SNAP, dan pencegahan fraud.",
      briImplication: "Perkuat dominasi volume BRIAPI dengan developer portal mandiri, deteksi anomali real-time, dan ekspansi monetisasi BaaS ke ekosistem fintech."
    },
    'cat-big-data': {
      actionTitle: "DATA LAKEHOUSE & INTEGRASI: Cloudera EIDP Mendominasi, BNI Merintis Apache Iceberg Open Lakehouse",
      subheadline: "Fondasi data nasabah terpusat: Mandiri memanfaatkan Cloudera EIDP (Hadoop/CDP) dan Tableau BI; BNI mengadopsi Cloudera Data Services dengan Apache Iceberg; BRI mengandalkan backbone BRIBRAIN data platform.",
      tradeoff: "Integritas single source of truth enterprise vs fleksibilitas self-service analytics dan pemrosesan data real-time.",
      briImplication: "Modernisasi pipeline data analitik BRI menuju open lakehouse format (Iceberg/Delta) untuk memangkas latensi ingest data transaksi ke model underwriting BRIBRAIN."
    },
    'cat-ai-ml': {
      actionTitle: "AI & ACCELERATED COMPUTING: Lompatan Sovereign LLM on-Premise BNI (NVIDIA NIM) & BRIBRAIN BRI",
      subheadline: "Revolusi AI perbankan: BNI mengoperasikan Cloudera AI Inference + NVIDIA NIM (LLM sovereign on-premise) dan AI-KYC dokumen cepat; BCA menerapkan Cloudera AI Workbench terpusat; BRI memperkuat credit underwriting BRIBRAIN dan Sabrina AI.",
      tradeoff: "Investasi CapEx GPU komputasi on-premise untuk kedaulatan data vs ketergantungan API model LLM publik.",
      briImplication: "Evaluasi akselerasi GPU on-premise cluster untuk LLM internal BRImo guna meningkatkan kecerdasan Sabrina dan deteksi fraud interaktif tanpa mengekspos data ke cloud luar."
    },
    'cat-back-end': {
      actionTitle: "BACKEND & CONCURRENCY: Migrasi Java Enterprise ke Microservices Go (Golang) Berkecepatan Tinggi",
      subheadline: "Transformasi backend: Spring Boot mendominasi business logic perbankan, sementara Go (Golang) diadopsi secara masif untuk engine transaksi berkonkurensi tinggi di BRI, Mandiri, dan BCA.",
      tradeoff: "Kematangan library perbankan enterprise (Java/Spring) vs efisiensi memori ekstrem dan startup time kilat (Go).",
      briImplication: "Standarisasi template microservices Go untuk seluruh modul transaksi finansial berfrekuensi tinggi BRImo dan AgenBRILink."
    },
    'cat-database': {
      actionTitle: "DATABASE & DISTRIBUTED STORAGE: Apache Cassandra Membentengi Resiliensi Skala Masif Transaksi BRI",
      subheadline: "Strategi dual-database: RDBMS relasional (Oracle Exadata & PostgreSQL) untuk integritas akun, dipadukan Apache Cassandra multi-node untuk log audit dan histori mutasi tak terbatas.",
      tradeoff: "Konsistensi ACID ketat vs skalabilitas horizontal write-throughput tinggi tanpa Single Point of Failure (SPOF).",
      briImplication: "Pertahankan keunggulan kluster Cassandra multi-data center BRI sebagai diferensiator utama penanganan lonjakan transaksi libur nasional."
    },
    'cat-cloud-infra': {
      actionTitle: "CLOUD & DC INFRASTRUCTURE: Kepatuhan POJK 11/2022 & Manuver Hybrid Multi-Cloud Terkontrol",
      subheadline: "Mandat data residency onshore OJK: Seluruh 6 bank menempatkan DC/DRC di Indonesia; BCA mengoperasikan DC Tier III/IV mandiri (2025); BRI bermitra dengan Google Cloud Jakarta & Cisco UCS; Mandiri mengembangkan Mandiri Private Cloud.",
      tradeoff: "Kedaulatan data penuh on-premise vs kelincahan provisioning infrastruktur container cloud-native.",
      briImplication: "Optimalkan orkestrasi Red Hat OpenShift hybrid antara Tier 4 Data Center on-premise BRI dengan Google Cloud Jakarta Region untuk workload digital dinamis."
    },
    'cat-devops': {
      actionTitle: "DEVOPS & ITSM: Automasi CI/CD OpenShift, Ansible, dan Integrasi ITSM Atlassian Jira",
      subheadline: "Pola DevSecOps industri: BRI berkolaborasi dengan Atlassian & iZeno; BCA menerapkan Ansible Automation dan automated testing di atas OpenShift; Mandiri mengintegrasikan pipeline Livin' DevSecOps.",
      tradeoff: "Disiplin kontrol audit perubahan perbankan (ITSM/CAB) vs kecepatan deployment software berkelanjutan.",
      briImplication: "Otomasi security gating (SAST/DAST/SCA) dalam pipeline CI/CD BRI agar verifikasi keamanan berjalan otomatis tanpa menghambat jadwal rilis sprint."
    },
    'cat-security': {
      actionTitle: "REGULATORY & AI FRAUD: Kepatuhan UU PDP 27/2022, POJK 12/2021, dan Pemantauan Fraud AI Real-Time",
      subheadline: "Kepatuhan regulasi komprehensif: Seluruh 6 bank tunduk pada UU PDP, POJK 11/2022, POJK 12/2021 bank digital, dan penjaminan LPS Rp2 Miliar; didukung sistem AI monitoring fraud transaksi dan pemblokiran judi online.",
      tradeoff: "Friksi verifikasi identitas e-KYC nasabah vs kepatuhan pencegahan pencucian uang dan kebocoran data.",
      briImplication: "Perkuat sistem risk scoring BRIBRAIN terintegrasi dengan pemantauan anomali transaksi real-time untuk memitigasi risiko social engineering dan transaksi terlarang."
    }
  };

  // Render Slide Content based on currentSlideIndex
  const renderSlideContent = () => {
    // Slide 0: Executive Cover (MBB Style)
    if (currentSlideIndex === 0) {
      return (
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto h-full space-y-6">
          <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-[11px] font-mono uppercase tracking-widest text-slate-300">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span>STRICTLY CONFIDENTIAL · FOR BOARD & EXECUTIVE WORKSHOP USE ONLY</span>
          </div>

          <div className="space-y-4">
            <div className="text-xs font-mono text-orange-400 uppercase tracking-widest">
              STRATEGIC TECHNOLOGY BENCHMARKING & HORIZON SCAN
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
              Enterprise Tech Stack Intelligence:<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-orange-400">
                Bank BRI vs. Top 5 Peer Banks
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Analisis komparatif empiris arsitektur teknologi, postur infrastruktur, dan diferensiasi kapabilitas digital Bank BRI terhadap Bank Mandiri, BCA, BNI, BTN, dan BSI berdasarkan 408 kapabilitas riset di 13 domain dan 4 workshop.
            </p>
          </div>

          {/* Metadata pill grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-3xl pt-4 text-left text-xs">
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Client Sponsor</span>
              <strong className="text-white">PT Bank Rakyat Indonesia</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Peer Group</span>
              <strong className="text-white">Mandiri · BCA · BNI · BTN · BSI</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Scope Domains</span>
              <strong className="text-orange-400">4 Workshops · 13 Domains (408 Caps)</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Engagement Status</span>
              <strong className="text-emerald-400">Workshop Ready (100%)</strong>
            </div>
          </div>
        </div>
      );
    }

    // Slide 1: Executive Context & Macro Imperatives
    if (currentSlideIndex === 1) {
      return (
        <div className="max-w-5xl mx-auto h-full flex flex-col justify-center space-y-6 text-white">
          <div>
            <div className="text-xs font-mono font-bold text-orange-400 uppercase tracking-widest mb-1">
              STRATEGIC CONTEXT & INDUSTRY FORCES
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Di Era Digital Banking, Arsitektur Teknologi Merupakan Penentu Utama Valuasi & Daya Saing Pasar
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Empat tekanan makro memaksa perbankan nasional mendesain ulang arsitektur teknologinya secara fundamental.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">01</div>
              <div className="font-extrabold text-white text-sm">Ledakan Transaksi Mikro</div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Lonjakan transaksi QRIS dan AgenBRILink membutuhkan arsitektur event streaming yang mampu menahan <strong>25.000+ TPS</strong> tanpa lonjakan latency.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">02</div>
              <div className="font-extrabold text-white text-sm">Mandat Regulasi SNAP BI</div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Kewajiban standardisasi API Open Banking mentransformasi API Gateway dari sekadar middleware menjadi <strong>kanal monetisasi kemitraan B2B</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">03</div>
              <div className="font-extrabold text-white text-sm">Dilema Kedaulatan Cloud</div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Keseimbangan rumit antara kepatuhan regulasi data on-premise (POJK) dengan kebutuhan kelincahan perilisan ekosistem lifestyle berbasis <strong>Public/Hybrid Cloud</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold">04</div>
              <div className="font-extrabold text-white text-sm">Ketahanan Privasi (UU PDP)</div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Berlakunya sanksi penuh UU No. 27/2022 mewajibkan zero-trust secrets management, rotasi kredensial otomatis, dan enkripsi data komprehensif.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-orange-950/30 border border-blue-800/40 text-xs text-slate-200">
            <strong>Tesis Strategis MBB:</strong> Bank yang mampu memisahkan (*decouple*) lapisan core banking ledger dari lapisan pengalaman pengguna digital (*digital engagement tier*) akan menikmati rasio biaya transaksi per unit terendah dan time-to-market tercepat di Himbara.
          </div>
        </div>
      );
    }

    // Slide 2: Methodology & Evidence Hierarchy
    if (currentSlideIndex === 2) {
      return (
        <div className="max-w-5xl mx-auto h-full flex flex-col justify-center space-y-6 text-white">
          <div>
            <div className="text-xs font-mono font-bold text-orange-400 uppercase tracking-widest mb-1">
              RIGOROUS INTELLIGENCE FRAMEWORK
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Metodologi Intelijen Berbasis Bukti Empiris & Triangulasi Data
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Seluruh temuan diperoleh dari riset Open Source Intelligence (OSINT) dan wawancara narasumber anonim tanpa melanggar kerahasiaan bank.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/50 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-emerald-400 text-sm">TIER 1 · CONFIRMED</span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">Bobot 100%</span>
              </div>
              <div className="font-bold text-white">Sumber Resmi Vendor & Perseroan</div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Studi kasus resmi vendor global (AWS Customer Case Study, Confluent, Red Hat Success Story, Oracle), keynote engineering resmi, atau laporan tahunan OJK/IDX yang terpublikasi.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-500/50 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-blue-400 text-sm">TIER 2 · LIKELY</span>
                <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold">Bobot 75%</span>
              </div>
              <div className="font-bold text-white">Wawancara Arsitek & Multi-Sumber</div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Konfirmasi dari wawancara narasumber arsitektur perbankan internal (anonim) yang dikuatkan oleh dokumentasi teknis publik atau korelasi ≥2 sumber independen.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-amber-950/30 border border-amber-500/50 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-amber-400 text-sm">TIER 3 · INDICATIVE</span>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">Bobot 40%</span>
              </div>
              <div className="font-bold text-white">Sinyal Rekrutmen & Repositori Publik</div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Kualifikasi spesifikasi lowongan kerja resmi (Jobstreet, LinkedIn Engineering jobs) dan jejak dependensi modul publik open-source.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-800/60 flex items-center space-x-3 text-xs text-purple-200">
            <Lock className="w-5 h-5 text-purple-400 shrink-0" />
            <div>
              <strong>Kepatuhan Etika & UU No. 27/2022 (UU PDP):</strong> Tidak ada kode sumber internal, data rahasia perbankan, atau data nasabah yang disentuh. Seluruh narasumber dianonimkan (misal: <em>Narasumber MDR-01, Divisi Cloud Architecture</em>).
            </div>
          </div>
        </div>
      );
    }

    // Slide 3: Executive Synthesis: The 4 Strategic Takeaways (McKinsey Style)
    if (currentSlideIndex === 3) {
      return (
        <div className="max-w-5xl mx-auto h-full flex flex-col justify-center space-y-6 text-white">
          <div>
            <div className="text-xs font-mono font-bold text-orange-400 uppercase tracking-widest mb-1">
              EXECUTIVE SYNTHESIS · 4 CORE TAKEAWAYS
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Sintesis Temuan: BRI Memimpin di Kapasitas Skala Mikro, Mandiri Memimpin di Kelincahan Ekosistem Cloud
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Rangkuman esensial untuk Dewan Direksi dan Tim Arsitektur Strategis Bank BRI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-600/60 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-extrabold text-[10px]">TAKEAWAY 1</span>
                <span className="font-extrabold text-blue-300 text-sm">Benteng Skala Masif Terkuat di ASEAN</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Arsitektur distributed cache <strong>Apache Cassandra</strong> dan event streaming <strong>Kafka Confluent</strong> BRI terbukti paling kokoh di Himbara dalam memproses beban 25.000+ TPS AgenBRILink tanpa downtime saat hari raya atau tanggal gajian.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-sky-950/30 border border-sky-600/60 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-900 font-extrabold text-[10px]">TAKEAWAY 2</span>
                <span className="font-extrabold text-sky-300 text-sm">Ancaman Agilitas Hybrid Cloud Mandiri</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Implementasi <strong>AWS Outposts / Hybrid Cloud Jakarta</strong> pada Livin' Sukha memberikan Mandiri keunggulan kecepatan perilisan fitur merchant hingga <strong>3x lebih cepat</strong> dibandingkan siklus rilis on-premise konvensional.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-600/60 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded bg-emerald-600 text-white font-extrabold text-[10px]">TAKEAWAY 3</span>
                <span className="font-extrabold text-emerald-300 text-sm">Konsensus Standar De-Facto Himbara</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Seluruh bank Himbara telah mengadopsi <strong>Red Hat OpenShift</strong> untuk orkestrasi container dan <strong>Dynatrace</strong> untuk AI observability, menandakan konvergensi arsitektur platform enterprise perbankan.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-purple-950/30 border border-purple-600/60 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded bg-purple-600 text-white font-extrabold text-[10px]">TAKEAWAY 4</span>
                <span className="font-extrabold text-purple-300 text-sm">Divergensi Arsitektur Core Banking</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Tidak ada bank Himbara yang berani melakukan migrasi core banking *big-bang*. Pola universal adalah <strong>'Hollowing the Core'</strong>: membekukan perubahan pada core ledger dan membangun seluruh fitur baru di sidecar microservices.
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Slide 4: Comparative Capability Maturity Heatmap
    if (currentSlideIndex === 4) {
      return (
        <div className="max-w-5xl mx-auto h-full flex flex-col justify-center space-y-6 text-white">
          <div>
            <div className="text-xs font-mono font-bold text-orange-400 uppercase tracking-widest mb-1">
              BENCHMARK HEATMAP & COVERAGE
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Matriks Kematangan Kapabilitas Teknologi 6 Bank (BRI · Mandiri · BCA · BNI · BTN · BSI)
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Distribusi 408 kapabilitas riset terverifikasi di seluruh 13 domain arsitektur dan 4 workshop.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {banks.map(bank => {
              const bSlug = bank.singkatan.toLowerCase();
              let verified = 0;
              let inference = 0;
              let belum = 0;

              researchItems.forEach(item => {
                const s = item.banks[bSlug]?.status;
                if (s === 'Terverifikasi') verified++;
                else if (s === 'Inferensi') inference++;
                else belum++;
              });

              const isBRI = bank.id === 'bank-bri';
              const pct = Math.round((verified / (researchItems.length || 1)) * 100);

              return (
                <div 
                  key={bank.id} 
                  className={`p-4 rounded-2xl border flex flex-col justify-between ${
                    isBRI 
                      ? 'bg-blue-900/50 border-blue-400 ring-2 ring-blue-500/30' 
                      : 'bg-slate-900/80 border-slate-800'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-2xl">{bank.logo}</span>
                      {isBRI && (
                        <span className="px-1.5 py-0.5 rounded bg-blue-500 text-white font-extrabold text-[9px] uppercase">
                          Target Utama
                        </span>
                      )}
                    </div>
                    <div className="font-extrabold text-base text-white">{bank.singkatan}</div>
                    <div className="text-[11px] text-slate-400 truncate">{bank.produkDigital[0]}</div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Verified:</span>
                      <strong className="text-emerald-400 font-mono">{verified} ({pct}%)</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Inferensi:</span>
                      <strong className="text-amber-400 font-mono">{inference}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Belum:</span>
                      <strong className="text-slate-500 font-mono">{belum}</strong>
                    </div>
                    <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400">
                      Total: <span className="text-slate-200 font-semibold">{researchItems.length} Caps</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed flex items-center justify-between">
            <div>
              <span className="text-orange-400 font-bold">Konteks Eksekutif:</span> Data empiris dari 408 kapabilitas menunjukkan BRI memimpin di volume pemrosesan mikro, BCA unggul dalam efisiensi transaksi ritel, sementara Mandiri dan BNI agresif dalam modernisasi arsitektur data & cloud hybrid.
            </div>
          </div>
        </div>
      );
    }

    // Slide 5..15: Category Deep Dives (11 Domains)
    if (currentSlideIndex >= 5 && currentSlideIndex < 5 + totalCategorySlides) {
      const catIndex = currentSlideIndex - 5;
      const currentCat = categories[catIndex];
      const catTechs = technologies.filter(t => t.categoryId === currentCat.id);
      const meta = categoryConsultingMeta[currentCat.id] || {
        actionTitle: `DOMAIN ${catIndex + 1}: ${currentCat.nama}`,
        subheadline: currentCat.deskripsi,
        tradeoff: "Keseimbangan antara keandalan, kepatuhan, dan efisiensi biaya.",
        briImplication: "Pertahankan keunggulan kompetitif dan evaluasi modernisasi komponen."
      };

      return (
        <div className="max-w-5xl mx-auto h-full flex flex-col justify-center space-y-5 text-white">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono font-bold text-orange-400 uppercase tracking-widest">
              <span>DOMAIN {catIndex + 1} DARI {totalCategorySlides}</span>
              <span>·</span>
              <span>{currentCat.nama}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1 leading-snug">
              {meta.actionTitle}
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-4xl">
              {meta.subheadline}
            </p>
          </div>

          {/* Category Matrix Table in Slide */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-800/80 border-b border-slate-700 text-slate-300 text-[11px]">
                  <th className="py-2.5 px-4">Komponen Teknologi</th>
                  <th className="py-2.5 px-3">Vendor & Lisensi</th>
                  {banks.map(b => (
                    <th key={b.id} className={`py-2.5 px-3 text-center ${b.id === 'bank-bri' ? 'text-blue-300 bg-blue-900/30 font-bold' : ''}`}>
                      {b.singkatan}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-xs">
                {catTechs.map(tech => {
                  return (
                    <tr key={tech.id} className="hover:bg-slate-800/40">
                      <td className="py-2.5 px-4 font-bold text-white">
                        {tech.nama}
                      </td>
                      <td className="py-2.5 px-3 text-slate-400 capitalize text-[11px]">
                        {tech.vendor} ({tech.tipe})
                      </td>
                      {banks.map(b => {
                        const finding = publishedFindings.find(f => f.bankId === b.id && f.technologyId === tech.id);
                        const isBRI = b.id === 'bank-bri';
                        const badge = finding ? getConfidenceBadge(finding.confidence) : null;

                        return (
                          <td key={b.id} className={`py-2.5 px-3 text-center ${isBRI ? 'bg-blue-900/20' : ''}`}>
                            {badge ? (
                              <span className={`inline-block px-2 py-0.5 rounded font-bold text-[10px] ${badge.bgColor}`}>
                                {badge.symbol} {badge.label}
                              </span>
                            ) : (
                              <span className="text-slate-600 font-mono">–</span>
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

          {/* Trade-off & Implication Split Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
              <span className="font-bold text-orange-400 text-[11px] block uppercase font-mono">
                ⚖️ Architectural Trade-Off
              </span>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                {meta.tradeoff}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-800/60 space-y-1">
              <span className="font-bold text-blue-400 text-[11px] block uppercase font-mono">
                🎯 Strategic Implication for Bank BRI
              </span>
              <p className="text-slate-200 leading-relaxed text-[11px]">
                {meta.briImplication}
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Slide 16: Head-to-Head Highlight BRI vs Mandiri
    if (currentSlideIndex === 5 + totalCategorySlides) {
      return (
        <div className="max-w-5xl mx-auto h-full flex flex-col justify-center space-y-6 text-white">
          <div>
            <div className="text-xs font-mono font-bold text-orange-400 uppercase tracking-widest mb-1">
              STRATEGIC DUEL · THE TWO HIMBARA GIANTS
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Head-to-Head: Bank BRI vs. Bank Mandiri
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Dua filosofi digital banking yang saling bertolak belakang: <em>Skala Mikro Ekstrem</em> vs <em>Ekosistem Gaya Hidup Urban</em>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            {/* BRI Box */}
            <div className="p-5 rounded-2xl bg-blue-950/40 border border-blue-500/60 space-y-3.5">
              <div className="flex items-center justify-between border-b border-blue-800/60 pb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">🏦</span>
                  <span className="font-black text-white text-base">BANK BRI</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white font-extrabold text-[10px]">
                  Skala & Ketahanan Mikro
                </span>
              </div>

              <div className="space-y-2 text-slate-300 text-[11px] leading-relaxed">
                <div className="flex items-start space-x-2">
                  <span className="text-blue-400 font-bold">•</span>
                  <span><strong>Data Volume:</strong> Apache Cassandra cluster multi-datacenter menampung miliaran mutasi rekening historis tanpa single point of failure.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-blue-400 font-bold">•</span>
                  <span><strong>Throughput:</strong> Apache Kafka enterprise menangani 25.000+ TPS dari jutaan transaksi harian AgenBRILink & BRImo.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-blue-400 font-bold">•</span>
                  <span><strong>Open Banking:</strong> Portofolio SNAP API terluas terhubung ke ribuan mitra e-commerce, fintech, dan agregator.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-blue-400 font-bold">•</span>
                  <span><strong>AI Native:</strong> Sabrina virtual assistant dibangun in-house terintegrasi langsung ke core database perbankan.</span>
                </div>
              </div>
            </div>

            {/* Mandiri Box */}
            <div className="p-5 rounded-2xl bg-sky-950/40 border border-amber-500/60 space-y-3.5">
              <div className="flex items-center justify-between border-b border-amber-800/60 pb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">🏛️</span>
                  <span className="font-black text-white text-base">BANK MANDIRI</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-900 font-extrabold text-[10px]">
                  Kelincahan & Gaya Hidup
                </span>
              </div>

              <div className="space-y-2 text-slate-300 text-[11px] leading-relaxed">
                <div className="flex items-start space-x-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span><strong>Cloud Agility:</strong> AWS Hybrid Cloud di Jakarta Region memberikan kecepatan integrasi merchant 3x lebih lincah untuk Livin' Sukha.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span><strong>Compute Architecture:</strong> Microservices ultra-cepat berbasis Go (Golang) dan Redis cluster terdistribusi.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span><strong>Data Science:</strong> Pemanfaatan platform kolaboratif Dataiku untuk deployment model prediktif langsung oleh business squad.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span><strong>Security Hardening:</strong> Penerapan HashiCorp Vault enterprise untuk zero-trust secret rotation dan PKI otomatis.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Slide 17: Competitive Threat Radar & Capability Gaps
    if (currentSlideIndex === 5 + totalCategorySlides + 1) {
      return (
        <div className="max-w-5xl mx-auto h-full flex flex-col justify-center space-y-6 text-white">
          <div>
            <div className="text-xs font-mono font-bold text-orange-400 uppercase tracking-widest mb-1">
              THREAT RADAR & COMPETITIVE GAPS
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Radar Kesenjangan Kapabilitas & Titik Ancaman Kompetitor Terhadap BRI
            </h2>
            <div className="flex items-center justify-between flex-wrap gap-2 mt-2">
              <p className="text-xs text-slate-400">
                Pemetaan kuadran strategis: Di mana BRI memimpin, dan di mana kompetitor sedang mempersempit jarak.
              </p>
              <div className="flex items-center space-x-1.5 text-xs">
                <span className="text-slate-400 font-semibold text-[11px]">Sorot Peer:</span>
                {[
                  { id: 'all', label: 'Semua' },
                  { id: 'bank-mandiri', label: 'Mandiri' },
                  { id: 'bank-bca', label: 'BCA' },
                  { id: 'bank-bni', label: 'BNI' },
                  { id: 'bank-btn', label: 'BTN' },
                  { id: 'bank-bsi', label: 'BSI' }
                ].map(peer => (
                  <button
                    key={peer.id}
                    onClick={() => setSlide17PeerFilter(peer.id)}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold transition ${
                      slide17PeerFilter === peer.id 
                        ? 'bg-orange-500 text-white shadow-xs' 
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {peer.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Defensive Moat */}
            <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-500/50 space-y-2">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span className="font-extrabold text-blue-300 text-sm">DEFENSIVE MOATS (Benteng Pertahanan BRI)</span>
              </div>
              <ul className="space-y-1.5 text-slate-300 text-[11px] list-disc list-inside">
                <li>Kapasitas pemrosesan event real-time Kafka & throughput Cassandra.</li>
                <li>Jaringan integrasi Open Banking SNAP terluas di pasar fintech.</li>
                <li>Daya tahan ekosistem mikro (BRImo & AgenBRILink di daerah tier 2-4).</li>
              </ul>
            </div>

            {/* Emerging Gap */}
            <div className="p-4 rounded-2xl bg-red-950/30 border border-red-500/50 space-y-2">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span className="font-extrabold text-red-300 text-sm">EMERGING GAPS (Kesenjangan yang Perlu Ditutup)</span>
              </div>
              <ul className="space-y-1.5 text-slate-300 text-[11px] list-disc list-inside">
                <li>Kelincahan ekosistem merchant lifestyle (Mandiri unggul berkat AWS hybrid).</li>
                <li>Sentralisasi rotasi kredensial dinamis Zero-Trust (BSI & Mandiri mengadopsi Vault).</li>
                <li>Siklus rilis harian antar squad (DevOps velocity kompetitor meningkat pesat).</li>
              </ul>
            </div>

            {/* Parity Battlegrounds */}
            <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/50 space-y-2">
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-purple-400" />
                <span className="font-extrabold text-purple-300 text-sm">PARITY BATTLEGROUNDS (Zona Persaingan Seimbang)</span>
              </div>
              <ul className="space-y-1.5 text-slate-300 text-[11px] list-disc list-inside">
                <li>Platform orkestrasi container: Standardisasi Himbara pada Red Hat OpenShift.</li>
                <li>Observability: Adopsi Dynatrace dan OpenTelemetry di BNI, Mandiri, dan BRI.</li>
                <li>Mobile native framework: Komitmen seragam pada Kotlin & Swift Clean Architecture.</li>
              </ul>
            </div>

            {/* Differentiator Opportunities */}
            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/50 space-y-2">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="font-extrabold text-emerald-300 text-sm">OPPORTUNITY HORIZONS (Peluang Unggul Mutlak)</span>
              </div>
              <ul className="space-y-1.5 text-slate-300 text-[11px] list-disc list-inside">
                <li>Otomatisasi MLOps terpusat untuk credit scoring real-time UMKM ultra-mikro.</li>
                <li>Modernisasi decoupled core banking melalui strategi Event-Driven Ledger.</li>
                <li>Pengembangan sovereign AI lokal untuk asistensi nasabah inklusif 24/7.</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    // Slide 18: Strategic 3-Horizon Modernization Roadmap for BRI
    if (currentSlideIndex === 5 + totalCategorySlides + 2) {
      return (
        <div className="max-w-5xl mx-auto h-full flex flex-col justify-center space-y-6 text-white">
          <div>
            <div className="text-xs font-mono font-bold text-orange-400 uppercase tracking-widest mb-1">
              ACTIONABLE ROADMAP · 3-HORIZON FRAMEWORK
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Rekomendasi Roadmap Arsitektur 3-Horizon untuk Dewan Direksi BRI
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Inisiatif terukur untuk mempertahankan dominasi pasar dan menutup celah kompetitor dalam 36 bulan ke depan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Horizon 1 */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-blue-500/50 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-blue-400 font-mono font-extrabold">HORIZON 1</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold">0 - 6 Bulan</span>
              </div>
              <div className="font-bold text-white text-sm">Tactical Hardening & Compliance</div>
              <ul className="space-y-2 text-slate-300 text-[11px] leading-relaxed list-disc list-inside">
                <li><strong>Zero-Trust Secrets:</strong> Implementasi standarisasi HashiCorp Vault untuk eliminasi hardcoded static credentials.</li>
                <li><strong>Unified Observability:</strong> Konsolidasi tracing end-to-end Dynatrace ke seluruh modul mikroservis BRImo.</li>
                <li><strong>SNAP Rate Limiting:</strong> Hardening API gateway dari ancaman DDoS dan lonjakan trafik mitra eksternal.</li>
              </ul>
            </div>

            {/* Horizon 2 */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-orange-500/50 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-orange-400 font-mono font-extrabold">HORIZON 2</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 font-bold">6 - 18 Bulan</span>
              </div>
              <div className="font-bold text-white text-sm">Hybrid Agility & Enterprise MLOps</div>
              <ul className="space-y-2 text-slate-300 text-[11px] leading-relaxed list-disc list-inside">
                <li><strong>Cloud Landing Zone:</strong> Evaluasi arsitektur hybrid cloud terisolasi di Jakarta region khusus modul lifestyle BRImo.</li>
                <li><strong>MLOps Pipeline:</strong> Standardisasi deployment model credit scoring mikro dengan Kubeflow & MLflow terpusat.</li>
                <li><strong>GitOps & CI/CD:</strong> Otomasi deployment multi-cluster OpenShift untuk memangkas release lead-time &lt; 24 jam.</li>
              </ul>
            </div>

            {/* Horizon 3 */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-emerald-500/50 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-emerald-400 font-mono font-extrabold">HORIZON 3</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">18 - 36 Bulan</span>
              </div>
              <div className="font-bold text-white text-sm">Next-Gen Decoupled Core Banking</div>
              <ul className="space-y-2 text-slate-300 text-[11px] leading-relaxed list-disc list-inside">
                <li><strong>Event-Driven Ledger:</strong> Transformasi arsitektur core banking menuju streaming-first event-sourcing ledger.</li>
                <li><strong>Autonomous SRE:</strong> Penerapan AIOps untuk self-healing infrastructure dan zero-downtime rolling updates.</li>
                <li><strong>Sovereign AI Copilot:</strong> Integrasi GenAI enterprise lokal yang mematuhi regulasi perbankan Indonesia 100%.</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    // Slide 19: Boardroom Discussion Prompts & Q&A
    return (
      <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto h-full space-y-6 text-white">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-orange-500 flex items-center justify-center text-3xl shadow-xl shadow-blue-500/20">
          💡
        </div>

        <div className="space-y-2">
          <div className="text-xs font-mono font-bold text-orange-400 uppercase tracking-widest">
            EXECUTIVE BOARDROOM ALIGNMENT
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Pertanyaan Kunci untuk Diskusi Dewan Direksi
          </h2>
          <p className="text-xs text-slate-300 max-w-xl mx-auto">
            Gunakan 4 pertanyaan strategis ini untuk menyelaraskan alokasi anggaran IT dan prioritas transformasi arsitektur Bank BRI.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-left w-full max-w-3xl">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-blue-400 font-bold block mb-1">1. Cloud Strategy</span>
            <p className="text-slate-300 text-[11px]">Apakah BRI perlu membuka isolasi cloud hybrid lokal untuk menandingi kecepatan integrasi merchant Livin' Sukha?</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-orange-400 font-bold block mb-1">2. Core Decoupling</span>
            <p className="text-slate-300 text-[11px]">Seberapa jauh kita dapat mengekstraksi beban transaksi dari Silverlake menuju Cassandra sebelum memerlukan core replacement?</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-emerald-400 font-bold block mb-1">3. Developer Velocity</span>
            <p className="text-slate-300 text-[11px]">Apa hambatan utama yang membuat siklus deployment BRImo masih lebih lambat dibandingkan squad teknologi kompetitor?</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-purple-400 font-bold block mb-1">4. Zero-Trust Timeline</span>
            <p className="text-slate-300 text-[11px]">Bagaimana roadmap pemenuhan standar UU PDP dan audit OJK terkait manajemen dynamic secret credentials di seluruh anak perusahaan BRI?</p>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={() => setPresentationMode(false)}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition"
          >
            Tutup Presentasi & Kembali ke Aplikasi
          </button>
        </div>
      </div>
    );
  };

  // MBB Partner-Level Speaker Notes
  const speakerNotesContent = [
    // Slide 0: Cover
    "Lead Partner: 'Selamat pagi Bapak/Ibu Dewan Direksi dan Tim Arsitektur Strategis Bank BRI. Pagi ini kami menyajikan laporan intelijen komparatif teknologi independen yang membedah arsitektur 5 bank Himbara. Seluruh temuan ini berbasis bukti empiris dan dirancang untuk memberikan masukan strategis bagi roadmap TI BRI 2027.'",
    // Slide 1: Context
    "Lead Partner: 'Bapak/Ibu, mari kita mulai dengan kenyataan makro: di era perbankan digital modern, arsitektur sistem adalah penentu valuasi dan rasio efisiensi biaya (CIR). Bank yang memiliki decoupling arsitektur terbaik akan melayani transaksi nasabah dengan biaya per transaksi termurah dan time-to-market tercepat.'",
    // Slide 2: Methodology
    "Lead Partner: 'Kami menekankan bahwa studi ini mematuhi standar etika konsultan dan UU PDP 100%. Data dikumpulkan melalui triangulasi 3-tier: studi kasus resmi vendor terverifikasi, laporan tahunan resmi, dan wawancara narasumber independen teranonimasi tanpa pernah menyentuh data rahasia bank.'",
    // Slide 3: Synthesis
    "Lead Partner: 'Inilah 4 kesimpulan eksekutif utama kami: Pertama, BRI memimpin mutlak dalam kapasitas transaksi massal (25k+ TPS). Kedua, Mandiri mengambil inisiatif ofensif di hybrid cloud yang meningkatkan kelincahan rilis merchant mereka. Ketiga, standar industri telah konvergen ke OpenShift dan Dynatrace. Keempat, seluruh bank sepakat menerapkan strategi hollowing the core.'",
    // Slide 4: Heatmap
    "Lead Partner: 'Bapak/Ibu dapat melihat peta kematangan ini: BRI memiliki portofolio teknologi terverifikasi terlengkap di 11 domain. Namun di domain cloud infrastructure dan developer tooling, kompetitor terdekat mulai mempersempit ketertinggalan.'",
    // Slides 5..15: 11 Categories
    "Lead Partner: 'Domain Core Banking: Himbara sepakat tidak melakukan migrasi big-bang karena risiko reputasi terlalu besar. Pola universal adalah sidecar extraction—memindahkan query pembacaan saldo dan mutasi ke cache terdistribusi.'",
    "Lead Partner: 'Domain Cloud: Ini adalah area divergensi paling tajam. Bank Mandiri menggunakan AWS Outposts di region Jakarta untuk Livin Sukha. Rekomendasi kami untuk BRI adalah mengkaji Landing Zone cloud lokal khusus fitur non-finansial BRImo.'",
    "Lead Partner: 'Domain Container: Red Hat OpenShift telah menjadi standar de-facto perbankan Indonesia karena enterprise support 24/7 dan sertifikasi keamanan perbankan. Langkah berikutnya bagi BRI adalah otomasi FinOps antar-squad.'",
    "Lead Partner: 'Domain API Management: Mandat SNAP BI mengubah API Gateway menjadi revenue engine. BRI memimpin volume transaksi berkat ribuan mitra fintech; fokus kita adalah menjaga latency tetap di bawah 50ms di saat peak season.'",
    "Lead Partner: 'Domain Event Streaming: Ini adalah benteng pertahanan terkuat BRI. Infrastruktur Apache Kafka Confluent yang menopang 25.000+ TPS AgenBRILink adalah yang terbesar di Asia Tenggara.'",
    "Lead Partner: 'Domain Database: BRI mengambil langkah tepat dengan adopsi Apache Cassandra cluster untuk miliaran riwayat mutasi rekening, mengurangi beban query pada Oracle Exadata core.'",
    "Lead Partner: 'Domain DevOps: Kompetitor memodernisasi CI/CD dengan GitLab dan automated security gate untuk rilis harian. BRI perlu memastikan approval change management tidak menjadi hambatan kelincahan squad.'",
    "Lead Partner: 'Domain Observability: BNI dan Mandiri mengandalkan Dynatrace Davis AI untuk tracing end-to-end pengalaman pengguna. BRI perlu memastikan seluruh mikroservis terhubung dalam satu visibilitas terpadu.'",
    "Lead Partner: 'Domain Cyber Resilience: Berlakunya UU PDP membuat rotasi kredensial dinamis dengan HashiCorp Vault menjadi kebutuhan mendesak. Kita harus mengeliminasi seluruh static credentials di repositori kode.'",
    "Lead Partner: 'Domain Mobile: Keputusan BRI mempertahankan arsitektur native Kotlin dan Swift murni untuk BRImo terbukti tepat secara performa dan keamanan hardware Keystore dibanding hybrid framework.'",
    "Lead Partner: 'Domain AI/ML: Sabrina dan model credit scoring UMKM ultra-mikro adalah aset berharga. Yang dibutuhkan BRI sekarang adalah standardisasi MLOps terpusat agar squad dapat merilis model baru secara mandiri.'",
    // Slide 16: Head-to-Head
    "Lead Partner: 'Head-to-head BRI vs Mandiri mencerminkan dua kutub berbeda: BRI unggul mutlak di skala pemrosesan transaksi massal dan inklusi keuangan, sementara Mandiri unggul di kelincahan marketplace gaya hidup perkotaan melalui hybrid cloud.'",
    // Slide 17: Threat Radar
    "Lead Partner: 'Radar ancaman: Benteng pertahanan BRI sangat kokoh di Kafka, Cassandra, dan Open Banking SNAP. Namun celah yang harus segera ditutup adalah kelincahan ekosistem merchant lifestyle dan sentralisasi zero-trust secrets.'",
    // Slide 18: Roadmap
    "Lead Partner: 'Kami menyusun 3 Horizon Modernisasi untuk Dewan Direksi: Horizon 1 fokus pada hardening keamanan UU PDP dan unifikasi observability. Horizon 2 membangun Hybrid Cloud Landing Zone dan MLOps. Horizon 3 mewujudkan Event-Driven Core Banking decoupled.'",
    // Slide 19: Boardroom Q&A
    "Lead Partner: 'Kami menutup presentasi ini dengan 4 pertanyaan strategis untuk diselaraskan dalam workshop internal hari ini. Terima kasih, dan kami membuka ruang diskusi interaktif bagi Bapak/Ibu Dewan Direksi.'"
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col justify-between overflow-hidden select-none">
      {/* Top MBB Header Bar */}
      <div className="px-6 py-3.5 bg-slate-900/90 backdrop-blur border-b border-slate-800 flex items-center justify-between z-20">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono font-bold text-xs text-orange-400 uppercase tracking-widest">
              MCKINSEY / BCG BENCHMARK FRAMEWORK
            </span>
          </div>
          <span className="text-slate-600">|</span>
          <span className="font-extrabold text-xs text-slate-200 hidden md:inline">
            Bank BRI Executive Briefing · Competitor Intelligence
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
            SLIDE {currentSlideIndex + 1} / {totalSlides}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
              showSpeakerNotes 
                ? 'bg-orange-600 border-orange-500 text-white shadow-xs' 
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span>🎙️ Catatan Pembicara (Partner Notes)</span>
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
      <div className="flex-1 p-6 sm:p-10 overflow-y-auto relative flex items-center justify-center">
        {renderSlideContent()}

        {/* Floating Speaker Notes Panel */}
        {showSpeakerNotes && (
          <div className="absolute bottom-6 right-6 w-96 max-w-[90vw] bg-slate-900/95 border border-orange-500/50 rounded-2xl p-4 shadow-2xl z-30 text-xs backdrop-blur-md animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
              <span className="font-mono font-bold text-orange-400 uppercase tracking-wider text-[10px]">
                🎙️ Lead Partner Script · Slide {currentSlideIndex + 1}
              </span>
              <button 
                onClick={() => setShowSpeakerNotes(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-slate-200 leading-relaxed italic text-[11px]">
              "{speakerNotesContent[currentSlideIndex] || 'Bahas temuan secara interaktif dengan audiens eksekutif.'}"
            </p>
          </div>
        )}
      </div>

      {/* Bottom Navigation Controls */}
      <div className="px-6 py-3 bg-slate-900/90 backdrop-blur border-t border-slate-800 flex items-center justify-between z-20">
        <div className="text-[11px] text-slate-400 font-mono hidden sm:block">
          Gunakan tombol panah <strong>← / →</strong> atau <strong>Spasi</strong> untuk berganti slide.
        </div>

        {/* Slide jump pills */}
        <div className="flex items-center space-x-1 overflow-x-auto max-w-md mx-auto scrollbar-none px-2">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentSlideIndex === idx 
                  ? 'bg-orange-500 w-4 rounded-full' 
                  : 'bg-slate-700 hover:bg-slate-500'
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
            className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-30 disabled:pointer-events-none text-xs font-bold flex items-center space-x-1 shadow-xs"
          >
            <span>Berikutnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
