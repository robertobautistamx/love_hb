import React, { useState, useEffect, useRef } from 'react'
import { Music, Play, Pause, Volume2, VolumeX } from 'lucide-react'
import romanticSong from '../assets/bg_romantic_song.mp3'

export const BackgroundMusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.35 // Soft background volume level

      // Try autoplay softly
      audioRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch((err) => {
        console.log('Autoplay waiting for user interaction:', err)
        setIsPlaying(false)
      })
    }
  }, [])

  // User interaction listener to start audio if browser blocked autoplay
  useEffect(() => {
    const handleFirstUserInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true)
        }).catch(() => {})
      }
      window.removeEventListener('click', handleFirstUserInteraction)
      window.removeEventListener('keydown', handleFirstUserInteraction)
      window.removeEventListener('touchstart', handleFirstUserInteraction)
    }

    window.addEventListener('click', handleFirstUserInteraction)
    window.addEventListener('keydown', handleFirstUserInteraction)
    window.addEventListener('touchstart', handleFirstUserInteraction)

    return () => {
      window.removeEventListener('click', handleFirstUserInteraction)
      window.removeEventListener('keydown', handleFirstUserInteraction)
      window.removeEventListener('touchstart', handleFirstUserInteraction)
    }
  }, [isPlaying])

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true)
      })
    }
  }

  const toggleMute = () => {
    if (!audioRef.current) return
    audioRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  return (
    <div className="bg-music-widget">
      <audio
        ref={audioRef}
        src={romanticSong}
        loop
      />

      <div className="bg-music-card">
        <div className="bg-music-icon-wrapper">
          <Music size={16} className={isPlaying ? 'animate-bounce' : ''} color="var(--text-pink)" />
        </div>

        <div className="bg-music-text">
          <span className="bg-music-title">No Hay Nadie Más</span>
          <span className="bg-music-artist">Sebastián Yatra 💕</span>
        </div>

        <div className="bg-music-controls">
          <button
            type="button"
            onClick={togglePlay}
            className="bg-music-btn play-btn"
            title={isPlaying ? 'Pausar música' : 'Reproducir música'}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} style={{ marginLeft: '1px' }} />}
          </button>

          <button
            type="button"
            onClick={toggleMute}
            className="bg-music-btn"
            title={isMuted ? 'Desactivar silencio' : 'Silenciar'}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
        </div>
      </div>
    </div>
  )
}
