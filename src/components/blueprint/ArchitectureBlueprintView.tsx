import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { BankLogo } from '../common/BankLogo';
import { 
  Layers, Workflow, BrainCircuit, Landmark, Smartphone, Network, 
  Server, ShieldCheck, Globe, Database, Cloud, Cpu, ArrowRight, 
  CheckCircle2, AlertTriangle, ArrowLeftRight, Sparkles, ExternalLink, 
  Search, SlidersHorizontal, Info, X, ChevronRight, Eye, RefreshCw
} from 'lucide-react';

interface BlueprintBlockConfig {
  id: string;
  layerId: number;
  title: string;
  subtitle: string;
  domain: string;
  targetCapabilityKeyword: string;
  icon: React.ComponentType<{ className?: string }>;
  tags: string[];
}

const BLUEPRINT_LAYERS = [
  {
    id: 1,
    name: 'Touchpoint & Digital Channels',
    subname: 'Saluran Nasabah, Mitra & Open Banking',
    description: 'Titik interaksi langsung nasabah ritel, korporasi, serta konektivitas ekosistem perbankan terbuka (SNAP BI).',
    icon: Smartphone,
    color: 'from-blue-600 to-indigo-600',
    borderColor: 'border-blue-500/40',
    bgLight: 'bg-blue-50/60 dark:bg-blue-950/20',
    flowLabel: 'Trafik Pengguna & API Gateway Sessions'
  },
  {
    id: 2,
    name: 'Integration & Middleware Orchestration',
    subname: 'Event Streaming, API Management & Interkoneksi',
    description: 'Lapisan orkestrasi pesan berkecepatan tinggi, integrasi microservices mesh, dan switching transaksi antarbank.',
    icon: Workflow,
    color: 'from-indigo-600 to-purple-600',
    borderColor: 'border-indigo-500/40',
    bgLight: 'bg-indigo-50/60 dark:bg-indigo-950/20',
    flowLabel: 'Pesan Asynchronous, Transaksi Finansial & Switching'
  },
  {
    id: 3,
    name: 'Core Financial Processing & Operations',
    subname: 'Core Banking, General Ledger & Sistem Transaksi Utama',
    description: 'Mesin pemrosesan akuntansi buku besar perbankan, manajemen kartu kredit/debit, dan operasional layanan perbankan.',
    icon: Landmark,
    color: 'from-amber-600 to-orange-600',
    borderColor: 'border-amber-500/40',
    bgLight: 'bg-amber-50/60 dark:bg-amber-950/20',
    flowLabel: 'Change Data Capture (CDC), Log Audit & Sinkronisasi Data'
  },
  {
    id: 4,
    name: 'Enterprise Data Platform & AI Intelligence',
    subname: 'Data Lakehouse, Real-Time BI & AI/ML Platform',
    description: 'Fondasi intelijen data enterprise untuk analitik real-time, deteksi fraud, credit scoring, dan automasi berbasis AI.',
    icon: BrainCircuit,
    color: 'from-emerald-600 to-teal-600',
    borderColor: 'border-emerald-500/40',
    bgLight: 'bg-emerald-50/60 dark:bg-emerald-950/20',
    flowLabel: 'Penyimpanan Objek, Virtualisasi & Orkestrasi Kontainer'
  },
  {
    id: 5,
    name: 'Cloud Foundation, Infrastructure & Security',
    subname: 'Private/Public Cloud, Database Terdistribusi & Jaringan',
    description: 'Infrastruktur fisik dan cloud modern bertingkat tinggi dengan kepatuhan regulasi, ketahanan bencana, dan proteksi siber.',
    icon: Cloud,
    color: 'from-slate-700 to-cyan-700',
    borderColor: 'border-slate-500/40',
    bgLight: 'bg-slate-50/60 dark:bg-slate-900/40',
    flowLabel: null
  }
];

