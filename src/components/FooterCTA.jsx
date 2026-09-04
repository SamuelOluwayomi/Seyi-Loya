import { ArrowUpRight, EnvelopeSimple } from '@phosphor-icons/react'
import photoData from '../data/photos.json'
import { useTheme } from '../context/ThemeContext'

// Optimize Cloudinary image delivery URL
function getOptimizedUrl(url, transformation = 'f_auto,q_auto,w_500') {
  if (!url) return ''
  return url.replace('/image/upload/', `/image/upload/${transformation}/`)
}

export default function FooterCTA() {
  const { isDark } = useTheme()
  const allPhotos = photoData.all || []
  const row1Photos = allPhotos.slice(0, 12)
  const row2Photos = allPhotos.slice(12, 24)
  const row3Photos = allPhotos.slice(24, 36)

  return (
    <footer
      id="contact"
      className={`relative border-t select-none overflow-hidden pt-16 md:pt-20 pb-12 transition-colors duration-300 ${
        isDark
          ? 'bg-[#0a0b0d] border-white/10 text-white'
          : 'bg-brand-bg border-black/10 text-brand-dark'
      }`}
    >
      {/* Interlaced Text & Photo Marquee Stream */}
      <div className="flex flex-col gap-3 sm:gap-4 py-4 overflow-hidden pointer-events-none opacity-90">
        {/* Row 1 - Marquee Left */}
        <div className="flex items-center gap-3 sm:gap-4 md:gap-5 whitespace-nowrap animate-marquee">
          {row1Photos.map((photo, i) => (
            <div key={`r1-${photo.id}-${i}`} className="flex items-center gap-3 sm:gap-4 md:gap-5 shrink-0">
              <div
                className={`w-24 sm:w-32 md:w-40 h-14 sm:h-18 md:h-22 rounded-xl sm:rounded-2xl overflow-hidden p-0 bg-black shadow-sm border ${
                  isDark ? 'border-white/20' : 'border-black/25'
                }`}
              >
                <img
                  src={getOptimizedUrl(photo.secure_url, 'f_auto,q_auto,w_400')}
                  alt={photo.category}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <span className="font-questrial text-2xl sm:text-3xl md:text-4xl font-normal uppercase tracking-[0.16em]">
                {i % 3 === 0 ? 'CAPTURED' : i % 3 === 1 ? 'IN LIGHT' : 'AUTHENTIC'}
              </span>
            </div>
          ))}
          {/* Repeat set for seamless infinite loop */}
          {row1Photos.map((photo, i) => (
            <div key={`r1-dup-${photo.id}-${i}`} className="flex items-center gap-3 sm:gap-4 md:gap-5 shrink-0">
              <div
                className={`w-24 sm:w-32 md:w-40 h-14 sm:h-18 md:h-22 rounded-xl sm:rounded-2xl overflow-hidden p-0 bg-black shadow-sm border ${
                  isDark ? 'border-white/20' : 'border-black/25'
                }`}
              >
                <img
                  src={getOptimizedUrl(photo.secure_url, 'f_auto,q_auto,w_400')}
                  alt={photo.category}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <span className="font-questrial text-2xl sm:text-3xl md:text-4xl font-normal uppercase tracking-[0.16em]">
                {i % 3 === 0 ? 'CAPTURED' : i % 3 === 1 ? 'IN LIGHT' : 'AUTHENTIC'}
              </span>
            </div>
          ))}
        </div>

        {/* Row 2 - Marquee Right */}
        <div className="flex items-center gap-3 sm:gap-4 md:gap-5 whitespace-nowrap animate-marquee-reverse">
          {row2Photos.map((photo, i) => (
            <div key={`r2-${photo.id}-${i}`} className="flex items-center gap-3 sm:gap-4 md:gap-5 shrink-0">
              <span className="font-questrial text-2xl sm:text-3xl md:text-4xl font-normal uppercase tracking-[0.16em]">
                {i % 3 === 0 ? 'VISUALISING' : i % 3 === 1 ? 'HERITAGE' : 'MOMENTS'}
              </span>
              <div
                className={`w-24 sm:w-32 md:w-40 h-14 sm:h-18 md:h-22 rounded-xl sm:rounded-2xl overflow-hidden p-0 bg-black shadow-sm border ${
                  isDark ? 'border-white/20' : 'border-black/25'
                }`}
              >
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
              <span className="font-questrial text-2xl sm:text-3xl md:text-4xl font-normal uppercase tracking-[0.16em]">
                {i % 3 === 0 ? 'VISUALISING' : i % 3 === 1 ? 'HERITAGE' : 'MOMENTS'}
              </span>
              <div
                className={`w-24 sm:w-32 md:w-40 h-14 sm:h-18 md:h-22 rounded-xl sm:rounded-2xl overflow-hidden p-0 bg-black shadow-sm border ${
                  isDark ? 'border-white/20' : 'border-black/25'
                }`}
              >
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
              <div
                className={`w-24 sm:w-32 md:w-40 h-14 sm:h-18 md:h-22 rounded-xl sm:rounded-2xl overflow-hidden p-0 bg-black shadow-sm border ${
                  isDark ? 'border-white/20' : 'border-black/25'
                }`}
              >
                <img
                  src={getOptimizedUrl(photo.secure_url, 'f_auto,q_auto,w_400')}
                  alt={photo.category}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <span className="font-questrial text-2xl sm:text-3xl md:text-4xl font-normal uppercase tracking-[0.16em]">
                {i % 3 === 0 ? 'SHOT BY' : i % 3 === 1 ? 'ṢÈYÍ LÓYÀÁ' : 'TIMELESS'}
              </span>
            </div>
          ))}
          {/* Repeat set for seamless infinite loop */}
          {row3Photos.map((photo, i) => (
            <div key={`r3-dup-${photo.id}-${i}`} className="flex items-center gap-3 sm:gap-4 md:gap-5 shrink-0">
              <div
                className={`w-24 sm:w-32 md:w-40 h-14 sm:h-18 md:h-22 rounded-xl sm:rounded-2xl overflow-hidden p-0 bg-black shadow-sm border ${
                  isDark ? 'border-white/20' : 'border-black/25'
                }`}
              >
                <img
                  src={getOptimizedUrl(photo.secure_url, 'f_auto,q_auto,w_400')}
                  alt={photo.category}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <span className="font-questrial text-2xl sm:text-3xl md:text-4xl font-normal uppercase tracking-[0.16em]">
                {i % 3 === 0 ? 'SHOT BY' : i % 3 === 1 ? 'ṢÈYÍ LÓYÀÁ' : 'TIMELESS'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Inquiry & Footer Bottom Section */}
      <div className="max-w-7xl mx-auto px-6 pt-16 md:pt-24">
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between pb-12 border-b gap-8 ${
            isDark ? 'border-white/10' : 'border-black/10'
          }`}
        >
          <div>
            <span
              className={`font-questrial text-xs uppercase tracking-[0.25em] font-normal block mb-2 ${
                isDark ? 'text-gray-400' : 'text-brand-muted'
              }`}
            >
              Available For Bookings Worldwide
            </span>
            <h2 className="font-questrial text-3xl sm:text-4xl md:text-5xl font-normal tracking-[0.06em] uppercase">
              Let's Create Together
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="mailto:contact@seyiloyaa.com"
              className={`inline-flex items-center gap-2 text-white px-7 py-4 rounded-full font-questrial text-xs uppercase tracking-[0.2em] font-medium shadow-md cursor-pointer transition-all ${
                isDark
                  ? 'bg-brand-blue hover:bg-blue-600'
                  : 'bg-brand-dark hover:bg-black'
              }`}
            >
              <EnvelopeSimple size={16} weight="bold" />
              <span>Inquire / Book Shoot</span>
              <ArrowUpRight size={15} weight="bold" />
            </a>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div
          className={`pt-8 flex flex-col sm:flex-row items-center justify-between text-xs uppercase tracking-[0.18em] font-normal gap-4 font-questrial ${
            isDark ? 'text-gray-400' : 'text-brand-muted'
          }`}
        >
          <div className="text-sm tracking-wider">
            Ṣèyí Lóyàá &copy; {new Date().getFullYear()} &bull; All Rights Reserved
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://www.instagram.com/seyiloyaa_"
              target="_blank"
              rel="noreferrer"
              className="hover:text-brand-blue transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://www.tiktok.com/@seyiloyaa_"
              target="_blank"
              rel="noreferrer"
              className="hover:text-brand-blue transition-colors"
            >
              TikTok
            </a>
            <a
              href="https://wa.me/2348035265619"
              target="_blank"
              rel="noreferrer"
              className="hover:text-brand-blue transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
