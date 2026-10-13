import { Bank, Category, Technology, Finding, Evidence, Interview, User, AuditLog } from '../types';

export const INITIAL_BANKS: Bank[] = [
  {
    id: 'bank-bri',
    nama: 'PT Bank Rakyat Indonesia (Persero) Tbk',
    slug: 'bri',
    singkatan: 'BRI',
    deskripsi: 'Bank BUMN terbesar di Indonesia dengan fokus pada segmen mikro, UMKM, dan penetrasi inklusi keuangan melalui jaringan hybrid terluas (AgenBRILink & BRImo).',
    logo: '🏦',
    isFokusUtama: true,
    produkDigital: ['BRImo', 'Pasar.id', 'BRISPOT', 'AgenBRILink Mobile', 'BRIAPI (SNAP)', 'Ceria'],
    brandColor: '#00529C',
    accentColor: '#F58220',
    textColor: '#ffffff',
    badgeBg: 'bg-blue-600 text-white'
  },
  {
    id: 'bank-mandiri',
    nama: 'PT Bank Mandiri (Persero) Tbk',
    slug: 'mandiri',
    singkatan: 'Mandiri',
    deskripsi: 'Bank korporasi dan konsumer terkemuka dengan fokus digital banking terpadu untuk ritel (Livin\') dan *wholesale* (Kopra).',
    logo: '🏛️',
    isFokusUtama: false,
    produkDigital: ['Livin\' by Mandiri (Yellow & Sukha)', 'Kopra by Mandiri', 'Mandiri Cash Management', 'Mandiri API'],
    brandColor: '#0A3B74',
    accentColor: '#FDB813',
    textColor: '#ffffff',
    badgeBg: 'bg-sky-800 text-white'
  },
  {
    id: 'bank-bni',
    nama: 'PT Bank Negara Indonesia (Persero) Tbk',
    slug: 'bni',
    singkatan: 'BNI',
    deskripsi: 'Bank BUMN pelopor perbankan internasional dan digital lifestyle banking terbarukan melalui peluncuran platform mobile wondr.',
    logo: '🏢',
    isFokusUtama: false,
    produkDigital: ['wondr by BNI', 'BNI Mobile Banking', 'BNIDirect', 'BNI Open API'],
    brandColor: '#005E5D',
    accentColor: '#F15A24',
    textColor: '#ffffff',
    badgeBg: 'bg-emerald-800 text-white'
  },
  {
    id: 'bank-btn',
    nama: 'PT Bank Tabungan Negara (Persero) Tbk',
    slug: 'btn',
    singkatan: 'BTN',
    deskripsi: 'Bank spesialis pembiayaan perumahan dan ekosistem KPR nasional, tengah melakukan akselerasi digital lewat platform bale by BTN.',
    logo: '🏠',
    isFokusUtama: false,
    produkDigital: ['bale by BTN', 'BTN Mobile', 'BTN Properti', 'Portal KPR', 'BTN Cash Management'],
    brandColor: '#003366',
    accentColor: '#C5A059',
    textColor: '#ffffff',
    badgeBg: 'bg-indigo-900 text-white'
  },
  {
    id: 'bank-bsi',
    nama: 'PT Bank Syariah Indonesia Tbk',
    slug: 'bsi',
    singkatan: 'BSI',
    deskripsi: 'Bank syariah terbesar di Indonesia hasil merger bank syariah Himbara, sedang mentransformasi layanan digital via BYOND by BSI.',
    logo: '🕌',
    isFokusUtama: false,
    produkDigital: ['BYOND by BSI', 'BSI Mobile', 'BSI Net Banking', 'Salam Digital'],
    brandColor: '#00A39D',
    accentColor: '#78BE20',
    textColor: '#ffffff',
    badgeBg: 'bg-teal-700 text-white'
  }
];

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-big-data',
    nama: 'Big Data & Analytics',
    slug: 'big-data',
    urutan: 1,
    icon: 'DatabaseZap',
    deskripsi: 'Infrastruktur pemrosesan data skala besar, streaming, lakehouse, analytics engine, dan business intelligence.',
    contohSubkategori: ['Data Lake/Lakehouse', 'Streaming Platform', 'Batch Processing', 'Data Warehouse', 'BI Tools']
  },
  {
    id: 'cat-ai-ml',
    nama: 'AI / Machine Learning',
    slug: 'ai-ml',
    urutan: 2,
    icon: 'BrainCircuit',
    deskripsi: 'Platform model machine learning, credit scoring cerdas, sistem deteksi fraud, generative AI, dan NLP conversational.',
    contohSubkategori: ['MLOps Platform', 'Automated Credit Scoring', 'Real-time Fraud Detection', 'GenAI/Chatbot']
  },
  {
    id: 'cat-front-end',
    nama: 'Front End (Web)',
    slug: 'front-end',
    urutan: 3,
    icon: 'Layout',
    deskripsi: 'Framework antarmuka web, Single Page Applications, server-side rendering, CDN, dan observability web.',
    contohSubkategori: ['Web Framework', 'Design System', 'CDN & Edge', 'Analytics Tagging']
  },
  {
    id: 'cat-mobile',
    nama: 'Mobile Ecosystem',
    slug: 'mobile',
    urutan: 4,
    icon: 'Smartphone',
    deskripsi: 'Teknologi pengembangan aplikasi mobile super-app (Native vs Cross-platform), SDK keamanan dan distribusi mobile.',
    contohSubkategori: ['Android Architecture', 'iOS Architecture', 'Cross-platform Framework', 'Mobile Security SDK']
  },
  {
    id: 'cat-back-end',
    nama: 'Back End & Microservices',
    slug: 'back-end',
    urutan: 5,
    icon: 'Server',
    deskripsi: 'Bahasa pemrograman backend, enterprise framework, API Gateway, service mesh, dan protokol microservices.',
    contohSubkategori: ['Enterprise Languages', 'Microservices Framework', 'API Gateway', 'RPC/Communication']
  },
  {
    id: 'cat-core-banking',
    nama: 'Core Banking & Middleware',
    slug: 'core-banking',
    urutan: 6,
    icon: 'Building2',
    deskripsi: 'Sistem core banking mesin pembukuan (ledger), Enterprise Service Bus (ESB), dan message queue transactional.',
    contohSubkategori: ['Core Banking Engine', 'Enterprise Service Bus (ESB)', 'Enterprise Messaging MQ']
  },
  {
    id: 'cat-database',
    nama: 'Database & In-Memory Storage',
    slug: 'database',
    urutan: 7,
    icon: 'HardDrive',
    deskripsi: 'Relational Database (RDBMS), NoSQL distributed store, in-memory cache, dan operational data store.',
    contohSubkategori: ['RDBMS High Availability', 'Distributed NoSQL', 'In-Memory Caching', 'Time Series DB']
  },
  {
    id: 'cat-cloud-infra',
    nama: 'Cloud & Infrastructure',
    slug: 'cloud-infra',
    urutan: 8,
    icon: 'Cloud',
    deskripsi: 'Arsitektur hybrid cloud, private cloud enterprise, container orchestration, dan server hardware on-premise.',
    contohSubkategori: ['Container Orchestration', 'Hybrid/Multi-Cloud Platform', 'Software-Defined Storage', 'Virtualization']
  },
  {
    id: 'cat-devops',
    nama: 'DevOps, CI/CD & Observability',
    slug: 'devops',
    urutan: 9,
    icon: 'GitBranch',
    deskripsi: 'Pipeline otomatisasi build & deployment, Infrastructure as Code, log aggregation, dan APM monitoring.',
    contohSubkategori: ['CI/CD Orchestration', 'Application Performance Monitoring (APM)', 'Distributed Tracing', 'Log Management']
  },
  {
    id: 'cat-security',
    nama: 'Security, IAM & Fraud Prevention',
    slug: 'security',
    urutan: 10,
    icon: 'ShieldCheck',
    deskripsi: 'Manajemen identitas & akses nasabah/karyawan, WAF, secrets management, data encryption, dan biometrik e-KYC.',
    contohSubkategori: ['Customer Identity & Access (CIAM)', 'Web Application Firewall (WAF)', 'Secrets Vault', 'Biometrics / Liveness']
  },
  {
    id: 'cat-payment-api',
    nama: 'Payment & Open Finance (SNAP API)',
    slug: 'payment-api',
    urutan: 11,
    icon: 'CreditCard',
    deskripsi: 'Implementasi standar SNAP Bank Indonesia, BI-FAST interbank, QRIS switching, dan portal developer open banking.',
    contohSubkategori: ['SNAP BI-FAST Engine', 'QRIS Merchant Aggregation', 'Open Banking Portal', 'Card Switching Integration']
  }
];

