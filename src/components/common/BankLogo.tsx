import React from 'react';

export interface BankLogoProps {
  bankCode: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  className?: string;
  withContainer?: boolean;
}

export const BankLogo: React.FC<BankLogoProps> = ({
  bankCode,
  size = 'md',
  className = '',
  withContainer = false
}) => {
  const code = (bankCode || '').toLowerCase().trim();

  // Determine pixel dimensions
  let dim = 32;
  if (typeof size === 'number') {
    dim = size;
  } else {
    switch (size) {
      case 'xs': dim = 18; break;
      case 'sm': dim = 24; break;
      case 'md': dim = 32; break;
      case 'lg': dim = 48; break;
      case 'xl': dim = 64; break;
    }
  }

  // 1. BANK BRI (Signature Blue #00529C & Vibrant Orange #F58220)
  if (code === 'bri' || code.includes('rakyat indonesia')) {
    return (
      <div 
        className={`inline-flex items-center justify-center shrink-0 rounded-xl select-none ${withContainer ? 'p-1.5 bg-white shadow-xs border border-slate-200/60' : ''} ${className}`}
        style={{ width: dim, height: dim }}
        title="PT Bank Rakyat Indonesia (Persero) Tbk"
      >
        <svg viewBox="0 0 100 100" width="100%" height="100%" className="overflow-visible">
          <defs>
            <linearGradient id="briGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#003875" />
              <stop offset="60%" stopColor="#00529C" />
              <stop offset="100%" stopColor="#0072CE" />
            </linearGradient>
            <linearGradient id="briOrange" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF9E1B" />
              <stop offset="100%" stopColor="#F58220" />
            </linearGradient>
          </defs>
          {/* Rounded Squircle Container */}
          <rect width="100" height="100" rx="24" fill="url(#briGrad)" />
          {/* BRI Diamond Motif */}
          <path d="M50 14 L62 26 L50 38 L38 26 Z" fill="white" opacity="0.9" />
          <path d="M68 28 L78 38 L68 48 L58 38 Z" fill="url(#briOrange)" />
          {/* Bold White BRI Typography */}
          <text 
            x="50" 
            y="74" 
            textAnchor="middle" 
            fill="#FFFFFF" 
            fontFamily="system-ui, -apple-system, sans-serif" 
            fontWeight="900" 
            fontSize="32" 
            letterSpacing="-1"
          >
            BRI
          </text>
        </svg>
      </div>
    );
  }

  // 2. BANK MANDIRI (Midnight Blue #0A3B74 & Golden Ribbon #FDB813)
  if (code === 'mandiri') {
    return (
      <div 
        className={`inline-flex items-center justify-center shrink-0 rounded-xl select-none ${withContainer ? 'p-1.5 bg-white shadow-xs border border-slate-200/60' : ''} ${className}`}
        style={{ width: dim, height: dim }}
        title="PT Bank Mandiri (Persero) Tbk"
      >
        <svg viewBox="0 0 100 100" width="100%" height="100%" className="overflow-visible">
          <defs>
            <linearGradient id="mandiriGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#001F3F" />
              <stop offset="100%" stopColor="#0A3B74" />
            </linearGradient>
            <linearGradient id="mandiriGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE066" />
              <stop offset="100%" stopColor="#FDB813" />
            </linearGradient>
          </defs>
          {/* Rounded Squircle Container */}
          <rect width="100" height="100" rx="24" fill="url(#mandiriGrad)" />
          {/* The Iconic Golden Ribbon Wave */}
          <path 
            d="M20 38 C32 24, 60 22, 80 34 C64 28, 42 32, 28 44 Z" 
            fill="url(#mandiriGold)" 
          />
          <path 
            d="M36 43 C52 33, 68 34, 82 46 C68 40, 52 40, 38 48 Z" 
            fill="url(#mandiriGold)" 
            opacity="0.8"
          />
          {/* Clean Mandiri Wordmark */}
          <text 
            x="50" 
            y="72" 
            textAnchor="middle" 
            fill="#FFFFFF" 
            fontFamily="system-ui, -apple-system, sans-serif" 
            fontWeight="800" 
            fontSize="18" 
            letterSpacing="-0.5"
          >
            mandiri
          </text>
        </svg>
      </div>
    );
  }

  // 3. BANK BCA (Royal Blue #003882 & Signature Interlocking Rhombus Emblem)
  if (code === 'bca' || code.includes('central asia')) {
    return (
      <div 
        className={`inline-flex items-center justify-center shrink-0 rounded-xl select-none ${withContainer ? 'p-1.5 bg-white shadow-xs border border-slate-200/60' : ''} ${className}`}
        style={{ width: dim, height: dim }}
        title="PT Bank Central Asia Tbk (BCA)"
      >
        <svg viewBox="0 0 100 100" width="100%" height="100%" className="overflow-visible">
          <defs>
            <linearGradient id="bcaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#002466" />
              <stop offset="100%" stopColor="#005BAC" />
            </linearGradient>
          </defs>
          {/* Rounded Squircle Container */}
          <rect width="100" height="100" rx="24" fill="url(#bcaGrad)" />
          {/* Iconic BCA Stylized Diamond Crest */}
          <g transform="translate(50, 36) scale(0.68)">
            {/* Left Diamond Wing */}
            <polygon points="-28,0 -14,-14 0,0 -14,14" fill="#FFFFFF" opacity="0.95" />
            {/* Right Diamond Wing */}
            <polygon points="28,0 14,-14 0,0 14,14" fill="#FFFFFF" opacity="0.95" />
            {/* Central Diamond Core */}
            <circle cx="0" cy="0" r="7" fill="#00A3E0" />
            <polygon points="-6,-6 6,-6 6,6 -6,6" fill="#ED1C24" transform="rotate(45)" />
          </g>
          {/* Bold BCA Typography */}
          <text 
            x="50" 
            y="76" 
            textAnchor="middle" 
            fill="#FFFFFF" 
            fontFamily="system-ui, -apple-system, sans-serif" 
            fontWeight="900" 
            fontSize="26" 
            letterSpacing="1"
          >
            BCA
          </text>
        </svg>
      </div>
    );
  }

  // 4. BANK BNI (Dark Turquoise #005E5D & Iconic Orange 46 Sail #F15A24)
  if (code === 'bni' || code.includes('negara indonesia')) {
    return (
      <div 
        className={`inline-flex items-center justify-center shrink-0 rounded-xl select-none ${withContainer ? 'p-1.5 bg-white shadow-xs border border-slate-200/60' : ''} ${className}`}
        style={{ width: dim, height: dim }}
        title="PT Bank Negara Indonesia (Persero) Tbk (BNI)"
      >
        <svg viewBox="0 0 100 100" width="100%" height="100%" className="overflow-visible">
          <defs>
            <linearGradient id="bniGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#004645" />
              <stop offset="100%" stopColor="#005E5D" />
            </linearGradient>
            <linearGradient id="bniOrange" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF7A3D" />
              <stop offset="100%" stopColor="#F15A24" />
            </linearGradient>
          </defs>
          {/* Rounded Squircle Container */}
          <rect width="100" height="100" rx="24" fill="url(#bniGrad)" />
          {/* Iconic BNI 46 Sail Symbol */}
          <g transform="translate(50, 34) scale(0.75)">
            <path d="M-12,-18 C-4,-14 6,-4 10,12 C5,10 -3,8 -10,12 C-8,4 -10,-8 -12,-18 Z" fill="url(#bniOrange)" />
            <circle cx="12" cy="-6" r="5" fill="#FFE359" />
          </g>
          {/* Bold BNI Typography */}
          <text 
            x="50" 
            y="75" 
            textAnchor="middle" 
            fill="#FFFFFF" 
            fontFamily="system-ui, -apple-system, sans-serif" 
            fontWeight="900" 
            fontSize="26" 
            letterSpacing="-0.5"
          >
            BNI
          </text>
        </svg>
      </div>
    );
  }

  // 5. BANK BTN (Navy Blue #003366 & Architectural Red Arch #ED1C24)
  if (code === 'btn' || code.includes('tabungan negara')) {
    return (
      <div 
        className={`inline-flex items-center justify-center shrink-0 rounded-xl select-none ${withContainer ? 'p-1.5 bg-white shadow-xs border border-slate-200/60' : ''} ${className}`}
        style={{ width: dim, height: dim }}
        title="PT Bank Tabungan Negara (Persero) Tbk (BTN)"
      >
        <svg viewBox="0 0 100 100" width="100%" height="100%" className="overflow-visible">
          <defs>
            <linearGradient id="btnGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#001D3D" />
              <stop offset="100%" stopColor="#003366" />
            </linearGradient>
            <linearGradient id="btnRed" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF4136" />
              <stop offset="100%" stopColor="#ED1C24" />
            </linearGradient>
          </defs>
          {/* Rounded Squircle Container */}
          <rect width="100" height="100" rx="24" fill="url(#btnGrad)" />
          {/* Architectural House / Roof Arch Accent */}
          <path 
            d="M32 38 L50 22 L68 38 L62 38 L50 28 L38 38 Z" 
            fill="url(#btnRed)" 
          />
          <circle cx="50" cy="38" r="4" fill="#C5A059" />
          {/* Bold BTN Typography */}
          <text 
            x="50" 
            y="74" 
            textAnchor="middle" 
            fill="#FFFFFF" 
            fontFamily="system-ui, -apple-system, sans-serif" 
            fontWeight="900" 
            fontSize="28" 
            letterSpacing="-0.5"
          >
            BTN
          </text>
        </svg>
      </div>
    );
  }

  // 6. BANK BSI (Bank Syariah Indonesia - Islamic Teal #00A39D & Golden Star #FFB81C)
  if (code === 'bsi' || code.includes('syariah indonesia')) {
    return (
      <div 
        className={`inline-flex items-center justify-center shrink-0 rounded-xl select-none ${withContainer ? 'p-1.5 bg-white shadow-xs border border-slate-200/60' : ''} ${className}`}
        style={{ width: dim, height: dim }}
        title="PT Bank Syariah Indonesia Tbk (BSI)"
      >
        <svg viewBox="0 0 100 100" width="100%" height="100%" className="overflow-visible">
          <defs>
            <linearGradient id="bsiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#005B57" />
              <stop offset="100%" stopColor="#00A39D" />
            </linearGradient>
            <linearGradient id="bsiGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE066" />
              <stop offset="100%" stopColor="#FFB81C" />
            </linearGradient>
          </defs>
          {/* Rounded Squircle Container */}
          <rect width="100" height="100" rx="24" fill="url(#bsiGrad)" />
          {/* 8-Point Islamic Star (Octagram / Rub el Hizb) */}
          <g transform="translate(50, 35) scale(0.65)">
            <rect x="-14" y="-14" width="28" height="28" fill="url(#bsiGold)" rx="2" />
            <rect x="-14" y="-14" width="28" height="28" fill="url(#bsiGold)" rx="2" transform="rotate(45)" />
            <circle cx="0" cy="0" r="6" fill="#005B57" />
            <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
          </g>
          {/* Bold BSI Typography */}
          <text 
            x="50" 
            y="74" 
            textAnchor="middle" 
            fill="#FFFFFF" 
            fontFamily="system-ui, -apple-system, sans-serif" 
            fontWeight="900" 
            fontSize="28" 
            letterSpacing="-0.5"
          >
            BSI
          </text>
        </svg>
      </div>
    );
  }

  // Fallback generic bank badge
  return (
    <div 
      className={`inline-flex items-center justify-center shrink-0 rounded-xl bg-slate-800 text-white font-black text-xs ${className}`}
      style={{ width: dim, height: dim }}
    >
      <span>🏦</span>
    </div>
  );
};
