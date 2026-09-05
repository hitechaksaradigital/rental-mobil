import { useState } from 'react';
import Sidebar from './Sidebar';
import AdminHeader from './AdminHeader';

const FLEET = [
  {
    name: 'Toyota Innova Zenix Q Hybrida',
    plate: 'B 1842 VLZ',
    type: 'MPV 2023',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_rvxsjt4N5qniFn9AXelDtuZzQ_Ybh0CcMLEOGtL7KL_7sxdaCqU4bqu3lZcxdU5f_M754Num0qfQ0bQ-QIuigfQcmhtuxg6rYw_uUdcGE0JKJPs2u_vjMU1z9qPzeHC8IRvbjl6uFRZ4w37qmwNBAwrjyyeQPoV18cAcJ_SXU7GE34tUuhpB9abifQPuSozD0zoHzrGuwLbxRLAY0ChQnfXpW1zxsqAjVBhaaEhh5WwlMPT5sWvt',
    status: 'available',
    odo: '18,450 km',
    fuel: 85,
    fuelColor: 'bg-emerald-500',
    telematic: { icon: 'near_me', text: 'Parkir Pool Cawang (0 km/h)', color: 'text-emerald-700' },
    stnk: 'STNK: 14 Des 2025',
  },
  {
    name: 'Mitsubishi Pajero Sport Dakar',
    plate: 'B 2099 KFL',
    type: 'SUV 2022',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZ8C2dgXnmZD9nNx1hg720mTPE61imQE9DSN0mTJELFE1DQSv8UW3DP2fpT-sBhBivWf6n6lhgBqel4uzp_ObSotsLhgaNztMZdFW4lrQEzeSfbETNV6HkuV3J6rZ3kN1J2sOq_ST99Wp5mLtfkQ_NkllCjPsYfRC581FgAWQcQK8Yufdp3oVR2g9cwlr3NaptfyYB9ZB5dMTynxSuDG_rYABOgBYku0ijDmGfSckSTUF-2fdXmFdH',
    status: 'rented',
    odo: '42,890 km',
    fuel: 40,
    fuelColor: 'bg-amber-500',
    telematic: {
      icon: 'navigation',
      text: 'Tol Jagorawi KM 28 (78 km/h)',
      color: 'text-secondary',
    },
    stnk: 'Driver: Bambang H. (Penyewa: PT Surya)',
  },
  {
    name: 'Toyota Alphard 2.5G Executive',
    plate: 'D 1455 ACD',
    type: 'Luxury 2023',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgaDklmV8HH9A2DZ3X0CZ25Ul9seYb2LhaXVDfHu8AnMQ0WLzQJDqHNrby-jiYWo8pRAwAhbZ3JLmJJ38wSmWCD2AqebUVmA3q9SHk94nvPaOtdhswTx0z4uHW_7TVcP2RIe31dFaSjT47f7AJEh-ns1i1boieBJUm7d2c42xewYsSqEr0Us5BPYE7kBrQFWU2JExArKJB9AiXdZVn1qZYEK4J8lxiORWWpP8CxHrbLqKa4ilsZGxu',
    status: 'rented',
    odo: '12,120 km',
    fuel: 95,
    fuelColor: 'bg-emerald-500',
    telematic: {
      icon: 'flight_takeoff',
      text: 'Bandara Soetta T3 (VIP Arrival)',
      color: 'text-secondary',
    },
    stnk: 'Handover kembali: 20:00 WIB',
  },
  {
    name: 'Honda HR-V RS Turbo',
    plate: 'B 2410 SVR',
    type: 'Crossover 2022',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-HqmvIxzSlcF8zCSCvauFIDIcwB-LzSgaLqS5Ue4dVVzAPynRoakgo_R08NPfrvJexGAJkeXZkWXFg_Djvdc2jFxlDesQ1Q3b8lvPG25vVR9p2KFfQEKW5ZTw_7FU_JPBtK9RDY3neVt1wPEG4clr2BYyVIx40x8VxMGLN22ok9kV8yMvkux1KxQ3BrlaY-_wUGxoy5Ey4Hul6J6mLavVvMVtjHlUmKLxLJuq4fRAe0Zx88hr5Qx0',
    status: 'service',
    odo: '30,050 km',
    fuel: 55,
    fuelColor: 'bg-primary-container',
    telematic: {
      icon: 'build',
      text: 'Bengkel Resmi Honda Fatmawati',
      color: 'text-amber-700',
    },
    stnk: 'Estimasi Selesai: Hari Ini 16:30',
    serviceBtn: true,
  },
];

