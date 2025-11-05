"use client"

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function LoginForm() {
  const router = useRouter()
  const params = useSearchParams()
  const next = params.get('next') || '/admin'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Login failed')
      }
      router.push(next)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-sm p-6 border border-fuchsia-500/40 rounded">
      <h1 className="text-2xl font-mono mb-4">Admin Login</h1>
      <label className="block text-sm mb-2">Identifiant</label>
      <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" className="w-full mb-4 px-3 py-2 bg-zinc-900 border border-zinc-700 rounded outline-none"/>
      <label className="block text-sm mb-2">Mot de passe</label>
      <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="w-full mb-4 px-3 py-2 bg-zinc-900 border border-zinc-700 rounded outline-none"/>
      {error && <p className="text-sm text-red-400 mb-3">{error}</p>}
      <button disabled={loading} className="w-full py-2 bg-fuchsia-600 hover:bg-fuchsia-700 rounded">
        {loading ? 'Connexion…' : 'Se connecter'}
      </button>
    </form>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen grid place-items-center bg-black text-white">
      <Suspense fallback={
        <div className="w-full max-w-sm p-6 border border-fuchsia-500/40 rounded">
          <h1 className="text-2xl font-mono mb-4">Chargement...</h1>
        </div>
      }>
        <LoginForm />
      </Suspense>
    </div>
  )
}
