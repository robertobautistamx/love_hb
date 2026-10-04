import React, { useState } from 'react'
import { Camera, X } from 'lucide-react'

// Eagerly import all photos directly in src/images/ (excluding subdirectories)
const mainImageModules = import.meta.glob<{ default: string }>('../images/*.jpeg', { eager: true })
const mainImages = Object.values(mainImageModules).map((mod) => mod.default)

export interface PolaroidItem {
  id: number
  src: string
  caption: string
  date: string
  rotation: string
}

const ROTATIONS = ['-3deg', '2deg', '-1deg', '4deg', '-4deg', '3deg', '-2deg', '2deg', '-3deg', '1deg']
const CAPTIONS = [
  'Tú y yo, nuestro lugar feliz 💕',
  'La princesa más hermosa 👑',
  'Risas inolvidables juntos ✨',
  'Tu carita bella que adoro 💖',
  'Cada instante a tu lado es mágico 🌹',
  'Mi reina y mi persona favorita 👑',
  'Abrazos apretaditos y cálidos 🥰',
  'Creando la historia de amor más bella 📖♡',
  'Momentos únicos e inolvidables ✨',
  'Amor bonito y sincero 💕',
  'Juntos para siempre ♡',
  'Tu sonrisa me ilumina el día ☀️',
  'Complicidad y alegría infinita 💖',
  'Gracias por existir mi vida 👑',
  'Nuestra aventura de amor 🌹',
]

const PHOTOS: PolaroidItem[] = mainImages.map((src, index) => ({
  id: index + 1,
  src,
  caption: CAPTIONS[index % CAPTIONS.length],
  date: `Recuerdo #${index + 1}`,
  rotation: ROTATIONS[index % ROTATIONS.length],
}))

export const PolaroidGallery: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<PolaroidItem | null>(null)

  return (
    <section className="polaroid-section">
      <div className="polaroid-header">
        <div className="polaroid-icon-badge">
          <Camera size={24} color="#c85084" />
        </div>
        <h2 className="polaroid-title">📷 Álbum de Recuerdos Polaroid</h2>
        <p className="polaroid-subtitle">Pared de fotografías — Toca cualquier foto para verla en grande:</p>
      </div>

      <div className="polaroid-photo-wall">
        {PHOTOS.map((photo) => (
          <div
            key={photo.id}
            className="polaroid-card"
            style={{ transform: `rotate(${photo.rotation})` }}
            onClick={() => setActivePhoto(photo)}
          >
            <div className="polaroid-tape"></div>
            <div className="polaroid-photo-box">
              <img src={photo.src} alt={photo.caption} className="polaroid-img" />
            </div>
            <div className="polaroid-caption-area">
              <p className="polaroid-caption">{photo.caption}</p>
              <span className="polaroid-date">{photo.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Photo Modal */}
      {activePhoto && (
        <div className="modal-overlay" onClick={() => setActivePhoto(null)}>
          <div className="modal-photo-content animate-unfold" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="letter-close-btn"
              style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10 }}
              onClick={() => setActivePhoto(null)}
            >
              <X size={20} />
            </button>

            <img src={activePhoto.src} alt={activePhoto.caption} className="modal-full-img" />
            <div style={{ marginTop: '16px', textAlign: 'center' }}>
              <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.8rem', color: 'var(--text-pink)' }}>
                {activePhoto.caption}
              </p>
              <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>{activePhoto.date}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}


