import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

export default function IntroAnimation({ onComplete }) {
  const { isDark } = useTheme()
  const fullText = 'Ṣèyí Lóyàá'
  const [displayedText, setDisplayedText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [isImploding, setIsImploding] = useState(false)

  // Typewriter effect
  useEffect(() => {
    let currentIndex = 0
    const startTimeout = setTimeout(() => {
      const typingInterval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setDisplayedText(fullText.slice(0, currentIndex))
          currentIndex++
        } else {
          clearInterval(typingInterval)
          setIsTypingComplete(true)

          // Pause after typing before implosion
          setTimeout(() => {
            setIsImploding(true)

            // Notify parent component when implosion finishes
            setTimeout(() => {
              if (onComplete) onComplete()
            }, 600)
          }, 500)
        }
      }, 110)

      return () => clearInterval(typingInterval)
    }, 350)

    return () => clearTimeout(startTimeout)
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg transition-opacity duration-500 ${
        isDark ? 'bg-black/50' : 'bg-brand-bg/30'
      } ${isImploding ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      {/* Strip Container with Implosion Transition */}
      <div
        className={`w-full py-16 sm:py-24 md:py-28 lg:py-32 px-6 sm:px-12 md:px-16 border-y shadow-2xl flex items-center justify-center overflow-hidden transition-all duration-600 ${
          isDark
            ? 'bg-[#12141e]/95 border-white/15 text-white'
            : 'bg-white/95 border-black/15 text-brand-dark'
        } ${
          isImploding
            ? 'scale-0 blur-xl opacity-0 ease-in'
            : 'scale-100 blur-0 opacity-100 ease-out'
        }`}
        style={{
          transitionTimingFunction: isImploding
            ? 'cubic-bezier(0.7, 0, 0.84, 0)'
            : 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="flex items-center justify-center max-w-full">
          <h1 className="font-ojuju text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-[0.16em] sm:tracking-[0.24em] uppercase whitespace-nowrap text-center">
            {displayedText}
          </h1>

          {/* Blinking cursor while typing */}
          {!isTypingComplete && (
            <span className="inline-block w-1.5 sm:w-2 h-10 sm:h-16 md:h-20 bg-brand-blue ml-2 sm:ml-4 animate-pulse" />
          )}
        </div>
      </div>
    </div>
  )
}
