import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SelectedWorks from './components/SelectedWorks'
import SeriesShowcase from './components/SeriesShowcase'
import About from './components/About'
import FooterCTA from './components/FooterCTA'
import { useTheme } from './context/ThemeContext'

export default function App() {
  const { isDark } = useTheme()

  return (
    <div
      className={`min-h-screen selection:bg-brand-blue selection:text-white relative transition-colors duration-300 ${
        isDark ? 'bg-[#0a0b0d] text-white' : 'bg-brand-bg text-brand-dark'
      }`}
    >
      <Navbar />
      <main>
        <Hero />
        <SelectedWorks />
        <SeriesShowcase />
        <About />
      </main>
      <FooterCTA />
    </div>
  )
}
