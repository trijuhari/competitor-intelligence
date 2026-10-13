# PRD – Competitor Intelligence: Tech Stack Bank BRI vs Himbara

**Versi:** 0.1 (Draft) · **Tanggal:** 13 Oktober 2026 · **Status:** Untuk review

## 1. Ringkasan Produk

Website *competitor intelligence* yang membandingkan **tech stack** Bank BRI dengan bank Himbara lainnya (Mandiri, BNI, BTN, dan opsional BSI), dengan data dikelompokkan per kategori seperti Big Data, Front End, Back End, Cloud/Infrastruktur, dan seterusnya. Pengguna bisa melihat stack apa yang dipakai tiap bank, di mana BRI unggul atau tertinggal, dan seberapa kuat bukti dari tiap temuan.

**Value proposition:** satu tempat untuk memahami lanskap teknologi bank BUMN secara terstruktur, berbasis bukti, dan mudah dibandingkan.

**Konteks penggunaan:** produk ini dibangun oleh tim konsultan sebagai bahan **workshop dan presentasi ke BRI**. Data berasal dari sumber publik yang terpercaya dan wawancara dengan narasumber di tiap bank, sehingga tampilan dan alurnya harus siap dipresentasikan.

## 2. Latar Belakang & Masalah

- Informasi tech stack bank tersebar: lowongan kerja, blog engineering, laporan tahunan, konferensi, jejak teknis di website/aplikasi, dan berita kerja sama vendor.
- Tim teknologi, strategi, dan produk sulit melakukan benchmarking karena datanya tidak terpusat dan tidak terstandar.
- Tidak ada cara cepat untuk menjawab pertanyaan seperti "Bank mana yang paling maju di sisi data platform?" atau "Apakah BRI satu-satunya yang memakai teknologi X?".

## 3. Tujuan & Non-Tujuan

### Tujuan

1. Menyediakan perbandingan tech stack BRI vs bank Himbara lain yang terkelompok per kategori.
2. Setiap data point punya **sumber dan tingkat keyakinan (confidence)** sehingga bisa diaudit.
3. Memberi insight otomatis: gap analysis, kesamaan, dan teknologi yang unik per bank.
4. Data mudah diperbarui dan punya riwayat perubahan (timeline).

### Non-Tujuan (v1)

- Tidak melakukan penetrasi, scanning agresif, atau mengakses sistem internal bank.
- Tidak membahas aspek keamanan yang bisa dieksploitasi (misalnya kelemahan spesifik).
- Tidak membandingkan bank non-Himbara (bisa masuk roadmap).
- Bukan alat penilaian kinerja bisnis/finansial bank.

## 4. Target Pengguna

Pengguna utama adalah peserta workshop dari BRI; tim konsultan bertindak sebagai analyst dan admin data.

| Persona | Kebutuhan | Contoh pertanyaan |
| --- | --- | --- |
| **Strategi/Innovation Analyst (BRI)** | Benchmark teknologi untuk roadmap | "Bank mana yang sudah pakai lakehouse?" |
| **Engineering/Architect Lead** | Referensi stack dan tren talenta | "Framework mobile apa yang dipakai kompetitor?" |
| **Product Manager** | Memahami kapabilitas teknis di balik fitur | "Apakah kompetitor punya API platform terbuka?" |
| **Vendor/Konsultan/Peneliti** | Pemetaan pasar teknologi perbankan | "Siapa pengguna teknologi X di Himbara?" |

## 5. Cakupan Bank

- **Fokus utama:** Bank BRI
- **Pembanding:** Bank Mandiri, BNI, BTN, dan BSI
- Di luar cakupan v1: bank non-Himbara dan bank digital

