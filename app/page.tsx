'use client'

import { useEffect, useState, useCallback } from 'react'

function TraitorsShield({ size = 120 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size * 1.15}
      viewBox="0 0 100 115"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shield shape */}
      <path
        d="M50 2 L95 15 L95 50 C95 80 75 100 50 113 C25 100 5 80 5 50 L5 15 Z"
        fill="url(#shieldGradient)"
        stroke="#B8860B"
        strokeWidth="3"
      />
      {/* Inner border */}
      <path
        d="M50 10 L88 21 L88 50 C88 75 70 92 50 103 C30 92 12 75 12 50 L12 21 Z"
        fill="none"
        stroke="#FFD700"
        strokeWidth="1.5"
        opacity="0.6"
      />
      {/* Decorative cross/dagger */}
      <path
        d="M50 25 L50 85 M35 45 L65 45"
        stroke="#FFD700"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Dagger point */}
      <path
        d="M50 85 L45 75 L50 90 L55 75 Z"
        fill="#FFD700"
      />
      {/* Top ornament */}
      <circle cx="50" cy="25" r="5" fill="#FFD700" />
      <defs>
        <linearGradient id="shieldGradient" x1="50" y1="0" x2="50" y2="115" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3D2B46" />
          <stop offset="50%" stopColor="#2D1B36" />
          <stop offset="100%" stopColor="#1a0f20" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function FallingShields() {
  const [shields, setShields] = useState<Array<{ id: number; left: number; delay: number; duration: number }>>([])

  useEffect(() => {
    const newShields = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 4,
    }))
    setShields(newShields)
  }, [])

  return (
    <div className="coins-container">
      {shields.map((shield) => (
        <span
          key={shield.id}
          className="falling-coin"
          style={{
            left: `${shield.left}%`,
            animationDelay: `${shield.delay}s`,
            animationDuration: `${shield.duration}s`,
          }}
        >
          <TraitorsShield size={30} />
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
  }, [fetchGold])

  return (
    <>
      <FallingShields />
      <main className="main-container">
        <h1 className="title">The Traitors</h1>

        <div className="gold-display">
          <div className="coin-pile">
            <TraitorsShield size={180} />
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

        <div className="hint">Refresh to update</div>
      </main>
    </>
  )
}
