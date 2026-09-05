export default function WhatsAppFab() {
  return (
    <aside
      aria-label="Bantuan Langsung WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-space-xs"
    >
      <a
        className="group flex items-center gap-space-xs pl-space-md pr-space-lg py-space-sm rounded-full bg-surface-container-lowest text-primary shadow-2xl hover:shadow-primary/30 transition-all hover:scale-105"
        href="https://wa.me/628118356247?text=Halo%20Velocis%20Fleet,%20saya%20butuh%20bantuan%20sewa%20mobil"
        rel="noopener noreferrer"
        target="_blank"
      >
        <div className="relative w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-on-secondary">
          <span className="material-symbols-outlined text-[20px]">chat</span>
          <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-tertiary-fixed animate-ping" />
        </div>
        <div className="flex flex-col text-left">
          <span className="font-caption-xs text-caption-xs text-on-surface-variant leading-tight">
            Layanan 24 Jam
          </span>
          <span className="font-label-sm text-label-sm font-bold text-primary group-hover:text-primary-container transition-colors">
            Chat CS WhatsApp
          </span>
        </div>
      </a>
    </aside>
  );
}