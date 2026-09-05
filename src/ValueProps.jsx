const VALUES = [
  {
    icon: 'checklist_rtl',
    iconBg: 'bg-primary-fixed',
    iconColor: 'text-primary-container',
    title: 'Kondisi Unit Prima 100%',
    desc: 'Setiap mobil wajib melewati inspeksi 40 titik sebelum diserahkan: rem, ban, AC dingin, aki, dan kelistrikan. Garansi ganti unit jika ada kendala mesin.',
    footText: 'SOP Standar Agen Resmi',
    footColor: 'text-primary',
  },
  {
    icon: 'receipt_long',
    iconBg: 'bg-surface-container-high',
    iconColor: 'text-secondary',
    title: 'Transparansi Harga Penuh',
    desc: 'Bebas biaya tersembunyi. Nilai yang Anda lihat di layar sudah mencakup asuransi dasar all-risk, pajak resmi, serta layanan cuci sterilisasi sebelum pemakaian.',
    footText: 'Tanpa Biaya Admin Tambahan',
    footColor: 'text-secondary',
  },
  {
    icon: 'document_scanner',
    iconBg: 'bg-primary-fixed',
    iconColor: 'text-primary',
    title: 'Verifikasi Cepat & Digital',
    desc: 'Tinggalkan birokrasi rumit. Cukup unggah KTP dan SIM via ponsel pintar Anda, sistem verifikasi otomatis kami mengonfirmasi akun dalam 15 menit.',
    footText: 'Data Terenkripsi 256-bit',
    footColor: 'text-primary',
  },
  {
    icon: 'car_repair',
    iconBg: 'bg-tertiary-fixed',
    iconColor: 'text-on-tertiary-fixed',
    title: '24/7 Roadside Assistance',
    desc: 'Tim mekanik darurat dan jaringan mobil derek siaga 24 jam nonstop di seluruh Jabodetabek, Bandung, Surabaya, dan Bali untuk menjamin ketenangan Anda.',
    footText: 'Hotline Siap Sedia',
    footColor: 'text-tertiary',
  },
];

export default function ValueProps() {
  return (
    <section className="w-full bg-surface-container-low/80 py-space-3xl">
      <div className="w-full max-w-[1680px] mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin-desktop">
        <div className="text-center max-w-2xl mx-auto mb-space-2xl flex flex-col gap-space-2xs">
          <span className="text-secondary font-label-sm text-label-sm font-semibold uppercase tracking-wider">
            Standar Layanan Eksekutif
          </span>
          <h2 className="font-headline-xl text-headline-xl text-on-surface font-jakarta">
            Mengapa Ribuan Pelanggan Memilih Velocis Fleet?
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Kami memadukan armada prima terawat dengan transparansi total, menjamin perjalanan
            keluarga maupun mobilitas dinas korporasi Anda berlangsung tanpa rasa cemas.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg">
          {VALUES.map((v, i) => (
            <div
              key={i}
              className="bg-surface-container-lowest p-space-xl rounded-2xl shadow-sm flex flex-col gap-space-md relative overflow-hidden"
            >
              <div
                className={`w-14 h-14 rounded-2xl ${v.iconBg} flex items-center justify-center ${v.iconColor}`}
              >
                <span className="material-symbols-outlined text-[32px]">{v.icon}</span>
              </div>
              <div className="flex flex-col gap-space-2xs">
                <h3 className="font-title-md text-title-md text-on-surface font-bold font-jakarta">
                  {v.title}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">{v.desc}</p>
              </div>
              <div
                className={`mt-auto pt-space-xs ${v.footColor} font-label-sm text-label-sm font-semibold flex items-center gap-space-3xs`}
              >
                <span>{v.footText}</span> →
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}