import React from 'react'
import { Heart, Calendar, Sparkles, Star, Crown } from 'lucide-react'
import juntos10nov from '../images/juntos.jpeg'
import juntosRisas from '../images/juntos4.jpeg'
import juntosCreciendo from '../images/juntos7.jpeg'
import princesa21 from '../images/princess.jpeg'

export interface TimelineEvent {
  id: number
  date: string
  title: string
  description: string
  icon: typeof Heart
  image: string
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 1,
    date: '10 NOV 2024',
    title: '🌹 El Día que Comenzó Todo',
    description: 'Nuestra fecha especial. El día en que nuestros caminos se unieron para empezar a construir la historia de amor más hermosa.',
    icon: Calendar,
    image: juntos10nov,
  },
  {
    id: 2,
    date: 'MEMORIAS',
    title: '✨ Risas y Miradas Inolvidables',
    description: 'Cada salida, cada llamada, cada abrazo apretadito y cada sonrisa compartida hicieron crecer este amor único.',
    icon: Star,
    image: juntosRisas,
  },
  {
    id: 3,
    date: 'CADA DÍA',
    title: '💕 Creciendo Juntos',
    description: 'Gracias por ser mi confidente, mi apoyo incondicional y mi lugar seguro en todo momento.',
    icon: Heart,
    image: juntosCreciendo,
  },
  {
    id: 4,
    date: '¡HOY!',
    title: '👑 Tus 21 Años de Magia',
    description: 'Celebramos tu cumpleaños #21 rodeada de todo el amor, alegría y sorpresas que te mereces por ser una princesa increíble.',
    icon: Crown,
    image: princesa21,
  },
]

export const LoveTimeline: React.FC = () => {
  return (
    <section className="timeline-section">
      <div className="timeline-header">
        <div className="timeline-badge">
          <Sparkles size={24} color="#c85084" />
        </div>
        <h2 className="timeline-title">NUESTRA HISTORIA DE AMOR 📖💖</h2>
        <p className="timeline-subtitle">Línea del tiempo de nuestros momentos más mágicos:</p>
      </div>

      <div className="timeline-container">
        {TIMELINE_EVENTS.map((event, index) => {
          const IconComp = event.icon
          const isEven = index % 2 === 0
          return (
            <div key={event.id} className={`timeline-item ${isEven ? 'left' : 'right'}`}>
              <div className="timeline-dot">
                <IconComp size={16} color="#ffffff" />
              </div>

              <div className="timeline-card">
                <div className="timeline-card-header">
                  <span className="timeline-date-badge">{event.date}</span>
                </div>

                <div className="timeline-photo-thumb-wrap">
                  <img src={event.image} alt={event.title} className="timeline-photo-thumb" />
                </div>

                <h3 className="timeline-item-title">{event.title}</h3>
                <p className="timeline-item-desc">{event.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

