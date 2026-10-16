import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure data directory exists
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'competitor_intel.db');
const db = new sqlite3.Database(dbPath);

// Helper for promise-based queries
export const query = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

export const getOne = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

export const run = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
};

// Initialize schema
export const initDatabase = async () => {
  await run(`
    CREATE TABLE IF NOT EXISTS banks (
      id TEXT PRIMARY KEY,
      nama TEXT NOT NULL,
      slug TEXT NOT NULL,
      singkatan TEXT NOT NULL,
      deskripsi TEXT,
      logo TEXT,
      isFokusUtama INTEGER DEFAULT 0,
      produkDigital TEXT,
      brandColor TEXT,
      accentColor TEXT,
      textColor TEXT,
      badgeBg TEXT
    );
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      nama TEXT NOT NULL,
      slug TEXT NOT NULL,
      urutan INTEGER NOT NULL,
      icon TEXT,
      deskripsi TEXT,
      contohSubkategori TEXT
    );
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS technologies (
      id TEXT PRIMARY KEY,
      nama TEXT NOT NULL,
      vendor TEXT NOT NULL,
      categoryId TEXT NOT NULL,
      tipe TEXT NOT NULL,
      deskripsi TEXT,
      websiteUrl TEXT,
      FOREIGN KEY(categoryId) REFERENCES categories(id)
    );
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS findings (
      id TEXT PRIMARY KEY,
      bankId TEXT NOT NULL,
      technologyId TEXT NOT NULL,
      confidence TEXT NOT NULL,
      statusReview TEXT NOT NULL,
      tanggalTerdeteksi TEXT,
      tanggalVerifikasi TEXT,
      catatan TEXT,
      FOREIGN KEY(bankId) REFERENCES banks(id),
      FOREIGN KEY(technologyId) REFERENCES technologies(id)
    );
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS evidences (
      id TEXT PRIMARY KEY,
      findingId TEXT NOT NULL,
      tipeSumber TEXT NOT NULL,
      judul TEXT NOT NULL,
      url TEXT,
      interviewId TEXT,
      tanggalAkses TEXT,
      kutipanRingkas TEXT,
      pencatat TEXT,
      FOREIGN KEY(findingId) REFERENCES findings(id)
    );
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS interviews (
      id TEXT PRIMARY KEY,
      bankId TEXT NOT NULL,
      kodeNarasumber TEXT NOT NULL,
      divisi TEXT NOT NULL,
      tanggal TEXT,
      ringkasan TEXT,
      persetujuanNarasumber INTEGER DEFAULT 1,
      FOREIGN KEY(bankId) REFERENCES banks(id)
    );
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      nama TEXT NOT NULL,
      email TEXT NOT NULL,
      role TEXT NOT NULL,
      avatar TEXT,
      password TEXT
    );
  `);

  try {
    await run(`ALTER TABLE users ADD COLUMN password TEXT;`);
  } catch (e) {
    // column already exists
  }

  // Ensure default users exist with passwords (All Admin role)
  await run(`
    INSERT OR REPLACE INTO users (id, nama, email, role, avatar, password)
    VALUES 
      ('usr-1', 'Rinaldi Firmansyah (Lead Admin)', 'admin@bri.co.id', 'Admin', '👨‍💼', 'admin123'),
      ('usr-2', 'Siti Rahmawati (Tech Analyst)', 'analyst@bri.co.id', 'Admin', '👩‍💻', 'analyst123'),
      ('usr-3', 'Budi Hartono (Executive Director BRI)', 'executive@bri.co.id', 'Admin', '👔', 'bri123');
    UPDATE users SET role = 'Admin';
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS audit_logs (
      id TEXT PRIMARY KEY,
      userId TEXT,
      userName TEXT,
      aksi TEXT NOT NULL,
      entitas TEXT NOT NULL,
      detail TEXT NOT NULL,
      timestamp TEXT NOT NULL
    );
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS research_records (
      id TEXT PRIMARY KEY,
      no INTEGER NOT NULL,
      workshop TEXT NOT NULL,
      domain TEXT NOT NULL,
      kategori TEXT NOT NULL,
      kapabilitas TEXT NOT NULL,
      bankCode TEXT NOT NULL,
      bankId TEXT NOT NULL,
      merk TEXT,
      link TEXT,
      url TEXT,
      pic TEXT,
      status TEXT NOT NULL
    );
  `);

  console.log('✅ SQLite Schema initialized at:', dbPath);
};

export default db;
