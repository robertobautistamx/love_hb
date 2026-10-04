import React, { useState, useEffect } from 'react'
import { Heart, ChevronDown, Sparkles } from 'lucide-react'

const ROMANTIC_PHRASES = [
  "Te amo ❤️",
  "Eres mi vida entera ✨",
  "Mi lugar favorito en el mundo eres tú 🌸",
  "Feliz Cumpleaños, Mi Princesa 👑💖",
  "Gracias por existir y hacerme tan feliz 💕",
]

// Floating flowers data (Gerberas & Roses)
const FLOWERS = [
  { id: 1, type: 'rose', emoji: '🌹', left: '10%', delay: '0s', duration: '12s', size: '2.2rem' },
  { id: 2, type: 'gerbera', emoji: '🌸', left: '22%', delay: '2s', duration: '10s', size: '2.5rem' },
  { id: 3, type: 'rose', emoji: '🌺', left: '38%', delay: '4s', duration: '14s', size: '2rem' },
  { id: 4, type: 'gerbera', emoji: '🌷', left: '55%', delay: '1s', duration: '11s', size: '2.4rem' },
  { id: 5, type: 'rose', emoji: '🌹', left: '72%', delay: '3s', duration: '13s', size: '2.3rem' },
  { id: 6, type: 'gerbera', emoji: '🌸', left: '88%', delay: '5s', duration: '9s', size: '2.6rem' },
  { id: 7, type: 'petal', emoji: '🥀', left: '18%', delay: '6s', duration: '15s', size: '1.8rem' },
  { id: 8, type: 'gerbera', emoji: '🌺', left: '82%', delay: '7s', duration: '12s', size: '2.1rem' },
]

interface RomanticHeroIntroProps {
  onScrollDown: () => void
}

export const RomanticHeroIntro: React.FC<RomanticHeroIntroProps> = ({ onScrollDown }) => {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [fadeState, setFadeState] = useState<'fade-in' | 'fade-out'>('fade-in')

  useEffect(() => {
    const timer = setInterval(() => {
      setFadeState('fade-out')
      setTimeout(() => {
        setPhraseIndex((prev) => (prev + 1) % ROMANTIC_PHRASES.length)
        setFadeState('fade-in')
      }, 600)
    }, 3200)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="hero-intro-section">
      {/* Floating Flowers Layer (Gerberas & Roses) - Hero Intro Only */}
      <div className="hero-flowers-container">
        {FLOWERS.map((flower) => (
          <div
            key={flower.id}
            className="floating-flower-item"
            style={{
              left: flower.left,
              animationDelay: flower.delay,
              animationDuration: flower.duration,
              fontSize: flower.size,
            }}
          >
            {flower.emoji}
          </div>
        ))}
      </div>

      <div className="hero-intro-content">
        <div className="hero-heart-badge">
          <Heart size={36} fill="#ffffff" color="#ffffff" />
        </div>

        <div className={`hero-phrase-box ${fadeState}`}>
          <Sparkles size={22} color="var(--text-pink)" className="sparkle-icon" />
          <h1 className="hero-phrase">{ROMANTIC_PHRASES[phraseIndex]}</h1>
          <Sparkles size={22} color="var(--text-pink)" className="sparkle-icon" />
        </div>
      </div>

      <div className="hero-scroll-hint" onClick={onScrollDown}>
        <span>Desliza hacia abajo</span>
        <ChevronDown size={24} className="bounce-arrow" />
      </div>
    </section>
  )
}
