"use client"

import fr from '@/i18n/messages/fr.json'
import en from '@/i18n/messages/en.json'

export type Locale = 'fr' | 'en'

export function getUrlLocale(): Locale {
  if (typeof window === 'undefined') return 'fr'
  const path = window.location.pathname || '/'
  if (path === '/en' || path.startsWith('/en/')) return 'en'
  if (path === '/fr' || path.startsWith('/fr/')) return 'fr'
  return 'fr'
}

export function useLocale(): Locale {
  // Lit la langue depuis l'URL (ex: /en, /fr)
  return getUrlLocale()
}

export function getMessages(locale: Locale) {
  return locale === 'en' ? en : fr
}


