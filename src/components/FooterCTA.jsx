import { ArrowUpRight, EnvelopeSimple, InstagramLogo, XLogo, WhatsappLogo, Camera } from '@phosphor-icons/react'
import photoData from '../data/photos.json'

// Optimize Cloudinary image delivery URL
function getOptimizedUrl(url, transformation = 'f_auto,q_auto,w_500') {
  if (!url) return ''
  return url.replace('/image/upload/', `/image/upload/${transformation}/`)
}

export default function FooterCTA() {
  // Curate sample photos for the 3 marquee rows
  const allPhotos = photoData.all || []
  const row1Photos = allPhotos.slice(0, 12)
  const row2Photos = allPhotos.slice(12, 24)
  const row3Photos = allPhotos.slice(24, 36)

  return (
    <footer id="contact" className="relative bg-brand-bg border-t border-brand-border select-none overflow-hidden pt-20 pb-12">
      {/* Interlaced Text & Photo Marquee Stream - Compact & Refined */}
      <div className="flex flex-col gap-2.5 sm:gap-3.5 py-4 overflow-hidden pointer-events-none opacity-95">
        {/* Row 1 - Marquee Left */}
        <div className="flex items-center gap-3 sm:gap-4 md:gap-5 whitespace-nowrap animate-marquee">
          {row1Photos.map((photo, i) => (
            <div key={`r1-${photo.id}-${i}`} className="flex items-center gap-3 sm:gap-4 md:gap-5 shrink-0">
              <div className="w-24 sm:w-32 md:w-40 h-14 sm:h-18 md:h-22 rounded-xl sm:rounded-2xl border border-brand-dark/25 overflow-hidden p-0 bg-brand-dark shadow-sm">
                <img
                  src={getOptimizedUrl(photo.secure_url, 'f_auto,q_auto,w_400')}
                  alt={photo.category}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <span className="font-ojuju text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-brand-dark">
                {i % 3 === 0 ? 'CAPTURED' : i % 3 === 1 ? 'IN LIGHT' : 'AUTHENTIC'}
              </span>
            </div>
          ))}
          {/* Repeat set for seamless infinite loop */}
          {row1Photos.map((photo, i) => (
            <div key={`r1-dup-${photo.id}-${i}`} className="flex items-center gap-3 sm:gap-4 md:gap-5 shrink-0">
              <div className="w-24 sm:w-32 md:w-40 h-14 sm:h-18 md:h-22 rounded-xl sm:rounded-2xl border border-brand-dark/25 overflow-hidden p-0 bg-brand-dark shadow-sm">
                <img
                  src={getOptimizedUrl(photo.secure_url, 'f_auto,q_auto,w_400')}
                  alt={photo.category}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <span className="font-ojuju text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-brand-dark">
                {i % 3 === 0 ? 'CAPTURED' : i % 3 === 1 ? 'IN LIGHT' : 'AUTHENTIC'}
              </span>
            </div>
          ))}
        </div>

        {/* Row 2 - Marquee Right */}
        <div className="flex items-center gap-3 sm:gap-4 md:gap-5 whitespace-nowrap animate-marquee-reverse">
          {row2Photos.map((photo, i) => (
            <div key={`r2-${photo.id}-${i}`} className="flex items-center gap-3 sm:gap-4 md:gap-5 shrink-0">
              <span className="font-ojuju text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-brand-dark">
                {i % 3 === 0 ? 'VISUALISING' : i % 3 === 1 ? 'HERITAGE' : 'MOMENTS'}
              </span>
              <div className="w-24 sm:w-32 md:w-40 h-14 sm:h-18 md:h-22 rounded-xl sm:rounded-2xl border border-brand-dark/25 overflow-hidden p-0 bg-brand-dark shadow-sm">
                <img
                  src={getOptimizedUrl(photo.secure_url, 'f_auto,q_auto,w_400')}
                  alt={photo.category}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
          {/* Repeat set for seamless infinite loop */}
          {row2Photos.map((photo, i) => (
            <div key={`r2-dup-${photo.id}-${i}`} className="flex items-center gap-3 sm:gap-4 md:gap-5 shrink-0">
              <span className="font-ojuju text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-brand-dark">
                {i % 3 === 0 ? 'VISUALISING' : i % 3 === 1 ? 'HERITAGE' : 'MOMENTS'}
              </span>
              <div className="w-24 sm:w-32 md:w-40 h-14 sm:h-18 md:h-22 rounded-xl sm:rounded-2xl border border-brand-dark/25 overflow-hidden p-0 bg-brand-dark shadow-sm">
                <img
                  src={getOptimizedUrl(photo.secure_url, 'f_auto,q_auto,w_400')}
                  alt={photo.category}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Row 3 - Marquee Left */}
        <div className="flex items-center gap-3 sm:gap-4 md:gap-5 whitespace-nowrap animate-marquee">
          {row3Photos.map((photo, i) => (
            <div key={`r3-${photo.id}-${i}`} className="flex items-center gap-3 sm:gap-4 md:gap-5 shrink-0">
              <div className="w-24 sm:w-32 md:w-40 h-14 sm:h-18 md:h-22 rounded-xl sm:rounded-2xl border border-brand-dark/25 overflow-hidden p-0 bg-brand-dark shadow-sm">
                <img
                  src={getOptimizedUrl(photo.secure_url, 'f_auto,q_auto,w_400')}
                  alt={photo.category}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <span className="font-ojuju text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-brand-dark">
                {i % 3 === 0 ? 'SHOT BY' : i % 3 === 1 ? 'ṢÈYÍ LÓYÀÁ' : 'TIMELESS'}
              </span>
            </div>
          ))}
          {/* Repeat set for seamless infinite loop */}
          {row3Photos.map((photo, i) => (
            <div key={`r3-dup-${photo.id}-${i}`} className="flex items-center gap-3 sm:gap-4 md:gap-5 shrink-0">
              <div className="w-24 sm:w-32 md:w-40 h-14 sm:h-18 md:h-22 rounded-xl sm:rounded-2xl border border-brand-dark/25 overflow-hidden p-0 bg-brand-dark shadow-sm">
                <img
                  src={getOptimizedUrl(photo.secure_url, 'f_auto,q_auto,w_400')}
                  alt={photo.category}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <span className="font-ojuju text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-brand-dark">
                {i % 3 === 0 ? 'SHOT BY' : i % 3 === 1 ? 'ṢÈYÍ LÓYÀÁ' : 'TIMELESS'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Inquiry & Footer Bottom Section */}
      <div className="max-w-7xl mx-auto px-6 pt-16 md:pt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-brand-border gap-8">
          <div>
            <span className="font-ojuju text-xs uppercase tracking-[0.25em] text-brand-muted font-bold block mb-2">
              Available For Bookings Worldwide
            </span>
            <h2 className="font-ojuju text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-brand-dark uppercase">
              Let's Create Together
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="mailto:contact@seyiloyaa.com"
              className="inline-flex items-center gap-2 bg-brand-dark text-white px-7 py-4 rounded-full font-ojuju text-xs uppercase tracking-[0.2em] font-bold hover:bg-black transition-all shadow-md cursor-pointer"
            >
              <EnvelopeSimple size={16} weight="bold" />
              <span>Inquire / Book Shoot</span>
              <ArrowUpRight size={15} weight="bold" />
            </a>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs uppercase tracking-[0.18em] text-brand-muted font-medium gap-4">
          <div className="font-ojuju text-sm tracking-wider font-semibold text-brand-dark">
            Ṣèyí Lóyàá &copy; {new Date().getFullYear()} &bull; All Rights Reserved
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-brand-dark transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-brand-dark transition-colors"
            >
              Twitter / X
            </a>
            <a
              href="https://wa.me"
              target="_blank"
              rel="noreferrer"
              className="hover:text-brand-dark transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
