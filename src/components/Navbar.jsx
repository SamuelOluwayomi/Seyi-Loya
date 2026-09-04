import { useState } from 'react'
import { List, X, ArrowUpRight, Sun, Moon } from '@phosphor-icons/react'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isDark, toggleTheme } = useTheme()

  const navLinks = [
    { name: 'Selected Works', href: '#works' },
    { name: 'Series', href: '#series' },
    { name: 'About', href: '#about' },
    { name: 'Exhibitions', href: '#exhibitions' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-colors duration-300 ${
        isDark
          ? 'bg-[#0a0b0d]/90 border-white/10 text-white'
          : 'bg-brand-bg/90 border-black/8 text-brand-dark'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 md:h-20 flex items-center justify-between">
        <a href="#" className="flex flex-col group rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-4 focus-visible:ring-offset-brand-bg">
          <span className="font-questrial text-[22px] sm:text-2xl tracking-[0.04em] sm:tracking-[0.08em] font-medium group-hover:text-brand-blue transition-colors duration-150">
            Ṣèyí Lóyàá
          </span>
        </a>

        <nav
          className={`hidden md:flex items-center space-x-10 text-xs uppercase tracking-[0.22em] font-medium ${
            isDark ? 'text-gray-400' : 'text-brand-muted'
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-4 focus-visible:ring-offset-brand-bg ${
                isDark ? 'hover:text-white' : 'hover:text-brand-dark'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {/* Dark / Light Mode Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className={`w-10 h-10 rounded-full border flex items-center justify-center hover:border-brand-blue hover:text-brand-blue active:scale-95 transition-[background-color,border-color,color,transform] duration-150 cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-4 ${
              isDark
                ? 'border-white/20 bg-[#14161f] text-white focus-visible:ring-offset-[#0a0b0d]'
                : 'border-black/15 bg-white/80 text-brand-dark focus-visible:ring-offset-brand-bg'
            }`}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            {isDark ? <Sun size={17} weight="bold" /> : <Moon size={17} weight="bold" />}
          </button>

          <a
            href="#contact"
            className={`group inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white px-5 py-2.5 rounded-full font-medium transition-[background-color,transform] duration-150 shadow-sm active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-4 ${
              isDark
                ? 'bg-brand-blue hover:bg-blue-600 focus-visible:ring-offset-[#0a0b0d]'
                : 'bg-brand-dark hover:bg-black focus-visible:ring-offset-brand-bg'
            }`}
          >
            <span>Inquire</span>
            <ArrowUpRight size={14} weight="bold" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          {/* Mobile Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className={`w-11 h-11 rounded-full border flex items-center justify-center cursor-pointer active:scale-95 transition-[background-color,border-color,color,transform] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 ${
              isDark
                ? 'border-white/20 bg-[#14161f] text-white focus-visible:ring-offset-[#0a0b0d]'
                : 'border-black/15 bg-white/90 text-brand-dark focus-visible:ring-offset-brand-bg'
            }`}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            {isDark ? <Sun size={16} weight="bold" /> : <Moon size={16} weight="bold" />}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`h-11 px-3 rounded-full border inline-flex items-center gap-2 font-questrial text-[11px] uppercase tracking-[0.16em] cursor-pointer active:scale-95 transition-[background-color,border-color,color,transform] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 ${
              isDark
                ? 'border-white/20 bg-[#14161f] text-white focus-visible:ring-offset-[#0a0b0d]'
                : 'border-black/15 bg-white/90 text-brand-dark focus-visible:ring-offset-brand-bg'
            }`}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={19} weight="bold" /> : <List size={19} weight="bold" />}
            <span>{mobileMenuOpen ? 'Close' : 'Menu'}</span>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          className={`md:hidden border-y px-4 py-5 shadow-xl ${
            isDark
              ? 'bg-[#0a0b0d] border-white/10 text-white'
              : 'bg-brand-bg border-black/10 text-brand-dark'
          }`}
        >
          <nav className="grid gap-2">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex min-h-12 items-center justify-between rounded-xl border px-4 font-questrial text-sm uppercase tracking-[0.12em] font-medium transition-[background-color,border-color,color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue ${
                  isDark
                    ? 'border-white/10 bg-white/5 text-white hover:border-brand-blue hover:text-brand-blue'
                    : 'border-black/10 bg-white/70 text-brand-dark hover:border-brand-blue hover:text-brand-blue'
                }`}
              >
                <span>{link.name}</span>
                <span className={isDark ? 'text-white/35' : 'text-brand-muted'}>
                  0{index + 1}
                </span>
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className={`inline-flex min-h-12 items-center gap-2 text-xs uppercase tracking-[0.14em] text-white px-5 py-3 rounded-full font-medium mt-4 w-full justify-center shadow-md transition-[background-color,transform] duration-150 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue ${
              isDark
                ? 'bg-brand-blue hover:bg-blue-600'
                : 'bg-brand-dark hover:bg-black'
            }`}
          >
            <span>Inquire / Book</span>
            <ArrowUpRight size={14} weight="bold" />
          </a>
        </div>
      )}
    </header>
  )
}
