import React, { useState } from 'react'
import { Heart, Crown, User, Lock, Eye, EyeOff, HelpCircle, AlertCircle } from 'lucide-react'
import confetti from 'canvas-confetti'

interface RomanticLoginProps {
  onSuccess: () => void
}

export const RomanticLogin: React.FC<RomanticLoginProps> = ({ onSuccess }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isShaking, setIsShaking] = useState(false)
  const [showHintModal, setShowHintModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const targetUser = import.meta.env.VITE_LOGIN_USER || 'princesa'
  const targetPassword = import.meta.env.VITE_LOGIN_PASSWORD || '10112024'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      const cleanUser = username.trim().toLowerCase()
      const cleanPass = password.trim()

      if (cleanUser === targetUser.toLowerCase() && cleanPass === targetPassword) {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.65 },
          colors: ['#c85084', '#e6739f', '#f1ddf3', '#ffffff'],
        })

        onSuccess()
      } else {
        setIsShaking(true)
        setError('El usuario o la contraseña no son correctos.')
        setTimeout(() => setIsShaking(false), 500)
      }
    }, 400)
  }

  return (
    <div className="login-page-container">
      {/* Lilac Card matching screenshot */}
      <div className={`romantic-card ${isShaking ? 'shake-animation' : ''}`}>
        {/* Crown Badge */}
        <div className="card-header">
          <div className="crown-badge">
            <Crown className="crown-badge-icon" />
          </div>

          {/* Title: Para Mi Princesa */}
          <h1 className="card-title">
            <span className="script-part">Para Mi</span>
            <span className="highlight-part">Princesa</span>
          </h1>

          {/* Subtitle */}
          <p className="card-subtitle">
            Ingresa para acceder a tu regalo especial
          </p>

          {/* Heart Divider ( — ♥ — ) */}
          <div className="heart-divider">
            <div className="heart-divider-line"></div>
            <Heart size={14} fill="currentColor" className="heart-divider-icon" />
            <div className="heart-divider-line"></div>
          </div>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div className="error-banner">
            <AlertCircle size={18} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Usuario Input */}
          <div className="form-group">
            <label className="form-label">Usuario</label>
            <div className="input-wrapper">
              <User className="input-icon" />
              <input
                type="text"
                className="form-input"
                placeholder="Ingresa tu usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoFocus
              />
            </div>
          </div>

          {/* Contraseña Input */}
          <div className="form-group">
            <div className="form-label">
              <span>Contraseña</span>
              <button
                type="button"
                className="hint-button"
                onClick={() => setShowHintModal(true)}
              >
                <HelpCircle size={13} /> Pista
              </button>
            </div>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Checkbox Options */}
          <div className="form-options">
            <label className="remember-label">
              <input
                type="checkbox"
                className="custom-checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Recordar sesión</span>
            </label>
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-btn" disabled={isLoading}>
            <Heart size={16} fill="currentColor" />
            <span>{isLoading ? 'Verificando...' : 'Desbloquear'}</span>
          </button>
        </form>
      </div>

      {/* Hint Modal */}
      {showHintModal && (
        <div className="modal-overlay" onClick={() => setShowHintModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">Pista</h3>
            <div className="modal-body">
              <p>Es una fecha especial.</p>
            </div>
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setShowHintModal(false)}
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
