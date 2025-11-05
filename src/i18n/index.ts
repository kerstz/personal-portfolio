export const locales = ['fr', 'en'] as const
export type Locale = typeof locales[number]

export function getRequestLocale(headersList: Headers): Locale {
  const cookie = headersList.get('cookie') || ''
  const match = cookie.match(/tlc_locale=(fr|en)/)
  if (match) return match[1] as Locale
  return 'fr'
}

export async function loadMessages(locale: Locale) {
  switch (locale) {
    case 'en':
      return (await import('./messages/en.json')).default
    case 'fr':
    default:
      return (await import('./messages/fr.json')).default
  }
}
