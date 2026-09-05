import { Link, useNavigate } from 'react-router-dom';
import { Logo } from './data';

const NAV = [
  { label: 'Armada & Rental', path: 'armada-rental' },
  { label: 'Layanan & Supir', path: 'layanan-supir' },
  { label: 'Promo Khusus', path: 'promo-khusus' },
  { label: 'Cara Sewa', path: 'cara-sewa' },
  { label: 'Bantuan & FAQ', path: 'bantuan-faq' },
];

export default function Header({ user, onSignOut }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (onSignOut) {
      await onSignOut();
      navigate('/');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-surface-container-lowest/95 backdrop-blur-md shadow-sm">
      <div className="w-full max-w-[1680px] mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin-desktop py-space-sm flex items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-md">
          <Link to="/" className="flex items-center gap-space-sm">
            <Logo className="h-8 w-auto object-contain" />
            <div className="flex flex-col">
              <span className="font-title-md text-title-md text-primary tracking-tight leading-none font-jakarta font-bold">
                Velocis
              </span>
              <span className="font-caption-xs text-caption-xs text-secondary tracking-wider uppercase font-semibold">
                Fleet & Mobility
              </span>
            </div>
          </Link>
          <nav className="hidden xl:flex items-center gap-space-lg pl-space-md">
            {NAV.map((n) => (
              <a
                key={n.path}
                className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors py-space-xs"
                href="#"
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-space-sm md:gap-space-md">
          <a
            className="hidden sm:inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-colors text-label-sm font-label-sm"
            href="https://wa.me/628118356247"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="material-symbols-outlined text-secondary text-[18px]">chat</span>
            <span className="font-semibold">+62 811-8356-247</span>
          </a>
          {user ? (
            <>
              <Link
                to="/manajemen-armada"
                className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-colors font-label-sm font-label-sm font-semibold"
              >
                <span className="material-symbols-outlined text-[18px]">dashboard</span>
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-primary-container text-on-primary hover:bg-primary transition-colors font-label-sm font-label-sm font-semibold shadow-sm"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">logout</span>
                <span className="hidden sm:inline">Keluar</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-colors font-label-sm font-label-sm font-semibold"
              >
                <span className="material-symbols-outlined text-[18px]">login</span>
                <span className="hidden sm:inline">Masuk</span>
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-primary-container text-on-primary hover:bg-primary transition-colors font-label-sm font-label-sm font-semibold shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">person_add</span>
                <span className="hidden sm:inline">Daftar</span>
              </Link>
            </>
          )}
        </div>
      </div>

      <aside
        aria-label="Pengumuman Promosi"
        className="w-full bg-primary text-on-primary py-space-xs px-margin-mobile md:px-margin-desktop"
      >
        <div className="max-w-[1680px] mx-auto flex flex-wrap items-center justify-between gap-space-xs">
          <div className="flex items-center gap-space-xs">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed">
              <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
            </span>
            <p className="font-label-sm text-label-sm tracking-wide">
              Spesial Ramadan & Libur Lebaran: Gunakan kode{' '}
              <strong className="text-tertiary-fixed font-semibold tracking-wider">
                VELOCISBARU
              </strong>{' '}
              untuk potongan langsung 15%!
            </p>
          </div>
          <div className="hidden md:flex items-center gap-space-md font-label-sm text-label-sm">
            <span className="flex items-center gap-space-2xs text-secondary-fixed">
              <span className="material-symbols-outlined text-[16px]">verified</span> Unit Siap 100%
              Bersih & Steril
            </span>
            <a
              className="underline hover:text-tertiary-fixed transition-colors font-medium"
              href="https://wa.me/628118356247"
              rel="noopener noreferrer"
              target="_blank"
            >
              Bantuan Cepat WhatsApp
            </a>
          </div>
        </div>
      </aside>
    </header>
  );
}