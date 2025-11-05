"use client"

import { useEffect, useState } from 'react'
import { useLocale } from '@/lib/locale'

type Testimonial = {
  id: string
  author: string
  role?: string
  company?: string
  quote: { fr?: string; en?: string }
  photoUrl?: string
  links?: { linkedin?: string; github?: string }
}

export default function TestimonialsCarousel() {
  const [items, setItems] = useState<Testimonial[]>([])
  const [current, setCurrent] = useState(0)
  const locale = useLocale()

  useEffect(() => {
    fetch('/api/testimonials').then(r=>r.json()).then(setItems).catch(()=>{})
  }, [])

  useEffect(() => {
    if (items.length <= 1) return
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % items.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [items.length])

  if (!items.length) return <p className="text-zinc-400">{locale === 'en' ? 'No testimonials yet.' : 'Aucun témoignage pour le moment.'}</p>

  const item = items[current]
  const quote = item.quote?.[locale] || item.quote?.fr || item.quote?.en || ''

  return (
    <div className="border border-fuchsia-500/30 rounded p-6">
      <div className="flex items-start gap-4">
        {item.photoUrl && (
          <img src={item.photoUrl} alt={item.author} className="w-12 h-12 rounded-full border border-zinc-600" />
        )}
        <div className="flex-1">
          <blockquote className="text-zinc-200 italic mb-3">"{quote}"</blockquote>
          <footer className="text-sm">
            <div className="font-semibold">{item.author}</div>
            {item.role && <div className="text-zinc-400">{item.role}{item.company ? ` @ ${item.company}` : ''}</div>}
            {item.links && (
              <div className="flex gap-2 mt-2">
                {item.links.linkedin && (
                  <a href={item.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">
                    LinkedIn
                  </a>
                )}
                {item.links.github && (
                  <a href={item.links.github} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300">
                    GitHub
                  </a>
                )}
              </div>
            )}
          </footer>
        </div>
      </div>
      {items.length > 1 && (

<div className="flex items-center justify-center gap-4 mt-4">
          <button
            onClick={() => setCurrent(current === 0 ? items.length - 1 : current - 1)}
            className="p-2 text-fuchsia-400 hover:text-fuchsia-300 transition-colors"
            aria-label="Previous testimonial"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="flex gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full ${i === current ? 'bg-fuchsia-400' : 'bg-zinc-600'}`}
              />
            ))}
          </div>
          
          <button
            onClick={() => setCurrent(current === items.length - 1 ? 0 : current + 1)}
            className="p-2 text-fuchsia-400 hover:text-fuchsia-300 transition-colors"
            aria-label="Next testimonial"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
