import React, { useState, useEffect } from 'react'
import { Gamepad2, Trophy, RefreshCw, Heart, User, Crown } from 'lucide-react'
import confetti from 'canvas-confetti'

// Import all images from src/images/images_play
const playImageModules = import.meta.glob<{ default: string }>('../images/images_play/*.jpeg', { eager: true })
const playImages = Object.values(playImageModules).map((mod) => mod.default)

export interface MemoryCard {
  id: string
  imageId: number
  src: string
  isFlipped: boolean
  isMatched: boolean
}

export type Player = 'princesa' | 'novio'

export type GridMode = '4x4' | '6x6' | '10x10'

export const MemoryGame: React.FC = () => {
  const [gridMode, setGridMode] = useState<GridMode>('6x6')
  const [cards, setCards] = useState<MemoryCard[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [activePlayer, setActivePlayer] = useState<Player>('princesa')
  const [scores, setScores] = useState({ princesa: 0, novio: 0 })
  const [isProcessing, setIsProcessing] = useState(false)
  const [gameOver, setGameOver] = useState(false)

  // Initialize and shuffle deck based on selected grid mode
  const initGame = (mode: GridMode = gridMode) => {
    let numPairs = 8 // Default 4x4
    if (mode === '6x6') numPairs = 18
    if (mode === '10x10') numPairs = 25 // 50 cards (10x5 / 10x10 pairs)

    // Select images from available images_play
    const selectedImages: string[] = []
    for (let i = 0; i < numPairs; i++) {
      selectedImages.push(playImages[i % playImages.length])
    }

    // Create duplicate pairs
    const deck: MemoryCard[] = []
    selectedImages.forEach((img, idx) => {
      deck.push({
        id: `card-${idx}-a`,
        imageId: idx,
        src: img,
        isFlipped: false,
        isMatched: false,
      })
      deck.push({
        id: `card-${idx}-b`,
        imageId: idx,
        src: img,
        isFlipped: false,
        isMatched: false,
      })
    })

    // Shuffle deck
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[deck[i], deck[j]] = [deck[j], deck[i]]
    }

    setCards(deck)
    setFlippedCards([])
    setActivePlayer('princesa')
    setScores({ princesa: 0, novio: 0 })
    setIsProcessing(false)
    setGameOver(false)
  }

  useEffect(() => {
    initGame(gridMode)
  }, [gridMode])

  const handleCardClick = (index: number) => {
    if (isProcessing || gameOver) return
    const card = cards[index]

    if (card.isFlipped || card.isMatched) return

    // Flip card
    const newCards = [...cards]
    newCards[index].isFlipped = true
    setCards(newCards)

    const newFlipped = [...flippedCards, index]
    setFlippedCards(newFlipped)

    if (newFlipped.length === 2) {
      setIsProcessing(true)
      const [firstIdx, secondIdx] = newFlipped
      const firstCard = newCards[firstIdx]
      const secondCard = newCards[secondIdx]

      if (firstCard.imageId === secondCard.imageId) {
        // MATCH FOUND!
        setTimeout(() => {
          newCards[firstIdx].isMatched = true
          newCards[secondIdx].isMatched = true
          setCards(newCards)
          setFlippedCards([])
          setIsProcessing(false)

          // Update current player score
          setScores((prev) => {
            const updated = { ...prev, [activePlayer]: prev[activePlayer] + 1 }

            // Check if all pairs matched
            const totalPairs = cards.length / 2
            if (updated.princesa + updated.novio === totalPairs) {
              setGameOver(true)
              confetti({
                particleCount: 150,
                spread: 90,
                origin: { y: 0.6 },
                colors: ['#c85084', '#e6739f', '#ffd700', '#ffffff'],
              })
            }
            return updated
          })

          // Match confetti burst
          confetti({
            particleCount: 35,
            spread: 50,
            origin: { y: 0.7 },
            colors: ['#e46e99', '#c85084'],
          })
        }, 400)
      } else {
        // NO MATCH -> Flip back after delay & switch turn
        setTimeout(() => {
          newCards[firstIdx].isFlipped = false
          newCards[secondIdx].isFlipped = false
          setCards(newCards)
          setFlippedCards([])
          setActivePlayer((prev) => (prev === 'princesa' ? 'novio' : 'princesa'))
          setIsProcessing(false)
        }, 1000)
      }
    }
  }

  const handleModeChange = (mode: GridMode) => {
    setGridMode(mode)
  }

  return (
    <section className="memory-game-section">
      {/* Header */}
      <div className="memory-game-header">
        <div className="memory-game-icon-badge">
          <Gamepad2 size={26} color="#c85084" />
        </div>
        <h2 className="memory-game-title">Juego de Memoria de Amor 🧩💖</h2>
        <p className="memory-game-subtitle">
          Memorama para 2 Jugadores: 👑 Princesa vs 👦 Mi Amor
        </p>
      </div>

      {/* Grid Mode Selector Buttons */}
      <div className="memory-mode-selector">
        <button
          type="button"
          className={`mode-btn ${gridMode === '4x4' ? 'active' : ''}`}
          onClick={() => handleModeChange('4x4')}
        >
          Rápido (4x4)
        </button>
        <button
          type="button"
          className={`mode-btn ${gridMode === '6x6' ? 'active' : ''}`}
          onClick={() => handleModeChange('6x6')}
        >
          Medio (6x6)
        </button>
        <button
          type="button"
          className={`mode-btn ${gridMode === '10x10' ? 'active' : ''}`}
          onClick={() => handleModeChange('10x10')}
        >
          Desafío 10x10 (50 Tarjetas)
        </button>
      </div>

      {/* Scoreboard & Turn Indicator */}
      <div className="memory-scoreboard-wrapper">
        {/* Princesa Score Card */}
        <div className={`player-score-card ${activePlayer === 'princesa' ? 'active-turn' : ''}`}>
          <div className="player-avatar princess-avatar">
            <Crown size={20} color="#ffffff" />
          </div>
          <div className="player-info">
            <span className="player-name">👑 Princesa</span>
            <span className="player-score-num">{scores.princesa} parejas</span>
          </div>
          {activePlayer === 'princesa' && !gameOver && (
            <span className="turn-indicator-pill">¡Su Turno!</span>
          )}
        </div>

        <div className="vs-divider">VS</div>

        {/* Novio Score Card */}
        <div className={`player-score-card ${activePlayer === 'novio' ? 'active-turn' : ''}`}>
          <div className="player-avatar novio-avatar">
            <User size={20} color="#ffffff" />
          </div>
          <div className="player-info">
            <span className="player-name">👦 Mi Amor</span>
            <span className="player-score-num">{scores.novio} parejas</span>
          </div>
          {activePlayer === 'novio' && !gameOver && (
            <span className="turn-indicator-pill">¡Su Turno!</span>
          )}
        </div>
      </div>

      {/* Game Board Grid */}
      <div className={`memory-board-grid grid-mode-${gridMode}`}>
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`memory-card-item ${card.isFlipped ? 'flipped' : ''} ${
              card.isMatched ? 'matched' : ''
            }`}
            onClick={() => handleCardClick(index)}
          >
            <div className="memory-card-inner">
              {/* Front side (hidden) */}
              <div className="memory-card-front">
                <Heart size={22} color="#e46e99" fill="#f8d4e4" />
              </div>

              {/* Back side (revealed photo) */}
              <div className="memory-card-back">
                <img src={card.src} alt="Memorama" className="memory-card-img" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls & Reset */}
      <div className="memory-controls">
        <button type="button" className="restart-game-btn" onClick={() => initGame()}>
          <RefreshCw size={18} /> Reiniciar Partida
        </button>
      </div>

      {/* Game Over Modal */}
      {gameOver && (
        <div className="modal-overlay" onClick={() => initGame()}>
          <div className="modal-content animate-unfold" onClick={(e) => e.stopPropagation()}>
            <div className="winner-icon-wrap" style={{ display: 'inline-flex', marginBottom: '16px' }}>
              <Trophy size={48} color="#ffd700" />
            </div>
            <h3 className="modal-title" style={{ fontSize: '2.2rem', color: 'var(--text-pink)' }}>
              {scores.princesa > scores.novio
                ? '🎉 ¡Ganó Mi Princesa! 👑💖'
                : scores.novio > scores.princesa
                ? '🎉 ¡Ganó Mi Amor! 👦💖'
                : '¡Empate Perfecto de Amor! 💕'}
            </h3>
            <p className="modal-body">
              Puntaje final: <br />
              <strong>👑 Princesa:</strong> {scores.princesa} parejas |{' '}
              <strong>👦 Mi Amor:</strong> {scores.novio} parejas
            </p>
            <button type="button" className="submit-btn" onClick={() => initGame()}>
              Jugar Otra Vez ✨
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
