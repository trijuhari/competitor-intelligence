// Vercel Serverless Function: Get Sync Status
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  res.status(200).json({
    sheet_url: 'https://docs.google.com/spreadsheets/d/1L0WBGmZVrzIHOojtZjYSeSEEggNsMPOG9AhQQj0-PoY/edit?gid=0#gid=0',
    auto_sync: '1',
    auto_sync_interval: '15',
    apps_script_url: '',
    last_sync_time: new Date().toISOString(),
    last_sync_status: 'Siap (Vercel Serverless Sync)',
    last_sync_summary: 'Cloud Sync Vercel Siap',
    totalCapabilities: 409,
    totalEntries: 2454
  });
}