const BLUEPRINT_BLOCKS: BlueprintBlockConfig[] = [
  // Layer 1: Channels
  {
    id: 'blk-superapp',
    layerId: 1,
    title: 'Consumer Mobile SuperApp',
    subtitle: 'Aplikasi mobile nasabah ritel untuk tabungan, pinjaman & transaksi harian',
    domain: 'Mobile Banking',
    targetCapabilityKeyword: 'super-app',
    icon: Smartphone,
    tags: ['BRImo', 'Livin', 'myBCA', 'BaaS']
  },
  {
    id: 'blk-corporate-cms',
    layerId: 1,
    title: 'Corporate Wholesale & Cash Management (CMS)',
    subtitle: 'Portal perbankan korporasi, payroll massal & trade finance digital',
    domain: 'Internet Banking',
    targetCapabilityKeyword: 'internet',
    icon: Globe,
    tags: ['Qlola', 'Kopra', 'KlikBCA Bisnis']
  },
  {
    id: 'blk-open-banking',
    layerId: 1,
    title: 'Open Banking & API Gateway (SNAP BI)',
    subtitle: 'Konektivitas Open API terstandarisasi Bank Indonesia bagi fintech & mitra',
    domain: 'Digital Banking',
    targetCapabilityKeyword: 'api',
    icon: Cpu,
    tags: ['SNAP BI', 'Partner API', 'BaaS Hub']
  },

  // Layer 2: Integration & Middleware
  {
    id: 'blk-event-streaming',
    layerId: 2,
    title: 'High-Throughput Event Streaming & Pub-Sub',
    subtitle: 'Tulang punggung transmisi data event real-time antar microservices',
    domain: 'Infrastructure',
    targetCapabilityKeyword: 'web application',
    icon: Workflow,
    tags: ['Kafka', 'Confluent', 'Messaging', 'MQ']
  },
  {
    id: 'blk-api-management',
    layerId: 2,
    title: 'Enterprise API Management Platform',
    subtitle: 'Traffic control, security throttling, authentication & telemetry API',
    domain: 'Digital Banking',
    targetCapabilityKeyword: 'api',
    icon: Network,
    tags: ['Kong', 'Apigee', 'WSO2', 'Reverse Proxy']
  },

  // Layer 3: Core Financial Processing
  {
    id: 'blk-cbs',
    layerId: 3,
    title: 'Core Banking System (CBS)',
    subtitle: 'Mesin pencatatan rekening inti, penghimpunan dana & penyaluran kredit',
    domain: 'Core Banking System (CBS)',
    targetCapabilityKeyword: 'core banking',
    icon: Landmark,
    tags: ['BRINETS', 'eMAS', 'In-House OpenShift', 'Temenos']
  },
  {
    id: 'blk-erp',
    layerId: 3,
    title: 'ERP & General Ledger Accounting',
    subtitle: 'Sistem keuangan enterprise, budgeting internal, aset & pelaporan',
    domain: 'Core Banking System (CBS)',
    targetCapabilityKeyword: 'erp',
    icon: Server,
    tags: ['SAP S/4HANA', 'Oracle FAM', 'BRIFIRST']
  },
  {
    id: 'blk-itsm',
    layerId: 3,
    title: 'Enterprise IT Service Management (ITSM)',
    subtitle: 'Observabilitas sistem, helpdesk insiden & tata kelola operasional TI',
    domain: 'IT Support (ITSM)',
    targetCapabilityKeyword: 'itsm',
    icon: ShieldCheck,
    tags: ['ServiceNow', 'Jira Service Desk', 'Remedy']
  },

  // Layer 4: Data & AI
  {
    id: 'blk-edw-lakehouse',
    layerId: 4,
    title: 'Enterprise Data Warehouse & Lakehouse',
    subtitle: 'Repositori penyimpanan analitik terpusat & data historis enterprise',
    domain: 'Enterprise Data Warehouse (EDW)',
    targetCapabilityKeyword: 'warehouse',
    icon: Database,
    tags: ['Cloudera CDP', 'Snowflake', 'BigQuery', 'Teradata']
  },
  {
    id: 'blk-bigdata-engine',
    layerId: 4,
    title: 'Big Data Processing Engine (Distributed)',
    subtitle: 'Komputasi batch & streaming data masif berkecepatan tinggi',
    domain: 'Big Data Analytics',
    targetCapabilityKeyword: 'big data',
    icon: Cpu,
    tags: ['Apache Spark', 'Flink', 'Hadoop', 'Trino']
  },
  {
    id: 'blk-ai-platform',
    layerId: 4,
    title: 'AI/ML Platform & Fraud Analytics',
    subtitle: 'Kecerdasan buatan analitik perilaku, credit scoring & deteksi anomali',
    domain: 'AI Technology',
    targetCapabilityKeyword: 'ai',
    icon: BrainCircuit,
    tags: ['BRI Brain', 'SAS Fraud', 'Dataiku', 'GenAI']
  },
  {
    id: 'blk-mdm-customer360',
    layerId: 4,
    title: 'Master Data Management (Customer 360)',
    subtitle: 'Golden record entitas nasabah terintegrasi lintas produk dan anak usaha',
    domain: 'Master Data Management (MDM)',
    targetCapabilityKeyword: 'mdm',
    icon: Layers,
    tags: ['Single Customer View', 'Data Governance']
  },

  // Layer 5: Cloud, Infrastructure & Network
  {
    id: 'blk-cloud-paas',
    layerId: 5,
    title: 'Container Platform & Private Cloud PaaS',
    subtitle: 'Platform orkestrasi kontainer mikroservis berskala enterprise',
    domain: 'Cloud Technology',
    targetCapabilityKeyword: 'cloud',
    icon: Cloud,
    tags: ['Red Hat OpenShift', 'Kubernetes', 'VMware Tanzu']
  },
  {
    id: 'blk-network-sdwan',
    layerId: 5,
    title: 'Enterprise Network & SD-WAN Interconnect',
    subtitle: 'Jaringan backbone komunikasi antarcabang, data center & cloud',
    domain: 'Network',
    targetCapabilityKeyword: 'network',
    icon: Network,
    tags: ['SD-WAN', 'Cisco', 'Fortinet', 'MPLS']
  }
];

