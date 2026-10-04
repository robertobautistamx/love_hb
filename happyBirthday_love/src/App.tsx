import { useState, useRef } from 'react'
import { RomanticLogin } from './components/RomanticLogin'
import { RomanticHeroIntro } from './components/RomanticHeroIntro'
import { LoveDaysCounter } from './components/LoveDaysCounter'
import { LoveLetter } from './components/LoveLetter'
import { TwentyOneLetters } from './components/TwentyOneLetters'
import { PolaroidGallery } from './components/PolaroidGallery'
import { MemoryGame } from './components/MemoryGame'
import { LoveQuiz } from './components/LoveQuiz'
import { PlaylistPlayer } from './components/PlaylistPlayer'
import { LogOut } from 'lucide-react'
import './index.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('princesa_authenticated') === 'true'
  })

  const contentRef = useRef<HTMLDivElement | null>(null)

  const handleLoginSuccess = () => {
    localStorage.setItem('princesa_authenticated', 'true')
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('princesa_authenticated')
    setIsAuthenticated(false)
  }

  const scrollToContent = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Pastel Lilac Organic Background */}
      <div className="lilac-bg-wrapper">
        <div className="wave-top-left"></div>
        <div className="wave-bottom-right"></div>
        
        {/* Floating subtle hearts */}
        <div className="bg-floating-heart" style={{ top: '25%', left: '15%' }}>♥</div>
        <div className="bg-floating-heart" style={{ top: '35%', right: '18%', animationDelay: '2s' }}>♥</div>
        <div className="bg-floating-heart" style={{ bottom: '20%', left: '22%', animationDelay: '4s' }}>♥</div>
        <div className="bg-floating-heart" style={{ top: '65%', right: '12%', animationDelay: '1s' }}>♥</div>
      </div>

      {/* Conditional view: Login OR Authenticated View */}
      {isAuthenticated ? (
        <div className="authenticated-page-layout">
          {/* Fixed Top Controls Bar (Playlist & Logout) */}
          <div className="top-controls-bar">
            <PlaylistPlayer />
            <button type="button" className="blank-logout-btn" onClick={handleLogout} title="Cerrar sesión">
              <LogOut size={16} /> <span>Cerrar sesión</span>
            </button>
          </div>

          {/* Hero Intro Section with Fading Phrases & Gerberas/Roses */}
          <RomanticHeroIntro onScrollDown={scrollToContent} />

          {/* Main Content Area */}
          <div ref={contentRef} id="content-section" className="content-section">
            {/* Live Days Together Counter */}
            <LoveDaysCounter />

            {/* Main Love Letter */}
            <LoveLetter />
            
            {/* 21 Birthday Letters Section */}
            <TwentyOneLetters />

            {/* Polaroid Photo Album */}
            <PolaroidGallery />

            {/* 2-Player Love Memory Game */}
            <MemoryGame />

            {/* Relationship Love Quiz */}
            <LoveQuiz />
          </div>
        </div>
      ) : (
        <RomanticLogin onSuccess={handleLoginSuccess} />
      )}
    </>
  )
}

export default App
