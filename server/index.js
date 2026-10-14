import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { initDatabase, query, run, getOne } from './db.js';
import { seedDatabaseIfEmpty } from './seed.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Helper to log audit
const recordAudit = async (userId, userName, aksi, entitas, detail) => {
  const id = `aud-${Date.now()}`;
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
  await run(
    `INSERT INTO audit_logs (id, userId, userName, aksi, entitas, detail, timestamp)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [id, userId || 'usr-1', userName || 'System', aksi, entitas, detail, timestamp]
  );
};

// --- ROUTES ---

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// 1. Banks
app.get('/api/banks', async (req, res) => {
  try {
    const banks = await query('SELECT * FROM banks ORDER BY isFokusUtama DESC, nama ASC');
    const parsed = banks.map(b => ({
      ...b,
      isFokusUtama: Boolean(b.isFokusUtama),
      produkDigital: JSON.parse(b.produkDigital || '[]')
    }));
    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await query('SELECT * FROM categories ORDER BY urutan ASC');
    const parsed = categories.map(c => ({
      ...c,
      contohSubkategori: JSON.parse(c.contohSubkategori || '[]')
    }));
    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Technologies
app.get('/api/technologies', async (req, res) => {
  try {
    const techs = await query('SELECT * FROM technologies ORDER BY nama ASC');
    res.json(techs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/technologies', async (req, res) => {
  try {
    const { nama, vendor, categoryId, tipe, deskripsi, websiteUrl, userName } = req.body;
    const id = req.body.id || `tech-${Date.now()}`;
    await run(
      `INSERT INTO technologies (id, nama, vendor, categoryId, tipe, deskripsi, websiteUrl)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, nama, vendor, categoryId, tipe, deskripsi, websiteUrl || null]
    );
    await recordAudit('usr-1', userName || 'Analyst', 'CREATE', 'Technology', `Menambahkan teknologi: ${nama}`);
    res.status(201).json({ id, nama, vendor, categoryId, tipe, deskripsi, websiteUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/technologies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, vendor, categoryId, tipe, deskripsi, websiteUrl, userName } = req.body;
    await run(
      `UPDATE technologies SET
        nama = COALESCE(?, nama),
        vendor = COALESCE(?, vendor),
        categoryId = COALESCE(?, categoryId),
        tipe = COALESCE(?, tipe),
        deskripsi = COALESCE(?, deskripsi),
        websiteUrl = COALESCE(?, websiteUrl)
       WHERE id = ?`,
      [nama, vendor, categoryId, tipe, deskripsi, websiteUrl, id]
    );
    await recordAudit('usr-1', userName || 'Analyst', 'UPDATE', 'Technology', `Memperbarui teknologi: ${nama || id}`);
    const updated = await getOne('SELECT * FROM technologies WHERE id = ?', [id]);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/technologies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await run('DELETE FROM technologies WHERE id = ?', [id]);
    await run('DELETE FROM findings WHERE technologyId = ?', [id]);
    await recordAudit('usr-1', req.query.userName || 'Admin', 'DELETE', 'Technology', `Menghapus teknologi ID ${id}`);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Findings
app.get('/api/findings', async (req, res) => {
  try {
    const findings = await query('SELECT * FROM findings');
    // Attach evidence IDs
    const evidences = await query('SELECT id, findingId FROM evidences');
    const parsed = findings.map(f => ({
      ...f,
      evidenceIds: evidences.filter(e => e.findingId === f.id).map(e => e.id)
    }));
    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/findings', async (req, res) => {
  try {
    const { bankId, technologyId, confidence, statusReview, tanggalTerdeteksi, tanggalVerifikasi, catatan, userName } = req.body;
    const id = req.body.id || `f-${Date.now()}`;
    await run(
      `INSERT INTO findings (id, bankId, technologyId, confidence, statusReview, tanggalTerdeteksi, tanggalVerifikasi, catatan)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, bankId, technologyId, confidence, statusReview, tanggalTerdeteksi, tanggalVerifikasi, catatan || null]
    );
    await recordAudit('usr-1', userName || 'Analyst', 'CREATE', 'Finding', `Menambahkan temuan untuk bank ${bankId} (${confidence})`);
    res.status(201).json({ id, bankId, technologyId, confidence, statusReview, tanggalTerdeteksi, tanggalVerifikasi, catatan, evidenceIds: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/findings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { confidence, statusReview, catatan, tanggalVerifikasi, userName } = req.body;
    await run(
      `UPDATE findings SET 
        confidence = COALESCE(?, confidence),
        statusReview = COALESCE(?, statusReview),
        catatan = COALESCE(?, catatan),
        tanggalVerifikasi = COALESCE(?, tanggalVerifikasi)
       WHERE id = ?`,
      [confidence, statusReview, catatan, tanggalVerifikasi, id]
    );
    await recordAudit('usr-1', userName || 'Analyst', 'UPDATE', 'Finding', `Memperbarui temuan ID ${id} (${statusReview || confidence})`);
    const updated = await getOne('SELECT * FROM findings WHERE id = ?', [id]);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/findings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await run('DELETE FROM findings WHERE id = ?', [id]);
    await run('DELETE FROM evidences WHERE findingId = ?', [id]);
    await recordAudit('usr-1', req.query.userName || 'Admin', 'DELETE', 'Finding', `Menghapus temuan ID ${id}`);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Evidences
app.get('/api/evidences', async (req, res) => {
  try {
    const evidences = await query('SELECT * FROM evidences');
    res.json(evidences);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/evidences', async (req, res) => {
  try {
    const { findingId, tipeSumber, judul, url, interviewId, tanggalAkses, kutipanRingkas } = req.body;
    const pencatat = req.body.pencatat?.trim() || 'Admin';
    const id = req.body.id || `ev-${Date.now()}`;
    await run(
      `INSERT INTO evidences (id, findingId, tipeSumber, judul, url, interviewId, tanggalAkses, kutipanRingkas, pencatat)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, findingId, tipeSumber, judul, url || null, interviewId || null, tanggalAkses, kutipanRingkas, pencatat]
    );
    await recordAudit('usr-1', pencatat, 'CREATE', 'Evidence', `Menambahkan bukti: ${judul}`);
    res.status(201).json({ id, findingId, tipeSumber, judul, url, interviewId, tanggalAkses, kutipanRingkas, pencatat });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/evidences/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { tipeSumber, judul, url, interviewId, tanggalAkses, kutipanRingkas, pencatat, userName } = req.body;
    await run(
      `UPDATE evidences SET
        tipeSumber = COALESCE(?, tipeSumber),
        judul = COALESCE(?, judul),
        url = COALESCE(?, url),
        interviewId = COALESCE(?, interviewId),
        tanggalAkses = COALESCE(?, tanggalAkses),
        kutipanRingkas = COALESCE(?, kutipanRingkas),
        pencatat = COALESCE(?, pencatat)
       WHERE id = ?`,
      [tipeSumber, judul, url, interviewId, tanggalAkses, kutipanRingkas, pencatat, id]
    );
    await recordAudit('usr-1', userName || pencatat || 'Analyst', 'UPDATE', 'Evidence', `Memperbarui bukti: ${judul || id}`);
    const updated = await getOne('SELECT * FROM evidences WHERE id = ?', [id]);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/evidences/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await run('DELETE FROM evidences WHERE id = ?', [id]);
    await recordAudit('usr-1', req.query.userName || 'Admin', 'DELETE', 'Evidence', `Menghapus bukti ID ${id}`);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Interviews
app.get('/api/interviews', async (req, res) => {
  try {
    const interviews = await query('SELECT * FROM interviews');
    const parsed = interviews.map(i => ({
      ...i,
      persetujuanNarasumber: Boolean(i.persetujuanNarasumber)
    }));
    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/interviews', async (req, res) => {
  try {
    const { bankId, kodeNarasumber, divisi, tanggal, ringkasan, persetujuanNarasumber, userName } = req.body;
    const id = req.body.id || `int-${Date.now()}`;
    await run(
      `INSERT INTO interviews (id, bankId, kodeNarasumber, divisi, tanggal, ringkasan, persetujuanNarasumber)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, bankId, kodeNarasumber, divisi, tanggal, ringkasan, persetujuanNarasumber ? 1 : 0]
    );
    await recordAudit('usr-1', userName || 'Analyst', 'CREATE', 'Interview', `Mencatat wawancara ${kodeNarasumber}`);
    res.status(201).json({ id, bankId, kodeNarasumber, divisi, tanggal, ringkasan, persetujuanNarasumber: Boolean(persetujuanNarasumber) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/interviews/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { kodeNarasumber, divisi, tanggal, ringkasan, persetujuanNarasumber, userName } = req.body;
    await run(
      `UPDATE interviews SET
        kodeNarasumber = COALESCE(?, kodeNarasumber),
        divisi = COALESCE(?, divisi),
        tanggal = COALESCE(?, tanggal),
        ringkasan = COALESCE(?, ringkasan),
        persetujuanNarasumber = COALESCE(?, persetujuanNarasumber)
       WHERE id = ?`,
      [kodeNarasumber, divisi, tanggal, ringkasan, persetujuanNarasumber !== undefined ? (persetujuanNarasumber ? 1 : 0) : null, id]
    );
    await recordAudit('usr-1', userName || 'Analyst', 'UPDATE', 'Interview', `Memperbarui wawancara ${kodeNarasumber || id}`);
    const updated = await getOne('SELECT * FROM interviews WHERE id = ?', [id]);
    res.json({ ...updated, persetujuanNarasumber: Boolean(updated.persetujuanNarasumber) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/interviews/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await run('DELETE FROM interviews WHERE id = ?', [id]);
    await recordAudit('usr-1', req.query.userName || 'Admin', 'DELETE', 'Interview', `Menghapus wawancara ID ${id}`);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 7. Research Matrix (408 Capabilities from Sheet)
app.get('/api/research-matrix', async (req, res) => {
  try {
    const records = await query('SELECT * FROM research_records ORDER BY no ASC');
    if (!records || records.length === 0) {
      const matrixJson = fs.readFileSync(path.join(__dirname, 'researchMatrix.json'), 'utf8');
      return res.json(JSON.parse(matrixJson));
    }
    const capMap = new Map();
    records.forEach(r => {
      const capId = `cap-${r.no}`;
      if (!capMap.has(capId)) {
        capMap.set(capId, {
          id: capId,
          no: r.no,
          workshop: r.workshop,
          domain: r.domain,
          kategori: r.kategori,
          kapabilitas: r.kapabilitas,
          banks: {}
        });
      }
      capMap.get(capId).banks[r.bankCode.toLowerCase()] = {
        bankCode: r.bankCode,
        merk: r.merk || '-',
        link: r.link || '',
        url: r.url || '',
        pic: r.pic || 'Mrs Utami',
        status: r.status || 'Belum'
      };
    });
    res.json(Array.from(capMap.values()));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/research-matrix/:capId/:bankCode', async (req, res) => {
  try {
    const { capId, bankCode } = req.params;
    const { merk, link, url, pic, status, userName } = req.body;
    const no = parseInt(capId.replace('cap-', '')) || 1;
    
    await run(
      `UPDATE research_records SET
        merk = COALESCE(?, merk),
        link = COALESCE(?, link),
        url = COALESCE(?, url),
        pic = COALESCE(?, pic),
        status = COALESCE(?, status)
       WHERE no = ? AND LOWER(bankCode) = LOWER(?)`,
      [merk, link, url, pic, status, no, bankCode]
    );
    await recordAudit('usr-1', userName || 'Analyst', 'UPDATE', 'Finding', `Pembaruan riset kapabilitas #${no} bank ${bankCode.toUpperCase()} (${status || 'Updated'})`);
    res.json({ success: true, capId, bankCode, merk, status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update capability metadata and/or all its bank evaluations
app.put('/api/research-matrix/:capId', async (req, res) => {
  try {
    const { capId } = req.params;
    const { workshop, domain, kategori, kapabilitas, banks, userName } = req.body;
    const no = parseInt(capId.replace('cap-', '')) || 1;

    // Update capability meta for all 6 bank records with this 'no'
    await run(
      `UPDATE research_records SET
        workshop = COALESCE(?, workshop),
        domain = COALESCE(?, domain),
        kategori = COALESCE(?, kategori),
        kapabilitas = COALESCE(?, kapabilitas)
       WHERE no = ?`,
      [workshop, domain, kategori, kapabilitas, no]
    );

    // If banks object is provided, update each bank record
    if (banks && typeof banks === 'object') {
      for (const [bankSlug, bDetail] of Object.entries(banks)) {
        if (!bDetail) continue;
        await run(
          `UPDATE research_records SET
            merk = COALESCE(?, merk),
            link = COALESCE(?, link),
            url = COALESCE(?, url),
            pic = COALESCE(?, pic),
            status = COALESCE(?, status)
           WHERE no = ? AND LOWER(bankCode) = LOWER(?)`,
          [bDetail.merk, bDetail.link, bDetail.url, bDetail.pic, bDetail.status, no, bankSlug]
        );
      }
    }

    await recordAudit('usr-1', userName || 'Admin', 'UPDATE', 'Finding', `Memperbarui kapabilitas riset #${no} (${kapabilitas || 'Meta'})`);
    res.json({ success: true, capId, no });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new capability to research matrix across all 6 banks
app.post('/api/research-matrix', async (req, res) => {
  try {
    const { workshop, domain, kategori, kapabilitas, banks, userName } = req.body;
    if (!kapabilitas || !workshop || !domain || !kategori) {
      return res.status(400).json({ error: 'Kapabilitas, workshop, domain, dan kategori wajib diisi.' });
    }

    const maxNoRow = await getOne('SELECT MAX(no) as maxNo FROM research_records');
    const newNo = (maxNoRow?.maxNo || 0) + 1;
    const newCapId = `cap-${newNo}`;

    const bankList = [
      { code: 'BRI', id: 'bank-bri', key: 'bri' },
      { code: 'Mandiri', id: 'bank-mandiri', key: 'mandiri' },
      { code: 'BCA', id: 'bank-bca', key: 'bca' },
      { code: 'BNI', id: 'bank-bni', key: 'bni' },
      { code: 'BTN', id: 'bank-btn', key: 'btn' },
      { code: 'BSI', id: 'bank-bsi', key: 'bsi' }
    ];

    for (const b of bankList) {
      const bDetail = banks?.[b.key] || {};
      const rowId = `rec-${newNo}-${b.code.toLowerCase()}`;
      await run(
        `INSERT INTO research_records (id, no, workshop, domain, kategori, kapabilitas, bankCode, bankId, merk, link, url, pic, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          rowId,
          newNo,
          workshop,
          domain,
          kategori,
          kapabilitas,
          b.code,
          b.id,
          bDetail.merk || '-',
          bDetail.link || '',
          bDetail.url || '',
          bDetail.pic || 'Admin',
          bDetail.status || 'Belum'
        ]
      );
    }

    await recordAudit('usr-1', userName || 'Admin', 'CREATE', 'Finding', `Menambahkan kapabilitas riset baru #${newNo}: ${kapabilitas}`);
    res.status(201).json({ success: true, id: newCapId, no: newNo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a capability from research matrix
app.delete('/api/research-matrix/:capId', async (req, res) => {
  try {
    const { capId } = req.params;
    const no = parseInt(capId.replace('cap-', '')) || 0;
    const { userName } = req.query;

    await run('DELETE FROM research_records WHERE no = ?', [no]);
    await recordAudit('usr-1', userName || 'Admin', 'DELETE', 'Finding', `Menghapus kapabilitas riset #${no}`);
    res.json({ success: true, capId, no });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 8. Auth & Users
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email dan password wajib diisi.' });
    }

    // Case-insensitive email match
    const user = await getOne(
      'SELECT id, nama, email, role, avatar, password FROM users WHERE LOWER(email) = LOWER(?)',
      [email.trim()]
    );

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Email atau password salah.' });
    }

    const { password: _, ...safeUser } = user;
    await recordAudit(user.id, user.nama, 'LOGIN', 'User', `Pengguna ${user.nama} berhasil masuk sebagai ${user.role}`);

    res.json({
      success: true,
      user: safeUser,
      token: `auth-${user.id}-${Date.now()}`
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await query('SELECT id, nama, email, role, avatar FROM users');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 8. Audit Logs
app.get('/api/audit-logs', async (req, res) => {
  try {
    const logs = await query('SELECT * FROM audit_logs ORDER BY timestamp DESC LIMIT 100');
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 9. Reset Database
app.post('/api/reset-data', async (req, res) => {
  try {
    await run('DELETE FROM evidences');
    await run('DELETE FROM findings');
    await run('DELETE FROM interviews');
    await run('DELETE FROM technologies');
    await run('DELETE FROM categories');
    await run('DELETE FROM banks');
    await run('DELETE FROM users');
    await run('DELETE FROM audit_logs');
    await seedDatabaseIfEmpty();
    await recordAudit('usr-1', 'Admin', 'UPDATE', 'Finding', 'Mereset database kembali ke versi awal');
    res.json({ success: true, message: 'Database reset to initial seed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve frontend static build if dist exists
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

app.use((req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'Endpoint not found' });
  }
  res.sendFile(path.join(distPath, 'index.html'));
});

// Start Server
const startServer = async () => {
  try {
    await initDatabase();
    await seedDatabaseIfEmpty();
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Competitor Intelligence Backend API & Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();
