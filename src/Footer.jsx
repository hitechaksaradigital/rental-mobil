import { Logo } from './data';

const FOOTER_LINKS = [
  {
    title: 'Wilayah Layanan',
    items: [
      'Jakarta Raya (Jabodetabek)',
      'Bali (Denpasar, Kuta, Ubud)',
      'Surabaya & Sekitarnya',
      'Bandung & Jawa Barat',
      'Yogyakarta & Semarang',
    ],
  },
  {
    title: 'Layanan Korporat',
    items: [
      'Sewa Mobil Dinas Bulanan',
      'Event & VIP Handling',
      'Long-Term Corporate Fleet',
      'Pengemudi Bersertifikasi',
      'Airport Transfer 24 Jam',
    ],
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest shadow-[0_-1px_12px_rgba(62,15,141,0.04)]">
      <div className="w-full max-w-[1680px] mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin-desktop pt-space-3xl pb-space-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-xl">
          <div className="lg:col-span-2 flex flex-col gap-space-md">
            <div className="flex items-center gap-space-sm">
              <Logo className="h-8 w-auto object-contain" />
              <span className="font-headline-lg text-headline-lg text-primary font-jakarta font-bold">
                Velocis Fleet
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
              Solusi mobilitas korporat dan rental mobil eksekutif modern. Menghadirkan armada
              prima terawat, supir profesional bersertifikasi, serta teknologi pemesanan instan
              terintegrasi di seluruh kota metropolitan Indonesia.
            </p>
            <div className="flex items-center gap-space-sm pt-space-xs">
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-surface-container-low text-primary-container">
                <span className="material-symbols-outlined text-[20px]">support_agent</span>
              </div>
              <div>
                <p className="font-caption-xs text-caption-xs text-on-surface-variant uppercase font-semibold tracking-wider">
                  24/7 Hotline Bebas Pulsa
                </p>
                <p className="font-label-md text-label-md text-on-surface font-semibold">
                  0800-1-VELOCIS (8356247)
                </p>
              </div>
            </div>
          </div>

          {FOOTER_LINKS.map((col) => (
            <div key={col.title} className="flex flex-col gap-space-sm">
              <h3 className="font-title-md text-title-md text-on-surface font-jakarta font-bold">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-space-xs font-body-md text-body-md text-on-surface-variant">
                {col.items.map((it) => (
                  <li key={it}>
                    <a className="hover:text-primary-container transition-colors" href="#">
                      {it}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-space-2xl pt-space-md border-t border-surface-container-high flex flex-col md:flex-row md:items-center md:justify-between gap-space-xs font-caption-xs text-caption-xs text-on-surface-variant">
          <span>© 2026 Velocis Fleet & Mobility. Seluruh hak cipta dilindungi.</span>
          <div className="flex gap-space-md">
            <a className="hover:text-primary-container transition-colors" href="#">
              Kebijakan Privasi
            </a>
            <a className="hover:text-primary-container transition-colors" href="#">
              Syarat & Ketentuan
            </a>
            <a className="hover:text-primary-container transition-colors" href="#">
              Karir
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}