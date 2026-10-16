import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { query, run, getOne } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEFAULT_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1L0WBGmZVrzIHOojtZjYSeSEEggNsMPOG9AhQQj0-PoY/edit?gid=0#gid=0';

// Helper to extract spreadsheetId and gid from Google Sheet URL
export function parseGoogleSheetUrl(url) {
  try {
    const sheetIdMatch = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
    const spreadsheetId = sheetIdMatch ? sheetIdMatch[1] : null;

    let gid = '0';
    const gidMatch = url.match(/[#&?]gid=([0-9]+)/);
    if (gidMatch) {
      gid = gidMatch[1];
    }

    if (!spreadsheetId) {
      throw new Error('URL Google Sheet tidak valid (Spreadsheet ID tidak ditemukan)');
    }

    const exportCsvUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&gid=${gid}`;
    return { spreadsheetId, gid, exportCsvUrl };
  } catch (err) {
    throw new Error(`Gagal mem-parse URL Google Sheet: ${err.message}`);
  }
}

// RFC 4180 compliant CSV parser that handles newlines within quotes
export function parseCSV(text) {
  const lines = [];
  let row = [];
  let inQuotes = false;
  let curr = '';

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"' && inQuotes && nextChar === '"') {
      curr += '"';
      i++;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      row.push(curr.trim());
      curr = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') i++;
      row.push(curr.trim());
      if (row.length > 1 || row[0] !== '') lines.push(row);
      row = [];
      curr = '';
    } else {
      curr += char;
    }
  }

  if (curr || row.length > 0) {
    row.push(curr.trim());
    lines.push(row);
  }

  return lines;
}

// Extract URL from text string
function extractUrl(text) {
  if (!text) return '';
  const match = text.match(/https?:\/\/[^\s\)\;\"\'\<\>]+/);
  return match ? match[0] : '';
}

// Transform raw CSV rows from Google Sheet into capability items
export function transformGoogleSheetRows(csvRows) {
  // Find header index
  let headerIndex = -1;
  for (let i = 0; i < Math.min(10, csvRows.length); i++) {
    const r = csvRows[i];
    if (r[0] === 'No' || r.some(cell => typeof cell === 'string' && cell.toLowerCase().includes('workshop'))) {
      headerIndex = i;
      break;
    }
  }

  const rows = headerIndex >= 0 ? csvRows.slice(headerIndex + 1) : csvRows;
  const capMap = new Map();

  let currentNo = 1;
  let currentWs = 'WS1';
  let currentDomain = 'Core Banking System (CBS)';
  let currentKategori = 'Software/Sistem';
  let currentKap = 'Core Banking System (CBS)';
  let lastBank = 'BRI';

  for (let i = 0; i < rows.length; i++) {
    const r = rows[i];
    if (!r || r.length === 0) continue;

    const noStr = r[0]?.trim();
    const ws = r[1]?.trim();
    const domain = r[2]?.trim();
    const kat = r[3]?.trim();
    const kap = r[4]?.trim();
    const merk = r[5]?.trim();
    let bank = r[6]?.trim();
    const link = r[7]?.trim();
    const pic = r[8]?.trim();
    const status = r[9]?.trim();

    if (noStr && !isNaN(parseInt(noStr))) {
      currentNo = parseInt(noStr);
    }
    if (ws) currentWs = ws;
    if (domain) currentDomain = domain;
    if (kat) currentKategori = kat;
    if (kap) currentKap = kap;

    if (bank) {
      lastBank = bank;
    } else {
      bank = lastBank;
    }

    const bankKey = bank.toLowerCase();
    const capId = `cap-${currentNo}`;

    if (!capMap.has(capId)) {
      capMap.set(capId, {
        id: capId,
        no: currentNo,
        workshop: currentWs,
        domain: currentDomain,
        kategori: currentKategori,
        kapabilitas: currentKap,
        banks: {
          bri: { bankCode: 'BRI', merk: '-', link: '', url: '', pic: 'Mrs Utami', status: 'Belum' },
          mandiri: { bankCode: 'Mandiri', merk: '-', link: '', url: '', pic: 'Mrs Utami', status: 'Belum' },
          bca: { bankCode: 'BCA', merk: '-', link: '', url: '', pic: 'Mrs Utami', status: 'Belum' },
          bni: { bankCode: 'BNI', merk: '-', link: '', url: '', pic: 'Mrs Utami', status: 'Belum' },
          btn: { bankCode: 'BTN', merk: '-', link: '', url: '', pic: 'Mrs Utami', status: 'Belum' },
          bsi: { bankCode: 'BSI', merk: '-', link: '', url: '', pic: 'Mrs Utami', status: 'Belum' }
        }
      });
    }

    const cap = capMap.get(capId);
    if (cap.banks[bankKey]) {
      const existing = cap.banks[bankKey];

      let newMerk = merk || existing.merk;
      let newLink = link || existing.link;
      let newPic = pic || existing.pic;
      let newStatus = status || existing.status;

      // If supplementary row with no No specified
      if (!noStr && merk && existing.merk && existing.merk !== '-') {
        if (!existing.merk.includes(merk)) {
          newMerk = `${existing.merk}\n[Update ${pic || 'Narasumber'}]: ${merk}`;
        }
        if (link && !existing.link.includes(link)) {
          newLink = existing.link ? `${existing.link}\n${link}` : link;
        }
        if (status) newStatus = status;
        if (pic) newPic = pic;
      }

      cap.banks[bankKey] = {
        bankCode: existing.bankCode,
        merk: newMerk || '-',
        link: newLink || '',
        url: extractUrl(newLink) || existing.url || '',
        pic: newPic || 'Mrs Utami',
        status: newStatus || 'Belum'
      };
    }
  }

  return Array.from(capMap.values()).sort((a, b) => a.no - b.no);
}

// Convert capability items array back to Google Sheet 2D array / CSV rows
export function capabilitiesToGoogleSheetRows(capabilities) {
  const header = [
    'No',
    'Workshop',
    'Domain',
    'Kategori',
    'Kapabilitas/Sistem yang Dicari',
    'Merk/Stack Name',
    'Bank Pengguna',
    'Link/Sumber',
    'PIC',
    'Status Verifikasi'
  ];

  const rows = [
    ['DAFTAR RISET TEKNOLOGI — kapabilitas/sistem per domain × 6 bank (BRI · Mandiri · BCA · BNI · BTN · BSI)', '', '', '', '', '', '', '', '', ''],
    header
  ];

  const bankKeys = [
    { key: 'bri', code: 'BRI' },
    { key: 'mandiri', code: 'Mandiri' },
    { key: 'bca', code: 'BCA' },
    { key: 'bni', code: 'BNI' },
    { key: 'btn', code: 'BTN' },
    { key: 'bsi', code: 'BSI' }
  ];

  for (const cap of capabilities) {
    for (const b of bankKeys) {
      const bData = cap.banks[b.key] || {};
      rows.push([
        String(cap.no),
        cap.workshop || '',
        cap.domain || '',
        cap.kategori || '',
        cap.kapabilitas || '',
        bData.merk || '-',
        b.code,
        bData.link || '',
        bData.pic || 'Mrs Utami',
        bData.status || 'Belum'
      ]);
    }
  }

  return rows;
}

// Convert 2D rows into CSV string
export function rowsToCSV(rows) {
  const escapeCSV = (val) => {
    const str = String(val ?? '').replace(/"/g, '""');
    return `"${str}"`;
  };

  return '\uFEFF' + rows.map(row => row.map(escapeCSV).join(',')).join('\n');
}

// Convert 2D rows into TSV string (perfect for clipboard paste into Google Sheets)
export function rowsToTSV(rows) {
  return rows.map(row => row.map(val => String(val ?? '').replace(/\t/g, ' ').replace(/\r?\n/g, ' ')).join('\t')).join('\n');
}

// Initialize sync tables
export async function initSyncTables() {
  await run(`
    CREATE TABLE IF NOT EXISTS sync_settings (
      key TEXT PRIMARY KEY,
      value TEXT
    );
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS sync_history (
      id TEXT PRIMARY KEY,
      action TEXT NOT NULL,
      source TEXT NOT NULL,
      status TEXT NOT NULL,
      recordsCount INTEGER DEFAULT 0,
      details TEXT,
      timestamp TEXT NOT NULL
    );
  `);

  // Default settings
  const existingUrl = await getOne('SELECT value FROM sync_settings WHERE key = ?', ['sheet_url']);
  if (!existingUrl) {
    await run('INSERT INTO sync_settings (key, value) VALUES (?, ?)', ['sheet_url', DEFAULT_SHEET_URL]);
    await run('INSERT INTO sync_settings (key, value) VALUES (?, ?)', ['auto_sync', '0']);
    await run('INSERT INTO sync_settings (key, value) VALUES (?, ?)', ['auto_sync_interval', '0']); // 0 = disabled
    await run('INSERT INTO sync_settings (key, value) VALUES (?, ?)', ['apps_script_url', '']);
    await run('INSERT INTO sync_settings (key, value) VALUES (?, ?)', ['last_sync_time', '']);
    await run('INSERT INTO sync_settings (key, value) VALUES (?, ?)', ['last_sync_status', 'Belum Pernah']);
    await run('INSERT INTO sync_settings (key, value) VALUES (?, ?)', ['last_sync_summary', '']);
  }
}

// Get sync settings
export async function getSyncSettings() {
  await initSyncTables();
  const rows = await query('SELECT key, value FROM sync_settings');
  const settings = {
    sheet_url: DEFAULT_SHEET_URL,
    auto_sync: '0',
    auto_sync_interval: '0',
    apps_script_url: '',
    last_sync_time: '',
    last_sync_status: 'Siap',
    last_sync_summary: ''
  };

  rows.forEach(r => {
    settings[r.key] = r.value;
  });

  return settings;
}

// Update sync settings
export async function updateSyncSettings(newSettings) {
  await initSyncTables();
  for (const [key, value] of Object.entries(newSettings)) {
    await run(
      `INSERT INTO sync_settings (key, value) VALUES (?, ?)
       ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
      [key, String(value ?? '')]
    );
  }
  return await getSyncSettings();
}

// Record a sync history entry
export async function recordSyncHistory(action, source, status, recordsCount, details) {
  const id = `sync-${Date.now()}`;
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
  await run(
    `INSERT INTO sync_history (id, action, source, status, recordsCount, details, timestamp)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [id, action, source, status, recordsCount, details, timestamp]
  );
}

// Pull data from Google Sheet into SQLite and JSON cache
export async function pullFromGoogleSheet(customUrl = null, userName = 'Admin') {
  await initSyncTables();
  const settings = await getSyncSettings();
  const targetUrl = customUrl || settings.sheet_url || DEFAULT_SHEET_URL;

  console.log(`🌐 [GoogleSync] Memulai penarikan data dari: ${targetUrl}`);

  const { spreadsheetId, gid, exportCsvUrl } = parseGoogleSheetUrl(targetUrl);

  const response = await fetch(exportCsvUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Competitor-Intelligence-BRI/1.0)'
    }
  });

  if (!response.ok) {
    const errorText = `Google Sheets mengembalikan kode HTTP ${response.status}: ${response.statusText}`;
    await recordSyncHistory('PULL', targetUrl, 'FAILED', 0, errorText);
    await updateSyncSettings({
      last_sync_time: new Date().toISOString().replace('T', ' ').substring(0, 19),
      last_sync_status: 'Gagal',
      last_sync_summary: errorText
    });
    throw new Error(errorText);
  }

  const csvText = await response.text();
  const parsedRows = parseCSV(csvText);

  if (!parsedRows || parsedRows.length < 5) {
    throw new Error('Data CSV Google Sheet kosong atau tidak memiliki baris data yang cukup.');
  }

  const capabilities = transformGoogleSheetRows(parsedRows);

  if (!capabilities || capabilities.length === 0) {
    throw new Error('Gagal mengekstrak kapabilitas dari CSV Google Sheet.');
  }

  console.log(`📊 [GoogleSync] Berhasil mengekstrak ${capabilities.length} kapabilitas dari ${parsedRows.length} baris Google Sheet.`);

  // Save into SQLite research_records
  const bankMap = [
    { code: 'BRI', id: 'bank-bri', key: 'bri' },
    { code: 'Mandiri', id: 'bank-mandiri', key: 'mandiri' },
    { code: 'BCA', id: 'bank-bca', key: 'bca' },
    { code: 'BNI', id: 'bank-bni', key: 'bni' },
    { code: 'BTN', id: 'bank-btn', key: 'btn' },
    { code: 'BSI', id: 'bank-bsi', key: 'bsi' }
  ];

  await run('BEGIN TRANSACTION');
  try {
    await run('DELETE FROM research_records');

    for (const cap of capabilities) {
      for (const b of bankMap) {
        const bDetail = cap.banks[b.key] || { merk: '-', link: '', url: '', pic: 'Admin', status: 'Belum' };
        const rowId = `rec-${cap.no}-${b.key}`;
        await run(
          `INSERT INTO research_records (id, no, workshop, domain, kategori, kapabilitas, bankCode, bankId, merk, link, url, pic, status)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            rowId,
            cap.no,
            cap.workshop,
            cap.domain,
            cap.kategori,
            cap.kapabilitas,
            b.code,
            b.id,
            bDetail.merk || '-',
            bDetail.link || '',
            bDetail.url || '',
            bDetail.pic || 'Mrs Utami',
            bDetail.status || 'Belum'
          ]
        );
      }
    }

    await run('COMMIT');
  } catch (err) {
    await run('ROLLBACK');
    throw err;
  }

  // Update researchMatrix.json files for fallback
  const matrixJsonPathServer = path.join(__dirname, 'researchMatrix.json');
  fs.writeFileSync(matrixJsonPathServer, JSON.stringify(capabilities, null, 2), 'utf8');

  const matrixJsonPathSrc = path.join(__dirname, '../src/data/researchMatrix.json');
  if (fs.existsSync(path.dirname(matrixJsonPathSrc))) {
    try {
      fs.writeFileSync(matrixJsonPathSrc, JSON.stringify(capabilities, null, 2), 'utf8');
    } catch (e) {
      console.warn('Could not write to src/data/researchMatrix.json:', e.message);
    }
  }

  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
  const summary = `Berhasil sinkronisasi ${capabilities.length} kapabilitas (${capabilities.length * 6} entri bank) dari Google Sheets`;

  await updateSyncSettings({
    sheet_url: targetUrl,
    last_sync_time: timestamp,
    last_sync_status: 'Sukses',
    last_sync_summary: summary
  });

  await recordSyncHistory('PULL', targetUrl, 'SUCCESS', capabilities.length, summary);

  return {
    success: true,
    capabilitiesCount: capabilities.length,
    totalBankEntries: capabilities.length * 6,
    timestamp,
    summary,
    items: capabilities
  };
}

