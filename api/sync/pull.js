// Vercel Serverless Function: Pull Google Sheets CSV & Parse Capabilities
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { url } = req.body || {};
    const targetUrl = url || 'https://docs.google.com/spreadsheets/d/1L0WBGmZVrzIHOojtZjYSeSEEggNsMPOG9AhQQj0-PoY/edit?gid=0#gid=0';

    // Parse spreadsheet id and gid
    const sheetIdMatch = targetUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
    const spreadsheetId = sheetIdMatch ? sheetIdMatch[1] : null;
    let gid = '0';
    const gidMatch = targetUrl.match(/[#&?]gid=([0-9]+)/);
    if (gidMatch) gid = gidMatch[1];

    if (!spreadsheetId) {
      return res.status(400).json({ error: 'URL Google Sheet tidak valid (Spreadsheet ID tidak ditemukan)' });
    }

    const exportCsvUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&gid=${gid}`;
    
    // Fetch directly from Google Docs on server (no browser CORS restrictions)
    const response = await fetch(exportCsvUrl, { redirect: 'follow' });
    if (!response.ok) {
      return res.status(502).json({ error: `Gagal mengunduh CSV dari Google Sheets (HTTP ${response.status})` });
    }

    const csvText = await response.text();
    const rows = parseCSV(csvText);
    const items = transformGoogleSheetRows(rows);

    return res.status(200).json({
      success: true,
      recordsCount: items.length * 6,
      capabilitiesCount: items.length,
      items,
      summary: `Berhasil sinkronisasi ${items.length} kapabilitas dari Google Sheets via Vercel Cloud`
    });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Gagal memproses sinkronisasi' });
  }
}

// RFC 4180 compliant CSV parser
function parseCSV(text) {
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

function extractUrl(text) {
  if (!text) return '';
  const match = text.match(/https?:\/\/[^\s\)\;\"\'\<\>]+/);
  return match ? match[0] : '';
}

function transformGoogleSheetRows(csvRows) {
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
