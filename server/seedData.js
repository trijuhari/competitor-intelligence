export const INITIAL_BANKS = [
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
    deskripsi: 'Bank korporasi dan konsumer terkemuka dengan fokus digital banking terpadu untuk ritel (Livin\') dan wholesale (Kopra).',
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

export const INITIAL_CATEGORIES = [
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

export const INITIAL_TECHNOLOGIES = [
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
    deskripsi: 'Bahasa backend berkemampuan konkurensi tinggi dan latency rendah untuk microservices high-throughput.',
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
    deskripsi: 'Enterprise messaging middleware terpercaya untuk integrasi terjamin ke host core banking.',
    websiteUrl: 'https://ibm.com/products/mq'
  },
  {
    id: 'tech-postgresql',
    nama: 'PostgreSQL / EnterpriseDB',
    vendor: 'PostgreSQL Org / EDB',
    categoryId: 'cat-database',
    tipe: 'open-source',
    deskripsi: 'RDBMS open-source kelas enterprise dengan fitur ACID kuat, partitioning, dan ekosistem JSON luas.',
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
    deskripsi: 'Distributed wide-column NoSQL database dengan ketersediaan tinggi untuk log transaksi besar.',
    websiteUrl: 'https://cassandra.apache.org'
  },
  {
    id: 'tech-redhat-openshift',
    nama: 'Red Hat OpenShift (Kubernetes)',
    vendor: 'Red Hat / IBM',
    categoryId: 'cat-cloud-infra',
    tipe: 'komersial',
    deskripsi: 'Enterprise Kubernetes container platform untuk orkestrasi microservices di private data center.',
    websiteUrl: 'https://redhat.com/openshift'
  },
  {
    id: 'tech-aws-hybrid',
    nama: 'AWS (Amazon Web Services) Hybrid Cloud',
    vendor: 'Amazon Web Services',
    categoryId: 'cat-cloud-infra',
    tipe: 'komersial',
    deskripsi: 'Public cloud region Jakarta untuk beban kerja non-core data, analitik big data, dan ekosistem lifestyle app.',
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
  {
    id: 'tech-gitlab-ci',
    nama: 'GitLab CI/CD Enterprise',
    vendor: 'GitLab Inc.',
    categoryId: 'cat-devops',
    tipe: 'komersial',
    deskripsi: 'Platform DevSecOps terpadu dari source code repository hingga scanning kerentanan kode otomatis.',
    websiteUrl: 'https://gitlab.com'
  },
  {
    id: 'tech-dynatrace',
    nama: 'Dynatrace APM (Davis AI)',
    vendor: 'Dynatrace Inc.',
    categoryId: 'cat-devops',
    tipe: 'komersial',
    deskripsi: 'Platform observability otomatis dengan AI engine untuk pemantauan end-to-end transaksi nasabah.',
    websiteUrl: 'https://dynatrace.com'
  },
  {
    id: 'tech-elastic-stack',
    nama: 'Elasticsearch, Logstash & Kibana (ELK)',
    vendor: 'Elastic N.V.',
    categoryId: 'cat-devops',
    tipe: 'open-source',
    deskripsi: 'Distributed search engine dan visualisasi terpusat untuk log audit dan deteksi anomali operasional.',
    websiteUrl: 'https://elastic.co'
  },
  {
    id: 'tech-hashicorp-vault',
    nama: 'HashiCorp Vault Enterprise',
    vendor: 'HashiCorp (IBM)',
    categoryId: 'cat-security',
    tipe: 'komersial',
    deskripsi: 'Pengelolaan rahasia (secrets management), dynamic database credentials, dan enkripsi data in-transit.',
    websiteUrl: 'https://hashicorp.com/products/vault'
  },
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
    nama: 'SNAP API Gateway Portal',
    vendor: 'In-House & Partner Solution',
    categoryId: 'cat-payment-api',
    tipe: 'in-house',
    deskripsi: 'Implementasi portal pengembang dan otorisasi kriptografi Asymmetric Key untuk SNAP Bank Indonesia.',
    websiteUrl: 'https://briapi.bri.co.id'
  }
];

export const INITIAL_INTERVIEWS = [
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

export const INITIAL_FINDINGS = [
  {
    id: 'f-bri-kafka',
    bankId: 'bank-bri',
    technologyId: 'tech-confluent-kafka',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2024-03-15',
    tanggalVerifikasi: '2026-09-12',
    catatan: 'Tulang punggung streaming transaksi AgenBRILink, deteksi fraud Sabrina, dan mutasi saldo real-time.'
  },
  {
    id: 'f-bri-spark',
    bankId: 'bank-bri',
    technologyId: 'tech-spark',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2023-11-10',
    tanggalVerifikasi: '2026-08-15',
    catatan: 'Digunakan untuk batch processing scoring credit mikro BRISPOT dan pipeline data warehouse harian.'
  },
  {
    id: 'f-bri-minio',
    bankId: 'bank-bri',
    technologyId: 'tech-minio',
    confidence: 'Likely',
    statusReview: 'Published',
    tanggalTerdeteksi: '2025-01-20',
    tanggalVerifikasi: '2026-09-12',
    catatan: 'Object store S3-compatible untuk penyimpanan arsip dokumen digital nasabah KPR dan mikro on-premise.'
  },
  {
    id: 'f-bri-cloudera',
    bankId: 'bank-bri',
    technologyId: 'tech-cloudera',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2023-05-10',
    tanggalVerifikasi: '2026-07-15',
    catatan: 'Enterprise data platform untuk cluster analitik Hadoop dan enterprise DWH.'
  },
  {
    id: 'f-bri-kubeflow',
    bankId: 'bank-bri',
    technologyId: 'tech-kubeflow',
    confidence: 'Likely',
    statusReview: 'Published',
    tanggalTerdeteksi: '2025-04-12',
    tanggalVerifikasi: '2026-09-12',
    catatan: 'Digunakan oleh tim AI & Big Data BRI untuk pipeline pelatihan model propensity dan fraud scoring.'
  },
  {
    id: 'f-bri-genai',
    bankId: 'bank-bri',
    technologyId: 'tech-genai-sabrina',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2023-08-01',
    tanggalVerifikasi: '2026-09-10',
    catatan: 'Sabrina Virtual Assistant berbasis GenAI & NLP cerdas untuk interaksi layanan nasabah 24/7.'
  },
  {
    id: 'f-bri-react',
    bankId: 'bank-bri',
    technologyId: 'tech-react',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2024-01-10',
    tanggalVerifikasi: '2026-08-15',
    catatan: 'Web portal BRImo web, Pasar.id, dan portal onboarding digital nasabah.'
  },
  {
    id: 'f-bri-kotlin',
    bankId: 'bank-bri',
    technologyId: 'tech-kotlin-android',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2023-01-15',
    tanggalVerifikasi: '2026-09-18',
    catatan: 'Super-app BRImo Android murni berbasis Kotlin Clean Architecture dengan proteksi hardware Keystore.'
  },
  {
    id: 'f-bri-swift',
    bankId: 'bank-bri',
    technologyId: 'tech-swift-ios',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2023-01-15',
    tanggalVerifikasi: '2026-09-18',
    catatan: 'BRImo iOS dibangun 100% dengan Swift VIPER / Clean Architecture.'
  },
  {
    id: 'f-bri-spring',
    bankId: 'bank-bri',
    technologyId: 'tech-spring-boot',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2022-01-01',
    tanggalVerifikasi: '2026-09-12',
    catatan: 'Standar de facto microservices backend BRI untuk ratusan layanan transaksi perbankan.'
  },
  {
    id: 'f-bri-golang',
    bankId: 'bank-bri',
    technologyId: 'tech-golang',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2023-07-15',
    tanggalVerifikasi: '2026-09-12',
    catatan: 'Layanan high-throughput microservices untuk push notification, streaming feeds, dan payment gateway.'
  },
  {
    id: 'f-bri-openshift',
    bankId: 'bank-bri',
    technologyId: 'tech-redhat-openshift',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2023-04-10',
    tanggalVerifikasi: '2026-08-20',
    catatan: 'Private container platform utama perbankan BRI dengan ratusan nodes tersebar di multi data center.'
  },
  {
    id: 'f-bri-cassandra',
    bankId: 'bank-bri',
    technologyId: 'tech-cassandra',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2024-02-15',
    tanggalVerifikasi: '2026-09-12',
    catatan: 'Penyimpanan terdistribusi data histori mutasi rekening nasabah skala masif (miliaran transaksi).'
  },
  {
    id: 'f-bri-bifast',
    bankId: 'bank-bri',
    technologyId: 'tech-bifast-engine',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2022-01-01',
    tanggalVerifikasi: '2026-09-10',
    catatan: 'Direct switching BI-FAST 24/7 dengan volume transaksi tertinggi di jaringan Himbara.'
  },
  {
    id: 'f-bri-snap',
    bankId: 'bank-bri',
    technologyId: 'tech-snap-portal',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2022-06-01',
    tanggalVerifikasi: '2026-09-10',
    catatan: 'Implementasi SNAP Bank Indonesia melalui ekosistem BRIAPI.'
  },
  {
    id: 'f-mdr-aws',
    bankId: 'bank-mandiri',
    technologyId: 'tech-aws-hybrid',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2024-01-10',
    tanggalVerifikasi: '2026-09-15',
    catatan: 'Hybrid cloud deployment di AWS Jakarta region untuk ekosistem Livin\' Sukha (lifestyle).'
  },
  {
    id: 'f-mdr-dataiku',
    bankId: 'bank-mandiri',
    technologyId: 'tech-dataiku',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2024-03-20',
    tanggalVerifikasi: '2026-09-15',
    catatan: 'Platform collaborative data science untuk analytics squad di Mandiri Digital.'
  },
  {
    id: 'f-mdr-vault',
    bankId: 'bank-mandiri',
    technologyId: 'tech-hashicorp-vault',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2024-05-01',
    tanggalVerifikasi: '2026-09-15',
    catatan: 'Secrets management dan automated certificate issuance zero-trust security.'
  },
  {
    id: 'f-mdr-golang',
    bankId: 'bank-mandiri',
    technologyId: 'tech-golang',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2024-02-01',
    tanggalVerifikasi: '2026-09-22',
    catatan: 'Go microservices untuk modul performa tinggi Livin\' Sukha dan API payment.'
  },
  {
    id: 'f-mdr-bifast',
    bankId: 'bank-mandiri',
    technologyId: 'tech-bifast-engine',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2022-01-01',
    tanggalVerifikasi: '2026-09-10',
    catatan: 'Konektor BI-FAST dengan volume transfer retail tertinggi kedua di Indonesia.'
  },
  {
    id: 'f-bni-dynatrace',
    bankId: 'bank-bni',
    technologyId: 'tech-dynatrace',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2024-04-10',
    tanggalVerifikasi: '2026-09-25',
    catatan: 'Pemantauan APM end-to-end user experience pada peluncuran wondr mobile banking.'
  },
  {
    id: 'f-btn-openshift',
    bankId: 'bank-btn',
    technologyId: 'tech-redhat-openshift',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2024-06-19',
    tanggalVerifikasi: '2026-09-28',
    catatan: 'Platform containerisasi modernisasi data center dan ekosistem bale by BTN.'
  },
  {
    id: 'f-bsi-vault',
    bankId: 'bank-bsi',
    technologyId: 'tech-hashicorp-vault',
    confidence: 'Confirmed',
    statusReview: 'Published',
    tanggalTerdeteksi: '2024-04-15',
    tanggalVerifikasi: '2026-10-02',
    catatan: 'Implementasi manajemen secrets terpusat dan perlindungan kunci kriptografi zero-trust.'
  }
];

export const INITIAL_EVIDENCES = [
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
    id: 'ev-bsi-vault-1',
    findingId: 'f-bsi-vault',
    tipeSumber: 'wawancara',
    judul: 'Wawancara Postur Keamanan BSI Pasca-Merger',
    interviewId: 'int-bsi-01',
    tanggalAkses: '2026-10-02',
    kutipanRingkas: 'Narasumber BSI-01 mengonfirmasi penggelaran HashiCorp Vault untuk enkripsi zero-trust dan manajemen kunci terpusat.',
    pencatat: 'Rinaldi (Lead Tech Analyst)'
  }
];

export const INITIAL_USERS = [
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
    nama: 'Executive BRI (Peserta Workshop)',
    email: 'workshop.bri@bri.co.id',
    role: 'Viewer',
    avatar: '👔'
  }
];

export const INITIAL_AUDIT_LOGS = [
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
    userId: 'usr-1',
    userName: 'Rinaldi Firmansyah',
    aksi: 'PUBLISH',
    entitas: 'Finding',
    detail: 'Memvalidasi temuan AWS Hybrid Cloud pada Bank Mandiri (Confirmed via AWS Keynote)',
    timestamp: '2026-09-15 16:45:10'
  }
];
