# Competitor Intelligence: Tech Stack Bank BRI vs Himbara

Platform intelijen teknologi perbankan interaktif berbasis bukti (*evidence-based competitor intelligence*) yang membandingkan **tech stack** PT Bank Rakyat Indonesia (Persero) Tbk dengan bank Himbara lainnya (Bank Mandiri, BNI, BTN, dan BSI) di 11 domain kategori teknologi.

Dibangun sesuai spesifikasi **Product Requirement Document (PRD v0.1)** untuk kebutuhan workshop dan presentasi langsung ke pimpinan serta arsitek teknologi Bank BRI.

---

## 🚀 Fitur Utama yang Telah Diimplementasikan

### 1. Dashboard Overview (F1)
- **Ringkasan Eksekutif & KPI:** Volume teknologi teridentifikasi BRI (100% kategori terisi), tingkat pembuktian terverifikasi (*Confirmed/Likely*), total bukti publik, dan rekaman wawancara.
- **Strategic Highlights:**
  - **Hanya BRI:** Komponen eksklusif skala ultra-mikro (Apache Cassandra cluster triliunan mutasi, MinIO S3 object store, Sabrina NLP virtual assistant).
  - **Celah / Peluang Kompetitor:** Teknologi yang telah digunakan Mandiri/BNI namun belum terdeteksi di BRI (AWS Hybrid Cloud lifestyle Livin' Sukha, collaborative data science Dataiku, HashiCorp Vault).
  - **Standar Konsensus Himbara:** Arsitektur bersama (Red Hat OpenShift, Apache Kafka / Confluent, Java Spring Boot, SNAP BI-FAST).
- Kartu profil dan cakupan kategori 5 bank Himbara.

### 2. Matriks Per Kategori / Matrix View (F2 - Fitur Inti)
- Tabel interaktif: Baris = Teknologi (dikelompokkan per 11 kategori), Kolom = Bank (BRI, Mandiri, BNI, BTN, BSI). Kolom BRI ditandai khusus sebagai fokus utama.
- **Badge Tingkat Keyakinan (Confidence):**
  - `✓ Confirmed`: Sumber resmi langsung (studi kasus vendor resmi, conference talk, siaran pers, atau ≥2 narasumber).
  - `~ Likely`: Kuat terindikasi (≥2 sumber tidak langsung atau 1 wawancara narasumber).
  - `? Indicative`: Sinyal awal (lowongan kerja atau metadata web).
  - `–`: Belum terdeteksi.
- **Audit Detail Drawer (Klik Setiap Sel):** Menampilkan rujukan URL langsung, kutipan bukti, tanggal verifikasi, pencatat, dan catatan narasumber wawancara.
- Filter multi-level: Kategori, pencarian nama/vendor, tingkat keyakinan, dan opsi "Hanya Published".
- Ekspor tabel matriks ke format **CSV**.

### 3. Head-to-Head Diff View (F5)
- Komparasi langsung BRI vs [Bank Mandiri | Bank BNI | Bank BTN | Bank BSI].
- Kalkulasi otomatis keselarasan arsitektur (persamaan stack), keunggulan eksklusif BRI, dan celah arsitektur per kategori.

### 4. Profil Bank & Bibliografi Bukti (F3)
- Halaman detail untuk masing-masing bank (BRI, Mandiri, BNI, BTN, BSI) dengan warna identitas perseroan.
- Produk digital utama: BRImo, Pasar.id, Kopra & Livin' by Mandiri, wondr by BNI, bale by BTN, BYOND by BSI.
- Daftar lengkap berkas bukti publik dan kutipan wawancara internal.

### 5. Direktori & Detail Teknologi (F4)
- Katalog seluruh teknologi yang dimonitor dengan filter vendor, kategori, dan model lisensi (*Open Source*, *Komersial Enterprise*, *In-House*).
- Ringkasan adopsi di 5 bank Himbara.

### 6. Gap Analysis & Rekomendasi Roadmap (V1.5)
- Analisis otomatis celah teknologi kompetitor dengan skala prioritas (Tinggi, Sedang, Rendah).
- Rekomendasi arsitektur taktis untuk tim Enterprise Architecture Bank BRI (Evaluasi Hybrid Cloud lifestyle, standardisasi MLOps, dan zero-trust credential rotation).

### 7. Mode Presentasi / Workshop Layar Penuh (F9)
- Dirancang khusus untuk memandu presentasi di depan peserta workshop dan manajemen BRI di ruang rapat / proyektor:
  - Navigasi slide dengan keyboard (Tombol panah `←` / `→` atau `Spasi`).
  - Panel **Catatan Pembicara (Speaker Notes)** dengan poin-poin diskusi penting.
  - Hanya menampilkan temuan berstatus `Published`.
  - Mode layar penuh (*Fullscreen toggle*).

### 8. Data CMS, Tata Kelola & Audit Trail (F7 & F8)
- **Checklist Kesiapan Workshop:** Verifikasi 4 poin kritis (Kelengkapan bukti, rasio confidence ≥60%, kerahasiaan narasumber UU PDP, dan status publikasi).
- **Alur Review:** `Draft` ➔ `Reviewed` ➔ `Published`.
- **Formulir Input Data:** Penambahan temuan, pendaftaran teknologi baru, dan pencatatan wawancara narasumber.
- **Simulasi Peran Pengguna (RBAC):** Switcher peran antara *Viewer*, *Analyst*, dan *Admin*.
- **Pencadangan & Pemulihan:** Ekspor cadangan JSON, impor file JSON, ekspor CSV, dan reset data.
- **Audit Trail Log:** Catatan kronologis setiap aksi perubahan data dengan nama pengguna dan stempel waktu.

---

## 🛠️ Stack Teknologi Aplikasi

- **Database:** SQLite Relasional (`data/competitor_intel.db`) dengan schema relasional 8 tabel, foreign keys, & ACID transactions
- **Backend API:** Node.js, Express REST API, CORS (`server/index.js`, `server/db.js`)
- **Frontend:** React 18, TypeScript, Tailwind CSS, Lucide Icons, Vite
- **Integrasi API Client:** `src/services/api.ts` dengan sinkronisasi otomatis ke SQLite dan fallback lokal
- **Format Pertukaran:** JSON & CSV

---

## 💻 Cara Menjalankan

### Menjalankan Server Lengkap (Backend API + Database SQLite + Frontend):
```bash
npm start
# atau
npm run server
```
Server terpadu akan berjalan pada: **`http://localhost:3000/`**
- Frontend UI: `http://localhost:3000/`
- REST API: `http://localhost:3000/api/*`
- File Database SQLite: `data/competitor_intel.db`

### Menjalankan Mode Frontend Dev Terpisah:
```bash
npm run dev
```

### Menjalankan via Docker (Produksi / Cloud):
```bash
# Build dan jalankan container di background
docker compose up -d --build

# Melihat log container
docker compose logs -f

# Menghentikan container
docker compose down
```
> *Catatan:* Folder `./data` otomatis dimounting ke host machine agar file database SQLite (`competitor_intel.db`) tetap persisten dan tidak hilang saat container di-restart.

---

## ⚖️ Kepatuhan Legal & Privasi (UU PDP)

- Seluruh data yang ditampilkan bersumber dari informasi publik legal (situs resmi, studi kasus vendor, publikasi paten, lowongan kerja terverifikasi).
- Catatan wawancara narasumber bank telah dianonimkan menggunakan kode divisi (misal: *Narasumber EA-01, Divisi IT Architecture*) tanpa mencantumkan identitas pribadi, mematuhi Undang-Undang Perlindungan Data Pribadi (UU PDP).
- Tidak memuat informasi celah keamanan yang dapat dieksploitasi.
