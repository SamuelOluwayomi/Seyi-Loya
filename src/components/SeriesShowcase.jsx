import { useState, useEffect } from 'react'
import { ArrowUpRight, X, ArrowRight } from '@phosphor-icons/react'
import photoData from '../data/photos.json'
import { useTheme } from '../context/ThemeContext'

// Optimize Cloudinary image delivery URL
function getOptimizedUrl(url, transformation = 'f_auto,q_auto,w_1000') {
  if (!url) return ''
  return url.replace('/image/upload/', `/image/upload/${transformation}/`)
}

// Category service definitions
const CATEGORY_DETAILS = {
  'Brand shoot': {
    title: 'Brand Shoot',
    tagline: 'Commercial Visual Identity',
    description:
      'High-impact visual campaigns and product imagery crafted to elevate brand presence across digital and print media.',
    services: ['Product & Campaign Photography', 'Brand Storytelling', 'High-End Color Grading'],
  },
  Conferences: {
    title: 'Conferences & Summits',
    tagline: 'Live Corporate Coverage',
    description:
      'Professional documentation of keynote sessions, executive panels, and networking moments with crisp clarity.',
    services: ['Keynote & Stage Coverage', 'Executive Headshots', 'Fast-Turnaround Event Delivery'],
  },
  Excursions: {
    title: 'Excursions & Travel',
    tagline: 'Destination & Environment',
    description:
      'On-location visual documentation capturing the essence, architecture, and atmosphere of journeys and expeditions.',
    services: ['On-Location Shooting', 'Landscape & Spatial Framing', 'Editorial Travel Documentation'],
  },
  'Fashion-art': {
    title: 'Fashion & Art',
    tagline: 'Editorial & Conceptual',
    description:
      'Avant-garde studio lighting, lookbooks, and high-concept creative direction designed for fashion designers and models.',
    services: ['Studio & Outdoor Lookbooks', 'Creative Direction & Lighting', 'Model Portfolio Sets'],
  },
  Lifestyle: {
    title: 'Lifestyle & Portraits',
    tagline: 'Natural Light Storytelling',
    description:
      'Authentic everyday portraits and lifestyle frames capturing genuine personality and candid emotion.',
    services: ['Individual & Group Portraits', 'Natural Light Sessions', 'Custom Styled Shoots'],
  },
  Sport: {
    title: 'Sports & Athletics',
    tagline: 'High-Speed Action',
    description:
      'Dynamic athletic coverage with high shutter speeds capturing motion, intensity, and peak competitive moments.',
    services: ['Match & Game Documentation', 'Athlete Action Portraits', 'Sports Event Coverage'],
  },
  Thanksgiving: {
    title: 'Thanksgiving & Events',
    tagline: 'Milestones & Gatherings',
    description:
      'Intimate family celebrations, thanksgiving services, and milestone milestones captured with warmth and reverence.',
    services: ['Family & Group Photography', 'Ceremony & Praise Coverage', 'Archival Photo Albums'],
  },
  Wedding: {
    title: 'Weddings & Ceremonies',
    tagline: 'Timeless Celebrations',
    description:
      'Complete matrimonial documentation preserving the joy, traditional elegance, and emotion of your special day.',
    services: ['Traditional & White Weddings', 'Pre-Wedding & Engagement Sets', 'Full Day Coverage'],
  },
}

