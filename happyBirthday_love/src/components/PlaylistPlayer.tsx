import React, { useState, useEffect, useRef } from 'react'
import { Music, Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, ListMusic, Heart } from 'lucide-react'

import song1 from '../songs/02 Calibre 50 - Tus Latidos.mp3'
import song2 from '../songs/Trio Huapangueros de Aguascalientes - Tulipanes Y Gerberas.mp3'
import song3 from '../songs/Pedro Arturo - MARÍA FLOR.mp3'

export interface SongTrack {
  id: number
  title: string
  artist: string
  src: string
}

const PLAYLIST: SongTrack[] = [
  {
    id: 1,
    title: 'Tus Latidos',
    artist: 'Calibre 50',
    src: song1,
  },
  {
    id: 2,
    title: 'Tulipanes Y Gerberas',
    artist: 'Trío Huapangueros de Aguascalientes',
    src: song2,
  },
  {
    id: 3,
    title: 'María Flor',
    artist: 'Pedro Arturo & Armonía Huapanguera',
    src: song3,
  },
]

export const PlaylistPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showPlaylistMenu, setShowPlaylistMenu] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const currentTrack = PLAYLIST[currentTrackIndex]

  // Auto play when loaded
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch((err) => {
        console.log('Autoplay prevented:', err)
      })
    }
  }, [currentTrackIndex])

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const toggleMute = () => {
    if (!audioRef.current) return
    audioRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length)
  }

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length)
  }

  const selectTrack = (index: number) => {
    setCurrentTrackIndex(index)
    setShowPlaylistMenu(false)
  }

  return (
    <div className="playlist-player-wrapper">
      <audio
        ref={audioRef}
        src={currentTrack.src}
        onEnded={handleNext}
      />

      <div className="playlist-bar">
        {/* Track Icon & Info */}
        <div className="track-info">
          <div className="track-badge">
            <Music size={16} className={isPlaying ? 'animate-bounce' : ''} />
          </div>
          <div className="track-text">
            <span className="track-title">{currentTrack.title}</span>
            <span className="track-artist">{currentTrack.artist}</span>
          </div>
        </div>

        {/* Player Controls */}
        <div className="player-controls">
          <button
            type="button"
            onClick={handlePrev}
            className="control-btn-icon"
            title="Canción anterior"
          >
            <SkipBack size={16} />
          </button>

          <button
            type="button"
            onClick={togglePlay}
            className="play-pause-btn"
            title={isPlaying ? 'Pausar' : 'Reproducir'}
          >
            {isPlaying ? <Pause size={15} /> : <Play size={15} style={{ marginLeft: '2px' }} />}
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="control-btn-icon"
            title="Siguiente canción"
          >
            <SkipForward size={16} />
          </button>

          <button
            type="button"
            onClick={toggleMute}
            className="control-btn-icon"
            title={isMuted ? 'Desactivar silencio' : 'Silenciar'}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          <button
            type="button"
            onClick={() => setShowPlaylistMenu(!showPlaylistMenu)}
            className={`control-btn-icon ${showPlaylistMenu ? 'active' : ''}`}
            title="Ver lista de canciones"
          >
            <ListMusic size={16} />
          </button>
        </div>
      </div>

      {/* Playlist Dropdown Menu */}
      {showPlaylistMenu && (
        <div className="playlist-menu animate-unfold">
          <div className="playlist-menu-header">
            <Heart size={14} fill="var(--text-pink)" color="var(--text-pink)" />
            <span>Playlist Favoritos</span>
          </div>

          <div className="playlist-items-list">
            {PLAYLIST.map((track, idx) => (
              <div
                key={track.id}
                className={`playlist-item ${idx === currentTrackIndex ? 'active' : ''}`}
                onClick={() => selectTrack(idx)}
              >
                <div className="playlist-item-num">
                  {idx === currentTrackIndex ? <Music size={14} color="var(--text-pink)" /> : idx + 1}
                </div>
                <div className="playlist-item-info">
                  <div className="playlist-item-title">{track.title}</div>
                  <div className="playlist-item-artist">{track.artist}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
