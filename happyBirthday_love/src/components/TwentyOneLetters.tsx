import React, { useState } from 'react'
import { Heart, Sparkles, Star, Crown, Gift, ArrowRight, X } from 'lucide-react'
import confetti from 'canvas-confetti'

// Import all 21 photos from src/images
import img1 from '../images/princess.jpeg'
import img2 from '../images/mibb.jpeg'
import img3 from '../images/mi reina.jpeg'
import img4 from '../images/juntos1.jpeg'
import img5 from '../images/juntos2.jpeg'
import img6 from '../images/juntos3.jpeg'
import img7 from '../images/juntos4.jpeg'
import img8 from '../images/juntos5.jpeg'
import img9 from '../images/juntos6.jpeg'
import img10 from '../images/juntos7.jpeg'
import img11 from '../images/juntos8.jpeg'
import img12 from '../images/juntos9.jpeg'
import img13 from '../images/juntos10.jpeg'
import img14 from '../images/juntos11.jpeg'
import img15 from '../images/juntos12.jpeg'
import img16 from '../images/13juntos.jpeg'
import img17 from '../images/juntos14.jpeg'
import img18 from '../images/juntos15.jpeg'
import img19 from '../images/juntos16.jpeg'
import img20 from '../images/juntos17.jpeg'
import img21 from '../images/juntos.jpeg'

export interface BirthdayLetter {
  id: number
  title: string
  subtitle: string
  colorTheme: string
  accentColor: string
  bgGradient: string
  icon: typeof Heart
  image: string
  placeholderText: string
}

