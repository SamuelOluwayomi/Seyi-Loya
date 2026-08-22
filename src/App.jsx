import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SelectedWorks from './components/SelectedWorks'
import SeriesShowcase from './components/SeriesShowcase'
import FooterCTA from './components/FooterCTA'
import IntroAnimation from './components/IntroAnimation'

export default function App() {
  const [isIntroDone, setIsIntroDone] = useState(false)

  return (
    <div className="min-h-screen bg-brand-bg text-brand-dark selection:bg-brand-dark selection:text-white relative">
      {!isIntroDone && (
        <IntroAnimation onComplete={() => setIsIntroDone(true)} />
      )}
      <div className={`transition-all duration-700 ${!isIntroDone ? 'filter blur-md pointer-events-none select-none' : 'filter-none'}`}>
        <Navbar />
        <main>
          <Hero />
          <SelectedWorks />
          <SeriesShowcase />
        </main>
        <FooterCTA />
      </div>
    </div>
  )
}
