import { useState } from 'react'
import { List, X, ArrowUpRight } from '@phosphor-icons/react'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Selected Works', href: '#works' },
    { name: 'Series', href: '#series' },
    { name: 'About', href: '#about' },
    { name: 'Exhibitions', href: '#exhibitions' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#eceef1]/85 backdrop-blur-xl border-b border-black/8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#" className="flex flex-col group">
          <span className="font-ojuju text-2xl tracking-wider text-brand-dark font-semibold group-hover:opacity-75 transition-opacity">
            Ṣèyí Lóyàá
          </span>
        </a>

        <nav className="hidden md:flex items-center space-x-10 text-xs uppercase tracking-[0.2em] font-medium text-brand-muted">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-brand-dark transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white bg-brand-dark px-4 py-2.5 rounded-full font-medium hover:bg-black transition-colors duration-200"
          >
            <span>Inquire</span>
            <ArrowUpRight size={14} weight="bold" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-brand-dark p-2 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <List size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-[#eceef1]/95 backdrop-blur-2xl border-y border-black/10 px-6 py-6 space-y-4 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm uppercase tracking-[0.2em] font-semibold text-brand-dark hover:opacity-60 py-2 transition-opacity"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white bg-brand-dark px-5 py-3 rounded-full font-medium mt-4 w-full justify-center shadow-md hover:bg-black transition-all"
          >
            <span>Inquire / Book</span>
            <ArrowUpRight size={14} weight="bold" />
          </a>
        </div>
      )}
    </header>
  )
}