export const INITIAL_TECHNOLOGIES: Technology[] = [
  // Big Data & Analytics
  {
    id: 'tech-confluent-kafka',
    nama: 'Apache Kafka / Confluent',
    vendor: 'Confluent / Apache',
    categoryId: 'cat-big-data',
    tipe: 'open-source',
    deskripsi: 'Distributed event streaming platform untuk pub/sub transaksi real-time dan pipeline data analytics antarsistem.',
    websiteUrl: 'https://confluent.io'
  },
  {
    id: 'tech-spark',
    nama: 'Apache Spark',
    vendor: 'Apache Software Foundation',
    categoryId: 'cat-big-data',
    tipe: 'open-source',
    deskripsi: 'Unified analytics engine untuk pemrosesan data berskala besar (large-scale data processing & machine learning batch).',
    websiteUrl: 'https://spark.apache.org'
  },
  {
    id: 'tech-cloudera',
    nama: 'Cloudera Data Platform (CDP)',
    vendor: 'Cloudera',
    categoryId: 'cat-big-data',
    tipe: 'komersial',
    deskripsi: 'Enterprise data cloud platform untuk data warehouse, data engineering, dan machine learning on-premise.',
    websiteUrl: 'https://www.cloudera.com'
  },
  {
    id: 'tech-ibm-datastage',
    nama: 'IBM InfoSphere DataStage',
    vendor: 'IBM Corporation',
    categoryId: 'cat-big-data',
    tipe: 'komersial',
    deskripsi: 'Platform Enterprise Data Integration & ETL (Extract, Transform, Load) untuk otomatisasi data warehousing skala masif, integrasi data transaksi core banking, dan pelaporan kepatuhan regulasi.',
    websiteUrl: 'https://www.ibm.com/products/infosphere-datastage'
  },
  {
    id: 'tech-minio',
    nama: 'MinIO / Ceph Object Store',
    vendor: 'MinIO Inc / Red Hat',
    categoryId: 'cat-big-data',
    tipe: 'open-source',
    deskripsi: 'High performance S3-compatible object storage untuk data lake on-premise perbankan.',
    websiteUrl: 'https://min.io'
  },
  {
    id: 'tech-tableau-powerbi',
    nama: 'Tableau & Microsoft Power BI',
    vendor: 'Salesforce / Microsoft',
    categoryId: 'cat-big-data',
    tipe: 'komersial',
    deskripsi: 'Business intelligence dan visualisasi dashboard manajemen eksekutif dan analitik cabang.',
    websiteUrl: 'https://tableau.com'
  },

  // AI/ML
  {
    id: 'tech-kubeflow',
    nama: 'Kubeflow & MLflow',
    vendor: 'Open Source (LF AI & Data)',
    categoryId: 'cat-ai-ml',
    tipe: 'open-source',
    deskripsi: 'Cloud-native machine learning platform untuk deployment, tracking eksperimen, dan orchestration model AI.',
    websiteUrl: 'https://kubeflow.org'
  },
  {
    id: 'tech-fico-scoring',
    nama: 'FICO Falcon / Blaze Advisor',
    vendor: 'FICO',
    categoryId: 'cat-ai-ml',
    tipe: 'komersial',
    deskripsi: 'Mesin rules & automated credit decisioning engine serta anti-fraud skor transaksi kartu dan perbankan.',
    websiteUrl: 'https://fico.com'
  },
  {
    id: 'tech-genai-sabrina',
    nama: 'In-House Virtual Assistant (NLP/LLM Engine)',
    vendor: 'In-House Engineering & OpenAI/Azure',
    categoryId: 'cat-ai-ml',
    tipe: 'in-house',
    deskripsi: 'Customer-facing AI conversational assistant (seperti Sabrina BRI, Mita Mandiri, BNI Assistant) berbasis NLP/LLM.',
    websiteUrl: 'https://bri.co.id'
  },
  {
    id: 'tech-dataiku',
    nama: 'Dataiku DSS',
    vendor: 'Dataiku',
    categoryId: 'cat-ai-ml',
    tipe: 'komersial',
    deskripsi: 'Collaborative data science platform untuk tim analytics dan data scientist lintas divisi bisnis.',
    websiteUrl: 'https://dataiku.com'
  },

  // Front End
  {
    id: 'tech-react',
    nama: 'React.js & Next.js',
    vendor: 'Meta / Vercel',
    categoryId: 'cat-front-end',
    tipe: 'open-source',
    deskripsi: 'Framework web modern berbasis komponen reaktif untuk web portal nasabah dan internet banking web.',
    websiteUrl: 'https://react.dev'
  },
  {
    id: 'tech-angular',
    nama: 'Angular',
    vendor: 'Google',
    categoryId: 'cat-front-end',
    tipe: 'open-source',
    deskripsi: 'TypeScript-based enterprise web application framework banyak digunakan untuk back-office portal internal bank.',
    websiteUrl: 'https://angular.io'
  },
  {
    id: 'tech-cloudflare-cdn',
    nama: 'Cloudflare / Akamai CDN',
    vendor: 'Cloudflare / Akamai',
    categoryId: 'cat-front-end',
    tipe: 'komersial',
    deskripsi: 'Content Delivery Network global dan edge security untuk caching aset web statis dan mitigasi DDoS.',
    websiteUrl: 'https://cloudflare.com'
  },

  // Mobile
  {
    id: 'tech-kotlin-android',
    nama: 'Kotlin (Android Native Clean Arch)',
    vendor: 'JetBrains / Google',
    categoryId: 'cat-mobile',
    tipe: 'open-source',
    deskripsi: 'Pengembangan aplikasi native Android dengan Kotlin Coroutines, Jetpack Compose, dan Modular Clean Architecture.',
    websiteUrl: 'https://kotlinlang.org'
  },
  {
    id: 'tech-swift-ios',
    nama: 'Swift (iOS Native)',
    vendor: 'Apple Inc.',
    categoryId: 'cat-mobile',
    tipe: 'open-source',
    deskripsi: 'Pengembangan native iOS dengan SwiftUI/UIKit, Combine, dan arsitektur VIPER/MVVM-C untuk performa mobile optimal.',
    websiteUrl: 'https://developer.apple.com/swift/'
  },
  {
    id: 'tech-flutter',
    nama: 'Flutter (Dart)',
    vendor: 'Google',
    categoryId: 'cat-mobile',
    tipe: 'open-source',
    deskripsi: 'Multi-platform UI toolkit untuk merilis aplikasi mobile internal karyawan, agen, dan aplikasi satelit perbankan.',
    websiteUrl: 'https://flutter.dev'
  },
  {
    id: 'tech-react-native',
    nama: 'React Native',
    vendor: 'Meta',
    categoryId: 'cat-mobile',
    tipe: 'open-source',
    deskripsi: 'Cross-platform framework berbasis JavaScript/TypeScript untuk modular micro-frontends pada mobile app.',
    websiteUrl: 'https://reactnative.dev'
  },

  // Back End
  {
    id: 'tech-spring-boot',
    nama: 'Java / Spring Boot',
    vendor: 'Broadcom / VMware (Spring)',
    categoryId: 'cat-back-end',
    tipe: 'open-source',
    deskripsi: 'De facto standard enterprise framework perbankan untuk mission-critical banking microservices dan transaksi finansial.',
    websiteUrl: 'https://spring.io/projects/spring-boot'
  },
  {
    id: 'tech-golang',
    nama: 'Go (Golang)',
    vendor: 'Google',
    categoryId: 'cat-back-end',
    tipe: 'open-source',
    deskripsi: 'Bahasa backend berkemampuan konkurensi tinggi dan latency rendah untuk microservices high-throughput (Payment & Ingestion).',
    websiteUrl: 'https://go.dev'
  },
  {
    id: 'tech-kong-gateway',
    nama: 'Kong Enterprise API Gateway',
    vendor: 'Kong Inc.',
    categoryId: 'cat-back-end',
    tipe: 'komersial',
    deskripsi: 'Cloud-native API gateway berkecepatan tinggi untuk traffic routing, rate limiting, dan autentikasi microservices.',
    websiteUrl: 'https://konghq.com'
  },
  {
    id: 'tech-google-apigee',
    nama: 'Google Cloud Apigee',
    vendor: 'Google Cloud',
    categoryId: 'cat-back-end',
    tipe: 'komersial',
    deskripsi: 'Enterprise API management platform untuk monetisasi, tata kelola, dan standarisasi Open API perbankan.',
    websiteUrl: 'https://cloud.google.com/apigee'
  },

  // Core Banking & Middleware
  {
    id: 'tech-core-temenos',
    nama: 'Temenos Transact (T24)',
    vendor: 'Temenos',
    categoryId: 'cat-core-banking',
    tipe: 'komersial',
    deskripsi: 'Sistem core banking global untuk akun ritel, multi-currency deposits, loans, dan transactional ledger.',
    websiteUrl: 'https://temenos.com'
  },
  {
    id: 'tech-core-bancs',
    nama: 'TCS BaNCS',
    vendor: 'Tata Consultancy Services',
    categoryId: 'cat-core-banking',
    tipe: 'komersial',
    deskripsi: 'Universal core banking solution berkapasitas transaksional masif untuk perbankan skala besar.',
    websiteUrl: 'https://tcs.com/bancs'
  },
  {
    id: 'tech-ibm-mq',
    nama: 'IBM MQ / Integration Bus (ACE)',
    vendor: 'IBM',
    categoryId: 'cat-core-banking',
    tipe: 'komersial',
    deskripsi: 'Enterprise messaging middleware terpercaya untuk integrasi terjamin (once-and-only-once delivery) ke host core banking.',
    websiteUrl: 'https://ibm.com/products/mq'
  },

  // Database
  {
    id: 'tech-postgresql',
    nama: 'PostgreSQL / EnterpriseDB',
    vendor: 'PostgreSQL Org / EDB',
    categoryId: 'cat-database',
    tipe: 'open-source',
    deskripsi: 'RDBMS open-source kelas enterprise dengan fitur ACID kuat, partitioning, dan ekosistem JSON/extensibility luas.',
    websiteUrl: 'https://postgresql.org'
  },
  {
    id: 'tech-oracle-db',
    nama: 'Oracle Exadata Database',
    vendor: 'Oracle Corporation',
    categoryId: 'cat-database',
    tipe: 'komersial',
    deskripsi: 'Sistem basis data terintegrasi performa tinggi untuk core banking ledger dan financial settlement.',
    websiteUrl: 'https://oracle.com'
  },
  {
    id: 'tech-redis',
    nama: 'Redis Enterprise',
    vendor: 'Redis Ltd.',
    categoryId: 'cat-database',
    tipe: 'open-source',
    deskripsi: 'In-memory key-value data store untuk caching sesi pengguna, OTP rate limiting, dan real-time counters.',
    websiteUrl: 'https://redis.io'
  },
  {
    id: 'tech-cassandra',
    nama: 'Apache Cassandra / ScyllaDB',
    vendor: 'Apache / ScyllaDB Inc.',
    categoryId: 'cat-database',
    tipe: 'open-source',
    deskripsi: 'Distributed wide-column NoSQL database dengan ketersediaan tinggi tanpa single-point-of-failure untuk log transaksi besar.',
    websiteUrl: 'https://cassandra.apache.org'
  },

  // Cloud & Infrastruktur
  {
    id: 'tech-redhat-openshift',
    nama: 'Red Hat OpenShift (Kubernetes)',
    vendor: 'Red Hat / IBM',
    categoryId: 'cat-cloud-infra',
    tipe: 'komersial',
    deskripsi: 'Enterprise Kubernetes container platform untuk orkestrasi microservices di lingkungan private data center perbankan.',
    websiteUrl: 'https://redhat.com/openshift'
  },
  {
    id: 'tech-aws-hybrid',
    nama: 'AWS (Amazon Web Services) Hybrid Cloud',
    vendor: 'Amazon Web Services',
    categoryId: 'cat-cloud-infra',
    tipe: 'komersial',
    deskripsi: 'Public cloud region Jakarta untuk beban kerja non-core data, analitik big data, dan ekosistem lifestyle digital app.',
    websiteUrl: 'https://aws.amazon.com'
  },
  {
    id: 'tech-gcp',
    nama: 'Google Cloud Platform (GCP) Jakarta Region',
    vendor: 'Google Cloud',
    categoryId: 'cat-cloud-infra',
    tipe: 'komersial',
    deskripsi: 'Layanan public cloud terlisensi OJK untuk machine learning, data warehouse BigQuery, dan hybrid services.',
    websiteUrl: 'https://cloud.google.com'
  },
  {
    id: 'tech-vmware-tanzu',
    nama: 'VMware vSphere & Tanzu',
    vendor: 'Broadcom / VMware',
    categoryId: 'cat-cloud-infra',
    tipe: 'komersial',
    deskripsi: 'Fondasi virtualisasi compute data center on-premise dan modernisasi aplikasi enterprise.',
    websiteUrl: 'https://vmware.com'
  },

  // DevOps & Observability
  {
    id: 'tech-gitlab-ci',
    nama: 'GitLab CI/CD Enterprise',
    vendor: 'GitLab Inc.',
    categoryId: 'cat-devops',
    tipe: 'komersial',
    deskripsi: 'Platform DevSecOps terpadu dari source code repository, pipeline testing otomatis, hingga scanning kerentanan kode.',
    websiteUrl: 'https://gitlab.com'
  },
  {
    id: 'tech-dynatrace',
    nama: 'Dynatrace APM (Davis AI)',
    vendor: 'Dynatrace Inc.',
    categoryId: 'cat-devops',
    tipe: 'komersial',
    deskripsi: 'Platform observability otomatis dengan AI engine untuk pemantauan end-to-end transaksi nasabah di mobile dan backend.',
    websiteUrl: 'https://dynatrace.com'
  },
  {
    id: 'tech-elastic-stack',
    nama: 'Elasticsearch, Logstash & Kibana (ELK)',
    vendor: 'Elastic N.V.',
    categoryId: 'cat-devops',
    tipe: 'open-source',
    deskripsi: 'Distributed search engine dan visualisasi terpusat untuk log audit, log microservices, dan monitoring operasional.',
    websiteUrl: 'https://elastic.co'
  },
  {
    id: 'tech-prometheus-grafana',
    nama: 'Prometheus & Grafana',
    vendor: 'CNCF / Grafana Labs',
    categoryId: 'cat-devops',
    tipe: 'open-source',
    deskripsi: 'Open-source metric collection dan visualisasi metrik sistem infrastruktur Kubernetes dan servers.',
    websiteUrl: 'https://grafana.com'
  },

  // Security & IAM
  {
    id: 'tech-keycloak',
    nama: 'Keycloak / Red Hat SSO',
    vendor: 'Red Hat / Open Source',
    categoryId: 'cat-security',
    tipe: 'open-source',
    deskripsi: 'Identity and Access Management open source bersertifikasi OIDC/OAuth2 untuk single sign-on karyawan dan portal mitra.',
    websiteUrl: 'https://keycloak.org'
  },
  {
    id: 'tech-hashicorp-vault',
    nama: 'HashiCorp Vault Enterprise',
    vendor: 'HashiCorp (IBM)',
    categoryId: 'cat-security',
    tipe: 'komersial',
    deskripsi: 'Pengelolaan rahasia (secrets management), dynamic database credentials, dan enkripsi transit data sensitif perbankan.',
    websiteUrl: 'https://hashicorp.com/products/vault'
  },
  {
    id: 'tech-f5-waf',
    nama: 'F5 BIG-IP ASM & NGINX App Protect',
    vendor: 'F5 Networks',
    categoryId: 'cat-security',
    tipe: 'komersial',
    deskripsi: 'Web Application Firewall tingkat perbankan untuk proteksi API endpoint dan pencegahan serangan OWASP Top 10.',
    websiteUrl: 'https://f5.com'
  },
  {
    id: 'tech-biometric-ekyc',
    nama: 'AI Biometric Liveness & e-KYC Engine',
    vendor: 'Mitra Bersertifikasi Kominfo / In-House',
    categoryId: 'cat-security',
    tipe: 'komersial',
    deskripsi: 'Sistem verifikasi wajah pasif/aktif dan validasi biometrik KTP real-time untuk pembukaan rekening digital tanpa tatap muka.',
    websiteUrl: 'https://dukcapil.kemendagri.go.id'
  },

  // Payment & Open API
  {
    id: 'tech-bifast-engine',
    nama: 'BI-FAST Connector (ISO 20022 Engine)',
    vendor: 'Bank Indonesia / Vendor Partner',
    categoryId: 'cat-payment-api',
    tipe: 'komersial',
    deskripsi: 'Infrastruktur switching BI-FAST nasional 24/7 berlatensi sub-detik berbasis format standar pesan ISO 20022.',
    websiteUrl: 'https://bi.go.id'
  },
  {
    id: 'tech-snap-portal',
    nama: 'SNAP API Gateway Portal (Standar Nasional Open API)',
    vendor: 'In-House & Partner Solution',
    categoryId: 'cat-payment-api',
    tipe: 'in-house',
    deskripsi: 'Implementasi portal pengembang dan otorisasi kriptografi Asymmetric Key untuk mematuhi regulasi SNAP Bank Indonesia.',
    websiteUrl: 'https://briapi.bri.co.id'
  },
  {
    id: 'tech-qris-engine',
    nama: 'QRIS Merchant Aggregator & Switching',
    vendor: 'In-House Switching & Alto/Rintis',
    categoryId: 'cat-payment-api',
    tipe: 'in-house',
    deskripsi: 'Engine pemrosesan QRIS dinamis dan statis berkapasitas jutaan merchant UMKM terintegrasi settlement harian.',
    websiteUrl: 'https://aspi-indonesia.or.id'
  }
];

