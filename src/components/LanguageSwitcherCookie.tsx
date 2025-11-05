"use client"

import { useEffect, useState } from 'react'

function getCookieLocale(): 'fr' | 'en' {
  if (typeof document === 'undefined') return 'fr'
  const match = document.cookie.match(/tlc_locale=(fr|en)/)
  return match ? (match[1] as 'fr' | 'en') : 'fr'
}

export default function LanguageSwitcherCookie() {
  const [locale, setLocale] = useState<'fr' | 'en'>('fr')

  useEffect(() => {
    setLocale(getCookieLocale())
  }, [])

  function setLang(next: 'fr' | 'en') {
    // Sauvegarder dans le cookie
    document.cookie = `tlc_locale=${next}; path=/; max-age=${60 * 60 * 24 * 365}`
    setLocale(next)
    // Recharger la page pour appliquer la nouvelle langue
    window.location.reload()
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-black/60 backdrop-blur-sm border border-slate-700 rounded-lg px-3 py-2 text-sm shadow-lg">
      <button
        aria-label="Français"
        onClick={() => setLang('fr')}
        className={`px-3 py-1 rounded transition-all ${
          locale === 'fr' 
            ? 'bg-cyan-600 text-white shadow-sm shadow-cyan-500/50' 
            : 'text-slate-300 hover:text-white hover:bg-slate-800'
        }`}
      >
        FR
      </button>
      <span className="text-slate-600">|</span>
      <button
        aria-label="English"
        onClick={() => setLang('en')}
        className={`px-3 py-1 rounded transition-all ${
          locale === 'en' 
            ? 'bg-cyan-600 text-white shadow-sm shadow-cyan-500/50' 
            : 'text-slate-300 hover:text-white hover:bg-slate-800'
        }`}
      >
        EN
      </button>
    </div>
  )
}

