// Vercel Serverless Function: Push Capabilities to Google Apps Script Webhook
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { webhookUrl, userName = 'Admin', items = [] } = req.body || {};

    if (!webhookUrl || !webhookUrl.trim()) {
      return res.status(200).json({
        success: false,
        requiresWebhook: true,
        message: 'Webhook Apps Script belum dikonfigurasi. Silakan pasang Webhook di tab Pengaturan.'
      });
    }

    const payload = {
      action: 'sync_all',
      source: 'Competitor Intelligence App (Vercel)',
      user: userName,
      timestamp: new Date().toISOString(),
      items: items
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      return res.status(502).json({ error: `Gagal mengirim ke Webhook Apps Script (HTTP ${response.status})` });
    }

    const result = await response.json().catch(() => ({}));
    return res.status(200).json({
      success: true,
      summary: `Berhasil mengirim pembaruan data ke Google Sheets via Vercel (${result.updatedRows || 'semua'} baris)`
    });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Gagal memproses pengiriman ke Google Sheets' });
  }
}
