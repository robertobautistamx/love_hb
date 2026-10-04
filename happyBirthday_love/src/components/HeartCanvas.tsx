import React, { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
  rotation: number
  rotationSpeed: number
  type: 'heart' | 'sparkle' | 'petal'
}

export const HeartCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const particles: Particle[] = []
    const particleCount = 45

    const colors = [
      '#ff4d6d',
      '#ff758f',
      '#ff8fa3',
      '#ffb3c1',
      '#c9184a',
      '#ffd700',
    ]

    const drawHeart = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      opacity: number,
      rotation: number
    ) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate((rotation * Math.PI) / 180)
      ctx.globalAlpha = opacity
      ctx.fillStyle = color
      ctx.shadowColor = color
      ctx.shadowBlur = size * 0.8

      ctx.beginPath()
      const d = size
      ctx.moveTo(0, 0)
      ctx.bezierCurveTo(-d / 2, -d / 2, -d, d / 3, 0, d)
      ctx.bezierCurveTo(d, d / 3, d / 2, -d / 2, 0, 0)
      ctx.fill()
      ctx.restore()
    }

    const drawSparkle = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      opacity: number
    ) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.globalAlpha = opacity
      ctx.fillStyle = '#ffd700'
      ctx.shadowColor = '#ffd700'
      ctx.shadowBlur = 10

      ctx.beginPath()
      ctx.arc(0, 0, size / 2, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    const createParticle = (type?: 'heart' | 'sparkle' | 'petal'): Particle => {
      const pType = type || (Math.random() > 0.3 ? 'heart' : 'sparkle')
      return {
        x: Math.random() * width,
        y: height + Math.random() * 50,
        size: pType === 'heart' ? Math.random() * 14 + 10 : Math.random() * 4 + 2,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: -(Math.random() * 1.5 + 0.6),
        opacity: Math.random() * 0.7 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.5,
        type: pType,
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      const p = createParticle()
      p.y = Math.random() * height
      particles.push(p)
    }

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    const handleClick = (e: MouseEvent) => {
      for (let i = 0; i < 8; i++) {
        const p = createParticle('heart')
        p.x = e.clientX + (Math.random() - 0.5) * 40
        p.y = e.clientY + (Math.random() - 0.5) * 40
        p.speedY = -(Math.random() * 3 + 1)
        p.speedX = (Math.random() - 0.5) * 3
        particles.push(p)
      }
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('click', handleClick)

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.speedX
        p.y += p.speedY
        p.rotation += p.rotationSpeed

        if (p.type === 'heart') {
          drawHeart(ctx, p.x, p.y, p.size, p.color, p.opacity, p.rotation)
        } else {
          drawSparkle(ctx, p.x, p.y, p.size, p.opacity)
        }

        // Reset if off top screen
        if (p.y < -20 || p.x < -20 || p.x > width + 20) {
          particles[i] = createParticle()
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('click', handleClick)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="heart-canvas" />
}
