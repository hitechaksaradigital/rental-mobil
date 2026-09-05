import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, signOut } from './auth';

function getInitials(email) {
  if (!email) return 'U';
  const name = email.split('@')[0];
  return name.slice(0, 2).toUpperCase();
}

function getDisplayName(user) {
  return (
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split('@')[0] ||
    'Operator'
  );
}

export default function AdminHeader() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await signOut();
      navigate('/login');
    } catch (err) {
      alert('Gagal logout: ' + err.message);
    } finally {
      setLoggingOut(false);
      setMenuOpen(false);
    }
  };

  const displayName = getDisplayName(user);
  const role = user?.user_metadata?.role || 'Head of Fleet Operations';
  const initials = getInitials(user?.email);

  return (
    <header className="fixed top-0 left-72 right-0 h-20 bg-surface-container-lowest/90 backdrop-blur-xl z-40 shadow-[0_1px_8px_rgba(62,15,141,0.03)] px-space-xl flex items-center justify-between">
      <div className="flex items-center gap-space-md flex-1 max-w-xl">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-space-md top-1/2 -translate-y-1/2 text-outline text-[20px]">
            search
          </span>
          <input
            className="w-full h-10 pl-11 pr-space-md bg-surface-container-low text-on-surface placeholder:text-outline font-body-md text-body-md rounded-xl focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary-container transition-all"
            placeholder="Cari plat nomor, penyewa, atau booking ID..."
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-space-lg">
        <button
          className="h-10 px-space-md bg-primary-container text-on-primary font-label-md text-label-md rounded-xl flex items-center gap-space-xs shadow-[0_2px_8px_rgba(62,15,141,0.2)] hover:bg-primary transition-all"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>+ Input Pesanan Manual</span>
        </button>
        <div className="relative flex items-center">
          <button
            aria-label="Notifikasi Servis & Pajak"
            className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
          </button>
          <span className="absolute -top-1 -right-1 bg-tertiary-fixed text-on-tertiary-fixed font-caption-xs text-caption-xs font-bold px-1.5 py-0.5 rounded-full ring-2 ring-surface-container-lowest">
            3
          </span>
        </div>
        <div className="h-8 w-px bg-outline-variant/40" />
        <div className="relative">
          <button
            className="flex items-center gap-space-sm pl-space-xs cursor-pointer group"
            onClick={() => setMenuOpen((s) => !s)}
            type="button"
          >
            <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-caption-xs ring-2 ring-primary-fixed">
              {initials}
            </div>
            <div className="flex flex-col text-left">
              <span className="font-label-md text-label-md text-on-surface font-semibold leading-tight group-hover:text-primary transition-colors">
                {displayName}
              </span>
              <span className="font-caption-xs text-caption-xs text-on-surface-variant leading-tight">
                {role}
              </span>
            </div>
            <span className="material-symbols-outlined text-outline text-[18px] ml-space-3xs">
              expand_more
            </span>
          </button>
          {menuOpen && (
            <div
              className="absolute right-0 top-full mt-space-xs w-64 bg-surface-container-lowest rounded-xl shadow-xl border border-surface-container overflow-hidden z-50"
              onMouseLeave={() => setMenuOpen(false)}
            >
              <div className="p-space-md border-b border-surface-container">
                <p className="font-label-md text-label-md font-bold text-on-surface truncate">
                  {displayName}
                </p>
                <p className="font-caption-xs text-caption-xs text-on-surface-variant truncate">
                  {user?.email}
                </p>
              </div>
              <div className="p-space-2xs">
                <button
                  className="w-full flex items-center gap-space-sm px-space-md py-space-sm rounded-lg hover:bg-surface-container-high font-label-sm text-label-sm text-on-surface"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">person</span>
                  Profil Saya
                </button>
                <button
                  className="w-full flex items-center gap-space-sm px-space-md py-space-sm rounded-lg hover:bg-surface-container-high font-label-sm text-label-sm text-on-surface"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">settings</span>
                  Pengaturan Akun
                </button>
              </div>
              <div className="border-t border-surface-container p-space-2xs">
                <button
                  className="w-full flex items-center gap-space-sm px-space-md py-space-sm rounded-lg hover:bg-error-container/30 font-label-sm text-label-sm text-error font-semibold disabled:opacity-50"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  {loggingOut ? 'Keluar…' : 'Keluar / Logout'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}