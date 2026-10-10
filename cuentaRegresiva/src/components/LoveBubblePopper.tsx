import React, { useState, useEffect, useRef } from 'react'
import { Sparkles, Trophy, RotateCcw, Heart, Flame } from 'lucide-react'
import confetti from 'canvas-confetti'

interface Bubble {
  id: number
  x: number // percentage 5% - 90%
  y: number // percentage 0% - 100%
  size: number // px 44 - 70
  speed: number
  emoji: string
  points: number
  color: string
  phrase: string
  isGolden?: boolean
}

interface FloatingPhrase {
  id: number
  x: number
  y: number
  text: string
}

const LOVE_PHRASES = [
  '¡Eres mi princesa hermosa! 👑',
  '¡Te amo con toda mi alma! ♾️💖',
  '¡Siempre estaré junto a ti! 🌸',
  '¡Emocionado por verte feliz! 🎂',
  '¡No sabes lo mucho que te amo! 🏠💕',
  '¡Eres mi sueño hecho realidad! ✨',
  '¡Tu sonrisa me ilumina siempre! ☀️',
  '¡Te amo muuchooo! ❤️',
  '¡Quiero una vida eterna junto a ti! 🫂',
  '¡Eres mi tesoro más valioso! 💎',
  '¡Eres mi motor para salir adelante! 🥹',
  '¡Nunca cambies mi vida! 😘',
  '¡Me encantas muuuucho! ❤️😍',
  '¡Te amo de aqui a la luna ida y vuelta a pasitos de tortuga🐢, caracol 🐌 y de gusanito🐛! 😍',
  '¡Siempre tú, mi vida, mi princesa, mi reina, mi todo! 👑'
]

const BUBBLE_EMOJIS = ['💖', '🌸', '✨', '👑', '🎁', '🎂', '💌', '💎']
const BUBBLE_COLORS = [
  'rgba(232, 93, 158, 0.4)',
  'rgba(244, 162, 97, 0.4)',
  'rgba(202, 75, 125, 0.4)',
  'rgba(186, 142, 192, 0.4)',
  'rgba(255, 183, 178, 0.45)'
]