export default function SeriesShowcase() {
  const { isDark } = useTheme()
  const [selectedCollection, setSelectedCollection] = useState(null)
  const [activeCoverPhoto, setActiveCoverPhoto] = useState(null)

  const collections = Object.entries(photoData.categories).map(([name, photos]) => {
    const details = CATEGORY_DETAILS[name] || {
      title: name,
      tagline: 'Specialized Photography',
      description: 'Professional visual documentation and tailored shooting sessions.',
      services: ['On-location Photography', 'Post-processing & Editing', 'High-Res Digital Files'],
    }

    return {
      name,
      count: photos.length,
      coverPhoto: photos[0],
      photos,
      ...details,
    }
  })

  useEffect(() => {
    if (selectedCollection !== null) {
      document.body.style.overflow = 'hidden'
      setActiveCoverPhoto(selectedCollection.coverPhoto)
    } else {
      document.body.style.overflow = 'unset'
      setActiveCoverPhoto(null)
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedCollection])

  const col1 = [collections[0], collections[4]].filter(Boolean)
  const col2 = [collections[1], collections[5]].filter(Boolean)
  const col3 = [collections[2], collections[6]].filter(Boolean)
  const col4 = [collections[3], collections[7]].filter(Boolean)

  const columns = [
    { items: col1, offsetClass: 'translate-y-0' },
    { items: col2, offsetClass: 'sm:translate-y-8 md:translate-y-12' },
    { items: col3, offsetClass: 'sm:translate-y-16 md:translate-y-24' },
    { items: col4, offsetClass: 'sm:translate-y-24 md:translate-y-36' },
  ]

  const verticalLineColor = isDark ? 'rgba(255, 255, 255, 0.22)' : 'rgba(14, 16, 20, 0.14)'

  return (
    <section
      id="series"
      className={`relative py-16 sm:py-20 md:py-32 px-4 sm:px-6 md:px-8 border-t select-none overflow-hidden transition-colors duration-300 ${
        isDark
          ? 'bg-[#0a0b0d] border-white/10 text-white'
          : 'bg-brand-bg border-black/10 text-brand-dark'
      }`}
      style={{
        backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 39px, ${verticalLineColor} 39px, ${verticalLineColor} 40px)`,
        backgroundSize: '40px 100%',
      }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading - Direct on Background */}
        <div className="mb-8 sm:mb-12">
          <span
            className={`font-questrial text-xs uppercase tracking-[0.25em] font-normal block mb-1 ${
              isDark ? 'text-gray-400' : 'text-brand-muted'
            }`}
          >
            Photography Disciplines
          </span>
          <h2 className="font-questrial text-4xl sm:text-5xl md:text-6xl font-normal tracking-[0.04em] sm:tracking-[0.06em] uppercase">
            Collections
          </h2>
        </div>

        {/* Mobile Grid: 2-col compact */}
        <div className="sm:hidden pb-10">
          <div className="grid grid-cols-2 gap-3">
            {collections.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setSelectedCollection(item)}
                className={`group relative cursor-pointer p-0 rounded-2xl overflow-hidden bg-black shadow-lg transition-[transform,box-shadow] duration-200 active:scale-95 border text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue ${
                  isDark ? 'border-white/10' : 'border-black/20'
                }`}
                aria-label={`View ${item.title} details`}
              >
                {/* Cover photo — taller aspect for portrait feel */}
                <div className="relative aspect-3/4 w-full overflow-hidden">
                  <img
                    src={getOptimizedUrl(item.coverPhoto?.secure_url, 'f_auto,q_auto,w_600')}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-active:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent" />
                </div>

                {/* Overlay text */}
                <div className="absolute inset-0 flex flex-col justify-between p-3 text-white pointer-events-none">
                  <div className="flex justify-end">
                    <span className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <ArrowUpRight size={12} weight="bold" />
                    </span>
                  </div>
                  <div>
                    <span className="font-questrial text-[9px] uppercase tracking-[0.18em] text-white/65 block mb-0.5 font-normal leading-tight">
                      {item.tagline}
                    </span>
                    <h3 className="font-questrial text-sm font-medium tracking-wider uppercase text-white leading-tight">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Staggered Grid: 4-col with vertical offset */}
        <div className="hidden sm:block pb-16 md:pb-28">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {columns.map((col, colIndex) => (
              <div
                key={colIndex}
                className={`flex flex-col gap-6 transition-transform duration-500 ${col.offsetClass}`}
              >
                {col.items.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setSelectedCollection(item)}
                    className={`group relative cursor-pointer p-0 rounded-2xl overflow-hidden bg-black shadow-xl transition-[transform,border-color,box-shadow] duration-200 hover:shadow-2xl hover:border-brand-blue hover:-translate-y-1 active:translate-y-0 border text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-4 ${
                      isDark ? 'border-white/15' : 'border-black/30'
                    }`}
                    aria-label={`View ${item.title} details`}
                  >
                    {/* Cover Photograph */}
                    <div className="relative aspect-3/4 w-full overflow-hidden">
                      <img
                        src={getOptimizedUrl(item.coverPhoto?.secure_url, 'f_auto,q_auto,w_800')}
                        alt={item.name}
                        loading="lazy"
                        className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
                    </div>

                    {/* Metadata Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-between p-5 text-white pointer-events-none">
                      <div className="flex justify-end items-start">
                        <span className="w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-brand-blue group-hover:text-white transition-[background-color,color] duration-150">
                          <ArrowUpRight size={15} weight="bold" />
                        </span>
                      </div>

                      <div>
                        <span className="font-questrial text-xs uppercase tracking-[0.2em] text-white/70 block mb-0.5 font-normal">
                          {item.tagline}
                        </span>
                        <h3 className="font-questrial text-[1.7rem] sm:text-3xl font-medium tracking-[0.08em] sm:tracking-wider uppercase text-white leading-tight">
                          {item.title}
                        </h3>
                        <span className="mt-3 inline-flex min-h-10 items-center rounded-full bg-white px-4 text-[10px] uppercase tracking-[0.12em] text-brand-dark">
                          View Details
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Collection Focus & Service Spotlight Modal */}
      {selectedCollection && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 md:p-10 select-none overflow-y-auto"
        >
          <div
            className={`relative w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col md:flex-row border ${
              isDark
                ? 'bg-[#12141d] border-white/15 text-white'
                : 'bg-brand-bg border-black/20 text-brand-dark'
            }`}
          >
            <button
              type="button"
              onClick={() => setSelectedCollection(null)}
              className={`absolute top-4 right-4 z-30 p-2.5 rounded-full hover:bg-brand-blue hover:text-white transition-all cursor-pointer ${
                isDark
                  ? 'bg-white/10 text-white'
                  : 'bg-black/10 text-brand-dark'
              }`}
              aria-label="Close details"
            >
              <X size={20} weight="bold" />
            </button>

            <div
              className={`w-full md:w-1/2 p-4 sm:p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r ${
                isDark
                  ? 'bg-black/30 border-white/10'
                  : 'bg-black/5 border-black/10'
              }`}
            >
              <div
                className={`relative aspect-3/4 w-full rounded-2xl overflow-hidden bg-black shadow-inner p-0 border ${
                  isDark ? 'border-white/15' : 'border-black/20'
                }`}
              >
                <img
                  src={getOptimizedUrl(
                    activeCoverPhoto?.secure_url || selectedCollection.coverPhoto?.secure_url,
                    'f_auto,q_auto,w_1000'
                  )}
                  alt={selectedCollection.name}
                  className="w-full h-full object-cover object-center transition-all duration-300"
                />
              </div>

              {selectedCollection.photos.length > 1 && (
                <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1 no-scrollbar">
                  {selectedCollection.photos.slice(0, 5).map((photo) => (
                    <button
                      key={photo.id}
                      type="button"
                      onClick={() => setActiveCoverPhoto(photo)}
                      className={`relative w-14 h-14 rounded-lg overflow-hidden border transition-all cursor-pointer shrink-0 ${
                        activeCoverPhoto?.id === photo.id
                          ? 'border-brand-blue ring-2 ring-brand-blue/40 scale-105'
                          : isDark
                          ? 'border-white/20 opacity-70 hover:opacity-100'
                          : 'border-black/20 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={getOptimizedUrl(photo.secure_url, 'f_auto,q_auto,w_200')}
                        alt={selectedCollection.name}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 flex flex-col justify-between">
              <div>
                <span className="font-questrial text-xs uppercase tracking-[0.25em] text-brand-blue font-medium block mb-2">
                  {selectedCollection.tagline}
                </span>
                <h3 className="font-questrial text-3xl sm:text-4xl font-normal tracking-[0.06em] uppercase mb-4">
                  {selectedCollection.title}
                </h3>
                <p
                  className={`font-questrial text-base sm:text-lg leading-relaxed mb-6 font-normal ${
                    isDark ? 'text-gray-300' : 'text-brand-dark/85'
                  }`}
                >
                  {selectedCollection.description}
                </p>

                <div
                  className={`space-y-3 pt-4 border-t mb-8 ${
                    isDark ? 'border-white/10' : 'border-black/10'
                  }`}
                >
                  <span
                    className={`font-questrial text-[11px] uppercase tracking-[0.22em] block font-normal ${
                      isDark ? 'text-gray-400' : 'text-brand-muted'
                    }`}
                  >
                    What I Deliver
                  </span>
                  {selectedCollection.services.map((svc) => (
                    <div key={svc} className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-brand-blue text-white flex items-center justify-center text-[10px]">
                        <ArrowRight size={12} weight="bold" />
                      </span>
                      <span
                        className={`font-questrial text-sm uppercase tracking-[0.14em] font-medium ${
                          isDark ? 'text-gray-200' : 'text-brand-dark'
                        }`}
                      >
                        {svc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <a
                  href="#contact"
                  onClick={() => setSelectedCollection(null)}
                  className={`w-full inline-flex items-center justify-center gap-3 text-white px-6 py-3.5 rounded-full font-questrial text-xs uppercase tracking-[0.2em] font-medium shadow-lg hover:shadow-xl transition-all cursor-pointer ${
                    isDark
                      ? 'bg-brand-blue hover:bg-blue-600'
                      : 'bg-brand-dark hover:bg-black'
                  }`}
                >
                  <span>Book This Shoot</span>
                  <ArrowUpRight size={16} weight="bold" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
