import { Bank, Category, Technology, Finding, Evidence, Interview, User, AuditLog } from '../types';

export const INITIAL_BANKS: Bank[] = [
  {
    "id": "bank-bri",
    "nama": "PT Bank Rakyat Indonesia (Persero) Tbk",
    "slug": "bri",
    "singkatan": "BRI",
    "deskripsi": "Bank BUMN terbesar di Indonesia dengan fokus pada segmen mikro, UMKM, dan penetrasi inklusi keuangan melalui jaringan hybrid terluas (AgenBRILink & BRImo).",
    "logo": "🏦",
    "isFokusUtama": true,
    "produkDigital": [
      "BRImo",
      "Pasar.id",
      "BRISPOT",
      "AgenBRILink Mobile",
      "BRIAPI (SNAP)",
      "QLola by BRI",
      "Ceria",
      "Bank Raya"
    ],
    "brandColor": "#00529C",
    "accentColor": "#F58220",
    "textColor": "#ffffff",
    "badgeBg": "bg-blue-600 text-white"
  },
  {
    "id": "bank-mandiri",
    "nama": "PT Bank Mandiri (Persero) Tbk",
    "slug": "mandiri",
    "singkatan": "Mandiri",
    "deskripsi": "Bank korporasi dan konsumer terkemuka dengan fokus digital banking terpadu untuk ritel (Livin') dan wholesale (Kopra by Mandiri).",
    "logo": "🏛️",
    "isFokusUtama": false,
    "produkDigital": [
      "Livin' by Mandiri",
      "Kopra by Mandiri",
      "Mandiri Cash Management",
      "Mandiri API",
      "MITA"
    ],
    "brandColor": "#0A3B74",
    "accentColor": "#FDB813",
    "textColor": "#ffffff",
    "badgeBg": "bg-sky-800 text-white"
  },
  {
    "id": "bank-bca",
    "nama": "PT Bank Central Asia Tbk",
    "slug": "bca",
    "singkatan": "BCA",
    "deskripsi": "Bank swasta terbesar di Indonesia dengan ekosistem transaksi ritel dan korporasi terkuat, pelopor digital banking melalui BCA mobile & myBCA.",
    "logo": "🏦",
    "isFokusUtama": false,
    "produkDigital": [
      "myBCA",
      "BCA mobile",
      "KlikBCA",
      "Blu by BCA Digital",
      "BCA API (SNAP)"
    ],
    "brandColor": "#003882",
    "accentColor": "#008CD2",
    "textColor": "#ffffff",
    "badgeBg": "bg-blue-800 text-white"
  },
  {
    "id": "bank-bni",
    "nama": "PT Bank Negara Indonesia (Persero) Tbk",
    "slug": "bni",
    "singkatan": "BNI",
    "deskripsi": "Bank BUMN pelopor perbankan internasional dan digital lifestyle banking terbarukan melalui peluncuran platform mobile wondr.",
    "logo": "🏢",
    "isFokusUtama": false,
    "produkDigital": [
      "wondr by BNI",
      "BNI Mobile Banking",
      "BNIdirect",
      "BNI Open API",
      "Hibank"
    ],
    "brandColor": "#005E5D",
    "accentColor": "#F15A24",
    "textColor": "#ffffff",
    "badgeBg": "bg-emerald-800 text-white"
  },
  {
    "id": "bank-btn",
    "nama": "PT Bank Tabungan Negara (Persero) Tbk",
    "slug": "btn",
    "singkatan": "BTN",
    "deskripsi": "Bank spesialis pembiayaan perumahan dan ekosistem KPR nasional, tengah melakukan akselerasi digital lewat platform Bale by BTN.",
    "logo": "🏠",
    "isFokusUtama": false,
    "produkDigital": [
      "Bale by BTN",
      "BTN Mobile",
      "BTN Properti",
      "Portal KPR",
      "BTN Cash Management"
    ],
    "brandColor": "#003366",
    "accentColor": "#C5A059",
    "textColor": "#ffffff",
    "badgeBg": "bg-indigo-900 text-white"
  },
  {
    "id": "bank-bsi",
    "nama": "PT Bank Syariah Indonesia Tbk",
    "slug": "bsi",
    "singkatan": "BSI",
    "deskripsi": "Bank syariah terbesar di Indonesia hasil merger bank syariah Himbara, mentransformasi layanan digital via Byond by BSI dan BEWIZE.",
    "logo": "🕌",
    "isFokusUtama": false,
    "produkDigital": [
      "Byond by BSI",
      "BSI Mobile",
      "BEWIZE by BSI",
      "BSI Net Banking",
      "Salam Digital"
    ],
    "brandColor": "#00A39D",
    "accentColor": "#78BE20",
    "textColor": "#ffffff",
    "badgeBg": "bg-teal-700 text-white"
  }
];

export const INITIAL_CATEGORIES: Category[] = [
  {
    "id": "cat-big-data",
    "nama": "Big Data & Analytics",
    "slug": "big-data",
    "urutan": 1,
    "icon": "DatabaseZap",
    "deskripsi": "Infrastruktur pemrosesan data skala besar, streaming, lakehouse, analytics engine, dan business intelligence.",
    "contohSubkategori": [
      "Data Lake/Lakehouse",
      "Streaming Platform",
      "Batch Processing",
      "Data Warehouse",
      "BI Tools"
    ]
  },
  {
    "id": "cat-ai-ml",
    "nama": "AI / Machine Learning",
    "slug": "ai-ml",
    "urutan": 2,
    "icon": "BrainCircuit",
    "deskripsi": "Platform model machine learning, credit scoring cerdas, sistem deteksi fraud, generative AI, dan NLP conversational.",
    "contohSubkategori": [
      "MLOps Platform",
      "Automated Credit Scoring",
      "Real-time Fraud Detection",
      "GenAI/Chatbot"
    ]
  },
  {
    "id": "cat-front-end",
    "nama": "Front End (Web & Internet Banking)",
    "slug": "front-end",
    "urutan": 3,
    "icon": "Layout",
    "deskripsi": "Framework antarmuka web, Internet Banking korporasi/wholesale, CMS, SPA, SSR, CDN, dan observability web.",
    "contohSubkategori": [
      "Wholesale Web Portal",
      "Cash Management System (CMS)",
      "Web Framework",
      "CDN & Edge"
    ]
  },
  {
    "id": "cat-mobile",
    "nama": "Mobile Ecosystem",
    "slug": "mobile",
    "urutan": 4,
    "icon": "Smartphone",
    "deskripsi": "Teknologi pengembangan aplikasi mobile super-app (Native vs Cross-platform), SDK keamanan dan distribusi mobile.",
    "contohSubkategori": [
      "Super-App Retail",
      "Android Native",
      "iOS Native",
      "Cross-platform Framework",
      "Mobile Security SDK"
    ]
  },
  {
    "id": "cat-back-end",
    "nama": "Back End & Microservices",
    "slug": "back-end",
    "urutan": 5,
    "icon": "Server",
    "deskripsi": "Bahasa pemrograman backend, enterprise framework, API Gateway, service mesh, dan protokol microservices.",
    "contohSubkategori": [
      "Enterprise Languages",
      "Microservices Framework",
      "API Gateway",
      "RPC/Communication"
    ]
  },
  {
    "id": "cat-core-banking",
    "nama": "Core Banking & Middleware",
    "slug": "core-banking",
    "urutan": 6,
    "icon": "Landmark",
    "deskripsi": "Sistem inti perbankan (Core Banking System / CBS), modul syariah, Enterprise Resource Planning (ERP), dan middleware ESB/MQ.",
    "contohSubkategori": [
      "Core Banking System",
      "ERP Enterprise",
      "Enterprise Service Bus",
      "Message Oriented Middleware"
    ]
  },
  {
    "id": "cat-database",
    "nama": "Database & In-Memory Storage",
    "slug": "database",
    "urutan": 7,
    "icon": "HardDrive",
    "deskripsi": "Sistem manajemen basis data relasional (RDBMS), NoSQL, distributed storage, dan cache in-memory.",
    "contohSubkategori": [
      "Relational Database",
      "Distributed NoSQL",
      "In-Memory Cache",
      "Time-Series Database"
    ]
  },
  {
    "id": "cat-cloud-infra",
    "nama": "Cloud & Infrastructure",
    "slug": "cloud-infra",
    "urutan": 8,
    "icon": "Cloud",
    "deskripsi": "Infrastruktur cloud (Public, Private, Hybrid), container orchestration (Kubernetes/OpenShift), server compute, dan Tier III/IV DC.",
    "contohSubkategori": [
      "Public Cloud IaaS",
      "Private Cloud Platform",
      "Container Platform",
      "Compute & Virtualization"
    ]
  },
  {
    "id": "cat-devops",
    "nama": "DevOps, CI/CD & Observability",
    "slug": "devops",
    "urutan": 9,
    "icon": "GitBranch",
    "deskripsi": "Pipeline integrasi berkelanjutan (CI/CD), DevSecOps, ITSM enterprise, automation testing, dan application performance monitoring.",
    "contohSubkategori": [
      "CI/CD Pipeline",
      "ITSM Platform",
      "Ansible Automation",
      "Application Performance Monitoring (APM)"
    ]
  },
  {
    "id": "cat-security",
    "nama": "Security, IAM & Regulatory Compliance",
    "slug": "security",
    "urutan": 10,
    "icon": "ShieldAlert",
    "deskripsi": "Keamanan informasi, secret management, deteksi fraud AI, penjaminan simpanan LPS, dan kepatuhan POJK/UU PDP.",
    "contohSubkategori": [
      "Secrets Management",
      "AI Anti-Fraud System",
      "UU PDP & AI Ethics",
      "POJK Regulatory Compliance"
    ]
  },
  {
    "id": "cat-payment-api",
    "nama": "Payment & Open Finance (SNAP API)",
    "slug": "payment-api",
    "urutan": 11,
    "icon": "CreditCard",
    "deskripsi": "Sistem pembayaran nasional (BI-FAST, QRIS, SNAP API), Open Banking API Management, dan ekosistem bank digital anak usaha.",
    "contohSubkategori": [
      "QRIS Engine",
      "BI-FAST Settlement",
      "API Management (OpenAPI)",
      "Digital Bank Subsidiary"
    ]
  }
];

