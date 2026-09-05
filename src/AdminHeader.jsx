export default function AdminHeader() {
  return (
    <header className="fixed top-0 left-72 right-0 h-20 bg-surface-container-lowest/90 backdrop-blur-xl z-40 shadow-[0_1px_8px_rgba(62,15,141,0.03)] px-space-xl flex items-center justify-between">
      <div className="flex items-center gap-space-md flex-1 max-w-xl">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-space-md top-1/2 -translate-y-1/2 text-outline text-[20px]">
            search
          </span>
          <input
            className="w-full h-10 pl-11 pr-space-md bg-surface-container-low text-on-surface placeholder:text-outline font-body-md text-body-md rounded-xl focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary-container transition-all"
            placeholder="Cari plat nomor, penyewa, atau booking ID..."
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-space-lg">
        <button
          className="h-10 px-space-md bg-primary-container text-on-primary font-label-md text-label-md rounded-xl flex items-center gap-space-xs shadow-[0_2px_8px_rgba(62,15,141,0.2)] hover:bg-primary transition-all"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>+ Input Pesanan Manual</span>
        </button>
        <div className="relative flex items-center">
          <button
            aria-label="Notifikasi Servis & Pajak"
            className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
          </button>
          <span className="absolute -top-1 -right-1 bg-tertiary-fixed text-on-tertiary-fixed font-caption-xs text-caption-xs font-bold px-1.5 py-0.5 rounded-full ring-2 ring-surface-container-lowest">
            3
          </span>
        </div>
        <div className="h-8 w-px bg-outline-variant/40" />
        <div className="flex items-center gap-space-sm pl-space-xs cursor-pointer group">
          <img
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover ring-2 ring-primary-fixed"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuDmE1mOGEbS6RKbppVD-ErdUPbxqPiby7ApryHq1hoNwqIOveyPcEwU5INbF1Vde8uEboqHE_hYhqgztqwYD84c_mBOJ7RD9A-oC729eLfGBYAkAmjKHv3bi65WxthHX_jFDdSXb0vHRP_MPBLWggYGY8oZnfg0dvwEA1CfDoz5xmBypx1O5LKW491J5FiEe6ElOw8VMwd5f33TQhMDwjjheSgh9kpuYhQdsSGy86qiA1Os0F89jJ"
          />
          <div className="flex flex-col text-left">
            <span className="font-label-md text-label-md text-on-surface font-semibold leading-tight group-hover:text-primary transition-colors">
              Arya Pratama
            </span>
            <span className="font-caption-xs text-caption-xs text-on-surface-variant leading-tight">
              Head of Fleet Operations
            </span>
          </div>
          <span className="material-symbols-outlined text-outline text-[18px] ml-space-3xs">
            expand_more
          </span>
        </div>
      </div>
    </header>
  );
}