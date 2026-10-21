# 🏦 Competitor Intelligence: Tech Stack Bank BRI vs Himbara & BCA

[![React 18](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js & Express](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express%205-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![SQLite](https://img.shields.io/badge/Database-SQLite%203-003B57?logo=sqlite&logoColor=white)](https://www.sqlite.org/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS%203.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Container-Docker%20%26%20Compose-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![Vercel Ready](https://img.shields.io/badge/Deployment-Vercel%20Serverless-000000?logo=vercel&logoColor=white)](https://vercel.com/)
[![UU PDP Compliant](https://img.shields.io/badge/Compliance-UU%20PDP%20No.%2027%2F2022-success)](#-kepatuhan-legal--privasi-uu-pdp)

Platform intelijen teknologi perbankan berbasis bukti (*evidence-based competitor intelligence*) yang memetakan dan membandingkan **tech stack PT Bank Rakyat Indonesia (Persero) Tbk** terhadap 5 bank kompetitor utama: **Bank Mandiri, Bank Central Asia (BCA), Bank BNI, Bank BTN, dan Bank Syariah Indonesia (BSI)**.

Aplikasi ini mencakup **409 kapabilitas arsitektur × 6 bank = 2.454 titik evaluasi data riset**, dikelompokkan ke dalam **Pilar Workshop Dinamis (WS1–WS5)**, **14 domain teknologi**, dan **10 kategori arsitektur**. Dibangun sesuai spesifikasi **Product Requirement Document (PRD v1.1 As-Built)** untuk kebutuhan workshop strategis, audit pembuktian, dan pengambilan keputusan jajaran arsitek dan pimpinan teknologi Bank BRI.

---

## 📌 Daftar Isi

1. [Fitur Utama & Modul Aplikasi](#-fitur-utama--modul-aplikasi)
   - [Executive Dashboard Overview](#1-executive-dashboard-overview-analisis)
   - [Matriks Riset Interaktif (Matrix View)](#2-matriks-riset-interaktif-matrix-view)
   - [Head-to-Head Diff View](#3-head-to-head-diff-view)
   - [Blueprint Arsitektur 5-Layer](#4-blueprint-arsitektur-5-layer-arsitektur-perbankan-modern)
   - [Gap Analysis & Rekomendasi Roadmap](#5-gap-analysis--rekomendasi-roadmap)
   - [Profil Bank & Bibliografi Bukti](#6-profil-bank--bibliografi-bukti)
   - [Katalog Kapabilitas & Teknologi](#7-katalog-kapabilitas--teknologi)
   - [Admin CMS & Tata Kelola Riset](#8-admin-cms--tata-kelola-riset)
   - [Google Sheets Live Sync Center](#9-google-sheets-live-sync-center-2-way-sync)
2. [Stack Teknologi & Arsitektur Sistem](#-stack-teknologi--arsitektur-sistem)
3. [Struktur Direktori Proyek](#-struktur-direktori-proyek)
4. [Cara Instalasi & Menjalankan](#-cara-instalasi--menjalankan)
   - [Opsi 1: Server Terpadu Lokal (Recommended)](#opsi-1-server-terpadu-lokal-backend--sqlite--frontend)
   - [Opsi 2: Mode Frontend Dev (Vite)](#opsi-2-mode-frontend-dev-vite)
   - [Opsi 3: Menjalankan via Docker & Docker Compose](#opsi-3-menjalankan-via-docker--docker-compose)
   - [Opsi 4: Deployment Serverless ke Vercel](#opsi-4-deployment-serverless-ke-vercel)
5. [Panduan Integrasi Google Sheets Live Sync](#-panduan-integrasi-google-sheets-live-sync)
6. [Navigasi & Shortcut Keyboard](#-navigasi--shortcut-keyboard)
7. [Kepatuhan Legal & Privasi (UU PDP)](#-kepatuhan-legal--privasi-uu-pdp)

---

## 🚀 Fitur Utama & Modul Aplikasi

### 1. Executive Dashboard Overview (Analisis)
- **Ringkasan Eksekutif & KPI Utama:**
  - Total kapabilitas terpetakan (409 kapabilitas × 6 bank = 2.454 titik evaluasi).
  - Rasio verifikasi data (*Verification Rate*): 380 sel terverifikasi (15,5%) dan 440 sel terisi (17,9%) per 21 Oktober 2026.
  - Komparasi progres kelengkapan stack: BRI memimpin dengan 83 kapabilitas terverifikasi (20,3%), disusul Bank Mandiri 79 (19,3%), BCA 77 (18,8%), BNI 70 (17,1%), BSI 42 (10,3%), dan BTN 29 (7,1%).
- **Strategic Highlights:**
  - **Hanya BRI:** Komponen eksklusif terbukti skala ultra-mikro (cluster Apache Cassandra triliunan mutasi, MinIO distributed object storage, asisten AI Sabrina NLP, arsitektur distributed microservices).
  - **Celah / Peluang Kompetitor:** Teknologi yang telah digunakan Mandiri atau BCA namun belum terdeteksi di BRI (AWS Hybrid Cloud lifestyle Livin' Sukha, Dataiku MLOps collaborative platform, HashiCorp Vault secrets management, dll.).
  - **Standar Konsensus Industri:** Standar de-facto perbankan nasional (Red Hat OpenShift, Apache Kafka / Confluent, Java Spring Boot, SNAP BI-FAST Bank Indonesia).
- **Profil Cepat 6 Bank Benchmark:** Akses instan ke status adopsi masing-masing bank perseroan dan swasta utama.

### 2. Matriks Riset Interaktif (Matrix View)
- **Matriks Komparasi 409 Kapabilitas × 6 Bank (2.454 Sel Evaluasi):**
  - Baris dikelompokkan berdasarkan domain dan kategori arsitektur.
  - Kolom bank: **Bank BRI (disorot khusus dengan aksen korporat)**, Bank Mandiri, Bank BCA, Bank BNI, Bank BTN, dan Bank BSI.
- **Status Verifikasi Data:**
  - `✓ Terverifikasi` (Badge Hijau): Bersumber langsung dari data publik primer (studi kasus vendor resmi, conference talk arsitek, siaran pers, laporan tahunan, atau ≥2 narasumber).
  - `~ Inferensi` (Badge Kuning): Kuat terindikasi dari kombinasi lowongan kerja teknis, sertifikasi arsitek, atau integrasi pihak ketiga.
  - `– Belum` (Badge Abu-abu): Belum terdeteksi atau bank belum mengadopsi solusi di kapabilitas tersebut.
- **Filter Multi-Level Fleksibel:**
  - Dropdown **Pilar Workshop Dinamis**: Mendukung workshop standar (`WS1`, `WS2`, `WS3`, `WS4`) serta pilar kustom (`WS5`, `WS6`, dll.).
  - Filter Domain & Kategori Arsitektur.
  - Filter Status Verifikasi (`Semua`, `Terverifikasi Saja`, dll.).
  - Pencarian instan berdasarkan nama kapabilitas, merk, atau kata kunci stack.
- **Audit Detail Drawer (Klik Setiap Sel):**
  - Modal komprehensif menampilkan nama bank, kapabilitas, merk teknologi yang dipakai, link rujukan/sumber bukti primer, PIC pencatat riset, status verifikasi, dan tanggal verifikasi terakhir.
- **Ekspor CSV Terstruktur:** Unduh seluruh data tabel matriks dalam format CSV berstandar spreadsheet.

### 3. Head-to-Head Diff View
- **Komparasi 1-on-1 Langsung:**
  - Pilih lawan tanding: **BRI vs Bank Mandiri**, **BRI vs BCA**, **BRI vs BNI**, **BRI vs BTN**, atau **BRI vs BSI**.
- **Kalkulasi Otomatis Keselarasan Arsitektur:**
  - *Architecture Alignment Score* (% kesamaan merk/teknologi yang digunakan).
  - *Keunggulan Eksklusif BRI* (teknologi yang dimiliki BRI tetapi lawan belum mengadopsi).
  - *Celah Arsitektur (Tech Gaps)* (teknologi yang diadopsi lawan namun BRI belum terdeteksi).
  - Perbandingan matriks per kategori domain secara berdampingan.

### 4. Blueprint Arsitektur 5-Layer (Arsitektur Perbankan Modern)
Visualisasi interaktif 5 lapisan arsitektur enterprise perbankan modern:
1. **Layer 1: Touchpoint & Digital Channels**
   - *Consumer Mobile SuperApp* (BRImo vs Livin' vs myBCA vs wondr vs bale vs BYOND)
   - *Corporate Wholesale & Cash Management* (Qlola vs Kopra vs KlikBCA Bisnis)
   - *Open Banking & API Gateway* (SNAP BI terstandarisasi Bank Indonesia, BaaS Hub)
2. **Layer 2: Integration & Middleware Orchestration**
   - *Enterprise API Management & Gateway*
   - *Event Streaming & Distributed Messaging* (Apache Kafka / Confluent)
   - *Microservices Mesh & Transaction Switching*
3. **Layer 3: Core Financial Processing & Operations**
   - *Core Banking System (CBS)* & General Ledger
   - *Card Management System & Real-Time Settlement*
   - *Payment Switching & BI-FAST Interconnection*
4. **Layer 4: Enterprise Data Platform & AI Intelligence**
   - *Data Lakehouse & Big Data Analytics*
   - *Real-Time Business Intelligence & Operational Dashboards*
   - *Enterprise AI/ML Platform, Fraud Detection & Conversational AI (Sabrina)*
5. **Layer 5: Cloud Foundation, Infrastructure & Security**
   - *Hybrid Cloud & Private Data Center*
   - *Container Orchestration & Kubernetes (Red Hat OpenShift)*
   - *Distributed Relational & NoSQL Database (Cassandra, PostgreSQL, Oracle)*
   - *Enterprise Zero-Trust Security, Identity & Secrets Management*

*Setiap blok kapabilitas dapat diklik untuk membuka panel audit detail perbandingan adopsi lintas 6 bank.*

### 5. Gap Analysis & Rekomendasi Roadmap
- **Analisis Kesenjangan Otomatis:** Mengidentifikasi kapabilitas di mana kompetitor (khususnya Mandiri dan BCA) telah memvalidasi teknologi modern.
- **Pengelompokan Skala Prioritas:**
  - 🔴 **Prioritas Tinggi:** Domain kritis berdampak langsung pada keandalan sistem perbankan skala masif dan kepatuhan siber.
  - 🟡 **Prioritas Sedang:** Modernisasi tooling MLOps, orkestrasi analitik, dan efisiensi workflow data.
  - 🟢 **Prioritas Rendah:** Domain pendukung non-kritis atau inisiatif bertahap.
- **Rekomendasi Taktis Enterprise Architecture:** Poin aksi spesifik untuk diadopsi dalam roadmap transformasi digital Bank BRI.

### 6. Profil Bank & Bibliografi Bukti
- **Halaman Detail 6 Bank Terpantau:**
  - PT Bank Rakyat Indonesia (Persero) Tbk (Fokus Utama)
  - PT Bank Mandiri (Persero) Tbk
  - PT Bank Central Asia Tbk (BCA)
  - PT Bank Negara Indonesia (Persero) Tbk
  - PT Bank Tabungan Negara (Persero) Tbk
  - PT Bank Syariah Indonesia Tbk
- Identitas warna dan badge khas perseroan.
- Katalog produk digital unggulan per bank.
- Riwayat berkas bukti publik, publikasi resmi, dan studi kasus vendor.

### 7. Katalog Kapabilitas & Teknologi
- Direktori master seluruh merk teknologi yang dimonitor di lanskap perbankan.
- Filter berdasarkan vendor penyedia, kategori arsitektur, dan model lisensi:
  - 🟢 *Open Source*
  - 🔵 *Komersial Enterprise*
  - 🟣 *In-House Proprietary*
- Indikator adopsi teknologi di 6 bank.

### 8. Admin CMS & Tata Kelola Riset
- **Formulir Input Data Riset:**
  - Tambah kapabilitas baru dengan penomoran otomatis.
  - Pendaftaran teknologi dan pemetaan merk per bank.
  - Pencatatan wawancara narasumber dan bukti publik.
- **Audit Trail Log:**
  - Riwayat kronologis setiap perubahan data (siapa yang mengubah, kapan, dan perubahan yang dilakukan).
  - **Stempel Waktu Terlokalisasi WIB (UTC+7)** secara otomatis.
- **Checklist Kesiapan Workshop:**
  - Validasi 4 kriteria kelayakan data sebelum sesi presentasi workshop:
    1. Kelengkapan link bukti pada kapabilitas aktif.
    2. Rasio verifikasi data (Target ≥60% Terverifikasi).
    3. Kepatuhan anonimisasi narasumber terhadap UU PDP.
    4. Integritas status publikasi temuan.
- **Pencadangan & Pemulihan (Backup & Restore):**
  - Ekspor/Impor file JSON snapshot database.
  - Reset data ke kondisi pabrik (*factory seed*).

### 9. Google Sheets Live Sync Center (2-Way Sync)
- **Koneksi Spreadsheet Master Riset:** Terhubung langsung ke spreadsheet riset tim arsitektur.
- **Tarik Data (Pull Sync):** Mengambil pembaruan baris kapabilitas terbaru dari Google Sheets publik langsung ke database SQLite aplikasi tanpa server restart.
- **Kirim Data (Push Sync):**
  - **Opsi Webhook:** Mengalirkan perubahan data dari aplikasi ke Google Sheet secara otomatis melalui Google Apps Script Webhook.
  - **Opsi 1-Klik Salin Format Sheet:** Menyalin seluruh matriks yang sudah terformat rapi untuk di-paste langsung mulai dari sel A1 Google Sheet.
- **Auto-Sync Scheduler:**
  - Background scheduler otomatis berjalan saat startup.
  - Interval sinkronisasi otomatis yang dapat dikonfigurasi (`5 menit`, `15 menit`, `30 menit`, `1 jam`, atau `Manual`).
- **Penyimpanan Dinamis & Offline Mode:**
  - Badge deteksi otomatis: Mode Server SQLite aktif atau Mode Offline LocalStorage jika backend tidak terjangkau.

---

## 🛠️ Stack Teknologi & Arsitektur Sistem

```
┌────────────────────────────────────────────────────────────────────────┐
│                        FRONTEND (React 18 + Vite)                      │
│   Tailwind CSS (Solid High-Contrast) • Lucide Icons • Dark/Light Mode  │
│   AppContent • MatrixView • BlueprintView • H2H • GapAnalysis • CMS    │
└───────────────────▲────────────────────────────────▲───────────────────┘
                    │ REST API Client (/api/*)       │ Serverless Sync
┌───────────────────▼────────────────────────┐ ┌─────▼───────────────────┐
│        BACKEND (Node.js + Express 5)       │ │   VERCEL SERVERLESS     │
│   server/index.js • server/googleSync.js   │ │   api/sync/{pull,push}  │
└───────────────────▲────────────────────────┘ └─────────────────────────┘
                    │ Relational Queries & Transactions
┌───────────────────▼────────────────────────────────────────────────────┐
│                    DATABASE (SQLite 3 Relasional)                      │
│   data/competitor_intel.db (8 Tabel: banks, categories, technologies,   │
│   findings, evidences, interviews, research_matrix, audit_logs)        │
└───────────────────▲────────────────────────────────────────────────────┘
                    │ Two-Way Sync (Pull / Push Webhook)
┌───────────────────▼────────────────────────────────────────────────────┐
│              GOOGLE SHEETS MASTER RESEARCH SPREADSHEET                 │
│   scripts/google_apps_script.js (Google Apps Script Webhook Handler)   │
└────────────────────────────────────────────────────────────────────────┘
```

| Komponen | Teknologi | Keterangan |
| :--- | :--- | :--- |
| **Frontend Framework** | React 18.3, TypeScript 5.4 | SPA modern, modular, dan type-safe |
| **Styling & Design System** | Tailwind CSS 3.4 | Solid high-contrast palette, dark/light theme, micro-animations |
| **Icons & Visuals** | Lucide React | Ikonografi arsitektur & perbankan lengkap |
| **Build Tool** | Vite 5.3 | HMR ultra-cepat dan build bundler efisien |
| **Backend Server** | Node.js, Express 5.3, CORS | RESTful API terstruktur dan endpoint sinkronisasi |
| **Database** | SQLite 3 (`better-sqlite3` / `sqlite3`) | Skema relasional 8 tabel, foreign keys & ACID transactions |
| **Serverless Deployment** | Vercel Serverless Functions | Endpoint `/api/sync/*` mandiri via `vercel.json` |
| **Integrasi Eksternal** | Google Sheets API / Apps Script | Webhook sinkronisasi 2 arah dan scheduler background |
| **Containerization** | Docker, Docker Compose | Multi-stage production build dengan volume data persisten |

---

## 📁 Struktur Direktori Proyek

```
competitor-intelligence-bri/
├── api/                             # Serverless API endpoints untuk Vercel
│   └── sync/                        # Endpoint sinkronisasi Google Sheets
│       ├── config.js
│       ├── pull.js
│       ├── push.js
│       └── status.js
├── data/                            # File penyimpanan persisten
│   └── competitor_intel.db          # Database SQLite relasional
├── dist/                            # Production build bundle frontend
├── scripts/                         # Helper scripts & skrip webhook
│   └── google_apps_script.js        # Kode Webhook Google Apps Script untuk Google Sheets
├── server/                          # Backend Express & modul database
│   ├── db.js                        # Inisialisasi koneksi SQLite & skema tabel
│   ├── googleSync.js                # Engine sinkronisasi Google Sheets (Pull/Push)
│   ├── index.js                     # REST API Express Server utama
│   ├── researchMatrix.json          # Snapshot dataset 409 kapabilitas × 6 bank
│   ├── seed.js                      # Script database seeder
│   └── seedData.js                  # Data dasar bank, kategori, & finding awal
├── src/                             # Frontend Source Code
│   ├── components/
│   │   ├── admin/                   # CMS Admin, input riset, audit trail, checklist
│   │   ├── auth/                    # Halaman login solid high-contrast
│   │   ├── banks/                   # Halaman profil 6 bank & bibliografi
│   │   ├── blueprint/               # Visualizer 5-Layer Arsitektur Blueprint
│   │   ├── common/                  # Logo bank, badge status, & shared components
│   │   ├── dashboard/               # Executive Overview & KPI Dashboard
│   │   ├── gapanalysis/             # Gap analysis & rekomendasi roadmap
│   │   ├── headtohead/              # Komparasi 1-on-1 BRI vs Kompetitor
│   │   ├── layout/                  # Sidebar navigasi, Topbar, & mobile drawer
│   │   ├── matrix/                  # Matriks riset, modal detail audit, filter
│   │   ├── sync/                    # Modal UI Google Sheets Sync Center
│   │   ├── tech/                    # Katalog master teknologi & kapabilitas
│   │   └── ui/                      # Design system primitives (Button, Modal, Card, dll.)
│   ├── context/
│   │   └── AppContext.tsx           # State management global (Auth, Theme, Sync, Filter)
│   ├── data/
│   │   ├── researchMatrix.json      # Dataset cadangan frontend
│   │   └── seedData.ts              # Master seed TypeScript
│   ├── services/
│   │   └── api.ts                   # API client service dengan fallback offline
│   ├── types/
│   │   └── index.ts                 # Type definitions & data interfaces
│   ├── utils/                       # Helper format tanggal, ekspor CSV, & string
│   ├── App.tsx                      # Root App routing & keyboard shortcuts
│   ├── index.css                    # Tailwind CSS directives & custom styling
│   └── main.tsx                     # Entry point React DOM
├── .env.example                     # Contoh variabel lingkungan
├── Dockerfile                       # Multi-stage Dockerfile untuk produksi
├── docker-compose.yml               # Konfigurasi container dengan volume data
├── PRD_v1.0_Competitor_Intelligence_BRI_As-Built.md  # Spesifikasi lengkap PRD v1.0
├── REKOMENDASI_IMPROVEMENT_DAN_ROADMAP_FITUR.md     # Rekomendasi fitur masa depan
├── vercel.json                      # Konfigurasi deployment Vercel
├── package.json                     # Daftar dependensi & npm scripts
└── vite.config.ts                   # Konfigurasi bundler Vite
```

---

## 💻 Cara Instalasi & Menjalankan

### Prasyarat Sistem
- **Node.js**: Versi `18.x` atau lebih baru (`node -v`)
- **NPM**: Versi `9.x` atau lebih baru (`npm -v`)
- *(Opsional)* **Docker & Docker Compose** jika ingin menjalankan via container.

---

### Opsi 1: Server Terpadu Lokal (Backend + SQLite + Frontend)
Mode ini menjalankan backend Express, database SQLite, dan menyajikan frontend yang telah dibuild pada port yang sama:

```bash
# 1. Clone repositori & masuk ke folder proyek
cd "Competitor intelegent"

# 2. Pasang dependensi
npm install

# 3. Build bundle frontend terlebih dahulu
npm run build

# 4. Jalankan server terpadu
npm start
# atau
npm run server
```

Server terpadu akan berjalan pada: **`http://localhost:3000/`**
- **Frontend Web UI:** `http://localhost:3000/`
- **Backend REST API:** `http://localhost:3000/api/*`
- **File Database SQLite:** `data/competitor_intel.db`

---

### Opsi 2: Mode Frontend Dev (Vite)
Untuk pengembangan frontend dengan Hot Module Replacement (HMR) cepat:

```bash
npm run dev
```
Akses di browser pada: **`http://localhost:5173/`** *(otomatis terhubung ke backend API di port 3000 jika server aktif, atau menggunakan local fallback jika server tidak dinyalakan).*

---

### Opsi 3: Menjalankan via Docker & Docker Compose
Cara termudah untuk deployment lingkungan produksi yang terisolasi dan persisten:

```bash
# Build dan jalankan container di background
docker compose up -d --build

# Melihat log container
docker compose logs -f

# Menghentikan container
docker compose down
```

> **Catatan Volume Data:** Folder `./data` di-mount ke host machine secara otomatis agar file database SQLite (`competitor_intel.db`) tetap aman dan persisten meskipun container di-stop atau di-rebuild.

---

### Opsi 4: Deployment Serverless ke Vercel
Proyek ini dilengkapi konfigurasi `vercel.json` dan folder `api/` untuk deployment serverless:

1. Pastikan Anda memiliki akun [Vercel](https://vercel.com/) dan Vercel CLI (`npm i -g vercel`).
2. Jalankan perintah:
   ```bash
   vercel
   ```
3. Vercel akan membaca konfigurasi `vercel.json`, menjalankan build frontend Vite ke folder `dist`, dan memetakan route `/api/sync/*` ke serverless function di `api/sync/`.

---

## 🔄 Panduan Integrasi Google Sheets Live Sync

Platform ini dapat disinkronkan secara dua arah dengan **Google Spreadsheet Riset Master**:

### 1. Tarik Data (Pull Sync)
1. Buka aplikasi, masuk ke menu **Admin > Sinkronisasi** atau klik tombol **Google Sheet** di Topbar.
2. Pastikan URL Google Spreadsheet telah terisi.
3. Klik tombol **"Tarik Data (Pull Sync)"**.
4. Sistem akan mengunduh baris data terbaru dan memperbarui database SQLite secara instan.

### 2. Kirim Data (Push Sync via Webhook Google Apps Script)
Untuk mengalirkan data dari aplikasi langsung ke spreadsheet:
1. Buka Google Spreadsheet riset Anda.
2. Di menu atas Google Sheets, klik **Extensions > Apps Script** (Ekstensi > Apps Script).
3. Hapus kode bawaan, lalu salin dan tempel seluruh isi file [`scripts/google_apps_script.js`](file:///home/hirazone/Documents/Competitor%20intelegent%20/scripts/google_apps_script.js).
4. Klik ikon **Simpan** (Ctrl+S / Cmd+S).
5. Klik tombol biru **Deploy (Terapkan) > New deployment (Penerapan baru)**.
6. Pilih jenis: **Web app**.
7. Konfigurasi:
   - *Execute as:* **Me** (akun Google Anda).
   - *Who has access:* **Anyone** (Siapa saja).
8. Klik **Deploy**, izinkan akses akun bila diminta, lalu salin **Web app URL** yang dihasilkan.
9. Buka aplikasi > **Admin > Sinkronisasi**, tempelkan URL tersebut ke kolom **Webhook Apps Script URL**, lalu klik **Simpan Konfigurasi**.
10. Klik **"Kirim Data (Push Sync)"** untuk menguji pengiriman data.

### 3. Opsi Salin Cepat 1-Klik (Tanpa Webhook)
Jika Anda tidak menggunakan webhook, gunakan tombol **"Salin Format Sheet"** di modal sinkronisasi. Seluruh data 409 kapabilitas akan disalin ke clipboard dengan header yang pas. Anda cukup membuka spreadsheet dan menekan `Ctrl+V` pada sel **A1**.

---

## ⌨️ Navigasi & Shortcut Keyboard

| Shortcut / Tombol | Aksi |
| :--- | :--- |
| **`Ctrl + B`** / **`Cmd + B`** | Tampilkan / Sembunyikan Sidebar navigasi samping (*Toggle Sidebar*) |
| **`Esc`** | Menutup modal, drawer audit riset, atau dialog sinkronisasi |
| **Klik Sel Matriks** | Membuka drawer detail pembuktian riset (*Audit Detail Drawer*) |
| **Filter Workshop** | Memilih pilar workshop (WS1 hingga custom WS5/WS6) |
| **Theme Toggle** | Beralih antara tema gelap (*Dark Mode*) dan tema terang (*Light Mode*) |

---

## ⚖️ Kepatuhan Legal & Privasi (UU PDP)

Platform ini dirancang dengan mematuhi prinsip-prinsip etika intelijen bisnis (*fair and legal competitive intelligence*) dan regulasi perbankan Indonesia:

1. **Kepatuhan UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP):**
   - Seluruh kutipan wawancara narasumber perbankan internal dianonimkan menggunakan kode divisi acak (contoh: *Narasumber EA-01, Divisi Enterprise Architecture*) tanpa mencantumkan nama, NIP, jabatan pribadi, atau kontak.
2. **Sumber Informasi Publik Legal:**
   - 100% data riset dihimpun dari sumber terbuka yang sah: situs resmi perbankan, siaran pers, laporan tahunan (*Annual Report*), presentasi publik analis, dokumentasi resmi Bank Indonesia (SNAP BI), publikasi paten, serta studi kasus resmi vendor teknologi (*AWS Case Studies, Red Hat Success Stories, Oracle Customer Spotlights*).
3. **Integritas & Keamanan:**
   - Platform **tidak memuat informasi celah keamanan (zero-day vulnerability)** atau data transaksi nasabah yang dapat disalahgunakan pihak tidak berwenang.

---

## 📄 Lisensi & Hak Penggunaan

Dokumen dan kode sumber platform ini disiapkan secara khusus untuk kebutuhan pengkajian arsitektur teknologi internal **PT Bank Rakyat Indonesia (Persero) Tbk**. Hak cipta dan kerahasiaan materi mengikuti ketentuan perjanjian kerja sama yang berlaku.
