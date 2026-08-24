import { useState } from 'react'
import { ArrowDown, ArrowUpRight } from '@phosphor-icons/react'
import { useTheme } from '../context/ThemeContext'

export default function Hero() {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 })
  const { isDark } = useTheme()

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

  const portraitSrc = isDark ? '/seyi1.png' : '/seyi.png'

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative h-dvh w-full pt-20 pb-6 px-5 sm:px-6 md:px-8 flex flex-col justify-between overflow-hidden select-none transition-colors duration-300 ${isDark ? 'bg-[#0a0b0d]' : 'bg-brand-bg'
        }`}
    >
      {/* Header Metadata */}
      <div
        className={`relative z-30 max-w-7xl w-full mx-auto pt-2 md:pt-4 grid grid-cols-2 gap-2 md:gap-4 text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.25em] ${isDark ? 'text-gray-400' : 'text-brand-muted'
          }`}
      >
        <div className="flex flex-col gap-0.5">
          <span className={`font-medium ${isDark ? 'text-white' : 'text-brand-dark'}`}>
            Àkinrìndé Olúwaṣéyì
          </span>
          <span className="truncate">Visual Storyteller</span>
          <span className={`hidden sm:inline ${isDark ? 'text-gray-500' : 'text-brand-muted'}`}>
            Nigeria
          </span>
        </div>
        <div className="text-right flex flex-col justify-start items-end gap-0.5">
          <span className={`font-medium ${isDark ? 'text-white' : 'text-brand-dark'}`}>
            "Ṣèyí Lóyàá"
          </span>
          <span className="truncate">Seyi Shot This</span>
          <span className={`hidden sm:inline ${isDark ? 'text-gray-500' : 'text-brand-muted'}`}>
            Visualising Heritage
          </span>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden relative z-10 flex-1 flex items-center justify-between w-full h-full min-h-0">
        <div className="relative z-30 flex flex-col justify-center items-start max-w-[55%] pt-0 pb-2">
          <h1
            className={`font-ojuju text-[16vw] leading-[0.85] font-bold uppercase tracking-tight mb-3 ${isDark ? 'text-white' : 'text-brand-dark'
              }`}
          >
            Ṣèyí <br />Lóyàá
          </h1>
          <p
            className={`text-[9.5px] uppercase tracking-[0.16em] mb-5 leading-relaxed font-normal font-questrial ${isDark ? 'text-gray-400' : 'text-brand-muted'
              }`}
          >
            Visualising Culture, Light & Identity
          </p>

          <div className="flex flex-col gap-2.5 w-full max-w-[170px]">
            <a
              href="#works"
              className={`inline-flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.16em] text-white px-4 py-2.5 rounded-full font-medium transition-colors shadow-md whitespace-nowrap ${isDark ? 'bg-brand-blue hover:bg-blue-600' : 'bg-brand-dark hover:bg-black'
                }`}
            >
              <span>Explore Works</span>
              <ArrowDown size={12} weight="bold" />
            </a>
            <a
              href="#contact"
              className={`inline-flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.16em] border backdrop-blur-md px-4 py-2.5 rounded-full font-medium transition-all whitespace-nowrap shadow-sm ${isDark
                ? 'text-white border-white/25 bg-white/10 hover:border-white'
                : 'text-brand-dark border-black/30 bg-white/80 hover:border-black'
                }`}
            >
              <span>Inquire</span>
              <ArrowUpRight size={12} weight="bold" />
            </a>
          </div>
        </div>

        {/* Mobile Portrait */}
        <div className="absolute right-[-150px] bottom-[-25px] h-[78vh] flex items-end justify-end pointer-events-none z-20">
          <div className="relative h-full w-auto flex items-end">
            <img
              src={portraitSrc}
              alt="Seyi Loyaa Portrait"
              className={`h-full w-auto max-w-none object-contain object-bottom drop-shadow-[0_25px_45px_rgba(0,0,0,0.35)] transition-opacity duration-300 ${isDark ? 'brightness-90 contrast-105' : ''
                }`}
            />
            {isDark && (
              <div className="absolute inset-0 bg-linear-to-t from-[#0a0b0d] via-black/20 to-transparent pointer-events-none" />
            )}
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block">
        {/* Midground Typography Layer */}
        <div
          className="absolute inset-x-0 bottom-5 translate-y-[-45%] flex items-center justify-center pointer-events-none z-10 px-4 max-w-full overflow-hidden transition-transform duration-300 ease-out"
          style={{
            transform: `translate(${mouseOffset.x * -0.6}px, calc(-45% + ${mouseOffset.y * -0.6}px))`,
          }}
        >
          <h1
            className={`font-ojuju text-[17.5vw] lg:text-[17.5vw] xl:text-[17.5vw] leading-none font-bold tracking-tight uppercase text-center w-full whitespace-nowrap opacity-95 ${isDark ? 'text-white' : 'text-brand-dark'
              }`}
          >
            Ṣèyí Lóyàá
          </h1>
        </div>

        {/* Foreground Portrait with Parallax */}
        <div
          className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end pointer-events-none z-20 transition-transform duration-300 ease-out"
          style={{
            transform: `translate(${mouseOffset.x * 0.8}px, ${mouseOffset.y * 0.4}px)`,
          }}
        >
          <div className="relative h-[68vh] md:h-[78vh] max-h-[720px] w-auto flex items-end">
            <img
              src={portraitSrc}
              alt="Seyi Loyaa Portrait"
              className={`h-full w-auto object-contain object-bottom drop-shadow-[0_20px_45px_rgba(0,0,0,0.35)] transition-opacity duration-300 ${isDark ? 'brightness-95 contrast-105' : ''
                }`}
            />
            {isDark && (
              <div className="absolute inset-0 bg-linear-to-t from-[#0a0b0d] via-transparent to-transparent pointer-events-none" />
            )}
          </div>
        </div>

        {/* Bottom Navigation Actions */}
        <div className="relative z-30 max-w-7xl w-full mx-auto flex items-end justify-between pointer-events-auto">
          <div className="flex items-center gap-3">
            <a
              href="#works"
              className={`inline-flex items-center justify-center gap-2 text-xs uppercase tracking-[0.18em] text-white px-6 py-3.5 rounded-full font-medium transition-colors duration-200 shadow-md ${isDark ? 'bg-brand-blue hover:bg-blue-600' : 'bg-brand-dark hover:bg-black'
                }`}
            >
              <span>Explore Works</span>
              <ArrowDown size={13} weight="bold" />
            </a>
            <a
              href="#contact"
              className={`inline-flex items-center justify-center gap-2 text-xs uppercase tracking-[0.18em] border backdrop-blur-md px-6 py-3.5 rounded-full font-medium transition-all duration-200 shadow-sm ${isDark
                ? 'text-white border-white/25 bg-white/10 hover:border-white hover:bg-white/20'
                : 'text-brand-dark border-black/30 bg-white/80 hover:border-black hover:bg-white'
                }`}
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