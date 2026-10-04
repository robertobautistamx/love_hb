import React, { useState, useEffect, useRef } from 'react'
import { Heart, Sparkles, Trophy, Play, RotateCcw, Timer, Award } from 'lucide-react'
import confetti from 'canvas-confetti'

interface FallingItem {
  id: number
  x: number // percentage 0 - 90%
  y: number // percentage 0 - 100%
  speed: number
  type: 'heart' | 'rose' | 'crown' | 'star'
  pts: number
  emoji: string
}

export const HeartCatcherGame: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [basketX, setBasketX] = useState(50) // percentage 0 - 100%
  const [gameOver, setGameOver] = useState(false)
  const [highScore, setHighScore] = useState<number>(() => {
    return parseInt(localStorage.getItem('heart_catcher_high_score') || '0', 10)
  })

  const gameAreaRef = useRef<HTMLDivElement | null>(null)
  const itemsRef = useRef<FallingItem[]>([])
  const [itemsToRender, setItemsToRender] = useState<FallingItem[]>([])

  // Start / Restart game
  const startGame = () => {
    setIsPlaying(true)
    setScore(0)
    setTimeLeft(30)
    setBasketX(50)
    setGameOver(false)
    itemsRef.current = []
    setItemsToRender([])
  }

  // Timer Countdown
  useEffect(() => {
    if (!isPlaying || gameOver) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setIsPlaying(false)
          setGameOver(true)
          confetti({
            particleCount: 130,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#c85084', '#e6739f', '#ffd700', '#ffffff'],
          })
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isPlaying, gameOver])

  // Update High Score
  useEffect(() => {
    if (gameOver && score > highScore) {
      setHighScore(score)
      localStorage.setItem('heart_catcher_high_score', score.toString())
    }
  }, [gameOver, score, highScore])

  // Main Game Loop for falling objects & collision detection
  useEffect(() => {
    if (!isPlaying || gameOver) return

    let nextId = 1
    const spawnInterval = setInterval(() => {
      const types: Array<{ type: FallingItem['type']; pts: number; emoji: string }> = [
        { type: 'heart', pts: 10, emoji: '💖' },
        { type: 'rose', pts: 15, emoji: '🌹' },
        { type: 'crown', pts: 25, emoji: '👑' },
        { type: 'star', pts: 20, emoji: '⭐' },
      ]
      const chosen = types[Math.floor(Math.random() * types.length)]

      const newItem: FallingItem = {
        id: nextId++,
        x: Math.floor(Math.random() * 85) + 5, // 5% to 90%
        y: 0,
        speed: Math.random() * 1.5 + 1.2, // fall speed
        type: chosen.type,
        pts: chosen.pts,
        emoji: chosen.emoji,
      }
      itemsRef.current.push(newItem)
    }, 450)

    const gameLoop = setInterval(() => {
      const currentItems = itemsRef.current
      const remaining: FallingItem[] = []

      currentItems.forEach((item) => {
        item.y += item.speed

        // Check collision with basket (near y >= 82% and x within basket range)
        const basketMinX = basketX - 12
        const basketMaxX = basketX + 12

        if (item.y >= 80 && item.y <= 92 && item.x >= basketMinX && item.x <= basketMaxX) {
          // CAUGHT!
          setScore((prev) => prev + item.pts)
        } else if (item.y < 100) {
          remaining.push(item)
        }
      })

      itemsRef.current = remaining
      setItemsToRender([...remaining])
    }, 30)

    return () => {
      clearInterval(spawnInterval)
      clearInterval(gameLoop)
    }
  }, [isPlaying, gameOver, basketX])

  // Track mouse or touch movement across game area
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!gameAreaRef.current) return
    const rect = gameAreaRef.current.getBoundingClientRect()
    const relativeX = e.clientX - rect.left
    const percentX = Math.max(8, Math.min(92, (relativeX / rect.width) * 100))
    setBasketX(percentX)
  }

  return (
    <section className="heart-catcher-section">
      {/* Header */}
      <div className="heart-catcher-header">
        <div className="heart-catcher-icon-badge">
          <Heart size={26} color="#c85084" fill="#c85084" />
        </div>
        <h2 className="heart-catcher-title">Atrapa los Corazones de Amor 🎯💖</h2>
        <p className="heart-catcher-subtitle">
          Mueve la canasta de la Princesa para atrapar todos los corazones y coronas antes de que acabe el tiempo:
        </p>
      </div>

      {/* Score & Timer Bar */}
      <div className="catcher-stats-bar">
        <div className="stat-box">
          <Timer size={18} color="var(--text-pink)" />
          <span className="stat-label">Tiempo:</span>
          <span className="stat-value">{timeLeft}s</span>
        </div>

        <div className="stat-box">
          <Award size={18} color="var(--text-pink)" />
          <span className="stat-label">Puntos:</span>
          <span className="stat-value highlight">{score}</span>
        </div>

        <div className="stat-box">
          <Trophy size={18} color="#ffd700" />
          <span className="stat-label">RRecord:</span>
          <span className="stat-value">{highScore}</span>
        </div>
      </div>

      {/* Game Playing Canvas Area */}
      <div
        ref={gameAreaRef}
        className="catcher-game-area"
        onPointerMove={handlePointerMove}
      >
        {!isPlaying && !gameOver && (
          <div className="catcher-overlay">
            <h3 className="overlay-title">¡Atrapa Todo el Amor! 💖</h3>
            <p className="overlay-desc">
              Desliza tu dedo o mueve el ratón para atrapar 💖 (+10), 🌹 (+15), ⭐ (+20) y 👑 (+25).
            </p>
            <button type="button" className="submit-btn" onClick={startGame}>
              <Play size={18} /> Empezar Juego
            </button>
          </div>
        )}

        {/* Falling Items */}
        {isPlaying &&
          itemsToRender.map((item) => (
            <div
              key={item.id}
              className="falling-emoji-item"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
              }}
            >
              {item.emoji}
            </div>
          ))}

        {/* Player Catcher Basket */}
        <div
          className="catcher-basket"
          style={{ left: `${basketX}%` }}
        >
          <div className="basket-emoji">👑🧺</div>
          <span className="basket-label">Princesa</span>
        </div>
      </div>

      {/* Game Over Modal */}
      {gameOver && (
        <div className="modal-overlay" onClick={startGame}>
          <div className="modal-content animate-unfold" onClick={(e) => e.stopPropagation()}>
            <div className="winner-icon-wrap">
              <Trophy size={48} color="#ffd700" />
            </div>
            <h3 className="modal-title" style={{ fontSize: '2.2rem', color: 'var(--text-pink)' }}>
              ¡Tiempo Agotado! 🎉
            </h3>
            <p className="modal-body" style={{ fontSize: '1.1rem' }}>
              ¡Felicidades mi Princesa! Atrapaste <strong style={{ color: 'var(--text-pink)' }}>{score} puntos</strong> de amor 💖.
            </p>
            <button type="button" className="submit-btn" onClick={startGame}>
              <RotateCcw size={18} /> Jugar Otra Vez
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
