import React, { useState, useEffect, useRef } from 'react'
import {
  Music,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  ListMusic,
  Heart
} from 'lucide-react'

import song1 from '../songs/01 Sebastian Yatra - No Hay Nadie Más.mp3'
import song2 from '../songs/02 Calibre 50 - Tus Latidos.mp3'
import song3 from '../songs/10 Ariana Grande - 7 rings.mp3'
import song4 from '../songs/Los Malagueña - Flores Negras.mp3'
import song5 from '../songs/Los Malagueña - La Promesa.mp3'
import song6 from '../songs/Pedro Arturo - MARÍA FLOR.mp3'
import song7 from '../songs/Trio Huapangueros de Aguascalientes - Tulipanes Y Gerberas.mp3'

export interface SongTrack {
  id: number
  title: string
  artist: string
  src: string
}

const PLAYLIST: SongTrack[] = [
  {
    id: 1,
    title: 'No Hay Nadie Más',
    artist: 'Sebastián Yatra',
    src: song1,
  },
  {
    id: 2,
    title: 'Tus Latidos',
    artist: 'Calibre 50',
    src: song2,
  },
  {
    id: 3,
    title: '7 rings',
    artist: 'Ariana Grande',
    src: song3,
  },
  {
    id: 4,
    title: 'Flores Negras',
    artist: 'Los Malagueña',
    src: song4,
  },
  {
    id: 5,
    title: 'La Promesa',
    artist: 'Los Malagueña',
    src: song5,
  },
  {
    id: 6,
    title: 'María Flor',
    artist: 'Pedro Arturo',
    src: song6,
  },
  {
    id: 7,
    title: 'Tulipanes Y Gerberas',
    artist: 'Trío Huapangueros de Aguascalientes',
    src: song7,
  },
]

export const PlaylistPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showPlaylistMenu, setShowPlaylistMenu] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  const currentTrack = PLAYLIST[currentTrackIndex]

  // Auto play when track index changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      setCurrentTime(0)
      audioRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch((err) => {
        console.log('Autoplay prevented:', err)
        setIsPlaying(false)
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

  const handleRewind10 = () => {
    if (audioRef.current) {
      const newTime = Math.max(0, audioRef.current.currentTime - 10)
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const handleForward10 = () => {
    if (audioRef.current) {
      const newTime = Math.min(duration || Infinity, audioRef.current.currentTime + 10)
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value)
    setCurrentTime(newTime)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const selectTrack = (index: number) => {
    setCurrentTrackIndex(index)
    setShowPlaylistMenu(false)
  }

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds) || timeInSeconds < 0) return '0:00'
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="playlist-player-wrapper">
      <audio
        ref={audioRef}
        src={currentTrack.src}
        onEnded={handleNext}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      <div className="playlist-bar">
        {/* Track Icon & Info */}
        <div className="track-info">
          <div className="track-badge">
            <Music size={16} className={isPlaying ? 'animate-bounce' : ''} />
          </div>
          <div className="track-text">
            <span className="track-title" title={currentTrack.title}>{currentTrack.title}</span>
            <span className="track-artist" title={currentTrack.artist}>{currentTrack.artist}</span>
          </div>
        </div>

        {/* Time display */}
        <div className="player-time-badge">
          <span>{formatTime(currentTime)}</span>
          <span className="time-separator">/</span>
          <span>{formatTime(duration)}</span>
        </div>

        {/* Player Controls */}
        <div className="player-controls">
          <button
            type="button"
            onClick={handleRewind10}
            className="control-btn-icon"
            title="Retroceder 10s"
          >
            <RotateCcw size={14} />
          </button>

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
            onClick={handleForward10}
            className="control-btn-icon"
            title="Adelantar 10s"
          >
            <RotateCw size={14} />
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

        {/* Interactive Seek Bar at the bottom of playlist bar */}
        <div className="playlist-scrubber-container">
          <input
            type="range"
            min={0}
            max={duration || 100}
            step={0.1}
            value={currentTime}
            onChange={handleSeekChange}
            className="playlist-scrubber-input"
            style={{
              background: `linear-gradient(to right, var(--text-pink, #e85d9e) ${progressPercent}%, #ebd5e3 ${progressPercent}%)`
            }}
            title="Adelantar / Regresar música"
          />
        </div>
      </div>

      {/* Playlist Dropdown Menu */}
      {showPlaylistMenu && (
        <div className="playlist-menu animate-unfold">
          <div className="playlist-menu-header">
            <Heart size={14} fill="var(--text-pink)" color="var(--text-pink)" />
            <span>Playlist Favoritos ({PLAYLIST.length})</span>
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