const STATUS_STYLES = {
  available: {
    pill: 'bg-emerald-50 text-emerald-700',
    dot: 'bg-emerald-500',
    ping: true,
    label: 'Tersedia',
    icon: null,
  },
  rented: {
    pill: 'bg-primary-container text-on-primary shadow-xs',
    dot: 'bg-tertiary-fixed',
    ping: false,
    label: 'Sedang Disewa',
    icon: null,
  },
  service: {
    pill: 'bg-amber-50 text-amber-800',
    dot: null,
    ping: false,
    label: 'Servis Berkala',
    icon: 'engineering',
  },
};

function StatusPill({ status }) {
  const s = STATUS_STYLES[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-label-sm text-label-sm font-semibold whitespace-nowrap ${s.pill}`}
    >
      {s.dot && (
        <span
          className={`w-2 h-2 rounded-full ${s.dot} ${s.ping ? 'animate-ping' : ''}`}
        />
      )}
      {s.icon && (
        <span className="material-symbols-outlined text-[14px]">{s.icon}</span>
      )}
      {s.label}
    </span>
  );
}

export default function ManajemenArmada() {
  const [query, setQuery] = useState('');

  const filtered = FLEET.filter((f) =>
    `${f.name} ${f.plate} ${f.type}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-surface-container font-body-md text-on-surface antialiased">
      <Sidebar active="manajemen-armada" />
      <div className="pl-72">
        <AdminHeader />
        <main className="w-full pt-20 bg-surface-container min-h-screen px-space-xl py-space-xl">
          <div className="flex flex-col w-full gap-space-lg">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
              <div>
                <div className="flex items-center gap-space-xs text-on-surface-variant">
                  <span className="font-label-sm text-label-sm tracking-wider uppercase">
                    Portal Operasional
                  </span>
                  <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                  <span className="font-label-sm text-label-sm text-primary font-semibold">
                    Manajemen Armada & Telematika
                  </span>
                </div>
                <h1 className="font-display-lg text-display-lg text-primary tracking-tight mt-space-3xs font-jakarta font-bold">
                  Manajemen Armada & Pelacakan GPS
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Kendali langsung telemetri, utilisasi real-time, serta siklus pemeliharaan aset
                  kendaraan.
                </p>
              </div>
              <div className="flex items-center gap-space-sm self-start md:self-auto">
                <div className="flex items-center gap-space-xs bg-surface-container-lowest px-space-md py-space-xs rounded-xl shadow-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-data-mono text-data-mono text-on-surface font-bold">
                    48 Telematics Online
                  </span>
                  <span className="font-caption-xs text-caption-xs text-outline ml-space-3xs">
                    Ping 18ms
                  </span>
                </div>
                <button
                  className="h-10 px-space-md bg-surface-container-lowest text-primary font-label-md text-label-md rounded-xl shadow-sm hover:bg-surface-container-high transition-all flex items-center gap-space-xs"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">sync</span>
                  <span>Sinkronisasi Sensor</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md">
              <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-primary-container/5 pointer-events-none group-hover:scale-110 transition-transform" />
                <div className="flex items-center justify-between mb-space-sm">
                  <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[22px]">directions_car</span>
                  </div>
                  <span className="font-caption-xs text-caption-xs font-semibold px-space-xs py-space-3xs rounded-full bg-surface-container-high text-on-surface-variant">
                    Kapasitas 100%
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-caption-xs text-caption-xs text-on-surface-variant uppercase font-medium tracking-wide">
                    Total Armada Terdaftar
                  </span>
                  <div className="flex items-baseline gap-space-xs mt-space-3xs">
                    <span className="font-headline-xl text-headline-xl text-primary font-bold font-jakarta">
                      48
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Unit Aktif
                    </span>
                  </div>
                  <div className="flex items-center gap-space-xs mt-space-sm pt-space-xs text-on-surface-variant flex-wrap">
                    <span className="inline-flex items-center gap-1 font-caption-xs text-caption-xs text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />32 Siap
                    </span>
                    <span className="inline-flex items-center gap-1 font-caption-xs text-caption-xs text-secondary bg-primary-fixed/40 px-1.5 py-0.5 rounded">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary" />12 Sewa
                    </span>
                    <span className="inline-flex items-center gap-1 font-caption-xs text-caption-xs text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />3 Servis
                    </span>
                    <span className="inline-flex items-center gap-1 font-caption-xs text-caption-xs text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded">
                      1 Booked
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-secondary-container/10 pointer-events-none group-hover:scale-110 transition-transform" />
                <div className="flex items-center justify-between mb-space-sm">
                  <div className="w-10 h-10 rounded-xl bg-secondary-fixed flex items-center justify-center text-primary-container">
                    <span className="material-symbols-outlined text-[22px]">speed</span>
                  </div>
                  <span className="font-caption-xs text-caption-xs font-semibold px-space-xs py-space-3xs rounded-full bg-emerald-50 text-emerald-700 flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[14px]">trending_up</span>{' '}
                    +4.2% mgg ini
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-caption-xs text-caption-xs text-on-surface-variant uppercase font-medium tracking-wide">
                    Rasio Utilisasi Armada
                  </span>
                  <div className="flex items-baseline gap-space-xs mt-space-3xs">
                    <span className="font-headline-xl text-headline-xl text-primary font-bold font-jakarta">
                      78.5%
                    </span>
                    <span className="font-label-sm text-label-sm text-outline">
                      Target 80%
                    </span>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-2 mt-space-sm overflow-hidden">
                    <div
                      className="bg-primary-container h-2 rounded-full transition-all duration-500"
                      style={{ width: '78.5%' }}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-tertiary-fixed/30 pointer-events-none group-hover:scale-110 transition-transform" />
                <div className="flex items-center justify-between mb-space-sm">
                  <div className="w-10 h-10 rounded-xl bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
                    <span className="material-symbols-outlined text-[22px]">build_circle</span>
                  </div>
                  <span className="font-caption-xs text-caption-xs font-semibold px-space-xs py-space-3xs rounded-full bg-amber-50 text-amber-800 animate-bounce">
                    Perlu Tindakan
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-caption-xs text-caption-xs text-on-surface-variant uppercase font-medium tracking-wide">
                    Pengingat Servis & Pajak
                  </span>
                  <div className="flex items-baseline gap-space-xs mt-space-3xs">
                    <span className="font-headline-xl text-headline-xl text-error font-bold font-jakarta">
                      4 Unit
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Kritis
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-space-sm pt-space-xs text-on-surface-variant font-caption-xs text-caption-xs">
                    <span className="text-error font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px]">oil_barrel</span> 2
                      Jatuh Tempo Oli
                    </span>
                    <span className="text-tertiary font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px]">
                        assignment_late
                      </span>{' '}
                      2 Pajak &lt; 14 Hari
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-primary-fixed/20 pointer-events-none group-hover:scale-110 transition-transform" />
                <div className="flex items-center justify-between mb-space-sm">
                  <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[22px]">local_gas_station</span>
                  </div>
                  <span className="font-caption-xs text-caption-xs font-semibold px-space-xs py-space-3xs rounded-full bg-emerald-50 text-emerald-700">
                    Eco Efisien
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-caption-xs text-caption-xs text-on-surface-variant uppercase font-medium tracking-wide">
                    Efisiensi BBM Rata-rata
                  </span>
                  <div className="flex items-baseline gap-space-xs mt-space-3xs">
                    <span className="font-headline-xl text-headline-xl text-primary font-bold font-jakarta">
                      12.4
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      km / Liter
                    </span>
                  </div>
                  <div className="flex items-center gap-space-xs mt-space-sm pt-space-xs">
                    <svg
                      className="w-full h-5 text-secondary-container"
                      preserveAspectRatio="none"
                      viewBox="0 0 100 20"
                    >
                      <path
                        d="M0,15 Q25,5 50,12 T100,6"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
              <div className="flex flex-wrap items-center gap-space-sm flex-1">
                <div className="relative min-w-[280px] flex-1 max-w-md">
                  <span className="material-symbols-outlined absolute left-space-md top-1/2 -translate-y-1/2 text-outline text-[20px]">
                    search
                  </span>
                  <input
                    className="w-full h-10 pl-11 pr-space-md bg-surface-container-low text-on-surface placeholder:text-outline font-body-md text-body-md rounded-xl focus:outline-none focus:bg-surface-container-lowest shadow-sm transition-all"
                    placeholder="Cari nomor plat, tipe kendaraan, ID unit..."
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <select className="h-10 px-space-md pr-8 bg-surface-container-low text-on-surface font-label-md text-label-md rounded-xl appearance-none focus:outline-none cursor-pointer">
                    <option value="all">Status: Semua Armada</option>
                    <option value="available">Tersedia (Ready)</option>
                    <option value="rented">Sedang Disewa</option>
                    <option value="service">Dalam Perawatan</option>
                    <option value="booked">Dipesan / Reservasi</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-outline text-[18px] pointer-events-none">
                    expand_more
                  </span>
                </div>
                <div className="relative">
                  <select className="h-10 px-space-md pr-8 bg-surface-container-low text-on-surface font-label-md text-label-md rounded-xl appearance-none focus:outline-none cursor-pointer">
                    <option value="all">Kategori: Semua Kelas</option>
                    <option value="mpv">MPV & Family Van</option>
                    <option value="suv">SUV & Cross 4WD</option>
                    <option value="luxury">Luxury & Executive</option>
                    <option value="sedan">Sedan Premium</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-outline text-[18px] pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-space-sm self-end lg:self-auto">
                <button
                  className="h-10 px-space-md bg-surface-container-low text-on-surface-variant font-label-md text-label-md rounded-xl hover:bg-surface-container-high transition-all flex items-center gap-space-xs"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">ios_share</span>
                  <span>Ekspor Laporan</span>
                </button>
                <button
                  className="h-10 px-space-md bg-primary-container text-on-primary font-label-md text-label-md rounded-xl flex items-center gap-space-xs shadow-md hover:bg-primary transition-all"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">add_circle</span>
                  <span>+ Tambah Kendaraan Baru</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
              <div className="lg:col-span-7 flex flex-col gap-space-md">
                <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
                  <div className="p-space-lg flex items-center justify-between bg-surface-container-lowest">
                    <div>
                      <h2 className="font-title-md text-title-md text-primary font-bold font-jakarta">
                        Daftar Inventaris Kendaraan
                      </h2>
                      <p className="font-caption-xs text-caption-xs text-on-surface-variant">
                        Menampilkan {filtered.length} dari 48 unit prioritas live GPS monitoring
                      </p>
                    </div>
                    <div className="flex items-center gap-space-2xs">
                      <button
                        aria-label="Tampilan Tabel"
                        className="p-2 rounded-lg bg-surface-container text-primary"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">table_rows</span>
                      </button>
                      <button
                        aria-label="Tampilan Grid"
                        className="p-2 rounded-lg text-outline hover:bg-surface-container"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">grid_view</span>
                      </button>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-surface-container-low text-on-surface-variant font-caption-xs text-caption-xs uppercase tracking-wider">
                          <th className="py-space-sm px-space-md">Kendaraan & Plat</th>
                          <th className="py-space-sm px-space-md">Status</th>
                          <th className="py-space-sm px-space-md">Odo & BBM</th>
                          <th className="py-space-sm px-space-md">Telematika Terkini</th>
                          <th className="py-space-sm px-space-md text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-surface-container">
                        {filtered.map((f) => (
                          <tr key={f.plate} className="hover:bg-primary-fixed/20 transition-colors group">
                            <td className="py-space-md px-space-md">
                              <div className="flex items-center gap-space-sm">
                                <img
                                  className="w-12 h-12 rounded-lg object-cover shadow-sm flex-shrink-0"
                                  alt={f.name}
                                  src={f.img}
                                />
                                <div className="flex flex-col min-w-0">
                                  <span className="font-label-md text-label-md text-on-surface font-semibold truncate">
                                    {f.name}
                                  </span>
                                  <div className="flex items-center gap-space-2xs mt-0.5">
                                    <span className="font-data-mono text-caption-xs bg-surface-container px-1.5 py-0.5 rounded text-primary font-bold">
                                      {f.plate}
                                    </span>
                                    <span className="font-caption-xs text-caption-xs text-on-surface-variant">
                                      {f.type}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-space-md px-space-md whitespace-nowrap">
                              <StatusPill status={f.status} />
                            </td>
                            <td className="py-space-md px-space-md whitespace-nowrap">
                              <div className="flex flex-col">
                                <span
                                  className={`font-data-mono text-label-sm font-semibold ${
                                    f.status === 'service' ? 'text-error' : 'text-on-surface'
                                  }`}
                                >
                                  {f.odo}
                                </span>
                                <div className="flex items-center gap-1.5 mt-1">
                                  <div className="w-16 bg-surface-container rounded-full h-1.5 overflow-hidden">
                                    <div
                                      className={`h-1.5 rounded-full ${f.fuelColor}`}
                                      style={{ width: `${f.fuel}%` }}
                                    />
                                  </div>
                                  <span className="font-caption-xs text-caption-xs text-on-surface-variant">
                                    {f.fuel}%
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="py-space-md px-space-md">
                              <div className="flex flex-col">
                                <div
                                  className={`flex items-center gap-1 font-caption-xs text-caption-xs font-semibold ${f.telematic.color}`}
                                >
                                  <span className="material-symbols-outlined text-[14px]">
                                    {f.telematic.icon}
                                  </span>
                                  <span>{f.telematic.text}</span>
                                </div>
                                <span
                                  className={`font-caption-xs text-caption-xs mt-0.5 ${
                                    f.status === 'service'
                                      ? 'text-error font-medium'
                                      : 'text-outline'
                                  }`}
                                >
                                  {f.stnk}
                                </span>
                              </div>
                            </td>
                            <td className="py-space-md px-space-md text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-1">
                                {f.serviceBtn ? (
                                  <button
                                    className="h-8 px-space-xs bg-tertiary-fixed text-on-tertiary-fixed font-caption-xs text-caption-xs font-bold rounded hover:bg-tertiary-container hover:text-on-tertiary transition-all"
                                    type="button"
                                  >
                                    Cek SPK
                                  </button>
                                ) : (
                                  <button
                                    aria-label="Lihat Telemetri"
                                    className="p-1.5 rounded-lg text-primary hover:bg-primary-fixed transition-colors"
                                    type="button"
                                  >
                                    <span className="material-symbols-outlined text-[18px]">
                                      visibility
                                    </span>
                                  </button>
                                )}
                                <button
                                  aria-label="Menu Aksi"
                                  className="p-1.5 rounded-lg text-outline hover:bg-surface-container transition-colors"
                                  type="button"
                                >
                                  <span className="material-symbols-outlined text-[18px]">
                                    more_vert
                                  </span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="p-space-md bg-surface-container flex items-center justify-between">
                    <span className="font-caption-xs text-caption-xs text-on-surface-variant">
                      Menampilkan 1 - {filtered.length} dari 48 Armada
                    </span>
                    <div className="flex items-center gap-space-2xs">
                      <button
                        className="px-2.5 py-1 rounded bg-surface-container-lowest text-outline font-caption-xs text-caption-xs hover:text-primary"
                        type="button"
                      >
                        Sebelumnya
                      </button>
                      <button
                        className="px-2.5 py-1 rounded bg-primary-container text-on-primary font-caption-xs text-caption-xs font-semibold"
                        type="button"
                      >
                        1
                      </button>
                      <button
                        className="px-2.5 py-1 rounded bg-surface-container-lowest text-on-surface-variant font-caption-xs text-caption-xs hover:bg-surface-container"
                        type="button"
                      >
                        2
                      </button>
                      <button
                        className="px-2.5 py-1 rounded bg-surface-container-lowest text-on-surface-variant font-caption-xs text-caption-xs hover:bg-surface-container"
                        type="button"
                      >
                        3
                      </button>
                      <button
                        className="px-2.5 py-1 rounded bg-surface-container-lowest text-outline font-caption-xs text-caption-xs hover:text-primary"
                        type="button"
                      >
                        Berikutnya
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
                  <div className="flex items-center justify-between mb-space-md">
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-secondary text-[20px]">
                        calendar_view_week
                      </span>
                      <h3 className="font-title-md text-title-md text-primary font-bold font-jakarta">
                        Timeline Ketersediaan Unit (48 Jam ke Depan)
                      </h3>
                    </div>
                    <span className="font-caption-xs text-caption-xs text-on-surface-variant">
                      Zona Waktu: WIB (GMT+7)
                    </span>
                  </div>
                  <div className="space-y-space-sm">
                    <div className="flex items-center gap-space-sm text-caption-xs font-data-mono">
                      <div className="w-28 truncate font-bold text-on-surface">B 1842 VLZ</div>
                      <div className="flex-1 bg-surface-container rounded-md h-7 flex items-center p-1 relative">
                        <div
                          className="h-full bg-emerald-500/20 text-emerald-800 rounded px-2 flex items-center font-label-sm text-caption-xs font-semibold"
                          style={{ width: '100%' }}
                        >
                          Standby Pool Siap Booking Instant
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-space-sm text-caption-xs font-data-mono">
                      <div className="w-28 truncate font-bold text-on-surface">B 2099 KFL</div>
                      <div className="flex-1 bg-surface-container rounded-md h-7 flex items-center p-1 relative">
                        <div
                          className="h-full bg-primary-container text-on-primary rounded px-2 flex items-center font-label-sm text-caption-xs font-semibold"
                          style={{ width: '65%' }}
                        >
                          Disewa s.d Besok 14:00 (PT Surya)
                        </div>
                        <div
                          className="h-full bg-surface-container-highest text-on-surface-variant rounded px-1.5 flex items-center ml-1 text-[10px]"
                          style={{ width: '32%' }}
                        >
                          Buffer Cuci/Cek
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-space-sm text-caption-xs font-data-mono">
                      <div className="w-28 truncate font-bold text-on-surface">D 1455 ACD</div>
                      <div className="flex-1 bg-surface-container rounded-md h-7 flex items-center p-1 relative">
                        <div
                          className="h-full bg-primary-container text-on-primary rounded px-2 flex items-center font-label-sm text-caption-xs font-semibold"
                          style={{ width: '40%' }}
                        >
                          VIP Soetta (20:00)
                        </div>
                        <div
                          className="h-full bg-tertiary-fixed text-on-tertiary-fixed rounded px-2 flex items-center ml-1 font-semibold text-[10px]"
                          style={{ width: '55%' }}
                        >
                          Confirmed Sewa Baru: Kedutaan 07:00
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-space-md">
                <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">
                  <div className="p-space-md flex items-center justify-between border-b border-surface-container">
                    <div className="flex items-center gap-space-xs">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <h3 className="font-title-md text-title-md text-primary font-bold font-jakarta">
                        Pelacakan Satelit Real-Time
                      </h3>
                    </div>
                    <div className="flex items-center gap-space-2xs bg-surface-container rounded-lg p-0.5">
                      <button
                        className="px-2 py-0.5 rounded text-[11px] font-semibold bg-surface-container-lowest text-primary shadow-xs"
                        type="button"
                      >
                        Peta
                      </button>
                      <button
                        className="px-2 py-0.5 rounded text-[11px] font-medium text-on-surface-variant hover:text-on-surface"
                        type="button"
                      >
                        Satelit
                      </button>
                      <button
                        className="px-2 py-0.5 rounded text-[11px] font-medium text-on-surface-variant hover:text-on-surface"
                        type="button"
                      >
                        Geofence
                      </button>
                    </div>
                  </div>
                  <div className="relative w-full h-80 overflow-hidden group">
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCPnyNY-Y0bxlU37_mwL-7DKHSrdHYcLfiY9ZKIEsDTBmWSOL29xfslP6FdbdfEtPAncY7cjZnIDyl2Np5jOq4z7d5aYtneReQ_AyqvjI3L-9qCGaZC5qvz3QELEmGU7NvF_US-eAi_8w4ZpiSi0gDKmmTO1eprUfXy46usfMbWTJ0RKYc3NX0gEkSWx8TPrlVeEXUqAWIdtfzOSvRn1X3JTa_Lj2fffvBhoI5r-kR6FzWZja5IDpeP')",
                      }}
                    />
                    <div className="absolute inset-0 bg-primary/10 pointer-events-none" />
                    <div className="absolute top-4 left-4 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-md flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-primary">
                        radar
                      </span>
                      <span className="font-caption-xs text-caption-xs font-bold text-on-surface">
                        Radar DKI & Sekitarnya
                      </span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    </div>
                    <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform cursor-pointer">
                      <div className="relative flex flex-col items-center">
                        <div className="bg-primary-container text-on-primary font-caption-xs text-[10px] font-bold px-2 py-0.5 rounded-md shadow-lg whitespace-nowrap mb-1 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed" />
                          B 2099 KFL • 78 km/h
                        </div>
                        <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-xl ring-4 ring-white/50">
                          <span className="material-symbols-outlined text-[18px]">
                            directions_car
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-2/3 right-1/4 -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform cursor-pointer">
                      <div className="relative flex flex-col items-center">
                        <div className="bg-surface-container-lowest text-primary font-caption-xs text-[10px] font-bold px-2 py-0.5 rounded-md shadow-lg whitespace-nowrap mb-1 flex items-center gap-1 border border-primary/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          B 1842 VLZ • Siap
                        </div>
                        <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xl ring-4 ring-white/50">
                          <span className="material-symbols-outlined text-[18px]">
                            local_parking
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-1/2 right-1/3 -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform cursor-pointer">
                      <div className="relative flex flex-col items-center">
                        <div className="bg-error text-on-error font-caption-xs text-[10px] font-bold px-2 py-0.5 rounded-md shadow-lg whitespace-nowrap mb-1 flex items-center gap-1 animate-pulse">
                          <span className="material-symbols-outlined text-[10px]">warning</span>
                          B 3012 SHJ • 115 km/h
                        </div>
                        <div className="w-8 h-8 rounded-full bg-error text-white flex items-center justify-center shadow-xl ring-4 ring-error-container">
                          <span className="material-symbols-outlined text-[18px]">speed</span>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 flex flex-col gap-1 bg-surface-container-lowest/90 backdrop-blur-md p-1 rounded-lg shadow-md">
                      <button
                        aria-label="Perbesar Peta"
                        className="w-7 h-7 flex items-center justify-center text-on-surface hover:bg-surface-container rounded"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">add</span>
                      </button>
                      <div className="h-px bg-outline-variant/30" />
                      <button
                        aria-label="Perkecil Peta"
                        className="w-7 h-7 flex items-center justify-center text-on-surface hover:bg-surface-container rounded"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">remove</span>
                      </button>
                    </div>
                  </div>
                  <div className="p-space-md bg-surface-container flex items-center justify-between">
                    <div className="flex items-center gap-space-sm text-caption-xs flex-wrap">
                      <span className="flex items-center gap-1 font-semibold text-on-surface">
                        <span className="w-2 h-2 rounded-full bg-primary-container" /> Bergerak
                        (12)
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-on-surface">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" /> Parkir Standby
                        (32)
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-error">
                        <span className="w-2 h-2 rounded-full bg-error" /> Insiden / Speed (1)
                      </span>
                    </div>
                    <button
                      className="text-primary font-label-sm text-label-sm font-bold hover:underline flex items-center gap-0.5"
                      type="button"
                    >
                      Layar Penuh
                      <span className="material-symbols-outlined text-[16px]">fullscreen</span>
                    </button>
                  </div>
                </div>

                <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-space-xs">
                      <div className="w-8 h-8 rounded-lg bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
                        <span className="material-symbols-outlined text-[20px]">
                          notification_important
                        </span>
                      </div>
                      <div>
                        <h3 className="font-title-md text-title-md text-primary font-bold font-jakarta">
                          Peringatan Pemeliharaan & Dokumen
                        </h3>
                        <p className="font-caption-xs text-caption-xs text-outline">
                          Tindakan pencegahan downtime operasional armada
                        </p>
                      </div>
                    </div>
                    <span className="font-caption-xs text-caption-xs font-bold bg-error-container text-on-error-container px-2 py-0.5 rounded-full">
                      3 Mendesak
                    </span>
                  </div>
                  <div className="flex flex-col gap-space-sm">
                    <div className="p-space-md rounded-xl bg-amber-500/10 flex flex-col gap-space-xs">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-amber-700 text-[20px]">
                            oil_barrel
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-label-md text-label-md font-bold text-on-surface">
                                Toyota Avanza Veloz
                              </span>
                              <span className="font-data-mono text-caption-xs bg-surface-container-lowest px-1.5 py-0.2 rounded font-bold text-primary">
                                B 2391 PZO
                              </span>
                            </div>
                            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                              Jatuh tempo ganti oli mesin & filter dalam{' '}
                              <strong className="text-amber-800">150 km</strong> lagi (Odo: 49,850
                              km).
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-end gap-space-xs mt-space-2xs">
                        <button
                          className="px-space-sm py-1 rounded-lg bg-surface-container-lowest text-on-surface-variant font-caption-xs text-caption-xs font-semibold hover:bg-surface-container"
                          type="button"
                        >
                          Tunda 3 Hari
                        </button>
                        <button
                          className="px-space-md py-1 rounded-lg bg-primary-container text-on-primary font-caption-xs text-caption-xs font-bold hover:bg-primary transition-all shadow-xs flex items-center gap-1"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            calendar_add_on
                          </span>
                          Buat Jadwal Servis
                        </button>
                      </div>
                    </div>
                    <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-secondary text-[20px]">
                            assignment_late
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-label-md text-label-md font-bold text-on-surface">
                                Hyundai Stargazer Prime
                              </span>
                              <span className="font-data-mono text-caption-xs bg-surface-container-lowest px-1.5 py-0.2 rounded font-bold text-primary">
                                B 1104 TRK
                              </span>
                            </div>
                            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                              Pajak Tahunan STNK jatuh tempo{' '}
                              <strong className="text-secondary font-bold">18 Mei 2026</strong>{' '}
                              (Tersisa 11 hari kerja).
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-end gap-space-xs mt-space-2xs">
                        <button
                          className="px-space-md py-1 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed font-caption-xs text-caption-xs font-bold hover:bg-tertiary-container hover:text-on-tertiary transition-all shadow-xs flex items-center gap-1"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[14px]">fact_check</span>
                          Proses Pajak Samsat
                        </button>
                      </div>
                    </div>
                    <div className="p-space-md rounded-xl bg-error-container/40 flex flex-col gap-space-xs">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-error text-[20px]">
                            crisis_alert
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-label-md text-label-md font-bold text-error">
                                Mitsubishi Xpander Ultimate
                              </span>
                              <span className="font-data-mono text-caption-xs bg-surface-container-lowest px-1.5 py-0.2 rounded font-bold text-error">
                                B 3012 SHJ
                              </span>
                            </div>
                            <p className="font-body-sm text-body-sm text-on-error-container mt-0.5">
                              <strong>Peringatan Kecepatan (Over-Speed):</strong> 115 km/h
                              terdeteksi di Tol Cipali KM 102 (Batas: 100 km/h).
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-space-2xs pt-1 border-t border-error/10">
                        <span className="font-caption-xs text-caption-xs text-error font-medium">
                          Pengemudi: Rian Santoso (0812-9988-xxxx)
                        </span>
                        <button
                          className="px-space-sm py-1 rounded-lg bg-error text-on-error font-caption-xs text-caption-xs font-bold hover:bg-red-700 transition-all flex items-center gap-1"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[14px]">call</span>
                          Hubungi Pengemudi
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}