export const INITIAL_TECHNOLOGIES: Technology[] = [
  {
    "id": "tech-silverlake-sibs",
    "nama": "Silverlake Axis SIBS",
    "vendor": "Silverlake Axis Ltd",
    "categoryId": "cat-core-banking",
    "tipe": "komersial",
    "deskripsi": "Core Banking System terkemuka untuk perbankan skala besar ASEAN, menangani deposit, lending, dan GL di BRI, Mandiri, dan BTN.",
    "websiteUrl": "https://www.silverlakeaxis.com"
  },
  {
    "id": "tech-temenos-transact",
    "nama": "Temenos Transact (T24) Syariah",
    "vendor": "Temenos AG",
    "categoryId": "cat-core-banking",
    "tipe": "komersial",
    "deskripsi": "Core banking platform global kelas enterprise dengan modul syariah, tengah dalam program migrasi arsitektur R10 ke R24 di BSI tuntas Mei 2026.",
    "websiteUrl": "https://www.temenos.com"
  },
  {
    "id": "tech-tcs-bancs",
    "nama": "TCS BaNCS",
    "vendor": "Tata Consultancy Services (TCS)",
    "categoryId": "cat-core-banking",
    "tipe": "komersial",
    "deskripsi": "Core Banking Suite komprehensif untuk perbankan ritel, korporasi, dan treasury yang digunakan oleh BNI.",
    "websiteUrl": "https://www.tcs.com/bancs"
  },
  {
    "id": "tech-cbs-proprietary",
    "nama": "Proprietary CBS Core Engine",
    "vendor": "In-House Engineering",
    "categoryId": "cat-core-banking",
    "tipe": "in-house",
    "deskripsi": "Sistem inti perbankan internal proprietary BCA berkemampuan ultra-high throughput dan low latency yang tidak dipublikasikan secara komersial.",
    "websiteUrl": "https://www.bca.co.id"
  },
  {
    "id": "tech-sap-erp",
    "nama": "SAP ERP ECC 6.0 / S/4HANA",
    "vendor": "SAP SE",
    "categoryId": "cat-core-banking",
    "tipe": "komersial",
    "deskripsi": "Enterprise Resource Planning terpadu untuk keuangan, operasional, logistik, dan HR yang diadopsi dalam transformasi digital perbankan (BRI & BCA).",
    "websiteUrl": "https://www.sap.com"
  },
  {
    "id": "tech-ibm-mq",
    "nama": "IBM MQ / Integration Bus (ACE)",
    "vendor": "IBM Corporation",
    "categoryId": "cat-core-banking",
    "tipe": "komersial",
    "deskripsi": "Enterprise middleware messaging dan ESB untuk integrasi sistem heterogen, switching ATM, dan core banking.",
    "websiteUrl": "https://www.ibm.com/products/mq"
  },
  {
    "id": "tech-brimo",
    "nama": "BRImo Mobile Super-App",
    "vendor": "PT Bank Rakyat Indonesia (Persero) Tbk",
    "categoryId": "cat-mobile",
    "tipe": "in-house",
    "deskripsi": "Aplikasi mobile banking super-app retail BRI dengan rating tertinggi 4.7 di Google Play Store (>1 juta ulasan) dan puluhan juta pengguna aktif.",
    "websiteUrl": "https://bri.co.id/brimo"
  },
  {
    "id": "tech-livin-mandiri",
    "nama": "Livin' by Mandiri",
    "vendor": "PT Bank Mandiri (Persero) Tbk",
    "categoryId": "cat-mobile",
    "tipe": "in-house",
    "deskripsi": "Aplikasi mobile financial & lifestyle super-app Bank Mandiri dengan integrasi Livin' Sukha, AI assistant MITA, dan microservices modern.",
    "websiteUrl": "https://bankmandiri.co.id/livin"
  },
  {
    "id": "tech-mybca",
    "nama": "myBCA / BCA Mobile",
    "vendor": "PT Bank Central Asia Tbk",
    "categoryId": "cat-mobile",
    "tipe": "in-house",
    "deskripsi": "Platform mobile banking unggulan BCA dengan arsitektur single BCA ID, rating 4.4-4.1, dan integrasi transaksi finansial super cepat.",
    "websiteUrl": "https://www.bca.co.id/mybca"
  },
  {
    "id": "tech-wondr-bni",
    "nama": "wondr by BNI",
    "vendor": "PT Bank Negara Indonesia (Persero) Tbk",
    "categoryId": "cat-mobile",
    "tipe": "in-house",
    "deskripsi": "Super-app perbankan generasi baru BNI dengan 3 dimensi finansial (Transaksi, Insight, Growth), dilengkapi AI rekomendasi real-time.",
    "websiteUrl": "https://wondr.bni.co.id"
  },
  {
    "id": "tech-bale-btn",
    "nama": "Bale by BTN",
    "vendor": "PT Bank Tabungan Negara (Persero) Tbk",
    "categoryId": "cat-mobile",
    "tipe": "in-house",
    "deskripsi": "Super-app perbankan digital terbaru BTN (diluncurkan 2024) yang mengintegrasikan layanan transaksi harian dengan ekosistem perumahan.",
    "websiteUrl": "https://www.btn.co.id"
  },
  {
    "id": "tech-byond-bsi",
    "nama": "Byond by BSI",
    "vendor": "PT Bank Syariah Indonesia Tbk",
    "categoryId": "cat-mobile",
    "tipe": "in-house",
    "deskripsi": "Super-app syariah modern BSI dengan capaian 10 juta+ pengguna, ketersediaan sistem 99.99%, dan fitur transaksi finansial serta sosial syariah.",
    "websiteUrl": "https://www.bankbsi.co.id"
  },
  {
    "id": "tech-kotlin-android",
    "nama": "Kotlin (Android Native Clean Arch)",
    "vendor": "JetBrains / Google",
    "categoryId": "cat-mobile",
    "tipe": "open-source",
    "deskripsi": "Bahasa utama native Android dengan arsitektur Clean Architecture, Jetpack Compose, dan Coroutines untuk aplikasi perbankan berkinerja tinggi.",
    "websiteUrl": "https://kotlinlang.org"
  },
  {
    "id": "tech-swift-ios",
    "nama": "Swift (iOS Native)",
    "vendor": "Apple Inc.",
    "categoryId": "cat-mobile",
    "tipe": "open-source",
    "deskripsi": "Bahasa pemrograman native iOS dengan arsitektur VIPER/MVVM-C, SwiftUI, dan enkripsi Secure Enclave untuk mobile banking.",
    "websiteUrl": "https://swift.org"
  },
  {
    "id": "tech-flutter",
    "nama": "Flutter (Dart)",
    "vendor": "Google",
    "categoryId": "cat-mobile",
    "tipe": "open-source",
    "deskripsi": "UI toolkit lintas platform untuk membangun aplikasi mobile internal/agen perbankan dengan codebase tunggal.",
    "websiteUrl": "https://flutter.dev"
  },
  {
    "id": "tech-react-native",
    "nama": "React Native",
    "vendor": "Meta",
    "categoryId": "cat-mobile",
    "tipe": "open-source",
    "deskripsi": "Framework mobile cross-platform berbasis JavaScript/TypeScript.",
    "websiteUrl": "https://reactnative.dev"
  },
  {
    "id": "tech-qlola-bri",
    "nama": "QLola by BRI (Wholesale Suite)",
    "vendor": "PT Bank Rakyat Indonesia (Persero) Tbk",
    "categoryId": "cat-front-end",
    "tipe": "in-house",
    "deskripsi": "Platform terintegrasi korporasi dengan Single Sign-On (SSO) mencakup Cash Management (CMS), Trade Finance, Supply Chain Management, dan Global FX.",
    "websiteUrl": "https://qlola.bri.co.id"
  },
  {
    "id": "tech-kopra-mandiri",
    "nama": "Kopra by Mandiri",
    "vendor": "PT Bank Mandiri (Persero) Tbk",
    "categoryId": "cat-front-end",
    "tipe": "in-house",
    "deskripsi": "Super platform wholesale banking Bank Mandiri yang mengintegrasikan Cash Management, Trade, Supply Chain, Smart Account, dan Foreign Exchange.",
    "websiteUrl": "https://koprabymandiri.com"
  },
  {
    "id": "tech-bnidirect",
    "nama": "BNIdirect Cash Management",
    "vendor": "PT Bank Negara Indonesia (Persero) Tbk",
    "categoryId": "cat-front-end",
    "tipe": "in-house",
    "deskripsi": "Portal Internet Banking korporasi BNI untuk pengelolaan kas, payroll massal, pembayaran tagihan, dan valuta asing bagi nasabah institusi.",
    "websiteUrl": "https://bnidirect.bni.co.id"
  },
  {
    "id": "tech-bewize-bsi",
    "nama": "BEWIZE by BSI",
    "vendor": "PT Bank Syariah Indonesia Tbk",
    "categoryId": "cat-front-end",
    "tipe": "in-house",
    "deskripsi": "Portal wholesale internet banking syariah BSI untuk nasabah korporasi, institusi pemerintah, dan entitas bisnis syariah.",
    "websiteUrl": "https://www.bankbsi.co.id"
  },
  {
    "id": "tech-react",
    "nama": "React.js & Next.js",
    "vendor": "Meta / Vercel",
    "categoryId": "cat-front-end",
    "tipe": "open-source",
    "deskripsi": "Library dan framework antarmuka web modern dengan arsitektur komponen modular dan server-side rendering.",
    "websiteUrl": "https://react.dev"
  },
  {
    "id": "tech-angular",
    "nama": "Angular",
    "vendor": "Google",
    "categoryId": "cat-front-end",
    "tipe": "open-source",
    "deskripsi": "Framework TypeScript enterprise untuk aplikasi single page skala besar dengan arsitektur dua arah dan DI kuat.",
    "websiteUrl": "https://angular.dev"
  },
  {
    "id": "tech-cloudflare-cdn",
    "nama": "Cloudflare / Akamai CDN & Edge",
    "vendor": "Cloudflare / Akamai",
    "categoryId": "cat-front-end",
    "tipe": "komersial",
    "deskripsi": "Jaringan pengiriman konten global, edge compute, dan web application firewall (WAF) pencegah DDoS.",
    "websiteUrl": "https://www.cloudflare.com"
  },
  {
    "id": "tech-briapi-apigee",
    "nama": "BRIAPI & Google Cloud Apigee",
    "vendor": "BRI & Google Cloud",
    "categoryId": "cat-payment-api",
    "tipe": "komersial",
    "deskripsi": "Solusi Open Banking API bersertifikasi PA-DSS dan SNAP BI yang diorkestrasi menggunakan Google Apigee API Management.",
    "websiteUrl": "https://developers.bri.co.id"
  },
  {
    "id": "tech-3scale-apim",
    "nama": "Red Hat 3scale API Management",
    "vendor": "Red Hat (IBM)",
    "categoryId": "cat-payment-api",
    "tipe": "komersial",
    "deskripsi": "Platform API Management enterprise BCA untuk tata kelola API microservices, pembatasan kuota, dan kepatuhan SNAP BI.",
    "websiteUrl": "https://www.redhat.com/en/technologies/jboss-middleware/3scale"
  },
  {
    "id": "tech-qris-payment",
    "nama": "QRIS & Cross-Border QR Payment",
    "vendor": "Bank Indonesia / ASPI",
    "categoryId": "cat-payment-api",
    "tipe": "in-house",
    "deskripsi": "Engine pemrosesan standar pembayaran QR nasional dan internasional (QRIS Tap, Singapura, Malaysia, Thailand) di seluruh 6 bank.",
    "websiteUrl": "https://www.bi.go.id"
  },
  {
    "id": "tech-bifast-engine",
    "nama": "BI-FAST Connector (ISO 20022 Engine)",
    "vendor": "Bank Indonesia / Vendor Partner",
    "categoryId": "cat-payment-api",
    "tipe": "in-house",
    "deskripsi": "Infrastruktur konektor transfer real-time nasional 24/7 berbasis standar ISO 20022 dengan biaya transfer efisien Rp2.500.",
    "websiteUrl": "https://www.bi.go.id"
  },
  {
    "id": "tech-snap-portal",
    "nama": "SNAP API Gateway Portal",
    "vendor": "In-House & Partner Solution",
    "categoryId": "cat-payment-api",
    "tipe": "in-house",
    "deskripsi": "Portal integrasi open API sesuai Standar Nasional Open API Pembayaran (SNAP) Bank Indonesia.",
    "websiteUrl": "https://aspi-indonesia.or.id/snap"
  },
  {
    "id": "tech-bank-raya",
    "nama": "Bank Raya (eks BRI Agro Digital Bank)",
    "vendor": "PT Bank Raya Indonesia Tbk",
    "categoryId": "cat-payment-api",
    "tipe": "in-house",
    "deskripsi": "Bank digital anak usaha BRI yang beroperasi secara mobile-first dengan infrastruktur primary cloud di Google Cloud.",
    "websiteUrl": "https://www.bankraya.co.id"
  },
  {
    "id": "tech-blu-bca",
    "nama": "Blu by BCA Digital",
    "vendor": "PT Bank Digital BCA",
    "categoryId": "cat-payment-api",
    "tipe": "in-house",
    "deskripsi": "Platform bank digital anak usaha BCA dengan ekosistem integrasi BaaS (Banking-as-a-Service) ke berbagai platform e-commerce dan fintech.",
    "websiteUrl": "https://www.blubybcadigital.id"
  },
  {
    "id": "tech-hibank-bni",
    "nama": "Hibank (Digital Bank UMKM BNI)",
    "vendor": "PT Bank Hibank Indonesia",
    "categoryId": "cat-payment-api",
    "tipe": "in-house",
    "deskripsi": "Bank digital anak usaha BNI yang difokuskan untuk pemberdayaan dan pembiayaan ekosistem UMKM secara digital.",
    "websiteUrl": "https://www.hibank.co.id"
  },
  {
    "id": "tech-confluent-kafka",
    "nama": "Apache Kafka / Confluent",
    "vendor": "Confluent / Apache",
    "categoryId": "cat-big-data",
    "tipe": "open-source",
    "deskripsi": "Distributed event streaming platform throughput tinggi untuk pipeline data real-time, sinkronisasi CDC core banking, dan fraud analytics.",
    "websiteUrl": "https://kafka.apache.org"
  },
  {
    "id": "tech-spark",
    "nama": "Apache Spark",
    "vendor": "Apache Software Foundation",
    "categoryId": "cat-big-data",
    "tipe": "open-source",
    "deskripsi": "Unified analytics engine untuk pemrosesan data skala besar in-memory, batch ETL, dan pipeline data science.",
    "websiteUrl": "https://spark.apache.org"
  },
  {
    "id": "tech-cloudera-eidp",
    "nama": "Cloudera Enterprise Data Platform (EIDP / CDP)",
    "vendor": "Cloudera Inc.",
    "categoryId": "cat-big-data",
    "tipe": "komersial",
    "deskripsi": "Fondasi data lake dan modern lakehouse terpusat (Hadoop/CDP) yang menjadi single source of truth data nasabah di Mandiri, BCA, dan BNI.",
    "websiteUrl": "https://www.cloudera.com"
  },
  {
    "id": "tech-iceberg-lakehouse",
    "nama": "Apache Iceberg Open Lakehouse",
    "vendor": "Apache Software Foundation / Cloudera",
    "categoryId": "cat-big-data",
    "tipe": "open-source",
    "deskripsi": "Table format terbuka berkinerja tinggi untuk tabel analitik besar, mendukung time travel, skema evolusi, dan lakehouse terbuka di BNI.",
    "websiteUrl": "https://iceberg.apache.org"
  },
  {
    "id": "tech-ibm-datastage",
    "nama": "IBM InfoSphere DataStage",
    "vendor": "IBM Corporation",
    "categoryId": "cat-big-data",
    "tipe": "komersial",
    "deskripsi": "Platform integrasi data ETL enterprise berkemampuan integrasi multi-source heterogen, digunakan di Bank Mandiri.",
    "websiteUrl": "https://www.ibm.com/products/infosphere-datastage"
  },
  {
    "id": "tech-minio",
    "nama": "MinIO / Ceph Object Store",
    "vendor": "MinIO Inc / Red Hat",
    "categoryId": "cat-big-data",
    "tipe": "open-source",
    "deskripsi": "Penyimpanan objek kompatibel Amazon S3 berkecepatan tinggi on-premise untuk data lake dan arsip dokumen nasabah.",
    "websiteUrl": "https://min.io"
  },
  {
    "id": "tech-tableau-bi",
    "nama": "Tableau & CDSW Analytics Platform",
    "vendor": "Tableau (Salesforce) / Cloudera",
    "categoryId": "cat-big-data",
    "tipe": "komersial",
    "deskripsi": "Platform visualisasi BI dan self-service analytics yang memungkinkan analis bisnis dan data coaches membuat dashboard kinerja terukur.",
    "websiteUrl": "https://www.tableau.com"
  },
  {
    "id": "tech-bribrain",
    "nama": "BRIBRAIN (AI/ML & Underwriting Platform)",
    "vendor": "PT Bank Rakyat Indonesia (Persero) Tbk",
    "categoryId": "cat-ai-ml",
    "tipe": "in-house",
    "deskripsi": "Pusat kecerdasan buatan BRI yang mengoperasikan automated credit scoring BRISPOT, real-time recommendation engine, dan deteksi fraud transaksi.",
    "websiteUrl": "https://digital.bri.co.id"
  },
  {
    "id": "tech-mandiri-mita",
    "nama": "MITA (Mandiri Intelligent Assistant)",
    "vendor": "PT Bank Mandiri (Persero) Tbk",
    "categoryId": "cat-ai-ml",
    "tipe": "in-house",
    "deskripsi": "Asisten virtual cerdas berbasis NLP yang melayani nasabah secara omni-channel (WhatsApp, LINE, Telegram) dengan automasi penanganan keluhan.",
    "websiteUrl": "https://www.bankmandiri.co.id"
  },
  {
    "id": "tech-bri-sabrina",
    "nama": "Sabrina (AI Virtual Assistant BRI)",
    "vendor": "PT Bank Rakyat Indonesia (Persero) Tbk",
    "categoryId": "cat-ai-ml",
    "tipe": "in-house",
    "deskripsi": "Chatbot AI percakapan BRI yang terintegrasi di BRImo dan messaging channel untuk pengecekan saldo, mutasi, hingga informasi promosi.",
    "websiteUrl": "https://bri.co.id"
  },
  {
    "id": "tech-cloudera-ai",
    "nama": "Cloudera AI Workbench & Inference",
    "vendor": "Cloudera Inc.",
    "categoryId": "cat-ai-ml",
    "tipe": "komersial",
    "deskripsi": "Platform enterprise terpusat on-premise untuk data science, model registry, MLOps, retraining otomatis, dan serving inferensi model di BCA.",
    "websiteUrl": "https://www.cloudera.com/products/machine-learning.html"
  },
  {
    "id": "tech-nvidia-nim",
    "nama": "NVIDIA NIM & AI Accelerated Computing",
    "vendor": "NVIDIA Corporation",
    "categoryId": "cat-ai-ml",
    "tipe": "komersial",
    "deskripsi": "Infrastruktur akselerasi GPU NVIDIA untuk menjalankan open-source LLM sovereign secara on-premise di data center BNI guna kedaulatan data.",
    "websiteUrl": "https://www.nvidia.com"
  },
  {
    "id": "tech-bni-ai-kyc",
    "nama": "AI-KYC Digital Document Onboarding",
    "vendor": "PT Bank Negara Indonesia (Persero) Tbk",
    "categoryId": "cat-ai-ml",
    "tipe": "in-house",
    "deskripsi": "Solusi verifikasi dokumen digital berbasis AI yang memangkas waktu review dokumen onboarding nasabah dari 5 hari menjadi hitungan jam.",
    "websiteUrl": "https://www.bni.co.id"
  },
  {
    "id": "tech-dataiku",
    "nama": "Dataiku DSS Enterprise",
    "vendor": "Dataiku",
    "categoryId": "cat-ai-ml",
    "tipe": "komersial",
    "deskripsi": "Platform kolaboratif data science dan machine learning untuk pengembangan model prediktif cepat dan governance model di Bank Mandiri.",
    "websiteUrl": "https://www.dataiku.com"
  },
  {
    "id": "tech-fico-scoring",
    "nama": "FICO Falcon & Blaze Advisor",
    "vendor": "FICO",
    "categoryId": "cat-ai-ml",
    "tipe": "komersial",
    "deskripsi": "Mesin aturan bisnis (BRMS) dan deteksi fraud transaksi kartu kredit serta pinjaman retail secara real-time.",
    "websiteUrl": "https://www.fico.com"
  },
  {
    "id": "tech-kubeflow",
    "nama": "Kubeflow & MLflow",
    "vendor": "Open Source (LF AI & Data)",
    "categoryId": "cat-ai-ml",
    "tipe": "open-source",
    "deskripsi": "Platform MLOps open-source untuk orkestrasi pipeline pelatihan model di atas Kubernetes dan pelacakan eksperimen.",
    "websiteUrl": "https://www.kubeflow.org"
  },
  {
    "id": "tech-spring-boot",
    "nama": "Java / Spring Boot Enterprise",
    "vendor": "Broadcom / VMware (Spring)",
    "categoryId": "cat-back-end",
    "tipe": "open-source",
    "deskripsi": "Framework backend standar de facto perbankan enterprise untuk membangun layanan microservices yang tangguh dan skalabel.",
    "websiteUrl": "https://spring.io"
  },
  {
    "id": "tech-golang",
    "nama": "Go (Golang Microservices)",
    "vendor": "Google",
    "categoryId": "cat-back-end",
    "tipe": "open-source",
    "deskripsi": "Bahasa pemrograman dengan konkurensi tinggi dan memory footprint sangat rendah, digunakan pada engine transaksi inti modern di bank besar.",
    "websiteUrl": "https://go.dev"
  },
  {
    "id": "tech-kong-gateway",
    "nama": "Kong Enterprise API Gateway",
    "vendor": "Kong Inc.",
    "categoryId": "cat-back-end",
    "tipe": "komersial",
    "deskripsi": "Cloud-native API gateway berkecepatan tinggi berbasis Envoy/Nginx untuk manajemen lalu lintas microservices dan security mesh.",
    "websiteUrl": "https://konghq.com"
  },
  {
    "id": "tech-postgresql",
    "nama": "PostgreSQL / EnterpriseDB",
    "vendor": "PostgreSQL Org / EDB",
    "categoryId": "cat-database",
    "tipe": "open-source",
    "deskripsi": "Sistem basis data relasional open-source paling canggih untuk transaksi ACID perbankan dengan dukungan ekstensi kaya.",
    "websiteUrl": "https://www.postgresql.org"
  },
  {
    "id": "tech-oracle-db",
    "nama": "Oracle Exadata Database",
    "vendor": "Oracle Corporation",
    "categoryId": "cat-database",
    "tipe": "komersial",
    "deskripsi": "Engine database relasional enterprise performa tinggi yang menjadi fondasi sistem pencatatan perbankan kritikal.",
    "websiteUrl": "https://www.oracle.com/database"
  },
  {
    "id": "tech-redis",
    "nama": "Redis Enterprise",
    "vendor": "Redis Ltd.",
    "categoryId": "cat-database",
    "tipe": "komersial",
    "deskripsi": "In-memory data store ultra-low latency untuk session management, token authentication, dan deduplikasi transaksi.",
    "websiteUrl": "https://redis.io"
  },
  {
    "id": "tech-cassandra",
    "nama": "Apache Cassandra / ScyllaDB",
    "vendor": "Apache / ScyllaDB Inc.",
    "categoryId": "cat-database",
    "tipe": "open-source",
    "deskripsi": "Distributed NoSQL database berkapabilitas write throughput masif tanpa single point of failure untuk pencatatan audit log dan histori AgenBRILink.",
    "websiteUrl": "https://cassandra.apache.org"
  },
  {
    "id": "tech-redhat-openshift",
    "nama": "Red Hat OpenShift Container Platform",
    "vendor": "Red Hat (IBM)",
    "categoryId": "cat-cloud-infra",
    "tipe": "komersial",
    "deskripsi": "Platform Kubernetes enterprise dan PaaS terdepan yang diadopsi oleh BRI, Mandiri, dan BCA untuk orkestrasi microservices dan pipeline DevSecOps.",
    "websiteUrl": "https://www.redhat.com/en/technologies/cloud-computing/openshift"
  },
  {
    "id": "tech-google-cloud",
    "nama": "Google Cloud Platform (GCP) Jakarta",
    "vendor": "Google Cloud / iZeno",
    "categoryId": "cat-cloud-infra",
    "tipe": "komersial",
    "deskripsi": "Infrastruktur cloud publik regional Jakarta (onshore) yang digunakan oleh BRI dan Bank Raya untuk layanan microservices dan analytics.",
    "websiteUrl": "https://cloud.google.com"
  },
  {
    "id": "tech-mandiri-cloud",
    "nama": "Mandiri Private Cloud & Multi-Cloud",
    "vendor": "Bank Mandiri Internal",
    "categoryId": "cat-cloud-infra",
    "tipe": "in-house",
    "deskripsi": "Platform private cloud internal Bank Mandiri yang mengorkestrasi multi-cloud journey secara aman sesuai standar regulasi OJK.",
    "websiteUrl": "https://www.bankmandiri.co.id"
  },
  {
    "id": "tech-aws-hybrid",
    "nama": "AWS Hybrid Cloud Jakarta Region",
    "vendor": "Amazon Web Services",
    "categoryId": "cat-cloud-infra",
    "tipe": "komersial",
    "deskripsi": "Penyedia cloud publik Jakarta Region untuk workload digital lifestyle non-core dan machine learning di Livin' Sukha.",
    "websiteUrl": "https://aws.amazon.com"
  },
  {
    "id": "tech-vmware-tanzu",
    "nama": "VMware vSphere & Tanzu",
    "vendor": "Broadcom / VMware",
    "categoryId": "cat-cloud-infra",
    "tipe": "komersial",
    "deskripsi": "Fondasi virtualisasi on-premise compute dan modernisasi aplikasi container di data center perbankan.",
    "websiteUrl": "https://www.vmware.com"
  },
  {
    "id": "tech-cisco-ucs",
    "nama": "Cisco UCS Compute & Nexus Switching",
    "vendor": "Cisco Systems",
    "categoryId": "cat-cloud-infra",
    "tipe": "komersial",
    "deskripsi": "Infrastruktur komputasi server x86 terpadu dan switching data center Cisco Nexus 5000/2000 untuk jaringan core banking data center BRI.",
    "websiteUrl": "https://www.cisco.com"
  },
  {
    "id": "tech-bca-datacenter",
    "nama": "BCA Tier III/IV Enterprise Data Center",
    "vendor": "PT Bank Central Asia Tbk",
    "categoryId": "cat-cloud-infra",
    "tipe": "in-house",
    "deskripsi": "Fasilitas data center mandiri bersertifikasi Tier III/IV milik BCA (beroperasi penuh 2025) untuk menjamin redundansi penuh dan zero downtime.",
    "websiteUrl": "https://www.bca.co.id"
  },
  {
    "id": "tech-pojk11-datacenter",
    "nama": "Kepatuhan POJK 11/2022 & Data Residency",
    "vendor": "Otoritas Jasa Keuangan (OJK)",
    "categoryId": "cat-cloud-infra",
    "tipe": "in-house",
    "deskripsi": "Penyelenggaraan teknologi informasi perbankan yang mewajibkan penempatan data center dan disaster recovery center di wilayah Indonesia (onshore).",
    "websiteUrl": "https://www.ojk.go.id"
  },
  {
    "id": "tech-atlassian-itops",
    "nama": "Atlassian Jira Service Management",
    "vendor": "Atlassian / iZeno",
    "categoryId": "cat-devops",
    "tipe": "komersial",
    "deskripsi": "Platform ITSM enterprise untuk incident management, request fulfillment, change enablement, dan integrasi DevOps CI/CD di BRI.",
    "websiteUrl": "https://www.atlassian.com"
  },
  {
    "id": "tech-devsecops-pipeline",
    "nama": "DevSecOps & Ansible Automation CI/CD",
    "vendor": "Red Hat / GitLab / Open Source",
    "categoryId": "cat-devops",
    "tipe": "open-source",
    "deskripsi": "Pipeline automasi deployment, automated testing regression, security testing (SAST/DAST), dan konfigurasi infrastruktur berbasis kode.",
    "websiteUrl": "https://www.ansible.com"
  },
  {
    "id": "tech-gitlab-ci",
    "nama": "GitLab CI/CD Enterprise",
    "vendor": "GitLab Inc.",
    "categoryId": "cat-devops",
    "tipe": "komersial",
    "deskripsi": "Platform DevSecOps all-in-one untuk code repository, security scanning, dan deployment otomatis microservices perbankan.",
    "websiteUrl": "https://about.gitlab.com"
  },
  {
    "id": "tech-dynatrace",
    "nama": "Dynatrace APM (Davis AI Engine)",
    "vendor": "Dynatrace Inc.",
    "categoryId": "cat-devops",
    "tipe": "komersial",
    "deskripsi": "Observability end-to-end full-stack dengan causal AI engine untuk mendeteksi akar masalah performa dan kegagalan transaksi perbankan.",
    "websiteUrl": "https://www.dynatrace.com"
  },
  {
    "id": "tech-elastic-stack",
    "nama": "Elasticsearch, Logstash & Kibana (ELK)",
    "vendor": "Elastic N.V.",
    "categoryId": "cat-devops",
    "tipe": "open-source",
    "deskripsi": "Sentralisasi logging terdistribusi dan pencarian cepat untuk audit trail, analisis performa, dan observability aplikasi.",
    "websiteUrl": "https://www.elastic.co"
  },
  {
    "id": "tech-hashicorp-vault",
    "nama": "HashiCorp Vault Enterprise",
    "vendor": "HashiCorp (IBM)",
    "categoryId": "cat-security",
    "tipe": "komersial",
    "deskripsi": "Manajemen rahasia enterprise, dynamic credentials, enkripsi data-at-rest, dan sertifikat TLS untuk infrastruktur microservices.",
    "websiteUrl": "https://www.vaultproject.io"
  },
  {
    "id": "tech-ai-fraud-monitor",
    "nama": "Real-Time AI Fraud & Risk Analytics",
    "vendor": "In-House & Partner Solution",
    "categoryId": "cat-security",
    "tipe": "in-house",
    "deskripsi": "Sistem deteksi fraud cerdas berbasis machine learning untuk memantau anomali transaksi dan memblokir indikasi rekening judi online.",
    "websiteUrl": "https://www.bi.go.id"
  },
  {
    "id": "tech-lps-guarantee",
    "nama": "Penjaminan Simpanan LPS (UU P2SK)",
    "vendor": "Lembaga Penjamin Simpanan (LPS)",
    "categoryId": "cat-security",
    "tipe": "in-house",
    "deskripsi": "Kepatuhan penjaminan simpanan nasabah hingga batas Rp2 Miliar per nasabah per bank sesuai mandat UU No. 4/2023 (UU P2SK).",
    "websiteUrl": "https://www.lps.go.id"
  },
  {
    "id": "tech-pojk12-digital",
    "nama": "Kepatuhan Regulasi POJK 12/2021 Bank Digital",
    "vendor": "Otoritas Jasa Keuangan (OJK)",
    "categoryId": "cat-security",
    "tipe": "in-house",
    "deskripsi": "Kepatuhan kelembagaan dan operasional penyelenggaraan layanan perbankan digital sesuai POJK 12/POJK.03/2021.",
    "websiteUrl": "https://www.ojk.go.id"
  },
  {
    "id": "tech-uupdp-ai",
    "nama": "Kepatuhan UU PDP 27/2022 & Tata Kelola AI OJK",
    "vendor": "Pemerintah RI / OJK",
    "categoryId": "cat-security",
    "tipe": "in-house",
    "deskripsi": "Kepatuhan perlindungan data pribadi sesuai UU No. 27/2022 serta pedoman etika dan tata kelola pemanfaatan AI dari OJK.",
    "websiteUrl": "https://peraturan.bpk.go.id"
  }
];

