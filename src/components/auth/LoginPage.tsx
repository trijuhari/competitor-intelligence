import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Eye, EyeOff, AlertCircle, ArrowRight, ShieldCheck, 
  Layers, Database, Sparkles, Lock, Mail, CheckCircle2,
  Cpu, Building2
} from 'lucide-react';
import { BankLogo } from '../common/BankLogo';

const PEERS = [
  { code: 'bri', name: 'Bank BRI', tag: 'Target Analisis' },
  { code: 'mandiri', name: 'Bank Mandiri', tag: 'Himbara' },
  { code: 'bca', name: 'BCA', tag: 'Swasta' },
  { code: 'bni', name: 'BNI', tag: 'Himbara' },
  { code: 'btn', name: 'BTN', tag: 'Himbara' },
  { code: 'bsi', name: 'BSI', tag: 'Syariah' }
];

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
      setErrorMessage(result.error || 'Email atau password salah.');
    }
  };

  const handleQuickLogin = (quickEmail: string, quickPass: string) => {
    setEmail(quickEmail);
    setPassword(quickPass);
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center relative overflow-hidden selection:bg-blue-500/30 selection:text-blue-200">
      {/* Ambient background glow effects */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Tech grid background pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Intelligence Showcase & Value Proposition */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Brand Header */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                </span>
                <span>ENTERPRISE BENCHMARK INTELLIGENCE</span>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <div className="p-2.5 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-lg shadow-blue-500/20 border border-blue-400/30">
                  <Cpu className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                    Competitor Intel
                    <span className="text-xs px-2 py-0.5 rounded-md bg-white/10 text-slate-300 font-mono font-medium">v1.0</span>
                  </h2>
                  <p className="text-xs text-slate-400">Arsitektur Teknologi Perbankan Nasional</p>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
                Peta Kekuatan Tech Stack <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300">
                  BRI vs Himbara &amp; BCA
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl">
                Cockpit intelijen komparasi teknologi perbankan Indonesia berbasis bukti nyata. 
                Memetakan 408 kapabilitas di 13 domain arsitektur enterprise untuk mendukung keputusan modernisasi strategis.
              </p>
            </div>

            {/* 3 Elevated Glass Stat Cards */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-xl">
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md hover:border-slate-700/80 transition-all group">
                <div className="flex items-center justify-between mb-2">
                  <Layers className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Katalog</span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight">408</div>
                <p className="text-xs text-slate-400 mt-0.5">Kapabilitas Sistem</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md hover:border-slate-700/80 transition-all group">
                <div className="flex items-center justify-between mb-2">
                  <Database className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Topologi</span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight">13</div>
                <p className="text-xs text-slate-400 mt-0.5">Domain Arsitektur</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md hover:border-slate-700/80 transition-all group">
                <div className="flex items-center justify-between mb-2">
                  <Building2 className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Benchmark</span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight">6</div>
                <p className="text-xs text-slate-400 mt-0.5">Bank Terverifikasi</p>
              </div>
            </div>

            {/* Benchmark Bank Logos Strip */}
            <div className="pt-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>6 Bank dalam Radar Komparasi:</span>
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                {PEERS.map(peer => (
                  <div 
                    key={peer.code}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/60 transition-all shadow-sm"
                  >
                    <BankLogo bankCode={peer.code} size={22} />
                    <div className="text-left">
                      <div className="text-xs font-semibold text-slate-200 leading-tight">{peer.name}</div>
                      <div className="text-[10px] text-slate-400 leading-none">{peer.tag}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Glassmorphic Login Form Card */}
          <div className="lg:col-span-5 w-full max-w-md mx-auto">
            <div className="relative">
              {/* Card Outer Glow Ring */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-blue-500/20 via-indigo-500/10 to-transparent blur-xl opacity-80" />

              <div className="relative rounded-3xl bg-slate-900/85 border border-slate-800/90 backdrop-blur-2xl p-7 sm:p-9 shadow-2xl shadow-black/80 space-y-6">
                
                {/* Form Header */}
                <div className="space-y-1.5 text-left">
                  <h3 className="text-2xl font-bold text-white tracking-tight">Portal Masuk</h3>
                  <p className="text-xs text-slate-400">
                    Gunakan kredensial terdaftar untuk mengakses cockpit analisis.
                  </p>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div role="alert" className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start gap-2.5 animate-shake">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                    <span className="leading-relaxed">{errorMessage}</span>
                  </div>
                )}

                {/* Main Login Form */}
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  {/* Email Field */}
                  <div className="space-y-1.5">
                    <label htmlFor="login-email" className="block text-xs font-semibold text-slate-300">
                      Email Akun
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
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
                        className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-1.5">
                    <label htmlFor="login-password" className="block text-xs font-semibold text-slate-300">
                      Kata Sandi
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
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
                        className="w-full h-11 pl-10 pr-11 rounded-xl bg-slate-950/70 border border-slate-800 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-slate-300 transition-colors"
                        aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    id="login-submit"
                    type="submit"
                    disabled={loading}
                    className="w-full h-11 mt-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                  >
                    {loading ? (
                      <span className="inline-flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        <span>Memverifikasi...</span>
                      </span>
                    ) : (
                      <>
                        <span>Masuk ke Cockpit</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                {/* 1-Click Quick Access Pills for Reviewer */}
                <div className="pt-2 border-t border-slate-800/80 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-semibold uppercase tracking-wider text-slate-400">Akses Cepat Demo:</span>
                    <span className="text-[10px] text-slate-400">Klik untuk isi otomatis</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => handleQuickLogin('admin@intel.com', 'admin123')}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-blue-500/50 text-[11px] font-medium text-slate-300 hover:text-white transition-all text-center truncate"
                      title="admin@intel.com / admin123"
                    >
                      👨‍💼 Admin
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickLogin('analyst@intel.com', 'analyst123')}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-blue-500/50 text-[11px] font-medium text-slate-300 hover:text-white transition-all text-center truncate"
                      title="analyst@intel.com / analyst123"
                    >
                      📊 Analyst
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickLogin('executive@intel.com', 'exec123')}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-blue-500/50 text-[11px] font-medium text-slate-300 hover:text-white transition-all text-center truncate"
                      title="executive@intel.com / exec123"
                    >
                      👔 Executive
                    </button>
                  </div>
                </div>

                {/* Security Footnote */}
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  <span>256-bit Encrypted Session · ISO 27001 Ready</span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
