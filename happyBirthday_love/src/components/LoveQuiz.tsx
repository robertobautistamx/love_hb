import React, { useState } from 'react'
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Award } from 'lucide-react'
import confetti from 'canvas-confetti'

export interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: '¿Dónde nos conocimos?',
    options: [
      'A) En un ensayo de baile',
      'B) En la escuela',
      'C) En una fiesta',
      'D) En un café',
    ],
    correctIndex: 0,
    explanation: '¡Sí! Nos conocimos en un ensayo de baile.',
  },
  {
    id: 2,
    question: '¿Dónde fue la primera vez que agarré tu mano y te robé un beso?',
    options: [
      'A) En la UAT y por la casa',
      'B) En el parque central',
      'C) En la sala de cine',
      'D) En una plaza',
    ],
    correctIndex: 0,
    explanation: '¡Correcto! En la UAT y por la casa.',
  },
  {
    id: 3,
    question: '¿Cuál fue la primera película que vimos juntos en el cine?',
    options: [
      'A) Deadpool',
      'B) Intensamente 2',
      'C) Spider-Man',
      'D) Stitch',
    ],
    correctIndex: 0,
    explanation: '¡Exacto! Deadpool fue nuestra primera película en el cine.',
  },
  {
    id: 4,
    question: '¿Cuál fue la segunda película que vimos en el cine?',
    options: [
      'A) Stitch',
      'B) Deadpool',
      'C) Mi Villano Favorito',
      'D) Batman',
    ],
    correctIndex: 0,
    explanation: '¡Así es! Stitch fue nuestra segunda película juntos.',
  },
  {
    id: 5,
    question: '¿Cuántos picnics hemos tenido juntos?',
    options: [
      'A) 2 picnics',
      'B) 1 picnic',
      'C) 3 picnics',
      'D) 4 picnics',
    ],
    correctIndex: 0,
    explanation: '¡Correcto! Hemos tenido 2 picnics inolvidables.',
  },
  {
    id: 6,
    question: '¿Cuál es nuestra fecha más especial y la clave de tu regalo?',
    options: [
      'A) 10 de Noviembre de 2024',
      'B) 14 de Febrero de 2024',
      'C) 25 de Diciembre de 2024',
      'D) 1 de Enero de 2025',
    ],
    correctIndex: 0,
    explanation: '¡Exacto! El 10 de Noviembre de 2024 comenzó nuestra hermosa historia.',
  },
  {
    id: 7,
    question: '¿Quién es la princesa más hermosa y dueña de mi corazón?',
    options: [
      'A) Tú, sin duda alguna',
      'B) Nadie más',
      'C) Tú hoy y siempre',
      'D) Todas las anteriores',
    ],
    correctIndex: 0,
    explanation: '¡Tú, mi reina hermosa! La única dueña de mi corazón.',
  },
  {
    id: 8,
    question: '¿Qué canción suena cuando entramos a nuestro mundo especial?',
    options: [
      'A) Tus Latidos — Calibre 50',
      'B) Tulipanes Y Gerberas',
      'C) María Flor',
      'D) Pedro Arturo',
    ],
    correctIndex: 0,
    explanation: '¡Sí! "Tus Latidos" de Calibre 50 es nuestra canción.',
  },
  {
    id: 9,
    question: '¿Qué es lo que más me enamora de ti cada segundo a tu lado?',
    options: [
      'A) Absolutamente todo de ti',
      'B) Tu hermosa sonrisa',
      'C) Tus abrazos apretaditos',
      'D) Tu linda voz',
    ],
    correctIndex: 0,
    explanation: '¡Absolutamente todo de ti me enamora locamente cada día!',
  },
  {
    id: 10,
    question: '¿Cuánto dura nuestra promesa de amor?',
    options: [
      'A) Por siempre y para siempre',
      'B) 100 años',
      'C) Hasta que la luna se apague',
      'D) 1000 años',
    ],
    correctIndex: 0,
    explanation: '¡Nuestro amor dura por siempre y para siempre!',
  },
]

