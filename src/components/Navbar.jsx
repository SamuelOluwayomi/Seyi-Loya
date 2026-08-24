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
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#" className="flex flex-col group">
          <span className="font-questrial text-2xl tracking-[0.08em] font-medium group-hover:text-brand-blue transition-colors">
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
              className={`transition-colors duration-200 ${
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
            className={`w-10 h-10 rounded-full border flex items-center justify-center hover:border-brand-blue hover:text-brand-blue transition-all cursor-pointer shadow-sm ${
              isDark
                ? 'border-white/20 bg-[#14161f] text-white'
                : 'border-black/15 bg-white/80 text-brand-dark'
            }`}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            {isDark ? <Sun size={17} weight="bold" /> : <Moon size={17} weight="bold" />}
          </button>

          <a
            href="#contact"
            className={`group inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white px-5 py-2.5 rounded-full font-medium transition-colors duration-200 shadow-sm ${
              isDark
                ? 'bg-brand-blue hover:bg-blue-600'
                : 'bg-brand-dark hover:bg-black'
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
            className={`w-9 h-9 rounded-full border flex items-center justify-center cursor-pointer ${
              isDark
                ? 'border-white/20 bg-[#14161f] text-white'
                : 'border-black/15 bg-white/80 text-brand-dark'
            }`}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            {isDark ? <Sun size={16} weight="bold" /> : <Moon size={16} weight="bold" />}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 focus:outline-none cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <List size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          className={`md:hidden border-y px-6 py-6 space-y-4 shadow-xl ${
            isDark
              ? 'bg-[#0a0b0d] border-white/10 text-white'
              : 'bg-brand-bg border-black/10 text-brand-dark'
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block font-questrial text-sm uppercase tracking-[0.2em] font-medium hover:text-brand-blue py-2 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className={`inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white px-5 py-3 rounded-full font-medium mt-4 w-full justify-center shadow-md transition-all ${
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
