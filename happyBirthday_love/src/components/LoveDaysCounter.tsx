import React, { useState, useEffect } from 'react'
import { Clock, Heart, Sparkles } from 'lucide-react'

export const LoveDaysCounter: React.FC = () => {
  const [timeTogether, setTimeTogether] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Start date: Nov 10, 2024
    const startDate = new Date('2024-11-10T00:00:00')

    const updateCounter = () => {
      const now = new Date()
      const diff = now.getTime() - startDate.getTime()

      if (diff > 0) {
        const seconds = Math.floor((diff / 1000) % 60)
        const minutes = Math.floor((diff / (1000 * 60)) % 60)
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))

        setTimeTogether({ days, hours, minutes, seconds })
      }
    }

    updateCounter()
    const timer = setInterval(updateCounter, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="counter-section">
      <div className="counter-card">
        {/* Header */}
        <div className="counter-header">
          <h2 className="counter-title">NUESTRA HISTORIA EN TIEMPO ⏳💖</h2>
          <p className="counter-subtitle">
            Desde el <strong>10 de Noviembre de 2024</strong>
          </p>
        </div>

        {/* 4 Horizontal Cards filling full width */}
        <div className="counter-cards-row">
          <div className="time-card">
            <span className="time-value">{timeTogether.days}</span>
            <span className="time-unit">DÍAS</span>
          </div>

          <div className="time-card">
            <span className="time-value">{String(timeTogether.hours).padStart(2, '0')}</span>
            <span className="time-unit">HORAS</span>
          </div>

          <div className="time-card">
            <span className="time-value">{String(timeTogether.minutes).padStart(2, '0')}</span>
            <span className="time-unit">MINUTOS</span>
          </div>

          <div className="time-card">
            <span className="time-value">{String(timeTogether.seconds).padStart(2, '0')}</span>
            <span className="time-unit">SEGUNDOS</span>
          </div>
        </div>

        {/* Footer */}
        <div className="counter-footer">
          <span>Y contando para siempre ♡</span>
        </div>
      </div>
    </div>
  )
}
