"use client"

import { useEffect, useState } from 'react'

function getUrlLocale(): 'fr' | 'en' {
  if (typeof window === 'undefined') return 'fr'
  const path = window.location.pathname || '/'
  if (path === '/en' || path.startsWith('/en/')) return 'en'
  if (path === '/fr' || path.startsWith('/fr/')) return 'fr'
  return 'fr'
}

export default function LanguageSwitcher() {
  const [locale, setLocale] = useState<'fr'|'en'>(getUrlLocale())

  useEffect(() => {
    setLocale(getUrlLocale())
  }, [])

  function setLang(next: 'fr'|'en') {
    const path = typeof window !== 'undefined' ? window.location.pathname : '/'
    const newPath = path.replace(/^\/(fr|en)(\/|$)?/, `/${next}$2`)
    const target = newPath.startsWith(`/${next}`) ? newPath : `/${next}`
    window.location.assign(target)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-black/60 border border-zinc-700 rounded px-2 py-1 text-sm">
      <button
        aria-label="Français"
        onClick={() => setLang('fr')}
        className={`px-2 py-1 rounded ${locale === 'fr' ? 'bg-zinc-800 text-white' : 'text-zinc-300 hover:text-white'}`}
      >FR</button>
      <span className="text-zinc-600">|</span>
      <button
        aria-label="English"
        onClick={() => setLang('en')}
        className={`px-2 py-1 rounded ${locale === 'en' ? 'bg-zinc-800 text-white' : 'text-zinc-300 hover:text-white'}`}
      >EN</button>
    </div>
  )
}


