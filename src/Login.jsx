import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthShell from './AuthShell';
import { signIn } from './auth';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signIn(email, password);
      navigate('/manajemen-armada');
    } catch (err) {
      setError(err.message || 'Login gagal. Periksa email dan kata sandi Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Masuk ke Dashboard Operasional"
      subtitle="Akses telemetri armada, jadwal supir, dan laporan keuangan."
      footer={
        <>
          Belum punya akun operasional?{' '}
          <Link to="/register" className="text-primary-container font-semibold hover:underline">
            Daftar sekarang
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
        {error && (
          <div className="p-space-sm rounded-xl bg-error-container/30 border border-error/20 flex items-start gap-space-xs font-label-sm text-label-sm text-error">
            <span className="material-symbols-outlined text-[18px]">error</span>
            <span>{error}</span>
          </div>
        )}

        <div className="flex flex-col gap-space-2xs">
          <label className="font-label-md text-label-md text-on-surface font-semibold">
            Email Operasional
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
              mail
            </span>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="operator@velocis.id"
              className="w-full h-12 pl-11 pr-space-md rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary-container focus:bg-surface-container-lowest transition-all"
            />
          </div>
        </div>

        <div className="flex flex-col gap-space-2xs">
          <div className="flex items-center justify-between">
            <label className="font-label-md text-label-md text-on-surface font-semibold">
              Kata Sandi
            </label>
            <a
              href="#"
              className="font-label-sm text-label-sm text-primary-container font-semibold hover:underline"
            >
              Lupa sandi?
            </a>
          </div>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
              lock
            </span>
            <input
              type={showPwd ? 'text' : 'password'}
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-12 pl-11 pr-12 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary-container focus:bg-surface-container-lowest transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPwd((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">
                {showPwd ? 'visibility_off' : 'visibility'}
              </span>
            </button>
          </div>
        </div>

        <label className="inline-flex items-center gap-space-xs cursor-pointer select-none font-label-sm text-label-sm text-on-surface-variant">
          <input
            type="checkbox"
            className="w-4 h-4 rounded text-primary-container focus:ring-secondary accent-primary-container"
          />
          <span>Ingat saya di perangkat ini</span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 rounded-xl bg-primary-container text-on-primary font-label-md text-label-md font-bold flex items-center justify-center gap-space-xs shadow-lg shadow-primary-container/20 hover:bg-primary transition-all active:scale-[0.98] disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-[20px]">login</span>
          {loading ? 'Memverifikasi…' : 'Masuk Dashboard'}
        </button>

        <div className="flex items-center gap-space-sm py-space-2xs">
          <div className="flex-1 h-px bg-outline-variant/40" />
          <span className="font-caption-xs text-caption-xs text-outline">atau</span>
          <div className="flex-1 h-px bg-outline-variant/40" />
        </div>

        <Link
          to="/"
          className="w-full h-12 rounded-xl bg-surface-container-low text-on-surface font-label-md text-label-md font-semibold flex items-center justify-center gap-space-xs hover:bg-surface-container-high transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          Kembali ke Portal Pelanggan
        </Link>
      </form>
    </AuthShell>
  );
}