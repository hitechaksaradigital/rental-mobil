import { useEffect, useState } from 'react';

const CAR_NAMES = {
  'innova-zenix': 'Toyota Innova Zenix Hybrid 2024',
  'fortuner-gr': 'Toyota Fortuner GR Sport 2.8 4x4',
  'alphard-vip': 'Toyota Alphard Transformer 2.5G VIP',
  'ioniq-ev': 'Hyundai Ioniq 5 EV Long Range',
};

const CAR_IMG = {
  'innova-zenix':
    'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=70',
  'fortuner-gr':
    'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=70',
  'alphard-vip':
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=70',
  'ioniq-ev':
    'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1200&q=70',
};

export default function VehicleModal({ carKey, onClose }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!carKey) return null;

  const title = CAR_NAMES[carKey] ?? 'Detail Spesifikasi Kendaraan';
  const img = CAR_IMG[carKey];

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity ${
        mounted ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm" />
      <div
        className="relative bg-surface-container-lowest rounded-2xl shadow-2xl max-w-2xl w-[92vw] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-space-lg flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary-container text-[24px]">
                verified
              </span>
              <h3 className="font-headline-lg text-headline-lg text-on-surface font-jakarta font-bold">
                {title}
              </h3>
            </div>
            <button
              className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high"
              onClick={onClose}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
          <div className="w-full h-48 bg-surface-container-low rounded-xl overflow-hidden">
            <img
              alt={`${title} interior detail`}
              className="w-full h-full object-cover"
              src={
                img ||
                'https://lh3.googleusercontent.com/aida-public/AB6AXuCCfdavMBiD2iHZtRW34wF4nWfNoiPRfUjPkwLZBa3do9A0gNiqqO8XMKl7bOsf-PNcOXY6wMN6hn7TBhbyddFQamHWsBLMVeqhpwaSlWdHTV-fnlIVZrFVm_ji8cUWW6apUgJ6NC1G_RGF3XLTDCLfFSOvO2ct1fZ1vpxEv2SutNeRCTXsiUjcADjfK03NCezwh9h2ARrQ4MPCX1pmfYX1nkrN5aQX49TO4wZYtRt5oN8CtpN2JrnC'
              }
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-space-sm font-body-sm text-body-sm">
            <div className="p-space-sm rounded-lg bg-surface-container-low">
              <span className="text-on-surface-variant block font-caption-xs text-caption-xs">
                Transmisi & Mesin
              </span>
              <span className="font-semibold text-on-surface">Otomatis / Direct Shift</span>
            </div>
            <div className="p-space-sm rounded-lg bg-surface-container-low">
              <span className="text-on-surface-variant block font-caption-xs text-caption-xs">
                Fitur Keselamatan
              </span>
              <span className="font-semibold text-on-surface">TSS 3.0 / 7 Airbags</span>
            </div>
            <div className="p-space-sm rounded-lg bg-surface-container-low">
              <span className="text-on-surface-variant block font-caption-xs text-caption-xs">
                Bahan Bakar
              </span>
              <span className="font-semibold text-on-surface">Full-to-Full Tank</span>
            </div>
          </div>
          <div className="p-space-md rounded-xl bg-surface-container-low text-on-surface-variant font-body-sm text-body-sm flex flex-col gap-space-2xs">
            <p className="font-semibold text-on-surface">Kelengkapan Standar Velocis:</p>
            <p>• Kotak P3K, Segitiga Pengaman, Alat Pemadam Api Ringan (APAR)</p>
            <p>• Charger mobil multifungsi Type-C & Lightning Fast Charge</p>
            <p>• Pengharum ruangan aroma aromaterapi netral & higienis</p>
          </div>
          <div className="flex items-center justify-end gap-space-sm pt-space-xs">
            <button
              className="px-space-md py-space-xs rounded-lg text-on-surface-variant font-label-md text-label-md"
              onClick={onClose}
              type="button"
            >
              Tutup
            </button>
            <button
              className="px-space-lg py-space-xs rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold"
              onClick={() => {
                alert('Mengarahkan ke alur verifikasi & checkout');
                onClose();
              }}
              type="button"
            >
              Lanjut Pemesanan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}