export const INITIAL_INTERVIEWS: Interview[] = [
  {
    id: 'int-bri-01',
    bankId: 'bank-bri',
    kodeNarasumber: 'Narasumber EA-01 (Anonim)',
    divisi: 'Divisi Enterprise Architecture & IT Strategy',
    tanggal: '2026-09-12',
    ringkasan: 'Mengonfirmasi adopsi penuh Confluent Kafka untuk data pipeline BRISPOT & BRImo. Platform container berbasis Red Hat OpenShift di data center on-premise tier-4, dengan implementasi Cassandra untuk log histori transaksi mikro.',
    persetujuanNarasumber: true
  },
  {
    id: 'int-bri-02',
    bankId: 'bank-bri',
    kodeNarasumber: 'Narasumber MB-02 (Anonim)',
    divisi: 'Divisi Digital Banking Development (Mobile Core)',
    tanggal: '2026-09-18',
    ringkasan: 'Menjelaskan arsitektur BRImo versi 2.x ke atas yang berpindah ke 100% Kotlin Clean Architecture di Android dan Swift VIPER di iOS. Menegaskan tidak menggunakan hybrid/Flutter di core BRImo demi reliabilitas enkripsi lokal.',
    persetujuanNarasumber: true
  },
  {
    id: 'int-mandiri-01',
    bankId: 'bank-mandiri',
    kodeNarasumber: 'Narasumber MDR-01 (Anonim)',
    divisi: 'Divisi Core Infrastructure & Cloud Engineering',
    tanggal: '2026-09-15',
    ringkasan: 'Memvalidasi penggunaan hybrid cloud dengan AWS Jakarta region untuk ekosistem Livin\' Sukha (lifestyle marketplace) sementara data ledger tetap di on-premise Exadata. Menggunakan HashiCorp Vault untuk seluruh credential rotation.',
    persetujuanNarasumber: true
  },
  {
    id: 'int-mandiri-02',
    bankId: 'bank-mandiri',
    kodeNarasumber: 'Narasumber MDR-02 (Anonim)',
    divisi: 'Divisi Application Architecture Wholesale & Retail',
    tanggal: '2026-09-22',
    ringkasan: 'Menyatakan Livin\' didesain dengan microservices Go dan Java Spring Boot, dipadukan Redis cluster bertaraf multi-node untuk caching session jutaan user aktif bersamaan pada jam sibuk gajian.',
    persetujuanNarasumber: true
  },
  {
    id: 'int-bni-01',
    bankId: 'bank-bni',
    kodeNarasumber: 'Narasumber BNI-01 (Anonim)',
    divisi: 'Divisi Information Technology - wondr Squad',
    tanggal: '2026-09-25',
    ringkasan: 'Menyampaikan peluncuran super app wondr by BNI didukung modernisasi stack: event-driven architecture dengan Kafka dan containerisasi OpenShift. Pemantauan performa real-time dimonitor secara ketat menggunakan Dynatrace.',
    persetujuanNarasumber: true
  },
  {
    id: 'int-btn-01',
    bankId: 'bank-btn',
    kodeNarasumber: 'Narasumber BTN-01 (Anonim)',
    divisi: 'Divisi IT Modernization & Architecture',
    tanggal: '2026-09-28',
    ringkasan: 'BTN sedang merampungkan modernisasi dari monolitik lama ke microservices berbasis Spring Boot dan OpenShift dalam rangka peluncuran platform digital bale by BTN dan ekosistem portal KPR terpadu.',
    persetujuanNarasumber: true
  },
  {
    id: 'int-bsi-01',
    bankId: 'bank-bsi',
    kodeNarasumber: 'Narasumber BSI-01 (Anonim)',
    divisi: 'Divisi IT Operations & Security Posture',
    tanggal: '2026-10-02',
    ringkasan: 'Pasca-integrasi merger tiga bank syariah, BSI memfokuskan investasi besar pada penguatan perimeter keamanan (F5 WAF, Palo Alto, HashiCorp Vault) dan standardisasi stack backend pada Java Spring Boot dan PostgreSQL enterprise.',
    persetujuanNarasumber: true
  }
];