Setiap bank punya profil: logo, deskripsi singkat, produk digital utama (mis. BRImo, Livin', BNI Mobile, dll.), dan daftar temuan teknologi.

## 6. Taksonomi Kategori Tech Stack

Kategori bersifat konfigurabel lewat admin. Usulan awal:

| # | Kategori | Contoh subkategori / teknologi yang dilacak |
| --- | --- | --- |
| 1 | **Big Data & Analytics** | Data lake/lakehouse, Hadoop, Spark, Kafka, data warehouse, BI tools, ETL/ELT |
| 2 | **AI/ML** | Platform ML, credit scoring, fraud detection, GenAI/chatbot |
| 3 | **Front End (Web)** | Framework (React, Angular, Vue), CDN, analytics tag |
| 4 | **Mobile** | Native/cross-platform (Kotlin, Swift, Flutter, React Native), SDK pihak ketiga |
| 5 | **Back End** | Bahasa & framework (Java/Spring, Go, Node.js, .NET), API gateway, microservices |
| 6 | **Core Banking & Integrasi** | Core banking vendor, ESB/middleware, message queue |
| 7 | **Database** | RDBMS, NoSQL, in-memory cache |
| 8 | **Cloud & Infrastruktur** | Public/private/hybrid cloud, Kubernetes, data center |
| 9 | **DevOps & Observability** | CI/CD, monitoring, logging, IaC |
| 10 | **Security** | IAM, WAF, anti-fraud, enkripsi, biometrik/eKYC |
| 11 | **Payment & Open API** | QRIS, BI-FAST, SNAP API, kartu, partner API |

## 7. Sumber Data & Metodologi

Data berasal dari dua jalur: **sumber publik yang terpercaya** (tabel di bawah) dan **wawancara dengan narasumber di tiap bank** (dijelaskan setelah skema confidence). Setiap temuan wajib punya sumber yang jelas dan dapat dipertanggungjawabkan.

| Sumber | Jenis bukti | Confidence default |
| --- | --- | --- |
| Lowongan kerja (LinkedIn, Glints, situs karier bank) | Tidak langsung | Sedang |
| Blog/engineering talk/presentasi konferensi resmi | Langsung | Tinggi |
| Laporan tahunan, siaran pers, kerja sama vendor | Langsung/semi | Tinggi–Sedang |
| Studi kasus vendor (AWS, Google Cloud, Red Hat, Confluent, dll.) | Langsung | Tinggi |
| Deteksi teknologi web publik (header, library front end) | Teknis | Sedang |
| Analisis metadata aplikasi mobile publik (SDK/library) | Teknis | Sedang |
| Profil LinkedIn/GitHub publik karyawan (agregat, tanpa data pribadi) | Tidak langsung | Rendah–Sedang |

**Skema confidence:** *Confirmed* (sumber resmi), *Likely* (≥2 sumber tidak langsung), *Indicative* (1 sumber tidak langsung). Tiap temuan wajib menyimpan URL sumber, tanggal akses, dan nama pencatat.

**Sumber wawancara (usulan aturan):** wawancara dengan karyawan bank dicatat sebagai bukti tersendiri.

- Catat bank, jabatan/divisi narasumber (nama boleh dianonimkan), tanggal wawancara, dan ringkasan pernyataan.
- Pernyataan dari satu narasumber berstatus *Likely*; naik ke *Confirmed* bila didukung narasumber kedua yang independen atau sumber publik.
- Pernyataan wawancara yang bertentangan dengan sumber publik ditandai untuk ditinjau tim sebelum workshop.
- Hanya informasi yang memang boleh dibagikan narasumber yang dicatat; detail sensitif keamanan tidak disimpan.

## 8. Fitur & Kebutuhan Fungsional

### 8.1 MVP (v1.0)

**F1. Dashboard Overview**

- Ringkasan: jumlah teknologi per bank, per kategori, dan skor cakupan.
- Highlight: "Hanya BRI", "Hanya kompetitor", "Dipakai semua".

**F2. Perbandingan per Kategori (Matrix View)**

- Tabel: baris = teknologi, kolom = bank (BRI, Mandiri, BNI, BTN, BSI).
- Sel menampilkan status (✓ Confirmed / \~ Likely / ? Indicative / – Tidak ditemukan) dan ikon sumber.
- Filter kategori, bank, tingkat confidence.

**F3. Profil Bank**

- Halaman per bank dengan stack dikelompokkan per kategori + daftar sumber.

**F4. Detail Teknologi**

- Halaman per teknologi: deskripsi, bank pengguna, bukti, dan kategori terkait.

**F5. Head-to-Head: BRI vs Bank X**

- Pilih satu pembanding; tampilkan perbedaan dan kesamaan per kategori (diff view).

**F6. Pencarian & Filter**

- Pencarian teknologi/bank/kategori; filter multi-select.

**F7. Admin/CMS Data**

- CRUD bank, kategori, teknologi, dan temuan; wajib isi sumber + confidence.
- Alur review: *Draft → Reviewed → Published*.
- Import data via CSV.

**F8. Autentikasi & Role**

- Role: Viewer, Analyst (input data), Admin.

**F9. Mode Presentasi/Workshop**

- Tampilan layar penuh per kategori dan per bank untuk dibawakan langsung dari website di workshop.
- Hanya menampilkan temuan berstatus Published.
- Narasumber wawancara selalu ditampilkan anonim (kode narasumber dan divisi saja).
- Export ke slide tetap ada di V1.5 sebagai opsi cadangan.

### 8.2 V1.5

- **Gap Analysis otomatis:** daftar teknologi yang dimiliki kompetitor namun belum ditemukan di BRI (dan sebaliknya).
- **Timeline perubahan:** kapan teknologi mulai terdeteksi/diumumkan.
- **Export:** PDF/PPT/CSV untuk bahan workshop dan laporan benchmarking.
- **Watchlist & notifikasi** perubahan data.

### 8.3 V2 (Ide Lanjutan)

- Pengumpulan sinyal semi-otomatis (scraping lowongan, monitoring blog/news) dengan antrean verifikasi manusia.
- Ringkasan insight berbasis AI dengan sitasi ke bukti.
- Penambahan bank non-Himbara (BCA, CIMB, dll.) dan bank digital.
- Tren talenta: skill yang paling banyak dicari per bank.

## 9. User Stories (Prioritas Tinggi)

1. Sebagai analis, saya ingin melihat matriks perbandingan per kategori agar bisa cepat menemukan perbedaan BRI dan kompetitor.
2. Sebagai arsitek, saya ingin klik sebuah sel untuk melihat bukti dan tanggal sumbernya agar bisa memverifikasi klaim.
3. Sebagai PM, saya ingin membandingkan BRI vs satu bank saja agar fokus pada pesaing langsung.
4. Sebagai analyst data, saya ingin menambah temuan dengan sumber dan confidence agar database terus bertambah dan bisa diaudit.
5. Sebagai admin, saya ingin mereview temuan sebelum publish agar kualitas data terjaga.
6. Sebagai eksekutif, saya ingin mengekspor ringkasan ke PDF/PPT untuk presentasi.

## 10. Model Data (Garis Besar)

- **Bank** (id, nama, slug, deskripsi, logo, produk\_digital)
- **Category** (id, nama, parent\_id, urutan)
- **Technology** (id, nama, vendor, deskripsi, category\_id, tipe: open-source/komersial/in-house)
- **Finding** (id, bank\_id, technology\_id, confidence, status\_review, tanggal\_terdeteksi, catatan)
- **Evidence** (id, finding\_id, tipe\_sumber: publik/wawancara, url, interview\_id, tanggal\_akses, kutipan\_ringkas, pencatat)
- **Interview** (id, bank\_id, kode\_narasumber anonim, divisi, tanggal, ringkasan, persetujuan\_narasumber)
- **User** (id, nama, role)
- **AuditLog** (id, user\_id, aksi, entitas, timestamp)

## 11. Kebutuhan Non-Fungsional

- **Performa:** halaman utama < 2 detik (p75) pada koneksi 4G.
- **Responsif:** desktop-first, tetap nyaman di mobile.
- **Keamanan:** SSO/email login, RBAC, audit log, enkripsi in-transit & at-rest.
- **Auditability:** setiap temuan dapat ditelusuri ke sumber.
- **Aksesibilitas:** mengikuti WCAG 2.1 AA.
- **Bahasa:** Indonesia (default) dan Inggris.

## 12. Pertimbangan Legal & Etika

- **Sumber publik:** hanya informasi publik; tidak ada akses ke sistem atau data internal bank.
- **Wawancara:** narasumber memberi persetujuan, hanya membagikan informasi yang boleh mereka bagikan, dan identitasnya dapat dianonimkan. Ikuti NDA/kerahasiaan masing-masing bank dan kode etik konsultan.
- **UU PDP:** simpan data narasumber seminimal mungkin (kode anonim, divisi); akses catatan wawancara dibatasi ke tim konsultan.
- Hindari klaim absolut: gunakan label confidence dan disclaimer "berdasarkan sumber publik dan wawancara, bukan data resmi bank".
- Jangan menampilkan detail yang bisa dimanfaatkan untuk serangan siber (versi spesifik, endpoint, konfigurasi keamanan).
- Karena dipresentasikan ke BRI, cek konflik kepentingan dan klausul kerahasiaan jika tim juga melayani bank Himbara lain; disarankan ada review legal sebelum workshop.

## 13. Metrik Keberhasilan

| Metrik | Target 3 bulan |
| --- | --- |
| Cakupan data (kategori terisi per bank) | ≥ 80% |
| Temuan dengan sumber valid | 100% |
| Temuan berstatus Confirmed/Likely | ≥ 60% |
| Weekly active users (internal) | ≥ 30 |
| Waktu menemukan jawaban benchmarking | < 2 menit |
| Kepuasan pengguna (CSAT) | ≥ 4/5 |

## 14. Usulan Tech Stack untuk Website Ini

- **Front End:** Next.js/React + Tailwind, komponen chart (Recharts/ECharts)
- **Back End:** Node.js (NestJS) atau Python (FastAPI)
- **Database:** PostgreSQL (relasional, mudah untuk matrix & diff query)
- **Search:** PostgreSQL full-text atau Meilisearch
- **Auth:** SSO perusahaan / Auth0 / NextAuth
- **Deploy:** Docker + cloud pilihan (Vercel/AWS/GCP/on-prem sesuai kebijakan)

## 15. Roadmap

| Fase | Durasi | Output |
| --- | --- | --- |
| Discovery & riset data | 2 minggu | Taksonomi final, 30–50 temuan awal per bank, jadwal wawancara narasumber |
| Desain UI/UX | 2 minggu | Wireframe & prototipe matrix view |
| Build MVP | 4–6 minggu | F1–F8 |
| Pilot & feedback | 2 minggu | Uji dengan 5–10 pengguna |
| V1.5 | 4 minggu | Gap analysis, radar, export |

## 16. Risiko & Mitigasi

| Risiko | Dampak | Mitigasi |
| --- | --- | --- |
| Data publik terbatas/tidak akurat | Insight menyesatkan | Sistem confidence + sumber wajib + review |
| Data cepat usang | Kepercayaan turun | Tanggal verifikasi, jadwal review berkala |
| Risiko legal/reputasi | Tinggi | Hanya data publik, disclaimer, review legal |
| Beban input manual | Adopsi lambat | Import CSV, kemudian semi-otomasi (V2) |
| Bias interpretasi dari lowongan kerja | Salah simpul | Label "Indicative", butuh ≥2 sumber untuk naik level |

## 17. Keputusan & Pertanyaan Terbuka

**Sudah diputuskan**

- Konteks: dibuat oleh konsultan untuk workshop dan presentasi ke BRI.
- Cakupan bank: BRI dibandingkan dengan Mandiri, BNI, BTN, dan BSI.
- Sumber data: internet dengan sumber jelas dan terpercaya, ditambah wawancara karyawan di tiap bank.
- Narasumber dicari lewat LinkedIn dan jaringan pertemanan.
- Identitas narasumber selalu dianonimkan.
- Presentasi dilakukan langsung dari website.
- Tidak ada skor kematangan per kategori.
- Tidak ada reviewer terpisah; pemeriksaan data dilakukan sendiri oleh tim.
- Kriteria utama temuan: sumbernya terpercaya.

**Masih terbuka**

1. Kapan jadwal workshop dengan BRI? Belum diketahui; roadmap akan disesuaikan setelah tanggalnya pasti.
2. Berapa target wawancara per bank? Karena narasumber berasal dari jaringan pribadi, usulan minimal 2 narasumber per bank agar temuan bisa naik ke *Confirmed*.
3. Tanpa reviewer, apakah perlu checklist pemeriksaan mandiri sebelum workshop (sumber valid, confidence terisi, tanpa detail sensitif)? Usulan: ya.
