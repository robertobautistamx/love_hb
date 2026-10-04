import React, { useState } from 'react'
import { Heart, Mail, Sparkles, X } from 'lucide-react'
import confetti from 'canvas-confetti'

export const LoveLetter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenLetter = () => {
    setIsOpen(true)
    confetti({
      particleCount: 130,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#c85084', '#e6739f', '#ffd700', '#ffffff'],
    })
  }

  return (
    <div className="letter-wrapper">
      {!isOpen ? (
        /* Big Interactive Envelope Button Card */
        <button
          type="button"
          className="main-envelope-btn-card"
          onClick={handleOpenLetter}
        >
          <div className="main-envelope-icon-wrap">
            <Mail size={44} color="#c85084" />
          </div>
          <h3 className="main-envelope-title">Tienes una carta especial 💌</h3>
          <p className="main-envelope-sub">Haz clic para abrir la carta</p>
        </button>
      ) : (
        /* Opened Letter View */
        <div className="letter-paper animate-unfold">
          {/* Top Stamp / Header */}
          <div className="letter-header">
            <div className="letter-stamp">
              <Sparkles size={16} color="#c85084" />
              <span>Carta Principal</span>
            </div>
            <button
              type="button"
              className="letter-close-btn"
              onClick={() => setIsOpen(false)}
              title="Cerrar carta"
            >
              <X size={18} />
            </button>
          </div>

          {/* Letter Title */}
          <h2 className="letter-title">Para Mi Princesa 💖</h2>

          {/* Letter Body (Placeholder for user to edit) */}
          <div className="letter-body">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
              eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
              in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
              Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius,
              turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis
              sollicitudin mauris.
            </p>
          </div>

          {/* Letter Signature */}
          <div className="letter-footer">
            <p className="letter-signature">Con todo mi amor ♥</p>
          </div>
        </div>
      )}
    </div>
  )
}
