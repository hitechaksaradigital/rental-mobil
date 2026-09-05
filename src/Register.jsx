import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthShell from './AuthShell';
import { signUp } from './auth';

function checkPasswordStrength(pwd) {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  if (pwd.length >= 12) score++;
  return score;
}

const STRENGTH_LABEL = ['Sangat Lemah', 'Lemah', 'Sedang', 'Kuat', 'Sangat Kuat', 'Istimewa'];
const STRENGTH_COLOR = [
  'bg-error',
  'bg-error',
  'bg-amber-500',
  'bg-emerald-500',
  'bg-emerald-500',
  'bg-tertiary-fixed',
];

export default function Register() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);

  const strength = checkPasswordStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setInfo(null);

    if (password !== confirm) {
      setError('Konfirmasi kata sandi tidak cocok.');
      return;
    }
    if (strength < 2) {
      setError('Kata sandi terlalu lemah. Gunakan minimal 8 karakter dengan huruf besar & angka.');
      return;
    }
    if (!agree) {
      setError('Anda harus menyetujui Syarat & Ketentuan terlebih dahulu.');
      return;
    }

    setLoading(true);
    try {
      const data = await signUp(email, password, fullName);
      if (data?.session) {
        navigate('/manajemen-armada');
      } else {
        setInfo(
          'Akun berhasil dibuat. Cek kotak masuk email Anda untuk konfirmasi sebelum login.'
        );
      }
    } catch (err) {
      setError(err.message || 'Pendaftaran gagal. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Daftarkan Akun Operator"
      subtitle="Akses telemetri armada, jadwal handover, dan laporan operasional."
      footer={
        <>
          Sudah punya akun?{' '}
          <Link to="/login" className="text-primary-container font-semibold hover:underline">
            Masuk di sini
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
        {info && (
          <div className="p-space-sm rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-space-xs font-label-sm text-label-sm text-emerald-800">
            <span className="material-symbols-outlined text-[18px]">mark_email_read</span>
            <span>{info}</span>
          </div>
        )}

        <div className="flex flex-col gap-space-2xs">
          <label className="font-label-md text-label-md text-on-surface font-semibold">
            Nama Lengkap
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
              person
            </span>
            <input
              required
              autoComplete="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Arya Pratama"
              className="w-full h-12 pl-11 pr-space-md rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary-container focus:bg-surface-container-lowest transition-all"
            />
          </div>
        </div>

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
          <label className="font-label-md text-label-md text-on-surface font-semibold">
            Kata Sandi
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
              lock
            </span>
            <input
              type={showPwd ? 'text' : 'password'}
              required
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimal 8 karakter"
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
          {password && (
            <div className="flex items-center gap-space-xs pt-space-2xs">
              <div className="flex-1 h-1.5 rounded-full bg-surface-container-high overflow-hidden flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-full ${
                      i <= strength ? STRENGTH_COLOR[strength] : 'bg-transparent'
                    }`}
                  />
                ))}
              </div>
              <span className="font-caption-xs text-caption-xs text-on-surface-variant font-semibold">
                {STRENGTH_LABEL[strength]}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-space-2xs">
          <label className="font-label-md text-label-md text-on-surface font-semibold">
            Konfirmasi Kata Sandi
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
              lock_reset
            </span>
            <input
              type={showPwd ? 'text' : 'password'}
              required
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Ulangi kata sandi"
              className={`w-full h-12 pl-11 pr-space-md rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:bg-surface-container-lowest transition-all ${
                confirm && confirm !== password
                  ? 'focus:ring-error ring-2 ring-error/40'
                  : 'focus:ring-secondary-container'
              }`}
            />
            {confirm && confirm === password && (
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600 text-[20px]">
                check_circle
              </span>
            )}
          </div>
        </div>

        <label className="inline-flex items-start gap-space-xs cursor-pointer select-none font-label-sm text-label-sm text-on-surface-variant">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded text-primary-container focus:ring-secondary accent-primary-container"
          />
          <span>
            Saya menyetujui{' '}
            <a className="text-primary-container font-semibold hover:underline" href="#">
              Syarat & Ketentuan
            </a>{' '}
            serta{' '}
            <a className="text-primary-container font-semibold hover:underline" href="#">
              Kebijakan Privasi
            </a>{' '}
            Velocis Fleet.
          </span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 rounded-xl bg-primary-container text-on-primary font-label-md text-label-md font-bold flex items-center justify-center gap-space-xs shadow-lg shadow-primary-container/20 hover:bg-primary transition-all active:scale-[0.98] disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
          {loading ? 'Membuat Akun…' : 'Daftar Akun Operator'}
        </button>

        <Link
          to="/login"
          className="w-full h-12 rounded-xl bg-surface-container-low text-on-surface font-label-md text-label-md font-semibold flex items-center justify-center gap-space-xs hover:bg-surface-container-high transition-all"
        >
          Sudah punya akun? Masuk
        </Link>
      </form>
    </AuthShell>
  );
}