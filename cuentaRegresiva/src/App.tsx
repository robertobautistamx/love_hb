import { useState, useEffect } from 'react'
import { Sparkles, Lock, PartyPopper } from 'lucide-react'
import confetti from 'canvas-confetti'
import princessImg from './assets/princess.jpeg'
import { LoveBubblePopper } from './components/LoveBubblePopper'
import { BackgroundMusicPlayer } from './components/BackgroundMusicPlayer'
import './index.css'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  isZero: boolean
}

export function App() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isZero: false
  })

  // Target date: 11th of October
  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
      const now = new Date()
      // October 11 at 00:00:00 (Month 9 in JavaScript Date is October)
      let targetYear = now.getFullYear()
      const targetDate = new Date(targetYear, 9, 11, 0, 0, 0)

      // If Oct 11 of this year has already passed, target next year's Oct 11
      if (now.getTime() > targetDate.getTime() + 24 * 60 * 60 * 1000) {
        targetDate.setFullYear(targetYear + 1)
      }

      const diff = targetDate.getTime() - now.getTime()

      if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isZero: true }
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((diff / (1000 * 60)) % 60)
      const seconds = Math.floor((diff / 1000) % 60)

      return { days, hours, minutes, seconds, isZero: false }
    }

    const updateTimer = () => {
      const remaining = calculateTimeLeft()
      setTimeLeft(remaining)

      if (remaining.isZero) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        })
      }
    }

    updateTimer()
    const timer = setInterval(updateTimer, 1000)

    return () => clearInterval(timer)
  }, [])

  const triggerConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 }
    })
  }

  return (
    <>
      {/* Background Soft Romantic Music Widget */}
      <BackgroundMusicPlayer />

      {/* Pastel Lilac Organic Background */}
      <div className="lilac-bg-wrapper">
        <div className="wave-top-left"></div>
        <div className="wave-bottom-right"></div>

        {/* Floating subtle background hearts */}
        <div className="bg-floating-heart" style={{ top: '20%', left: '12%' }}>♥</div>
        <div className="bg-floating-heart" style={{ top: '35%', right: '15%', animationDelay: '2s' }}>♥</div>
        <div className="bg-floating-heart" style={{ bottom: '22%', left: '20%', animationDelay: '4s' }}>♥</div>
        <div className="bg-floating-heart" style={{ top: '68%', right: '10%', animationDelay: '1s' }}>♥</div>
      </div>

      {/* Main Container */}
      <div className="countdown-page-container">
        <div className="countdown-card">

          {/* Princess Avatar Header */}
          <div className="card-avatar-wrapper" onClick={triggerConfetti} style={{ cursor: 'pointer' }} title="¡Haz clic para ver chispas!">
            <img src={princessImg} alt="Mi Princesa" className="card-avatar-img" />
          </div>

          <div className="card-subtitle-badge">
            <Sparkles size={16} color="var(--text-pink)" />
            <span>Cuenta Regresiva 🎂</span>
          </div>

          <h1 className="card-title">
            Para Mi Princesa
            <span className="script-part">Mi Amor Eterno 💖</span>
          </h1>

          {/* Main Required Message */}
          <div className="main-message-box">
            <p className="main-message-text">
              <Sparkles size={18} style={{ marginRight: '6px', color: 'var(--text-pink)', display: 'inline' }} />
              Se acerca tu cumpleaños, y cuando este temporizador llegue a 0, es hora de celebrar, <span className="main-message-highlight">te amo muuchooo.</span>
            </p>
          </div>

          {/* Zero celebration banner OR Live Countdown Timer */}
          {timeLeft.isZero ? (
            <div className="celebration-banner" onClick={triggerConfetti} style={{ cursor: 'pointer' }}>
              <PartyPopper size={36} style={{ margin: '0 auto 8px auto', display: 'block' }} />
              <h2 className="celebration-title">¡Es Hora de Celebrar! 🎉🎂</h2>
              <p className="celebration-text">¡Llegó el gran día de mi princesa! Te amo muuchooo ❤️</p>
            </div>
          ) : (
            <div className="timer-grid-container">
              <div className="timer-box">
                <span className="timer-number">{timeLeft.days}</span>
                <span className="timer-label">Días</span>
              </div>

              <div className="timer-box">
                <span className="timer-number">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="timer-label">Horas</span>
              </div>

              <div className="timer-box">
                <span className="timer-number">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="timer-label">Minutos</span>
              </div>

              <div className="timer-box">
                <span className="timer-number">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="timer-label">Segundos</span>
              </div>
            </div>
          )}

          {/* Bottom Required Mystery Message */}
          <div className="mystery-footer-box">
            <div className="mystery-icon-badge">
              <Lock size={18} />
            </div>
            <p className="mystery-text">
              Hay algo más que simplemente un temporizador, pero, después lo sabrás. ✨
            </p>
          </div>

          {/* Love Bubble Popper Mini Game */}
          <LoveBubblePopper />

        </div>
      </div>
    </>
  )
}

export default App