// Push data to Google Sheet via Google Apps Script Webhook
export async function pushToGoogleSheet(customWebhookUrl = null, userName = 'Admin') {
  await initSyncTables();
  const settings = await getSyncSettings();
  const webhookUrl = customWebhookUrl || settings.apps_script_url;

  // Retrieve current capabilities from SQLite
  const records = await query('SELECT * FROM research_records ORDER BY no ASC');
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

  const capabilities = Array.from(capMap.values());
  const rows = capabilitiesToGoogleSheetRows(capabilities);

  // If no webhook URL configured, return the data ready for manual clipboard copy / export
  if (!webhookUrl || !webhookUrl.trim()) {
    const summary = 'Webhook Apps Script belum dikonfigurasi. Data diformat untuk disalin/diekspor langsung ke Google Sheets.';
    return {
      success: false,
      requiresWebhook: true,
      message: summary,
      rowCount: rows.length,
      capabilitiesCount: capabilities.length,
      csvContent: rowsToCSV(rows),
      tsvContent: rowsToTSV(rows)
    };
  }

  // If webhook configured, POST to Google Apps Script
  console.log(`🚀 [GoogleSync] Mengirim ${rows.length} baris ke Webhook Apps Script: ${webhookUrl}`);

  const payload = {
    action: 'sync_all',
    source: 'Competitor Intelligence App',
    user: userName,
    timestamp: new Date().toISOString(),
    rows: rows
  };

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = `Webhook Apps Script gagal (HTTP ${response.status}: ${response.statusText})`;
    await recordSyncHistory('PUSH', webhookUrl, 'FAILED', rows.length, errorText);
    throw new Error(errorText);
  }

  const result = await response.json().catch(() => ({ status: 'ok' }));
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
  const summary = `Berhasil mengirim ${rows.length} baris ke Google Sheet via Webhook`;

  await updateSyncSettings({
    last_sync_time: timestamp,
    last_sync_status: 'Push Sukses',
    last_sync_summary: summary
  });

  await recordSyncHistory('PUSH', webhookUrl, 'SUCCESS', rows.length, summary);

  return {
    success: true,
    requiresWebhook: false,
    timestamp,
    summary,
    result
  };
}
