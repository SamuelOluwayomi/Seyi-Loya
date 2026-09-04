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

  // In light mode use detailed portrait (/seyi2.png); in dark mode use /seyi1.png with dark overlay
  const portraitSrc = isDark ? '/seyi1.png' : '/seyi.png'

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative h-dvh w-full overflow-hidden select-none transition-colors duration-300 ${isDark ? 'bg-[#0a0b0d]' : 'bg-brand-bg'
        }`}
    >
      {/* ─── MOBILE LAYOUT (Magazine Cover Layering) ─────────────────────────── */}
      <div className="md:hidden flex flex-col justify-between h-full pt-18 pb-6 px-4 relative z-10">
        {/* Top: Editorial Header Metadata */}
        <div
          className={`relative z-30 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] font-questrial ${isDark ? 'text-white/60' : 'text-brand-dark/70'
            }`}
        >
          <div className="flex flex-col gap-0.5">
            <span className={`font-semibold tracking-[0.22em] ${isDark ? 'text-white' : 'text-brand-dark'}`}>
              Àkinrìndé Olúwaṣéyì
            </span>
            <span className={isDark ? 'text-white/50' : 'text-brand-muted'}>
              Visual Storyteller
            </span>
          </div>
          <div className="text-right flex flex-col items-end gap-0.5">
            <span className={`font-semibold tracking-[0.22em] ${isDark ? 'text-white' : 'text-brand-dark'}`}>
              Nigeria
            </span>
            <span className={isDark ? 'text-white/50' : 'text-brand-muted'}>
              "Ṣèyí Lóyàá"
            </span>
          </div>
        </div>

        {/* Midground Typography Layer (Behind the portrait) */}
        <div className="absolute inset-x-0 top-[20%] sm:top-[18%] flex flex-col items-center justify-center pointer-events-none z-10 px-2">
          <h1
            className={`font-ojuju text-[18vw] sm:text-[16vw] leading-[0.84] font-bold uppercase tracking-tight text-center ${isDark ? 'text-white/90' : 'text-brand-dark/90'
              }`}
          >
            Ṣèyí<br />Lóyàá
          </h1>
        </div>

        {/* Foreground Centered Portrait (Anchored to bottom, rising over letters) */}
        <div className="absolute inset-x-0 bottom-0 flex justify-center items-end pointer-events-none z-20">
          <div className="relative h-[64vh] sm:h-[68vh] max-h-[550px] w-auto flex items-end">
            <img
              src={portraitSrc}
              alt="Seyi Loyaa Portrait"
              className={`h-full w-auto object-contain object-bottom drop-shadow-[0_15px_35px_rgba(0,0,0,0.35)] transition-opacity duration-300 ${isDark ? 'brightness-95 contrast-105' : ''
                }`}
            />
            {/* Bottom blend gradient so action bar is ultra-crisp and legible */}
            <div
              className={`absolute inset-x-0 bottom-0 h-40 bg-linear-to-t pointer-events-none ${isDark
                ? 'from-[#0a0b0d] via-[#0a0b0d]/75 to-transparent'
                : 'from-brand-bg via-brand-bg/80 to-transparent'
                }`}
            />
          </div>
        </div>

        {/* Bottom Actions: Tagline + Floating CTAs */}
        <div className="relative z-30 flex flex-col items-center text-center gap-3 w-full max-w-sm mx-auto">
          <p
            className={`font-questrial text-[10px] uppercase tracking-[0.22em] font-medium ${isDark ? 'text-white/80' : 'text-brand-dark/80'
              }`}
          >
            Visualising Culture, Light &amp; Identity
          </p>

          <div className="flex items-center gap-3 w-full">
            <a
              href="#series"
              className={`flex-1 inline-flex items-center justify-center gap-2 text-[10.5px] uppercase tracking-[0.16em] text-white px-4 py-3 rounded-full font-medium transition-transform active:scale-95 shadow-lg ${isDark ? 'bg-brand-blue hover:bg-blue-600' : 'bg-brand-dark hover:bg-black'
                }`}
            >
              <span>Explore Works</span>
              <ArrowDown size={12} weight="bold" />
            </a>
            <a
              href="#contact"
              className={`flex-1 inline-flex items-center justify-center gap-2 text-[10.5px] uppercase tracking-[0.16em] border backdrop-blur-md px-4 py-3 rounded-full font-medium transition-all active:scale-95 shadow-xs ${isDark
                ? 'text-white border-white/25 bg-white/10 hover:border-white'
                : 'text-brand-dark border-black/25 bg-white/85 hover:border-black'
                }`}
            >
              <span>Inquire</span>
              <ArrowUpRight size={12} weight="bold" />
            </a>
          </div>
        </div>
      </div>

      {/* ─── DESKTOP LAYOUT ─────────────────────────────── */}
      <div className="hidden md:flex flex-col justify-between h-full pt-20 pb-6 px-6 md:px-8">
        {/* Header Metadata */}
        <div
          className={`relative z-30 max-w-7xl w-full mx-auto pt-2 md:pt-4 grid grid-cols-2 gap-4 text-[11px] uppercase tracking-[0.25em] ${isDark ? 'text-gray-400' : 'text-brand-muted'
            }`}
        >
          <div className="flex flex-col gap-0.5">
            <span className={`font-medium ${isDark ? 'text-white' : 'text-brand-dark'}`}>
              Àkinrìndé Olúwaṣéyì
            </span>
            <span>Visual Storyteller</span>
            <span className={isDark ? 'text-gray-500' : 'text-brand-muted'}>Nigeria</span>
          </div>
          <div className="text-right flex flex-col justify-start items-end gap-0.5">
            <span className={`font-medium ${isDark ? 'text-white' : 'text-brand-dark'}`}>
              "Ṣèyí Lóyàá"
            </span>
            <span>Seyi Shot This</span>
            <span className={isDark ? 'text-gray-500' : 'text-brand-muted'}>
              Visualising Heritage
            </span>
          </div>
        </div>

        {/* Midground Typography Layer */}
        <div
          className="absolute inset-x-0 bottom-5 translate-y-[-45%] flex items-center justify-center pointer-events-none z-10 px-4 max-w-full overflow-hidden transition-transform duration-300 ease-out"
          style={{
            transform: `translate(${mouseOffset.x * -0.6}px, calc(-45% + ${mouseOffset.y * -0.6}px))`,
          }}
        >
          <h1
            className={`font-ojuju text-[17.5vw] leading-none font-bold tracking-tight uppercase text-center w-full whitespace-nowrap opacity-95 ${isDark ? 'text-white' : 'text-brand-dark'
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