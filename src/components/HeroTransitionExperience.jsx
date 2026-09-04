import { useState, useEffect, useRef } from 'react'
import { ArrowDown } from '@phosphor-icons/react'
import Hero from './Hero'
import { useTheme } from '../context/ThemeContext'

export default function HeroTransitionExperience({ onNavVisibilityChange }) {
  const { isDark } = useTheme()
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!videoRef.current) return
    if (progress >= 0.48 && progress <= 0.98) {
      videoRef.current.play().catch(() => {})
    } else {
      videoRef.current.pause()
    }
  }, [progress])

  useEffect(() => {
    let ticking = false

    function updateScrollProgress() {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const totalScrollable = rect.height - window.innerHeight
      if (totalScrollable <= 0) return

      const rawProgress = -rect.top / totalScrollable
      const currentProgress = Math.max(0, Math.min(1, rawProgress))
      setProgress(currentProgress)

      // Hide navbar during the immersive transition stages (isolated typography and video)
      // Re-show navbar cleanly right as the visual archive enters
      const shouldHideNav = currentProgress > 0.10 && currentProgress < 0.90
      onNavVisibilityChange?.(!shouldHideNav)

      ticking = false
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    updateScrollProgress()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      onNavVisibilityChange?.(true)
    }
  }, [onNavVisibilityChange])

  // Helper interpolation functions
  // 1. Hero fade-out (0.0 to 0.20)
  const heroOpacity = Math.max(0, Math.min(1, 1 - progress / 0.20))

  // 2. Dark Cinema Canvas overlay (for light mode transition)
  // Ramps up smoothly when leaving Hero (0.0 to 0.20), stays deep dark for typography & video (0.20 to 0.82),
  // and smoothly dissolves back to the theme page background as you approach the visual archive (0.82 to 1.0)
  let darkOverlayOpacity = 0
  if (progress < 0.20) {
    darkOverlayOpacity = progress / 0.20
  } else if (progress >= 0.20 && progress <= 0.82) {
    darkOverlayOpacity = 1
  } else if (progress > 0.82) {
    darkOverlayOpacity = Math.max(0, 1 - (progress - 0.82) / 0.18)
  }

  // 3. Isolated "Ṣèyí Lóyàá" typography (0.16 to 0.52)
  let typoOpacity = 0
  let typoScale = 1
  if (progress >= 0.16 && progress < 0.26) {
    typoOpacity = (progress - 0.16) / 0.10
  } else if (progress >= 0.26 && progress <= 0.42) {
    typoOpacity = 1
  } else if (progress > 0.42 && progress <= 0.52) {
    typoOpacity = Math.max(0, 1 - (progress - 0.42) / 0.10)
    typoScale = 1 + ((progress - 0.42) / 0.10) * 0.05
  }

  // 4. Fitted Video Player (0.48 to 1.00)
  // Smoothly slides in from below and locks in center.
  // CRITICAL: NEVER fades out to an empty black frame! Stays visible until the visual archive scrolls in.
  let videoOpacity = 0
  let videoTranslateY = 35
  if (progress >= 0.48 && progress < 0.64) {
    const t = (progress - 0.48) / 0.16
    videoOpacity = t
    videoTranslateY = 35 * (1 - t)
  } else if (progress >= 0.64) {
    videoOpacity = 1
    videoTranslateY = 0
  }

  function handleContinue() {
    const worksEl = document.getElementById('works')
    if (worksEl) {
      worksEl.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[200dvh] transition-colors duration-300 ${
        isDark ? 'bg-[#0a0b0d]' : 'bg-brand-bg'
      }`}
    >
      {/* Sticky Fullscreen Frame */}
      <div className="sticky top-0 h-dvh w-full overflow-hidden select-none">
        {/* Deep Cinema Dark Canvas (blends light mode smoothly into dark void for video/typo, dissolves back to page background for archive) */}
        <div
          className="absolute inset-0 bg-[#0a0b0d] pointer-events-none transition-opacity duration-300 z-1"
          style={{ opacity: isDark ? 1 : darkOverlayOpacity }}
        />

        {/* ─── STAGE 1: Standard Hero Layer ────────────────────────────── */}
        <div
          className="absolute inset-0 z-10 transition-opacity duration-150"
          style={{
            opacity: heroOpacity,
            pointerEvents: heroOpacity > 0.1 ? 'auto' : 'none',
          }}
        >
          <Hero />
        </div>

        {/* ─── STAGE 2: Isolated "Ṣèyí Lóyàá" Typography ─────────────── */}
        <div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 pointer-events-none"
          style={{
            opacity: typoOpacity,
            transform: `scale(${typoScale})`,
            display: typoOpacity > 0.01 ? 'flex' : 'none',
          }}
        >
          <div className="text-center max-w-4xl mx-auto">
            <span className="font-questrial text-[11px] sm:text-xs uppercase tracking-[0.3em] text-white/50 block mb-3 font-normal">
              Cinematographer &bull; Visual Storyteller
            </span>
            <h1 className="font-ojuju text-[19vw] sm:text-[16vw] md:text-[13vw] font-bold tracking-tight uppercase leading-[0.94] pt-1 pb-4 text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
              Ṣèyí<br className="sm:hidden" /> Lóyàá
            </h1>
            <p className="mt-4 font-questrial text-[10px] sm:text-xs uppercase tracking-[0.22em] text-white/60 font-normal">
              Visualising Culture, Light &amp; Identity
            </p>
          </div>
        </div>

        {/* ─── STAGE 3: Fitted Video on Dark Canvas ──────────────────── */}
        <div
          className="absolute inset-0 z-30 flex flex-col items-center justify-center px-4 py-4"
          style={{
            opacity: videoOpacity,
            transform: `translateY(${videoTranslateY}px)`,
            pointerEvents: videoOpacity > 0.3 ? 'auto' : 'none',
            display: videoOpacity > 0.01 ? 'flex' : 'none',
          }}
        >
          <div className="w-full max-w-[92vw] sm:max-w-xl md:max-w-3xl lg:max-w-4xl flex flex-col items-center">
            {/* Cinematic Widescreen (16:9) Video Player — Native landscape format, zero cropping */}
            <div className="w-full aspect-video rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.95)] border border-white/20 bg-black relative">
              <video
                ref={videoRef}
                src="/viral_video.mp4"
                autoPlay
                loop
                muted
                playsInline
                controls
                className="w-full h-full object-contain bg-black"
              />
            </div>

            {/* Mobile-Friendly "Continue to Archive" Jump Button */}
            <button
              type="button"
              onClick={handleContinue}
              className="mt-4 sm:mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-questrial text-[10.5px] uppercase tracking-[0.16em] font-medium bg-black/75 hover:bg-black/95 text-white border border-white/25 backdrop-blur-md transition-all active:scale-95 shadow-lg cursor-pointer"
            >
              <span>Continue to Visual Archive</span>
              <ArrowDown size={12} weight="bold" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
