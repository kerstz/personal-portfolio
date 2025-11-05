"use client"

import { useEffect, useState } from 'react'

export default function AdminSitePage() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>({ alias: 'Portfolio', contact: { email: '' }, theme: { default: 'neon', crtEnabled: false } })
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/site').then(r=>r.json()).then(setData).catch(()=>{}).finally(()=>setLoading(false))
  }, [])

  async function save() {
    setError(null)
    const res = await fetch('/api/admin/site', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    if (!res.ok) setError('Erreur sauvegarde')
  }

  if (loading) return <p>Chargement…</p>

  return (
    <div>
      <h1 className="text-2xl font-mono mb-4">Site</h1>
      <div className="grid gap-4 max-w-xl">
        <label className="grid gap-2">
          <span>Alias</span>
          <input value={data.alias||''} onChange={e=>setData({...data, alias:e.target.value})} className="px-3 py-2 bg-zinc-900 border border-zinc-700 rounded" />
        </label>
        <label className="grid gap-2">
          <span>Email</span>
          <input value={data.contact?.email||''} onChange={e=>setData({...data, contact:{...data.contact, email:e.target.value}})} className="px-3 py-2 bg-zinc-900 border border-zinc-700 rounded" />
        </label>
        <label className="grid gap-2">
          <span>CRT activé</span>
          <input type="checkbox" checked={data.theme?.crtEnabled||false} onChange={e=>setData({...data, theme:{...data.theme, crtEnabled:e.target.checked}})} />
        </label>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button onClick={save} className="px-3 py-2 bg-fuchsia-600 rounded">Sauvegarder</button>
      </div>
    </div>
  )
}