export const INITIAL_FINDINGS: Finding[] = [
  {
    "id": "f-bri-kafka",
    "bankId": "bank-bri",
    "technologyId": "tech-confluent-kafka",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-10",
    "tanggalVerifikasi": "2026-02-15",
    "catatan": "Tulang punggung streaming transaksi real-time AgenBRILink & notifikasi BRImo.",
    "evidenceIds": [
      "ev-bri-kafka-1"
    ]
  },
  {
    "id": "f-bri-spark",
    "bankId": "bank-bri",
    "technologyId": "tech-spark",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-10",
    "tanggalVerifikasi": "2026-02-15",
    "catatan": "Distributed computing untuk daily batch underwriting model di BRIBRAIN.",
    "evidenceIds": [
      "ev-bri-spark-1"
    ]
  },
  {
    "id": "f-bri-minio",
    "bankId": "bank-bri",
    "technologyId": "tech-minio",
    "confidence": "Likely",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-02-01",
    "tanggalVerifikasi": "2026-02-20",
    "catatan": "Object storage on-premise untuk penyimpanan berkas e-KTP dan foto nasabah AgenBRILink.",
    "evidenceIds": []
  },
  {
    "id": "f-bri-cassandra",
    "bankId": "bank-bri",
    "technologyId": "tech-cassandra",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-02-10",
    "catatan": "High write throughput database untuk audit trail & riwayat mutasi instan.",
    "evidenceIds": []
  },
  {
    "id": "f-bri-snap",
    "bankId": "bank-bri",
    "technologyId": "tech-snap-portal",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-05",
    "tanggalVerifikasi": "2026-02-01",
    "catatan": "Kepatuhan penuh Standar Nasional Open API Pembayaran (SNAP) Bank Indonesia.",
    "evidenceIds": []
  },
  {
    "id": "f-mdr-aws",
    "bankId": "bank-mandiri",
    "technologyId": "tech-aws-hybrid",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-20",
    "tanggalVerifikasi": "2026-02-25",
    "catatan": "Pemanfaatan AWS Jakarta Region untuk container workload Livin' Sukha lifestyle.",
    "evidenceIds": []
  },
  {
    "id": "f-mdr-ibm-datastage",
    "bankId": "bank-mandiri",
    "technologyId": "tech-ibm-datastage",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-02-10",
    "tanggalVerifikasi": "2026-03-01",
    "catatan": "Enterprise ETL pipeline integrasi data antar unit bisnis wholesale & konsumer Mandiri.",
    "evidenceIds": [
      "ev-mdr-ds-1"
    ]
  },
  {
    "id": "f-mdr-vault",
    "bankId": "bank-mandiri",
    "technologyId": "tech-hashicorp-vault",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-18",
    "tanggalVerifikasi": "2026-02-12",
    "catatan": "Sentralisasi manajemen secret API dan token enkripsi microservices Livin'.",
    "evidenceIds": []
  },
  {
    "id": "f-bni-dynatrace",
    "bankId": "bank-bni",
    "technologyId": "tech-dynatrace",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-12",
    "tanggalVerifikasi": "2026-02-18",
    "catatan": "Pemantauan APM full-stack real-time untuk menjamin SLA super-app wondr.",
    "evidenceIds": []
  },
  {
    "id": "f-btn-openshift",
    "bankId": "bank-btn",
    "technologyId": "tech-redhat-openshift",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-25",
    "tanggalVerifikasi": "2026-02-22",
    "catatan": "Modernisasi platform container portal KPR digital dan ekosistem Bale by BTN.",
    "evidenceIds": []
  },
  {
    "id": "f-bsi-vault",
    "bankId": "bank-bsi",
    "technologyId": "tech-hashicorp-vault",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-02-05",
    "tanggalVerifikasi": "2026-02-28",
    "catatan": "Standardisasi keamanan kredensial pasca penggabungan tiga bank syariah.",
    "evidenceIds": []
  },
  {
    "id": "f-csv-1",
    "bankId": "bank-bri",
    "technologyId": "tech-silverlake-sibs",
    "confidence": "Likely",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Core Banking System (CBS) | Kapabilitas: Core Banking System (CBS) | Merk/Stack: Silverlake SIBS (+ SAP) - indikatif | PIC: Mrs Utami | Status: Inferensi",
    "evidenceIds": [
      "ev-csv-1"
    ]
  },
  {
    "id": "f-csv-2",
    "bankId": "bank-mandiri",
    "technologyId": "tech-silverlake-sibs",
    "confidence": "Likely",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Core Banking System (CBS) | Kapabilitas: Core Banking System (CBS) | Merk/Stack: Silverlake SIBS - indikatif | PIC: Mrs Utami | Status: Inferensi",
    "evidenceIds": [
      "ev-csv-2"
    ]
  },
  {
    "id": "f-csv-3",
    "bankId": "bank-bca",
    "technologyId": "tech-cbs-proprietary",
    "confidence": "Likely",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Core Banking System (CBS) | Kapabilitas: Core Banking System (CBS) | Merk/Stack: Sistem inti proprietary (tdk dipublikasi) | PIC: Mrs Utami | Status: Inferensi",
    "evidenceIds": [
      "ev-csv-3"
    ]
  },
  {
    "id": "f-csv-4",
    "bankId": "bank-bni",
    "technologyId": "tech-tcs-bancs",
    "confidence": "Likely",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Core Banking System (CBS) | Kapabilitas: Core Banking System (CBS) | Merk/Stack: TCS BaNCS - indikatif | PIC: Mrs Utami | Status: Inferensi",
    "evidenceIds": [
      "ev-csv-4"
    ]
  },
  {
    "id": "f-csv-5",
    "bankId": "bank-btn",
    "technologyId": "tech-silverlake-sibs",
    "confidence": "Likely",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Core Banking System (CBS) | Kapabilitas: Core Banking System (CBS) | Merk/Stack: Silverlake SIBS - indikatif | PIC: Mrs Utami | Status: Inferensi",
    "evidenceIds": [
      "ev-csv-5"
    ]
  },
  {
    "id": "f-csv-6",
    "bankId": "bank-bsi",
    "technologyId": "tech-temenos-transact",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Core Banking System (CBS) | Kapabilitas: Core Banking System (CBS) | Merk/Stack: Core migrasi R10->R24 selesai Mei 2026 (penomoran khas Temenos Transact - indikasi Temenos) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-6"
    ]
  },
  {
    "id": "f-csv-7",
    "bankId": "bank-bri",
    "technologyId": "tech-sap-erp",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Core Banking System (CBS) | Kapabilitas: ERP (Enterprise Resource Planning) | Merk/Stack: SAP (ERP - transformasi digital) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-7"
    ]
  },
  {
    "id": "f-csv-8",
    "bankId": "bank-bca",
    "technologyId": "tech-sap-erp",
    "confidence": "Indicative",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Core Banking System (CBS) | Kapabilitas: ERP (Enterprise Resource Planning) | Merk/Stack: SAP ERP ECC 6.0 | PIC: Mrs Utami | Status: Belum",
    "evidenceIds": [
      "ev-csv-8"
    ]
  },
  {
    "id": "f-csv-9",
    "bankId": "bank-bsi",
    "technologyId": "tech-temenos-transact",
    "confidence": "Likely",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Core Banking System (CBS) | Kapabilitas: Modul Core Syariah | Merk/Stack: Temenos T24 syariah - indikatif | PIC: Mrs Utami | Status: Inferensi",
    "evidenceIds": [
      "ev-csv-9"
    ]
  },
  {
    "id": "f-csv-10",
    "bankId": "bank-bri",
    "technologyId": "tech-briapi-apigee",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Core Banking System (CBS) | Kapabilitas: API Management Platform (core/open banking) | Merk/Stack: BRIAPI (open API, PA-DSS) + Google Apigee | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-10"
    ]
  },
  {
    "id": "f-csv-11",
    "bankId": "bank-bca",
    "technologyId": "tech-3scale-apim",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Core Banking System (CBS) | Kapabilitas: API Management Platform (core/open banking) | Merk/Stack: Red Hat 3scale API Management | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-11"
    ]
  },
  {
    "id": "f-csv-12",
    "bankId": "bank-bsi",
    "technologyId": "tech-spring-boot",
    "confidence": "Likely",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Core Banking System (CBS) | Kapabilitas: Bahasa pemrograman core (mis. COBOL/Java) | Merk/Stack: Terkait core Temenos (umumnya Java/jBASE) - inferensi | PIC: Mrs Utami | Status: Inferensi",
    "evidenceIds": [
      "ev-csv-12"
    ]
  },
  {
    "id": "f-csv-13",
    "bankId": "bank-bri",
    "technologyId": "tech-brimo",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Mobile Banking | Kapabilitas: Aplikasi Mobile Banking (super-app) | Merk/Stack: BRImo | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-13"
    ]
  },
  {
    "id": "f-csv-14",
    "bankId": "bank-mandiri",
    "technologyId": "tech-livin-mandiri",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Mobile Banking | Kapabilitas: Aplikasi Mobile Banking (super-app) | Merk/Stack: Livin' by Mandiri | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-14"
    ]
  },
  {
    "id": "f-csv-15",
    "bankId": "bank-bca",
    "technologyId": "tech-mybca",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Mobile Banking | Kapabilitas: Aplikasi Mobile Banking (super-app) | Merk/Stack: myBCA / BCA mobile | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-15"
    ]
  },
  {
    "id": "f-csv-16",
    "bankId": "bank-bni",
    "technologyId": "tech-wondr-bni",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Mobile Banking | Kapabilitas: Aplikasi Mobile Banking (super-app) | Merk/Stack: wondr by BNI | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-16"
    ]
  },
  {
    "id": "f-csv-17",
    "bankId": "bank-btn",
    "technologyId": "tech-bale-btn",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Mobile Banking | Kapabilitas: Aplikasi Mobile Banking (super-app) | Merk/Stack: Bale by BTN | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-17"
    ]
  },
  {
    "id": "f-csv-18",
    "bankId": "bank-bsi",
    "technologyId": "tech-byond-bsi",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Mobile Banking | Kapabilitas: Aplikasi Mobile Banking (super-app) | Merk/Stack: Byond by BSI | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-18"
    ]
  },
  {
    "id": "f-csv-19",
    "bankId": "bank-bni",
    "technologyId": "tech-bni-ai-kyc",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Mobile Banking | Kapabilitas: e-KYC / digital onboarding (Dukcapil, liveness) | Merk/Stack: AI-KYC (uji coba: review dokumen 5 hari -> jam) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-19"
    ]
  },
  {
    "id": "f-csv-20",
    "bankId": "bank-bri",
    "technologyId": "tech-qris-payment",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Mobile Banking | Kapabilitas: Modul pembayaran QRIS | Merk/Stack: Mendukung QRIS (sebagian + QRIS Tap/cross-border) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-20"
    ]
  },
  {
    "id": "f-csv-21",
    "bankId": "bank-mandiri",
    "technologyId": "tech-qris-payment",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Mobile Banking | Kapabilitas: Modul pembayaran QRIS | Merk/Stack: Mendukung QRIS (sebagian + QRIS Tap/cross-border) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-21"
    ]
  },
  {
    "id": "f-csv-22",
    "bankId": "bank-bca",
    "technologyId": "tech-qris-payment",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Mobile Banking | Kapabilitas: Modul pembayaran QRIS | Merk/Stack: Mendukung QRIS (sebagian + QRIS Tap/cross-border) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-22"
    ]
  },
  {
    "id": "f-csv-23",
    "bankId": "bank-bni",
    "technologyId": "tech-qris-payment",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Mobile Banking | Kapabilitas: Modul pembayaran QRIS | Merk/Stack: Mendukung QRIS (sebagian + QRIS Tap/cross-border) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-23"
    ]
  },
  {
    "id": "f-csv-24",
    "bankId": "bank-btn",
    "technologyId": "tech-qris-payment",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Mobile Banking | Kapabilitas: Modul pembayaran QRIS | Merk/Stack: Mendukung QRIS (sebagian + QRIS Tap/cross-border) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-24"
    ]
  },
  {
    "id": "f-csv-25",
    "bankId": "bank-bsi",
    "technologyId": "tech-qris-payment",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Mobile Banking | Kapabilitas: Modul pembayaran QRIS | Merk/Stack: Mendukung QRIS (sebagian + QRIS Tap/cross-border) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-25"
    ]
  },
  {
    "id": "f-csv-26",
    "bankId": "bank-bri",
    "technologyId": "tech-bifast-engine",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Mobile Banking | Kapabilitas: Integrasi BI-FAST | Merk/Stack: Peserta BI-FAST (transfer Rp2.500) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-26"
    ]
  },
  {
    "id": "f-csv-27",
    "bankId": "bank-mandiri",
    "technologyId": "tech-bifast-engine",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Mobile Banking | Kapabilitas: Integrasi BI-FAST | Merk/Stack: Peserta BI-FAST (transfer Rp2.500) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-27"
    ]
  },
  {
    "id": "f-csv-28",
    "bankId": "bank-bca",
    "technologyId": "tech-bifast-engine",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Mobile Banking | Kapabilitas: Integrasi BI-FAST | Merk/Stack: Peserta BI-FAST (transfer Rp2.500) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-28"
    ]
  },
  {
    "id": "f-csv-29",
    "bankId": "bank-bni",
    "technologyId": "tech-bifast-engine",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Mobile Banking | Kapabilitas: Integrasi BI-FAST | Merk/Stack: Peserta BI-FAST (transfer Rp2.500) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-29"
    ]
  },
  {
    "id": "f-csv-30",
    "bankId": "bank-btn",
    "technologyId": "tech-bifast-engine",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Mobile Banking | Kapabilitas: Integrasi BI-FAST | Merk/Stack: Peserta BI-FAST (transfer Rp2.500) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-30"
    ]
  },
  {
    "id": "f-csv-31",
    "bankId": "bank-bsi",
    "technologyId": "tech-bifast-engine",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Mobile Banking | Kapabilitas: Integrasi BI-FAST | Merk/Stack: Peserta BI-FAST (transfer Rp2.500) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-31"
    ]
  },
  {
    "id": "f-csv-32",
    "bankId": "bank-bri",
    "technologyId": "tech-bri-sabrina",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Mobile Banking | Kapabilitas: Chatbot / virtual assistant in-app | Merk/Stack: Sabrina (chatbot AI) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-32"
    ]
  },
  {
    "id": "f-csv-33",
    "bankId": "bank-mandiri",
    "technologyId": "tech-mandiri-mita",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Mobile Banking | Kapabilitas: Chatbot / virtual assistant in-app | Merk/Stack: MITA (via WhatsApp/Line/Telegram) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-33"
    ]
  },
  {
    "id": "f-csv-34",
    "bankId": "bank-bri",
    "technologyId": "tech-brimo",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Mobile Banking | Kapabilitas: Manajemen rating & review app | Merk/Stack: BRImo 4,7 (Play, ~1 jt rating) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-34"
    ]
  },
  {
    "id": "f-csv-35",
    "bankId": "bank-mandiri",
    "technologyId": "tech-livin-mandiri",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Mobile Banking | Kapabilitas: Manajemen rating & review app | Merk/Stack: Livin' 4,1 headline / ~3,5 agregator (710rb) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-35"
    ]
  },
  {
    "id": "f-csv-36",
    "bankId": "bank-bca",
    "technologyId": "tech-mybca",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Mobile Banking | Kapabilitas: Manajemen rating & review app | Merk/Stack: myBCA/M-BCA 4,4-4,1 | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-36"
    ]
  },
  {
    "id": "f-csv-37",
    "bankId": "bank-bni",
    "technologyId": "tech-wondr-bni",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Mobile Banking | Kapabilitas: Manajemen rating & review app | Merk/Stack: wondr - rating cukup baik (app baru) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-37"
    ]
  },
  {
    "id": "f-csv-38",
    "bankId": "bank-btn",
    "technologyId": "tech-bale-btn",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Mobile Banking | Kapabilitas: Manajemen rating & review app | Merk/Stack: Bale - app baru 2024 | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-38"
    ]
  },
  {
    "id": "f-csv-39",
    "bankId": "bank-bsi",
    "technologyId": "tech-byond-bsi",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Mobile Banking | Kapabilitas: Manajemen rating & review app | Merk/Stack: Byond - 10 jt+ user (Mei 2026); availability 99,99% | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-39"
    ]
  },
  {
    "id": "f-csv-40",
    "bankId": "bank-bri",
    "technologyId": "tech-qlola-bri",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Internet Banking | Kapabilitas: Portal Internet Banking korporasi/wholesale | Merk/Stack: QLola by BRI (single sign-on wholesale) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-40"
    ]
  },
  {
    "id": "f-csv-41",
    "bankId": "bank-mandiri",
    "technologyId": "tech-kopra-mandiri",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Internet Banking | Kapabilitas: Portal Internet Banking korporasi/wholesale | Merk/Stack: Kopra by Mandiri | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-41"
    ]
  },
  {
    "id": "f-csv-42",
    "bankId": "bank-bni",
    "technologyId": "tech-bnidirect",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Internet Banking | Kapabilitas: Portal Internet Banking korporasi/wholesale | Merk/Stack: BNIdirect | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-42"
    ]
  },
  {
    "id": "f-csv-43",
    "bankId": "bank-bsi",
    "technologyId": "tech-bewize-bsi",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Internet Banking | Kapabilitas: Portal Internet Banking korporasi/wholesale | Merk/Stack: BEWIZE by BSI | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-43"
    ]
  },
  {
    "id": "f-csv-44",
    "bankId": "bank-bri",
    "technologyId": "tech-qlola-bri",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Internet Banking | Kapabilitas: Cash Management System (CMS) | Merk/Stack: QLola CMS | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-44"
    ]
  },
  {
    "id": "f-csv-45",
    "bankId": "bank-mandiri",
    "technologyId": "tech-kopra-mandiri",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Internet Banking | Kapabilitas: Cash Management System (CMS) | Merk/Stack: Kopra Cash Management | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-45"
    ]
  },
  {
    "id": "f-csv-46",
    "bankId": "bank-bni",
    "technologyId": "tech-bnidirect",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Internet Banking | Kapabilitas: Cash Management System (CMS) | Merk/Stack: BNIdirect Cash Mgmt | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-46"
    ]
  },
  {
    "id": "f-csv-47",
    "bankId": "bank-bri",
    "technologyId": "tech-qlola-bri",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Internet Banking | Kapabilitas: Trade finance portal (LC/guarantee) | Merk/Stack: QLola Trade Finance | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-47"
    ]
  },
  {
    "id": "f-csv-48",
    "bankId": "bank-mandiri",
    "technologyId": "tech-kopra-mandiri",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Internet Banking | Kapabilitas: Trade finance portal (LC/guarantee) | Merk/Stack: Kopra Trade | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-48"
    ]
  },
  {
    "id": "f-csv-49",
    "bankId": "bank-bri",
    "technologyId": "tech-qlola-bri",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Internet Banking | Kapabilitas: Supply chain finance platform | Merk/Stack: QLola Supply Chain Management | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-49"
    ]
  },
  {
    "id": "f-csv-50",
    "bankId": "bank-bri",
    "technologyId": "tech-briapi-apigee",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Internet Banking | Kapabilitas: API banking korporasi (open API) | Merk/Stack: BRIAPI (open API, PA-DSS) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-50"
    ]
  },
  {
    "id": "f-csv-51",
    "bankId": "bank-bri",
    "technologyId": "tech-bank-raya",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Digital Banking | Kapabilitas: Aplikasi mobile-first | Merk/Stack: Bank Raya (eks BRI Agro) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-51"
    ]
  },
  {
    "id": "f-csv-52",
    "bankId": "bank-bca",
    "technologyId": "tech-blu-bca",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Digital Banking | Kapabilitas: Aplikasi mobile-first | Merk/Stack: Blu by BCA Digital | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-52"
    ]
  },
  {
    "id": "f-csv-53",
    "bankId": "bank-bni",
    "technologyId": "tech-hibank-bni",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Digital Banking | Kapabilitas: Aplikasi mobile-first | Merk/Stack: Hibank (digital, segmen UMKM) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-53"
    ]
  },
  {
    "id": "f-csv-54",
    "bankId": "bank-bsi",
    "technologyId": "tech-byond-bsi",
    "confidence": "Likely",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Digital Banking | Kapabilitas: Aplikasi mobile-first | Merk/Stack: Byond (mobile BSI) | PIC: Mrs Utami | Status: Inferensi",
    "evidenceIds": [
      "ev-csv-54"
    ]
  },
  {
    "id": "f-csv-55",
    "bankId": "bank-bri",
    "technologyId": "tech-qris-payment",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Digital Banking | Kapabilitas: QRIS / pembayaran | Merk/Stack: Mendukung QRIS | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-55"
    ]
  },
  {
    "id": "f-csv-56",
    "bankId": "bank-mandiri",
    "technologyId": "tech-qris-payment",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Digital Banking | Kapabilitas: QRIS / pembayaran | Merk/Stack: Mendukung QRIS | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-56"
    ]
  },
  {
    "id": "f-csv-57",
    "bankId": "bank-bca",
    "technologyId": "tech-qris-payment",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Digital Banking | Kapabilitas: QRIS / pembayaran | Merk/Stack: Mendukung QRIS | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-57"
    ]
  },
  {
    "id": "f-csv-58",
    "bankId": "bank-bni",
    "technologyId": "tech-qris-payment",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Digital Banking | Kapabilitas: QRIS / pembayaran | Merk/Stack: Mendukung QRIS | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-58"
    ]
  },
  {
    "id": "f-csv-59",
    "bankId": "bank-btn",
    "technologyId": "tech-qris-payment",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Digital Banking | Kapabilitas: QRIS / pembayaran | Merk/Stack: Mendukung QRIS | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-59"
    ]
  },
  {
    "id": "f-csv-60",
    "bankId": "bank-bsi",
    "technologyId": "tech-qris-payment",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Digital Banking | Kapabilitas: QRIS / pembayaran | Merk/Stack: Mendukung QRIS | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-60"
    ]
  },
  {
    "id": "f-csv-61",
    "bankId": "bank-bri",
    "technologyId": "tech-lps-guarantee",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Digital Banking | Kapabilitas: Pelaporan penjaminan LPS | Merk/Stack: Simpanan dijamin LPS s/d Rp2 M | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-61"
    ]
  },
  {
    "id": "f-csv-62",
    "bankId": "bank-mandiri",
    "technologyId": "tech-lps-guarantee",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Digital Banking | Kapabilitas: Pelaporan penjaminan LPS | Merk/Stack: Simpanan dijamin LPS s/d Rp2 M | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-62"
    ]
  },
  {
    "id": "f-csv-63",
    "bankId": "bank-bca",
    "technologyId": "tech-lps-guarantee",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Digital Banking | Kapabilitas: Pelaporan penjaminan LPS | Merk/Stack: Simpanan dijamin LPS s/d Rp2 M | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-63"
    ]
  },
  {
    "id": "f-csv-64",
    "bankId": "bank-bni",
    "technologyId": "tech-lps-guarantee",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Digital Banking | Kapabilitas: Pelaporan penjaminan LPS | Merk/Stack: Simpanan dijamin LPS s/d Rp2 M | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-64"
    ]
  },
  {
    "id": "f-csv-65",
    "bankId": "bank-btn",
    "technologyId": "tech-lps-guarantee",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Digital Banking | Kapabilitas: Pelaporan penjaminan LPS | Merk/Stack: Simpanan dijamin LPS s/d Rp2 M | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-65"
    ]
  },
  {
    "id": "f-csv-66",
    "bankId": "bank-bsi",
    "technologyId": "tech-lps-guarantee",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Digital Banking | Kapabilitas: Pelaporan penjaminan LPS | Merk/Stack: Simpanan dijamin LPS s/d Rp2 M | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-66"
    ]
  },
  {
    "id": "f-csv-67",
    "bankId": "bank-bri",
    "technologyId": "tech-google-cloud",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Digital Banking | Kapabilitas: Infrastruktur cloud | Merk/Stack: Bank Raya di Google Cloud (primary) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-67"
    ]
  },
  {
    "id": "f-csv-68",
    "bankId": "bank-bri",
    "technologyId": "tech-pojk12-digital",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Digital Banking | Kapabilitas: Kepatuhan POJK bank digital | Merk/Stack: Tunduk POJK 12/2021 (semua bank umum) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-68"
    ]
  },
  {
    "id": "f-csv-69",
    "bankId": "bank-mandiri",
    "technologyId": "tech-pojk12-digital",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Digital Banking | Kapabilitas: Kepatuhan POJK bank digital | Merk/Stack: Tunduk POJK 12/2021 (semua bank umum) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-69"
    ]
  },
  {
    "id": "f-csv-70",
    "bankId": "bank-bca",
    "technologyId": "tech-pojk12-digital",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Digital Banking | Kapabilitas: Kepatuhan POJK bank digital | Merk/Stack: Tunduk POJK 12/2021 (semua bank umum) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-70"
    ]
  },
  {
    "id": "f-csv-71",
    "bankId": "bank-bni",
    "technologyId": "tech-pojk12-digital",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Digital Banking | Kapabilitas: Kepatuhan POJK bank digital | Merk/Stack: Tunduk POJK 12/2021 (semua bank umum) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-71"
    ]
  },
  {
    "id": "f-csv-72",
    "bankId": "bank-btn",
    "technologyId": "tech-pojk12-digital",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Digital Banking | Kapabilitas: Kepatuhan POJK bank digital | Merk/Stack: Tunduk POJK 12/2021 (semua bank umum) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-72"
    ]
  },
  {
    "id": "f-csv-73",
    "bankId": "bank-bsi",
    "technologyId": "tech-pojk12-digital",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS1] Domain: Digital Banking | Kapabilitas: Kepatuhan POJK bank digital | Merk/Stack: Tunduk POJK 12/2021 (semua bank umum) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-73"
    ]
  },
  {
    "id": "f-csv-74",
    "bankId": "bank-bri",
    "technologyId": "tech-bribrain",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS2] Domain: Enterprise Data Warehouse (EDW) | Kapabilitas: Data Lake | Merk/Stack: BRIBRAIN data platform (big data) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-74"
    ]
  },
  {
    "id": "f-csv-75",
    "bankId": "bank-mandiri",
    "technologyId": "tech-cloudera-eidp",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS2] Domain: Enterprise Data Warehouse (EDW) | Kapabilitas: Data Lake | Merk/Stack: Cloudera (EIDP) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-75"
    ]
  },
  {
    "id": "f-csv-76",
    "bankId": "bank-bca",
    "technologyId": "tech-cloudera-eidp",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS2] Domain: Enterprise Data Warehouse (EDW) | Kapabilitas: Data Lake | Merk/Stack: Cloudera (data & AI platform) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-76"
    ]
  },
  {
    "id": "f-csv-77",
    "bankId": "bank-bni",
    "technologyId": "tech-cloudera-eidp",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS2] Domain: Enterprise Data Warehouse (EDW) | Kapabilitas: Data Lake | Merk/Stack: Cloudera | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-77"
    ]
  },
  {
    "id": "f-csv-78",
    "bankId": "bank-mandiri",
    "technologyId": "tech-iceberg-lakehouse",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS2] Domain: Enterprise Data Warehouse (EDW) | Kapabilitas: Lakehouse platform | Merk/Stack: Cloudera CDP (Hadoop) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-78"
    ]
  },
  {
    "id": "f-csv-79",
    "bankId": "bank-bni",
    "technologyId": "tech-iceberg-lakehouse",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS2] Domain: Enterprise Data Warehouse (EDW) | Kapabilitas: Lakehouse platform | Merk/Stack: Cloudera Data Services (open lakehouse, Iceberg) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-79"
    ]
  },
  {
    "id": "f-csv-80",
    "bankId": "bank-bni",
    "technologyId": "tech-iceberg-lakehouse",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS2] Domain: Enterprise Data Warehouse (EDW) | Kapabilitas: Table format (Iceberg/Delta/Hudi) | Merk/Stack: Apache Iceberg (open lakehouse) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-80"
    ]
  },
  {
    "id": "f-csv-81",
    "bankId": "bank-bri",
    "technologyId": "tech-bribrain",
    "confidence": "Likely",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS2] Domain: Master Data Management (MDM) | Kapabilitas: Customer 360 / Single Customer View | Merk/Stack: Inisiatif single master data customer (studi akademik) | PIC: Mrs Utami | Status: Inferensi",
    "evidenceIds": [
      "ev-csv-81"
    ]
  },
  {
    "id": "f-csv-82",
    "bankId": "bank-mandiri",
    "technologyId": "tech-cloudera-eidp",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS2] Domain: Master Data Management (MDM) | Kapabilitas: Customer 360 / Single Customer View | Merk/Stack: Single source of truth via EIDP (Cloudera) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-82"
    ]
  },
  {
    "id": "f-csv-83",
    "bankId": "bank-mandiri",
    "technologyId": "tech-cloudera-eidp",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS2] Domain: Master Data Management (MDM) | Kapabilitas: Data stewardship workflow | Merk/Stack: Enterprise Data Management Group + data coaches | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-83"
    ]
  },
  {
    "id": "f-csv-84",
    "bankId": "bank-mandiri",
    "technologyId": "tech-cloudera-eidp",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS2] Domain: Master Data Management (MDM) | Kapabilitas: Data governance platform | Merk/Stack: IT/Data Governance framework (annual report) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-84"
    ]
  },
  {
    "id": "f-csv-85",
    "bankId": "bank-mandiri",
    "technologyId": "tech-tableau-bi",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS2] Domain: Business Intelligence (BI) | Kapabilitas: Platform BI / visualisasi | Merk/Stack: Tableau | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-85"
    ]
  },
  {
    "id": "f-csv-86",
    "bankId": "bank-mandiri",
    "technologyId": "tech-tableau-bi",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS2] Domain: Business Intelligence (BI) | Kapabilitas: Self-service analytics | Merk/Stack: Cloudera Data Science Workbench (CDSW) + Tableau | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-86"
    ]
  },
  {
    "id": "f-csv-87",
    "bankId": "bank-mandiri",
    "technologyId": "tech-tableau-bi",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS2] Domain: Business Intelligence (BI) | Kapabilitas: Dashboard & scorecard | Merk/Stack: Tableau dashboards | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-87"
    ]
  },
  {
    "id": "f-csv-88",
    "bankId": "bank-bri",
    "technologyId": "tech-google-cloud",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS3] Domain: Cloud Technology | Kapabilitas: Public cloud (IaaS) | Merk/Stack: Google Cloud (+ partner iZeno) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-88"
    ]
  },
  {
    "id": "f-csv-89",
    "bankId": "bank-mandiri",
    "technologyId": "tech-mandiri-cloud",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS3] Domain: Cloud Technology | Kapabilitas: Public cloud (IaaS) | Merk/Stack: Mandiri Cloud (private) + multi-cloud journey | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-89"
    ]
  },
  {
    "id": "f-csv-90",
    "bankId": "bank-bni",
    "technologyId": "tech-google-cloud",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS3] Domain: Cloud Technology | Kapabilitas: Public cloud (IaaS) | Merk/Stack: Mengadopsi layanan cloud (vendor belum dirinci publik) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-90"
    ]
  },
  {
    "id": "f-csv-91",
    "bankId": "bank-mandiri",
    "technologyId": "tech-mandiri-cloud",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS3] Domain: Cloud Technology | Kapabilitas: Private cloud platform | Merk/Stack: Mandiri Cloud (platform internal) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-91"
    ]
  },
  {
    "id": "f-csv-92",
    "bankId": "bank-bri",
    "technologyId": "tech-google-cloud",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS3] Domain: Cloud Technology | Kapabilitas: Hybrid cloud management | Merk/Stack: Strategi hybrid cloud (era Indra Utoyo; + Google Cloud) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-92"
    ]
  },
  {
    "id": "f-csv-93",
    "bankId": "bank-mandiri",
    "technologyId": "tech-mandiri-cloud",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS3] Domain: Cloud Technology | Kapabilitas: Multi-cloud management | Merk/Stack: Mandiri Cloud - multi-cloud journey | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-93"
    ]
  },
  {
    "id": "f-csv-94",
    "bankId": "bank-bri",
    "technologyId": "tech-redhat-openshift",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS3] Domain: Cloud Technology | Kapabilitas: Container orchestration (K8s/OpenShift) | Merk/Stack: Red Hat OpenShift | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-94"
    ]
  },
  {
    "id": "f-csv-95",
    "bankId": "bank-mandiri",
    "technologyId": "tech-redhat-openshift",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS3] Domain: Cloud Technology | Kapabilitas: Container orchestration (K8s/OpenShift) | Merk/Stack: Red Hat OpenShift | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-95"
    ]
  },
  {
    "id": "f-csv-96",
    "bankId": "bank-bca",
    "technologyId": "tech-redhat-openshift",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS3] Domain: Cloud Technology | Kapabilitas: Container orchestration (K8s/OpenShift) | Merk/Stack: Red Hat OpenShift + 3scale | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-96"
    ]
  },
  {
    "id": "f-csv-97",
    "bankId": "bank-bri",
    "technologyId": "tech-redhat-openshift",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS3] Domain: Cloud Technology | Kapabilitas: PaaS platform | Merk/Stack: Red Hat OpenShift (PaaS) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-97"
    ]
  },
  {
    "id": "f-csv-98",
    "bankId": "bank-mandiri",
    "technologyId": "tech-redhat-openshift",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS3] Domain: Cloud Technology | Kapabilitas: PaaS platform | Merk/Stack: Red Hat OpenShift (PaaS) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-98"
    ]
  },
  {
    "id": "f-csv-99",
    "bankId": "bank-bca",
    "technologyId": "tech-redhat-openshift",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS3] Domain: Cloud Technology | Kapabilitas: PaaS platform | Merk/Stack: Red Hat OpenShift (PaaS) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-99"
    ]
  },
  {
    "id": "f-csv-100",
    "bankId": "bank-bri",
    "technologyId": "tech-devsecops-pipeline",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS3] Domain: Cloud Technology | Kapabilitas: GitOps / CD | Merk/Stack: DevOps/CD (kolaborasi iZeno di Google Cloud) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-100"
    ]
  },
  {
    "id": "f-csv-101",
    "bankId": "bank-bri",
    "technologyId": "tech-pojk11-datacenter",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS3] Domain: Cloud Technology | Kapabilitas: Data residency / sovereign cloud | Merk/Stack: Wajib ikut ketentuan data onshore OJK (POJK 11/2022) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-101"
    ]
  },
  {
    "id": "f-csv-102",
    "bankId": "bank-mandiri",
    "technologyId": "tech-pojk11-datacenter",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS3] Domain: Cloud Technology | Kapabilitas: Data residency / sovereign cloud | Merk/Stack: Wajib ikut ketentuan data onshore OJK (POJK 11/2022) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-102"
    ]
  },
  {
    "id": "f-csv-103",
    "bankId": "bank-bca",
    "technologyId": "tech-pojk11-datacenter",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS3] Domain: Cloud Technology | Kapabilitas: Data residency / sovereign cloud | Merk/Stack: Wajib ikut ketentuan data onshore OJK (POJK 11/2022) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-103"
    ]
  },
  {
    "id": "f-csv-104",
    "bankId": "bank-bni",
    "technologyId": "tech-pojk11-datacenter",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS3] Domain: Cloud Technology | Kapabilitas: Data residency / sovereign cloud | Merk/Stack: Wajib ikut ketentuan data onshore OJK (POJK 11/2022) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-104"
    ]
  },
  {
    "id": "f-csv-105",
    "bankId": "bank-btn",
    "technologyId": "tech-pojk11-datacenter",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS3] Domain: Cloud Technology | Kapabilitas: Data residency / sovereign cloud | Merk/Stack: Wajib ikut ketentuan data onshore OJK (POJK 11/2022) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-105"
    ]
  },
  {
    "id": "f-csv-106",
    "bankId": "bank-bsi",
    "technologyId": "tech-pojk11-datacenter",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS3] Domain: Cloud Technology | Kapabilitas: Data residency / sovereign cloud | Merk/Stack: Wajib ikut ketentuan data onshore OJK (POJK 11/2022) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-106"
    ]
  },
  {
    "id": "f-csv-107",
    "bankId": "bank-bca",
    "technologyId": "tech-bca-datacenter",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS3] Domain: Cloud Technology | Kapabilitas: Data center (Tier III/IV) / colo | Merk/Stack: Data center BCA sendiri (beroperasi 2025) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-107"
    ]
  },
  {
    "id": "f-csv-108",
    "bankId": "bank-bri",
    "technologyId": "tech-pojk11-datacenter",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS3] Domain: Cloud Technology | Kapabilitas: Persetujuan cloud regulator (POJK) | Merk/Stack: Tunduk POJK 11/2022 (penyelenggaraan TI bank) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-108"
    ]
  },
  {
    "id": "f-csv-109",
    "bankId": "bank-mandiri",
    "technologyId": "tech-pojk11-datacenter",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS3] Domain: Cloud Technology | Kapabilitas: Persetujuan cloud regulator (POJK) | Merk/Stack: Tunduk POJK 11/2022 (penyelenggaraan TI bank) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-109"
    ]
  },
  {
    "id": "f-csv-110",
    "bankId": "bank-bca",
    "technologyId": "tech-pojk11-datacenter",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS3] Domain: Cloud Technology | Kapabilitas: Persetujuan cloud regulator (POJK) | Merk/Stack: Tunduk POJK 11/2022 (penyelenggaraan TI bank) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-110"
    ]
  },
  {
    "id": "f-csv-111",
    "bankId": "bank-bni",
    "technologyId": "tech-pojk11-datacenter",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS3] Domain: Cloud Technology | Kapabilitas: Persetujuan cloud regulator (POJK) | Merk/Stack: Tunduk POJK 11/2022 (penyelenggaraan TI bank) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-111"
    ]
  },
  {
    "id": "f-csv-112",
    "bankId": "bank-btn",
    "technologyId": "tech-pojk11-datacenter",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS3] Domain: Cloud Technology | Kapabilitas: Persetujuan cloud regulator (POJK) | Merk/Stack: Tunduk POJK 11/2022 (penyelenggaraan TI bank) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-112"
    ]
  },
  {
    "id": "f-csv-113",
    "bankId": "bank-bsi",
    "technologyId": "tech-pojk11-datacenter",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS3] Domain: Cloud Technology | Kapabilitas: Persetujuan cloud regulator (POJK) | Merk/Stack: Tunduk POJK 11/2022 (penyelenggaraan TI bank) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-113"
    ]
  },
  {
    "id": "f-csv-114",
    "bankId": "bank-bri",
    "technologyId": "tech-cisco-ucs",
    "confidence": "Likely",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS3] Domain: Infrastructure | Kapabilitas: Server compute (x86) | Merk/Stack: Cisco UCS (konsolidasi server) - c.2013, indikatif | PIC: Mrs Utami | Status: Inferensi",
    "evidenceIds": [
      "ev-csv-114"
    ]
  },
  {
    "id": "f-csv-115",
    "bankId": "bank-bri",
    "technologyId": "tech-cisco-ucs",
    "confidence": "Likely",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS3] Domain: Infrastructure | Kapabilitas: Virtualization platform | Merk/Stack: Cisco UCS + virtualisasi server - c.2013, indikatif | PIC: Mrs Utami | Status: Inferensi",
    "evidenceIds": [
      "ev-csv-115"
    ]
  },
  {
    "id": "f-csv-116",
    "bankId": "bank-bri",
    "technologyId": "tech-redhat-openshift",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS3] Domain: Infrastructure | Kapabilitas: Container platform | Merk/Stack: Red Hat OpenShift | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-116"
    ]
  },
  {
    "id": "f-csv-117",
    "bankId": "bank-mandiri",
    "technologyId": "tech-redhat-openshift",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS3] Domain: Infrastructure | Kapabilitas: Container platform | Merk/Stack: Red Hat OpenShift | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-117"
    ]
  },
  {
    "id": "f-csv-118",
    "bankId": "bank-bca",
    "technologyId": "tech-redhat-openshift",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS3] Domain: Infrastructure | Kapabilitas: Container platform | Merk/Stack: Red Hat OpenShift + 3scale | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-118"
    ]
  },
  {
    "id": "f-csv-119",
    "bankId": "bank-bri",
    "technologyId": "tech-golang",
    "confidence": "Likely",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS3] Domain: Infrastructure | Kapabilitas: Bahasa pemrograman backend (Java/Go/Node) | Merk/Stack: Java & Go (indikasi lowongan) | PIC: Mrs Utami | Status: Inferensi",
    "evidenceIds": [
      "ev-csv-119"
    ]
  },
  {
    "id": "f-csv-120",
    "bankId": "bank-mandiri",
    "technologyId": "tech-golang",
    "confidence": "Likely",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS3] Domain: Infrastructure | Kapabilitas: Bahasa pemrograman backend (Java/Go/Node) | Merk/Stack: Java & Go (indikasi lowongan) | PIC: Mrs Utami | Status: Inferensi",
    "evidenceIds": [
      "ev-csv-120"
    ]
  },
  {
    "id": "f-csv-121",
    "bankId": "bank-bri",
    "technologyId": "tech-cisco-ucs",
    "confidence": "Likely",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS3] Domain: Network | Kapabilitas: Core router/switch | Merk/Stack: Cisco Nexus 5000/2000 (data center) - c.2013, indikatif | PIC: Mrs Utami | Status: Inferensi",
    "evidenceIds": [
      "ev-csv-121"
    ]
  },
  {
    "id": "f-csv-122",
    "bankId": "bank-bri",
    "technologyId": "tech-atlassian-itops",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS3] Domain: IT Support (ITSM) | Kapabilitas: ITSM platform | Merk/Stack: Atlassian (Jira Service Management) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-122"
    ]
  },
  {
    "id": "f-csv-123",
    "bankId": "bank-bri",
    "technologyId": "tech-devsecops-pipeline",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS3] Domain: IT Support (ITSM) | Kapabilitas: CI/CD pipeline (Jenkins/GitLab CI/Argo) | Merk/Stack: DevOps/CI-CD di Google Cloud (kolaborasi iZeno) + Atlassian | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-123"
    ]
  },
  {
    "id": "f-csv-124",
    "bankId": "bank-mandiri",
    "technologyId": "tech-devsecops-pipeline",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS3] Domain: IT Support (ITSM) | Kapabilitas: CI/CD pipeline (Jenkins/GitLab CI/Argo) | Merk/Stack: DevSecOps di pipeline Livin' (OpenShift) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-124"
    ]
  },
  {
    "id": "f-csv-125",
    "bankId": "bank-bca",
    "technologyId": "tech-devsecops-pipeline",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS3] Domain: IT Support (ITSM) | Kapabilitas: CI/CD pipeline (Jenkins/GitLab CI/Argo) | Merk/Stack: CI/CD + DevSecOps di OpenShift; Ansible Automation | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-125"
    ]
  },
  {
    "id": "f-csv-126",
    "bankId": "bank-bca",
    "technologyId": "tech-devsecops-pipeline",
    "confidence": "Likely",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS3] Domain: IT Support (ITSM) | Kapabilitas: Automation testing (functional/regression) | Merk/Stack: Automation testing (bagian DevSecOps/CI-CD) - inferensi | PIC: Mrs Utami | Status: Inferensi",
    "evidenceIds": [
      "ev-csv-126"
    ]
  },
  {
    "id": "f-csv-127",
    "bankId": "bank-mandiri",
    "technologyId": "tech-devsecops-pipeline",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS3] Domain: IT Support (ITSM) | Kapabilitas: DevSecOps / security testing (SAST/DAST) | Merk/Stack: DevSecOps di pipeline Livin' | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-127"
    ]
  },
  {
    "id": "f-csv-128",
    "bankId": "bank-bca",
    "technologyId": "tech-devsecops-pipeline",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS3] Domain: IT Support (ITSM) | Kapabilitas: DevSecOps / security testing (SAST/DAST) | Merk/Stack: DevSecOps + CI/CD (OpenShift) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-128"
    ]
  },
  {
    "id": "f-csv-129",
    "bankId": "bank-bri",
    "technologyId": "tech-ai-fraud-monitor",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS4] Domain: Big Data Analytics | Kapabilitas: Fraud detection system | Merk/Stack: BRIBRAIN anti-fraud & risk analytics | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-129"
    ]
  },
  {
    "id": "f-csv-130",
    "bankId": "bank-bni",
    "technologyId": "tech-ai-fraud-monitor",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS4] Domain: Big Data Analytics | Kapabilitas: Fraud detection system | Merk/Stack: AI monitoring transaksi (blokir indikasi judi online) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-130"
    ]
  },
  {
    "id": "f-csv-131",
    "bankId": "bank-bri",
    "technologyId": "tech-bribrain",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS4] Domain: Big Data Analytics | Kapabilitas: Credit scoring engine | Merk/Stack: BRIBRAIN credit underwriting | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-131"
    ]
  },
  {
    "id": "f-csv-132",
    "bankId": "bank-mandiri",
    "technologyId": "tech-bribrain",
    "confidence": "Likely",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS4] Domain: Big Data Analytics | Kapabilitas: Credit scoring engine | Merk/Stack: AI credit scoring (open finance: data e-commerce/pajak/pulsa) | PIC: Mrs Utami | Status: Inferensi",
    "evidenceIds": [
      "ev-csv-132"
    ]
  },
  {
    "id": "f-csv-133",
    "bankId": "bank-bri",
    "technologyId": "tech-bribrain",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS4] Domain: Big Data Analytics | Kapabilitas: Recommendation engine | Merk/Stack: BRIBRAIN recommendation system | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-133"
    ]
  },
  {
    "id": "f-csv-134",
    "bankId": "bank-bni",
    "technologyId": "tech-bribrain",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS4] Domain: Big Data Analytics | Kapabilitas: Recommendation engine | Merk/Stack: ML product recommendation (real-time) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-134"
    ]
  },
  {
    "id": "f-csv-135",
    "bankId": "bank-bca",
    "technologyId": "tech-cloudera-ai",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS4] Domain: Big Data Analytics | Kapabilitas: Data science platform | Merk/Stack: Cloudera AI Workbench | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-135"
    ]
  },
  {
    "id": "f-csv-136",
    "bankId": "bank-bri",
    "technologyId": "tech-golang",
    "confidence": "Likely",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS4] Domain: Big Data Analytics | Kapabilitas: Bahasa pemrograman analitik (Python/Scala/SQL) | Merk/Stack: Python/SQL (analitik BRIBRAIN) - inferensi | PIC: Mrs Utami | Status: Inferensi",
    "evidenceIds": [
      "ev-csv-136"
    ]
  },
  {
    "id": "f-csv-137",
    "bankId": "bank-mandiri",
    "technologyId": "tech-golang",
    "confidence": "Likely",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS4] Domain: Big Data Analytics | Kapabilitas: Bahasa pemrograman analitik (Python/Scala/SQL) | Merk/Stack: Python/SQL - inferensi | PIC: Mrs Utami | Status: Inferensi",
    "evidenceIds": [
      "ev-csv-137"
    ]
  },
  {
    "id": "f-csv-138",
    "bankId": "bank-bni",
    "technologyId": "tech-golang",
    "confidence": "Likely",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS4] Domain: Big Data Analytics | Kapabilitas: Bahasa pemrograman analitik (Python/Scala/SQL) | Merk/Stack: Python/SQL - inferensi | PIC: Mrs Utami | Status: Inferensi",
    "evidenceIds": [
      "ev-csv-138"
    ]
  },
  {
    "id": "f-csv-139",
    "bankId": "bank-bri",
    "technologyId": "tech-bribrain",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS4] Domain: AI Technology | Kapabilitas: Platform AI/ML | Merk/Stack: BRIBRAIN (AI/ML platform) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-139"
    ]
  },
  {
    "id": "f-csv-140",
    "bankId": "bank-mandiri",
    "technologyId": "tech-dataiku",
    "confidence": "Likely",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS4] Domain: AI Technology | Kapabilitas: Platform AI/ML | Merk/Stack: AI/ML + kemitraan Microsoft AI (Azure) | PIC: Mrs Utami | Status: Inferensi",
    "evidenceIds": [
      "ev-csv-140"
    ]
  },
  {
    "id": "f-csv-141",
    "bankId": "bank-bca",
    "technologyId": "tech-cloudera-ai",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS4] Domain: AI Technology | Kapabilitas: Platform AI/ML | Merk/Stack: Cloudera AI (ML platform terpusat, on-prem) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-141"
    ]
  },
  {
    "id": "f-csv-142",
    "bankId": "bank-bni",
    "technologyId": "tech-nvidia-nim",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS4] Domain: AI Technology | Kapabilitas: Platform AI/ML | Merk/Stack: Cloudera AI Inference + NVIDIA NIM (on-prem) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-142"
    ]
  },
  {
    "id": "f-csv-143",
    "bankId": "bank-bri",
    "technologyId": "tech-golang",
    "confidence": "Likely",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS4] Domain: AI Technology | Kapabilitas: Bahasa pemrograman AI/ML (Python) | Merk/Stack: Python - inferensi | PIC: Mrs Utami | Status: Inferensi",
    "evidenceIds": [
      "ev-csv-143"
    ]
  },
  {
    "id": "f-csv-144",
    "bankId": "bank-mandiri",
    "technologyId": "tech-golang",
    "confidence": "Likely",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS4] Domain: AI Technology | Kapabilitas: Bahasa pemrograman AI/ML (Python) | Merk/Stack: Python - inferensi | PIC: Mrs Utami | Status: Inferensi",
    "evidenceIds": [
      "ev-csv-144"
    ]
  },
  {
    "id": "f-csv-145",
    "bankId": "bank-bni",
    "technologyId": "tech-golang",
    "confidence": "Likely",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS4] Domain: AI Technology | Kapabilitas: Bahasa pemrograman AI/ML (Python) | Merk/Stack: Python - inferensi | PIC: Mrs Utami | Status: Inferensi",
    "evidenceIds": [
      "ev-csv-145"
    ]
  },
  {
    "id": "f-csv-146",
    "bankId": "bank-bca",
    "technologyId": "tech-cloudera-ai",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS4] Domain: AI Technology | Kapabilitas: MLOps platform | Merk/Stack: Cloudera AI Workbench + MLOps/CI-CD + model retraining | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-146"
    ]
  },
  {
    "id": "f-csv-147",
    "bankId": "bank-bca",
    "technologyId": "tech-cloudera-ai",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS4] Domain: AI Technology | Kapabilitas: Model registry | Merk/Stack: Cloudera AI Registry (versioning & monitoring) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-147"
    ]
  },
  {
    "id": "f-csv-148",
    "bankId": "bank-bca",
    "technologyId": "tech-cloudera-ai",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS4] Domain: AI Technology | Kapabilitas: Model serving / inference | Merk/Stack: Cloudera AI (inference terpusat) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-148"
    ]
  },
  {
    "id": "f-csv-149",
    "bankId": "bank-bni",
    "technologyId": "tech-nvidia-nim",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS4] Domain: AI Technology | Kapabilitas: Model serving / inference | Merk/Stack: Cloudera AI Inference + NVIDIA NIM | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-149"
    ]
  },
  {
    "id": "f-csv-150",
    "bankId": "bank-bni",
    "technologyId": "tech-nvidia-nim",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS4] Domain: AI Technology | Kapabilitas: GPU / AI accelerator | Merk/Stack: NVIDIA (accelerated computing utk LLM on-prem) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-150"
    ]
  },
  {
    "id": "f-csv-151",
    "bankId": "bank-bni",
    "technologyId": "tech-nvidia-nim",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS4] Domain: AI Technology | Kapabilitas: Akses LLM / foundation model | Merk/Stack: Open-source LLM on-prem (via NVIDIA accelerated computing) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-151"
    ]
  },
  {
    "id": "f-csv-152",
    "bankId": "bank-bni",
    "technologyId": "tech-nvidia-nim",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS4] Domain: AI Technology | Kapabilitas: LLM lokal / sovereign | Merk/Stack: LLM open-source di data center sendiri (data sovereignty) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-152"
    ]
  },
  {
    "id": "f-csv-153",
    "bankId": "bank-bri",
    "technologyId": "tech-bri-sabrina",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS4] Domain: AI Technology | Kapabilitas: Chatbot / virtual assistant | Merk/Stack: Sabrina | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-153"
    ]
  },
  {
    "id": "f-csv-154",
    "bankId": "bank-mandiri",
    "technologyId": "tech-mandiri-mita",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS4] Domain: AI Technology | Kapabilitas: Chatbot / virtual assistant | Merk/Stack: MITA (Mandiri Intelligent Assistant, NLP) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-154"
    ]
  },
  {
    "id": "f-csv-155",
    "bankId": "bank-bni",
    "technologyId": "tech-bri-sabrina",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS4] Domain: AI Technology | Kapabilitas: Chatbot / virtual assistant | Merk/Stack: Chatbot product knowledge (nama tdk dipublikasi) | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-155"
    ]
  },
  {
    "id": "f-csv-156",
    "bankId": "bank-bri",
    "technologyId": "tech-uupdp-ai",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS4] Domain: AI Technology | Kapabilitas: Kepatuhan regulasi AI (OJK/UU PDP) | Merk/Stack: Tunduk UU PDP & aturan OJK | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-156"
    ]
  },
  {
    "id": "f-csv-157",
    "bankId": "bank-mandiri",
    "technologyId": "tech-uupdp-ai",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS4] Domain: AI Technology | Kapabilitas: Kepatuhan regulasi AI (OJK/UU PDP) | Merk/Stack: Tunduk UU PDP & aturan OJK | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-157"
    ]
  },
  {
    "id": "f-csv-158",
    "bankId": "bank-bca",
    "technologyId": "tech-uupdp-ai",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS4] Domain: AI Technology | Kapabilitas: Kepatuhan regulasi AI (OJK/UU PDP) | Merk/Stack: Tunduk UU PDP & aturan OJK | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-158"
    ]
  },
  {
    "id": "f-csv-159",
    "bankId": "bank-bni",
    "technologyId": "tech-uupdp-ai",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS4] Domain: AI Technology | Kapabilitas: Kepatuhan regulasi AI (OJK/UU PDP) | Merk/Stack: Tunduk UU PDP & aturan OJK | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-159"
    ]
  },
  {
    "id": "f-csv-160",
    "bankId": "bank-btn",
    "technologyId": "tech-uupdp-ai",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS4] Domain: AI Technology | Kapabilitas: Kepatuhan regulasi AI (OJK/UU PDP) | Merk/Stack: Tunduk UU PDP & aturan OJK | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-160"
    ]
  },
  {
    "id": "f-csv-161",
    "bankId": "bank-bsi",
    "technologyId": "tech-uupdp-ai",
    "confidence": "Confirmed",
    "statusReview": "Published",
    "tanggalTerdeteksi": "2026-01-15",
    "tanggalVerifikasi": "2026-10-13",
    "catatan": "[WS4] Domain: AI Technology | Kapabilitas: Kepatuhan regulasi AI (OJK/UU PDP) | Merk/Stack: Tunduk UU PDP & aturan OJK | PIC: Mrs Utami | Status: Terverifikasi",
    "evidenceIds": [
      "ev-csv-161"
    ]
  }
];

