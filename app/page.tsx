'use client'

import { useEffect, useState, useCallback } from 'react'

function FourLeafClover({ size = 120, color = 'gold', showStem = true }: { size?: number; color?: 'gold' | 'green'; showStem?: boolean }) {
  const colors = color === 'gold'
    ? { main: '#FFD700', dark: '#B8860B', light: '#FFE55C' }
    : { main: '#228B22', dark: '#006400', light: '#32CD32' }

  const gradientId = `cloverGradient-${color}-${Math.random().toString(36).substr(2, 9)}`

  return (
    <svg
      width={size}
      height={showStem ? size : size * 0.9}
      viewBox={showStem ? "0 0 100 110" : "10 10 80 80"}
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
      {/* Top leaf - heart shape */}
      <path
        d="M50 42 C50 42, 50 30, 38 20 C30 14, 20 18, 20 28 C20 38, 30 46, 50 50 C70 46, 80 38, 80 28 C80 18, 70 14, 62 20 C50 30, 50 42, 50 42 Z"
        fill={`url(#${gradientId})`}
        stroke={colors.dark}
        strokeWidth="1"
      />
      {/* Left leaf - heart shape rotated */}
      <path
        d="M42 50 C42 50, 30 50, 20 38 C14 30, 18 20, 28 20 C38 20, 46 30, 50 50 C46 70, 38 80, 28 80 C18 80, 14 70, 20 62 C30 50, 42 50, 42 50 Z"
        fill={`url(#${gradientId})`}
        stroke={colors.dark}
        strokeWidth="1"
      />
      {/* Right leaf - heart shape rotated */}
      <path
        d="M58 50 C58 50, 70 50, 80 38 C86 30, 82 20, 72 20 C62 20, 54 30, 50 50 C54 70, 62 80, 72 80 C82 80, 86 70, 80 62 C70 50, 58 50, 58 50 Z"
        fill={`url(#${gradientId})`}
        stroke={colors.dark}
        strokeWidth="1"
      />
      {/* Bottom leaf - heart shape */}
      <path
        d="M50 58 C50 58, 50 70, 38 80 C30 86, 20 82, 20 72 C20 62, 30 54, 50 50 C70 54, 80 62, 80 72 C80 82, 70 86, 62 80 C50 70, 50 58, 50 58 Z"
        fill={`url(#${gradientId})`}
        stroke={colors.dark}
        strokeWidth="1"
      />
      {/* Stem */}
      {showStem && (
        <path
          d="M50 75 Q55 90, 50 105"
          stroke={colors.dark}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      )}
    </svg>
  )
}

function GoldCoin({ size = 180 }: { size?: number }) {
  return (
    <img
      src="/coin.png"
      alt="Gold coin with four leaf clover"
      width={size}
      height={size}
      style={{ objectFit: 'contain' }}
    />
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

function AnimatedNumber({ value, isInitial }: { value: number; isInitial: boolean }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const start = isInitial ? 0 : displayValue
    const end = value
    const duration = isInitial ? 3000 : 1000
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
  }, [value, isInitial])

  return <span>{displayValue.toLocaleString()}</span>
}

export default function DisplayPage() {
  const [gold, setGold] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

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
    fetchGold().then(() => {
      setTimeout(() => setIsInitialLoad(false), 3500)
    })
    const interval = setInterval(fetchGold, 2000)
    return () => clearInterval(interval)
  }, [fetchGold])

  return (
    <>
      <FallingClovers />
      <main className="main-container">
        <img
          src="/leprechaun.webp"
          alt="Leprechaun"
          className="leprechaun"
        />
        <h1 className="title">The Traitors</h1>

        <div className="gold-display">
          <div className="coin-pile">
            <GoldCoin size={180} />
          </div>

          {gold === null ? (
            <div className="loading">Loading...</div>
          ) : error ? (
            <div className="status-message error">{error}</div>
          ) : (
            <>
              <div className="gold-amount">
                <AnimatedNumber value={gold} isInitial={isInitialLoad} />
              </div>
              <div className="gold-label">Gold</div>
            </>
          )}
        </div>
      </main>
    </>
  )
}
