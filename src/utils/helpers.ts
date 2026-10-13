import { ConfidenceLevel, ReviewStatus } from '../types';

export const getConfidenceBadge = (confidence: ConfidenceLevel) => {
  switch (confidence) {
    case 'Confirmed':
      return {
        label: 'Confirmed',
        symbol: '✓',
        bgColor: 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-700',
        dotColor: 'bg-emerald-500',
        description: 'Terkonfirmasi sumber resmi (studi kasus vendor, tech talk, laporan resmi, atau ≥2 narasumber wawancara).'
      };
    case 'Likely':
      return {
        label: 'Likely',
        symbol: '~',
        bgColor: 'bg-blue-50 text-blue-700 border-blue-300 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-700',
        dotColor: 'bg-blue-500',
        description: 'Kuat terindikasi (≥2 sumber tidak langsung atau 1 narasumber wawancara internal).'
      };
    case 'Indicative':
      return {
        label: 'Indicative',
        symbol: '?',
        bgColor: 'bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-700',
        dotColor: 'bg-amber-500',
        description: 'Indikatif awal (1 sumber tidak langsung, seperti lowongan kerja atau deteksi jejak web).'
      };
    default:
      return {
        label: 'Tidak Terdeteksi',
        symbol: '–',
        bgColor: 'bg-slate-100 text-slate-400 border-slate-200 dark:bg-slate-800 dark:text-slate-500 dark:border-slate-700',
        dotColor: 'bg-slate-400',
        description: 'Belum ditemukan bukti kredibel terkait adopsi teknologi ini.'
      };
  }
};

export const getReviewStatusBadge = (status: ReviewStatus) => {
  switch (status) {
    case 'Published':
      return {
        label: 'Published',
        bgColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      };
    case 'Reviewed':
      return {
        label: 'Reviewed',
        bgColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
      };
    case 'Draft':
      return {
        label: 'Draft',
        bgColor: 'bg-slate-100 text-slate-700 border-slate-300',
      };
  }
};
