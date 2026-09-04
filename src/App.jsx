import { useState } from 'react'
import Navbar from './components/Navbar'
import HeroTransitionExperience from './components/HeroTransitionExperience'
import SelectedWorks from './components/SelectedWorks'
import SeriesShowcase from './components/SeriesShowcase'
import About from './components/About'
import FooterCTA from './components/FooterCTA'
import { useTheme } from './context/ThemeContext'

export default function App() {
  const { isDark } = useTheme()
  const [isNavVisible, setIsNavVisible] = useState(true)

  return (
    <div
      className={`min-h-screen selection:bg-brand-blue selection:text-white relative transition-colors duration-300 ${
        isDark ? 'bg-[#0a0b0d] text-white' : 'bg-brand-bg text-brand-dark'
      }`}
    >
      <Navbar isVisible={isNavVisible} />
      <main>
        <HeroTransitionExperience onNavVisibilityChange={setIsNavVisible} />
        <SelectedWorks />
        <SeriesShowcase />
        <About />
      </main>
      <FooterCTA />
    </div>
  )
}
