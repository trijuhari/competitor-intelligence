import { run, query } from './db.js';
import { 
  INITIAL_BANKS, 
  INITIAL_CATEGORIES, 
  INITIAL_TECHNOLOGIES, 
  INITIAL_FINDINGS, 
  INITIAL_EVIDENCES, 
  INITIAL_INTERVIEWS, 
  INITIAL_USERS, 
  INITIAL_AUDIT_LOGS 
} from './seedData.js';

export const seedDatabaseIfEmpty = async () => {
  const existingBanks = await query('SELECT count(*) as count FROM banks');
  if (existingBanks[0].count > 0) {
    console.log(`ℹ️ Database already contains ${existingBanks[0].count} banks. Skipping initial seed.`);
    return;
  }

  console.log('🌱 Seeding database with comprehensive initial Himbara tech stack data...');

  // Seed Banks
  for (const b of INITIAL_BANKS) {
    await run(
      `INSERT INTO banks (id, nama, slug, singkatan, deskripsi, logo, isFokusUtama, produkDigital, brandColor, accentColor, textColor, badgeBg)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        b.id, b.nama, b.slug, b.singkatan, b.deskripsi, b.logo, 
        b.isFokusUtama ? 1 : 0, JSON.stringify(b.produkDigital), 
        b.brandColor, b.accentColor, b.textColor, b.badgeBg
      ]
    );
  }

  // Seed Categories
  for (const c of INITIAL_CATEGORIES) {
    await run(
      `INSERT INTO categories (id, nama, slug, urutan, icon, deskripsi, contohSubkategori)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [c.id, c.nama, c.slug, c.urutan, c.icon, c.deskripsi, JSON.stringify(c.contohSubkategori)]
    );
  }

  // Seed Technologies
  for (const t of INITIAL_TECHNOLOGIES) {
    await run(
      `INSERT INTO technologies (id, nama, vendor, categoryId, tipe, deskripsi, websiteUrl)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [t.id, t.nama, t.vendor, t.categoryId, t.tipe, t.deskripsi, t.websiteUrl || null]
    );
  }

  // Seed Interviews
  for (const i of INITIAL_INTERVIEWS) {
    await run(
      `INSERT INTO interviews (id, bankId, kodeNarasumber, divisi, tanggal, ringkasan, persetujuanNarasumber)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [i.id, i.bankId, i.kodeNarasumber, i.divisi, i.tanggal, i.ringkasan, i.persetujuanNarasumber ? 1 : 0]
    );
  }

  // Seed Findings
  for (const f of INITIAL_FINDINGS) {
    await run(
      `INSERT INTO findings (id, bankId, technologyId, confidence, statusReview, tanggalTerdeteksi, tanggalVerifikasi, catatan)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [f.id, f.bankId, f.technologyId, f.confidence, f.statusReview, f.tanggalTerdeteksi, f.tanggalVerifikasi, f.catatan || null]
    );
  }

  // Seed Evidences
  for (const e of INITIAL_EVIDENCES) {
    await run(
      `INSERT INTO evidences (id, findingId, tipeSumber, judul, url, interviewId, tanggalAkses, kutipanRingkas, pencatat)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [e.id, e.findingId, e.tipeSumber, e.judul, e.url || null, e.interviewId || null, e.tanggalAkses, e.kutipanRingkas, e.pencatat]
    );
  }

  // Seed Users
  for (const u of INITIAL_USERS) {
    await run(
      `INSERT INTO users (id, nama, email, role, avatar)
       VALUES (?, ?, ?, ?, ?)`,
      [u.id, u.nama, u.email, u.role, u.avatar || null]
    );
  }

  // Seed Audit Logs
  for (const a of INITIAL_AUDIT_LOGS) {
    await run(
      `INSERT INTO audit_logs (id, userId, userName, aksi, entitas, detail, timestamp)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [a.id, a.userId, a.userName, a.aksi, a.entitas, a.detail, a.timestamp]
    );
  }

  console.log('✅ Seeding complete!');
};