export const LoveBubblePopper: React.FC = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const [floatingPhrases, setFloatingPhrases] = useState<FloatingPhrase[]>([])
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(0)
  const [poppedCount, setPoppedCount] = useState(0)
  const [highScore, setHighScore] = useState<number>(() => {
    return parseInt(localStorage.getItem('cuenta_regresiva_bubbles_high_score') || '0', 10)
  })

  const [unlockedPhrases, setUnlockedPhrases] = useState<string[]>([])
  const containerRef = useRef<HTMLDivElement | null>(null)
  const animRef = useRef<number | null>(null)
  const lastSpawnRef = useRef<number>(0)

  // Spawn new bubbles continuously
  useEffect(() => {
    let frameId: number

    const updateLoop = (timestamp: number) => {
      // Spawn a new bubble every 700ms if < 12 bubbles on screen
      if (timestamp - lastSpawnRef.current > 700) {
        lastSpawnRef.current = timestamp

        setBubbles((prev) => {
          if (prev.length >= 12) return prev

          const isGolden = Math.random() < 0.2
          const randomPhrase = LOVE_PHRASES[Math.floor(Math.random() * LOVE_PHRASES.length)]
          const randomEmoji = isGolden ? '⭐' : BUBBLE_EMOJIS[Math.floor(Math.random() * BUBBLE_EMOJIS.length)]

          const newBubble: Bubble = {
            id: Math.random(),
            x: Math.floor(Math.random() * 80) + 10,
            y: 105, // Start below bottom
            size: isGolden ? 64 : Math.floor(Math.random() * 20) + 48,
            speed: Math.random() * 0.4 + 0.35,
            emoji: randomEmoji,
            points: isGolden ? 50 : 10,
            color: isGolden ? 'rgba(255, 215, 0, 0.45)' : BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)],
            phrase: randomPhrase,
            isGolden
          }

          return [...prev, newBubble]
        })
      }

      // Move bubbles upward
      setBubbles((prev) => {
        return prev
          .map((b) => ({ ...b, y: b.y - b.speed }))
          .filter((b) => b.y > -15) // Remove when floated out of top
      })

      frameId = requestAnimationFrame(updateLoop)
    }

    frameId = requestAnimationFrame(updateLoop)
    animRef.current = frameId

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [])

  // Pop a bubble
  const handlePopBubble = (bubble: Bubble, e: React.MouseEvent) => {
    e.stopPropagation()

    // Remove popped bubble
    setBubbles((prev) => prev.filter((b) => b.id !== bubble.id))

    // Update score & combo
    const addedScore = bubble.points + combo * 5
    const newScore = score + addedScore
    setScore(newScore)
    setCombo((c) => c + 1)
    setPoppedCount((cnt) => cnt + 1)

    // Save high score
    if (newScore > highScore) {
      setHighScore(newScore)
      localStorage.setItem('cuenta_regresiva_bubbles_high_score', newScore.toString())
    }

    // Unlock phrase
    if (!unlockedPhrases.includes(bubble.phrase)) {
      setUnlockedPhrases((prev) => [...prev, bubble.phrase])
    }

    // Show floating phrase effect at click position
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const clickX = ((e.clientX - rect.left) / rect.width) * 100
      const clickY = ((e.clientY - rect.top) / rect.height) * 100

      const newFloatingPhrase: FloatingPhrase = {
        id: Math.random(),
        x: Math.max(10, Math.min(85, clickX)),
        y: Math.max(10, Math.min(85, clickY)),
        text: bubble.phrase
      }

      setFloatingPhrases((prev) => [...prev, newFloatingPhrase])

      // Auto remove floating text after 1.5s
      setTimeout(() => {
        setFloatingPhrases((prev) => prev.filter((p) => p.id !== newFloatingPhrase.id))
      }, 1500)
    }

    // Confetti burst for golden bubbles or every 10 pops!
    if (bubble.isGolden || (poppedCount + 1) % 10 === 0) {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 }
      })
    }
  }

  // Reset Combo if idle
  useEffect(() => {
    if (combo > 0) {
      const timer = setTimeout(() => {
        setCombo(0)
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [combo])

  // Reset Game Stats
  const resetGame = () => {
    setScore(0)
    setCombo(0)
    setPoppedCount(0)
    setBubbles([])
  }

  return (
    <div className="mini-game-section">
      <div className="mini-game-card">

        {/* Header */}
        <div className="mini-game-header">
          <div className="mini-game-badge">
            <Sparkles size={16} color="var(--text-pink)" />
            <span>Jueguito Interactivo 🎈</span>
          </div>
          <h3 className="mini-game-title">Explotador de Burbujas de Amor 💖✨</h3>
          <p className="mini-game-subtitle">
            ¡Toca o haz clic en las burbujas para hacerlas explotar y revelar mensajes románticos secretitos!
          </p>
        </div>

        {/* Game Stats Bar */}
        <div className="game-stats-bar">
          <div className="stat-pill record-pill">
            <Trophy size={16} color="#d4a373" />
            <span>Récord: <strong>{highScore} pts</strong></span>
          </div>

          <div className="stat-pill">
            <Sparkles size={16} color="var(--text-pink)" />
            <span>Puntos: <strong>{score}</strong></span>
          </div>

          {combo > 1 && (
            <div className="stat-pill combo-pill animate-pulse">
              <Flame size={16} color="#e63946" />
              <span>Racha Combo x<strong>{combo}</strong></span>
            </div>
          )}

          <div className="stat-pill">
            <Heart size={16} color="#e5989b" />
            <span>Explotadas: <strong>{poppedCount}</strong></span>
          </div>
        </div>

        {/* Interactive Floating Bubbles Canvas Area */}
        <div ref={containerRef} className="bubbles-canvas-area">
          {bubbles.map((b) => (
            <button
              type="button"
              key={b.id}
              onClick={(e) => handlePopBubble(b, e)}
              className={`love-bubble-item ${b.isGolden ? 'golden-bubble' : ''}`}
              style={{
                left: `${b.x}%`,
                top: `${b.y}%`,
                width: `${b.size}px`,
                height: `${b.size}px`,
                backgroundColor: b.color,
                boxShadow: b.isGolden
                  ? '0 0 20px rgba(255, 215, 0, 0.8), inset 0 0 10px rgba(255, 255, 255, 0.9)'
                  : '0 8px 20px rgba(200, 80, 132, 0.25), inset 0 0 12px rgba(255, 255, 255, 0.8)'
              }}
              title="¡Haz clic para explotar!"
            >
              <span className="bubble-emoji">{b.emoji}</span>
              <span className="bubble-shine"></span>
            </button>
          ))}

          {/* Floating Text Popups on Pop */}
          {floatingPhrases.map((fp) => (
            <div
              key={fp.id}
              className="floating-phrase-popup animate-float-fade"
              style={{ left: `${fp.x}%`, top: `${fp.y}%` }}
            >
              <span>{fp.text}</span>
            </div>
          ))}
        </div>

        {/* Secret Messages Collection */}
        <div className="unlocked-phrases-box">
          <div className="unlocked-header">
            <Heart size={14} fill="var(--text-pink)" color="var(--text-pink)" />
            <span>Colección de Mensajes de Amor ({unlockedPhrases.length}/{LOVE_PHRASES.length} Desbloqueados):</span>
          </div>
          <div className="unlocked-chips-wrapper">
            {LOVE_PHRASES.map((phrase, idx) => {
              const isUnlocked = unlockedPhrases.includes(phrase)
              return (
                <span
                  key={idx}
                  className={`unlocked-chip ${isUnlocked ? 'active-unlocked' : 'locked-chip'}`}
                >
                  {isUnlocked ? phrase : `🔒 Mensaje Secreto #${idx + 1}`}
                </span>
              )
            })}
          </div>
        </div>

        {/* Reset Action */}
        <div style={{ marginTop: '16px' }}>
          <button type="button" onClick={resetGame} className="reset-game-btn">
            <RotateCcw size={14} /> Reiniciar Puntuación
          </button>
        </div>

      </div>
    </div>
  )
}