export const INITIAL_EVIDENCES: Evidence[] = [
  // BRI Evidences
  {
    id: 'ev-bri-kafka-1',
    findingId: 'f-bri-kafka',
    tipeSumber: 'publik',
    judul: 'Confluent Case Study: Scaling BRI Financial Inclusion via Real-time Kafka',
    url: 'https://www.confluent.io/customers/bank-bri/',
    tanggalAkses: '2026-09-10',
    kutipanRingkas: '"Bank BRI utilizes Confluent Platform to process over 25,000 TPS across AgenBRILink and mobile banking with 99.99% availability."',
    pencatat: 'Rinaldi (Lead Tech Analyst)'
  },
  {
    id: 'ev-bri-kafka-2',
    findingId: 'f-bri-kafka',
    tipeSumber: 'wawancara',
    judul: 'Wawancara Konfirmasi Arsitektur Event Streaming',
    interviewId: 'int-bri-01',
    tanggalAkses: '2026-09-12',
    kutipanRingkas: 'Narasumber EA-01 mengonfirmasi bahwa Confluent Kafka menjadi tulang punggung streaming transaksi dan deteksi fraud.',
    pencatat: 'Rinaldi (Lead Tech Analyst)'
  },
  {
    id: 'ev-bri-openshift-1',
    findingId: 'f-bri-openshift',
    tipeSumber: 'publik',
    judul: 'Red Hat Innovation Award Presentation: BRI Hybrid Microservices Platform',
    url: 'https://www.redhat.com/en/success-stories/bank-bri',
    tanggalAkses: '2026-08-20',
    kutipanRingkas: '"BRI migrated more than 200 microservices into Red Hat OpenShift on-premises cluster to speed up release cycle from months to days."',
    pencatat: 'Siti (Data Analyst)'
  },
  {
    id: 'ev-bri-kotlin-1',
    findingId: 'f-bri-kotlin',
    tipeSumber: 'publik',
    judul: 'Lowongan Kerja Resmi BRI: Lead Android Engineer (Kotlin Clean Architecture)',
    url: 'https://e-recruitment.bri.co.id/job/lead-android',
    tanggalAkses: '2026-09-01',
    kutipanRingkas: 'Kualifikasi wajib menguasai 100% Kotlin Coroutines, Flow, Jetpack Compose, Dagger Hilt, dan modular clean architecture untuk BRImo.',
    pencatat: 'Siti (Data Analyst)'
  },
  {
    id: 'ev-bri-kotlin-2',
    findingId: 'f-bri-kotlin',
    tipeSumber: 'wawancara',
    judul: 'Wawancara Arsitektur Mobile BRImo',
    interviewId: 'int-bri-02',
    tanggalAkses: '2026-09-18',
    kutipanRingkas: 'Narasumber MB-02 menegaskan tidak ada adopsi framework hybrid pada super-app BRImo demi performa dan enkripsi hardware.',
    pencatat: 'Rinaldi (Lead Tech Analyst)'
  },
  {
    id: 'ev-bri-cassandra-1',
    findingId: 'f-bri-cassandra',
    tipeSumber: 'publik',
    judul: 'Tech Talk Engineering BRI: Arsitektur Big Data untuk Triliunan Mutasi Rekening',
    url: 'https://youtube.com/watch?v=bri-engineering-talk-bigdata',
    tanggalAkses: '2026-07-15',
    kutipanRingkas: 'Pemateri arsitek data BRI mendemonstrasikan cluster Apache Cassandra 40+ nodes untuk penyimpanan mutasi historis rekening.',
    pencatat: 'Budi (Consultant Analyst)'
  },

  // Mandiri Evidences
  {
    id: 'ev-mdr-aws-1',
    findingId: 'f-mdr-aws',
    tipeSumber: 'publik',
    judul: 'AWS Summit Jakarta Keynote: Bank Mandiri Cloud Transformation with AWS',
    url: 'https://aws.amazon.com/solutions/case-studies/bank-mandiri/',
    tanggalAkses: '2026-08-14',
    kutipanRingkas: '"Bank Mandiri leverages AWS Cloud services in Jakarta Region to power its digital lifestyle platform Livin\' Sukha."',
    pencatat: 'Rinaldi (Lead Tech Analyst)'
  },
  {
    id: 'ev-mdr-aws-2',
    findingId: 'f-mdr-aws',
    tipeSumber: 'wawancara',
    judul: 'Wawancara Cloud Platform Mandiri',
    interviewId: 'int-mandiri-01',
    tanggalAkses: '2026-09-15',
    kutipanRingkas: 'Narasumber MDR-01 memverifikasi hybrid setup antara AWS Jakarta untuk lifestyle dan on-premise Exadata untuk core banking.',
    pencatat: 'Rinaldi (Lead Tech Analyst)'
  },
  {
    id: 'ev-mdr-redis-1',
    findingId: 'f-mdr-redis',
    tipeSumber: 'wawancara',
    judul: 'Wawancara Caching In-Memory Livin\'',
    interviewId: 'int-mandiri-02',
    tanggalAkses: '2026-09-22',
    kutipanRingkas: 'Narasumber MDR-02 menjelaskan Redis cluster tier-1 digunakan untuk menampung token sesi dan throttling jutaan user.',
    pencatat: 'Siti (Data Analyst)'
  },
  {
    id: 'ev-mdr-golang-1',
    findingId: 'f-mdr-golang',
    tipeSumber: 'publik',
    judul: 'Job Posting LinkedIn: Senior Backend Engineer (Go/Golang) - Livin\' Squad',
    url: 'https://linkedin.com/jobs/view/mandiri-backend-golang',
    tanggalAkses: '2026-09-05',
    kutipanRingkas: 'Requirements: 4+ years of Go/Golang microservices, gRPC, Docker, Kubernetes, and high-concurrency payment APIs.',
    pencatat: 'Budi (Consultant Analyst)'
  },
  {
    id: 'ev-mdr-datastage-1',
    findingId: 'f-mdr-ibm-datastage',
    tipeSumber: 'publik',
    judul: 'Arsitektur Enterprise Data Warehouse (EDW) & Data Integration Bank Mandiri',
    url: 'https://www.ibm.com/case-studies/',
    tanggalAkses: '2026-10-13',
    kutipanRingkas: 'Bank Mandiri mengandalkan IBM InfoSphere DataStage sebagai engine ETL utama dalam orkestrasi pemrosesan batch data transaksi harian, mengintegrasikan data dari core database ke data mart Business Intelligence dan pelaporan kepatuhan risiko Basel.',
    pencatat: 'Rinaldi (Lead Admin)'
  },
  {
    id: 'ev-mdr-datastage-2',
    findingId: 'f-mdr-ibm-datastage',
    tipeSumber: 'publik',
    judul: 'Kualifikasi Data Engineering & ETL Developer Bank Mandiri (LinkedIn Jobs)',
    url: 'https://www.linkedin.com/jobs/',
    tanggalAkses: '2026-10-13',
    kutipanRingkas: 'Spesifikasi teknis Data Engineering Bank Mandiri mensyaratkan keahlian rancang bangun pipeline IBM DataStage v11.5+, optimasi query ETL skala enterprise, serta integrasi data perbankan untuk kepatuhan regulasi OJK.',
    pencatat: 'Siti Rahmawati (Tech Analyst)'
  },

  // BNI Evidences
  {
    id: 'ev-bni-dynatrace-1',
    findingId: 'f-bni-dynatrace',
    tipeSumber: 'publik',
    judul: 'Dynatrace Perform: BNI Customer Experience Assurance for wondr',
    url: 'https://www.dynatrace.com/news/customer-story-bni',
    tanggalAkses: '2026-09-11',
    kutipanRingkas: '"BNI deploys Dynatrace Davis AI to monitor end-to-end user journeys on their new wondr mobile banking app."',
    pencatat: 'Siti (Data Analyst)'
  },
  {
    id: 'ev-bni-dynatrace-2',
    findingId: 'f-bni-dynatrace',
    tipeSumber: 'wawancara',
    judul: 'Wawancara Monitoring wondr Squad',
    interviewId: 'int-bni-01',
    tanggalAkses: '2026-09-25',
    kutipanRingkas: 'Narasumber BNI-01 membenarkan bahwa APM Dynatrace dipasang di setiap container microservices untuk zero-blindspot monitoring.',
    pencatat: 'Rinaldi (Lead Tech Analyst)'
  },

  // BTN Evidences
  {
    id: 'ev-btn-spring-1',
    findingId: 'f-btn-spring',
    tipeSumber: 'wawancara',
    judul: 'Wawancara Modernisasi Microservices BTN',
    interviewId: 'int-btn-01',
    tanggalAkses: '2026-09-28',
    kutipanRingkas: 'Narasumber BTN-01 menyebutkan Java Spring Boot menjadi fondasi utama seluruh service baru bale by BTN dan portal KPR.',
    pencatat: 'Budi (Consultant Analyst)'
  },
  {
    id: 'ev-btn-openshift-1',
    findingId: 'f-btn-openshift',
    tipeSumber: 'publik',
    judul: 'Siaran Pers Resmi: Kerjasama BTN dan Red Hat Modernisasi Data Center',
    url: 'https://btn.co.id/news/btn-redhat-container',
    tanggalAkses: '2026-06-19',
    kutipanRingkas: 'Bank BTN mengumumkan adopsi platform Red Hat OpenShift untuk menunjang akselerasi perilisan aplikasi digital banking.',
    pencatat: 'Siti (Data Analyst)'
  },

  // BSI Evidences
  {
    id: 'ev-bsi-vault-1',
    findingId: 'f-bsi-vault',
    tipeSumber: 'wawancara',
    judul: 'Wawancara Postur Keamanan BSI Pasca-Merger',
    interviewId: 'int-bsi-01',
    tanggalAkses: '2026-10-02',
    kutipanRingkas: 'Narasumber BSI-01 mengonfirmasi penggelaran HashiCorp Vault untuk enkripsi zero-trust dan manajemen kunci terpusat.',
    pencatat: 'Rinaldi (Lead Tech Analyst)'
  },
  {
    id: 'ev-bsi-postgresql-1',
    findingId: 'f-bsi-postgresql',
    tipeSumber: 'publik',
    judul: 'Pengadaan Resmi BSI: Lisensi dan Support EnterpriseDB PostgreSQL Database',
    url: 'https://eproc.bankbsi.co.id/tender/detail-postgresql-edb',
    tanggalAkses: '2026-07-30',
    kutipanRingkas: 'Dokumen pengadaan resmi BSI untuk subscription EDB Postgres Enterprise cluster high-availability.',
    pencatat: 'Budi (Consultant Analyst)'
  }
];

