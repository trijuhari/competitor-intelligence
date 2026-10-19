import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Eye, EyeOff, AlertCircle, ArrowRight, Lock, Mail, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { BankLogo } from '../common/BankLogo';

const PEERS = ['mandiri', 'bca', 'bni', 'btn', 'bsi'];

export const LoginPage: React.FC = () => {
  const { login } = useApp();

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

  const handleQuickLogin = async (quickEmail: string, quickPass: string) => {
    setEmail(quickEmail);
    setPassword(quickPass);
    setErrorMessage('');
    setLoading(true);
    const result = await login(quickEmail, quickPass);
    setLoading(false);
    if (!result.success) {
      setErrorMessage(result.error || 'Gagal masuk akun.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center relative overflow-hidden font-sans selection:bg-blue-600/30 selection:text-white">
      {/* Background glowing mesh */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/[0.08] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-sky-600/[0.05] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Sisi Kiri: Informasi Minimalis & Elegan */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="flex items-center gap-3">
              <BankLogo bankCode="bri" size={32} />
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold tracking-tight text-white font-heading">Bank BRI Competitor Intel</span>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 font-mono font-bold">
                  v2.5 Enterprise
                </span>
              </div>
            </div>

            <div className="space-y-4 max-w-xl">
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-white leading-[1.15] font-heading">
                Benchmark Arsitektur Teknologi Perbankan Nasional
              </h1>
              <p className="text-sm sm:text-[15px] text-slate-400 leading-relaxed font-normal">
                Platform intelijen komparatif berbasis bukti empiris terverifikasi. Memetakan kesiapan dan keunggulan teknologi Bank BRI terhadap Himbara dan BCA di 13 domain arsitektur strategis.
              </p>
            </div>

            {/* Metrik Minimalis dengan Hairline Divider */}
            <div className="grid grid-cols-3 gap-6 pt-2 max-w-lg border-t border-slate-800/80">
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">408</div>
                <div className="text-xs text-slate-400">Kapabilitas</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">13</div>
                <div className="text-xs text-slate-400">Domain Arsitektur</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">6</div>
                <div className="text-xs text-slate-400">Bank Pembanding</div>
              </div>
            </div>

            {/* Logo Bank Pembanding */}
            <div className="pt-2 space-y-3">
              <span className="text-xs text-slate-400 font-medium tracking-wide">Lanskap 6 Bank Nasional</span>
              <div className="flex items-center gap-2.5 flex-wrap">
                <div className="p-2 rounded-xl bg-blue-950/60 border border-blue-700/60 shadow-glow-blue">
                  <BankLogo bankCode="bri" size={24} />
                </div>
                {PEERS.map(p => (
                  <div 
                    key={p} 
                    className="p-2 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
                  >
                    <BankLogo bankCode={p} size={24} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sisi Kanan: Kartu Form Login Minimalis Modern */}
          <div className="lg:col-span-5 w-full max-w-md mx-auto">
            <div className="rounded-3xl bg-slate-900/85 border border-slate-800/90 backdrop-blur-2xl p-8 sm:p-9 shadow-2xl shadow-black/60 text-left space-y-5 relative">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-white tracking-tight font-heading">Masuk ke Portal</h2>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
                <p className="text-xs text-slate-400">
                  Gunakan kredensial intelijen Anda atau pilih akses cepat demo di bawah.
                </p>
              </div>

              {errorMessage && (
                <div role="alert" className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="login-email" className="block text-xs font-semibold text-slate-300">
                    Email Intelijen
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
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
                      className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="login-password" className="block text-xs font-semibold text-slate-300">
                    Kata Sandi
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
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
                      className="w-full h-11 pl-10 pr-10 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-300 transition-colors cursor-pointer"
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
                  className="w-full h-11 mt-1 rounded-xl bg-gradient-to-r from-blue-600 via-sky-600 to-blue-500 hover:from-blue-500 hover:to-sky-500 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-glow-blue active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      <span>Memverifikasi…</span>
                    </span>
                  ) : (
                    <>
                      <span>Masuk ke Dashboard</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* 1-Click Quick Demo Login */}
              <div className="pt-4 border-t border-slate-800/80 space-y-2.5">
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold">
                  <span className="flex items-center gap-1 text-sky-400">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Akses Cepat 1-Klik:</span>
                  </span>
                  <span className="text-slate-500 font-mono text-[10px]">Klik untuk login instan</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('admin@intel.com', 'admin123')}
                    className="p-2 rounded-xl bg-slate-800/70 hover:bg-blue-600/20 border border-slate-700/80 hover:border-blue-500/50 text-left transition-all group cursor-pointer"
                  >
                    <div className="text-[11px] font-bold text-slate-200 group-hover:text-blue-400">Admin</div>
                    <div className="text-[9px] text-slate-500 font-mono truncate">admin@intel.com</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickLogin('analyst@intel.com', 'analyst123')}
                    className="p-2 rounded-xl bg-slate-800/70 hover:bg-blue-600/20 border border-slate-700/80 hover:border-blue-500/50 text-left transition-all group cursor-pointer"
                  >
                    <div className="text-[11px] font-bold text-slate-200 group-hover:text-blue-400">Analyst</div>
                    <div className="text-[9px] text-slate-500 font-mono truncate">analyst@intel.com</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickLogin('executive@intel.com', 'exec123')}
                    className="p-2 rounded-xl bg-slate-800/70 hover:bg-blue-600/20 border border-slate-700/80 hover:border-blue-500/50 text-left transition-all group cursor-pointer"
                  >
                    <div className="text-[11px] font-bold text-slate-200 group-hover:text-blue-400">Executive</div>
                    <div className="text-[9px] text-slate-500 font-mono truncate">executive@intel.com</div>
                  </button>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/60 flex items-center justify-center gap-1.5 text-xs text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Koneksi terenkripsi & sesi diaudit penuh</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
