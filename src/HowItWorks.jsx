const STEPS = [
  {
    n: '01',
    numColor: 'text-primary-fixed-dim',
    iconBg: 'bg-primary-fixed',
    iconColor: 'text-primary-container',
    icon: 'directions_car',
    title: 'Pilih Unit & Jadwal Sewa',
    desc: 'Pilih jenis mobil sesuai kapasitas penumpang, bagasi, serta tanggal durasi yang diinginkan (lepas kunci atau supir).',
  },
  {
    n: '02',
    numColor: 'text-secondary-fixed-dim',
    iconBg: 'bg-secondary-fixed',
    iconColor: 'text-secondary',
    icon: 'id_card',
    title: 'Unggah Identitas (KTP & SIM)',
    desc: 'Foto KTP dan SIM A asli secara langsung. Verifikasi instan dengan sistem keamanan data perbankan yang aman.',
  },
  {
    n: '03',
    numColor: 'text-primary-fixed-dim',
    iconBg: 'bg-primary-fixed',
    iconColor: 'text-primary-container',
    icon: 'payments',
    title: 'Pembayaran Digital Aman',
    desc: 'Bayar instan via QRIS semua dompet digital, Virtual Account (BCA/Mandiri/BRI), atau Kartu Kredit dengan invoice otomatis.',
  },
  {
    n: '04',
    numColor: 'text-tertiary-fixed-dim',
    iconBg: 'bg-tertiary-fixed',
    iconColor: 'text-on-tertiary-fixed',
    icon: 'key_vertical',
    title: 'Unit Dikirim atau Diambil',
    desc: 'Armada diantar tepat waktu langsung ke rumah, lobi hotel, atau diambil di pool bandara dengan berita acara digital.',
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full max-w-[1680px] mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin-desktop py-space-3xl">
      <div className="text-center max-w-xl mx-auto mb-space-2xl flex flex-col gap-space-2xs">
        <span className="text-primary-container font-label-sm text-label-sm font-semibold uppercase tracking-wider">
          Alur Reservasi Cerdas
        </span>
        <h2 className="font-headline-xl text-headline-xl text-on-surface font-jakarta">
          4 Langkah Cepat Menuju Perjalanan Anda
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Nikmati kemudahan booking kendaraan tanpa perlu datang antre di pool fisik.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg relative">
        {STEPS.map((s) => (
          <div
            key={s.n}
            className="flex flex-col gap-space-sm p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm relative"
          >
            <div className="flex items-center justify-between">
              <span className={`font-headline-xl text-headline-xl font-bold ${s.numColor}`}>
                {s.n}
              </span>
              <div
                className={`w-10 h-10 rounded-full ${s.iconBg} flex items-center justify-center ${s.iconColor}`}
              >
                <span className="material-symbols-outlined text-[22px]">{s.icon}</span>
              </div>
            </div>
            <h3 className="font-title-md text-title-md text-on-surface font-bold font-jakarta">
              {s.title}
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}