export const LoveQuiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [isAnswered, setIsAnswered] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex]

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return
    setSelectedOptionIndex(idx)
    setIsAnswered(true)

    if (idx === currentQ.correctIndex) {
      setScore((prev) => prev + 1)
      confetti({
        particleCount: 35,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#c85084', '#ffd700'],
      })
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setSelectedOptionIndex(null)
      setIsAnswered(false)
    } else {
      setQuizCompleted(true)
      confetti({
        particleCount: 130,
        spread: 85,
        origin: { y: 0.6 },
        colors: ['#c85084', '#e6739f', '#ffd700', '#ffffff'],
      })
    }
  }

  const restartQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedOptionIndex(null)
    setScore(0)
    setIsAnswered(false)
    setQuizCompleted(false)
  }

  return (
    <section className="love-quiz-section">
      {/* Header */}
      <div className="love-quiz-header">
        <div className="love-quiz-icon-badge">
          <HelpCircle size={26} color="#c85084" />
        </div>
        <h2 className="love-quiz-title">Trivia de Nuestra Historia ❓💖</h2>
        <p className="love-quiz-subtitle">
          Demuestra cuánto conoces nuestros momentos más mágicos:
        </p>
      </div>

      {!quizCompleted ? (
        <div className="quiz-card animate-unfold">
          {/* Progress Bar */}
          <div className="quiz-progress-bar-wrap">
            <div
              className="quiz-progress-fill"
              style={{
                width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%`,
              }}
            ></div>
          </div>

          <div className="quiz-question-counter">
            <span>Pregunta {currentQuestionIndex + 1} de {QUIZ_QUESTIONS.length}</span>
            <span className="quiz-score-live">Puntos: {score}</span>
          </div>

          {/* Question Title */}
          <h3 className="quiz-question-text">{currentQ.question}</h3>

          {/* Options Grid */}
          <div className="quiz-options-list">
            {currentQ.options.map((opt, idx) => {
              let stateClass = ''
              if (isAnswered) {
                if (idx === currentQ.correctIndex) {
                  stateClass = 'correct'
                } else if (idx === selectedOptionIndex) {
                  stateClass = 'wrong'
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  className={`quiz-option-btn ${stateClass} ${
                    selectedOptionIndex === idx ? 'selected' : ''
                  }`}
                  onClick={() => handleSelectOption(idx)}
                >
                  <span>{opt}</span>
                  {isAnswered && idx === currentQ.correctIndex && (
                    <CheckCircle2 size={20} color="#10b981" />
                  )}
                  {isAnswered && idx === selectedOptionIndex && idx !== currentQ.correctIndex && (
                    <XCircle size={20} color="#ef4444" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Feedback Explanation Box */}
          {isAnswered && (
            <div className="quiz-explanation-box animate-unfold">
              <p>
                {selectedOptionIndex === currentQ.correctIndex ? (
                  currentQ.explanation
                ) : (
                  <span style={{ color: '#ef4444', fontWeight: 'bold' }}>Incorrecto.</span>
                )}
              </p>
              <button
                type="button"
                className="submit-btn"
                onClick={handleNextQuestion}
                style={{ marginTop: '16px' }}
              >
                {currentQuestionIndex + 1 < QUIZ_QUESTIONS.length
                  ? 'Siguiente Pregunta →'
                  : 'Ver Resultado Final 🏆'}
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Summary Result */
        <div className="quiz-card animate-unfold text-center">
          <div className="winner-icon-wrap">
            <Award size={48} color="#c85084" />
          </div>
          <h3 className="quiz-result-title">
            ¡Trivia Completada mi Princesa! 🎉
          </h3>
          <p className="quiz-result-score">
            Obtuviste <strong style={{ color: 'var(--text-pink)' }}>{score} de {QUIZ_QUESTIONS.length}</strong> respuestas correctas 💖
          </p>

          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '24px' }}>
            {score === QUIZ_QUESTIONS.length
              ? '¡Perfecto! Conoces cada detalle de nuestro amor a la perfección 👑♡'
              : '¡Eres maravillosa mi vida! Cada momento juntos es un recuerdo inolvidable ✨.'}
          </p>

          <button type="button" className="submit-btn" onClick={restartQuiz}>
            <RotateCcw size={18} /> Volver a Jugar
          </button>
        </div>
      )}
    </section>
  )
}

