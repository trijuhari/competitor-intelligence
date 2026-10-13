import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Lock, Mail, ArrowRight, ShieldCheck, Eye, EyeOff, AlertCircle, 
  CheckCircle2, KeyRound, Sparkles, Building2, User
} from 'lucide-react';

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

  const handleQuickLogin = (roleEmail: string, rolePass: string) => {
    setEmail(roleEmail);
    setPassword(rolePass);
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex flex-col justify-center items-center p-4 selection:bg-blue-500 selection:text-white">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-4xl relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Brand & Context */}
        <div className="lg:col-span-5 text-white space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span>Sistem Benchmark Himbara v1.0</span>
          </div>

          <div className="space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-3xl font-bold shadow-xl shadow-blue-500/20 mx-auto lg:mx-0">
              🏦
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white">
              BRI Competitor <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-orange-400">
                Intelligence Platform
              </span>
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Platform benchmarking arsitektur dan kapabilitas teknologi Bank BRI terhadap Mandiri, BNI, BTN, dan BSI di 11 domain perbankan.
            </p>
          </div>

          <div className="space-y-3 pt-2 text-xs text-slate-400">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Multi-Role Access Control (Admin, Analyst, Executive)</span>
            </div>
            <div className="flex items-center space-x-2">
              <Lock className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Pemisahan URL & hak akses direktori per peran kerja</span>
            </div>
            <div className="flex items-center space-x-2">
              <KeyRound className="w-4 h-4 text-orange-400 shrink-0" />
              <span>Penyimpanan relasional SQLite & enkripsi sesi lokal</span>
            </div>
          </div>
        </div>

        {/* Right Side: Login Card */}
        <div className="lg:col-span-7 bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-bold text-slate-900">
              Masuk ke Akun Anda
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Silakan login sesuai peran wewenang Anda untuk membuka zona URL yang sesuai.
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start space-x-2.5 animate-shake">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-bold mb-1.5">
                Alamat Email BRI / Konsultan
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@bri.co.id / analyst@bri.co.id"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1.5">
                Kata Sandi (Password)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/25 transition active:scale-[0.99] disabled:opacity-50"
            >
              <span>{loading ? 'Memverifikasi...' : 'Masuk ke Sistem'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Role Logins */}
          <div className="pt-2 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-between text-slate-400 text-[11px] font-semibold uppercase tracking-wider">
              <span>Pilih Role Demo (1-Click Login):</span>
              <span className="text-blue-600">Workshop Ready</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* Admin Card */}
              <button
                type="button"
                onClick={() => handleQuickLogin('admin@bri.co.id', 'admin123')}
                className={`p-3 rounded-xl border text-left transition ${
                  email === 'admin@bri.co.id'
                    ? 'border-blue-500 bg-blue-50/80 ring-2 ring-blue-500/20'
                    : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center space-x-1.5 font-bold text-slate-900 text-xs">
                  <span>👨‍💼</span>
                  <span>Admin</span>
                </div>
                <div className="text-[10px] text-blue-700 font-semibold mt-1">
                  URL: <code className="bg-blue-100 px-1 rounded">/admin</code>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Full CMS & Audit
                </div>
              </button>

              {/* Analyst Card */}
              <button
                type="button"
                onClick={() => handleQuickLogin('analyst@bri.co.id', 'analyst123')}
                className={`p-3 rounded-xl border text-left transition ${
                  email === 'analyst@bri.co.id'
                    ? 'border-emerald-500 bg-emerald-50/80 ring-2 ring-emerald-500/20'
                    : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center space-x-1.5 font-bold text-slate-900 text-xs">
                  <span>👩‍💻</span>
                  <span>Analyst</span>
                </div>
                <div className="text-[10px] text-emerald-700 font-semibold mt-1">
                  URL: <code className="bg-emerald-100 px-1 rounded">/analyst</code>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Input & Matriks Stack
                </div>
              </button>

              {/* Executive Card */}
              <button
                type="button"
                onClick={() => handleQuickLogin('executive@bri.co.id', 'bri123')}
                className={`p-3 rounded-xl border text-left transition ${
                  email === 'executive@bri.co.id'
                    ? 'border-purple-500 bg-purple-50/80 ring-2 ring-purple-500/20'
                    : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center space-x-1.5 font-bold text-slate-900 text-xs">
                  <span>👔</span>
                  <span>Executive</span>
                </div>
                <div className="text-[10px] text-purple-700 font-semibold mt-1">
                  URL: <code className="bg-purple-100 px-1 rounded">/executive</code>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  KPIs & Presentasi
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