const BANK_OPTIONS = [
  { slug: 'bri', label: 'BRI', fullName: 'Bank Rakyat Indonesia', isFocus: true },
  { slug: 'mandiri', label: 'Mandiri', fullName: 'Bank Mandiri', isFocus: false },
  { slug: 'bca', label: 'BCA', fullName: 'Bank Central Asia', isFocus: false },
  { slug: 'bni', label: 'BNI', fullName: 'Bank Negara Indonesia', isFocus: false },
  { slug: 'btn', label: 'BTN', fullName: 'Bank Tabungan Negara', isFocus: false },
  { slug: 'bsi', label: 'BSI', fullName: 'Bank Syariah Indonesia', isFocus: false }
];

export const ArchitectureBlueprintView: React.FC = () => {
  const { researchItems, setSelectedResearchCell, navigate } = useApp();

  const [bankASlug, setBankASlug] = useState<string>('bri');
  const [bankBSlug, setBankBSlug] = useState<string>('mandiri');
  const [viewMode, setViewMode] = useState<'duel' | 'single' | 'parity'>('duel');
  const [activeLayerFilter, setActiveLayerFilter] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inspectedBlock, setInspectedBlock] = useState<{
    config: BlueprintBlockConfig;
    matchingItem: any;
  } | null>(null);

  const bankA = BANK_OPTIONS.find(b => b.slug === bankASlug) || BANK_OPTIONS[0];
  const bankB = BANK_OPTIONS.find(b => b.slug === bankBSlug) || BANK_OPTIONS[1];

  const handleSwapBanks = () => {
    const temp = bankASlug;
    setBankASlug(bankBSlug);
    setBankBSlug(temp);
  };

  // Helper to find matching research item from 408 dataset
  const findMatchingResearchItem = (block: BlueprintBlockConfig) => {
    const byDomainAndQuery = researchItems.find(item => 
      item.domain.toLowerCase().includes(block.domain.toLowerCase()) &&
      item.kapabilitas.toLowerCase().includes(block.targetCapabilityKeyword.toLowerCase())
    );
    if (byDomainAndQuery) return byDomainAndQuery;

    const byDomain = researchItems.find(item =>
      item.domain.toLowerCase().includes(block.domain.toLowerCase())
    );
    return byDomain || researchItems[0];
  };

  // Pre-calculate block data
  const enrichedBlocks = useMemo(() => {
    return BLUEPRINT_BLOCKS.map(block => {
      const match = findMatchingResearchItem(block);
      const detailA = match?.banks?.[bankASlug] || { merk: '-', status: 'Belum', link: '', pic: 'Admin' };
      const detailB = match?.banks?.[bankBSlug] || { merk: '-', status: 'Belum', link: '', pic: 'Admin' };

      const isAVerified = detailA.status === 'Terverifikasi';
      const isBVerified = detailB.status === 'Terverifikasi';
      const hasMerkA = detailA.merk && detailA.merk !== '-';
      const hasMerkB = detailB.merk && detailB.merk !== '-';

      let parityStatus: 'a-leads' | 'b-leads' | 'equal' | 'diff' | 'none' = 'none';
      if (isAVerified && !isBVerified) parityStatus = 'a-leads';
      else if (!isAVerified && isBVerified) parityStatus = 'b-leads';
      else if (isAVerified && isBVerified) parityStatus = 'equal';
      else if (hasMerkA && hasMerkB && detailA.merk.toLowerCase() !== detailB.merk.toLowerCase()) parityStatus = 'diff';
      else parityStatus = 'none';

      return {
        config: block,
        match,
        detailA,
        detailB,
        parityStatus
      };
    });
  }, [researchItems, bankASlug, bankBSlug]);

  // Filter blocks
  const filteredBlocks = useMemo(() => {
    return enrichedBlocks.filter(({ config, match, detailA, detailB }) => {
      if (activeLayerFilter !== 'all' && config.layerId !== activeLayerFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = config.title.toLowerCase().includes(q);
        const matchDomain = config.domain.toLowerCase().includes(q);
        const matchMerkA = detailA.merk?.toLowerCase().includes(q);
        const matchMerkB = detailB.merk?.toLowerCase().includes(q);
        const matchTags = config.tags.some(t => t.toLowerCase().includes(q));
        if (!matchTitle && !matchDomain && !matchMerkA && !matchMerkB && !matchTags) return false;
      }
      return true;
    });
  }, [enrichedBlocks, activeLayerFilter, searchQuery]);

  // Statistics
  const stats = useMemo(() => {
    const total = enrichedBlocks.length;
    const aVerified = enrichedBlocks.filter(b => b.detailA.status === 'Terverifikasi').length;
    const bVerified = enrichedBlocks.filter(b => b.detailB.status === 'Terverifikasi').length;
    const parityCount = enrichedBlocks.filter(b => b.parityStatus === 'equal').length;
    const aAdvantage = enrichedBlocks.filter(b => b.parityStatus === 'a-leads').length;
    const bAdvantage = enrichedBlocks.filter(b => b.parityStatus === 'b-leads').length;

    return { total, aVerified, bVerified, parityCount, aAdvantage, bAdvantage };
  }, [enrichedBlocks]);

  return (
    <div className="space-y-6 pb-20">
      {/* Header & Page Title */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Architecture Topology Blueprint
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60">
                  Interactive View
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 max-w-2xl">
                Visualisasi interaktif topologi blok arsitektur enterprise perbankan (5 Layer & 13 Domain) dengan komparasi langsung tech stack {bankA.label} vs {bankB.label}.
              </p>
            </div>
          </div>
        </div>

        {/* Bank Selection Switchers - Strictly 1 Line Horizontal */}
        <div 
          className="flex flex-row items-center gap-2 sm:gap-2.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-2 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card shrink-0 flex-nowrap whitespace-nowrap overflow-x-auto"
          style={{ flexWrap: 'nowrap' }}
        >
          {/* Bank 1 Selector */}
          <div className="flex items-center gap-2 bg-slate-50/90 dark:bg-slate-800/80 px-2.5 py-1.5 rounded-xl border border-slate-200/70 dark:border-slate-700/70 shadow-2xs shrink-0">
            <BankLogo bankCode={bankA.slug} size={24} className="shrink-0" />
            <span className="text-slate-400 dark:text-slate-500 font-extrabold text-[10px] uppercase tracking-wider shrink-0">Bank 1:</span>
            <select
              value={bankASlug}
              onChange={e => setBankASlug(e.target.value)}
              className="w-32 sm:w-40 md:w-44 bg-transparent font-black text-slate-800 dark:text-slate-200 text-xs focus:outline-hidden cursor-pointer truncate"
            >
              {BANK_OPTIONS.map(b => (
                <option key={b.slug} value={b.slug} disabled={b.slug === bankBSlug} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-semibold">
                  {b.label} – {b.fullName}
                </option>
              ))}
            </select>
          </div>

          {/* Interactive Swap Button */}
          <button
            type="button"
            onClick={handleSwapBanks}
            title="Tukar Posisi Bank 1 & 2"
            aria-label="Tukar Posisi Bank"
            className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-blue-600 dark:bg-slate-800 dark:hover:bg-blue-600 text-slate-400 hover:text-white dark:text-slate-400 dark:hover:text-white flex items-center justify-center transition-all shrink-0 shadow-2xs cursor-pointer active:scale-95"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
          </button>

          {/* Bank 2 Selector */}
          <div className="flex items-center gap-2 bg-slate-50/90 dark:bg-slate-800/80 px-2.5 py-1.5 rounded-xl border border-slate-200/70 dark:border-slate-700/70 shadow-2xs shrink-0">
            <BankLogo bankCode={bankB.slug} size={24} className="shrink-0" />
            <span className="text-slate-400 dark:text-slate-500 font-extrabold text-[10px] uppercase tracking-wider shrink-0">Bank 2:</span>
            <select
              value={bankBSlug}
              onChange={e => setBankBSlug(e.target.value)}
              className="w-32 sm:w-40 md:w-44 bg-transparent font-black text-slate-800 dark:text-slate-200 text-xs focus:outline-hidden cursor-pointer truncate"
            >
              {BANK_OPTIONS.map(b => (
                <option key={b.slug} value={b.slug} disabled={b.slug === bankASlug} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-semibold">
                  {b.label} – {b.fullName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Control Bar: Mode Toggle, Layer Filters & Search */}
      <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Mode Selector */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-full md:w-auto">
          <button
            type="button"
            onClick={() => setViewMode('duel')}
            className={`flex-1 md:flex-none px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
              viewMode === 'duel'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>Duel Mode ({bankA.label} vs {bankB.label})</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('single')}
            className={`flex-1 md:flex-none px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
              viewMode === 'single'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Fokus {bankA.label}</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('parity')}
            className={`flex-1 md:flex-none px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
              viewMode === 'parity'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Heatmap Paritas</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari blok, merk, teknologi (mis: Kafka, OpenShift)..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Layer Filters */}
        <div className="flex items-center space-x-1 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <button
            type="button"
            onClick={() => setActiveLayerFilter('all')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold shrink-0 transition ${
              activeLayerFilter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            Semua (5 Layer)
          </button>
          {BLUEPRINT_LAYERS.map(layer => (
            <button
              key={layer.id}
              type="button"
              onClick={() => setActiveLayerFilter(layer.id)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold shrink-0 transition flex items-center space-x-1 ${
                activeLayerFilter === layer.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              <span>L{layer.id}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Blueprint Summary Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white/90 dark:bg-slate-900/90 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Total Blok Arsitektur</div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">{stats.total} Komponen Kunci</div>
          <div className="text-[10px] text-slate-500">Mencakup 5 Layer Utama</div>
        </div>

        <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/5 p-3.5 rounded-2xl border border-blue-500/20 shadow-2xs flex items-center justify-between">
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-300">Keunggulan {bankA.label}</div>
            <div className="text-2xl font-black text-blue-900 dark:text-blue-100 mt-0.5">{stats.aAdvantage} Blok</div>
            <div className="text-[10px] text-blue-600 dark:text-blue-400">Terverifikasi di {bankA.label} saja</div>
          </div>
          <BankLogo bankCode={bankA.slug} size={28} className="shrink-0" />
        </div>

        <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/5 p-3.5 rounded-2xl border border-amber-500/20 shadow-2xs flex items-center justify-between">
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-300">Keunggulan {bankB.label}</div>
            <div className="text-2xl font-black text-amber-900 dark:text-amber-100 mt-0.5">{stats.bAdvantage} Blok</div>
            <div className="text-[10px] text-amber-600 dark:text-amber-400">Celah arsitektur bagi {bankA.label}</div>
          </div>
          <BankLogo bankCode={bankB.slug} size={28} className="shrink-0" />
        </div>

        <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/5 p-3.5 rounded-2xl border border-emerald-500/20 shadow-2xs">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">Paritas Bersama</div>
          <div className="text-2xl font-black text-emerald-900 dark:text-emerald-100 mt-0.5">{stats.parityCount} Blok</div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400">Keduanya Terverifikasi Setara</div>
        </div>
      </div>

      {/* Main Architecture Canvas (5 Layers Vertically Connected) */}
      <div className="space-y-6">
        {BLUEPRINT_LAYERS.map((layer, index) => {
          const layerBlocks = filteredBlocks.filter(b => b.config.layerId === layer.id);
          if (activeLayerFilter !== 'all' && activeLayerFilter !== layer.id) return null;
          if (layerBlocks.length === 0 && searchQuery.trim()) return null;

          const LayerIcon = layer.icon;

          return (
            <div key={layer.id} className="relative">
              {/* Layer Container Card */}
              <div className={`rounded-3xl border ${layer.borderColor} bg-white dark:bg-slate-900/90 shadow-card overflow-hidden transition-all duration-200`}>
                {/* Layer Header Banner */}
                <div className={`px-5 py-3.5 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r ${layer.color} text-white flex flex-col md:flex-row md:items-center justify-between gap-2`}>
                  <div className="flex items-center space-x-3">
                    <span className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-xs flex items-center justify-center font-black text-xs">
                      L{layer.id}
                    </span>
                    <LayerIcon className="w-5 h-5 text-white/90" />
                    <div>
                      <h3 className="font-black text-base tracking-tight leading-tight">{layer.name}</h3>
                      <p className="text-xs text-white/80 font-medium">{layer.subname}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-black/20 px-2.5 py-1 rounded-full">
                      {layerBlocks.length} Komponen
                    </span>
                  </div>
                </div>

                {/* Layer Description Bar */}
                <div className="px-5 py-2 bg-slate-50/70 dark:bg-slate-850/50 border-b border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                  <span>{layer.description}</span>
                  <span className="font-mono text-[10px] text-slate-400">Layer {layer.id} of 5</span>
                </div>

                {/* Blocks Grid */}
                <div className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {layerBlocks.map(({ config, match, detailA, detailB, parityStatus }) => {
                    const BlockIcon = config.icon;

                    return (
                      <div
                        key={config.id}
                        className={`rounded-2xl border transition-all duration-200 flex flex-col justify-between hover:shadow-card-hover group cursor-pointer ${
                          viewMode === 'parity'
                            ? parityStatus === 'a-leads'
                              ? 'bg-blue-50/60 dark:bg-blue-950/30 border-blue-300 dark:border-blue-800'
                              : parityStatus === 'b-leads'
                              ? 'bg-amber-50/60 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800'
                              : parityStatus === 'equal'
                              ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800'
                              : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80'
                            : 'bg-slate-50/70 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 border-slate-200/80 dark:border-slate-750'
                        }`}
                        onClick={() => setInspectedBlock({ config, matchingItem: match })}
                      >
                        {/* Block Header */}
                        <div className="p-4 border-b border-slate-100 dark:border-slate-750">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-650 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-2xs group-hover:scale-105 transition">
                                <BlockIcon className="w-4 h-4" />
                              </div>
                              <div>
                                <h4 className="font-black text-xs text-slate-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                                  {config.title}
                                </h4>
                                <span className="text-[10px] text-slate-400 font-medium">{config.domain}</span>
                              </div>
                            </div>

                            {/* Parity Status Badge */}
                            {parityStatus === 'a-leads' && (
                              <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300 shrink-0">
                                {bankA.label} Unggul
                              </span>
                            )}
                            {parityStatus === 'b-leads' && (
                              <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300 shrink-0">
                                {bankB.label} Unggul
                              </span>
                            )}
                            {parityStatus === 'equal' && (
                              <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 shrink-0">
                                Paritas
                              </span>
                            )}
                            {parityStatus === 'diff' && (
                              <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-300 shrink-0">
                                Beda Solusi
                              </span>
                            )}
                          </div>

                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                            {config.subtitle}
                          </p>
                        </div>

                        {/* Block Body: Dual or Single View */}
                        {viewMode === 'single' ? (
                          /* Single Bank View */
                          <div className="p-3.5 space-y-2">
                            <div className="flex items-center space-x-2">
                              <BankLogo bankCode={bankA.slug} size={22} className="shrink-0" />
                              <span className="text-xs font-black text-slate-900 dark:text-white">{bankA.fullName}</span>
                            </div>
                            <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700 text-xs">
                              <div className="font-bold text-slate-800 dark:text-slate-200 line-clamp-2">
                                {detailA.merk || 'Belum teridentifikasi'}
                              </div>
                              <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-100 dark:border-slate-800 text-[10px]">
                                <span className={`font-bold ${
                                  detailA.status === 'Terverifikasi' ? 'text-emerald-600 dark:text-emerald-400' :
                                  detailA.status === 'Inferensi' ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400'
                                }`}>
                                  {detailA.status === 'Terverifikasi' ? '✓ Terverifikasi' : detailA.status === 'Inferensi' ? '⚠ Inferensi' : '– Belum'}
                                </span>
                                <span className="text-slate-400">Review: {detailA.pic || 'Admin'}</span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          /* Duel Mode: Side-by-Side Comparison */
                          <div className="p-3 grid grid-cols-2 gap-2 text-xs">
                            {/* Bank A Column */}
                            <div className="bg-blue-50/50 dark:bg-blue-950/20 p-2 rounded-xl border border-blue-200/60 dark:border-blue-900/40 flex flex-col justify-between">
                              <div>
                                <div className="flex items-center space-x-1.5 mb-1.5">
                                  <BankLogo bankCode={bankA.slug} size={18} className="shrink-0" />
                                  <span className="font-extrabold text-[11px] text-blue-900 dark:text-blue-300">{bankA.label}</span>
                                </div>
                                <div className="font-semibold text-slate-800 dark:text-slate-200 text-[11px] line-clamp-3 leading-snug">
                                  {detailA.merk || '–'}
                                </div>
                              </div>
                              <div className="mt-2 text-[9px] font-bold">
                                {detailA.status === 'Terverifikasi' ? (
                                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center space-x-0.5">
                                    <CheckCircle2 className="w-2.5 h-2.5" />
                                    <span>Verified</span>
                                  </span>
                                ) : detailA.status === 'Inferensi' ? (
                                  <span className="text-amber-600 dark:text-amber-400">⚠ Inferensi</span>
                                ) : (
                                  <span className="text-slate-400">– Belum</span>
                                )}
                              </div>
                            </div>

                            {/* Bank B Column */}
                            <div className="bg-amber-50/50 dark:bg-amber-950/20 p-2 rounded-xl border border-amber-200/60 dark:border-amber-900/40 flex flex-col justify-between">
                              <div>
                                <div className="flex items-center space-x-1.5 mb-1.5">
                                  <BankLogo bankCode={bankB.slug} size={18} className="shrink-0" />
                                  <span className="font-extrabold text-[11px] text-amber-900 dark:text-amber-300">{bankB.label}</span>
                                </div>
                                <div className="font-semibold text-slate-800 dark:text-slate-200 text-[11px] line-clamp-3 leading-snug">
                                  {detailB.merk || '–'}
                                </div>
                              </div>
                              <div className="mt-2 text-[9px] font-bold">
                                {detailB.status === 'Terverifikasi' ? (
                                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center space-x-0.5">
                                    <CheckCircle2 className="w-2.5 h-2.5" />
                                    <span>Verified</span>
                                  </span>
                                ) : detailB.status === 'Inferensi' ? (
                                  <span className="text-amber-600 dark:text-amber-400">⚠ Inferensi</span>
                                ) : (
                                  <span className="text-slate-400">– Belum</span>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Block Footer Action */}
                        <div className="px-3.5 py-2 bg-slate-100/60 dark:bg-slate-800/80 rounded-b-2xl border-t border-slate-100 dark:border-slate-750 flex items-center justify-between text-[10px]">
                          <div className="flex items-center space-x-1 overflow-hidden">
                            {config.tags.slice(0, 2).map((tag, i) => (
                              <span key={i} className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-mono text-[9px]">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <span className="text-blue-600 dark:text-blue-400 font-bold flex items-center space-x-0.5 group-hover:translate-x-0.5 transition">
                            <span>Inspeksi</span>
                            <ChevronRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Data Flow Connector Arrow between Layers */}
              {layer.flowLabel && index < BLUEPRINT_LAYERS.length - 1 && (activeLayerFilter === 'all') && (
                <div className="flex flex-col items-center justify-center my-3">
                  <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-850 border border-slate-200 dark:border-slate-750 text-[10px] text-slate-500 font-mono shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    <span>{layer.flowLabel}</span>
                    <span className="text-slate-400">⬇</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Slide-out Inspection Modal */}
      {inspectedBlock && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between z-10">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white leading-tight">
                    {inspectedBlock.config.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Domain: {inspectedBlock.config.domain} • Layer {inspectedBlock.config.layerId}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setInspectedBlock(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-5">
              <div>
                <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">Fungsi Arsitektur</h4>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                  {inspectedBlock.config.subtitle}
                </p>
              </div>

              {/* Matched Capability from 408 Research Items */}
              {inspectedBlock.matchingItem && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                      Riset Matriks Terkait (Item #{inspectedBlock.matchingItem.no})
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                      ID: {inspectedBlock.matchingItem.id}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-100/70 dark:bg-slate-800 border border-slate-200 dark:border-slate-750 text-xs font-bold text-slate-900 dark:text-white">
                    {inspectedBlock.matchingItem.kapabilitas}
                  </div>

                  {/* 6 Bank Implementations for this Capability */}
                  <div className="space-y-2">
                    <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      Implementasi di 6 Bank Benchmark:
                    </div>
                    <div className="grid grid-cols-1 gap-2.5">
                      {BANK_OPTIONS.map(bank => {
                        const bDetail = inspectedBlock.matchingItem.banks?.[bank.slug] || { merk: '-', status: 'Belum', link: '', pic: 'Admin' };
                        const isFocus = bank.slug === bankASlug || bank.slug === bankBSlug;

                        return (
                          <div
                            key={bank.slug}
                            className={`p-3 rounded-xl border transition ${
                              isFocus
                                ? 'bg-blue-50/40 dark:bg-blue-950/20 border-blue-300 dark:border-blue-800 ring-1 ring-blue-500/20'
                                : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-750'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <div className="flex items-center space-x-2">
                                <BankLogo bankCode={bank.slug} size={20} />
                                <span className="font-black text-xs text-slate-900 dark:text-white">{bank.fullName}</span>
                                {bank.isFocus && (
                                  <span className="text-[9px] bg-blue-600 text-white px-1.5 py-0.2 rounded font-bold">FOKUS</span>
                                )}
                              </div>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                bDetail.status === 'Terverifikasi'
                                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                                  : bDetail.status === 'Inferensi'
                                  ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                              }`}>
                                {bDetail.status}
                              </span>
                            </div>

                            <p className="text-xs font-medium text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed">
                              {bDetail.merk || '– Belum ada data merk'}
                            </p>

                            {bDetail.link && (
                              <div className="mt-2 pt-2 border-t border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between text-[10px]">
                                <span className="text-slate-400">Reviewer: {bDetail.pic || 'Admin'}</span>
                                {bDetail.url && (
                                  <a
                                    href={bDetail.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1 font-semibold"
                                  >
                                    <span>Lihat Sumber Bukti</span>
                                    <ExternalLink className="w-2.5 h-2.5" />
                                  </a>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-slate-50 dark:bg-slate-850 px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setInspectedBlock(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              >
                Tutup
              </button>

              {inspectedBlock.matchingItem && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedResearchCell({ capId: inspectedBlock.matchingItem.id, bankCode: bankASlug });
                    setInspectedBlock(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-xs flex items-center space-x-1.5"
                >
                  <span>Buka Editor Sel Riset</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
