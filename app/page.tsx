'use client'

import { useEffect, useState, useCallback } from 'react'

function FourLeafClover({ size = 120, color = 'gold' }: { size?: number; color?: 'gold' | 'green' }) {
  const colors = color === 'gold'
    ? { main: '#FFD700', dark: '#B8860B', light: '#FFE55C' }
    : { main: '#228B22', dark: '#006400', light: '#32CD32' }

  const gradientId = `cloverGradient-${color}-${Math.random().toString(36).substr(2, 9)}`

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.light} />
          <stop offset="50%" stopColor={colors.main} />
          <stop offset="100%" stopColor={colors.dark} />
        </linearGradient>
      </defs>
      {/* Top leaf */}
      <path
        d="M50 45 C40 45, 30 35, 30 25 C30 15, 40 8, 50 18 C60 8, 70 15, 70 25 C70 35, 60 45, 50 45"
        fill={`url(#${gradientId})`}
        stroke={colors.dark}
        strokeWidth="1.5"
      />
      {/* Bottom leaf */}
      <path
        d="M50 55 C40 55, 30 65, 30 75 C30 85, 40 92, 50 82 C60 92, 70 85, 70 75 C70 65, 60 55, 50 55"
        fill={`url(#${gradientId})`}
        stroke={colors.dark}
        strokeWidth="1.5"
      />
      {/* Left leaf */}
      <path
        d="M45 50 C45 40, 35 30, 25 30 C15 30, 8 40, 18 50 C8 60, 15 70, 25 70 C35 70, 45 60, 45 50"
        fill={`url(#${gradientId})`}
        stroke={colors.dark}
        strokeWidth="1.5"
      />
      {/* Right leaf */}
      <path
        d="M55 50 C55 40, 65 30, 75 30 C85 30, 92 40, 82 50 C92 60, 85 70, 75 70 C65 70, 55 60, 55 50"
        fill={`url(#${gradientId})`}
        stroke={colors.dark}
        strokeWidth="1.5"
      />
      {/* Center dot */}
      <circle cx="50" cy="50" r="4" fill={colors.dark} />
    </svg>
  )
}

function FallingClovers() {
  const [clovers, setClovers] = useState<Array<{ id: number; left: number; delay: number; duration: number; color: 'gold' | 'green' }>>([])

  useEffect(() => {
    const newClovers = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 4,
      color: (Math.random() > 0.5 ? 'gold' : 'green') as 'gold' | 'green',
    }))
    setClovers(newClovers)
  }, [])

  return (
    <div className="coins-container">
      {clovers.map((clover) => (
        <span
          key={clover.id}
          className="falling-coin"
          style={{
            left: `${clover.left}%`,
            animationDelay: `${clover.delay}s`,
            animationDuration: `${clover.duration}s`,
          }}
        >
          <FourLeafClover size={35} color={clover.color} />
        </span>
      ))}
    </div>
  )
}

function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(value)

  useEffect(() => {
    const start = displayValue
    const end = value
    const duration = 1000
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)

      const current = Math.round(start + (end - start) * easeOutQuart)
      setDisplayValue(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [value])

  return <span>{displayValue.toLocaleString()}</span>
}

export default function DisplayPage() {
  const [gold, setGold] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchGold = useCallback(async () => {
    try {
      const response = await fetch('/api/gold')
      if (!response.ok) throw new Error('Failed to fetch')
      const data = await response.json()
      setGold(data.gold)
      setError(null)
    } catch {
      setError('Failed to load gold amount')
    }
  }, [])

  useEffect(() => {
    fetchGold()
    const interval = setInterval(fetchGold, 2000)
    return () => clearInterval(interval)
  }, [fetchGold])

  return (
    <>
      <FallingClovers />
      <main className="main-container">
        <h1 className="title">The Traitors</h1>

        <div className="gold-display">
          <div className="coin-pile">
            <FourLeafClover size={180} color="gold" />
          </div>

          {gold === null ? (
            <div className="loading">Loading...</div>
          ) : error ? (
            <div className="status-message error">{error}</div>
          ) : (
            <>
              <div className="gold-amount">
                <AnimatedNumber value={gold} />
              </div>
              <div className="gold-label">Gold</div>
            </>
          )}
        </div>
      </main>
    </>
  )
}
