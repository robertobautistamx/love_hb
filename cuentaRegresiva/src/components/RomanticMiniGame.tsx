import React, { useState, useEffect, useRef } from 'react'
import { Trophy, Play, RotateCcw, Award, Heart, Sparkles, Star } from 'lucide-react'
import confetti from 'canvas-confetti'

interface FallingItem {
  id: number
  x: number // percentage 5% to 90%
  y: number // percentage 0% to 95%
  speed: number
  type: 'heart' | 'rose' | 'crown' | 'cake' | 'star'
  pts: number
  emoji: string
}

export const RomanticMiniGame: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(25)
  const [basketX, setBasketX] = useState(50) // percentage 0 to 100%
  const [gameOver, setGameOver] = useState(false)
  const [highScore, setHighScore] = useState<number>(() => {
    return parseInt(localStorage.getItem('cuenta_regresiva_game_high_score') || '0', 10)
  })

  const [items, setItems] = useState<FallingItem[]>([])
  const gameAreaRef = useRef<HTMLDivElement | null>(null)
  const animRef = useRef<number | null>(null)
  const lastSpawnRef = useRef<number>(0)

  // Handle keyboard arrow keys
  useEffect(() => {
    if (!isPlaying || gameOver) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setBasketX((prev) => Math.max(5, prev - 8))
      } else if (e.key === 'ArrowRight') {
        setBasketX((prev) => Math.min(95, prev + 8))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isPlaying, gameOver])

  // Mouse / Touch position tracker inside game area
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPlaying || gameOver || !gameAreaRef.current) return
    const rect = gameAreaRef.current.getBoundingClientRect()
    const relativeX = e.clientX - rect.left
    const percent = (relativeX / rect.width) * 100
    setBasketX(Math.max(5, Math.min(95, percent)))
  }

  // Start game
  const startGame = () => {
    setScore(0)
    setTimeLeft(25)
    setBasketX(50)
    setItems([])
    setGameOver(false)
    setIsPlaying(true)
  }

  // Main Game Loop & Spawns
  useEffect(() => {
    if (!isPlaying || gameOver) return

    const itemTypes: Array<{ type: FallingItem['type']; pts: number; emoji: string }> = [
      { type: 'heart', pts: 10, emoji: '💖' },
      { type: 'rose', pts: 15, emoji: '🌹' },
      { type: 'star', pts: 20, emoji: '✨' },
      { type: 'crown', pts: 30, emoji: '👑' },
      { type: 'cake', pts: 50, emoji: '🎂' }
    ]

    let frameId: number

    const gameLoop = (timestamp: number) => {
      // Spawn item every 600ms
      if (timestamp - lastSpawnRef.current > 600) {
        lastSpawnRef.current = timestamp
        const randomType = itemTypes[Math.floor(Math.random() * itemTypes.length)]
        const newItem: FallingItem = {
          id: Math.random(),
          x: Math.floor(Math.random() * 85) + 5,
          y: 0,
          speed: Math.random() * 0.8 + 0.6,
          type: randomType.type,
          pts: randomType.pts,
          emoji: randomType.emoji
        }
        setItems((prev) => [...prev, newItem])
      }

      // Update positions & collision check
      setItems((prevItems) => {
        const nextItems: FallingItem[] = []

        for (const item of prevItems) {
          const newY = item.y + item.speed * 1.5

          // Check collision with basket at y >= 82%
          if (newY >= 82 && newY <= 92) {
            const distance = Math.abs(item.x - basketX)
            if (distance < 14) {
              // Caught! Add score
              setScore((s) => s + item.pts)
              continue // Remove item
            }
          }

          // Keep item if not out of bounds bottom (95%)
          if (newY < 95) {
            nextItems.push({ ...item, y: newY })
          }
        }

        return nextItems
      })

      frameId = requestAnimationFrame(gameLoop)
    }

    frameId = requestAnimationFrame(gameLoop)
    animRef.current = frameId

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [isPlaying, gameOver, basketX])

  // Timer countdown
  useEffect(() => {
    if (!isPlaying || gameOver) return

    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval)
          setGameOver(true)
          setIsPlaying(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timerInterval)
  }, [isPlaying, gameOver])

  // High score handling & confetti on completion
  useEffect(() => {
    if (gameOver) {
      if (score > highScore) {
        setHighScore(score)
        localStorage.setItem('cuenta_regresiva_game_high_score', score.toString())
      }
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      })
    }
  }, [gameOver, score, highScore])

  return (
    <div className="mini-game-section">
      <div className="mini-game-card">
        {/* Game Title */}
        <div className="mini-game-header">
          <div className="mini-game-badge">
            <Sparkles size={16} color="var(--text-pink)" />
            <span>Mini-Juego Especial 🎮</span>
          </div>
          <h3 className="mini-game-title">Atrapa las Sorpresas de Cumpleaños 🎂💖</h3>
          <p className="mini-game-subtitle">
            Atrapa corazones, rosas y pasteles con tu canasta mágica antes de que se agote el tiempo.
          </p>
        </div>

        {/* High Score Bar */}
        <div className="game-stats-bar">
          <div className="stat-pill">
            <Trophy size={16} color="#d4a373" />
            <span>Récord: <strong>{highScore} pts</strong></span>
          </div>
          <div className="stat-pill">
            <Award size={16} color="var(--text-pink)" />
            <span>Puntos: <strong>{score}</strong></span>
          </div>
          <div className="stat-pill">
            <Star size={16} color="#e5989b" />
            <span>Tiempo: <strong>{timeLeft}s</strong></span>
          </div>
        </div>

        {/* Game Board Canvas / Interactive Area */}
        <div
          ref={gameAreaRef}
          className="game-board-area"
          onPointerMove={handlePointerMove}
        >
          {!isPlaying && !gameOver && (
            <div className="game-overlay-screen">
              <div className="game-overlay-content">
                <Heart size={44} className="animate-bounce" color="var(--text-pink)" fill="var(--text-pink)" />
                <h4>¿Lista para jugar, mi amor?</h4>
                <p>Usa tu mouse, toque o los botones de abajo para mover la canasta y atrapar los regalos.</p>
                <button type="button" onClick={startGame} className="start-game-btn">
                  <Play size={18} fill="#ffffff" /> ¡Empezar Juego!
                </button>
              </div>
            </div>
          )}

          {gameOver && (
            <div className="game-overlay-screen">
              <div className="game-overlay-content animate-unfold">
                <Trophy size={48} color="#f4a261" />
                <h4>¡Tiempo agotado, mi reina! 🎉</h4>
                <p className="game-final-score">Puntuación Final: <strong>{score} Puntos</strong></p>
                {score >= highScore && score > 0 && (
                  <p className="new-record-tag">🌟 ¡Nuevo Récord Máximo Logrado! 🌟</p>
                )}
                <button type="button" onClick={startGame} className="start-game-btn">
                  <RotateCcw size={18} /> Jugar de Nuevo
                </button>
              </div>
            </div>
          )}

          {/* Falling Items */}
          {items.map((item) => (
            <div
              key={item.id}
              className="falling-game-item"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`
              }}
            >
              <span className="item-emoji">{item.emoji}</span>
            </div>
          ))}

          {/* Player Basket */}
          <div
            className="player-basket"
            style={{ left: `${basketX}%` }}
          >
            <div className="basket-content">
              <span>🎀 Canasta de Princesa 👑</span>
            </div>
          </div>
        </div>

        {/* On-screen controls for mobile / touchscreen users */}
        {isPlaying && (
          <div className="mobile-controls-row">
            <button
              type="button"
              className="mobile-btn"
              onClick={() => setBasketX((prev) => Math.max(5, prev - 12))}
            >
              ⬅️ Izquierda
            </button>
            <button
              type="button"
              className="mobile-btn"
              onClick={() => setBasketX((prev) => Math.min(95, prev + 12))}
            >
              Derecha ➡️
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
