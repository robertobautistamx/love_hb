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
              ¡¡ FELIICIDADESS !! mi princesita hermosa😍, otro año más de vida y que mejor
              festejarlo a tu lado, deseo que sigas cumpliendo muchos años más, que sigamos
              juntos en esta vida tan hermosa y que cada día sea mejor que el anterior🥹.
              Gracias por ser como eres, por amarme como me amas y por hacerme tan feliz🥹
            </p>
            <p>
              Cada momento a tu lado es un tesoro que guardo en mi corazón, cada sonrisa tuya
              es una caricia para mi alma, cada beso tuyo es un suspiro que me llena de amor🥹.
              Eres mi todo, mi vida, mi amor, mi todo🥹.
            </p>
            <p>
              Y hoy en tu día especial, quiero que sepas que te amo más de lo que las palabras
              pueden expresar🥹.
            </p>
            <p>
              Por favor nunca cambies, porque eres perfecta tal y como eres😍😘, y quiero que sepas
              que siempre estaré aquí para ti, en las buenas y en las malas, en la salud y en la
              enfermedad, en la riqueza y en la pobreza, en la alegría y en la tristeza🥹.
            </p>
            <p>
              Te amo MUUUUCHOOOOOOOOOOOO😍❤️
            </p>
          </div>

          {/* Letter Signature */}
          <div className="letter-footer">
            <p className="letter-signature">Con todo mi amor, tu principe ♥</p>
          </div>
        </div>
      )}
    </div>
  )
}
