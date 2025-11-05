import type { SessionOptions } from 'iron-session'

export const sessionCookieName = 'tlc_session'

export type AdminSession = {
  admin?: { id: string; email: string }
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_PASSWORD || '',
  cookieName: sessionCookieName,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    httpOnly: true,
  },
}

export function assertSessionSecret() {
  if (!sessionOptions.password || typeof sessionOptions.password !== 'string' || sessionOptions.password.length < 16) {
    throw new Error(
      'SESSION_PASSWORD manquant ou trop court. Définissez une valeur robuste (>= 32 chars) dans votre environnement.'
    )
  }
}

