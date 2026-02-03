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
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="coinGradient" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#FFF6A9" />
          <stop offset="25%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#FFC200" />
          <stop offset="75%" stopColor="#B8860B" />
          <stop offset="100%" stopColor="#8B6914" />
        </linearGradient>
        <linearGradient id="coinEdge" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DAA520" />
          <stop offset="50%" stopColor="#B8860B" />
          <stop offset="100%" stopColor="#6B4423" />
        </linearGradient>
        <linearGradient id="shamrockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#32CD32" />
          <stop offset="50%" stopColor="#228B22" />
          <stop offset="100%" stopColor="#006400" />
        </linearGradient>
        <filter id="coinShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="2" stdDeviation="2" floodOpacity="0.3"/>
        </filter>
      </defs>

      {/* Outer edge / rim */}
      <circle cx="50" cy="50" r="48" fill="url(#coinEdge)" filter="url(#coinShadow)" />

      {/* Main coin face */}
      <circle cx="50" cy="50" r="43" fill="url(#coinGradient)" />

      {/* Inner decorative ring */}
      <circle cx="50" cy="50" r="38" fill="none" stroke="#B8860B" strokeWidth="1.5" />

      {/* Shine highlight */}
      <ellipse cx="35" cy="32" rx="15" ry="10" fill="rgba(255,255,255,0.25)" />

      {/* Three-leaf Shamrock */}
      {/* Top leaf */}
      <path
        d="M50 38 C50 38, 44 30, 38 28 C32 26, 28 30, 30 36 C32 42, 42 46, 50 46 C58 46, 68 42, 70 36 C72 30, 68 26, 62 28 C56 30, 50 38, 50 38 Z"
        fill="url(#shamrockGradient)"
        stroke="#006400"
        strokeWidth="0.5"
      />
      {/* Bottom left leaf */}
      <path
        d="M46 50 C46 50, 36 52, 30 58 C24 64, 26 70, 32 70 C38 70, 44 62, 48 54 C48 54, 46 50, 46 50 Z"
        fill="url(#shamrockGradient)"
        stroke="#006400"
        strokeWidth="0.5"
      />
      {/* Bottom right leaf */}
      <path
        d="M54 50 C54 50, 64 52, 70 58 C76 64, 74 70, 68 70 C62 70, 56 62, 52 54 C52 54, 54 50, 54 50 Z"
        fill="url(#shamrockGradient)"
        stroke="#006400"
        strokeWidth="0.5"
      />
      {/* Stem */}
      <path
        d="M50 54 Q52 62, 50 72"
        stroke="#006400"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      {/* Decorative stars */}
      <polygon points="20,25 21,28 24,28 22,30 23,33 20,31 17,33 18,30 16,28 19,28" fill="#FFD700" />
      <polygon points="80,25 81,28 84,28 82,30 83,33 80,31 77,33 78,30 76,28 79,28" fill="#FFD700" />
      <polygon points="20,75 21,78 24,78 22,80 23,83 20,81 17,83 18,80 16,78 19,78" fill="#FFD700" />
      <polygon points="80,75 81,78 84,78 82,80 83,83 80,81 77,83 78,80 76,78 79,78" fill="#FFD700" />
      <polygon points="50,12 51,15 54,15 52,17 53,20 50,18 47,20 48,17 46,15 49,15" fill="#FFD700" />
      <polygon points="50,85 51,88 54,88 52,90 53,93 50,91 47,93 48,90 46,88 49,88" fill="#FFD700" />
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