export const LETTERS_DATA: BirthdayLetter[] = [
  {
    id: 1,
    title: 'Para mi princesa',
    subtitle: 'Año 1: El comienzo de la magia',
    colorTheme: '#c85084',
    accentColor: '#e46e99',
    bgGradient: 'linear-gradient(135deg, #ffffff 0%, #fff0f5 100%)',
    icon: Crown,
    image: img1,
    placeholderText: `¿Recuerdas como nos conocimos? .... Amooo volverlo a recordar🥹, 
                      jamás me arrepentire de haber aceptado bailar, sin duda alguna, fue la mejor 
                      decision que he tomado, en ese momento no sabia que estaba bailando con mi 
                      futura novia, lo que si sabia, es que queria seguir viendote, tu sonrisa, tu carita,
                      tus ojitos, y me encanto lo que paso despues, me quede pensando en ti todo el camino a casa, 
                      al igual que tu, y lo que paso despues, fue magico, al igual que tu, gracias por existir mi amor🥹😍.`,
  },
  {
    id: 2,
    title: 'Para mi bebé',
    subtitle: 'Año 2: Tu dulzura infinita',
    colorTheme: '#8b5cf6',
    accentColor: '#a78bfa',
    bgGradient: 'linear-gradient(135deg, #ffffff 0%, #f3e8ff 100%)',
    icon: Heart,
    image: img2,
    placeholderText: `Me encanta tu personalidad, tu dulzura, tu forma de ser, 
                      amo todo de ti. Nunca cambies mi amor, porque amo lo que eres 🥹 ... 
                      Tampoco dudes de ti, porque para mi, eres perfecta tal cual. 🥹 💖`,
  },
  {
    id: 3,
    title: 'Para mi reina',
    subtitle: 'Año 3: La dueña de mi corazón',
    colorTheme: '#db2777',
    accentColor: '#f472b6',
    bgGradient: 'linear-gradient(135deg, #ffffff 0%, #fce7f3 100%)',
    icon: Crown,
    image: img3,
    placeholderText: `Tú eres la unica dueña de mi corazón y de mi mente 🥹💖 ... 
                      ¿Que haria sin ti?, en serio, ¿que haria sin ti? 🥹, no me lo puedo imaginar, 
                      eres una mujer tan maravillosa, tan dulce, tan hermosa, 
                      tan inteligente, tan divertida, tan todo, realmente me enamore de ti 
                      y no me arrepiento de nada 🥹`,
  },
  {
    id: 4,
    title: 'Para mi sol',
    subtitle: 'Año 4: La luz de mis días',
    colorTheme: '#d97706',
    accentColor: '#fbbf24',
    bgGradient: 'linear-gradient(135deg, #ffffff 0%, #fffbeb 100%)',
    icon: Star,
    image: img4,
    placeholderText: 'Eres mi motor de cada día 🥹, me haces tan feliz, que no puedo dejar de pensar en ti ni un segundo 🥹💖.',
  },
  {
    id: 5,
    title: 'Para mi cielo',
    subtitle: 'Año 5: Paz y tranquilidad',
    colorTheme: '#0284c7',
    accentColor: '#38bdf8',
    bgGradient: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
    icon: Sparkles,
    image: img5,
    placeholderText: `Estar a tu lado me da una paz que jamás imaginé sentir 🥹✨. 
                      Contigo todo el ruido del mundo se apaga y sólo queda la tranquilidad 
                      de saber que estoy en el lugar correcto, en tus brazos mi reina 💖.`,
  },
  {
    id: 6,
    title: 'Para mi vida',
    subtitle: 'Año 6: Mi razón de sonreír',
    colorTheme: '#e11d48',
    accentColor: '#fb7185',
    bgGradient: 'linear-gradient(135deg, #ffffff 0%, #fff1f2 100%)',
    icon: Heart,
    image: img6,
    placeholderText: `Sin duda alguna, te has convertido en mi razón favorita para sonreír todos 
                      los días 🥹😍. No hay día gris cuando pienso en ti. Te amo con toda mi alma bb 💖.`,
  },
  {
    id: 7,
    title: 'Para mi amor',
    subtitle: 'Año 7: Latidos compartidos',
    colorTheme: '#c026d3',
    accentColor: '#e879f9',
    bgGradient: 'linear-gradient(135deg, #ffffff 0%, #fae8ff 100%)',
    icon: Heart,
    image: img7,
    placeholderText: `Cada latido de mi corazón lleva tu nombre 🥹💓. Es increíble cómo 
                      conectamos tan bonito y cómo nuestros sentimientos se sincronizan. 
                      Gracias por darte la oportunidad de conocerme y darme tu amor 🥹✨.`,
  },
  {
    id: 8,
    title: 'Para mi flor',
    subtitle: 'Año 8: Belleza y frescura',
    colorTheme: '#059669',
    accentColor: '#34d399',
    bgGradient: 'linear-gradient(135deg, #ffffff 0%, #ecfdf5 100%)',
    icon: Sparkles,
    image: img8,
    placeholderText: `Eres la mujer más hermosa y radiante de mi vida 🌸🥹. Me siento 
                      muy feliz de tenerte en mi vida y de compartir cada momento a tu lado.`,
  },
  {
    id: 9,
    title: 'Para mi angelito',
    subtitle: 'Año 9: Bondad y cariño',
    colorTheme: '#7c3aed',
    accentColor: '#a78bfa',
    bgGradient: 'linear-gradient(135deg, #ffffff 0%, #f5f3ff 100%)',
    icon: Star,
    image: img9,
    placeholderText: `Llegaste a mi vida como un angelito enviado a cuidarme y hacerme 
                      feliz 🥹👼. Tu ternura, tu bondad y la forma tan pura en la que me 
                      tratas me conquistan cada día más 💖.`,
  },
  {
    id: 10,
    title: 'Para mi todo',
    subtitle: 'Año 10: Una década de luz',
    colorTheme: '#ea580c',
    accentColor: '#fb923c',
    bgGradient: 'linear-gradient(135deg, #ffffff 0%, #fff7ed 100%)',
    icon: Gift,
    image: img10,
    placeholderText: `Eres mi todo, mi presente y mi futuro 🥹✨.`,
  },
  {
    id: 11,
    title: 'Para mi niña hermosa',
    subtitle: 'Año 11: Sonrisas inolvidables',
    colorTheme: '#9333ea',
    accentColor: '#c084fc',
    bgGradient: 'linear-gradient(135deg, #ffffff 0%, #faf5ff 100%)',
    icon: Heart,
    image: img11,
    placeholderText: `Amo ver esa carita hermosa cuando te ríes 🥹😍 o cuando te hago sonrojar 🤭. 
                      Cada momento divertido a tu lado se queda en mis recuerdos, y claro, de toda la vida. 
                      Eres mi niña hermosa 💖.`,
  },
  {
    id: 12,
    title: 'Para mi tesoro',
    subtitle: 'Año 12: Lo más valioso',
    colorTheme: '#16a34a',
    accentColor: '#4ade80',
    bgGradient: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)',
    icon: Crown,
    image: img12,
    placeholderText: `Si me preguntaran cuál es mi tesoro más grande en esta vida, 
                      sin dudarlo diría que eres tú 🥹💎. No hay nada en este mundo que 
                      valga más que tu amor, tu abrazo y tu compañía 💖.`,
  },
  {
    id: 13,
    title: 'Para mi alegría',
    subtitle: 'Año 13: Risas y felicidad',
    colorTheme: '#e11d48',
    accentColor: '#fda4af',
    bgGradient: 'linear-gradient(135deg, #ffffff 0%, #ffe4e6 100%)',
    icon: Star,
    image: img13,
    placeholderText: `A tu lado, de verdad, me devuelves las ganas de todo, 
                      me contagias tu alegría y haces que cada día a tu lado sea una verdadera fiesta para mi corazón 💖✨.`,
  },
  {
    id: 14,
    title: 'Para mi mundo',
    subtitle: 'Año 14: Todo a tu alrededor',
    colorTheme: '#4f46e5',
    accentColor: '#818cf8',
    bgGradient: 'linear-gradient(135deg, #ffffff 0%, #eef2ff 100%)',
    icon: Sparkles,
    image: img14,
    placeholderText: `No me imagino la vida de otra manera que no sea tomándote de la mano y caminando juntos hacia donde sea 💖😍.`,
  },
  {
    id: 15,
    title: 'Para mi luz',
    subtitle: 'Año 15: Brillante como las estrellas',
    colorTheme: '#ca8a04',
    accentColor: '#fde047',
    bgGradient: 'linear-gradient(135deg, #ffffff 0%, #fefce8 100%)',
    icon: Star,
    image: img15,
    placeholderText: `Brillas mucho que hasta le ganas a las estrellas y a la luna, ¿recuerdas que te lo digo siempre? 🥹💖.`,
  },
  {
    id: 16,
    title: 'Para mi lugar feliz',
    subtitle: 'Año 16: En donde quiero estar',
    colorTheme: '#be123c',
    accentColor: '#fb7185',
    bgGradient: 'linear-gradient(135deg, #ffffff 0%, #fff1f2 100%)',
    icon: Heart,
    image: img16,
    placeholderText: 'Estar pegadito a ti, es todo lo que necesito por el resto de mi vida🥹💖.',
  },
  {
    id: 17,
    title: 'Para mi refugio',
    subtitle: 'Año 17: Tu paz que me abraza',
    colorTheme: '#c2410c',
    accentColor: '#fdba74',
    bgGradient: 'linear-gradient(135deg, #ffffff 0%, #fff7ed 100%)',
    icon: Heart,
    image: img17,
    placeholderText: 'En tus brazos encuentro el lugar más seguro, nunca me quiero despegar de ti 🥹💖.',
  },
  {
    id: 18,
    title: 'Para mi cómplice',
    subtitle: 'Año 18: Mi mejor historia',
    colorTheme: '#9d174d',
    accentColor: '#f472b6',
    bgGradient: 'linear-gradient(135deg, #ffffff 0%, #fdf2f8 100%)',
    icon: Sparkles,
    image: img18,
    placeholderText: `Gracias por ser mi mejor amiga, mi novia y mi cómplice en todo 🥹✨. 
                       Escribir esta historia de amor contigo es lo más bonito que me ha pasado y quiero seguir escribiéndola contigo por siempre 💖.`,
  },
  {
    id: 19,
    title: 'Para mi destino',
    subtitle: 'Año 19: Caminando juntos',
    colorTheme: '#6b21a8',
    accentColor: '#c084fc',
    bgGradient: 'linear-gradient(135deg, #ffffff 0%, #f3e8ff 100%)',
    icon: Crown,
    image: img19,
    placeholderText: `Estoy convencido de que el destino quería que nos cruzáramos en ese baile 🥹💃🕺. `,
  },
  {
    id: 20,
    title: 'Para mi eternidad',
    subtitle: 'Año 20: Siempre en mi corazón',
    colorTheme: '#0e7490',
    accentColor: '#67e8f9',
    bgGradient: 'linear-gradient(135deg, #ffffff 0%, #ecfeff 100%)',
    icon: Heart,
    image: img20,
    placeholderText: 'Lo que siento por ti trasciende el tiempo 🥹. Te amo con una fuerza que se mantendrá viva hoy, mañana y para siempre en lo más profundo de mi corazón 💖✨.',
  },
  {
    id: 21,
    title: 'Para el amor de mi vida',
    subtitle: '¡Felices 21 Años, Mi Princesa! 👑🎉',
    colorTheme: '#b91c1c',
    accentColor: '#f87171',
    bgGradient: 'linear-gradient(135deg, #ffffff 0%, #fff1f2 100%)',
    icon: Crown,
    image: img21,
    placeholderText: `¡FELIIIIZ PUMPEEE!!! 🥹🎂,  21 años, mi reina hermosa! 👑🎂🥹 
                      Gracias por ser tan maravillosa, por existir y por hacerme el novio más feliz del mundo entero. 
                      ¡Te amo con todo mi ser y mi corazón por siempre! 💖🎉😍✨.`,
  },
]