export const INITIAL_FINDINGS: Finding[] = [
  // --- BRI FINDINGS ---
  {
    id: 'f-bri-kafka',
    bankId: 'bank-bri',
    technologyId: 'tech-confluent-kafka',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2024-03-15',
    tanggalVerifikasi: '2026-09-12',
    catatan: 'Tulang punggung streaming transaksi AgenBRILink, deteksi fraud Sabrina, dan mutasi saldo real-time.',
    evidenceIds: ['ev-bri-kafka-1', 'ev-bri-kafka-2']
  },
  {
    id: 'f-bri-spark',
    bankId: 'bank-bri',
    technologyId: 'tech-spark',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2023-11-10',
    tanggalVerifikasi: '2026-08-15',
    catatan: 'Digunakan untuk batch processing scoring credit mikro BRISPOT dan pipeline data warehouse harian.',
    evidenceIds: []
  },
  {
    id: 'f-bri-minio',
    bankId: 'bank-bri',
    technologyId: 'tech-minio',
    confidence: 'Likely',
    statusReview: 'Published',
    tanggalTerdeteksi: '2025-01-20',
    tanggalVerifikasi: '2026-09-12',
    catatan: 'Object store S3-compatible untuk penyimpanan arsip dokumen digital nasabah KPR dan mikro on-premise.',
    evidenceIds: []
  },
  {
    id: 'f-bri-cloudera',
    bankId: 'bank-bri',
    technologyId: 'tech-cloudera',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2023-05-10',
    tanggalVerifikasi: '2026-07-15',
    catatan: 'Enterprise data platform untuk cluster analitik Hadoop dan enterprise DWH.',
    evidenceIds: []
  },
  {
    id: 'f-bri-kubeflow',
    bankId: 'bank-bri',
    technologyId: 'tech-kubeflow',
    confidence: 'Likely',
    statusReview: 'Published',
    tanggalTerdeteksi: '2025-04-12',
    tanggalVerifikasi: '2026-09-12',
    catatan: 'Digunakan oleh tim AI & Big Data BRI untuk pipeline pelatihan model propensity dan fraud scoring.',
    evidenceIds: []
  },
  {
    id: 'f-bri-genai',
    bankId: 'bank-bri',
    technologyId: 'tech-genai-sabrina',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2023-08-01',
    tanggalVerifikasi: '2026-09-10',
    catatan: 'Sabrina Virtual Assistant berbasis GenAI & NLP cerdas untuk interaksi layanan nasabah 24/7.',
    evidenceIds: []
  },
  {
    id: 'f-bri-react',
    bankId: 'bank-bri',
    technologyId: 'tech-react',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2024-01-10',
    tanggalVerifikasi: '2026-08-15',
    catatan: 'Web portal BRImo web, Pasar.id, dan portal onboarding digital nasabah.',
    evidenceIds: []
  },
  {
    id: 'f-bri-kotlin',
    bankId: 'bank-bri',
    technologyId: 'tech-kotlin-android',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2023-01-15',
    tanggalVerifikasi: '2026-09-18',
    catatan: 'Super-app BRImo Android murni berbasis Kotlin Clean Architecture dengan proteksi hardware Keystore.',
    evidenceIds: ['ev-bri-kotlin-1', 'ev-bri-kotlin-2']
  },
  {
    id: 'f-bri-swift',
    bankId: 'bank-bri',
    technologyId: 'tech-swift-ios',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2023-01-15',
    tanggalVerifikasi: '2026-09-18',
    catatan: 'BRImo iOS dibangun 100% dengan Swift VIPER / Clean Architecture.',
    evidenceIds: []
  },
  {
    id: 'f-bri-flutter',
    bankId: 'bank-bri',
    technologyId: 'tech-flutter',
    confidence: 'Likely',
    statusReview: 'Published',
    tanggalTerdeteksi: '2024-06-20',
    tanggalVerifikasi: '2026-08-01',
    catatan: 'Digunakan untuk aplikasi satelit non-core (seperti aplikasi pendukung event internal karyawan).',
    evidenceIds: []
  },
  {
    id: 'f-bri-spring',
    bankId: 'bank-bri',
    technologyId: 'tech-spring-boot',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2022-01-01',
    tanggalVerifikasi: '2026-09-12',
    catatan: 'Standar de facto microservices backend BRI untuk ratusan layanan transaksi perbankan.',
    evidenceIds: []
  },
  {
    id: 'f-bri-golang',
    bankId: 'bank-bri',
    technologyId: 'tech-golang',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2023-07-15',
    tanggalVerifikasi: '2026-09-12',
    catatan: 'Layanan high-throughput microservices untuk push notification, streaming feeds, dan payment gateway.',
    evidenceIds: []
  },
  {
    id: 'f-bri-kong',
    bankId: 'bank-bri',
    technologyId: 'tech-kong-gateway',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2023-09-01',
    tanggalVerifikasi: '2026-08-20',
    catatan: 'Internal and external API gateway routing jutaan transaksi harian dengan plugin security custom.',
    evidenceIds: []
  },
  {
    id: 'f-bri-apigee',
    bankId: 'bank-bri',
    technologyId: 'tech-google-apigee',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2022-05-10',
    tanggalVerifikasi: '2026-09-10',
    catatan: 'Platform BRIAPI SNAP Open Banking yang menghubungkan 1.000+ partner korporasi dan fintech.',
    evidenceIds: []
  },
  {
    id: 'f-bri-openshift',
    bankId: 'bank-bri',
    technologyId: 'tech-redhat-openshift',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2023-04-10',
    tanggalVerifikasi: '2026-08-20',
    catatan: 'Private container platform utama perbankan BRI dengan ratusan nodes tersebar di multi data center.',
    evidenceIds: ['ev-bri-openshift-1']
  },
  {
    id: 'f-bri-postgresql',
    bankId: 'bank-bri',
    technologyId: 'tech-postgresql',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2023-01-10',
    tanggalVerifikasi: '2026-09-12',
    catatan: 'Database transaksional utama untuk microservices modern dan sistem pelaporan mikro.',
    evidenceIds: []
  },
  {
    id: 'f-bri-cassandra',
    bankId: 'bank-bri',
    technologyId: 'tech-cassandra',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2024-02-15',
    tanggalVerifikasi: '2026-09-12',
    catatan: 'Penyimpanan terdistribusi data histori mutasi rekening nasabah skala masif (miliaran transaksi).',
    evidenceIds: ['ev-bri-cassandra-1']
  },
  {
    id: 'f-bri-redis',
    bankId: 'bank-bri',
    technologyId: 'tech-redis',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2023-03-01',
    tanggalVerifikasi: '2026-09-12',
    catatan: 'In-memory caching untuk session token BRImo dan rate limiting perlindungan brute-force.',
    evidenceIds: []
  },
  {
    id: 'f-bri-gitlab',
    bankId: 'bank-bri',
    technologyId: 'tech-gitlab-ci',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2023-06-01',
    tanggalVerifikasi: '2026-08-15',
    catatan: 'CI/CD pipeline otomatis dengan static application security testing (SAST) terintegrasi.',
    evidenceIds: []
  },
  {
    id: 'f-bri-dynatrace',
    bankId: 'bank-bri',
    technologyId: 'tech-dynatrace',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2023-08-20',
    tanggalVerifikasi: '2026-09-12',
    catatan: 'Pemantauan Application Performance Monitoring (APM) menyeluruh dari frontend app hingga backend.',
    evidenceIds: []
  },
  {
    id: 'f-bri-elastic',
    bankId: 'bank-bri',
    technologyId: 'tech-elastic-stack',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2022-10-15',
    tanggalVerifikasi: '2026-08-10',
    catatan: 'Log centralization untuk ribuan service microservices dan deteksi anomali operasional.',
    evidenceIds: []
  },
  {
    id: 'f-bri-keycloak',
    bankId: 'bank-bri',
    technologyId: 'tech-keycloak',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2024-01-15',
    tanggalVerifikasi: '2026-09-12',
    catatan: 'Single Sign-On (SSO) dan Identity Provider untuk aplikasi internal dan portal operasional cabang.',
    evidenceIds: []
  },
  {
    id: 'f-bri-bifast',
    bankId: 'bank-bri',
    technologyId: 'tech-bifast-engine',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2022-01-01',
    tanggalVerifikasi: '2026-09-10',
    catatan: 'Direct switching BI-FAST 24/7 dengan volume transaksi tertinggi di jaringan Himbara.',
    evidenceIds: []
  },
  {
    id: 'f-bri-snap',
    bankId: 'bank-bri',
    technologyId: 'tech-snap-portal',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2022-06-01',
    tanggalVerifikasi: '2026-09-10',
    catatan: 'Implementasi SNAP Bank Indonesia melalui ekosistem BRIAPI.',
    evidenceIds: []
  },
  {
    id: 'f-bri-qris',
    bankId: 'bank-bri',
    technologyId: 'tech-qris-engine',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2021-08-17',
    tanggalVerifikasi: '2026-09-10',
    catatan: 'Mesin QRIS merchant terlengkap menjangkau jutaan merchant mikro di seluruh pelosok nusantara.',
    evidenceIds: []
  },

  // --- MANDIRI FINDINGS ---
  {
    id: 'f-mdr-kafka',
    bankId: 'bank-mandiri',
    technologyId: 'tech-confluent-kafka',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2023-04-10',
    tanggalVerifikasi: '2026-09-15',
    catatan: 'Event backbone untuk transaksi Livin\' dan integrasi ekosistem wholesale Kopra.',
    evidenceIds: []
  },
  {
    id: 'f-mdr-cloudera',
    bankId: 'bank-mandiri',
    technologyId: 'tech-cloudera',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2022-09-01',
    tanggalVerifikasi: '2026-08-10',
    catatan: 'Big data warehouse dan data mart on-premise Mandiri.',
    evidenceIds: []
  },
  {
    id: 'f-mdr-dataiku',
    bankId: 'bank-mandiri',
    technologyId: 'tech-dataiku',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2024-03-20',
    tanggalVerifikasi: '2026-09-15',
    catatan: 'Platform collaborative data science untuk analytics squad di Mandiri Digital.',
    evidenceIds: []
  },
  {
    id: 'f-mdr-ibm-datastage',
    bankId: 'bank-mandiri',
    technologyId: 'tech-ibm-datastage',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2024-03-10',
    tanggalVerifikasi: '2026-10-13',
    catatan: 'Digunakan oleh Enterprise Data Warehouse (EDW) Bank Mandiri untuk orkestrasi pipeline ETL harian dan bulanan berskala petabyte, ekstraksi data transaksi core banking ke data mart analitik bisnis, serta pelaporan kepatuhan regulasi perbankan (Basel II/III & BI/OJK).',
    evidenceIds: ['ev-mdr-datastage-1', 'ev-mdr-datastage-2']
  },
  {
    id: 'f-mdr-fico',
    bankId: 'bank-mandiri',
    technologyId: 'tech-fico-scoring',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2023-02-15',
    tanggalVerifikasi: '2026-08-20',
    catatan: 'FICO Falcon fraud prevention dan scoring approval pinjaman konsumer kartu kredit & payroll.',
    evidenceIds: []
  },
  {
    id: 'f-mdr-react',
    bankId: 'bank-mandiri',
    technologyId: 'tech-react',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2023-06-01',
    tanggalVerifikasi: '2026-09-01',
    catatan: 'Frontend portal Kopra Cash Management dan onboarding nasabah korporat.',
    evidenceIds: []
  },
  {
    id: 'f-mdr-kotlin',
    bankId: 'bank-mandiri',
    technologyId: 'tech-kotlin-android',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2023-01-10',
    tanggalVerifikasi: '2026-09-15',
    catatan: 'Aplikasi Livin\' by Mandiri Android native dengan proteksi runtime RASP terpasang.',
    evidenceIds: []
  },
  {
    id: 'f-mdr-swift',
    bankId: 'bank-mandiri',
    technologyId: 'tech-swift-ios',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2023-01-10',
    tanggalVerifikasi: '2026-09-15',
    catatan: 'Aplikasi Livin\' iOS Native dengan optimasi biometrik Face ID.',
    evidenceIds: []
  },
  {
    id: 'f-mdr-spring',
    bankId: 'bank-mandiri',
    technologyId: 'tech-spring-boot',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2022-01-01',
    tanggalVerifikasi: '2026-09-15',
    catatan: 'Core microservices backend untuk pemrosesan perbankan konsumer dan interkoneksi core.',
    evidenceIds: []
  },
  {
    id: 'f-mdr-golang',
    bankId: 'bank-mandiri',
    technologyId: 'tech-golang',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2024-02-01',
    tanggalVerifikasi: '2026-09-22',
    catatan: 'Go microservices untuk modul performa tinggi Livin\' Sukha dan API payment.',
    evidenceIds: ['ev-mdr-golang-1']
  },
  {
    id: 'f-mdr-kong',
    bankId: 'bank-mandiri',
    technologyId: 'tech-kong-gateway',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2023-08-01',
    tanggalVerifikasi: '2026-09-15',
    catatan: 'Gateway microservices Livin\' untuk traffic throttling dan autentikasi token.',
    evidenceIds: []
  },
  {
    id: 'f-mdr-openshift',
    bankId: 'bank-mandiri',
    technologyId: 'tech-redhat-openshift',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2023-03-01',
    tanggalVerifikasi: '2026-09-15',
    catatan: 'Container platform utama di lingkungan on-premise data center Mandiri.',
    evidenceIds: []
  },
  {
    id: 'f-mdr-aws',
    bankId: 'bank-mandiri',
    technologyId: 'tech-aws-hybrid',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2024-01-10',
    tanggalVerifikasi: '2026-09-15',
    catatan: 'Hybrid cloud deployment di AWS Jakarta region untuk ekosistem Livin\' Sukha (lifestyle).',
    evidenceIds: ['ev-mdr-aws-1', 'ev-mdr-aws-2']
  },
  {
    id: 'f-mdr-redis',
    bankId: 'bank-mandiri',
    technologyId: 'tech-redis',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2023-05-10',
    tanggalVerifikasi: '2026-09-22',
    catatan: 'High-availability Redis cluster untuk session token dan caching saldo real-time.',
    evidenceIds: ['ev-mdr-redis-1']
  },
  {
    id: 'f-mdr-oracle-db',
    bankId: 'bank-mandiri',
    technologyId: 'tech-oracle-db',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2021-01-01',
    tanggalVerifikasi: '2026-09-15',
    catatan: 'Oracle Exadata Database berkinerja tinggi sebagai backbone core banking dan settlement.',
    evidenceIds: []
  },
  {
    id: 'f-mdr-vault',
    bankId: 'bank-mandiri',
    technologyId: 'tech-hashicorp-vault',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2024-05-01',
    tanggalVerifikasi: '2026-09-15',
    catatan: 'Secrets management dan automated certificate issuance zero-trust security.',
    evidenceIds: []
  },
  {
    id: 'f-mdr-bifast',
    bankId: 'bank-mandiri',
    technologyId: 'tech-bifast-engine',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2022-01-01',
    tanggalVerifikasi: '2026-09-10',
    catatan: 'Konektor BI-FAST dengan volume transfer retail tertinggi kedua di Indonesia.',
    evidenceIds: []
  },
  {
    id: 'f-mdr-snap',
    bankId: 'bank-mandiri',
    technologyId: 'tech-snap-portal',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2022-06-01',
    tanggalVerifikasi: '2026-09-10',
    catatan: 'Mandiri API portal berstandar SNAP untuk transaksi wholesale dan merchant agregator.',
    evidenceIds: []
  },

  // --- BNI FINDINGS ---
  {
    id: 'f-bni-kafka',
    bankId: 'bank-bni',
    technologyId: 'tech-confluent-kafka',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2023-08-01',
    tanggalVerifikasi: '2026-09-25',
    catatan: 'Backbone event streaming untuk aplikasi super app wondr by BNI.',
    evidenceIds: []
  },
  {
    id: 'f-bni-openshift',
    bankId: 'bank-bni',
    technologyId: 'tech-redhat-openshift',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2023-06-15',
    tanggalVerifikasi: '2026-09-25',
    catatan: 'Platform orkestrasi container on-premise untuk arsitektur microservices wondr.',
    evidenceIds: []
  },
  {
    id: 'f-bni-dynatrace',
    bankId: 'bank-bni',
    technologyId: 'tech-dynatrace',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2024-04-10',
    tanggalVerifikasi: '2026-09-25',
    catatan: 'Pemantauan APM end-to-end user experience pada peluncuran wondr mobile banking.',
    evidenceIds: ['ev-bni-dynatrace-1', 'ev-bni-dynatrace-2']
  },
  {
    id: 'f-bni-spring',
    bankId: 'bank-bni',
    technologyId: 'tech-spring-boot',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2022-03-01',
    tanggalVerifikasi: '2026-09-25',
    catatan: 'Backend Java microservices utama untuk bisnis perbankan retail & korporat.',
    evidenceIds: []
  },
  {
    id: 'f-bni-kotlin',
    bankId: 'bank-bni',
    technologyId: 'tech-kotlin-android',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2024-05-01',
    tanggalVerifikasi: '2026-09-25',
    catatan: 'Aplikasi wondr Android native dengan desain UI modern 3-insights.',
    evidenceIds: []
  },
  {
    id: 'f-bni-swift',
    bankId: 'bank-bni',
    technologyId: 'tech-swift-ios',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2024-05-01',
    tanggalVerifikasi: '2026-09-25',
    catatan: 'Aplikasi wondr iOS native dengan animasi responsif dan arsitektur modular.',
    evidenceIds: []
  },
  {
    id: 'f-bni-postgresql',
    bankId: 'bank-bni',
    technologyId: 'tech-postgresql',
    confidence: 'Likely',
    statusReview: 'Published',
    tanggalTerdeteksi: '2024-01-15',
    tanggalVerifikasi: '2026-09-25',
    catatan: 'Database transaksional pada layer microservices baru wondr.',
    evidenceIds: []
  },
  {
    id: 'f-bni-oracle-db',
    bankId: 'bank-bni',
    technologyId: 'tech-oracle-db',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2021-01-01',
    tanggalVerifikasi: '2026-09-25',
    catatan: 'Oracle Exadata untuk core banking host settlement transaksi buku besar.',
    evidenceIds: []
  },
  {
    id: 'f-bni-bifast',
    bankId: 'bank-bni',
    technologyId: 'tech-bifast-engine',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2022-01-01',
    tanggalVerifikasi: '2026-09-10',
    catatan: 'Integrasi BI-FAST untuk kanal wondr, BNI Direct, dan ATM.',
    evidenceIds: []
  },
  {
    id: 'f-bni-snap',
    bankId: 'bank-bni',
    technologyId: 'tech-snap-portal',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2022-06-01',
    tanggalVerifikasi: '2026-09-10',
    catatan: 'Portal BNI API SNAP untuk konektivitas mitra fintech dan e-commerce.',
    evidenceIds: []
  },

  // --- BTN FINDINGS ---
  {
    id: 'f-btn-openshift',
    bankId: 'bank-btn',
    technologyId: 'tech-redhat-openshift',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2024-06-19',
    tanggalVerifikasi: '2026-09-28',
    catatan: 'Platform containerisasi modernisasi data center dan ekosistem bale by BTN.',
    evidenceIds: ['ev-btn-openshift-1']
  },
  {
    id: 'f-btn-spring',
    bankId: 'bank-btn',
    technologyId: 'tech-spring-boot',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2023-01-01',
    tanggalVerifikasi: '2026-09-28',
    catatan: 'Fondasi modernisasi arsitektur microservices BTN memecah monolitik lama.',
    evidenceIds: ['ev-btn-spring-1']
  },
  {
    id: 'f-btn-angular',
    bankId: 'bank-btn',
    technologyId: 'tech-angular',
    confidence: 'Likely',
    statusReview: 'Published',
    tanggalTerdeteksi: '2023-04-10',
    tanggalVerifikasi: '2026-09-28',
    catatan: 'Frontend framework portal internal loan origination dan verifikasi berkas KPR BTN.',
    evidenceIds: []
  },
  {
    id: 'f-btn-oracle-db',
    bankId: 'bank-btn',
    technologyId: 'tech-oracle-db',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2022-01-01',
    tanggalVerifikasi: '2026-09-28',
    catatan: 'Database utama core banking untuk pinjaman KPR jangka panjang.',
    evidenceIds: []
  },
  {
    id: 'f-btn-bifast',
    bankId: 'bank-btn',
    technologyId: 'tech-bifast-engine',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2022-01-01',
    tanggalVerifikasi: '2026-09-10',
    catatan: 'Koneksi BI-FAST pada aplikasi BTN Mobile dan bale.',
    evidenceIds: []
  },
  {
    id: 'f-btn-snap',
    bankId: 'bank-btn',
    technologyId: 'tech-snap-portal',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2023-02-01',
    tanggalVerifikasi: '2026-09-10',
    catatan: 'Open API SNAP BTN untuk integrasi developer perumahan dan agen properti.',
    evidenceIds: []
  },

  // --- BSI FINDINGS ---
  {
    id: 'f-bsi-openshift',
    bankId: 'bank-bsi',
    technologyId: 'tech-redhat-openshift',
    confidence: 'Likely',
    statusReview: 'Published',
    tanggalTerdeteksi: '2024-02-01',
    tanggalVerifikasi: '2026-10-02',
    catatan: 'Adopsi Kubernetes Red Hat OpenShift pasca-merger untuk standarisasi microservices.',
    evidenceIds: []
  },
  {
    id: 'f-bsi-vault',
    bankId: 'bank-bsi',
    technologyId: 'tech-hashicorp-vault',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2024-04-15',
    tanggalVerifikasi: '2026-10-02',
    catatan: 'Implementasi manajemen secrets terpusat dan perlindungan kunci kriptografi zero-trust.',
    evidenceIds: ['ev-bsi-vault-1']
  },
  {
    id: 'f-bsi-postgresql',
    bankId: 'bank-bsi',
    technologyId: 'tech-postgresql',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2024-07-30',
    tanggalVerifikasi: '2026-10-02',
    catatan: 'Penggunaan EnterpriseDB PostgreSQL sebagai database tier utama layanan digital BYOND.',
    evidenceIds: ['ev-bsi-postgresql-1']
  },
  {
    id: 'f-bsi-spring',
    bankId: 'bank-bsi',
    technologyId: 'tech-spring-boot',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2023-01-01',
    tanggalVerifikasi: '2026-10-02',
    catatan: 'Bahasa backend Java Spring Boot untuk microservices syariah compliant.',
    evidenceIds: []
  },
  {
    id: 'f-bsi-bifast',
    bankId: 'bank-bsi',
    technologyId: 'tech-bifast-engine',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2022-01-01',
    tanggalVerifikasi: '2026-09-10',
    catatan: 'Koneksi BI-FAST syariah pada BSI Mobile dan kanal BYOND by BSI.',
    evidenceIds: []
  },
  {
    id: 'f-bsi-snap',
    bankId: 'bank-bsi',
    technologyId: 'tech-snap-portal',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2023-03-01',
    tanggalVerifikasi: '2026-09-10',
    catatan: 'Penerapan standar SNAP Bank Indonesia untuk ekosistem ZISWAF dan merchant syariah.',
    evidenceIds: []
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-1',
    nama: 'Rinaldi Firmansyah',
    email: 'rinaldi.firmansyah@consultant.id',
    role: 'Admin',
    avatar: '👨‍💼'
  },
  {
    id: 'usr-2',
    nama: 'Siti Rahmawati',
    email: 'siti.rahma@consultant.id',
    role: 'Analyst',
    avatar: '👩‍💻'
  },
  {
    id: 'usr-3',
    nama: 'Budi Santoso',
    email: 'budi.santoso@consultant.id',
    role: 'Analyst',
    avatar: '👨‍🔬'
  },
  {
    id: 'usr-4',
    nama: 'Executive BRI (Peserta Workshop)',
    email: 'workshop.bri@bri.co.id',
    role: 'Viewer',
    avatar: '👔'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'aud-1',
    userId: 'usr-1',
    userName: 'Rinaldi Firmansyah',
    aksi: 'PUBLISH',
    entitas: 'Finding',
    detail: 'Mempublikasikan temuan Apache Kafka & Confluent pada Bank BRI (Confirmed)',
    timestamp: '2026-09-12 14:32:00'
  },
  {
    id: 'aud-2',
    userId: 'usr-2',
    userName: 'Siti Rahmawati',
    aksi: 'CREATE',
    entitas: 'Evidence',
    detail: 'Menambahkan bukti lowongan kerja resmi BRI Android Kotlin Clean Architecture',
    timestamp: '2026-09-18 10:15:22'
  },
  {
    id: 'aud-3',
    userId: 'usr-1',
    userName: 'Rinaldi Firmansyah',
    aksi: 'PUBLISH',
    entitas: 'Finding',
    detail: 'Memvalidasi temuan AWS Hybrid Cloud pada Bank Mandiri (Confirmed via AWS Keynote)',
    timestamp: '2026-09-15 16:45:10'
  },
  {
    id: 'aud-4',
    userId: 'usr-3',
    userName: 'Budi Santoso',
    aksi: 'UPDATE',
    entitas: 'Finding',
    detail: 'Memperbarui status review HashiCorp Vault pada BSI menjadi Published',
    timestamp: '2026-10-02 11:20:00'
  }
];
