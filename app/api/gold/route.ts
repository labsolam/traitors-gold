import { Redis } from '@upstash/redis'
import { NextResponse } from 'next/server'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

const GOLD_KEY = 'traitors:gold'

export async function GET() {
  try {
    const gold = await redis.get<number>(GOLD_KEY)
    return NextResponse.json({ gold: gold ?? 0 })
  } catch (error) {
    console.error('Error fetching gold:', error)
    return NextResponse.json({ error: 'Failed to fetch gold' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const gold = Number(body.gold)

    if (isNaN(gold) || gold < 0) {
      return NextResponse.json({ error: 'Invalid gold value' }, { status: 400 })
    }

    await redis.set(GOLD_KEY, gold)
    return NextResponse.json({ gold })
  } catch (error) {
    console.error('Error setting gold:', error)
    return NextResponse.json({ error: 'Failed to set gold' }, { status: 500 })
  }
}
