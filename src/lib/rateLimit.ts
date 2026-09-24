import type { NextRequest } from 'next/server'

type Bucket = { count: number; resetAt: number }

const buckets = new Map<string, Bucket>()

// Limiteur en mémoire (suffisant pour une instance unique). Retourne le nombre
// de secondes à attendre si la limite est atteinte, sinon 0.
export function rateLimit(key: string, limit: number, windowMs: number): number {
  const now = Date.now()
  if (buckets.size > 10_000) {
    for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k)
  }
  const bucket = buckets.get(key)
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return 0
  }
  bucket.count++
  if (bucket.count > limit) return Math.ceil((bucket.resetAt - now) / 1000)
  return 0
}

export function resetRateLimit(key: string) {
  buckets.delete(key)
}

// IP client : Cloudflare > reverse proxy > X-Forwarded-For
export function clientIp(req: NextRequest) {
  return (
    req.headers.get('cf-connecting-ip') ||
    req.headers.get('x-real-ip') ||
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  )
}
