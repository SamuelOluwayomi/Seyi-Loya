import { useState, useEffect, useRef } from 'react'
import { CaretLeft, CaretRight, CaretDown, X, ArrowsOut, Check } from '@phosphor-icons/react'
import photoData from '../data/photos.json'

// Optimize Cloudinary image delivery URL
function getOptimizedUrl(url, transformation = 'f_auto,q_auto,w_1000') {
  if (!url) return ''
  return url.replace('/image/upload/', `/image/upload/${transformation}/`)
}

export default function SelectedWorks() {
  // Default to Brand shoot, with All placed as the final option
  const [selectedCategory, setSelectedCategory] = useState('Brand shoot')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const touchStartX = useRef(null)
  const dropdownRef = useRef(null)

  // Categories list with All at the end
  const categories = [...Object.keys(photoData.categories), 'All']

  const displayedPhotos =
    selectedCategory === 'All'
      ? photoData.all
      : photoData.categories[selectedCategory] || []

  // Reset index when category changes
  useEffect(() => {
    setActiveIndex(0)
  }, [selectedCategory])

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e) {
      if (isLightboxOpen) {
        if (e.key === 'Escape') setIsLightboxOpen(false)
        if (e.key === 'ArrowLeft') handlePrev()
        if (e.key === 'ArrowRight') handleNext()
      } else {
        if (e.key === 'ArrowLeft') handlePrev()
        if (e.key === 'ArrowRight') handleNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isLightboxOpen, displayedPhotos.length])

  // Lock scroll during lightbox
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isLightboxOpen])

  const total = displayedPhotos.length

  function handlePrev() {
    if (total === 0) return
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : total - 1))
  }

  function handleNext() {
    if (total === 0) return
    setActiveIndex((prev) => (prev < total - 1 ? prev + 1 : 0))
  }

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX
  }

  function handleTouchEnd(e) {
    if (touchStartX.current === null) return
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX

    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext()
      else handlePrev()
    }
    touchStartX.current = null
  }

  const activePhoto = total > 0 ? displayedPhotos[activeIndex] : null

  // Calculate card position styles for layered cover-flow display
  function getCardStyle(index) {
    let diff = index - activeIndex

    // Adjust for circular wrap-around display if many photos
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total

    const isCenter = diff === 0
    const absDiff = Math.abs(diff)

    // Hide cards further than 2 positions away
    if (absDiff > 2) {
      return {
        display: 'none',
      }
    }

    // Horizontal offset, scale, and z-index calculation
    let translateX = diff * 210
    let scale = 1 - absDiff * 0.16
    let zIndex = 30 - absDiff * 10
    let opacity = 1 - absDiff * 0.35

    return {
      transform: `translateX(${translateX}px) scale(${scale})`,
      zIndex,
      opacity,
      transition: 'all 450ms cubic-bezier(0.25, 1, 0.5, 1)',
    }
  }

  const currentCount =
    selectedCategory === 'All'
      ? photoData.all.length
      : photoData.categories[selectedCategory]?.length || 0

  return (
    <section
      id="works"
      className="relative py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 bg-brand-bg border-t border-brand-border select-none overflow-hidden"
      style={{
        backgroundImage:
          'repeating-linear-gradient(to bottom, transparent, transparent 31px, rgba(18, 19, 22, 0.16) 31px, rgba(18, 19, 22, 0.16) 32px)',
        backgroundSize: '100% 32px',
      }}
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center">
        {/* Section Heading - Centered */}
        <div className="w-full text-center mb-3">
          <span className="text-[10px] uppercase tracking-[0.25em] text-brand-muted font-medium block mb-1">
            Selected Works
          </span>
          <h2 className="font-ojuju text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-brand-dark uppercase">
            Visual Archive
          </h2>
        </div>

        {/* Single Capsule Category Dropdown - Centered on mobile, Left on desktop */}
        <div className="w-full flex justify-center sm:justify-start mb-1 sm:mb-3">
          <div ref={dropdownRef} className="relative z-40">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="group inline-flex items-center gap-3 px-5 py-2 rounded-full bg-brand-dark text-white text-xs uppercase tracking-[0.16em] font-medium shadow-md hover:bg-black transition-all cursor-pointer"
              aria-expanded={isDropdownOpen}
              aria-haspopup="listbox"
            >
              <span>{selectedCategory}</span>
              <span className="text-white/60 font-normal">({currentCount})</span>
              <CaretDown
                size={14}
                weight="bold"
                className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Dropdown Menu - Centered on mobile, Left on desktop */}
            {isDropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 mt-2 w-64 max-h-80 overflow-y-auto bg-brand-bg/95 backdrop-blur-xl border border-brand-dark/20 rounded-2xl shadow-2xl p-2 z-50 no-scrollbar">
                <div className="space-y-1" role="listbox">
                  {categories.map((category) => {
                    const count =
                      category === 'All'
                        ? photoData.all.length
                        : photoData.categories[category]?.length || 0
                    const isSelected = selectedCategory === category

                    return (
                      <button
                        key={category}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => {
                          setSelectedCategory(category)
                          setIsDropdownOpen(false)
                        }}
                        className={`w-full flex items-center justify-between px-4 py-2 rounded-xl text-xs uppercase tracking-[0.14em] font-medium transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-brand-dark text-white'
                            : 'text-brand-dark hover:bg-black/5'
                        }`}
                      >
                        <span className="truncate">{category}</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-[11px] ${isSelected ? 'text-white/70' : 'text-brand-muted'}`}>
                            ({count})
                          </span>
                          {isSelected && <Check size={14} weight="bold" />}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 3D Layered Cards Showcase */}
        {total > 0 && (
          <div
            className="relative w-full max-w-4xl mx-auto h-[380px] sm:h-[460px] md:h-[500px] flex items-center justify-center mt-0.5 sm:mt-2 mb-2"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {displayedPhotos.map((photo, index) => {
              const isCenter = index === activeIndex
              const style = getCardStyle(index)

              if (style.display === 'none') return null

              return (
                <div
                  key={photo.id}
                  onClick={() => {
                    if (isCenter) {
                      setIsLightboxOpen(true)
                    } else {
                      setActiveIndex(index)
                    }
                  }}
                  style={style}
                  className={`absolute w-[240px] sm:w-[290px] md:w-[330px] aspect-3/4 p-0 border border-brand-dark/30 rounded-2xl overflow-hidden bg-brand-dark shadow-2xl cursor-pointer ${isCenter ? 'ring-1 ring-black/10' : 'cursor-pointer hover:opacity-90'
                    }`}
                >
                  <img
                    src={getOptimizedUrl(photo.secure_url, 'f_auto,q_auto,w_800')}
                    alt={photo.category}
                    loading="lazy"
                    className="w-full h-full object-cover object-center pointer-events-none"
                  />

                  {/* Center Card Expand Action */}
                  {isCenter && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsLightboxOpen(true)
                      }}
                      className="absolute bottom-4 right-4 z-40 p-2.5 rounded-full bg-brand-dark/70 hover:bg-brand-dark text-white backdrop-blur-md transition-all shadow-md cursor-pointer"
                      aria-label="Expand image"
                    >
                      <ArrowsOut size={16} weight="bold" />
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Carousel Navigation & Metadata Controls */}
        {total > 0 && (
          <div className="flex flex-col items-center gap-2 mt-3 w-full">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={handlePrev}
                className="w-11 h-11 rounded-full border border-brand-dark/25 bg-brand-bg hover:bg-brand-dark hover:text-white text-brand-dark flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm"
                aria-label="Previous photograph"
              >
                <CaretLeft size={18} weight="bold" />
              </button>

              <div className="text-center px-4">
                <span className="text-[10px] uppercase tracking-[0.22em] text-brand-muted block">
                  {activePhoto?.category}
                </span>
                <span className="text-xs uppercase tracking-[0.16em] font-semibold text-brand-dark">
                  {activeIndex + 1} / {total}
                </span>
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="w-11 h-11 rounded-full border border-brand-dark/25 bg-brand-bg hover:bg-brand-dark hover:text-white text-brand-dark flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm"
                aria-label="Next photograph"
              >
                <CaretRight size={18} weight="bold" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Full-Screen Lightbox Modal */}
      {isLightboxOpen && activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 select-none"
        >
          {/* Lightbox Header */}
          <div className="flex items-center justify-between text-white/80 z-20">
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
              {activePhoto.category}
            </div>
            <div className="flex items-center gap-6">
              <span className="text-xs uppercase tracking-[0.18em] text-white/60">
                {activeIndex + 1} of {total}
              </span>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="p-2 text-white hover:opacity-70 transition-opacity cursor-pointer"
                aria-label="Close preview"
              >
                <X size={24} weight="bold" />
              </button>
            </div>
          </div>

          {/* Lightbox Main Image & Navigation */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2 sm:left-6 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all cursor-pointer"
              aria-label="Previous photograph"
            >
              <CaretLeft size={22} weight="bold" />
            </button>

            <img
              src={getOptimizedUrl(activePhoto.secure_url, 'f_auto,q_auto,w_1800')}
              alt={activePhoto.category}
              className="max-h-[82vh] max-w-[92vw] object-contain shadow-2xl transition-all duration-300"
            />

            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2 sm:right-6 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all cursor-pointer"
              aria-label="Next photograph"
            >
              <CaretRight size={22} weight="bold" />
            </button>
          </div>

          {/* Lightbox Footer */}
          <div className="flex items-center justify-center text-[10px] uppercase tracking-[0.2em] text-white/50 z-20">
            Use arrow keys or click arrows to navigate &bull; Esc to close
          </div>
        </div>
      )}
    </section>
  )
}
