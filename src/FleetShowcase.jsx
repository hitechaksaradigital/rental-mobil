import { useState } from 'react';
import CARS from './data';

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-space-3xs text-tertiary">
      <span
        className="material-symbols-outlined text-[16px] text-tertiary fill-current"
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        star
      </span>
      <span className="font-label-sm text-label-sm font-semibold text-on-surface">{rating}</span>
    </div>
  );
}

function CarCard({ car, onBook, onDetail }) {
  return (
    <article className="group flex flex-col bg-surface-container-lowest rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative w-full h-52 overflow-hidden bg-surface-container-low">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          alt={car.name}
          src={car.img}
        />
        <div className="absolute top-3 left-3 flex gap-space-2xs">
          <span
            className={`px-space-xs py-space-3xs rounded-md font-caption-xs text-caption-xs font-bold shadow-sm ${
              car.key === 'innova-zenix'
                ? 'bg-surface-container-lowest/90 backdrop-blur-md text-primary font-semibold'
                : car.key === 'fortuner-gr'
                ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                : car.key === 'alphard-vip'
                ? 'bg-primary-fixed text-on-primary-fixed'
                : 'bg-secondary-fixed text-on-secondary-fixed'
            }`}
          >
            {car.badge}
          </span>
          <span
            className={`px-space-xs py-space-3xs rounded-md font-caption-xs text-caption-xs font-semibold ${car.badge2.color}`}
          >
            {car.badge2.text}
          </span>
        </div>
        <div className="absolute bottom-3 right-3 px-space-xs py-space-3xs rounded-md bg-surface-container-lowest/90 backdrop-blur-md font-data-mono text-data-mono text-primary font-semibold flex items-center gap-space-3xs">
          <span className={`material-symbols-outlined text-[14px] ${car.cornerBadge.color}`}>
            {car.cornerBadge.icon}
          </span>{' '}
          {car.cornerBadge.label}
        </div>
      </div>

      <div className="p-space-lg flex flex-col flex-grow justify-between gap-space-md">
        <div className="flex flex-col gap-space-2xs">
          <div className="flex items-center justify-between">
            <span className="font-caption-xs text-caption-xs uppercase tracking-wider text-secondary font-semibold">
              {car.catLabel}
            </span>
            <div className="flex items-center gap-space-3xs">
              <Stars rating={car.rating} />
              <span className="font-caption-xs text-caption-xs text-on-surface-variant">
                ({car.reviews})
              </span>
            </div>
          </div>
          <h3 className="font-title-md text-title-md text-on-surface font-bold font-jakarta">
            {car.name}
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">
            {car.desc}
          </p>
        </div>

        <div className="grid grid-cols-4 gap-space-2xs py-space-xs bg-surface-container-low rounded-xl px-space-xs text-center">
          {car.specs.map((s, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                {s.icon}
              </span>
              <span className="font-caption-xs text-caption-xs text-on-surface font-medium">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-space-xs pt-space-xs">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="font-caption-xs text-caption-xs text-on-surface-variant block">
                {car.priceLabel}
              </span>
              <span className="font-headline-lg text-headline-lg text-primary-container font-bold font-jakarta">
                Rp {Number(car.price).toLocaleString('id-ID')}
              </span>
              <span className="font-caption-xs text-caption-xs text-on-surface-variant">
                {car.priceUnit}
              </span>
            </div>
            <div className="text-right">
              <span className="font-caption-xs text-caption-xs text-secondary font-medium">
                {car.extra}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-space-xs mt-space-2xs">
            <button
              className="w-full py-space-xs rounded-lg bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold text-center hover:bg-primary transition-all"
              onClick={() => onBook(car)}
              type="button"
            >
              Pesan Sekarang
            </button>
            <button
              className="w-full py-space-xs rounded-lg bg-surface-container-high text-on-surface font-label-sm text-label-sm font-medium text-center hover:bg-surface-variant transition-all"
              onClick={() => onDetail(car)}
              type="button"
            >
              Detail Unit
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function FleetShowcase({ onBook, onDetail }) {
  const [filter, setFilter] = useState('all');

  const filters = [
    { key: 'all', label: 'Semua (48)' },
    { key: 'mpv', label: 'Family MPV (18)' },
    { key: 'suv', label: 'Premium SUV (12)' },
    { key: 'vip', label: 'Luxury VIP (9)' },
    { key: 'ev', label: 'City Car / EV (9)' },
  ];

  const visible = filter === 'all' ? CARS : CARS.filter((c) => c.cat === filter);

  return (
    <section className="w-full max-w-[1680px] mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin-desktop py-space-3xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
        <div className="flex flex-col gap-space-2xs">
          <div className="flex items-center gap-space-xs text-secondary font-label-sm text-label-sm font-semibold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[18px]">directions_car</span>
            <span>Armada Pilihan Velocis</span>
          </div>
          <h2 className="font-headline-xl text-headline-xl text-on-surface font-jakarta">
            Koleksi Kendaraan Siap Jalan
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
            Semua unit berumur di bawah 3 tahun, transmisi prima, dan telah disterilisasi menyeluruh
            sebelum serah terima.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-space-xs overflow-x-auto pb-space-2xs">
          {filters.map((f) => (
            <button
              key={f.key}
              className={`px-space-md py-space-xs rounded-full font-label-sm text-label-sm transition-all ${
                filter === f.key
                  ? 'bg-primary-container text-on-primary font-semibold shadow-sm'
                  : 'bg-surface-container-low text-on-surface hover:bg-surface-container-high font-medium'
              }`}
              onClick={() => setFilter(f.key)}
              type="button"
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg">
        {visible.map((car) => (
          <CarCard key={car.key} car={car} onBook={onBook} onDetail={onDetail} />
        ))}
      </div>

      <div className="mt-space-2xl p-space-lg rounded-2xl bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-md">
          <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[28px]">garage_home</span>
          </div>
          <div>
            <h4 className="font-title-md text-title-md text-on-surface font-semibold font-jakarta">
              Membutuhkan Tipe Unit Lainnya?
            </h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Tersedia Avanza, HiAce Premio Luxury 14-Seat, BMW Seri 5, hingga Mercedes-Benz S-Class.
            </p>
          </div>
        </div>
        <a
          className="px-space-lg py-space-xs rounded-xl bg-surface-container-lowest text-primary-container font-label-md text-label-md font-semibold hover:bg-primary-container hover:text-on-primary transition-all shadow-sm"
          href="#"
        >
          Lihat Seluruh 48 Armada →
        </a>
      </div>
    </section>
  );
}