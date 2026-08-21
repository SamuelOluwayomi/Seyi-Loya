import { ArrowDown, ArrowUpRight } from '@phosphor-icons/react'

export default function Hero() {
  return (
    <section className="relative h-dvh w-full pt-20 pb-6 px-5 sm:px-6 md:px-8 flex flex-col justify-between overflow-hidden bg-brand-bg select-none">
      <div className="relative z-20 max-w-7xl w-full mx-auto pt-2 md:pt-4 grid grid-cols-2 gap-2 md:gap-4 text-brand-muted text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.25em]">
        <div className="flex flex-col gap-0.5">
          <span className="text-brand-dark font-semibold">Àkinrìndé Olúwaṣéyì</span>
          <span className="truncate">Visual Storyteller</span>
          <span className="text-[#8e9097] hidden sm:inline">Nigeria</span>
        </div>
        <div className="text-right flex flex-col justify-start items-end gap-0.5">
          <span className="text-brand-dark font-semibold">"Ṣèyí Lóyàá"</span>
          <span className="truncate">Seyi Shot This</span>
          <span className="text-[#8e9097] hidden sm:inline">Visualising Heritage</span>
        </div>
      </div>

      <div className="md:hidden relative z-10 flex-1 flex items-center justify-between w-full h-full min-h-0">
        <div className="relative z-20 flex flex-col justify-center items-start max-w-[50%] pt-0 pb-2">
          <h1 className="font-ojuju text-[16vw] leading-[0.85] font-bold text-brand-dark uppercase tracking-tight mb-3">
            Ṣèyí<br />Lóyàá
          </h1>
          <p className="text-[9.5px] uppercase tracking-[0.16em] text-brand-muted mb-5 leading-relaxed">
            Visualising Culture, Light & Identity
          </p>

          <div className="flex flex-col gap-2.5 w-full max-w-[170px]">
            <a
              href="#works"
              className="inline-flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.16em] bg-brand-dark text-white px-4 py-2.5 rounded-full font-semibold hover:bg-black transition-colors shadow-sm whitespace-nowrap"
            >
              <span>Explore Works</span>
              <ArrowDown size={12} weight="bold" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.16em] text-brand-dark border border-brand-dark/30 bg-brand-bg/80 backdrop-blur-sm px-4 py-2.5 rounded-full font-medium hover:border-brand-dark transition-all whitespace-nowrap"
            >
              <span>Inquire</span>
              <ArrowUpRight size={12} weight="bold" />
            </a>
          </div>
        </div>

        <div className="absolute right-[-150px] bottom-[-30px] h-[77vh] flex items-end justify-end pointer-events-none z-10">
          <img
            src="/seyi.png"
            alt="Seyi Loyaa Portrait Silhouette"
            className="h-full w-auto max-w-none object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
          />
        </div>
      </div>

      <div className="hidden md:block">
        <div className="absolute inset-x-0 bottom-10 translate-y-[-45%] flex items-center justify-center pointer-events-none z-0 px-8">
          <h1 className="font-ojuju text-[18.5vw] leading-none font-bold tracking-tight text-brand-dark uppercase text-center w-full whitespace-nowrap opacity-95">
            Ṣèyí Lóyàá
          </h1>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-center pointer-events-none z-10">
          <img
            src="/seyi.png"
            alt="Seyi Loyaa Portrait Silhouette"
            className="h-[68vh] md:h-[78vh] max-h-[720px] w-auto object-contain object-bottom drop-shadow-[0_20px_45px_rgba(0,0,0,0.22)]"
          />
        </div>

        <div className="relative z-20 max-w-7xl w-full mx-auto flex items-end justify-between pointer-events-auto">
          <div className="flex items-center gap-3">
            <a
              href="#works"
              className="inline-flex items-center justify-center gap-2 text-xs uppercase tracking-[0.18em] bg-brand-dark text-white px-6 py-3.5 rounded-full font-semibold hover:bg-black transition-colors duration-200 shadow-sm"
            >
              <span>Explore Works</span>
              <ArrowDown size={13} weight="bold" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 text-xs uppercase tracking-[0.18em] text-brand-dark border border-brand-dark/30 bg-brand-bg/80 backdrop-blur-sm px-6 py-3.5 rounded-full font-medium hover:border-brand-dark hover:bg-brand-dark/5 transition-all duration-200"
            >
              <span>Inquire</span>
              <ArrowUpRight size={13} weight="bold" />
            </a>
          </div>

          <div className="flex items-center justify-end"></div>
        </div>
      </div>
    </section>
  )
}