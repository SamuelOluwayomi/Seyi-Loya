import Navbar from './components/Navbar'
import Hero from './components/Hero'

export default function App() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-dark selection:bg-brand-dark selection:text-white">
      <Navbar />
      <main>
        <Hero />
      </main>
    </div>
  )
}
