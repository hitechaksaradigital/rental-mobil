import { useState } from 'react';

export default function PromoBanner({ onScrollBooking }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText('VELOCISBARU');
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section className="w-full max-w-[1680px] mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin-desktop py-space-3xl">
      <div className="relative w-full rounded-3xl bg-primary text-on-primary overflow-hidden p-space-xl md:p-space-3xl shadow-xl">
        <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -top-12 w-64 h-64 rounded-full bg-tertiary-fixed/10 blur-2xl pointer-events-none" />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            <div className="inline-flex items-center gap-space-2xs px-space-md py-space-3xs rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm font-semibold self-start">
              <span className="material-symbols-outlined text-[16px]">local_offer</span>
              <span>Promo Pengguna Baru 2026</span>
            </div>
            <h2 className="font-headline-xl text-headline-xl text-on-primary md:text-[36px] md:leading-[44px] font-bold font-jakarta">
              Diskon 15% Sewa Pertama Kali dengan Kode Kupon Spesial
            </h2>
            <p className="font-body-lg text-body-lg text-primary-fixed max-w-xl">
              Masukkan kode kupon{' '}
              <span className="px-space-xs py-space-3xs rounded bg-tertiary-fixed text-on-tertiary-fixed font-data-mono font-bold">
                VELOCISBARU
              </span>{' '}
              saat checkout atau tunjukkan saat reservasi via WhatsApp CS resmi kami.
            </p>
            <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
              <a
                className="px-space-xl py-space-sm rounded-xl bg-tertiary-fixed text-on-tertiary-fixed font-label-md text-label-md font-bold hover:bg-tertiary-fixed-dim transition-all shadow-md flex items-center gap-space-xs"
                href="https://wa.me/628118356247?text=Halo%20Velocis%20Fleet,%20saya%20ingin%20klaim%20kode%20promo%20VELOCISBARU"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-[20px]">chat</span>
                <span>Klaim Promo via WhatsApp</span>
              </a>
              <button
                className="px-space-lg py-space-sm rounded-xl bg-primary-container text-on-primary font-label-md text-label-md font-semibold hover:bg-secondary transition-all"
                onClick={onScrollBooking}
                type="button"
              >
                Gunakan Kupon Sekarang
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="bg-surface-container-lowest text-on-surface p-space-xl rounded-2xl shadow-2xl max-w-sm w-full flex flex-col gap-space-md text-center">
              <div className="w-14 h-14 rounded-full bg-primary-fixed text-primary mx-auto flex items-center justify-center">
                <span className="material-symbols-outlined text-[32px]">redeem</span>
              </div>
              <div>
                <span className="font-caption-xs text-caption-xs text-on-surface-variant uppercase font-semibold">
                  Salin Kupon Diskon
                </span>
                <div className="flex items-center justify-center gap-space-xs mt-space-2xs bg-surface-container-low p-space-sm rounded-xl">
                  <span className="font-data-mono text-data-mono text-primary font-bold text-[18px]">
                    VELOCISBARU
                  </span>
                  <button
                    className="p-space-3xs text-secondary hover:text-primary transition-colors"
                    onClick={handleCopy}
                    title="Salin Kode"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">content_copy</span>
                  </button>
                </div>
                {copied && (
                  <span className="block mt-space-2xs font-caption-xs text-caption-xs text-secondary font-semibold">
                    Kode tersalin!
                  </span>
                )}
              </div>
              <p className="font-caption-xs text-caption-xs text-on-surface-variant">
                *Berlaku untuk rental harian lepas kunci & dengan sopir hingga 31 Desember 2026.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}