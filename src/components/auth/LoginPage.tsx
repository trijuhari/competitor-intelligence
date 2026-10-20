import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Eye, EyeOff, AlertCircle, ArrowRight, Lock, Mail, ShieldCheck, Moon, Sun, RefreshCw } from 'lucide-react';
import { BankLogo } from '../common/BankLogo';

const PEERS = ['mandiri', 'bca', 'bni', 'btn', 'bsi'];

export const LoginPage: React.FC = () => {
  const { login, theme, toggleTheme, researchItems, banks, isSyncing, syncStatus } = useApp();

  const totalCapabilities = researchItems.length || 408;
  const totalDomains = useMemo(() => {
    const set = new Set(researchItems.map(i => i.domain).filter(Boolean));
    return set.size || 13;
  }, [researchItems]);
  const totalBanks = banks.length || 6;
  const peerBanks = useMemo(() => {
    const peers = banks
      .filter(b => b.id !== 'bank-bri')
      .map(b => b.singkatan.toLowerCase());
    return peers.length > 0 ? peers : PEERS;
  }, [banks]);

  const [email, setEmail] = useState('admin@intel.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (!result.success) {
      setErrorMessage(result.error || 'Email atau kata sandi tidak valid.');
    }
  };

  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col justify-center relative font-sans transition-colors selection:bg-accent/20 selection:text-ink">
      {/* Top Bar with Brand & Theme Toggle */}
      <div className="absolute top-0 left-0 right-0 h-16 px-6 sm:px-10 flex items-center justify-between border-b border-line bg-surface/80">
        <div className="flex items-center gap-3">
          <BankLogo bankCode="bri" size={28} />
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold tracking-tight text-ink">Competitor Intel</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20 font-mono font-bold">
              BRI vs Himbara &amp; BCA
            </span>
          </div>
        </div>

        <button
          onClick={toggleTheme}
          aria-label="Ganti mode tampilan"
          title={theme === 'dark' ? 'Beralih ke mode terang' : 'Beralih ke mode gelap'}
          className="p-2 rounded-xl border border-line bg-surface hover:bg-sunken text-muted hover:text-ink transition-colors cursor-pointer flex items-center gap-2 text-xs font-semibold shadow-xs"
        >
          {theme === 'dark' ? (
            <>
              <Sun className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Mode Terang</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-slate-700" />
              <span className="hidden sm:inline">Mode Gelap</span>
            </>
          )}
        </button>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Sisi Kiri: Informasi Strategis & Benchmark */}
          <div className="lg:col-span-7 space-y-7 text-left">
            <div className="space-y-3.5 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span>Portal Resmi Riset Arsitektur Perbankan</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-ink leading-[1.18]">
                Benchmark Arsitektur Teknologi Perbankan Nasional
              </h1>
              <p className="text-sm sm:text-[15px] text-muted leading-relaxed font-normal">
                Platform intelijen komparatif berbasis bukti empiris terverifikasi. Memetakan kesiapan, adopsi, dan keunggulan teknologi Bank BRI terhadap Himbara dan BCA di {totalDomains} domain arsitektur strategis.
              </p>
            </div>

            {/* Metrik Solid dengan High Contrast */}
            <div className="grid grid-cols-3 gap-4 pt-2 max-w-lg border-t border-line">
              <div className="p-3.5 rounded-xl bg-surface border border-line shadow-card transition-all hover:border-line-strong">
                <div className="flex items-center gap-2">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-ink tracking-tight">
                    {totalCapabilities}
                  </span>
                  {isSyncing && (
                    <span title="Menyinkronkan data live Google Sheets...">
                      <RefreshCw className="w-3.5 h-3.5 text-accent animate-spin" />
                    </span>
                  )}
                </div>
                <div className="text-xs font-medium text-muted mt-0.5">Kapabilitas</div>
              </div>
              <div className="p-3.5 rounded-xl bg-surface border border-line shadow-card transition-all hover:border-line-strong">
                <div className="text-2xl sm:text-3xl font-black font-mono text-ink tracking-tight">
                  {totalDomains}
                </div>
                <div className="text-xs font-medium text-muted mt-0.5">Domain Arsitektur</div>
              </div>
              <div className="p-3.5 rounded-xl bg-surface border border-line shadow-card transition-all hover:border-line-strong">
                <div className="text-2xl sm:text-3xl font-black font-mono text-ink tracking-tight">
                  {totalBanks}
                </div>
                <div className="text-xs font-medium text-muted mt-0.5">Bank Pembanding</div>
              </div>
            </div>

            {/* Logo Bank Pembanding */}
            <div className="pt-1 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted font-semibold tracking-wide uppercase">
                  Lanskap {totalBanks} Bank Nasional
                </span>
                {syncStatus?.last_sync_time && (
                  <span className="text-[11px] text-muted flex items-center gap-1.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Terhubung Google Sheets</span>
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="p-2.5 rounded-xl bg-surface border-2 border-accent shadow-sm" title="Bank BRI (Fokus)">
                  <BankLogo bankCode="bri" size={26} />
                </div>
                {peerBanks.map(p => (
                  <div 
                    key={p} 
                    className="p-2.5 rounded-xl bg-surface border border-line hover:border-line-strong transition-colors shadow-xs"
                    title={p.toUpperCase()}
                  >
                    <BankLogo bankCode={p} size={26} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sisi Kanan: Kartu Form Login Solid & Clean */}
          <div className="lg:col-span-5 w-full max-w-md mx-auto">
            <div className="rounded-2xl bg-surface border border-line p-7 sm:p-8 shadow-card text-left space-y-6">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-ink tracking-tight">Masuk Administrator</h2>
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-accent/10 text-accent border border-accent/20">
                    Admin Portal
                  </span>
                </div>
                <p className="text-xs text-muted leading-relaxed">
                  Masukkan kredensial Administrator terotorisasi untuk mengakses dashboard analitik intelijen.
                </p>
              </div>

              {errorMessage && (
                <div role="alert" className="p-3 rounded-xl bg-danger/10 border border-danger/30 text-danger text-xs flex items-center gap-2.5 font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0 text-danger" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="login-email" className="block text-xs font-semibold text-ink">
                    Email Administrator
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-subtle">
                      <Mail className="w-4 h-4" />
                    </span>
                    <input
                      id="login-email"
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="admin@intel.com"
                      autoComplete="email"
                      required
                      className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-sunken/40 focus:bg-surface border border-line text-sm text-ink placeholder:text-subtle focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="login-password" className="block text-xs font-semibold text-ink">
                    Kata Sandi
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-subtle">
                      <Lock className="w-4 h-4" />
                    </span>
                    <input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      autoComplete="current-password"
                      required
                      className="w-full h-11 pl-10 pr-10 rounded-xl bg-sunken/40 focus:bg-surface border border-line text-sm text-ink placeholder:text-subtle focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-subtle hover:text-ink transition-colors cursor-pointer"
                      aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  id="login-submit"
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 mt-2 rounded-xl bg-accent hover:bg-accent/90 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      <span>Memverifikasi Otorisasi…</span>
                    </span>
                  ) : (
                    <>
                      <span>Masuk ke Dashboard</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="pt-3 border-t border-line flex items-center justify-center gap-1.5 text-xs text-muted font-medium">
                <ShieldCheck className="w-4 h-4 text-ok" />
                <span>Koneksi terenkripsi · Akses terotorisasi Administrator</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
