"use client"

import HeaderShader from '@/components/HeaderShader'
import { useLocale, getMessages } from '@/lib/locale'

export default function Hero() {
  const locale = useLocale()
  const t = getMessages(locale)
  return (
    <section id="hero" className="h-screen snap-start relative flex items-center justify-center">
      <div className="absolute inset-0 opacity-70">
        <HeaderShader />
      </div>
      <div className="relative z-10 text-center">
        <h1 className="text-6xl md:text-8xl font-mono font-bold text-fuchsia-400 mb-6">
          Your Name
        </h1>
        <p className="text-xl text-zinc-300">{t.site?.title || 'Portfolio'}</p>
      </div>
    </section>
  )
}


