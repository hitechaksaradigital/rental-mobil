const REVIEWS = [
  {
    stars: 5,
    ago: '2 hari yang lalu',
    quote:
      'Sangat puas menyewa Alphard untuk tamu direksi dari Singapura. Driver Mas Bambang sangat santun, paham bahasa Inggris, dan tiba 20 menit sebelum jadwal di Bandara Soetta. Mobil wangi dan bersih sekali.',
    initials: 'RS',
    avatarColor: 'bg-primary-fixed text-primary',
    name: 'Raditya Santoso',
    role: 'Managing Partner, Corporate Law Firm Jakarta',
  },
  {
    stars: 5,
    ago: '1 minggu yang lalu',
    quote:
      'Sewa lepas kunci Innova Zenix Hybrid untuk road trip keluarga keliling Jogja - Solo. Proses verifikasi KTP hanya butuh 10 menit via website. Konsumsi bensin irit luar biasa dan serah terima unit di stasiun sangat lancar!',
    initials: 'DW',
    avatarColor: 'bg-secondary-fixed text-secondary',
    name: 'Dinda Wulandari',
    role: 'Liburan Keluarga, Bandung',
  },
  {
    stars: 5,
    ago: '2 minggu yang lalu',
    quote:
      'Kami menggunakan paket fleet korporat Velocis untuk operasional 6 unit Fortuner selama event KTT di Nusa Dua Bali. Respon helpdesk 24 jam sangat solutif ketika ada pergantian jadwal mendadak.',
    initials: 'BP',
    avatarColor: 'bg-tertiary-fixed text-on-tertiary-fixed',
    name: 'Bagus Prakoso',
    role: 'Operations Head, Tech Enterprise Bali',
  },
];

function FiveStars({ size = 18 }) {
  return (
    <div className="flex text-tertiary">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className="material-symbols-outlined fill-current"
          style={{ fontVariationSettings: "'FILL' 1", fontSize: size }}
        >
          star
        </span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="w-full bg-surface-container-low/60 py-space-3xl">
      <div className="w-full max-w-[1680px] mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin-desktop">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-2xl">
          <div>
            <span className="text-secondary font-label-sm text-label-sm font-semibold uppercase tracking-wider">
              Testimoni Pelanggan
            </span>
            <h2 className="font-headline-xl text-headline-xl text-on-surface font-jakarta">
              Ulasan Pengalaman Nyata
            </h2>
          </div>
          <div className="flex items-center gap-space-xs">
            <FiveStars />
            <span className="font-headline-lg text-headline-lg text-primary font-bold font-jakarta">
              4.9 / 5.0
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              dari 3.400+ perjalanan sewa
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {REVIEWS.map((r, i) => (
            <div
              key={i}
              className="bg-surface-container-lowest p-space-xl rounded-2xl shadow-sm flex flex-col justify-between gap-space-md"
            >
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <FiveStars size={18} />
                  <span className="font-caption-xs text-caption-xs text-on-surface-variant">
                    {r.ago}
                  </span>
                </div>
                <p className="font-body-md text-body-md text-on-surface italic">"{r.quote}"</p>
              </div>
              <div className="flex items-center gap-space-sm pt-space-xs">
                <div
                  className={`w-11 h-11 rounded-full ${r.avatarColor} flex items-center justify-center font-bold`}
                >
                  {r.initials}
                </div>
                <div>
                  <div className="flex items-center gap-space-3xs">
                    <span className="font-label-md text-label-md font-bold text-on-surface">
                      {r.name}
                    </span>
                    <span className="material-symbols-outlined text-[16px] text-secondary">
                      verified
                    </span>
                  </div>
                  <p className="font-caption-xs text-caption-xs text-on-surface-variant">
                    {r.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}