import {
  ArrowUpRight,
  WhatsappLogo,
  InstagramLogo,
  TiktokLogo,
  EnvelopeSimple,
} from '@phosphor-icons/react'
import { useTheme } from '../context/ThemeContext'

// ─── UPDATE THESE MANUALLY when follower counts change ───────────────────────
const SOCIAL_STATS = {
  tiktok: {
    followers: '464',
    likes: '19.3K',
  },
  instagram: {
    posts: '44',
  },
}
// ─────────────────────────────────────────────────────────────────────────────

export default function About() {
  const { isDark } = useTheme()

  const aboutImageSrc = isDark ? '/seyi.png' : '/seyi2.png'

  const contactChannels = [
    {
      name: 'WhatsApp',
      icon: WhatsappLogo,
      href: 'https://wa.me/2348035265619',
      label: 'Direct Messaging',
    },
    {
      name: 'Instagram',
      icon: InstagramLogo,
      href: 'https://www.instagram.com/seyiloyaa_',
      label: 'Visual Portfolio',
    },
    {
      name: 'TikTok',
      icon: TiktokLogo,
      href: 'https://www.tiktok.com/@seyiloyaa_',
      label: 'Video & Motion',
    },
    {
      name: 'Email',
      icon: EnvelopeSimple,
      href: 'mailto:contact@seyiloyaa.com',
      label: 'Business Inquiries',
    },
  ]

  return (
    <section
      id="about"
      className={`relative py-20 md:py-32 px-4 sm:px-6 md:px-8 border-t select-none overflow-hidden transition-colors duration-300 ${isDark
        ? 'bg-[#0a0b0d] border-white/10 text-white'
        : 'bg-brand-bg border-black/10 text-brand-dark'
        }`}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <span
            className={`font-questrial text-xs uppercase tracking-[0.25em] font-normal block mb-2 ${isDark ? 'text-gray-400' : 'text-brand-muted'
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
              className={`relative w-full max-w-[380px] sm:max-w-[420px] aspect-4/5 rounded-3xl overflow-hidden shadow-2xl flex items-end justify-center transition-all duration-500 border ${isDark
                ? 'border-2 border-black bg-white shadow-[0_15px_50px_rgba(0,0,0,0.6)]'
                : 'border-black/15 bg-[#e2e5eb]'
                }`}
            >
              <img
                src={aboutImageSrc}
                alt="Ṣèyí Lóyàá"
                className="w-full h-full object-contain object-bottom drop-shadow-[0_10px_25px_rgba(0,0,0,0.2)] transition-all duration-500 block translate-y-0.5 scale-[1.02] origin-bottom"
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
              className={`font-questrial text-base sm:text-lg leading-relaxed font-normal ${isDark ? 'text-gray-300' : 'text-brand-dark/90'
                }`}
            >
              Deeply rooted in Yoruba culture and heritage, Ṣèyí operates at the intersection of
              documentary realism and refined editorial aesthetics. As a photographer, videographer,
              and cinematographer, his work is driven by an obsession with light, human authenticity,
              and culturally resonant visual compositions.
            </p>

            <p
              className={`font-questrial text-sm sm:text-base leading-relaxed font-normal ${isDark ? 'text-gray-400' : 'text-brand-muted'
                }`}
            >
              Every frame is treated with meticulous technical precision — from on-set camera craft
              to industry-defining color grading that honors rich skin tones and creates lasting
              emotional resonance across commercial, cultural, and matrimonial productions worldwide.
            </p>

            {/* Direct Connect / Contact Channels */}
            <div className="pt-4 space-y-3">
              <span
                className={`font-questrial text-[11px] uppercase tracking-[0.22em] font-medium block ${isDark ? 'text-gray-400' : 'text-brand-muted'
                  }`}
              >
                Connect &amp; Inquire Directly
              </span>

              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                {contactChannels.map((channel) => {
                  const Icon = channel.icon
                  return (
                    <a
                      key={channel.name}
                      href={channel.href}
                      target={channel.name === 'Email' ? '_self' : '_blank'}
                      rel="noreferrer"
                      className={`group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full text-xs uppercase tracking-[0.16em] font-medium transition-all duration-200 cursor-pointer border shadow-sm ${isDark
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

        {/* ─── VIDEO WORK & SOCIAL CREATOR CARDS ─────────────────── */}
        <div className={`mt-20 md:mt-28 pt-16 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`}>
          <div className="mb-10 sm:mb-12">
            <span
              className={`font-questrial text-xs uppercase tracking-[0.25em] font-normal block mb-2 ${isDark ? 'text-gray-400' : 'text-brand-muted'
                }`}
            >
              Motion &amp; Socials
            </span>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <h3 className="font-questrial text-3xl sm:text-4xl md:text-5xl font-normal tracking-wider uppercase">
                Connect &amp; Socials
              </h3>
              <p
                className={`text-xs uppercase tracking-[0.18em] font-questrial ${isDark ? 'text-gray-400' : 'text-brand-muted'
                  }`}
              >
                Watch on-page &bull; Connect directly
              </p>
            </div>
          </div>

          {/* Viral Video + Social Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left: Viral TikTok Video (Portrait embed) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full max-w-[300px] sm:max-w-[320px]">
                {/* Fitted 9:16 player frame */}
                <div
                  className={`w-full aspect-9/16 rounded-2xl overflow-hidden shadow-2xl border ${isDark ? 'border-white/15 bg-black' : 'border-black/15 bg-black'
                    }`}
                >
                  <iframe
                    src="https://www.tiktok.com/embed/v2/7676546760742898962"
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    title="Video Directed by Seyi Loyaa"
                    loading="lazy"
                  />
                </div>

                {/* Caption below video */}
                <div className="mt-3 px-1 flex items-center justify-between text-xs">
                  <div>
                    <h4 className={`font-questrial text-sm font-semibold uppercase tracking-wider ${isDark ? 'text-white' : 'text-brand-dark'}`}>
                      "Dangerous" Visual Concept
                    </h4>
                    <span
                      className={`text-[10px] uppercase tracking-[0.14em] font-questrial block mt-0.5 ${isDark ? 'text-gray-400' : 'text-brand-muted'
                        }`}
                    >
                      Ayra Starr &amp; Terry Apala &bull; Dir. Ṣèyí Lóyàá
                    </span>
                  </div>
                  <a
                    href="https://www.tiktok.com/@seyiloyaa_/video/7676546760742898962"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.14em] font-medium text-brand-blue hover:underline shrink-0 ml-2"
                  >
                    <span>TikTok</span>
                    <ArrowUpRight size={11} weight="bold" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Social Profile Cards stacked */}
            <div className="lg:col-span-7 flex flex-col gap-5">

              {/* TikTok Profile Card */}
              <div
                className={`p-5 rounded-3xl border transition-all duration-300 flex flex-col gap-4 ${isDark
                  ? 'bg-[#12141e] border-white/12 hover:border-cyan-400/40 shadow-xl'
                  : 'bg-white/80 border-black/10 hover:border-cyan-500/40 shadow-sm'
                  }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`relative w-14 h-14 rounded-2xl overflow-hidden border-2 shadow-md shrink-0 flex items-end justify-center ${isDark ? 'border-white/20 bg-white/10' : 'border-black/20 bg-white'
                        }`}
                    >
                      <img
                        src="/seyi.png"
                        alt="Ṣèyí Lóyàá on TikTok"
                        className="w-full h-full object-cover object-top"
                      />
                      <span className="absolute bottom-0 right-0 p-1 bg-black text-white rounded-tl-lg text-[10px]">
                        <TiktokLogo size={12} weight="fill" />
                      </span>
                    </div>
                    <div>
                      <h4 className="font-questrial text-sm font-semibold uppercase tracking-wider">
                        Ṣèyí Lóyàá
                      </h4>
                      <span className="font-questrial text-xs text-brand-blue font-medium block">
                        @seyiloyaa_
                      </span>
                      <span
                        className={`text-[10px] uppercase tracking-[0.14em] font-questrial block mt-0.5 ${isDark ? 'text-gray-400' : 'text-brand-muted'
                          }`}
                      >
                        Cinematographer &bull; Director
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[9.5px] uppercase tracking-[0.15em] font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                    Creator
                  </span>
                </div>

                {/* Stats row */}
                <div
                  className={`grid grid-cols-2 gap-2 py-2.5 px-3 rounded-2xl border ${isDark ? 'bg-black/30 border-white/8' : 'bg-black/5 border-black/5'
                    }`}
                >
                  <div className="text-center">
                    <span className="block font-questrial text-sm font-semibold tracking-wide">
                      {SOCIAL_STATS.tiktok.followers}
                    </span>
                    <span
                      className={`text-[9px] uppercase tracking-[0.15em] font-questrial ${isDark ? 'text-gray-400' : 'text-brand-muted'
                        }`}
                    >
                      Followers
                    </span>
                  </div>
                  <div className={`text-center border-l ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                    <span className="block font-questrial text-sm font-semibold tracking-wide">
                      {SOCIAL_STATS.tiktok.likes}
                    </span>
                    <span
                      className={`text-[9px] uppercase tracking-[0.15em] font-questrial ${isDark ? 'text-gray-400' : 'text-brand-muted'
                        }`}
                    >
                      Likes
                    </span>
                  </div>
                </div>

                <a
                  href="https://www.tiktok.com/@seyiloyaa_"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full font-questrial text-xs uppercase tracking-[0.18em] font-medium bg-black text-white hover:opacity-90 transition-opacity shadow-md"
                >
                  <TiktokLogo size={16} weight="fill" />
                  <span>Follow on TikTok</span>
                  <ArrowUpRight size={14} weight="bold" />
                </a>
              </div>

              {/* Instagram Profile Card */}
              <div
                className={`p-5 rounded-3xl border transition-all duration-300 flex flex-col gap-4 ${isDark
                  ? 'bg-[#12141e] border-white/12 hover:border-pink-500/40 shadow-xl'
                  : 'bg-white/80 border-black/10 hover:border-pink-500/40 shadow-sm'
                  }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`relative w-14 h-14 rounded-2xl overflow-hidden border-2 shadow-md shrink-0 flex items-end justify-center ${isDark ? 'border-white/20 bg-white/10' : 'border-black/20 bg-white'
                        }`}
                    >
                      <img
                        src="/seyi.png"
                        alt="Ṣèyí Lóyàá on Instagram"
                        className="w-full h-full object-cover object-top"
                      />
                      <span className="absolute bottom-0 right-0 p-1 bg-linear-to-tr from-yellow-500 via-pink-500 to-purple-600 text-white rounded-tl-lg text-[10px]">
                        <InstagramLogo size={12} weight="bold" />
                      </span>
                    </div>
                    <div>
                      <h4 className="font-questrial text-sm font-semibold uppercase tracking-wider">
                        Ṣèyí Lóyàá
                      </h4>
                      <span className="font-questrial text-xs text-brand-blue font-medium block">
                        @seyiloyaa_
                      </span>
                      <span
                        className={`text-[10px] uppercase tracking-[0.14em] font-questrial block mt-0.5 ${isDark ? 'text-gray-400' : 'text-brand-muted'
                          }`}
                      >
                        Visual Storyteller &bull; Nigeria
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[9.5px] uppercase tracking-[0.15em] font-medium bg-pink-500/10 text-pink-500 border border-pink-500/20 shrink-0">
                    Official
                  </span>
                </div>

                {/* Posts count only — no follower count shown */}
                <div
                  className={`flex items-center gap-2 py-2.5 px-3 rounded-2xl border ${isDark ? 'bg-black/30 border-white/8' : 'bg-black/5 border-black/5'
                    }`}
                >
                  <span className="font-questrial text-sm font-semibold tracking-wide">
                    {SOCIAL_STATS.instagram.posts}
                  </span>
                  <span
                    className={`text-[9px] uppercase tracking-[0.15em] font-questrial ${isDark ? 'text-gray-400' : 'text-brand-muted'
                      }`}
                  >
                    Posts on Instagram
                  </span>
                </div>

                <a
                  href="https://www.instagram.com/seyiloyaa_"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full font-questrial text-xs uppercase tracking-[0.18em] font-medium bg-linear-to-r from-purple-600 via-pink-600 to-yellow-500 text-white hover:opacity-95 transition-opacity shadow-md"
                >
                  <InstagramLogo size={16} weight="bold" />
                  <span>Follow on Instagram</span>
                  <ArrowUpRight size={14} weight="bold" />
                </a>
              </div>

              {/* WhatsApp Direct Line Card */}
              <div
                className={`p-5 rounded-3xl border transition-all duration-300 flex flex-col gap-4 ${isDark
                  ? 'bg-[#12141e] border-white/12 hover:border-emerald-500/40 shadow-xl'
                  : 'bg-white/80 border-black/10 hover:border-emerald-500/40 shadow-sm'
                  }`}
              >
                <div className="flex items-center gap-3.5">
                  <span className="w-14 h-14 rounded-2xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center shrink-0 border border-emerald-500/20 shadow-sm">
                    <WhatsappLogo size={28} weight="fill" />
                  </span>
                  <div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-questrial text-[10px] uppercase tracking-[0.2em] font-semibold text-emerald-500">
                        Active Direct Line
                      </span>
                    </div>
                    <p
                      className={`font-questrial text-xs leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'
                        }`}
                    >
                      Open for commercial briefs, destination shoots, and milestone ceremonies worldwide.
                    </p>
                  </div>
                </div>

                <a
                  href="https://wa.me/2348035265619"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full font-questrial text-xs uppercase tracking-[0.18em] font-medium bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-md"
                >
                  <WhatsappLogo size={16} weight="fill" />
                  <span>Chat on WhatsApp</span>
                  <ArrowUpRight size={14} weight="bold" />
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