export const INITIAL_EVIDENCES: Evidence[] = [
  {
    "id": "ev-bri-kafka-1",
    "findingId": "f-bri-kafka",
    "tipeSumber": "publik",
    "judul": "Event Streaming Architecture di Bank Rakyat Indonesia",
    "url": "https://www.confluent.io/customers/bank-bri/",
    "tanggalAkses": "2026-01-15",
    "kutipanRingkas": "BRI mengimplementasikan Apache Kafka dan Confluent Platform untuk menghubungkan transaksi AgenBRILink secara real-time.",
    "pencatat": "Admin"
  },
  {
    "id": "ev-bri-spark-1",
    "findingId": "f-bri-spark",
    "tipeSumber": "publik",
    "judul": "Arsitektur BRIBRAIN: Transformasi AI & Big Data BRI",
    "url": "https://bri.co.id/press-release",
    "tanggalAkses": "2026-01-20",
    "kutipanRingkas": "Apache Spark digunakan untuk memproses data transaksi harian jutaan nasabah guna credit scoring BRISPOT.",
    "pencatat": "Admin"
  },
  {
    "id": "ev-mdr-ds-1",
    "findingId": "f-mdr-ibm-datastage",
    "tipeSumber": "publik",
    "judul": "Modernisasi Data Warehouse & ETL Bank Mandiri",
    "url": "https://www.ibm.com/case-studies/bank-mandiri",
    "tanggalAkses": "2026-02-15",
    "kutipanRingkas": "IBM InfoSphere DataStage memproses ratusan juta record harian dari berbagai sistem core untuk integrasi data warehouse.",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-1",
    "findingId": "f-csv-1",
    "tipeSumber": "publik",
    "judul": "Core Banking System (CBS): Core Banking System (CBS) (BRI)",
    "url": "https://priandoyo.wordpress.com/2009/12/23/mengenal-aplikasi-core-banking-system-cbs/",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "Gartner MQ via media industri 2010-2018 (https://priandoyo.wordpress.com/2009/12/23/mengenal-aplikasi-core-banking-system-cbs/) - INDIKATIF, perlu verifikasi terkini",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-2",
    "findingId": "f-csv-2",
    "tipeSumber": "publik",
    "judul": "Core Banking System (CBS): Core Banking System (CBS) (Mandiri)",
    "url": "https://priandoyo.wordpress.com/2009/12/23/mengenal-aplikasi-core-banking-system-cbs/",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "Gartner MQ via media industri 2010-2018 (https://priandoyo.wordpress.com/2009/12/23/mengenal-aplikasi-core-banking-system-cbs/) - INDIKATIF, perlu verifikasi terkini",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-3",
    "findingId": "f-csv-3",
    "tipeSumber": "publik",
    "judul": "Core Banking System (CBS): Core Banking System (CBS) (BCA)",
    "url": "https://priandoyo.wordpress.com/2009/12/23/mengenal-aplikasi-core-banking-system-cbs/",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "Gartner MQ via media industri 2010-2018 (https://priandoyo.wordpress.com/2009/12/23/mengenal-aplikasi-core-banking-system-cbs/) - INDIKATIF, perlu verifikasi terkini",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-4",
    "findingId": "f-csv-4",
    "tipeSumber": "publik",
    "judul": "Core Banking System (CBS): Core Banking System (CBS) (BNI)",
    "url": "https://priandoyo.wordpress.com/2009/12/23/mengenal-aplikasi-core-banking-system-cbs/",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "Gartner MQ via media industri 2010-2018 (https://priandoyo.wordpress.com/2009/12/23/mengenal-aplikasi-core-banking-system-cbs/) - INDIKATIF, perlu verifikasi terkini",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-5",
    "findingId": "f-csv-5",
    "tipeSumber": "publik",
    "judul": "Core Banking System (CBS): Core Banking System (CBS) (BTN)",
    "url": "https://priandoyo.wordpress.com/2009/12/23/mengenal-aplikasi-core-banking-system-cbs/",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "Gartner MQ via media industri 2010-2018 (https://priandoyo.wordpress.com/2009/12/23/mengenal-aplikasi-core-banking-system-cbs/) - INDIKATIF, perlu verifikasi terkini",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-6",
    "findingId": "f-csv-6",
    "tipeSumber": "publik",
    "judul": "Core Banking System (CBS): Core Banking System (CBS) (BSI)",
    "url": "https://infobanknews.com/transformasi-teknologi-bsi-tuntas-siap-kejar-40-juta-nasabah-pada-2030",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://infobanknews.com/transformasi-teknologi-bsi-tuntas-siap-kejar-40-juta-nasabah-pada-2030 (core R10->R24, Mei 2026) (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-7",
    "findingId": "f-csv-7",
    "tipeSumber": "publik",
    "judul": "Core Banking System (CBS): ERP (Enterprise Resource Planning) (BRI)",
    "url": "https://news.sap.com/sea/2022/06/bri-siap-tingkatkan-kualitas-layanan-melalui-transformasi-digital/",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://news.sap.com/sea/2022/06/bri-siap-tingkatkan-kualitas-layanan-melalui-transformasi-digital/ ; studi SAP di BRI (ejournal.raharja.ac.id/sensi/article/view/4356) (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-8",
    "findingId": "f-csv-8",
    "tipeSumber": "publik",
    "judul": "Core Banking System (CBS): ERP (Enterprise Resource Planning) (BCA)",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "Riset kapabilitas ERP (Enterprise Resource Planning) pada BCA (Belum)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-9",
    "findingId": "f-csv-9",
    "tipeSumber": "publik",
    "judul": "Core Banking System (CBS): Modul Core Syariah (BSI)",
    "url": "https://priandoyo.wordpress.com/2009/12/23/mengenal-aplikasi-core-banking-system-cbs/",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "Gartner MQ via media industri 2010-2018 (https://priandoyo.wordpress.com/2009/12/23/mengenal-aplikasi-core-banking-system-cbs/) - INDIKATIF, perlu verifikasi terkini",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-10",
    "findingId": "f-csv-10",
    "tipeSumber": "publik",
    "judul": "Core Banking System (CBS): API Management Platform (core/open banking) (BRI)",
    "url": "https://www.cloudcomputing.id/berita/bri-google-cloud-izeno-kolaborasi-transformasi",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.cloudcomputing.id/berita/bri-google-cloud-izeno-kolaborasi-transformasi (Atlassian ITSM & Apigee) (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-11",
    "findingId": "f-csv-11",
    "tipeSumber": "publik",
    "judul": "Core Banking System (CBS): API Management Platform (core/open banking) (BCA)",
    "url": "https://www.redhat.com/en/resources/bca-case-study",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "Red Hat case studies (https://www.redhat.com/en/resources/bca-case-study; https://www.redhat.com/en/about/press-releases/bri-and-bank-ocbc-nisp-acknowledged-creative-use-open-source-red-hat-apac-innovation-awards-2023-indonesia) (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-12",
    "findingId": "f-csv-12",
    "tipeSumber": "publik",
    "judul": "Core Banking System (CBS): Bahasa pemrograman core (mis. COBOL/Java) (BSI)",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "Pola industri perbankan (Go/Java umum utk microservices; Python utk analitik/AI) - inferensi",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-13",
    "findingId": "f-csv-13",
    "tipeSumber": "publik",
    "judul": "Mobile Banking: Aplikasi Mobile Banking (super-app) (BRI)",
    "url": "https://rsidrsubki.id/mobile-banking-2026-aplikasi-terbaik-dari-bca-bri-mandiri-dan-bni/",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "App Store/Google Play & media (https://rsidrsubki.id/mobile-banking-2026-aplikasi-terbaik-dari-bca-bri-mandiri-dan-bni/, https://www.intisoftware.com/id/blog/insights-2/yuk-review-ui-ux-m-bca-vs-livin-vs-brimo-24) (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-14",
    "findingId": "f-csv-14",
    "tipeSumber": "publik",
    "judul": "Mobile Banking: Aplikasi Mobile Banking (super-app) (Mandiri)",
    "url": "https://rsidrsubki.id/mobile-banking-2026-aplikasi-terbaik-dari-bca-bri-mandiri-dan-bni/",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "App Store/Google Play & media (https://rsidrsubki.id/mobile-banking-2026-aplikasi-terbaik-dari-bca-bri-mandiri-dan-bni/, https://www.intisoftware.com/id/blog/insights-2/yuk-review-ui-ux-m-bca-vs-livin-vs-brimo-24) (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-15",
    "findingId": "f-csv-15",
    "tipeSumber": "publik",
    "judul": "Mobile Banking: Aplikasi Mobile Banking (super-app) (BCA)",
    "url": "https://rsidrsubki.id/mobile-banking-2026-aplikasi-terbaik-dari-bca-bri-mandiri-dan-bni/",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "App Store/Google Play & media (https://rsidrsubki.id/mobile-banking-2026-aplikasi-terbaik-dari-bca-bri-mandiri-dan-bni/, https://www.intisoftware.com/id/blog/insights-2/yuk-review-ui-ux-m-bca-vs-livin-vs-brimo-24) (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-16",
    "findingId": "f-csv-16",
    "tipeSumber": "publik",
    "judul": "Mobile Banking: Aplikasi Mobile Banking (super-app) (BNI)",
    "url": "https://rsidrsubki.id/mobile-banking-2026-aplikasi-terbaik-dari-bca-bri-mandiri-dan-bni/",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "App Store/Google Play & media (https://rsidrsubki.id/mobile-banking-2026-aplikasi-terbaik-dari-bca-bri-mandiri-dan-bni/, https://www.intisoftware.com/id/blog/insights-2/yuk-review-ui-ux-m-bca-vs-livin-vs-brimo-24) (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-17",
    "findingId": "f-csv-17",
    "tipeSumber": "publik",
    "judul": "Mobile Banking: Aplikasi Mobile Banking (super-app) (BTN)",
    "url": "https://rsidrsubki.id/mobile-banking-2026-aplikasi-terbaik-dari-bca-bri-mandiri-dan-bni/",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "App Store/Google Play & media (https://rsidrsubki.id/mobile-banking-2026-aplikasi-terbaik-dari-bca-bri-mandiri-dan-bni/, https://www.intisoftware.com/id/blog/insights-2/yuk-review-ui-ux-m-bca-vs-livin-vs-brimo-24) (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-18",
    "findingId": "f-csv-18",
    "tipeSumber": "publik",
    "judul": "Mobile Banking: Aplikasi Mobile Banking (super-app) (BSI)",
    "url": "https://rsidrsubki.id/mobile-banking-2026-aplikasi-terbaik-dari-bca-bri-mandiri-dan-bni/",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "App Store/Google Play & media (https://rsidrsubki.id/mobile-banking-2026-aplikasi-terbaik-dari-bca-bri-mandiri-dan-bni/, https://www.intisoftware.com/id/blog/insights-2/yuk-review-ui-ux-m-bca-vs-livin-vs-brimo-24) (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-19",
    "findingId": "f-csv-19",
    "tipeSumber": "publik",
    "judul": "Mobile Banking: e-KYC / digital onboarding (Dukcapil, liveness) (BNI)",
    "url": "https://teknologi.bisnis.com/read/20260605/84/1978647/bca-bbca-dan-bni-bbni-selektif-jaring-solusi-ai-enterprise-kuartal-iii2026",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://teknologi.bisnis.com/read/20260605/84/1978647/bca-bbca-dan-bni-bbni-selektif-jaring-solusi-ai-enterprise-kuartal-iii2026 (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-20",
    "findingId": "f-csv-20",
    "tipeSumber": "publik",
    "judul": "Mobile Banking: Modul pembayaran QRIS (BRI)",
    "url": "https://www.bi.go.id/id/fungsi-utama/sistem-pembayaran/default.aspx",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.bi.go.id/id/fungsi-utama/sistem-pembayaran/default.aspx  (QRIS - standar Bank Indonesia; didukung bank peserta)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-21",
    "findingId": "f-csv-21",
    "tipeSumber": "publik",
    "judul": "Mobile Banking: Modul pembayaran QRIS (Mandiri)",
    "url": "https://www.bi.go.id/id/fungsi-utama/sistem-pembayaran/default.aspx",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.bi.go.id/id/fungsi-utama/sistem-pembayaran/default.aspx  (QRIS - standar Bank Indonesia; didukung bank peserta)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-22",
    "findingId": "f-csv-22",
    "tipeSumber": "publik",
    "judul": "Mobile Banking: Modul pembayaran QRIS (BCA)",
    "url": "https://www.bi.go.id/id/fungsi-utama/sistem-pembayaran/default.aspx",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.bi.go.id/id/fungsi-utama/sistem-pembayaran/default.aspx  (QRIS - standar Bank Indonesia; didukung bank peserta)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-23",
    "findingId": "f-csv-23",
    "tipeSumber": "publik",
    "judul": "Mobile Banking: Modul pembayaran QRIS (BNI)",
    "url": "https://www.bi.go.id/id/fungsi-utama/sistem-pembayaran/default.aspx",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.bi.go.id/id/fungsi-utama/sistem-pembayaran/default.aspx  (QRIS - standar Bank Indonesia; didukung bank peserta)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-24",
    "findingId": "f-csv-24",
    "tipeSumber": "publik",
    "judul": "Mobile Banking: Modul pembayaran QRIS (BTN)",
    "url": "https://www.bi.go.id/id/fungsi-utama/sistem-pembayaran/default.aspx",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.bi.go.id/id/fungsi-utama/sistem-pembayaran/default.aspx  (QRIS - standar Bank Indonesia; didukung bank peserta)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-25",
    "findingId": "f-csv-25",
    "tipeSumber": "publik",
    "judul": "Mobile Banking: Modul pembayaran QRIS (BSI)",
    "url": "https://www.bi.go.id/id/fungsi-utama/sistem-pembayaran/default.aspx",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.bi.go.id/id/fungsi-utama/sistem-pembayaran/default.aspx  (QRIS - standar Bank Indonesia; didukung bank peserta)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-26",
    "findingId": "f-csv-26",
    "tipeSumber": "publik",
    "judul": "Mobile Banking: Integrasi BI-FAST (BRI)",
    "url": "https://www.bi.go.id/id/fungsi-utama/sistem-pembayaran/default.aspx",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.bi.go.id/id/fungsi-utama/sistem-pembayaran/default.aspx  (BI-FAST; bank besar sbg peserta, transfer Rp2.500)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-27",
    "findingId": "f-csv-27",
    "tipeSumber": "publik",
    "judul": "Mobile Banking: Integrasi BI-FAST (Mandiri)",
    "url": "https://www.bi.go.id/id/fungsi-utama/sistem-pembayaran/default.aspx",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.bi.go.id/id/fungsi-utama/sistem-pembayaran/default.aspx  (BI-FAST; bank besar sbg peserta, transfer Rp2.500)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-28",
    "findingId": "f-csv-28",
    "tipeSumber": "publik",
    "judul": "Mobile Banking: Integrasi BI-FAST (BCA)",
    "url": "https://www.bi.go.id/id/fungsi-utama/sistem-pembayaran/default.aspx",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.bi.go.id/id/fungsi-utama/sistem-pembayaran/default.aspx  (BI-FAST; bank besar sbg peserta, transfer Rp2.500)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-29",
    "findingId": "f-csv-29",
    "tipeSumber": "publik",
    "judul": "Mobile Banking: Integrasi BI-FAST (BNI)",
    "url": "https://www.bi.go.id/id/fungsi-utama/sistem-pembayaran/default.aspx",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.bi.go.id/id/fungsi-utama/sistem-pembayaran/default.aspx  (BI-FAST; bank besar sbg peserta, transfer Rp2.500)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-30",
    "findingId": "f-csv-30",
    "tipeSumber": "publik",
    "judul": "Mobile Banking: Integrasi BI-FAST (BTN)",
    "url": "https://www.bi.go.id/id/fungsi-utama/sistem-pembayaran/default.aspx",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.bi.go.id/id/fungsi-utama/sistem-pembayaran/default.aspx  (BI-FAST; bank besar sbg peserta, transfer Rp2.500)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-31",
    "findingId": "f-csv-31",
    "tipeSumber": "publik",
    "judul": "Mobile Banking: Integrasi BI-FAST (BSI)",
    "url": "https://www.bi.go.id/id/fungsi-utama/sistem-pembayaran/default.aspx",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.bi.go.id/id/fungsi-utama/sistem-pembayaran/default.aspx  (BI-FAST; bank besar sbg peserta, transfer Rp2.500)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-32",
    "findingId": "f-csv-32",
    "tipeSumber": "publik",
    "judul": "Mobile Banking: Chatbot / virtual assistant in-app (BRI)",
    "url": "https://digital.bri.co.id/article/bribrain-bawa-masa-depan-bri-dari-mobile-first-jadi-4xz6",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://digital.bri.co.id/article/bribrain-bawa-masa-depan-bri-dari-mobile-first-jadi-4xz6 (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-33",
    "findingId": "f-csv-33",
    "tipeSumber": "publik",
    "judul": "Mobile Banking: Chatbot / virtual assistant in-app (Mandiri)",
    "url": "https://www.bankmandiri.co.id/en/news-detail?primaryKey=44285018",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.bankmandiri.co.id/en/news-detail?primaryKey=44285018 (MITA); https://medium.com/@aulianurfajriyah311/implementasi-artificial-intelligence-di-bank-mandiri-bd1a319b539c (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-34",
    "findingId": "f-csv-34",
    "tipeSumber": "publik",
    "judul": "Mobile Banking: Manajemen rating & review app (BRI)",
    "url": "https://rsidrsubki.id/mobile-banking-2026-aplikasi-terbaik-dari-bca-bri-mandiri-dan-bni/",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "App Store/Google Play & media (https://rsidrsubki.id/mobile-banking-2026-aplikasi-terbaik-dari-bca-bri-mandiri-dan-bni/, https://www.intisoftware.com/id/blog/insights-2/yuk-review-ui-ux-m-bca-vs-livin-vs-brimo-24) (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-35",
    "findingId": "f-csv-35",
    "tipeSumber": "publik",
    "judul": "Mobile Banking: Manajemen rating & review app (Mandiri)",
    "url": "https://rsidrsubki.id/mobile-banking-2026-aplikasi-terbaik-dari-bca-bri-mandiri-dan-bni/",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "App Store/Google Play & media (https://rsidrsubki.id/mobile-banking-2026-aplikasi-terbaik-dari-bca-bri-mandiri-dan-bni/, https://www.intisoftware.com/id/blog/insights-2/yuk-review-ui-ux-m-bca-vs-livin-vs-brimo-24) (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-36",
    "findingId": "f-csv-36",
    "tipeSumber": "publik",
    "judul": "Mobile Banking: Manajemen rating & review app (BCA)",
    "url": "https://rsidrsubki.id/mobile-banking-2026-aplikasi-terbaik-dari-bca-bri-mandiri-dan-bni/",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "App Store/Google Play & media (https://rsidrsubki.id/mobile-banking-2026-aplikasi-terbaik-dari-bca-bri-mandiri-dan-bni/, https://www.intisoftware.com/id/blog/insights-2/yuk-review-ui-ux-m-bca-vs-livin-vs-brimo-24) (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-37",
    "findingId": "f-csv-37",
    "tipeSumber": "publik",
    "judul": "Mobile Banking: Manajemen rating & review app (BNI)",
    "url": "https://rsidrsubki.id/mobile-banking-2026-aplikasi-terbaik-dari-bca-bri-mandiri-dan-bni/",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "App Store/Google Play & media (https://rsidrsubki.id/mobile-banking-2026-aplikasi-terbaik-dari-bca-bri-mandiri-dan-bni/, https://www.intisoftware.com/id/blog/insights-2/yuk-review-ui-ux-m-bca-vs-livin-vs-brimo-24) (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-38",
    "findingId": "f-csv-38",
    "tipeSumber": "publik",
    "judul": "Mobile Banking: Manajemen rating & review app (BTN)",
    "url": "https://rsidrsubki.id/mobile-banking-2026-aplikasi-terbaik-dari-bca-bri-mandiri-dan-bni/",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "App Store/Google Play & media (https://rsidrsubki.id/mobile-banking-2026-aplikasi-terbaik-dari-bca-bri-mandiri-dan-bni/, https://www.intisoftware.com/id/blog/insights-2/yuk-review-ui-ux-m-bca-vs-livin-vs-brimo-24) (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-39",
    "findingId": "f-csv-39",
    "tipeSumber": "publik",
    "judul": "Mobile Banking: Manajemen rating & review app (BSI)",
    "url": "https://infobanknews.com/transformasi-teknologi-bsi-tuntas-siap-kejar-40-juta-nasabah-pada-2030",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://infobanknews.com/transformasi-teknologi-bsi-tuntas-siap-kejar-40-juta-nasabah-pada-2030 (core R10->R24, Mei 2026) (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-40",
    "findingId": "f-csv-40",
    "tipeSumber": "publik",
    "judul": "Internet Banking: Portal Internet Banking korporasi/wholesale (BRI)",
    "url": "https://www.cnbcindonesia.com/market/20221227143831-19-400523/qlola-by-bri-solusi-terintegrasi-layanan-wholesale-banking",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.cnbcindonesia.com/market/20221227143831-19-400523/qlola-by-bri-solusi-terintegrasi-layanan-wholesale-banking (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-41",
    "findingId": "f-csv-41",
    "tipeSumber": "publik",
    "judul": "Internet Banking: Portal Internet Banking korporasi/wholesale (Mandiri)",
    "url": "https://www.bankmandiri.co.id/en/kopra-by-mandiri",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.bankmandiri.co.id/en/kopra-by-mandiri (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-42",
    "findingId": "f-csv-42",
    "tipeSumber": "publik",
    "judul": "Internet Banking: Portal Internet Banking korporasi/wholesale (BNI)",
    "url": "https://finansial.bisnis.com/read/20250519/90/1878150/mana-paling-cuan-bbri-bmri-bbni-bris-dari-aplikasi-nasabah-korporasi",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://finansial.bisnis.com/read/20250519/90/1878150/mana-paling-cuan-bbri-bmri-bbni-bris-dari-aplikasi-nasabah-korporasi (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-43",
    "findingId": "f-csv-43",
    "tipeSumber": "publik",
    "judul": "Internet Banking: Portal Internet Banking korporasi/wholesale (BSI)",
    "url": "https://infobanknews.com/transformasi-teknologi-bsi-tuntas-siap-kejar-40-juta-nasabah-pada-2030",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://infobanknews.com/transformasi-teknologi-bsi-tuntas-siap-kejar-40-juta-nasabah-pada-2030 (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-44",
    "findingId": "f-csv-44",
    "tipeSumber": "publik",
    "judul": "Internet Banking: Cash Management System (CMS) (BRI)",
    "url": "https://www.cnbcindonesia.com/market/20221227143831-19-400523/qlola-by-bri-solusi-terintegrasi-layanan-wholesale-banking",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.cnbcindonesia.com/market/20221227143831-19-400523/qlola-by-bri-solusi-terintegrasi-layanan-wholesale-banking (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-45",
    "findingId": "f-csv-45",
    "tipeSumber": "publik",
    "judul": "Internet Banking: Cash Management System (CMS) (Mandiri)",
    "url": "https://www.bankmandiri.co.id/en/kopra-by-mandiri",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.bankmandiri.co.id/en/kopra-by-mandiri (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-46",
    "findingId": "f-csv-46",
    "tipeSumber": "publik",
    "judul": "Internet Banking: Cash Management System (CMS) (BNI)",
    "url": "https://finansial.bisnis.com/read/20250519/90/1878150/mana-paling-cuan-bbri-bmri-bbni-bris-dari-aplikasi-nasabah-korporasi",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://finansial.bisnis.com/read/20250519/90/1878150/mana-paling-cuan-bbri-bmri-bbni-bris-dari-aplikasi-nasabah-korporasi (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-47",
    "findingId": "f-csv-47",
    "tipeSumber": "publik",
    "judul": "Internet Banking: Trade finance portal (LC/guarantee) (BRI)",
    "url": "https://www.cnbcindonesia.com/market/20221227143831-19-400523/qlola-by-bri-solusi-terintegrasi-layanan-wholesale-banking",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.cnbcindonesia.com/market/20221227143831-19-400523/qlola-by-bri-solusi-terintegrasi-layanan-wholesale-banking (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-48",
    "findingId": "f-csv-48",
    "tipeSumber": "publik",
    "judul": "Internet Banking: Trade finance portal (LC/guarantee) (Mandiri)",
    "url": "https://www.bankmandiri.co.id/en/kopra-by-mandiri",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.bankmandiri.co.id/en/kopra-by-mandiri (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-49",
    "findingId": "f-csv-49",
    "tipeSumber": "publik",
    "judul": "Internet Banking: Supply chain finance platform (BRI)",
    "url": "https://www.cnbcindonesia.com/market/20221227143831-19-400523/qlola-by-bri-solusi-terintegrasi-layanan-wholesale-banking",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.cnbcindonesia.com/market/20221227143831-19-400523/qlola-by-bri-solusi-terintegrasi-layanan-wholesale-banking (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-50",
    "findingId": "f-csv-50",
    "tipeSumber": "publik",
    "judul": "Internet Banking: API banking korporasi (open API) (BRI)",
    "url": "https://developers.bri.co.id",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://developers.bri.co.id (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-51",
    "findingId": "f-csv-51",
    "tipeSumber": "publik",
    "judul": "Digital Banking: Aplikasi mobile-first (BRI)",
    "url": "https://www.bankraya.co.id",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.bankraya.co.id (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-52",
    "findingId": "f-csv-52",
    "tipeSumber": "publik",
    "judul": "Digital Banking: Aplikasi mobile-first (BCA)",
    "url": "https://www.blubybcadigital.id",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.blubybcadigital.id (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-53",
    "findingId": "f-csv-53",
    "tipeSumber": "publik",
    "judul": "Digital Banking: Aplikasi mobile-first (BNI)",
    "url": "https://www.hibank.co.id",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.hibank.co.id (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-54",
    "findingId": "f-csv-54",
    "tipeSumber": "publik",
    "judul": "Digital Banking: Aplikasi mobile-first (BSI)",
    "url": "https://rsidrsubki.id/mobile-banking-2026-aplikasi-terbaik-dari-bca-bri-mandiri-dan-bni/",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "App Store/Google Play & media (https://rsidrsubki.id/mobile-banking-2026-aplikasi-terbaik-dari-bca-bri-mandiri-dan-bni/, https://www.intisoftware.com/id/blog/insights-2/yuk-review-ui-ux-m-bca-vs-livin-vs-brimo-24) (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-55",
    "findingId": "f-csv-55",
    "tipeSumber": "publik",
    "judul": "Digital Banking: QRIS / pembayaran (BRI)",
    "url": "https://www.bi.go.id/id/fungsi-utama/sistem-pembayaran/default.aspx",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.bi.go.id/id/fungsi-utama/sistem-pembayaran/default.aspx  (QRIS - standar Bank Indonesia; didukung bank peserta)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-56",
    "findingId": "f-csv-56",
    "tipeSumber": "publik",
    "judul": "Digital Banking: QRIS / pembayaran (Mandiri)",
    "url": "https://www.bi.go.id/id/fungsi-utama/sistem-pembayaran/default.aspx",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.bi.go.id/id/fungsi-utama/sistem-pembayaran/default.aspx  (QRIS - standar Bank Indonesia; didukung bank peserta)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-57",
    "findingId": "f-csv-57",
    "tipeSumber": "publik",
    "judul": "Digital Banking: QRIS / pembayaran (BCA)",
    "url": "https://www.bi.go.id/id/fungsi-utama/sistem-pembayaran/default.aspx",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.bi.go.id/id/fungsi-utama/sistem-pembayaran/default.aspx  (QRIS - standar Bank Indonesia; didukung bank peserta)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-58",
    "findingId": "f-csv-58",
    "tipeSumber": "publik",
    "judul": "Digital Banking: QRIS / pembayaran (BNI)",
    "url": "https://www.bi.go.id/id/fungsi-utama/sistem-pembayaran/default.aspx",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.bi.go.id/id/fungsi-utama/sistem-pembayaran/default.aspx  (QRIS - standar Bank Indonesia; didukung bank peserta)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-59",
    "findingId": "f-csv-59",
    "tipeSumber": "publik",
    "judul": "Digital Banking: QRIS / pembayaran (BTN)",
    "url": "https://www.bi.go.id/id/fungsi-utama/sistem-pembayaran/default.aspx",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.bi.go.id/id/fungsi-utama/sistem-pembayaran/default.aspx  (QRIS - standar Bank Indonesia; didukung bank peserta)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-60",
    "findingId": "f-csv-60",
    "tipeSumber": "publik",
    "judul": "Digital Banking: QRIS / pembayaran (BSI)",
    "url": "https://www.bi.go.id/id/fungsi-utama/sistem-pembayaran/default.aspx",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.bi.go.id/id/fungsi-utama/sistem-pembayaran/default.aspx  (QRIS - standar Bank Indonesia; didukung bank peserta)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-61",
    "findingId": "f-csv-61",
    "tipeSumber": "publik",
    "judul": "Digital Banking: Pelaporan penjaminan LPS (BRI)",
    "url": "https://www.lps.go.id",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.lps.go.id  (UU 4/2023 P2SK; jaminan simpanan s/d Rp2 M/nasabah/bank)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-62",
    "findingId": "f-csv-62",
    "tipeSumber": "publik",
    "judul": "Digital Banking: Pelaporan penjaminan LPS (Mandiri)",
    "url": "https://www.lps.go.id",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.lps.go.id  (UU 4/2023 P2SK; jaminan simpanan s/d Rp2 M/nasabah/bank)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-63",
    "findingId": "f-csv-63",
    "tipeSumber": "publik",
    "judul": "Digital Banking: Pelaporan penjaminan LPS (BCA)",
    "url": "https://www.lps.go.id",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.lps.go.id  (UU 4/2023 P2SK; jaminan simpanan s/d Rp2 M/nasabah/bank)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-64",
    "findingId": "f-csv-64",
    "tipeSumber": "publik",
    "judul": "Digital Banking: Pelaporan penjaminan LPS (BNI)",
    "url": "https://www.lps.go.id",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.lps.go.id  (UU 4/2023 P2SK; jaminan simpanan s/d Rp2 M/nasabah/bank)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-65",
    "findingId": "f-csv-65",
    "tipeSumber": "publik",
    "judul": "Digital Banking: Pelaporan penjaminan LPS (BTN)",
    "url": "https://www.lps.go.id",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.lps.go.id  (UU 4/2023 P2SK; jaminan simpanan s/d Rp2 M/nasabah/bank)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-66",
    "findingId": "f-csv-66",
    "tipeSumber": "publik",
    "judul": "Digital Banking: Pelaporan penjaminan LPS (BSI)",
    "url": "https://www.lps.go.id",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.lps.go.id  (UU 4/2023 P2SK; jaminan simpanan s/d Rp2 M/nasabah/bank)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-67",
    "findingId": "f-csv-67",
    "tipeSumber": "publik",
    "judul": "Digital Banking: Infrastruktur cloud (BRI)",
    "url": "https://www.itnews.asia/news/indonesias-bri-agro-chooses-google-cloud-as-primary-cloud-provider-572401",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.itnews.asia/news/indonesias-bri-agro-chooses-google-cloud-as-primary-cloud-provider-572401 (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-68",
    "findingId": "f-csv-68",
    "tipeSumber": "publik",
    "judul": "Digital Banking: Kepatuhan POJK bank digital (BRI)",
    "url": "https://www.ojk.go.id/id/regulasi/Pages/default.aspx",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.ojk.go.id/id/regulasi/Pages/default.aspx  (cari: POJK 12/POJK.03/2021 Bank Umum - kutip verbatim per pasal)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-69",
    "findingId": "f-csv-69",
    "tipeSumber": "publik",
    "judul": "Digital Banking: Kepatuhan POJK bank digital (Mandiri)",
    "url": "https://www.ojk.go.id/id/regulasi/Pages/default.aspx",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.ojk.go.id/id/regulasi/Pages/default.aspx  (cari: POJK 12/POJK.03/2021 Bank Umum - kutip verbatim per pasal)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-70",
    "findingId": "f-csv-70",
    "tipeSumber": "publik",
    "judul": "Digital Banking: Kepatuhan POJK bank digital (BCA)",
    "url": "https://www.ojk.go.id/id/regulasi/Pages/default.aspx",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.ojk.go.id/id/regulasi/Pages/default.aspx  (cari: POJK 12/POJK.03/2021 Bank Umum - kutip verbatim per pasal)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-71",
    "findingId": "f-csv-71",
    "tipeSumber": "publik",
    "judul": "Digital Banking: Kepatuhan POJK bank digital (BNI)",
    "url": "https://www.ojk.go.id/id/regulasi/Pages/default.aspx",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.ojk.go.id/id/regulasi/Pages/default.aspx  (cari: POJK 12/POJK.03/2021 Bank Umum - kutip verbatim per pasal)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-72",
    "findingId": "f-csv-72",
    "tipeSumber": "publik",
    "judul": "Digital Banking: Kepatuhan POJK bank digital (BTN)",
    "url": "https://www.ojk.go.id/id/regulasi/Pages/default.aspx",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.ojk.go.id/id/regulasi/Pages/default.aspx  (cari: POJK 12/POJK.03/2021 Bank Umum - kutip verbatim per pasal)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-73",
    "findingId": "f-csv-73",
    "tipeSumber": "publik",
    "judul": "Digital Banking: Kepatuhan POJK bank digital (BSI)",
    "url": "https://www.ojk.go.id/id/regulasi/Pages/default.aspx",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.ojk.go.id/id/regulasi/Pages/default.aspx  (cari: POJK 12/POJK.03/2021 Bank Umum - kutip verbatim per pasal)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-74",
    "findingId": "f-csv-74",
    "tipeSumber": "publik",
    "judul": "Enterprise Data Warehouse (EDW): Data Lake (BRI)",
    "url": "https://digital.bri.co.id/article/bribrain-bawa-masa-depan-bri-dari-mobile-first-jadi-4xz6",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://digital.bri.co.id/article/bribrain-bawa-masa-depan-bri-dari-mobile-first-jadi-4xz6 (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-75",
    "findingId": "f-csv-75",
    "tipeSumber": "publik",
    "judul": "Enterprise Data Warehouse (EDW): Data Lake (Mandiri)",
    "url": "https://www.cloudera.com/customers/bank-mandiri.html",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.cloudera.com/customers/bank-mandiri.html (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-76",
    "findingId": "f-csv-76",
    "tipeSumber": "publik",
    "judul": "Enterprise Data Warehouse (EDW): Data Lake (BCA)",
    "url": "https://infobanknews.com/bca-perkuat-fondasi-digital-lewat-modernisasi-infrastruktur-data-berbasis-ai/",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://infobanknews.com/bca-perkuat-fondasi-digital-lewat-modernisasi-infrastruktur-data-berbasis-ai/ (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-77",
    "findingId": "f-csv-77",
    "tipeSumber": "publik",
    "judul": "Enterprise Data Warehouse (EDW): Data Lake (BNI)",
    "url": "https://infobanknews.com/bni-perluas-pemanfaatan-ai-perkuat-operasional-hingga-keamanan-data/",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://infobanknews.com/bni-perluas-pemanfaatan-ai-perkuat-operasional-hingga-keamanan-data/ (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-78",
    "findingId": "f-csv-78",
    "tipeSumber": "publik",
    "judul": "Enterprise Data Warehouse (EDW): Lakehouse platform (Mandiri)",
    "url": "https://www.cloudera.com/customers/bank-mandiri.html",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.cloudera.com/customers/bank-mandiri.html (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-79",
    "findingId": "f-csv-79",
    "tipeSumber": "publik",
    "judul": "Enterprise Data Warehouse (EDW): Lakehouse platform (BNI)",
    "url": "https://infobanknews.com/bni-perluas-pemanfaatan-ai-perkuat-operasional-hingga-keamanan-data/",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://infobanknews.com/bni-perluas-pemanfaatan-ai-perkuat-operasional-hingga-keamanan-data/ (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-80",
    "findingId": "f-csv-80",
    "tipeSumber": "publik",
    "judul": "Enterprise Data Warehouse (EDW): Table format (Iceberg/Delta/Hudi) (BNI)",
    "url": "https://infobanknews.com/bni-perluas-pemanfaatan-ai-perkuat-operasional-hingga-keamanan-data/",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://infobanknews.com/bni-perluas-pemanfaatan-ai-perkuat-operasional-hingga-keamanan-data/ (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-81",
    "findingId": "f-csv-81",
    "tipeSumber": "publik",
    "judul": "Master Data Management (MDM): Customer 360 / Single Customer View (BRI)",
    "url": "https://lib.ui.ac.id/m/detail.jsp?id=20504024",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "Studi akademik single master data customer BRI (https://lib.ui.ac.id/m/detail.jsp?id=20504024) - akademik, bukan konfirmasi produk",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-82",
    "findingId": "f-csv-82",
    "tipeSumber": "publik",
    "judul": "Master Data Management (MDM): Customer 360 / Single Customer View (Mandiri)",
    "url": "https://www.computerweekly.com/news/252488407/How-Bank-Mandiri-is-driving-the-use-of-big-data-analytics",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.computerweekly.com/news/252488407/How-Bank-Mandiri-is-driving-the-use-of-big-data-analytics (single source of truth) (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-83",
    "findingId": "f-csv-83",
    "tipeSumber": "publik",
    "judul": "Master Data Management (MDM): Data stewardship workflow (Mandiri)",
    "url": "https://www.computerweekly.com/news/252488407/How-Bank-Mandiri-is-driving-the-use-of-big-data-analytics",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.computerweekly.com/news/252488407/How-Bank-Mandiri-is-driving-the-use-of-big-data-analytics (single source of truth) (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-84",
    "findingId": "f-csv-84",
    "tipeSumber": "publik",
    "judul": "Master Data Management (MDM): Data governance platform (Mandiri)",
    "url": "https://www.bankmandiri.co.id/documents/38268824/40377171/(B",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.bankmandiri.co.id/documents/38268824/40377171/(B)E.5.1+-+AR+page+406+-+409.pdf (IT Governance framework) (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-85",
    "findingId": "f-csv-85",
    "tipeSumber": "publik",
    "judul": "Business Intelligence (BI): Platform BI / visualisasi (Mandiri)",
    "url": "https://www.tableau.com/solutions/customer/Bank-Mandiri-embeds-data-driven-culture-where-every-decision-will-be-based",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.tableau.com/solutions/customer/Bank-Mandiri-embeds-data-driven-culture-where-every-decision-will-be-based (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-86",
    "findingId": "f-csv-86",
    "tipeSumber": "publik",
    "judul": "Business Intelligence (BI): Self-service analytics (Mandiri)",
    "url": "https://www.cloudera.com/customers/bank-mandiri.html",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.cloudera.com/customers/bank-mandiri.html (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-87",
    "findingId": "f-csv-87",
    "tipeSumber": "publik",
    "judul": "Business Intelligence (BI): Dashboard & scorecard (Mandiri)",
    "url": "https://www.tableau.com/solutions/customer/Bank-Mandiri-embeds-data-driven-culture-where-every-decision-will-be-based",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.tableau.com/solutions/customer/Bank-Mandiri-embeds-data-driven-culture-where-every-decision-will-be-based (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-88",
    "findingId": "f-csv-88",
    "tipeSumber": "publik",
    "judul": "Cloud Technology: Public cloud (IaaS) (BRI)",
    "url": "https://www.cloudcomputing.id/berita/bri-google-cloud-izeno-kolaborasi-transformasi",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.cloudcomputing.id/berita/bri-google-cloud-izeno-kolaborasi-transformasi; https://blog.google/intl/id-id/products/cloud/2023_06_google-cloud-summit-jakarta-2023-bank-bri/ (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-89",
    "findingId": "f-csv-89",
    "tipeSumber": "publik",
    "judul": "Cloud Technology: Public cloud (IaaS) (Mandiri)",
    "url": "https://medium.com/mandiri-engineering/mandiri-cloud-fb7aef285628",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://medium.com/mandiri-engineering/mandiri-cloud-fb7aef285628; https://www.cloudera.com/customers/bank-mandiri.html (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-90",
    "findingId": "f-csv-90",
    "tipeSumber": "publik",
    "judul": "Cloud Technology: Public cloud (IaaS) (BNI)",
    "url": "https://keuangan.kontan.co.id/news/bni-adopsi-teknologi-ai-dan-layanan-cloud-demi-mendorong-daya-saing",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://keuangan.kontan.co.id/news/bni-adopsi-teknologi-ai-dan-layanan-cloud-demi-mendorong-daya-saing (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-91",
    "findingId": "f-csv-91",
    "tipeSumber": "publik",
    "judul": "Cloud Technology: Private cloud platform (Mandiri)",
    "url": "https://medium.com/mandiri-engineering/mandiri-cloud-fb7aef285628",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://medium.com/mandiri-engineering/mandiri-cloud-fb7aef285628; https://www.cloudera.com/customers/bank-mandiri.html (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-92",
    "findingId": "f-csv-92",
    "tipeSumber": "publik",
    "judul": "Cloud Technology: Hybrid cloud management (BRI)",
    "url": "https://www.redhat.com/en/about/press-releases/apac-financial-services-institutions-bank-red-hat-enhance-agility",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "Red Hat APAC FSI (https://www.redhat.com/en/about/press-releases/apac-financial-services-institutions-bank-red-hat-enhance-agility); https://digital.bri.co.id/article/google-cloud-platform-cara-kami-memanfaatkannya-5mob (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-93",
    "findingId": "f-csv-93",
    "tipeSumber": "publik",
    "judul": "Cloud Technology: Multi-cloud management (Mandiri)",
    "url": "https://medium.com/mandiri-engineering/mandiri-cloud-fb7aef285628",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://medium.com/mandiri-engineering/mandiri-cloud-fb7aef285628 (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-94",
    "findingId": "f-csv-94",
    "tipeSumber": "publik",
    "judul": "Cloud Technology: Container orchestration (K8s/OpenShift) (BRI)",
    "url": "https://www.redhat.com/en/resources/bca-case-study",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "Red Hat case study (https://www.redhat.com/en/resources/bca-case-study) (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-95",
    "findingId": "f-csv-95",
    "tipeSumber": "publik",
    "judul": "Cloud Technology: Container orchestration (K8s/OpenShift) (Mandiri)",
    "url": "https://www.redhat.com/en/resources/bca-case-study",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "Red Hat case study (https://www.redhat.com/en/resources/bca-case-study) (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-96",
    "findingId": "f-csv-96",
    "tipeSumber": "publik",
    "judul": "Cloud Technology: Container orchestration (K8s/OpenShift) (BCA)",
    "url": "https://www.redhat.com/en/resources/bca-case-study",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "Red Hat case study (https://www.redhat.com/en/resources/bca-case-study) (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-97",
    "findingId": "f-csv-97",
    "tipeSumber": "publik",
    "judul": "Cloud Technology: PaaS platform (BRI)",
    "url": "https://www.redhat.com/en/resources/bca-case-study",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "Red Hat case studies (https://www.redhat.com/en/resources/bca-case-study; .../bri-and-bank-ocbc-nisp...) (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-98",
    "findingId": "f-csv-98",
    "tipeSumber": "publik",
    "judul": "Cloud Technology: PaaS platform (Mandiri)",
    "url": "https://www.redhat.com/en/resources/bca-case-study",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "Red Hat case studies (https://www.redhat.com/en/resources/bca-case-study; .../bri-and-bank-ocbc-nisp...) (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-99",
    "findingId": "f-csv-99",
    "tipeSumber": "publik",
    "judul": "Cloud Technology: PaaS platform (BCA)",
    "url": "https://www.redhat.com/en/resources/bca-case-study",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "Red Hat case studies (https://www.redhat.com/en/resources/bca-case-study; .../bri-and-bank-ocbc-nisp...) (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-100",
    "findingId": "f-csv-100",
    "tipeSumber": "publik",
    "judul": "Cloud Technology: GitOps / CD (BRI)",
    "url": "https://www.cloudcomputing.id/berita/bri-google-cloud-izeno-kolaborasi-transformasi",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.cloudcomputing.id/berita/bri-google-cloud-izeno-kolaborasi-transformasi; https://blog.google/intl/id-id/products/cloud/2023_06_google-cloud-summit-jakarta-2023-bank-bri/ (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-101",
    "findingId": "f-csv-101",
    "tipeSumber": "publik",
    "judul": "Cloud Technology: Data residency / sovereign cloud (BRI)",
    "url": "https://www.ojk.go.id/id/regulasi/Pages/default.aspx",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.ojk.go.id/id/regulasi/Pages/default.aspx  (cari: POJK 11/POJK.03/2022 Penyelenggaraan TI oleh Bank Umum - kutip verbatim per pasal)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-102",
    "findingId": "f-csv-102",
    "tipeSumber": "publik",
    "judul": "Cloud Technology: Data residency / sovereign cloud (Mandiri)",
    "url": "https://www.ojk.go.id/id/regulasi/Pages/default.aspx",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.ojk.go.id/id/regulasi/Pages/default.aspx  (cari: POJK 11/POJK.03/2022 Penyelenggaraan TI oleh Bank Umum - kutip verbatim per pasal)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-103",
    "findingId": "f-csv-103",
    "tipeSumber": "publik",
    "judul": "Cloud Technology: Data residency / sovereign cloud (BCA)",
    "url": "https://www.ojk.go.id/id/regulasi/Pages/default.aspx",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.ojk.go.id/id/regulasi/Pages/default.aspx  (cari: POJK 11/POJK.03/2022 Penyelenggaraan TI oleh Bank Umum - kutip verbatim per pasal)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-104",
    "findingId": "f-csv-104",
    "tipeSumber": "publik",
    "judul": "Cloud Technology: Data residency / sovereign cloud (BNI)",
    "url": "https://www.ojk.go.id/id/regulasi/Pages/default.aspx",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.ojk.go.id/id/regulasi/Pages/default.aspx  (cari: POJK 11/POJK.03/2022 Penyelenggaraan TI oleh Bank Umum - kutip verbatim per pasal)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-105",
    "findingId": "f-csv-105",
    "tipeSumber": "publik",
    "judul": "Cloud Technology: Data residency / sovereign cloud (BTN)",
    "url": "https://www.ojk.go.id/id/regulasi/Pages/default.aspx",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.ojk.go.id/id/regulasi/Pages/default.aspx  (cari: POJK 11/POJK.03/2022 Penyelenggaraan TI oleh Bank Umum - kutip verbatim per pasal)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-106",
    "findingId": "f-csv-106",
    "tipeSumber": "publik",
    "judul": "Cloud Technology: Data residency / sovereign cloud (BSI)",
    "url": "https://www.ojk.go.id/id/regulasi/Pages/default.aspx",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.ojk.go.id/id/regulasi/Pages/default.aspx  (cari: POJK 11/POJK.03/2022 Penyelenggaraan TI oleh Bank Umum - kutip verbatim per pasal)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-107",
    "findingId": "f-csv-107",
    "tipeSumber": "publik",
    "judul": "Cloud Technology: Data center (Tier III/IV) / colo (BCA)",
    "url": "https://www.liputan6.com/saham/read/5467651/data-center-bca-bakal-beroperasi-pada-2025",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.liputan6.com/saham/read/5467651/data-center-bca-bakal-beroperasi-pada-2025 (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-108",
    "findingId": "f-csv-108",
    "tipeSumber": "publik",
    "judul": "Cloud Technology: Persetujuan cloud regulator (POJK) (BRI)",
    "url": "https://www.ojk.go.id/id/regulasi/Pages/default.aspx",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.ojk.go.id/id/regulasi/Pages/default.aspx  (cari: POJK 11/POJK.03/2022 Penyelenggaraan TI oleh Bank Umum - kutip verbatim per pasal)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-109",
    "findingId": "f-csv-109",
    "tipeSumber": "publik",
    "judul": "Cloud Technology: Persetujuan cloud regulator (POJK) (Mandiri)",
    "url": "https://www.ojk.go.id/id/regulasi/Pages/default.aspx",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.ojk.go.id/id/regulasi/Pages/default.aspx  (cari: POJK 11/POJK.03/2022 Penyelenggaraan TI oleh Bank Umum - kutip verbatim per pasal)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-110",
    "findingId": "f-csv-110",
    "tipeSumber": "publik",
    "judul": "Cloud Technology: Persetujuan cloud regulator (POJK) (BCA)",
    "url": "https://www.ojk.go.id/id/regulasi/Pages/default.aspx",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.ojk.go.id/id/regulasi/Pages/default.aspx  (cari: POJK 11/POJK.03/2022 Penyelenggaraan TI oleh Bank Umum - kutip verbatim per pasal)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-111",
    "findingId": "f-csv-111",
    "tipeSumber": "publik",
    "judul": "Cloud Technology: Persetujuan cloud regulator (POJK) (BNI)",
    "url": "https://www.ojk.go.id/id/regulasi/Pages/default.aspx",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.ojk.go.id/id/regulasi/Pages/default.aspx  (cari: POJK 11/POJK.03/2022 Penyelenggaraan TI oleh Bank Umum - kutip verbatim per pasal)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-112",
    "findingId": "f-csv-112",
    "tipeSumber": "publik",
    "judul": "Cloud Technology: Persetujuan cloud regulator (POJK) (BTN)",
    "url": "https://www.ojk.go.id/id/regulasi/Pages/default.aspx",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.ojk.go.id/id/regulasi/Pages/default.aspx  (cari: POJK 11/POJK.03/2022 Penyelenggaraan TI oleh Bank Umum - kutip verbatim per pasal)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-113",
    "findingId": "f-csv-113",
    "tipeSumber": "publik",
    "judul": "Cloud Technology: Persetujuan cloud regulator (POJK) (BSI)",
    "url": "https://www.ojk.go.id/id/regulasi/Pages/default.aspx",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.ojk.go.id/id/regulasi/Pages/default.aspx  (cari: POJK 11/POJK.03/2022 Penyelenggaraan TI oleh Bank Umum - kutip verbatim per pasal)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-114",
    "findingId": "f-csv-114",
    "tipeSumber": "publik",
    "judul": "Infrastructure: Server compute (x86) (BRI)",
    "url": "https://www.cisco.com/c/dam/en/us/solutions/collateral/data-center-virtualization/20130605_cisco_bribank_cs.pdf",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "Cisco case study BRI (https://www.cisco.com/c/dam/en/us/solutions/collateral/data-center-virtualization/20130605_cisco_bribank_cs.pdf) - data c.2013, perlu konfirmasi terkini",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-115",
    "findingId": "f-csv-115",
    "tipeSumber": "publik",
    "judul": "Infrastructure: Virtualization platform (BRI)",
    "url": "https://www.cisco.com/c/dam/en/us/solutions/collateral/data-center-virtualization/20130605_cisco_bribank_cs.pdf",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "Cisco case study BRI (https://www.cisco.com/c/dam/en/us/solutions/collateral/data-center-virtualization/20130605_cisco_bribank_cs.pdf) - data c.2013, perlu konfirmasi terkini",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-116",
    "findingId": "f-csv-116",
    "tipeSumber": "publik",
    "judul": "Infrastructure: Container platform (BRI)",
    "url": "https://www.redhat.com/en/resources/bca-case-study",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "Red Hat case studies (https://www.redhat.com/en/resources/bca-case-study; https://www.redhat.com/en/about/press-releases/bri-and-bank-ocbc-nisp-acknowledged-creative-use-open-source-red-hat-apac-innovation-awards-2023-indonesia) (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-117",
    "findingId": "f-csv-117",
    "tipeSumber": "publik",
    "judul": "Infrastructure: Container platform (Mandiri)",
    "url": "https://www.redhat.com/en/resources/bca-case-study",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "Red Hat case studies (https://www.redhat.com/en/resources/bca-case-study; https://www.redhat.com/en/about/press-releases/bri-and-bank-ocbc-nisp-acknowledged-creative-use-open-source-red-hat-apac-innovation-awards-2023-indonesia) (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-118",
    "findingId": "f-csv-118",
    "tipeSumber": "publik",
    "judul": "Infrastructure: Container platform (BCA)",
    "url": "https://www.redhat.com/en/resources/bca-case-study",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "Red Hat case studies (https://www.redhat.com/en/resources/bca-case-study; https://www.redhat.com/en/about/press-releases/bri-and-bank-ocbc-nisp-acknowledged-creative-use-open-source-red-hat-apac-innovation-awards-2023-indonesia) (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-119",
    "findingId": "f-csv-119",
    "tipeSumber": "publik",
    "judul": "Infrastructure: Bahasa pemrograman backend (Java/Go/Node) (BRI)",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "Indikasi dari lowongan Golang banking & GitHub (golang.cafe; builtin.com) (diakses 13 Okt 2026) - bukan pernyataan resmi",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-120",
    "findingId": "f-csv-120",
    "tipeSumber": "publik",
    "judul": "Infrastructure: Bahasa pemrograman backend (Java/Go/Node) (Mandiri)",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "Indikasi dari lowongan/LinkedIn engineer Mandiri (freehire.me; linkedin.com) (diakses 13 Okt 2026) - bukan pernyataan resmi",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-121",
    "findingId": "f-csv-121",
    "tipeSumber": "publik",
    "judul": "Network: Core router/switch (BRI)",
    "url": "https://www.cisco.com/c/dam/en/us/solutions/collateral/data-center-virtualization/20130605_cisco_bribank_cs.pdf",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "Cisco case study BRI (https://www.cisco.com/c/dam/en/us/solutions/collateral/data-center-virtualization/20130605_cisco_bribank_cs.pdf) - data c.2013, perlu konfirmasi terkini",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-122",
    "findingId": "f-csv-122",
    "tipeSumber": "publik",
    "judul": "IT Support (ITSM): ITSM platform (BRI)",
    "url": "https://www.cloudcomputing.id/berita/bri-google-cloud-izeno-kolaborasi-transformasi",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.cloudcomputing.id/berita/bri-google-cloud-izeno-kolaborasi-transformasi (Atlassian ITSM & Apigee) (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-123",
    "findingId": "f-csv-123",
    "tipeSumber": "publik",
    "judul": "IT Support (ITSM): CI/CD pipeline (Jenkins/GitLab CI/Argo) (BRI)",
    "url": "https://www.cloudcomputing.id/berita/bri-google-cloud-izeno-kolaborasi-transformasi",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.cloudcomputing.id/berita/bri-google-cloud-izeno-kolaborasi-transformasi (DevOps + Atlassian) (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-124",
    "findingId": "f-csv-124",
    "tipeSumber": "publik",
    "judul": "IT Support (ITSM): CI/CD pipeline (Jenkins/GitLab CI/Argo) (Mandiri)",
    "url": "https://www.redhat.com/en/resources/bca-case-study",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "Red Hat case studies (https://www.redhat.com/en/resources/bca-case-study) (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-125",
    "findingId": "f-csv-125",
    "tipeSumber": "publik",
    "judul": "IT Support (ITSM): CI/CD pipeline (Jenkins/GitLab CI/Argo) (BCA)",
    "url": "https://www.redhat.com/en/resources/bca-case-study",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "Red Hat case studies (https://www.redhat.com/en/resources/bca-case-study) (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-126",
    "findingId": "f-csv-126",
    "tipeSumber": "publik",
    "judul": "IT Support (ITSM): Automation testing (functional/regression) (BCA)",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "Pola industri: CI/CD standar pada DevOps OpenShift/Kubernetes - inferensi",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-127",
    "findingId": "f-csv-127",
    "tipeSumber": "publik",
    "judul": "IT Support (ITSM): DevSecOps / security testing (SAST/DAST) (Mandiri)",
    "url": "https://www.redhat.com/en/resources/bca-case-study",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "Red Hat case studies (https://www.redhat.com/en/resources/bca-case-study) (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-128",
    "findingId": "f-csv-128",
    "tipeSumber": "publik",
    "judul": "IT Support (ITSM): DevSecOps / security testing (SAST/DAST) (BCA)",
    "url": "https://www.redhat.com/en/resources/bca-case-study",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "Red Hat case studies (https://www.redhat.com/en/resources/bca-case-study) (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-129",
    "findingId": "f-csv-129",
    "tipeSumber": "publik",
    "judul": "Big Data Analytics: Fraud detection system (BRI)",
    "url": "https://digital.bri.co.id/article/bribrain-bawa-masa-depan-bri-dari-mobile-first-jadi-4xz6",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://digital.bri.co.id/article/bribrain-bawa-masa-depan-bri-dari-mobile-first-jadi-4xz6 (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-130",
    "findingId": "f-csv-130",
    "tipeSumber": "publik",
    "judul": "Big Data Analytics: Fraud detection system (BNI)",
    "url": "https://infobanknews.com/bni-perluas-pemanfaatan-ai-perkuat-operasional-hingga-keamanan-data/",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://infobanknews.com/bni-perluas-pemanfaatan-ai-perkuat-operasional-hingga-keamanan-data/ (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-131",
    "findingId": "f-csv-131",
    "tipeSumber": "publik",
    "judul": "Big Data Analytics: Credit scoring engine (BRI)",
    "url": "https://digital.bri.co.id/article/bribrain-bawa-masa-depan-bri-dari-mobile-first-jadi-4xz6",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://digital.bri.co.id/article/bribrain-bawa-masa-depan-bri-dari-mobile-first-jadi-4xz6 (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-132",
    "findingId": "f-csv-132",
    "tipeSumber": "publik",
    "judul": "Big Data Analytics: Credit scoring engine (Mandiri)",
    "url": "https://medium.com/@aulianurfajriyah311/implementasi-artificial-intelligence-di-bank-mandiri-bd1a319b539c",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://medium.com/@aulianurfajriyah311/implementasi-artificial-intelligence-di-bank-mandiri-bd1a319b539c (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-133",
    "findingId": "f-csv-133",
    "tipeSumber": "publik",
    "judul": "Big Data Analytics: Recommendation engine (BRI)",
    "url": "https://digital.bri.co.id/article/bribrain-bawa-masa-depan-bri-dari-mobile-first-jadi-4xz6",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://digital.bri.co.id/article/bribrain-bawa-masa-depan-bri-dari-mobile-first-jadi-4xz6 (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-134",
    "findingId": "f-csv-134",
    "tipeSumber": "publik",
    "judul": "Big Data Analytics: Recommendation engine (BNI)",
    "url": "https://infobanknews.com/bni-perluas-pemanfaatan-ai-perkuat-operasional-hingga-keamanan-data/",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://infobanknews.com/bni-perluas-pemanfaatan-ai-perkuat-operasional-hingga-keamanan-data/ (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-135",
    "findingId": "f-csv-135",
    "tipeSumber": "publik",
    "judul": "Big Data Analytics: Data science platform (BCA)",
    "url": "https://infobanknews.com/bca-perkuat-fondasi-digital-lewat-modernisasi-infrastruktur-data-berbasis-ai/",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://infobanknews.com/bca-perkuat-fondasi-digital-lewat-modernisasi-infrastruktur-data-berbasis-ai/ (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-136",
    "findingId": "f-csv-136",
    "tipeSumber": "publik",
    "judul": "Big Data Analytics: Bahasa pemrograman analitik (Python/Scala/SQL) (BRI)",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "Pola industri perbankan (Go/Java umum utk microservices; Python utk analitik/AI) - inferensi",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-137",
    "findingId": "f-csv-137",
    "tipeSumber": "publik",
    "judul": "Big Data Analytics: Bahasa pemrograman analitik (Python/Scala/SQL) (Mandiri)",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "Pola industri perbankan (Go/Java umum utk microservices; Python utk analitik/AI) - inferensi",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-138",
    "findingId": "f-csv-138",
    "tipeSumber": "publik",
    "judul": "Big Data Analytics: Bahasa pemrograman analitik (Python/Scala/SQL) (BNI)",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "Pola industri perbankan (Go/Java umum utk microservices; Python utk analitik/AI) - inferensi",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-139",
    "findingId": "f-csv-139",
    "tipeSumber": "publik",
    "judul": "AI Technology: Platform AI/ML (BRI)",
    "url": "https://digital.bri.co.id/article/bribrain-bawa-masa-depan-bri-dari-mobile-first-jadi-4xz6",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://digital.bri.co.id/article/bribrain-bawa-masa-depan-bri-dari-mobile-first-jadi-4xz6 (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-140",
    "findingId": "f-csv-140",
    "tipeSumber": "publik",
    "judul": "AI Technology: Platform AI/ML (Mandiri)",
    "url": "https://medium.com/@aulianurfajriyah311/implementasi-artificial-intelligence-di-bank-mandiri-bd1a319b539c",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://medium.com/@aulianurfajriyah311/implementasi-artificial-intelligence-di-bank-mandiri-bd1a319b539c (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-141",
    "findingId": "f-csv-141",
    "tipeSumber": "publik",
    "judul": "AI Technology: Platform AI/ML (BCA)",
    "url": "https://infobanknews.com/bca-perkuat-fondasi-digital-lewat-modernisasi-infrastruktur-data-berbasis-ai/",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://infobanknews.com/bca-perkuat-fondasi-digital-lewat-modernisasi-infrastruktur-data-berbasis-ai/ (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-142",
    "findingId": "f-csv-142",
    "tipeSumber": "publik",
    "judul": "AI Technology: Platform AI/ML (BNI)",
    "url": "https://infobanknews.com/bni-perluas-pemanfaatan-ai-perkuat-operasional-hingga-keamanan-data/",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://infobanknews.com/bni-perluas-pemanfaatan-ai-perkuat-operasional-hingga-keamanan-data/ (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-143",
    "findingId": "f-csv-143",
    "tipeSumber": "publik",
    "judul": "AI Technology: Bahasa pemrograman AI/ML (Python) (BRI)",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "Pola industri perbankan (Go/Java umum utk microservices; Python utk analitik/AI) - inferensi",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-144",
    "findingId": "f-csv-144",
    "tipeSumber": "publik",
    "judul": "AI Technology: Bahasa pemrograman AI/ML (Python) (Mandiri)",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "Pola industri perbankan (Go/Java umum utk microservices; Python utk analitik/AI) - inferensi",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-145",
    "findingId": "f-csv-145",
    "tipeSumber": "publik",
    "judul": "AI Technology: Bahasa pemrograman AI/ML (Python) (BNI)",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "Pola industri perbankan (Go/Java umum utk microservices; Python utk analitik/AI) - inferensi",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-146",
    "findingId": "f-csv-146",
    "tipeSumber": "publik",
    "judul": "AI Technology: MLOps platform (BCA)",
    "url": "https://infobanknews.com/bca-perkuat-fondasi-digital-lewat-modernisasi-infrastruktur-data-berbasis-ai/",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://infobanknews.com/bca-perkuat-fondasi-digital-lewat-modernisasi-infrastruktur-data-berbasis-ai/ (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-147",
    "findingId": "f-csv-147",
    "tipeSumber": "publik",
    "judul": "AI Technology: Model registry (BCA)",
    "url": "https://infobanknews.com/bca-perkuat-fondasi-digital-lewat-modernisasi-infrastruktur-data-berbasis-ai/",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://infobanknews.com/bca-perkuat-fondasi-digital-lewat-modernisasi-infrastruktur-data-berbasis-ai/ (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-148",
    "findingId": "f-csv-148",
    "tipeSumber": "publik",
    "judul": "AI Technology: Model serving / inference (BCA)",
    "url": "https://infobanknews.com/bca-perkuat-fondasi-digital-lewat-modernisasi-infrastruktur-data-berbasis-ai/",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://infobanknews.com/bca-perkuat-fondasi-digital-lewat-modernisasi-infrastruktur-data-berbasis-ai/ (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-149",
    "findingId": "f-csv-149",
    "tipeSumber": "publik",
    "judul": "AI Technology: Model serving / inference (BNI)",
    "url": "https://infobanknews.com/bni-perluas-pemanfaatan-ai-perkuat-operasional-hingga-keamanan-data/",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://infobanknews.com/bni-perluas-pemanfaatan-ai-perkuat-operasional-hingga-keamanan-data/ (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-150",
    "findingId": "f-csv-150",
    "tipeSumber": "publik",
    "judul": "AI Technology: GPU / AI accelerator (BNI)",
    "url": "https://infobanknews.com/bni-perluas-pemanfaatan-ai-perkuat-operasional-hingga-keamanan-data/",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://infobanknews.com/bni-perluas-pemanfaatan-ai-perkuat-operasional-hingga-keamanan-data/ (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-151",
    "findingId": "f-csv-151",
    "tipeSumber": "publik",
    "judul": "AI Technology: Akses LLM / foundation model (BNI)",
    "url": "https://infobanknews.com/bni-perluas-pemanfaatan-ai-perkuat-operasional-hingga-keamanan-data/",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://infobanknews.com/bni-perluas-pemanfaatan-ai-perkuat-operasional-hingga-keamanan-data/ (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-152",
    "findingId": "f-csv-152",
    "tipeSumber": "publik",
    "judul": "AI Technology: LLM lokal / sovereign (BNI)",
    "url": "https://infobanknews.com/bni-perluas-pemanfaatan-ai-perkuat-operasional-hingga-keamanan-data/",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://infobanknews.com/bni-perluas-pemanfaatan-ai-perkuat-operasional-hingga-keamanan-data/ (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-153",
    "findingId": "f-csv-153",
    "tipeSumber": "publik",
    "judul": "AI Technology: Chatbot / virtual assistant (BRI)",
    "url": "https://digital.bri.co.id/article/bribrain-bawa-masa-depan-bri-dari-mobile-first-jadi-4xz6",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://digital.bri.co.id/article/bribrain-bawa-masa-depan-bri-dari-mobile-first-jadi-4xz6 (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-154",
    "findingId": "f-csv-154",
    "tipeSumber": "publik",
    "judul": "AI Technology: Chatbot / virtual assistant (Mandiri)",
    "url": "https://www.bankmandiri.co.id/en/news-detail?primaryKey=44285018",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://www.bankmandiri.co.id/en/news-detail?primaryKey=44285018 (MITA); https://medium.com/@aulianurfajriyah311/implementasi-artificial-intelligence-di-bank-mandiri-bd1a319b539c (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-155",
    "findingId": "f-csv-155",
    "tipeSumber": "publik",
    "judul": "AI Technology: Chatbot / virtual assistant (BNI)",
    "url": "https://infobanknews.com/bni-perluas-pemanfaatan-ai-perkuat-operasional-hingga-keamanan-data/",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://infobanknews.com/bni-perluas-pemanfaatan-ai-perkuat-operasional-hingga-keamanan-data/ (diakses 13 Okt 2026)",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-156",
    "findingId": "f-csv-156",
    "tipeSumber": "publik",
    "judul": "AI Technology: Kepatuhan regulasi AI (OJK/UU PDP) (BRI)",
    "url": "https://peraturan.bpk.go.id",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://peraturan.bpk.go.id  (cari: UU 27/2022 PDP) ; https://www.ojk.go.id/id/regulasi  (aturan TI terkait) - kutip verbatim",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-157",
    "findingId": "f-csv-157",
    "tipeSumber": "publik",
    "judul": "AI Technology: Kepatuhan regulasi AI (OJK/UU PDP) (Mandiri)",
    "url": "https://peraturan.bpk.go.id",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://peraturan.bpk.go.id  (cari: UU 27/2022 PDP) ; https://www.ojk.go.id/id/regulasi  (aturan TI terkait) - kutip verbatim",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-158",
    "findingId": "f-csv-158",
    "tipeSumber": "publik",
    "judul": "AI Technology: Kepatuhan regulasi AI (OJK/UU PDP) (BCA)",
    "url": "https://peraturan.bpk.go.id",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://peraturan.bpk.go.id  (cari: UU 27/2022 PDP) ; https://www.ojk.go.id/id/regulasi  (aturan TI terkait) - kutip verbatim",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-159",
    "findingId": "f-csv-159",
    "tipeSumber": "publik",
    "judul": "AI Technology: Kepatuhan regulasi AI (OJK/UU PDP) (BNI)",
    "url": "https://peraturan.bpk.go.id",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://peraturan.bpk.go.id  (cari: UU 27/2022 PDP) ; https://www.ojk.go.id/id/regulasi  (aturan TI terkait) - kutip verbatim",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-160",
    "findingId": "f-csv-160",
    "tipeSumber": "publik",
    "judul": "AI Technology: Kepatuhan regulasi AI (OJK/UU PDP) (BTN)",
    "url": "https://peraturan.bpk.go.id",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://peraturan.bpk.go.id  (cari: UU 27/2022 PDP) ; https://www.ojk.go.id/id/regulasi  (aturan TI terkait) - kutip verbatim",
    "pencatat": "Admin"
  },
  {
    "id": "ev-csv-161",
    "findingId": "f-csv-161",
    "tipeSumber": "publik",
    "judul": "AI Technology: Kepatuhan regulasi AI (OJK/UU PDP) (BSI)",
    "url": "https://peraturan.bpk.go.id",
    "tanggalAkses": "2026-10-13",
    "kutipanRingkas": "https://peraturan.bpk.go.id  (cari: UU 27/2022 PDP) ; https://www.ojk.go.id/id/regulasi  (aturan TI terkait) - kutip verbatim",
    "pencatat": "Admin"
  }
];

export const INITIAL_INTERVIEWS: Interview[] = [
  {
    "id": "int-001",
    "bankId": "bank-bri",
    "kodeNarasumber": "Narasumber EA-01 (Anonim)",
    "divisi": "Divisi Enterprise Architecture & IT Strategy",
    "tanggal": "2026-02-10",
    "ringkasan": "Konfirmasi adopsi hybrid cloud: data sensitif nasabah inti tetap berada di on-premise Tier 4 DC, sementara microservices mobile non-transaksional memanfaatkan Google Cloud Jakarta Region sesuai POJK 11/2022.",
    "persetujuanNarasumber": true
  },
  {
    "id": "int-002",
    "bankId": "bank-mandiri",
    "kodeNarasumber": "Narasumber DE-02 (Anonim)",
    "divisi": "Data Management & Analytics Group",
    "tanggal": "2026-02-18",
    "ringkasan": "Validasi keberadaan IBM InfoSphere DataStage untuk legacy batch ETL harian, sementara inisiatif baru analitik dialihkan ke Cloudera EIDP dan Dataiku DSS untuk modeling credit scoring open finance.",
    "persetujuanNarasumber": true
  },
  {
    "id": "int-003",
    "bankId": "bank-bni",
    "kodeNarasumber": "Narasumber CL-03 (Anonim)",
    "divisi": "Digital Architecture & Operations",
    "tanggal": "2026-03-02",
    "ringkasan": "Penggunaan Cloudera AI Inference bersama NVIDIA NIM on-premise untuk pemrosesan sovereign LLM product knowledge dan percepatan verifikasi AI-KYC.",
    "persetujuanNarasumber": true
  }
];

export const INITIAL_USERS: User[] = [
  {
    "id": "usr-1",
    "nama": "Admin",
    "email": "admin@bri.co.id",
    "role": "Admin",
    "avatar": "👨‍💼",
    "password": "admin123"
  },
  {
    "id": "usr-2",
    "nama": "Siti Rahmawati (Tech Analyst)",
    "email": "analyst@bri.co.id",
    "role": "Analyst",
    "avatar": "👩‍💻",
    "password": "analyst123"
  },
  {
    "id": "usr-3",
    "nama": "Budi Hartono (Executive Director BRI)",
    "email": "executive@bri.co.id",
    "role": "Viewer",
    "avatar": "👔",
    "password": "bri123"
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    "id": "aud-001",
    "userId": "usr-1",
    "userName": "Admin",
    "aksi": "IMPORT",
    "entitas": "Finding",
    "detail": "Sinkronisasi 161 temuan riset terverifikasi dari Banking Technology Research - Sheet1.csv mencakup 6 bank (BRI, Mandiri, BCA, BNI, BTN, BSI).",
    "timestamp": "2026-10-14 08:30:00"
  },
  {
    "id": "aud-002",
    "userId": "usr-1",
    "userName": "Admin",
    "aksi": "PUBLISH",
    "entitas": "Technology",
    "detail": "Pembaruan 72 katalog teknologi perbankan modern dan benchmark kesiapan GenAI.",
    "timestamp": "2026-10-14 08:30:05"
  }
];
