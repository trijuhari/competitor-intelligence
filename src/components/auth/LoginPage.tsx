import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Eye, EyeOff, AlertCircle, ArrowRight } from 'lucide-react';
import { BankLogo } from '../common/BankLogo';
import { Button, Input } from '../ui';

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
      setErrorMessage(result.error || 'Email atau password salah.');
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-[1fr_480px] bg-canvas">
      {/* Context panel */}
      <section className="hidden lg:flex flex-col justify-between p-12 border-r border-line bg-surface">
        <div className="flex items-center gap-2.5">
          <BankLogo bankCode="bri" size={26} />
          <span className="text-[13px] font-semibold text-ink">Competitor Intel</span>
        </div>

        <div className="max-w-md">
          <h1 className="text-3xl font-semibold leading-tight text-ink">
            Benchmark tech stack BRI terhadap Himbara &amp; BCA.
          </h1>
          <p className="text-[15px] text-muted mt-4 leading-relaxed">
            408 kapabilitas, 13 domain arsitektur, 6 bank. Setiap temuan ditandai
            terverifikasi, inferensi, atau belum, lengkap dengan sumbernya.
          </p>

          <dl className="grid grid-cols-3 gap-px mt-10 bg-line border border-line rounded-lg overflow-hidden">
            {[
              ['408', 'Kapabilitas'],
              ['13', 'Domain'],
              ['6', 'Bank'],
            ].map(([v, l]) => (
              <div key={l} className="bg-surface px-4 py-3">
                <dt className="text-xs text-muted">{l}</dt>
                <dd className="text-xl font-semibold num text-ink mt-0.5">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-subtle">Dibandingkan dengan</span>
          <div className="flex items-center gap-1.5">
            {PEERS.map(p => (
              <BankLogo key={p} bankCode={p} size={22} />
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="flex flex-col justify-center px-6 sm:px-12 py-12">
        <div className="w-full max-w-sm mx-auto">
          <div className="lg:hidden flex items-center gap-2.5 mb-10">
            <BankLogo bankCode="bri" size={26} />
            <span className="text-[13px] font-semibold text-ink">Competitor Intel</span>
          </div>

          <h2 className="text-xl font-semibold text-ink">Masuk</h2>
          <p className="text-[13px] text-muted mt-1">Gunakan akun analis atau konsultan yang terdaftar.</p>

          {errorMessage && (
            <div role="alert" className="mt-6 p-3 rounded-md bg-danger-soft border border-danger/20 text-danger text-[13px] flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="login-email" className="block text-[13px] font-medium text-ink">Email</label>
              <Input
                id="login-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@intel.com"
                autoComplete="email"
                required
                className="[&_input]:h-9"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="login-password" className="block text-[13px] font-medium text-ink">Password</label>
              <div className="relative">
                <Input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="[&_input]:h-9 [&_input]:pr-9"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded text-subtle hover:text-ink"
                  aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button id="login-submit" type="submit" variant="primary" disabled={loading} className="w-full h-9 justify-center">
              {loading ? 'Memverifikasi…' : 'Masuk'}
              {!loading && <ArrowRight />}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};
