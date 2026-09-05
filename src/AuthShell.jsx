import { Logo } from './data';

export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="min-h-screen bg-surface-container flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-primary via-primary-container to-secondary p-12 flex-col justify-between text-on-primary">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-secondary-container/30 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] rounded-full bg-tertiary-fixed/15 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 w-72 h-72 rounded-full bg-primary-fixed/20 blur-2xl pointer-events-none" />

        <div className="relative flex items-center gap-space-sm">
          <Logo className="h-10 w-auto brightness-0 invert" />
          <div className="flex flex-col">
            <span className="font-headline-lg text-headline-lg tracking-tight leading-none font-jakarta font-bold">
              Velocis
            </span>
            <span className="font-caption-xs text-caption-xs text-secondary-fixed tracking-wider uppercase font-semibold">
              Fleet Orchestration
            </span>
          </div>
        </div>

        <div className="relative flex flex-col gap-space-md">
          <div className="inline-flex items-center gap-space-xs self-start px-space-md py-space-3xs rounded-full bg-primary-fixed/20 backdrop-blur-md font-label-sm text-label-sm font-semibold border border-on-primary/20">
            <span className="material-symbols-outlined text-tertiary-fixed text-[16px]">
              verified_user
            </span>
            <span>Portal Operasional Resmi</span>
          </div>
          <h2 className="font-display-lg text-display-lg text-on-primary tracking-tight leading-tight font-jakarta font-bold">
            Kelola Armada & Telematika dalam Satu Platform Terpadu.
          </h2>
          <p className="font-body-lg text-body-lg text-primary-fixed max-w-md">
            Pelacakan GPS real-time, utilisasi armada, jadwal supir, hingga laporan keuangan
            korporat — semuanya dapat Anda kontrol dari dashboard Velocis.
          </p>
          <div className="grid grid-cols-3 gap-space-md pt-space-md">
            {[
              { v: '48', l: 'Unit Aktif' },
              { v: '99.9%', l: 'SLA Server' },
              { v: '24/7', l: 'CS Support' },
            ].map((s) => (
              <div key={s.l} className="flex flex-col">
                <span className="font-headline-lg text-headline-lg text-tertiary-fixed font-jakarta font-bold">
                  {s.v}
                </span>
                <span className="font-caption-xs text-caption-xs text-on-primary/70 uppercase tracking-wider">
                  {s.l}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex items-center gap-space-2xs font-caption-xs text-caption-xs text-on-primary/70">
          <span className="material-symbols-outlined text-[14px]">copyright</span>
          <span>2026 Velocis Fleet & Mobility. Seluruh hak dilindungi.</span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-space-md lg:p-space-xl bg-surface">
        <div className="w-full max-w-md flex flex-col gap-space-xl">
          <div className="flex lg:hidden items-center gap-space-sm self-center">
            <Logo className="h-8 w-auto" />
            <div className="flex flex-col">
              <span className="font-headline-lg text-headline-lg text-primary leading-none font-jakarta font-bold">
                Velocis
              </span>
              <span className="font-caption-xs text-caption-xs text-on-surface-variant uppercase tracking-wider">
                Fleet Orchestration
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-space-2xs text-center lg:text-left">
            <h1 className="font-headline-xl text-headline-xl text-primary font-jakarta font-bold">
              {title}
            </h1>
            {subtitle && (
              <p className="font-body-md text-body-md text-on-surface-variant">{subtitle}</p>
            )}
          </div>

          {children}

          {footer && (
            <div className="text-center font-label-sm text-label-sm text-on-surface-variant">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}