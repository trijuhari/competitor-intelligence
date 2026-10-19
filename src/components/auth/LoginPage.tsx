import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Eye, EyeOff, AlertCircle, ArrowRight, Lock, Mail, ShieldCheck } from 'lucide-react';
import { BankLogo } from '../common/BankLogo';

const PEERS = ['mandiri', 'bca', 'bni', 'btn', 'bsi'];

export const LoginPage: React.FC = () => {
  const { login } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center relative overflow-hidden font-sans selection:bg-blue-600/30 selection:text-white">
      {/* Subtle single atmospheric glow */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/[0.07] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Sisi Kiri: Informasi Minimalis & Elegan */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="flex items-center gap-3">
              <BankLogo bankCode="bri" size={28} />
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold tracking-tight text-white">Competitor Intel</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-400 border border-slate-700/50 font-mono">
                  v1.0
                </span>
              </div>
            </div>

            <div className="space-y-4 max-w-xl">
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-white leading-[1.2]">
                Benchmark Arsitektur Teknologi Perbankan Nasional
              </h1>
              <p className="text-sm sm:text-[15px] text-slate-400 leading-relaxed font-normal">
                Platform intelijen komparatif berbasis bukti nyata. Memetakan kesiapan teknologi Bank BRI terhadap Himbara dan BCA di 13 domain arsitektur strategis.
              </p>
            </div>

            {/* Metrik Minimalis dengan Hairline Divider */}
            <div className="grid grid-cols-3 gap-6 pt-2 max-w-lg border-t border-slate-800/80">
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight">408</div>
                <div className="text-xs text-slate-400">Kapabilitas</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight">13</div>
                <div className="text-xs text-slate-400">Domain Arsitektur</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight">6</div>
                <div className="text-xs text-slate-400">Bank Pembanding</div>
              </div>
            </div>

            {/* Logo Bank Pembanding Bersih */}
            <div className="pt-2 space-y-3">
              <span className="text-xs text-slate-400 font-medium tracking-wide">Lanskap Pembanding</span>
              <div className="flex items-center gap-2.5">
                {PEERS.map(p => (
                  <div 
                    key={p} 
                    className="p-2 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
                  >
                    <BankLogo bankCode={p} size={22} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sisi Kanan: Kartu Form Login Minimalis Modern */}
          <div className="lg:col-span-5 w-full max-w-md mx-auto">
            <div className="rounded-2xl bg-slate-900/70 border border-slate-800/90 backdrop-blur-xl p-8 sm:p-10 shadow-xl shadow-black/40 text-left space-y-6">
              
              <div className="space-y-1.5">
                <h2 className="text-xl font-semibold text-white tracking-tight">Masuk ke Akun</h2>
                <p className="text-xs text-slate-400">
                  Masukkan email dan kata sandi Anda untuk melanjutkan.
                </p>
              </div>

              {errorMessage && (
                <div role="alert" className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-center gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="login-email" className="block text-xs font-medium text-slate-300">
                    Email
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
                      className="w-full h-10 pl-10 pr-3.5 rounded-lg bg-slate-950/80 border border-slate-800 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="login-password" className="block text-xs font-medium text-slate-300">
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
                      className="w-full h-10 pl-10 pr-10 rounded-lg bg-slate-950/80 border border-slate-800 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-300 transition-colors"
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
                  className="w-full h-10 mt-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
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
                      <span>Masuk</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="pt-2 border-t border-slate-800/60 flex items-center justify-center gap-1.5 text-xs text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                <span>Koneksi terenkripsi aman</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
