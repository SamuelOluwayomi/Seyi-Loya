import { ArrowUpRight, WhatsappLogo, InstagramLogo, TiktokLogo, EnvelopeSimple, Phone } from '@phosphor-icons/react'
import { useTheme } from '../context/ThemeContext'

export default function About() {
  const { isDark } = useTheme()

  // In dark mode: use silhouette image in white gallery frame; in light mode: use detailed portrait
  const aboutImageSrc = isDark ? '/seyi.png' : '/seyi2.png'

  const contactChannels = [
    {
      name: 'WhatsApp',
      icon: WhatsappLogo,
      href: 'https://wa.me/+2348000000000',
      label: 'Direct Messaging',
    },
    {
      name: 'Instagram',
      icon: InstagramLogo,
      href: 'https://instagram.com/seyiloyaa',
      label: 'Visual Portfolio',
    },
    {
      name: 'TikTok',
      icon: TiktokLogo,
      href: 'https://tiktok.com/@seyiloyaa',
      label: 'Video & Motion',
    },
    {
      name: 'Email',
      icon: EnvelopeSimple,
      href: 'mailto:contact@seyiloyaa.com',
      label: 'Business Inquiries',
    },
    {
      name: 'Phone',
      icon: Phone,
      href: 'tel:+2348000000000',
      label: 'Direct Line',
    },
  ]

  return (
    <section
      id="about"
      className={`relative py-20 md:py-32 px-4 sm:px-6 md:px-8 border-t select-none overflow-hidden transition-colors duration-300 ${
        isDark
          ? 'bg-[#0a0b0d] border-white/10 text-white'
          : 'bg-brand-bg border-black/10 text-brand-dark'
      }`}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <span
            className={`font-questrial text-xs uppercase tracking-[0.25em] font-normal block mb-2 ${
              isDark ? 'text-gray-400' : 'text-brand-muted'
            }`}
          >
            Behind The Lens
          </span>
          <h2 className="font-questrial text-4xl sm:text-5xl md:text-6xl font-normal tracking-[0.06em] uppercase">
            About Ṣèyí
          </h2>
        </div>

        {/* Two-Column Profile & Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Visual Framing Column */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              className={`relative w-full max-w-[380px] sm:max-w-[420px] aspect-4/5 rounded-3xl overflow-hidden shadow-2xl flex items-end justify-center transition-all duration-500 border ${
                isDark
                  ? 'border-2 border-white bg-white shadow-[0_15px_50px_rgba(0,0,0,0.6)]'
                  : 'border-black/15 bg-[#e2e5eb]'
              }`}
            >
              <img
                src={aboutImageSrc}
                alt="Ṣèyí Lóyàá"
                className="w-full h-full object-contain object-bottom drop-shadow-[0_10px_25px_rgba(0,0,0,0.2)] transition-all duration-500 block"
              />
            </div>
          </div>

          {/* Biography & Creative Manifesto Column */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className="space-y-2">
              <span className="font-questrial text-xs uppercase tracking-[0.22em] text-brand-blue font-medium block">
                Yoruba Heritage &bull; Visual Storyteller
              </span>
              <h3 className="font-questrial text-2xl sm:text-3xl md:text-4xl font-normal uppercase tracking-wide leading-snug">
                Àkinrìndé Olúwaṣéyì
              </h3>
            </div>

            <p
              className={`font-questrial text-base sm:text-lg leading-relaxed font-normal ${
                isDark ? 'text-gray-300' : 'text-brand-dark/90'
              }`}
            >
              Deeply rooted in Yoruba culture and heritage, Ṣèyí operates at the intersection of
              documentary realism and refined editorial aesthetics. As a photographer, videographer,
              and cinematographer, his work is driven by an obsession with light, human authenticity,
              and culturally resonant visual compositions.
            </p>

            <p
              className={`font-questrial text-sm sm:text-base leading-relaxed font-normal ${
                isDark ? 'text-gray-400' : 'text-brand-muted'
              }`}
            >
              Every frame is treated with meticulous technical precision — from on-set camera craft
              to industry-defining color grading that honors rich skin tones and creates lasting
              emotional resonance across commercial, cultural, and matrimonial productions worldwide.
            </p>

            {/* Direct Connect / Contact Channels */}
            <div className="pt-4 space-y-3">
              <span
                className={`font-questrial text-[11px] uppercase tracking-[0.22em] font-medium block ${
                  isDark ? 'text-gray-400' : 'text-brand-muted'
                }`}
              >
                Connect & Inquire Directly
              </span>

              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                {contactChannels.map((channel) => {
                  const Icon = channel.icon
                  return (
                    <a
                      key={channel.name}
                      href={channel.href}
                      target={channel.name === 'Email' || channel.name === 'Phone' ? '_self' : '_blank'}
                      rel="noreferrer"
                      className={`group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full text-xs uppercase tracking-[0.16em] font-medium transition-all duration-200 cursor-pointer border shadow-sm ${
                        isDark
                          ? 'border-white/15 bg-[#141620] text-white hover:border-brand-blue hover:text-brand-blue hover:bg-brand-blue/10'
                          : 'border-black/15 bg-white text-brand-dark hover:border-brand-blue hover:text-brand-blue hover:bg-blue-50/50'
                      }`}
                      title={channel.label}
                    >
                      <Icon size={16} weight="bold" />
                      <span>{channel.name}</span>
                      <ArrowUpRight
                        size={12}
                        weight="bold"
                        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
