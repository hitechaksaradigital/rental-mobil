import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import AdminHeader from './AdminHeader';
import AddVehicleModal from './AddVehicleModal';
import { fetchArmada } from './supabaseClient';

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
  booked: {
    pill: 'bg-secondary-fixed text-on-secondary',
    dot: 'bg-secondary',
    ping: false,
    label: 'Dipesan',
    icon: null,
  },
};

function StatusPill({ status }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES.available;
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

function fuelColor(pct) {
  if (pct >= 70) return 'bg-emerald-500';
  if (pct >= 40) return 'bg-amber-500';
  return 'bg-error';
}

export default function ManajemenArmada() {
  const [armada, setArmada] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [addOpen, setAddOpen] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchArmada();
      setArmada(data);
    } catch (err) {
      setError(err.message || 'Gagal memuat data dari Supabase');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = armada.filter((f) => {
    const text = `${f.name} ${f.plate} ${f.type}`.toLowerCase();
    if (query && !text.includes(query.toLowerCase())) return false;
    if (statusFilter !== 'all' && f.status !== statusFilter) return false;
    if (categoryFilter !== 'all' && f.category !== categoryFilter) return false;
    return true;
  });

  const total = armada.length;
  const counts = armada.reduce(
    (acc, a) => ({ ...acc, [a.status]: (acc[a.status] || 0) + 1 }),
    {}
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
                    {total} Unit Terdaftar
                  </span>
                  <span className="font-caption-xs text-caption-xs text-outline ml-space-3xs">
                    Tersinkronisasi
                  </span>
                </div>
                <button
                  className="h-10 px-space-md bg-surface-container-lowest text-primary font-label-md text-label-md rounded-xl shadow-sm hover:bg-surface-container-high transition-all flex items-center gap-space-xs"
                  onClick={load}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">sync</span>
                  <span>Refresh Data</span>
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-error-container/30 border border-error/20 rounded-xl p-space-md flex items-start gap-space-sm">
                <span className="material-symbols-outlined text-error">error</span>
                <div className="flex-1">
                  <p className="font-label-md text-label-md font-semibold text-error">
                    Gagal terhubung ke Supabase
                  </p>
                  <p className="font-body-sm text-body-sm text-on-error-container">{error}</p>
                  <p className="font-caption-xs text-caption-xs text-on-surface-variant mt-space-2xs">
                    Pastikan schema sudah dijalankan di Supabase SQL Editor dan tabel{' '}
                    <code className="px-1 py-0.5 bg-surface-container rounded">armada</code> sudah
                    ada.
                  </p>
                </div>
                <button
                  className="px-space-sm py-1 rounded-lg bg-error text-on-error text-caption-xs font-bold hover:bg-red-700"
                  onClick={load}
                  type="button"
                >
                  Coba Lagi
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md">
              <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm relative overflow-hidden group">
                <div className="flex items-center justify-between mb-space-sm">
                  <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[22px]">directions_car</span>
                  </div>
                  <span className="font-caption-xs text-caption-xs font-semibold px-space-xs py-space-3xs rounded-full bg-surface-container-high text-on-surface-variant">
                    Live Database
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-caption-xs text-caption-xs text-on-surface-variant uppercase font-medium tracking-wide">
                    Total Armada Terdaftar
                  </span>
                  <div className="flex items-baseline gap-space-xs mt-space-3xs">
                    <span className="font-headline-xl text-headline-xl text-primary font-bold font-jakarta">
                      {total}
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Unit Aktif
                    </span>
                  </div>
                  <div className="flex items-center gap-space-xs mt-space-sm pt-space-xs text-on-surface-variant flex-wrap">
                    <span className="inline-flex items-center gap-1 font-caption-xs text-caption-xs text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {counts.available || 0} Siap
                    </span>
                    <span className="inline-flex items-center gap-1 font-caption-xs text-caption-xs text-secondary bg-primary-fixed/40 px-1.5 py-0.5 rounded">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                      {counts.rented || 0} Sewa
                    </span>
                    <span className="inline-flex items-center gap-1 font-caption-xs text-caption-xs text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      {counts.service || 0} Servis
                    </span>
                    <span className="inline-flex items-center gap-1 font-caption-xs text-caption-xs text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded">
                      {counts.booked || 0} Booked
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-space-sm">
                  <div className="w-10 h-10 rounded-xl bg-secondary-fixed flex items-center justify-center text-primary-container">
                    <span className="material-symbols-outlined text-[22px]">speed</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-caption-xs text-caption-xs text-on-surface-variant uppercase font-medium tracking-wide">
                    Status Koneksi
                  </span>
                  <div className="flex items-baseline gap-space-xs mt-space-3xs">
                    <span className="font-headline-xl text-headline-xl text-primary font-bold font-jakarta">
                      {error ? 'Offline' : 'Online'}
                    </span>
                    <span className="font-label-sm text-label-sm text-outline">
                      Realtime
                    </span>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-2 mt-space-sm overflow-hidden">
                    <div
                      className={`h-2 rounded-full ${error ? 'bg-error' : 'bg-primary-container'}`}
                      style={{ width: error ? '30%' : '100%' }}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-space-sm">
                  <div className="w-10 h-10 rounded-xl bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
                    <span className="material-symbols-outlined text-[22px]">build_circle</span>
                  </div>
                  <span className="font-caption-xs text-caption-xs font-semibold px-space-xs py-space-3xs rounded-full bg-amber-50 text-amber-800">
                    Servis
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-caption-xs text-caption-xs text-on-surface-variant uppercase font-medium tracking-wide">
                    Dalam Perawatan
                  </span>
                  <div className="flex items-baseline gap-space-xs mt-space-3xs">
                    <span className="font-headline-xl text-headline-xl text-amber-700 font-bold font-jakarta">
                      {counts.service || 0}
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Unit
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-space-sm">
                  <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[22px]">local_gas_station</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-caption-xs text-caption-xs text-on-surface-variant uppercase font-medium tracking-wide">
                    Rata-rata BBM
                  </span>
                  <div className="flex items-baseline gap-space-xs mt-space-3xs">
                    <span className="font-headline-xl text-headline-xl text-primary font-bold font-jakarta">
                      {total > 0
                        ? Math.round(
                            armada.reduce((s, a) => s + (a.fuel_percent || 0), 0) / total
                          )
                        : 0}
                      %
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Kapasitas
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
                  <select
                    className="h-10 px-space-md pr-8 bg-surface-container-low text-on-surface font-label-md text-label-md rounded-xl appearance-none focus:outline-none cursor-pointer"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">Status: Semua</option>
                    <option value="available">Tersedia</option>
                    <option value="rented">Sedang Disewa</option>
                    <option value="service">Dalam Perawatan</option>
                    <option value="booked">Dipesan</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-outline text-[18px] pointer-events-none">
                    expand_more
                  </span>
                </div>
                <div className="relative">
                  <select
                    className="h-10 px-space-md pr-8 bg-surface-container-low text-on-surface font-label-md text-label-md rounded-xl appearance-none focus:outline-none cursor-pointer"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    <option value="all">Kategori: Semua</option>
                    <option value="mpv">MPV</option>
                    <option value="suv">SUV</option>
                    <option value="luxury">Luxury</option>
                    <option value="sedan">Sedan</option>
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
                  onClick={load}
                >
                  <span className="material-symbols-outlined text-[18px]">refresh</span>
                  <span>Refresh</span>
                </button>
                <button
                  className="h-10 px-space-md bg-primary-container text-on-primary font-label-md text-label-md rounded-xl flex items-center gap-space-xs shadow-md hover:bg-primary transition-all"
                  onClick={() => setAddOpen(true)}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">add_circle</span>
                  <span>+ Tambah Kendaraan Baru</span>
                </button>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
              <div className="p-space-lg flex items-center justify-between bg-surface-container-lowest">
                <div>
                  <h2 className="font-title-md text-title-md text-primary font-bold font-jakarta">
                    Daftar Inventaris Kendaraan
                  </h2>
                  <p className="font-caption-xs text-caption-xs text-on-surface-variant">
                    Menampilkan {filtered.length} dari {total} unit (data langsung dari Supabase)
                  </p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-surface-container-low text-on-surface-variant font-caption-xs text-caption-xs uppercase tracking-wider">
                      <th className="py-space-sm px-space-md">Kendaraan & Plat</th>
                      <th className="py-space-sm px-space-md">Status</th>
                      <th className="py-space-sm px-space-md">Odo & BBM</th>
                      <th className="py-space-sm px-space-md">Telematika</th>
                      <th className="py-space-sm px-space-md text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container">
                    {loading ? (
                      <tr>
                        <td colSpan="5" className="py-space-2xl text-center">
                          <div className="inline-flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant">
                            <span className="material-symbols-outlined animate-spin">
                              progress_activity
                            </span>
                            Memuat data dari Supabase…
                          </div>
                        </td>
                      </tr>
                    ) : filtered.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="py-space-2xl text-center">
                          <div className="flex flex-col items-center gap-space-sm">
                            <span className="material-symbols-outlined text-[40px] text-outline">
                              directions_car
                            </span>
                            <p className="font-label-md text-label-md text-on-surface-variant font-semibold">
                              Tidak ada unit yang cocok
                            </p>
                            <p className="font-caption-xs text-caption-xs text-outline">
                              Coba ubah filter atau tambah kendaraan baru
                            </p>
                            <button
                              className="mt-space-xs px-space-md py-1 rounded-lg bg-primary-container text-on-primary text-caption-xs font-bold hover:bg-primary"
                              onClick={() => setAddOpen(true)}
                              type="button"
                            >
                              + Tambah Kendaraan
                            </button>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filtered.map((f) => (
                        <tr
                          key={f.id}
                          className="hover:bg-primary-fixed/20 transition-colors group"
                        >
                          <td className="py-space-md px-space-md">
                            <div className="flex items-center gap-space-sm">
                              <img
                                className="w-12 h-12 rounded-lg object-cover shadow-sm flex-shrink-0 bg-surface-container"
                                alt={f.name}
                                src={
                                  f.image_url ||
                                  'https://via.placeholder.com/96x96/e2e2e2/7a7484?text=Car'
                                }
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
                                {Number(f.odometer_km || 0).toLocaleString('id-ID')} km
                              </span>
                              <div className="flex items-center gap-1.5 mt-1">
                                <div className="w-16 bg-surface-container rounded-full h-1.5 overflow-hidden">
                                  <div
                                    className={`h-1.5 rounded-full ${fuelColor(f.fuel_percent)}`}
                                    style={{ width: `${f.fuel_percent}%` }}
                                  />
                                </div>
                                <span className="font-caption-xs text-caption-xs text-on-surface-variant">
                                  {f.fuel_percent}%
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-space-md px-space-md">
                            <div className="flex flex-col">
                              {f.telematic_text ? (
                                <div
                                  className={`flex items-center gap-1 font-caption-xs text-caption-xs font-semibold ${f.telematic_color || 'text-on-surface'}`}
                                >
                                  <span className="material-symbols-outlined text-[14px]">
                                    {f.telematic_icon || 'near_me'}
                                  </span>
                                  <span>{f.telematic_text}</span>
                                </div>
                              ) : (
                                <span className="font-caption-xs text-caption-xs text-outline">
                                  -
                                </span>
                              )}
                              <span className="font-caption-xs text-caption-xs text-outline mt-0.5">
                                {f.stnk_expiry
                                  ? `STNK: ${new Date(f.stnk_expiry).toLocaleDateString('id-ID', {
                                      day: 'numeric',
                                      month: 'short',
                                      year: 'numeric',
                                    })}`
                                  : `Update: ${new Date(f.updated_at).toLocaleDateString('id-ID')}`}
                              </span>
                            </div>
                          </td>
                          <td className="py-space-md px-space-md text-right whitespace-nowrap">
                            <button
                              aria-label="Lihat Telemetri"
                              className="p-1.5 rounded-lg text-primary hover:bg-primary-fixed transition-colors"
                              type="button"
                            >
                              <span className="material-symbols-outlined text-[18px]">
                                visibility
                              </span>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              {!loading && filtered.length > 0 && (
                <div className="p-space-md bg-surface-container flex items-center justify-between">
                  <span className="font-caption-xs text-caption-xs text-on-surface-variant">
                    Menampilkan 1 - {filtered.length} dari {total} Armada
                  </span>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <AddVehicleModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onCreated={() => {
          load();
        }}
      />
    </div>
  );
}