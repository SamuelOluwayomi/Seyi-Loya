import { useState } from 'react'
import { ArrowDown, ArrowUpRight } from '@phosphor-icons/react'

export default function Hero() {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 })

  // Subtle interactive parallax depth on mouse move
  function handleMouseMove(e) {
    const { clientX, clientY, currentTarget } = e
    const { width, height } = currentTarget.getBoundingClientRect()
    const x = (clientX / width - 0.5) * 16
    const y = (clientY / height - 0.5) * 16
    setMouseOffset({ x, y })
  }

  function handleMouseLeave() {
    setMouseOffset({ x: 0, y: 0 })
  }

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-dvh w-full pt-20 pb-6 px-5 sm:px-6 md:px-8 flex flex-col justify-between overflow-hidden select-none"
      style={{
        background: `radial-gradient(circle at 50% 45%, #ffffff 0%, #edf0f5 45%, #dbe0ea 80%, #c5cbd8 100%)`,
      }}
    >
      {/* Header Metadata */}
      <div className="relative z-30 max-w-7xl w-full mx-auto pt-2 md:pt-4 grid grid-cols-2 gap-2 md:gap-4 text-brand-muted text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.25em]">
        <div className="flex flex-col gap-0.5">
          <span className="text-brand-dark font-bold">Àkinrìndé Olúwaṣéyì</span>
          <span className="truncate">Visual Storyteller</span>
          <span className="text-brand-muted hidden sm:inline">Nigeria</span>
        </div>
        <div className="text-right flex flex-col justify-start items-end gap-0.5">
          <span className="text-brand-dark font-bold">"Ṣèyí Lóyàá"</span>
          <span className="truncate">Seyi Shot This</span>
          <span className="text-brand-muted hidden sm:inline">Visualising Heritage</span>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden relative z-10 flex-1 flex items-center justify-between w-full h-full min-h-0">
        <div className="relative z-30 flex flex-col justify-center items-start max-w-[55%] pt-0 pb-2">
          <h1 className="font-ojuju text-[15vw] leading-[0.85] font-bold text-brand-dark uppercase tracking-tight mb-3">
            Ṣèyí <br />Lóyàá
          </h1>
          <p className="text-[9.5px] uppercase tracking-[0.16em] text-brand-muted mb-5 leading-relaxed font-medium">
            Visualising Culture, Light & Identity
          </p>

          <div className="flex flex-col gap-2.5 w-full max-w-[170px]">
            <a
              href="#works"
              className="inline-flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.16em] bg-brand-dark text-white px-4 py-2.5 rounded-full font-semibold hover:bg-black transition-colors shadow-md whitespace-nowrap"
            >
              <span>Explore Works</span>
              <ArrowDown size={12} weight="bold" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.16em] text-brand-dark border border-brand-dark/30 bg-white/70 backdrop-blur-md px-4 py-2.5 rounded-full font-medium hover:border-brand-dark transition-all whitespace-nowrap shadow-sm"
            >
              <span>Inquire</span>
              <ArrowUpRight size={12} weight="bold" />
            </a>
          </div>
        </div>

        {/* Mobile Portrait Silhouette */}
        <div className="absolute right-[-140px] bottom-[-25px] h-[78vh] flex items-end justify-end pointer-events-none z-20">
          <img
            src="/seyi.png"
            alt="Seyi Loyaa Portrait Silhouette"
            className="h-full w-auto max-w-none object-contain object-bottom drop-shadow-[0_25px_45px_rgba(0,0,0,0.35)]"
          />
        </div>
      </div>

      {/* Desktop 3D Depth Layout */}
      <div className="hidden md:block">
        {/* Midground Typography Layer */}
        <div
          className="absolute inset-x-0 bottom-5 translate-y-[-45%] flex items-center justify-center pointer-events-none z-10 px-4 max-w-full overflow-hidden transition-transform duration-300 ease-out"
          style={{
            transform: `translate(${mouseOffset.x * -0.6}px, calc(-45% + ${mouseOffset.y * -0.6}px))`,
          }}
        >
          <h1 className="font-ojuju text-[15.5vw] lg:text-[16.5vw] xl:text-[17vw] leading-none font-bold tracking-tight text-brand-dark uppercase text-center w-full whitespace-nowrap">
            Ṣèyí Lóyàá
          </h1>
        </div>

        {/* Foreground Silhouette with Parallax */}
        <div
          className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end pointer-events-none z-20 transition-transform duration-300 ease-out"
          style={{
            transform: `translate(${mouseOffset.x * 0.8}px, ${mouseOffset.y * 0.4}px)`,
          }}
        >
          <img
            src="/seyi.png"
            alt="Seyi Loyaa Portrait Silhouette"
            className="h-[68vh] md:h-[78vh] max-h-[720px] w-auto object-contain object-bottom drop-shadow-[0_20px_45px_rgba(0,0,0,0.35)]"
          />
        </div>

        {/* Bottom Navigation Actions */}
        <div className="relative z-30 max-w-7xl w-full mx-auto flex items-end justify-between pointer-events-auto">
          <div className="flex items-center gap-3">
            <a
              href="#works"
              className="inline-flex items-center justify-center gap-2 text-xs uppercase tracking-[0.18em] bg-brand-dark text-white px-6 py-3.5 rounded-full font-semibold hover:bg-black transition-colors duration-200 shadow-md"
            >
              <span>Explore Works</span>
              <ArrowDown size={13} weight="bold" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 text-xs uppercase tracking-[0.18em] text-brand-dark border border-brand-dark/30 bg-white/70 backdrop-blur-md px-6 py-3.5 rounded-full font-medium hover:border-brand-dark hover:bg-white transition-all duration-200 shadow-sm"
            >
              <span>Inquire</span>
              <ArrowUpRight size={13} weight="bold" />
            </a>
          </div>

          <div className="flex items-center justify-end" />
        </div>
      </div>
    </section>
  )
}