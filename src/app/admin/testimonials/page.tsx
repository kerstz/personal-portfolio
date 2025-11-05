"use client"

import { useEffect, useState } from 'react'

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<any[]>([])
  const [author, setAuthor] = useState('')
  const [role, setRole] = useState('')
  const [company, setCompany] = useState('')
  const [quoteFr, setQuoteFr] = useState('')
  const [quoteEn, setQuoteEn] = useState('')

  async function load() {
    const r = await fetch('/api/admin/testimonials')
    setItems(await r.json())
  }

  useEffect(() => { load() }, [])

  async function create() {
    const payload = {
      author,
      role: role || null,
      company: company || null,
      quote: { fr: quoteFr, en: quoteEn },
      links: {}
    }
    await fetch('/api/admin/testimonials', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    setAuthor('')
    setRole('')
    setCompany('')
    setQuoteFr('')
    setQuoteEn('')
    load()
  }

  return (
    <div>
      <h1 className="text-2xl font-mono mb-4">Avis / Témoignages</h1>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <input value={author} onChange={e=>setAuthor(e.target.value)} placeholder="Auteur" className="px-3 py-2 bg-zinc-900 border border-zinc-700 rounded" />
        <input value={role} onChange={e=>setRole(e.target.value)} placeholder="Rôle" className="px-3 py-2 bg-zinc-900 border border-zinc-700 rounded" />
        <input value={company} onChange={e=>setCompany(e.target.value)} placeholder="Entreprise" className="px-3 py-2 bg-zinc-900 border border-zinc-700 rounded" />
        <div></div>
        <textarea value={quoteFr} onChange={e=>setQuoteFr(e.target.value)} placeholder="Citation FR" rows={3} className="px-3 py-2 bg-zinc-900 border border-zinc-700 rounded" />
        <textarea value={quoteEn} onChange={e=>setQuoteEn(e.target.value)} placeholder="Quote EN" rows={3} className="px-3 py-2 bg-zinc-900 border border-zinc-700 rounded" />
      </div>
      <button onClick={create} className="px-3 py-2 bg-fuchsia-600 rounded mb-6">Créer</button>
      
      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="p-4 border border-fuchsia-500/30 rounded">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="font-semibold">{item.author}</div>
                {item.role && <div className="text-sm text-zinc-400">{item.role}{item.company ? ` @ ${item.company}` : ''}</div>}
                <div className="mt-2 text-sm italic">"{item.quote?.fr || item.quote?.en || ''}"</div>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={async () => {
                    if (confirm('Supprimer ce témoignage ?')) {
                      await fetch(`/api/admin/testimonials/${item.id}`, { method: 'DELETE' })
                      load()
                    }
                  }}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
