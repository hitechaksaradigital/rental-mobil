import { useState } from 'react';
import { insertArmada } from './supabaseClient';

const CATEGORIES = [
  { value: 'mpv', label: 'MPV & Family Van' },
  { value: 'suv', label: 'SUV & Cross 4WD' },
  { value: 'luxury', label: 'Luxury & Executive' },
  { value: 'sedan', label: 'Sedan Premium' },
];

const INITIAL = {
  name: '',
  plate: '',
  type: '',
  category: 'mpv',
  status: 'available',
  odometer_km: 0,
  fuel_percent: 100,
  image_url: '',
  stnk_expiry: '',
  telematic_text: 'Parkir Pool (0 km/h)',
  telematic_icon: 'near_me',
  telematic_color: 'text-emerald-700',
};

export default function AddVehicleModal({ open, onClose, onCreated }) {
  const [form, setForm] = useState(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  if (!open) return null;

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const payload = {
        name: form.name.trim(),
        plate: form.plate.trim().toUpperCase(),
        type: form.type.trim(),
        category: form.category,
        status: form.status,
        odometer_km: Number(form.odometer_km) || 0,
        fuel_percent: Math.min(100, Math.max(0, Number(form.fuel_percent) || 0)),
        image_url: form.image_url.trim() || null,
        stnk_expiry: form.stnk_expiry || null,
        telematic_icon: form.telematic_icon.trim() || 'near_me',
        telematic_text: form.telematic_text.trim() || null,
        telematic_color: form.telematic_color.trim() || null,
      };
      if (!payload.name || !payload.plate || !payload.type) {
        throw new Error('Nama, plat, dan tipe kendaraan wajib diisi.');
      }
      const created = await insertArmada(payload);
      onCreated?.(created);
      setForm(INITIAL);
      onClose();
    } catch (err) {
      setError(err.message || 'Gagal menyimpan kendaraan');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm" />
      <div
        className="relative bg-surface-container-lowest rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-space-lg border-b border-surface-container flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">add_circle</span>
            </div>
            <div>
              <h3 className="font-headline-lg text-headline-lg text-primary font-jakarta font-bold">
                Tambah Kendaraan Baru
              </h3>
              <p className="font-caption-xs text-caption-xs text-on-surface-variant">
                Data akan tersimpan ke database Supabase
              </p>
            </div>
          </div>
          <button
            className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high"
            onClick={onClose}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-space-lg overflow-y-auto flex flex-col gap-space-md">
          {error && (
            <div className="p-space-sm rounded-lg bg-error-container/30 text-error font-label-sm text-label-sm font-semibold flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-[18px]">error</span>
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
            <div className="flex flex-col gap-space-2xs sm:col-span-2">
              <label className="font-label-sm text-label-sm font-semibold text-on-surface-variant">
                Nama Kendaraan *
              </label>
              <input
                className="h-11 px-space-md rounded-xl bg-surface-container-low font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary-container"
                placeholder="Toyota Innova Zenix Q Hybrid"
                value={form.name}
                onChange={update('name')}
                required
              />
            </div>

            <div className="flex flex-col gap-space-2xs">
              <label className="font-label-sm text-label-sm font-semibold text-on-surface-variant">
                Plat Nomor *
              </label>
              <input
                className="h-11 px-space-md rounded-xl bg-surface-container-low font-data-mono text-data-mono font-bold focus:outline-none focus:ring-2 focus:ring-secondary-container uppercase"
                placeholder="B 1842 VLZ"
                value={form.plate}
                onChange={update('plate')}
                required
              />
            </div>

            <div className="flex flex-col gap-space-2xs">
              <label className="font-label-sm text-label-sm font-semibold text-on-surface-variant">
                Tipe / Tahun *
              </label>
              <input
                className="h-11 px-space-md rounded-xl bg-surface-container-low font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary-container"
                placeholder="MPV 2024"
                value={form.type}
                onChange={update('type')}
                required
              />
            </div>

            <div className="flex flex-col gap-space-2xs">
              <label className="font-label-sm text-label-sm font-semibold text-on-surface-variant">
                Kategori
              </label>
              <div className="relative">
                <select
                  className="w-full h-11 px-space-md pr-space-xl rounded-xl bg-surface-container-low font-body-md text-body-md appearance-none focus:outline-none focus:ring-2 focus:ring-secondary-container cursor-pointer"
                  value={form.category}
                  onChange={update('category')}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-3 top-3 text-on-surface-variant pointer-events-none text-[18px]">
                  expand_more
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-space-2xs">
              <label className="font-label-sm text-label-sm font-semibold text-on-surface-variant">
                Status Awal
              </label>
              <div className="relative">
                <select
                  className="w-full h-11 px-space-md pr-space-xl rounded-xl bg-surface-container-low font-body-md text-body-md appearance-none focus:outline-none focus:ring-2 focus:ring-secondary-container cursor-pointer"
                  value={form.status}
                  onChange={update('status')}
                >
                  <option value="available">Tersedia (Ready)</option>
                  <option value="rented">Sedang Disewa</option>
                  <option value="service">Dalam Perawatan</option>
                  <option value="booked">Dipesan / Reservasi</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-3 text-on-surface-variant pointer-events-none text-[18px]">
                  expand_more
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-space-2xs">
              <label className="font-label-sm text-label-sm font-semibold text-on-surface-variant">
                Odometer (km)
              </label>
              <input
                className="h-11 px-space-md rounded-xl bg-surface-container-low font-data-mono text-data-mono focus:outline-none focus:ring-2 focus:ring-secondary-container"
                type="number"
                min="0"
                value={form.odometer_km}
                onChange={update('odometer_km')}
              />
            </div>

            <div className="flex flex-col gap-space-2xs">
              <label className="font-label-sm text-label-sm font-semibold text-on-surface-variant">
                Bahan Bakar (%)
              </label>
              <input
                className="h-11 px-space-md rounded-xl bg-surface-container-low font-data-mono text-data-mono focus:outline-none focus:ring-2 focus:ring-secondary-container"
                type="number"
                min="0"
                max="100"
                value={form.fuel_percent}
                onChange={update('fuel_percent')}
              />
            </div>

            <div className="flex flex-col gap-space-2xs sm:col-span-2">
              <label className="font-label-sm text-label-sm font-semibold text-on-surface-variant">
                URL Foto Kendaraan
              </label>
              <input
                className="h-11 px-space-md rounded-xl bg-surface-container-low font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary-container"
                placeholder="https://..."
                value={form.image_url}
                onChange={update('image_url')}
              />
            </div>

            <div className="flex flex-col gap-space-2xs sm:col-span-2">
              <label className="font-label-sm text-label-sm font-semibold text-on-surface-variant">
                Jatuh Tempo STNK / Pajak
              </label>
              <input
                className="h-11 px-space-md rounded-xl bg-surface-container-low font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary-container"
                type="date"
                value={form.stnk_expiry}
                onChange={update('stnk_expiry')}
              />
            </div>

            <div className="flex flex-col gap-space-2xs sm:col-span-2">
              <label className="font-label-sm text-label-sm font-semibold text-on-surface-variant">
                Catatan Telematika
              </label>
              <input
                className="h-11 px-space-md rounded-xl bg-surface-container-low font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary-container"
                placeholder="Parkir Pool Cawang (0 km/h)"
                value={form.telematic_text}
                onChange={update('telematic_text')}
              />
            </div>
          </div>
        </form>

        <div className="p-space-md border-t border-surface-container flex items-center justify-end gap-space-sm bg-surface-container-lowest">
          <button
            className="px-space-md py-space-xs rounded-lg text-on-surface-variant font-label-md text-label-md hover:bg-surface-container"
            onClick={onClose}
            type="button"
            disabled={submitting}
          >
            Batal
          </button>
          <button
            className="px-space-lg py-space-xs rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold hover:bg-primary transition-all flex items-center gap-space-xs disabled:opacity-50"
            onClick={handleSubmit}
            type="button"
            disabled={submitting}
          >
            <span className="material-symbols-outlined text-[18px]">save</span>
            {submitting ? 'Menyimpan…' : 'Simpan ke Database'}
          </button>
        </div>
      </div>
    </div>
  );
}