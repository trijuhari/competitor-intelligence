import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileSpreadsheet, RefreshCw, Upload, Download, CheckCircle2, 
  AlertCircle, ExternalLink, Copy, Check, Settings, History, 
  HelpCircle, ChevronDown, ChevronUp, Clock, ShieldCheck, ArrowDownRight, ArrowUpRight, X
} from 'lucide-react';
import { api } from '../../services/api';

interface GoogleSheetsSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleSheetsSyncModal: React.FC<GoogleSheetsSyncModalProps> = ({ isOpen, onClose }) => {
  const { 
    syncStatus, 
    isSyncing, 
    pullGoogleSheet, 
    pushGoogleSheet, 
    updateSyncConfig,
    currentUser,
    researchItems 
  } = useApp();

  const [sheetUrlInput, setSheetUrlInput] = useState(syncStatus?.sheet_url || '');
  const [webhookUrlInput, setWebhookUrlInput] = useState(syncStatus?.apps_script_url || '');
  const [autoInterval, setAutoInterval] = useState(syncStatus?.auto_sync_interval || '0');
  
  const [activeTab, setActiveTab] = useState<'sync' | 'settings' | 'history' | 'script'>('sync');
  const [historyList, setHistoryList] = useState<any[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const [copiedScript, setCopiedScript] = useState(false);
  const [copiedTable, setCopiedTable] = useState(false);

  useEffect(() => {
    if (syncStatus) {
      setSheetUrlInput(syncStatus.sheet_url || '');
      setWebhookUrlInput(syncStatus.apps_script_url || '');
      setAutoInterval(syncStatus.auto_sync_interval || '0');
    }
  }, [syncStatus]);

  useEffect(() => {
    if (activeTab === 'history') {
      loadHistory();
    }
  }, [activeTab]);

  const loadHistory = async () => {
    setIsLoadingHistory(true);
    try {
      const data = await api.getSyncHistory();
      setHistoryList(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  if (!isOpen) return null;

  const handlePull = async () => {
    setFeedback({ type: 'info', message: 'Sedang menarik data live dari Google Sheets...' });
    const res = await pullGoogleSheet(sheetUrlInput);
    if (res.success) {
      setFeedback({ type: 'success', message: res.summary || 'Berhasil sinkronisasi dari Google Sheets!' });
    } else {
      setFeedback({ type: 'error', message: res.error || 'Gagal sinkronisasi dari Google Sheets.' });
    }
  };

  const handlePush = async () => {
    setFeedback({ type: 'info', message: 'Sedang menyiapkan dan memproses pengiriman ke Google Sheets...' });
    const res = await pushGoogleSheet(webhookUrlInput);
    if (res.success) {
      setFeedback({ type: 'success', message: res.summary || 'Berhasil mengirim data ke Google Sheets!' });
    } else if (res.requiresWebhook) {
      setFeedback({ 
        type: 'info', 
        message: 'Webhook belum dipasang. Tabel diformat khusus dan siap disalin/paste langsung ke Google Sheet.' 
      });
      // Copy to clipboard automatically as fallback
      if (res.tsvContent) {
        navigator.clipboard.writeText(res.tsvContent);
        setCopiedTable(true);
        setTimeout(() => setCopiedTable(false), 3000);
      }
    } else {
      setFeedback({ type: 'error', message: res.error || 'Gagal mengirim data.' });
    }
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateSyncConfig({
        sheet_url: sheetUrlInput,
        apps_script_url: webhookUrlInput,
        auto_sync_interval: autoInterval,
        auto_sync: autoInterval !== '0' ? '1' : '0'
      });
      setFeedback({ type: 'success', message: 'Pengaturan Google Sheets berhasil disimpan!' });
      setActiveTab('sync');
    } catch (err: any) {
      setFeedback({ type: 'error', message: err?.message || 'Gagal menyimpan pengaturan.' });
    }
  };

  const handleCopyScript = () => {
    const scriptText = `function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000);
    var payload = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    if (payload.action === 'sync_all' && Array.isArray(payload.rows)) {
      var rows = payload.rows;
      if (rows.length === 0) return createResponse({ status: 'error', message: 'Empty' }, 400);
      sheet.getRange(1, 1, rows.length, rows[0].length).setValues(rows);
      return createResponse({ status: 'ok', updatedRows: rows.length }, 200);
    }
    return createResponse({ status: 'error', message: 'Unknown action' }, 400);
  } catch (err) {
    return createResponse({ status: 'error', message: err.toString() }, 500);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return createResponse({ status: 'active', message: 'Competitor Intelligence Webhook Ready' }, 200);
}

function createResponse(data, statusCode) {
  var output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}`;

    navigator.clipboard.writeText(scriptText);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  const handleCopyFormattedTable = async () => {
    try {
      const res = await pushGoogleSheet();
      if (res.tsvContent) {
        await navigator.clipboard.writeText(res.tsvContent);
        setCopiedTable(true);
        setTimeout(() => setCopiedTable(false), 3000);
        setFeedback({ 
          type: 'success', 
          message: 'Tabel berhasil disalin ke clipboard! Buka Google Sheet dan tekan Ctrl+V pada sel A1.' 
        });
      }
    } catch (e: any) {
      setFeedback({ type: 'error', message: 'Gagal menyalin tabel: ' + e?.message });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/50 flex items-center justify-center p-3 sm:p-4">
      <div className="bg-surface rounded-2xl shadow-2xl border border-line w-full max-w-3xl overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 p-5 sm:p-6 text-white relative">
          <button 
            onClick={onClose} 
            className="absolute top-5 right-5 text-white/70 hover:text-white p-1 rounded-xl hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-black/20 flex items-center justify-center border border-white/25 shadow-sm">
              <FileSpreadsheet className="w-6 h-6 text-emerald-200" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-black tracking-tight text-white">
                  Google Sheets Sync Center
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/30 text-emerald-100 border border-emerald-400/30 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
                  <span>Terhubung Live</span>
                </span>
              </div>
              <p className="text-xs text-emerald-100/90 font-medium">
                Sinkronisasi dua arah antara Aplikasi Competitor Intelligence & Dokumen Google Spreadsheet
              </p>
            </div>
          </div>

          {/* Connected Sheet Card */}
          <div className="mt-4 p-3 bg-white/10 rounded-2xl border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="truncate flex items-center space-x-2">
              <span className="text-emerald-200 font-bold shrink-0">Sheet Target:</span>
              <a 
                href={syncStatus?.sheet_url || 'https://docs.google.com/spreadsheets/d/1L0WBGmZVrzIHOojtZjYSeSEEggNsMPOG9AhQQj0-PoY/edit?gid=0#gid=0'} 
                target="_blank" 
                rel="noreferrer"
                className="font-mono text-[11px] text-white hover:underline truncate flex items-center space-x-1"
                title="Buka Spreadsheet di Tab Baru"
              >
                <span className="truncate">{syncStatus?.sheet_url || '1L0WBGmZVrzIHOojtZjYSeSEEggNsMPOG9AhQQj0-PoY'}</span>
                <ExternalLink className="w-3.5 h-3.5 shrink-0 text-emerald-200 ml-1" />
              </a>
            </div>
            <div className="flex items-center space-x-3 shrink-0 text-[11px] text-emerald-100">
              <span>{researchItems.length} Kapabilitas</span>
              <span>•</span>
              <span>{researchItems.length * 6} Entri Bank</span>
            </div>
          </div>
        </div>

        {/* Subtabs Bar */}
        <div className="px-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50 flex space-x-1 overflow-x-auto text-xs">
          {[
            { id: 'sync', label: 'Sinkronisasi Data', icon: RefreshCw },
            { id: 'settings', label: 'Pengaturan Koneksi', icon: Settings },
            { id: 'script', label: 'Skrip Webhook Apps Script', icon: ShieldCheck },
            { id: 'history', label: 'Riwayat Log', icon: History },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-3.5 font-bold border-b-2 flex items-center space-x-2 transition-all whitespace-nowrap ${
                  isActive 
                    ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-white dark:bg-slate-900 shadow-2xs' 
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div className={`mx-6 mt-4 p-3 rounded-2xl text-xs flex items-start justify-between gap-3 ${
            feedback.type === 'success' 
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              : feedback.type === 'error'
              ? 'bg-red-50 border border-red-200 text-red-800'
              : 'bg-blue-50 border border-blue-200 text-blue-800'
          }`}>
            <div className="flex items-center space-x-2">
              {feedback.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : feedback.type === 'error' ? (
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              ) : (
                <RefreshCw className="w-4 h-4 text-blue-600 animate-spin shrink-0" />
              )}
              <span className="font-semibold">{feedback.message}</span>
            </div>
            <button onClick={() => setFeedback(null)} className="text-slate-400 hover:text-slate-600">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-slate-700 dark:text-slate-200 text-xs">

          {/* TAB 1: SINKRONISASI DATA */}
          {activeTab === 'sync' && (
            <div className="space-y-5">
              
              {/* Status Banner */}
              <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="text-[11px] font-extrabold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                    Status Sinkronisasi Terakhir
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-black text-slate-900 dark:text-white text-sm">
                      {syncStatus?.last_sync_status || 'Siap'}
                    </span>
                    <span className="text-slate-400 dark:text-slate-500">•</span>
                    <span className="font-mono text-slate-500 dark:text-slate-400 text-xs">
                      {syncStatus?.last_sync_time || 'Belum pernah di-sync sesi ini'}
                    </span>
                  </div>
                  {syncStatus?.last_sync_summary && (
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 font-normal">
                      {syncStatus.last_sync_summary}
                    </p>
                  )}
                </div>

                <div className="text-right shrink-0">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-xl text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    Database Lokal SQLite Aktif
                  </span>
                </div>
              </div>

              {/* Action Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* PULL CARD */}
                <div className="p-5 rounded-3xl border border-blue-200/80 dark:border-blue-800/60 bg-gradient-to-br from-blue-50/60 to-white dark:from-blue-950/30 dark:to-slate-850 hover:border-blue-300 dark:hover:border-blue-600 transition-all shadow-xs flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-blue-700 dark:text-blue-400">
                      <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-900/60 flex items-center justify-center font-bold">
                        <ArrowDownRight className="w-4 h-4 text-blue-700 dark:text-blue-300" />
                      </div>
                      <span className="font-black text-sm">Tarik Data (Pull Sync)</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      Mengambil pembaruan temuan, catatan narasumber, dan pembuktian terbaru langsung dari Google Sheet publik/terbuka ke database SQLite aplikasi.
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={handlePull}
                      disabled={isSyncing}
                      className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-xs transition disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                      <span>{isSyncing ? 'Sedang Sinkronisasi...' : 'Tarik Data dari Google Sheet'}</span>
                    </button>
                    <span className="block text-[10px] text-center text-slate-400 dark:text-slate-500 mt-1.5 font-medium">
                      Otomatis merge 408 kapabilitas × 6 bank
                    </span>
                  </div>
                </div>

                {/* PUSH CARD */}
                <div className="p-5 rounded-3xl border border-purple-200/80 dark:border-purple-800/60 bg-gradient-to-br from-purple-50/60 to-white dark:from-purple-950/30 dark:to-slate-850 hover:border-purple-300 dark:hover:border-purple-600 transition-all shadow-xs flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-purple-700 dark:text-purple-400">
                      <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-900/60 flex items-center justify-center font-bold">
                        <ArrowUpRight className="w-4 h-4 text-purple-700 dark:text-purple-300" />
                      </div>
                      <span className="font-black text-sm">Kirim Data (Push Sync)</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      Mengalirkan data dari aplikasi ke Google Sheet melalui Webhook Apps Script, atau salin langsung ke clipboard untuk di-paste ke Google Sheets.
                    </p>
                  </div>

                  <div className="pt-2 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={handlePush}
                        disabled={isSyncing}
                        className="py-2.5 px-3 rounded-xl bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-xs transition disabled:opacity-50"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Push Webhook</span>
                      </button>

                      <button
                        onClick={handleCopyFormattedTable}
                        className="py-2.5 px-3 rounded-xl border border-purple-300 dark:border-purple-700 bg-white dark:bg-slate-800 hover:bg-purple-50 dark:hover:bg-purple-900/40 text-purple-700 dark:text-purple-300 font-bold text-xs flex items-center justify-center space-x-1.5 transition active:scale-95"
                      >
                        {copiedTable ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedTable ? 'Tersalin!' : 'Salin Tabel'}</span>
                      </button>
                    </div>

                    <span className="block text-[10px] text-center text-slate-400 dark:text-slate-500 font-medium">
                      Salin tabel langsung tempel (Ctrl+V) di sel A1 Google Sheet
                    </span>
                  </div>
                </div>

              </div>

              {/* Download CSV Shortcut */}
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 dark:text-slate-200">Unduh Berkas CSV Format Google Sheet</span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Berkas CSV siap impor lewat menu File &gt; Import di Google Sheets.</p>
                </div>
                <a
                  href="/api/sync/export-csv"
                  download
                  className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 font-bold text-xs flex items-center space-x-1.5 shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                  <span>Download CSV</span>
                </a>
              </div>

            </div>
          )}

          {/* TAB 2: PENGATURAN KONEKSI */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveConfig} className="space-y-4">
              <div>
                <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                  URL Google Spreadsheet Target
                </label>
                <input
                  type="url"
                  value={sheetUrlInput}
                  onChange={e => setSheetUrlInput(e.target.value)}
                  placeholder="https://docs.google.com/spreadsheets/d/.../edit?gid=0"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  Pastikan spreadsheet disetel minimal <b>"Anyone with the link can view"</b> agar aplikasi bisa membaca data tanpa OAuth.
                </p>
              </div>

              <div>
                <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                  Webhook URL Google Apps Script (Opsional untuk Push Otomatis)
                </label>
                <input
                  type="url"
                  value={webhookUrlInput}
                  onChange={e => setWebhookUrlInput(e.target.value)}
                  placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  Didapatkan setelah menerapkan skrip di tab "Skrip Webhook Apps Script". Jika kosong, Anda tetap dapat melakukan Pull data dan menggunakan fitur Salin Tabel.
                </p>
              </div>

              <div>
                <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                  Interval Sinkronisasi Otomatis di Latar Belakang
                </label>
                <select
                  value={autoInterval}
                  onChange={e => setAutoInterval(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="0">Manual (Hanya saat tombol ditekan)</option>
                  <option value="15">Setiap 15 Menit</option>
                  <option value="30">Setiap 30 Menit</option>
                  <option value="60">Setiap 1 Jam</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('sync')}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center space-x-1.5 shadow-xs"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Simpan Pengaturan</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: SKRIP WEBHOOK APPS SCRIPT */}
          {activeTab === 'script' && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-black text-emerald-900 dark:text-emerald-200 flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Langkah Mudah Memasang Webhook (Cukup 1 Menit)</span>
                  </span>
                  <button
                    onClick={handleCopyScript}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center space-x-1.5 shadow-2xs transition active:scale-95"
                  >
                    {copiedScript ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedScript ? 'Skrip Tersalin!' : 'Salin Kode Skrip'}</span>
                  </button>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                  <li>Buka Google Spreadsheet target di browser.</li>
                  <li>Di menu atas, klik <b>Extensions &gt; Apps Script</b> (Ekstensi &gt; Apps Script).</li>
                  <li>Hapus kode bawaan dan tempel kode skrip di bawah ini.</li>
                  <li>Klik tombol biru <b>Deploy &gt; New deployment</b> (Penerapan baru).</li>
                  <li>Pilih jenis <b>Web app</b>, lalu set <b>Execute as: Me</b> dan <b>Who has access: Anyone</b>.</li>
                  <li>Klik Deploy, lalu salin Web App URL yang dihasilkan dan tempel di tab <b>Pengaturan Koneksi</b>.</li>
                </ol>
              </div>

              <div className="relative">
                <pre className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-100 font-mono text-[11px] overflow-x-auto max-h-64 leading-normal">
{`function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000);
    var payload = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    if (payload.action === 'sync_all' && Array.isArray(payload.rows)) {
      var rows = payload.rows;
      if (rows.length === 0) return createResponse({ status: 'error', message: 'Empty' }, 400);
      sheet.getRange(1, 1, rows.length, rows[0].length).setValues(rows);
      return createResponse({ status: 'ok', updatedRows: rows.length }, 200);
    }
    return createResponse({ status: 'error', message: 'Unknown action' }, 400);
  } catch (err) {
    return createResponse({ status: 'error', message: err.toString() }, 500);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return createResponse({ status: 'active', message: 'Competitor Intelligence Webhook Ready' }, 200);
}

function createResponse(data, statusCode) {
  var output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}`}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 4: RIWAYAT LOG */}
          {activeTab === 'history' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 dark:text-slate-200">Catatan Aktivitas Sinkronisasi Terakhir</span>
                <button
                  onClick={loadHistory}
                  disabled={isLoadingHistory}
                  className="px-2.5 py-1 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 rounded-lg text-[11px] flex items-center space-x-1"
                >
                  <RefreshCw className={`w-3 h-3 ${isLoadingHistory ? 'animate-spin' : ''}`} />
                  <span>Segarkan</span>
                </button>
              </div>

              {isLoadingHistory ? (
                <div className="p-8 text-center text-slate-400 dark:text-slate-500">Memuat catatan riwayat...</div>
              ) : historyList.length === 0 ? (
                <div className="p-8 text-center text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800">
                  Belum ada riwayat sinkronisasi tercatat.
                </div>
              ) : (
                <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900">
                  {historyList.map(h => (
                    <div key={h.id} className="p-3.5 flex items-start justify-between gap-3 text-xs hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <div className="space-y-0.5">
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                            h.action === 'PULL' ? 'bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300' : 'bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-300'
                          }`}>
                            {h.action}
                          </span>
                          <span className={`font-bold ${h.status === 'SUCCESS' ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                            {h.status}
                          </span>
                          <span className="text-slate-400 dark:text-slate-500">•</span>
                          <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">{h.recordsCount} baris</span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 font-normal">{h.details}</p>
                      </div>
                      <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500 shrink-0">{h.timestamp}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950/70 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
            <span className="font-medium">Bank BRI • Enterprise Architecture Intelligence</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
