import type { SessionOptions } from 'iron-session'

const isProd = process.env.NODE_ENV === 'production'

// Le préfixe __Host- impose Secure + Path=/ + pas de Domain (non utilisable en HTTP local)
export const sessionCookieName = isProd ? '__Host-tlc_session' : 'tlc_session'

// Durée de vie de la session admin : 8 heures
export const SESSION_TTL_SECONDS = 60 * 60 * 8

export type AdminSession = {
  admin?: { id: string; email: string }
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_PASSWORD || '',
  cookieName: sessionCookieName,
  ttl: SESSION_TTL_SECONDS,
  cookieOptions: {
    secure: isProd,
    sameSite: 'strict',
    httpOnly: true,
    path: '/',
  },
}

export function assertSessionSecret() {
  if (!sessionOptions.password || typeof sessionOptions.password !== 'string' || sessionOptions.password.length < 32) {
    throw new Error(
      'SESSION_PASSWORD manquant ou trop court. Définissez une valeur robuste (>= 32 chars) dans votre environnement.'
    )
  }
}
