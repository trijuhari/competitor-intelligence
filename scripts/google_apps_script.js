/**
 * GOOGLE APPS SCRIPT WEBHOOK UNTUK SINKRONISASI COMPETITOR INTELLIGENCE BANK BRI
 * 
 * CARA PEMASANGAN (1 MENIT):
 * 1. Buka spreadsheet:
 *    https://docs.google.com/spreadsheets/d/1L0WBGmZVrzIHOojtZjYSeSEEggNsMPOG9AhQQj0-PoY/edit?gid=0#gid=0
 * 2. Di menu atas Google Sheets, klik: Extensions > Apps Script (Ekstensi > Apps Script).
 * 3. Hapus kode yang ada, lalu salin dan tempel (paste) seluruh kode skrip ini.
 * 4. Klik ikon Save (Disket / Ctrl+S).
 * 5. Klik tombol biru "Deploy" (Terapkan) di pojok kanan atas > "New deployment" (Penerapan baru).
 * 6. Pilih tipe: "Web app" (ikon globe).
 * 7. Isi konfigurasi:
 *    - Description: Competitor Intelligence Webhook
 *    - Execute as: Me (email akun Anda)
 *    - Who has access: Anyone (Siapa saja)  <-- PENTING agar sistem bisa mengirim pembaruan
 * 8. Klik "Deploy". Jika Google meminta autorisasi akses spreadsheet, klik "Authorize access" dan izinkan.
 * 9. Salin "Web app URL" (contoh: https://script.google.com/macros/s/AKfycb.../exec).
 * 10. Buka aplikasi Competitor Intelligence > Admin Portal > Google Sheets Sync, 
 *     lalu tempelkan URL tersebut ke kolom "Webhook Apps Script URL" dan klik Simpan!
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    // Tunggu maksimal 30 detik untuk menghindari tabrakan konkurensi
    lock.waitLock(30000);

    var rawData = e.postData.contents;
    var payload = JSON.parse(rawData);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();

    // 1. Aksi sinkronisasi seluruh tabel (Push All)
    if (payload.action === 'sync_all' && Array.isArray(payload.rows)) {
      var rows = payload.rows;
      if (rows.length === 0) {
        return createResponse({ status: 'error', message: 'Data baris kosong' }, 400);
      }

      var numRows = rows.length;
      var numCols = rows[0].length;

      // Update nilai mulai dari sel A1
      sheet.getRange(1, 1, numRows, numCols).setValues(rows);

      return createResponse({
        status: 'ok',
        action: 'sync_all',
        updatedRows: numRows,
        timestamp: new Date().toISOString()
      }, 200);
    }

    // 2. Aksi update 1 baris/sel tertentu (Update Single Cell/Capability)
    if (payload.action === 'update_cell') {
      var no = parseInt(payload.no);
      var bankCode = String(payload.bankCode || '').toUpperCase();
      var merk = payload.merk;
      var link = payload.link;
      var pic = payload.pic;
      var status = payload.status;

      var lastRow = sheet.getLastRow();
      var data = sheet.getRange(2, 1, lastRow - 1, 10).getValues();

      var found = false;
      for (var i = 0; i < data.length; i++) {
        var rowNo = parseInt(data[i][0]);
        var rowBank = String(data[i][6] || '').trim().toUpperCase();

        if (rowNo === no && rowBank === bankCode) {
          var rowIndex = i + 2; // offset header
          if (merk !== undefined) sheet.getRange(rowIndex, 6).setValue(merk);
          if (link !== undefined) sheet.getRange(rowIndex, 8).setValue(link);
          if (pic !== undefined) sheet.getRange(rowIndex, 9).setValue(pic);
          if (status !== undefined) sheet.getRange(rowIndex, 10).setValue(status);
          found = true;
          break;
        }
      }

      if (found) {
        return createResponse({ status: 'ok', updated: true, no: no, bank: bankCode }, 200);
      } else {
        return createResponse({ status: 'not_found', message: 'Baris kapabilitas tidak ditemukan' }, 404);
      }
    }

    return createResponse({ status: 'error', message: 'Aksi tidak dikenali' }, 400);

  } catch (err) {
    return createResponse({ status: 'error', message: err.toString() }, 500);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return createResponse({
    status: 'active',
    message: 'Competitor Intelligence Google Sheets Webhook is active and healthy.',
    timestamp: new Date().toISOString()
  }, 200);
}

function createResponse(data, statusCode) {
  var output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
