// Simple Web Audio API Synthesizer for Romantic Ambient Chords & Melody

class RomanticAudioSynthesizer {
  private ctx: AudioContext | null = null
  private isPlaying: boolean = false
  private timer: number | null = null

  private notes = [
    261.63, // C4
    329.63, // E4
    392.0,  // G4
    493.88, // B4
    523.25, // C5
    659.25, // E5
    783.99, // G5
  ]

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop()
      return false
    } else {
      this.start()
      return true
    }
  }

  public start() {
    if (this.isPlaying) return
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      this.ctx = new AudioCtx()
      this.isPlaying = true
      this.playLoop()
    } catch {
      console.warn('AudioContext not supported')
    }
  }

  public stop() {
    this.isPlaying = false
    if (this.timer) clearInterval(this.timer)
    if (this.ctx) {
      this.ctx.close()
      this.ctx = null
    }
  }

  private playTone(freq: number, duration: number, delay: number = 0) {
    if (!this.ctx || !this.isPlaying) return

    setTimeout(() => {
      if (!this.ctx || !this.isPlaying) return
      try {
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime)

        // Soft romantic attack and decay
        gain.gain.setValueAtTime(0, this.ctx.currentTime)
        gain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 0.3)
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration)

        osc.connect(gain)
        gain.connect(this.ctx.destination)

        osc.start()
        osc.stop(this.ctx.currentTime + duration)
      } catch {
        // audio context closed
      }
    }, delay * 1000)
  }

  private playLoop() {
    let index = 0
    const sequence = [0, 2, 4, 3, 1, 4, 5, 2, 6, 4, 2, 1]

    const step = () => {
      if (!this.isPlaying) return
      const noteIdx = sequence[index % sequence.length]
      const freq = this.notes[noteIdx]
      this.playTone(freq, 2.5, 0)
      this.playTone(freq * 0.5, 3.5, 0.2) // Soft bass note

      index++
    }

    step()
    this.timer = window.setInterval(step, 1800)
  }
}

export const romanticAudio = new RomanticAudioSynthesizer()
