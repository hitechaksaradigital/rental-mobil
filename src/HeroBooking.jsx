import { useState } from 'react';

export default function HeroBooking({ onSearch }) {
  const [mode, setMode] = useState('self');
  const [customReturn, setCustomReturn] = useState(false);
  const [startDate, setStartDate] = useState('2026-04-10');
  const [endDate, setEndDate] = useState('2026-04-13');

  const days = (() => {
    if (!startDate || !endDate) return '—';
    const s = new Date(startDate);
    const e = new Date(endDate);
    const diff = Math.ceil((e - s) / (1000 * 60 * 60 * 24));
    if (diff > 0) return `${diff} Hari (${diff * 24} Jam)`;
    if (diff === 0) return '1 Hari (24 Jam)';
    return 'Tanggal tidak valid';
  })();

  const tabBase =
    'flex items-center gap-space-xs px-space-lg py-space-sm rounded-lg font-label-md text-label-md font-semibold transition-all';
  const tabActive = `${tabBase} bg-primary-container text-on-primary shadow-md`;
  const tabIdle = `${tabBase} text-on-surface-variant hover:text-on-surface`;

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-surface-container-low via-surface to-surface-container-low/40 pt-space-xl pb-space-3xl">
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary-container/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[30rem] h-[30rem] rounded-full bg-secondary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-tertiary-fixed/15 blur-2xl pointer-events-none" />

      <div className="relative w-full max-w-[1680px] mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-end mb-space-2xl">
          <div className="lg:col-span-8 flex flex-col gap-space-sm">
            <div className="inline-flex items-center gap-space-xs self-start px-space-md py-space-3xs rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm shadow-sm">
              <span className="material-symbols-outlined text-[16px] text-primary-container">
                verified_user
              </span>
              <span>Platform Sewa Mobil & Layanan Mobilitas Terpercaya No. 1</span>
            </div>
            <h1 className="font-display-lg text-display-lg text-primary tracking-tight leading-tight font-jakarta">
              Sewa Mobil Nyaman, Cepat & Terpercaya untuk Segala Kebutuhan Perjalanan
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl">
              Pilihan lepas kunci tanpa ribet atau dengan sopir eksekutif berpengalaman. Unit
              bersih higienis, terawat berkala di bengkel resmi, dengan jaminan tiba tepat waktu di
              lokasi Anda.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-wrap lg:flex-col gap-space-sm justify-start lg:items-end">
            <div className="flex items-center gap-space-sm bg-surface-container-lowest px-space-md py-space-sm rounded-xl shadow-md">
              <div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center text-primary-container">
                <span className="material-symbols-outlined text-[24px]">speed</span>
              </div>
              <div>
                <p className="font-headline-lg text-headline-lg text-primary leading-none font-jakarta font-bold">
                  15 Menit
                </p>
                <p className="font-caption-xs text-caption-xs text-on-surface-variant">
                  Verifikasi Dokumen Cepat
                </p>
              </div>
            </div>
            <div className="flex items-center gap-space-sm bg-surface-container-lowest px-space-md py-space-sm rounded-xl shadow-md">
              <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[24px]">workspace_premium</span>
              </div>
              <div>
                <p className="font-headline-lg text-headline-lg text-secondary leading-none font-jakarta font-bold">
                  100% Prima
                </p>
                <p className="font-caption-xs text-caption-xs text-on-surface-variant">
                  Inspeksi Standar 40 Titik
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full bg-surface-container-lowest rounded-2xl shadow-xl overflow-hidden p-space-md md:p-space-xl">
          <div className="flex flex-wrap items-center justify-between gap-space-md pb-space-lg mb-space-lg">
            <div className="inline-flex p-space-3xs rounded-xl bg-surface-container-low" role="tablist">
              <button
                className={mode === 'self' ? tabActive : tabIdle}
                onClick={() => setMode('self')}
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">key</span>
                <span>Lepas Kunci (Self-Drive)</span>
              </button>
              <button
                className={mode === 'driver' ? tabActive : tabIdle}
                onClick={() => setMode('driver')}
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">badge</span>
                <span>Dengan Sopir (With Driver)</span>
              </button>
            </div>
            <div className="flex items-center gap-space-md">
              <label className="inline-flex items-center gap-space-xs cursor-pointer select-none">
                <input
                  className="w-4 h-4 rounded text-primary-container focus:ring-secondary accent-primary-container"
                  checked={customReturn}
                  onChange={(e) => setCustomReturn(e.target.checked)}
                  type="checkbox"
                />
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Lokasi pengembalian berbeda
                </span>
              </label>
              <div className="h-4 w-[1px] bg-surface-container-highest hidden sm:block" />
              <span className="hidden sm:inline-flex items-center gap-space-2xs text-secondary font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[16px]">bolt</span> Instant
                Confirmation
              </span>
            </div>
          </div>

          <form
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-space-md items-end"
            onSubmit={(e) => {
              e.preventDefault();
              onSearch?.();
            }}
          >
            <div className="lg:col-span-3 flex flex-col gap-space-2xs">
              <label className="font-label-sm text-label-sm text-on-surface-variant font-semibold flex items-center gap-space-2xs">
                <span className="material-symbols-outlined text-[18px] text-primary-container">
                  location_on
                </span>
                <span>Lokasi Penjemputan</span>
              </label>
              <div className="relative">
                <select className="w-full h-12 pl-space-md pr-space-xl rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary cursor-pointer appearance-none">
                  <option value="cgk">Bandara Soekarno-Hatta (T1/T2/T3)</option>
                  <option value="hlp">Bandara Halim Perdanakusuma</option>
                  <option selected value="scbd">
                    Sudirman Central Business District (SCBD)
                  </option>
                  <option value="gbr">Stasiun Gambir / Monas Area</option>
                  <option value="bdo">Bandung Pool Pasteur Express</option>
                  <option value="dps">Bandara Internasional I Gusti Ngurah Rai (Bali)</option>
                  <option value="custom">Alamat Khusus / Antar Hotel & Rumah</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-3.5 text-on-surface-variant pointer-events-none text-[20px]">
                  expand_more
                </span>
              </div>
            </div>

            {customReturn && (
              <div className="lg:col-span-3 flex flex-col gap-space-2xs">
                <label className="font-label-sm text-label-sm text-on-surface-variant font-semibold flex items-center gap-space-2xs">
                  <span className="material-symbols-outlined text-[18px] text-secondary">
                    pin_drop
                  </span>
                  <span>Lokasi Pengembalian</span>
                </label>
                <div className="relative">
                  <select className="w-full h-12 pl-space-md pr-space-xl rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary cursor-pointer appearance-none">
                    <option value="same">Sama dengan lokasi jemput</option>
                    <option value="cgk">Bandara Soekarno-Hatta (CGK)</option>
                    <option value="hlp">Bandara Halim Perdanakusuma (HLP)</option>
                    <option value="scbd">SCBD Mega Kuningan Office</option>
                    <option value="dps">Pool Kuta Central Parkir (Bali)</option>
                    <option value="home">Ambil Kembali di Kediaman/Hotel</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-3.5 text-on-surface-variant pointer-events-none text-[20px]">
                    expand_more
                  </span>
                </div>
              </div>
            )}

            <div className="lg:col-span-3 flex flex-col gap-space-2xs">
              <label className="font-label-sm text-label-sm text-on-surface-variant font-semibold flex items-center justify-between">
                <span className="flex items-center gap-space-2xs">
                  <span className="material-symbols-outlined text-[18px] text-primary-container">
                    calendar_today
                  </span>
                  <span>Mulai Sewa</span>
                </span>
                <span className="font-caption-xs text-caption-xs text-primary-container font-semibold">
                  WIB
                </span>
              </label>
              <div className="grid grid-cols-2 gap-space-xs">
                <input
                  className="h-12 px-space-xs md:px-space-sm rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary cursor-pointer"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                  className="h-12 px-space-xs md:px-space-sm rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary cursor-pointer"
                  type="time"
                  defaultValue="09:00"
                />
              </div>
            </div>

            <div className="lg:col-span-3 flex flex-col gap-space-2xs">
              <label className="font-label-sm text-label-sm text-on-surface-variant font-semibold flex items-center justify-between">
                <span className="flex items-center gap-space-2xs">
                  <span className="material-symbols-outlined text-[18px] text-primary-container">
                    event_available
                  </span>
                  <span>Selesai Sewa</span>
                </span>
                <span className="font-caption-xs text-caption-xs px-space-xs py-space-3xs rounded-full bg-secondary-fixed text-on-secondary-fixed font-semibold">
                  {days}
                </span>
              </label>
              <div className="grid grid-cols-2 gap-space-xs">
                <input
                  className="h-12 px-space-xs md:px-space-sm rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary cursor-pointer"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
                <input
                  className="h-12 px-space-xs md:px-space-sm rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary cursor-pointer"
                  type="time"
                  defaultValue="09:00"
                />
              </div>
            </div>

            <div
              className={`lg:col-span-3 flex flex-col justify-end ${
                customReturn ? 'lg:col-span-12' : ''
              }`}
            >
              <button
                className="w-full h-12 px-space-lg rounded-xl bg-primary-container text-on-primary font-label-md text-label-md font-bold flex items-center justify-center gap-space-xs shadow-lg shadow-primary-container/20 hover:bg-primary transition-all active:scale-[0.98]"
                type="submit"
              >
                <span className="material-symbols-outlined text-[20px] text-tertiary-fixed">
                  search
                </span>
                <span>Cari Unit Armada</span>
              </button>
            </div>
          </form>

          <div className="mt-space-lg pt-space-md flex flex-wrap items-center justify-between gap-space-sm bg-surface-container-low/60 -mx-space-md md:-mx-space-xl -mb-space-md md:-mb-space-xl px-space-md md:px-space-xl py-space-md rounded-b-2xl">
            <div className="flex flex-wrap items-center gap-space-md text-on-surface-variant">
              <span className="inline-flex items-center gap-space-2xs font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[18px] text-primary-container">
                  sanitizer
                </span>{' '}
                Jaminan Unit Bersih & Bebas Bau Rokok
              </span>
              <span className="inline-flex items-center gap-space-2xs font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[18px] text-secondary">security</span>{' '}
                Asuransi All-Risk & Proteksi Bencana
              </span>
              <span className="inline-flex items-center gap-space-2xs font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[18px] text-tertiary">
                  check_circle
                </span>{' '}
                Tanpa Biaya Tersembunyi
              </span>
            </div>
            <div className="inline-flex items-center gap-space-xs text-primary-container font-label-sm text-label-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span>42 Unit Ready Hari Ini di Jabodetabek</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}