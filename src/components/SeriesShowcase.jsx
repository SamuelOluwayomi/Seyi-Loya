import { useState, useEffect } from 'react'
import { ArrowUpRight, X, ArrowRight, Camera, Sparkle } from '@phosphor-icons/react'
import photoData from '../data/photos.json'

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
  const [selectedCollection, setSelectedCollection] = useState(null)
  const [activeCoverPhoto, setActiveCoverPhoto] = useState(null)

  // Build collection list with cover photos and details
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

  // Lock body scroll when modal is active
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

  // 4 staggered columns for diagonal grid layout
  const col1 = [collections[0], collections[4]].filter(Boolean)
  const col2 = [collections[1], collections[5]].filter(Boolean)
  const col3 = [collections[2], collections[6]].filter(Boolean)
  const col4 = [collections[3], collections[7]].filter(Boolean)

  const columns = [
    { items: col1, offsetClass: 'translate-y-0' },
    { items: col2, offsetClass: 'translate-y-4 sm:translate-y-8 md:translate-y-12' },
    { items: col3, offsetClass: 'translate-y-8 sm:translate-y-16 md:translate-y-24' },
    { items: col4, offsetClass: 'translate-y-12 sm:translate-y-24 md:translate-y-36' },
  ]

  return (
    <section
      id="series"
      className="relative py-20 md:py-32 px-4 sm:px-6 md:px-8 border-t border-brand-border select-none overflow-hidden"
      style={{
        backgroundColor: '#f7f6f4',
        backgroundImage: `
          linear-gradient(45deg, rgba(18, 19, 22, 0.28) 25%, transparent 25%),
          linear-gradient(-45deg, rgba(18, 19, 22, 0.28) 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, rgba(18, 19, 22, 0.28) 75%),
          linear-gradient(-45deg, transparent 75%, rgba(18, 19, 22, 0.28) 75%)
        `,
        backgroundSize: '120px 120px',
        backgroundPosition: '0 0, 0 60px, 60px -60px, -60px 0px',
      }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading - Direct on Background */}
        <div className="mb-12">
          <span className="font-ojuju text-xs uppercase tracking-[0.25em] text-brand-dark/70 font-bold block mb-1">
            Photography Disciplines
          </span>
          <h2 className="font-ojuju text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-brand-dark uppercase">
            Collections
          </h2>
        </div>

        {/* Diagonal Staggered Grid */}
        <div className="pb-16 md:pb-28">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {columns.map((col, colIndex) => (
              <div
                key={colIndex}
                className={`flex flex-col gap-6 transition-transform duration-500 ${col.offsetClass}`}
              >
                {col.items.map((item) => (
                  <div
                    key={item.name}
                    onClick={() => setSelectedCollection(item)}
                    className="group relative cursor-pointer p-0 border border-brand-dark/30 rounded-2xl overflow-hidden bg-brand-dark shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-black hover:-translate-y-1"
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
                        <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-brand-dark transition-all duration-200">
                          <ArrowUpRight size={15} weight="bold" />
                        </span>
                      </div>

                      <div>
                        <span className="font-ojuju text-xs uppercase tracking-[0.2em] text-white/70 block mb-0.5">
                          {item.tagline}
                        </span>
                        <h3 className="font-ojuju text-2xl sm:text-3xl font-bold tracking-wider uppercase text-white leading-tight">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </div>
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
          <div className="relative w-full max-w-4xl bg-brand-bg rounded-3xl border border-brand-dark/25 shadow-2xl overflow-hidden my-auto flex flex-col md:flex-row">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedCollection(null)}
              className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/10 hover:bg-black text-brand-dark hover:text-white transition-all cursor-pointer"
              aria-label="Close details"
            >
              <X size={20} weight="bold" />
            </button>

            {/* Left Side: Hero Image with Thumbnails */}
            <div className="w-full md:w-1/2 p-4 sm:p-6 flex flex-col justify-between bg-black/5 border-b md:border-b-0 md:border-r border-brand-dark/10">
              <div className="relative aspect-3/4 w-full rounded-2xl overflow-hidden border border-brand-dark/20 bg-brand-dark shadow-inner p-0">
                <img
                  src={getOptimizedUrl(
                    activeCoverPhoto?.secure_url || selectedCollection.coverPhoto?.secure_url,
                    'f_auto,q_auto,w_1000'
                  )}
                  alt={selectedCollection.name}
                  className="w-full h-full object-cover object-center transition-all duration-300"
                />
              </div>

              {/* Sample Photo Thumbnails */}
              {selectedCollection.photos.length > 1 && (
                <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1 no-scrollbar">
                  {selectedCollection.photos.slice(0, 5).map((photo) => (
                    <button
                      key={photo.id}
                      type="button"
                      onClick={() => setActiveCoverPhoto(photo)}
                      className={`relative w-14 h-14 rounded-lg overflow-hidden border transition-all cursor-pointer shrink-0 ${activeCoverPhoto?.id === photo.id
                        ? 'border-brand-dark ring-2 ring-brand-dark/30 scale-105'
                        : 'border-brand-dark/20 opacity-70 hover:opacity-100'
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

            {/* Right Side: Editorial Discipline Information */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 flex flex-col justify-between">
              <div>
                <span className="font-ojuju text-xs uppercase tracking-[0.25em] text-brand-muted font-bold block mb-2">
                  {selectedCollection.tagline}
                </span>
                <h3 className="font-ojuju text-3xl sm:text-4xl font-bold tracking-tight text-brand-dark uppercase mb-4">
                  {selectedCollection.title}
                </h3>
                <p className="font-ojuju text-base sm:text-lg text-brand-dark/85 leading-relaxed mb-6 font-medium">
                  {selectedCollection.description}
                </p>

                {/* Offerings Checklist */}
                <div className="space-y-3 pt-4 border-t border-brand-dark/10 mb-8">
                  <span className="font-ojuju text-[11px] uppercase tracking-[0.22em] text-brand-muted block font-bold">
                    What I Deliver
                  </span>
                  {selectedCollection.services.map((svc) => (
                    <div key={svc} className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-brand-dark text-white flex items-center justify-center text-[10px]">
                        <ArrowRight size={12} weight="bold" />
                      </span>
                      <span className="font-ojuju text-sm uppercase tracking-[0.14em] font-semibold text-brand-dark">
                        {svc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div>
                <a
                  href="#contact"
                  onClick={() => setSelectedCollection(null)}
                  className="w-full inline-flex items-center justify-center gap-3 bg-brand-dark text-white hover:bg-black px-6 py-3.5 rounded-full font-ojuju text-xs uppercase tracking-[0.2em] font-bold shadow-lg hover:shadow-xl transition-all cursor-pointer"
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
