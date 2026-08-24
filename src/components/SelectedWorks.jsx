import { useState, useEffect, useRef } from 'react'
import { CaretLeft, CaretRight, CaretDown, X, ArrowsOut, Check, Play, Pause } from '@phosphor-icons/react'
import photoData from '../data/photos.json'
import { useTheme } from '../context/ThemeContext'

// Optimize Cloudinary image delivery URL
function getOptimizedUrl(url, transformation = 'f_auto,q_auto,w_1000') {
  if (!url) return ''
  return url.replace('/image/upload/', `/image/upload/${transformation}/`)
}

export default function SelectedWorks() {
  const { isDark } = useTheme()
  const [selectedCategory, setSelectedCategory] = useState('Brand shoot')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const touchStartX = useRef(null)
  const dropdownRef = useRef(null)

  const categories = [...Object.keys(photoData.categories), 'All']

  const displayedPhotos =
    selectedCategory === 'All'
      ? photoData.all
      : photoData.categories[selectedCategory] || []

  const total = displayedPhotos.length

  // Reset active card index when changing categories
  useEffect(() => {
    setActiveIndex(0)
  }, [selectedCategory])

  // Close category dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Auto-play interval with hover & modal pause detection
  useEffect(() => {
    if (!isPlaying || isHovered || isLightboxOpen || isDropdownOpen || total <= 1) {
      return
    }

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev < total - 1 ? prev + 1 : 0))
    }, 3500)

    return () => clearInterval(interval)
  }, [isPlaying, isHovered, isLightboxOpen, isDropdownOpen, total])

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

  // Disable body scroll when lightbox is open
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

  function getCardStyle(index) {
    let diff = index - activeIndex

    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total

    const absDiff = Math.abs(diff)

    if (absDiff > 2) {
      return { display: 'none' }
    }

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

  const ruledLineColor = isDark ? 'rgba(255, 255, 255, 0.22)' : 'rgba(14, 16, 20, 0.16)'

  return (
    <section
      id="works"
      className={`relative py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 border-t select-none overflow-hidden transition-colors duration-300 ${
        isDark
          ? 'bg-[#0a0b0d] border-white/10 text-white'
          : 'bg-brand-bg border-black/10 text-brand-dark'
      }`}
      style={{
        backgroundImage: `repeating-linear-gradient(to bottom, transparent, transparent 31px, ${ruledLineColor} 31px, ${ruledLineColor} 32px)`,
        backgroundSize: '100% 32px',
      }}
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center">
        {/* Section Heading */}
        <div className="w-full text-center mb-3">
          <span
            className={`text-[10px] uppercase tracking-[0.25em] font-medium block mb-1 ${
              isDark ? 'text-gray-400' : 'text-brand-muted'
            }`}
          >
            Selected Works
          </span>
          <h2 className="font-questrial text-3xl sm:text-4xl md:text-5xl font-normal tracking-[0.06em] uppercase">
            Visual Archive
          </h2>
        </div>

        {/* Single Capsule Category Dropdown */}
        <div className="w-full flex justify-center sm:justify-start mb-1 sm:mb-3">
          <div ref={dropdownRef} className="relative z-40">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`group inline-flex items-center gap-3 px-5 py-2 rounded-full text-white text-xs uppercase tracking-[0.16em] font-medium shadow-md transition-all cursor-pointer ${
                isDark ? 'bg-brand-blue hover:bg-blue-600' : 'bg-brand-dark hover:bg-black'
              }`}
              aria-expanded={isDropdownOpen}
              aria-haspopup="listbox"
            >
              <span>{selectedCategory}</span>
              <span className="text-white/70 font-normal">({currentCount})</span>
              <CaretDown
                size={14}
                weight="bold"
                className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 mt-2 w-64 max-h-80 overflow-y-auto rounded-2xl shadow-2xl p-2 z-50 no-scrollbar border ${
                  isDark
                    ? 'bg-[#141620] border-white/15'
                    : 'bg-brand-bg border-black/20'
                }`}
              >
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
                            ? 'bg-brand-blue text-white shadow-sm'
                            : isDark
                            ? 'text-gray-200 hover:bg-white/10'
                            : 'text-brand-dark hover:bg-black/5'
                        }`}
                      >
                        <span className="truncate">{category}</span>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[11px] ${
                              isSelected
                                ? 'text-white/80'
                                : isDark
                                ? 'text-gray-400'
                                : 'text-brand-muted'
                            }`}
                          >
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
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative w-full max-w-4xl mx-auto h-[380px] sm:h-[460px] md:h-[500px] flex items-center justify-center mt-0.5 sm:mt-2 mb-2"
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
                  className={`absolute w-[240px] sm:w-[290px] md:w-[330px] aspect-3/4 p-0 rounded-2xl overflow-hidden bg-black shadow-2xl cursor-pointer border ${
                    isDark ? 'border-white/20' : 'border-black/30'
                  } ${
                    isCenter
                      ? isDark
                        ? 'ring-1 ring-white/20'
                        : 'ring-1 ring-black/10'
                      : 'hover:opacity-90'
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
                      className="absolute bottom-4 right-4 z-40 p-2.5 rounded-full bg-black/80 hover:bg-brand-blue text-white backdrop-blur-md transition-all shadow-md cursor-pointer"
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

        {/* Carousel Navigation & Auto-Play Controls */}
        {total > 0 && (
          <div className="flex flex-col items-center gap-2 mt-3 w-full">
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Previous Button */}
              <button
                type="button"
                onClick={handlePrev}
                className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm ${
                  isDark
                    ? 'border-white/20 bg-[#141620] text-white hover:bg-brand-blue hover:border-brand-blue'
                    : 'border-black/20 bg-white text-brand-dark hover:bg-brand-dark hover:border-brand-dark hover:text-white'
                }`}
                aria-label="Previous photograph"
              >
                <CaretLeft size={18} weight="bold" />
              </button>

              {/* Status Info */}
              <div className="text-center px-3 sm:px-4">
                <span
                  className={`text-[10px] uppercase tracking-[0.22em] block font-normal ${
                    isDark ? 'text-gray-400' : 'text-brand-muted'
                  }`}
                >
                  {activePhoto?.category}
                </span>
                <span className="font-questrial text-xs uppercase tracking-[0.16em] font-medium">
                  {activeIndex + 1} / {total}
                </span>
              </div>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNext}
                className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm ${
                  isDark
                    ? 'border-white/20 bg-[#141620] text-white hover:bg-brand-blue hover:border-brand-blue'
                    : 'border-black/20 bg-white text-brand-dark hover:bg-brand-dark hover:border-brand-dark hover:text-white'
                }`}
                aria-label="Next photograph"
              >
                <CaretRight size={18} weight="bold" />
              </button>

              {/* Play / Pause Toggle Button */}
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm ml-1 ${
                  isPlaying
                    ? isDark
                      ? 'border-brand-blue bg-brand-blue/20 text-brand-blue hover:bg-brand-blue hover:text-white'
                      : 'border-brand-blue bg-blue-50 text-brand-blue hover:bg-brand-blue hover:text-white'
                    : isDark
                    ? 'border-white/20 bg-[#141620] text-gray-400 hover:text-white hover:border-white'
                    : 'border-black/20 bg-white text-brand-muted hover:text-brand-dark hover:border-brand-dark'
                }`}
                aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
                title={isPlaying ? 'Pause auto-move' : 'Play auto-move'}
              >
                {isPlaying ? <Pause size={16} weight="bold" /> : <Play size={16} weight="bold" className="translate-x-0.5" />}
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
          <div className="flex items-center justify-between text-white/80 z-20">
            <div className="font-questrial text-xs uppercase tracking-[0.2em] font-medium text-white">
              {activePhoto.category}
            </div>
            <div className="flex items-center gap-6">
              <span className="font-questrial text-xs uppercase tracking-[0.18em] text-white/60">
                {activeIndex + 1} of {total}
              </span>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="p-2 text-white hover:text-brand-blue transition-colors cursor-pointer"
                aria-label="Close preview"
              >
                <X size={24} weight="bold" />
              </button>
            </div>
          </div>

          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2 sm:left-6 z-20 p-3 rounded-full bg-white/10 hover:bg-brand-blue text-white backdrop-blur-md transition-all cursor-pointer"
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
              className="absolute right-2 sm:right-6 z-20 p-3 rounded-full bg-white/10 hover:bg-brand-blue text-white backdrop-blur-md transition-all cursor-pointer"
              aria-label="Next photograph"
            >
              <CaretRight size={22} weight="bold" />
            </button>
          </div>

          <div className="flex items-center justify-center text-[10px] uppercase tracking-[0.2em] text-white/50 z-20 font-questrial">
            Use arrow keys or click arrows to navigate &bull; Esc to close
          </div>
        </div>
      )}
    </section>
  )
}