export const TwentyOneLetters: React.FC = () => {
  const [selectedLetter, setSelectedLetter] = useState<BirthdayLetter | null>(null)

  const handleOpenLetter = (letter: BirthdayLetter) => {
    setSelectedLetter(letter)
    confetti({
      particleCount: 90,
      spread: 65,
      origin: { y: 0.6 },
      colors: [letter.colorTheme, letter.accentColor, '#ffffff'],
    })
  }

  return (
    <section className="twentyone-letters-section">
      {/* Section Header */}
      <div className="twentyone-header">
        <div className="twentyone-badge">
          <Sparkles size={24} color="#c85084" />
        </div>
        <h2 className="twentyone-title">21 Cartas de Amor para tus 21 Años 👑💖</h2>
        <p className="twentyone-subtitle">
          Una carta y recuerdo especial por cada año maravilloso de tu vida:
        </p>
      </div>

      {/* Grid of 21 Compact Vertical Cards */}
      <div className="twentyone-grid">
        {LETTERS_DATA.map((letter) => {
          return (
            <div
              key={letter.id}
              className="twentyone-card-vertical"
              style={{ background: letter.bgGradient, borderColor: letter.accentColor }}
              onClick={() => handleOpenLetter(letter)}
            >
              {/* Number Badge */}
              <div
                className="letter-num-badge"
                style={{ backgroundColor: letter.colorTheme }}
              >
                #{letter.id}
              </div>

              {/* Photo Box */}
              <div className="twentyone-card-photo-box">
                <img src={letter.image} alt={letter.title} className="twentyone-card-img" />
              </div>

              {/* Body Info */}
              <div className="twentyone-card-body">
                <h3 className="twentyone-card-title">♡ {letter.title}</h3>
                <p className="twentyone-card-sub">{letter.subtitle}</p>
              </div>

              {/* Action Button */}
              <div className="twentyone-card-action">
                <span>Abrir carta</span>
                <ArrowRight size={14} style={{ color: letter.colorTheme }} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Modal view for opened letter */}
      {selectedLetter && (
        <div className="modal-overlay" onClick={() => setSelectedLetter(null)}>
          <div
            className="letter-paper animate-unfold modal-letter-content"
            onClick={(e) => e.stopPropagation()}
            style={{ borderColor: selectedLetter.accentColor }}
          >
            {/* Header */}
            <div className="letter-header">
              <div
                className="letter-stamp"
                style={{
                  color: selectedLetter.colorTheme,
                  backgroundColor: `${selectedLetter.colorTheme}15`,
                  borderColor: selectedLetter.accentColor,
                }}
              >
                <Sparkles size={16} color={selectedLetter.colorTheme} />
                <span>Carta #{selectedLetter.id} — {selectedLetter.subtitle}</span>
              </div>
              <button
                type="button"
                className="letter-close-btn"
                onClick={() => setSelectedLetter(null)}
              >
                <X size={18} />
              </button>
            </div>

            {/* Letter Hero Image */}
            <div className="modal-letter-image-wrap">
              <img src={selectedLetter.image} alt={selectedLetter.title} className="modal-letter-img" />
            </div>

            {/* Letter Title */}
            <h2 className="letter-title" style={{ color: selectedLetter.colorTheme }}>
              {selectedLetter.title} 💖
            </h2>

            {/* Letter Content */}
            <div className="letter-body">
              <p>{selectedLetter.placeholderText}</p>
            </div>

            {/* Signature */}
            <div className="letter-footer">
              <p className="letter-signature" style={{ color: selectedLetter.colorTheme }}>
                Con todo mi amor ♥
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
