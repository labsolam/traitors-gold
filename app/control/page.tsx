'use client'

import { useState, useEffect } from 'react'

export default function ControlPage() {
  const [inputValue, setInputValue] = useState('')
  const [currentGold, setCurrentGold] = useState<number | null>(null)
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchCurrentGold()
  }, [])

  const fetchCurrentGold = async () => {
    try {
      const response = await fetch('/api/gold')
      if (response.ok) {
        const data = await response.json()
        setCurrentGold(data.gold)
      }
    } catch {
      // Silently fail on initial load
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const gold = Number(inputValue)
    if (isNaN(gold) || gold < 0) {
      setStatus({ type: 'error', message: 'Please enter a valid positive number' })
      return
    }

    setLoading(true)
    setStatus(null)

    try {
      const response = await fetch('/api/gold', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gold }),
      })

      if (!response.ok) throw new Error('Failed to update')

      const data = await response.json()
      setCurrentGold(data.gold)
      setStatus({ type: 'success', message: `Gold set to ${data.gold.toLocaleString()}` })
      setInputValue('')
    } catch {
      setStatus({ type: 'error', message: 'Failed to update gold' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="main-container">
      <h1 className="title">Gold Control</h1>

      <form className="control-container" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="gold-input" className="input-label">
            Set Gold Amount
          </label>
          <input
            id="gold-input"
            type="number"
            min="0"
            className="gold-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter amount..."
            disabled={loading}
          />
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Setting...' : 'Set Gold'}
        </button>

        {currentGold !== null && (
          <div className="current-value">
            Current: <span>{currentGold.toLocaleString()}</span> gold
          </div>
        )}

        {status && (
          <div className={`status-message ${status.type}`}>
            {status.message}
          </div>
        )}
      </form>
    </main>
  )
}
