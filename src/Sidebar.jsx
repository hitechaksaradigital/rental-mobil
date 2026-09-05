import { Logo } from './data';

const NAV = [
  { label: 'Live Fleet Tracking', path: 'overview', icon: 'hub' },
  { label: 'Manajemen Armada', path: 'manajemen-armada', icon: 'directions_car' },
  { label: 'Manajemen Pemesanan', path: 'bookings', icon: 'calendar_month' },
  { label: 'Jadwal Sopir & Handover', path: 'driver-schedules', icon: 'badge' },
  { label: 'Laporan & Keuangan', path: 'finance-reports', icon: 'analytics' },
  { label: 'Pengaturan Sistem', path: 'system-settings', icon: 'tune' },
];

export default function Sidebar({ active }) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-surface-container-lowest z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(62,15,141,0.04)]">
      <div className="flex flex-col">
        <div className="h-20 px-space-lg flex items-center gap-space-sm">
          <Logo className="h-8 w-auto object-contain" />
          <div className="flex flex-col">
            <span className="font-headline-lg text-headline-lg text-primary leading-tight tracking-tight font-jakarta font-bold">
              Velocis
            </span>
            <span className="font-caption-xs text-caption-xs text-on-surface-variant uppercase tracking-wider">
              Fleet Orchestration
            </span>
          </div>
        </div>
        <div className="px-space-md mt-space-xs">
          <nav className="flex flex-col gap-space-2xs">
            {NAV.map((n) => {
              const isActive = n.path === active;
              return (
                <a
                  key={n.path}
                  className={`flex items-center gap-space-sm px-space-md py-space-sm rounded-xl transition-all group ${
                    isActive
                      ? 'bg-primary-container text-on-primary font-label-md font-bold shadow-[0_4px_12px_rgba(62,15,141,0.15)]'
                      : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                  }`}
                  href={`#${n.path}`}
                >
                  <span
                    className={`material-symbols-outlined text-[20px] transition-colors ${
                      isActive ? 'text-on-primary' : 'text-outline group-hover:text-primary'
                    }`}
                  >
                    {n.icon}
                  </span>
                  <span className="font-label-md text-label-md">{n.label}</span>
                </a>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="p-space-md">
        <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-space-xs">
          <div className="flex items-center justify-between">
            <span className="font-caption-xs text-caption-xs text-on-surface-variant font-medium">
              Support 24/7 Priority
            </span>
            <span className="w-2 h-2 rounded-full bg-tertiary-container ring-4 ring-tertiary-fixed/30" />
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Hubungi bantuan teknis dispatch armada
          </p>
          <div className="pt-space-xs flex items-center justify-between text-on-surface-variant">
            <span className="font-caption-xs text-caption-xs text-on-tertiary-container bg-tertiary-fixed px-space-2xs py-space-3xs rounded font-semibold">
              v2.4.0-enterprise
            </span>
            <span className="font-caption-xs text-caption-xs text-outline">SLA 99.9%</span>
          </div>
        </div>
      </div>
    </aside>
  );
}