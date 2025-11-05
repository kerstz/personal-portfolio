"use client"

import { useEffect, useState } from 'react'

export default function BootOverlay() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const done = sessionStorage.getItem('boot_done')
    if (done) setVisible(false)
  }, [])

  function setLocale(locale: 'fr'|'en') {
    document.cookie = `tlc_locale=${locale}; path=/; max-age=${60*60*24*365}`
    sessionStorage.setItem('boot_done', '1')
    setVisible(false)
    // Recharger pour appliquer la langue partout (app dir / messages)
    if (typeof window !== 'undefined') {
      window.location.reload()
    }
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 bg-black text-green-400 font-mono">
      <div className="absolute inset-0 pointer-events-none" style={{backgroundImage:'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize:'100% 3px', mixBlendMode:'overlay'}} />
      <div className="h-full w-full flex items-center justify-center">
        <div className="p-6 border border-green-500/40 rounded bg-black/60">
          <p className="mb-4">[BOOT] Initialisation… Sélectionner la langue</p>
          <div className="flex gap-3">
            <button onClick={()=>setLocale('fr')} className="px-3 py-1 border border-green-500/50 hover:bg-green-500/10">Français</button>
            <button onClick={()=>setLocale('en')} className="px-3 py-1 border border-green-500/50 hover:bg-green-500/10">English</button>
            <button onClick={()=>{sessionStorage.setItem('boot_done','1'); setVisible(false)}} className="px-3 py-1 border border-green-500/50 hover:bg-green-500/10">Skip</button>
          </div>
        </div>
      </div>
    </div>
  )
}
