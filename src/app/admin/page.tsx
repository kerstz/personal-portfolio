"use client"

import { useRouter } from 'next/navigation'

export default function AdminHome() {
  const router = useRouter()
  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/login')
  }
  return (
    <div className="min-h-screen p-6 text-white bg-black">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-mono">Admin Panel</h1>
        <button onClick={logout} className="px-3 py-1 bg-fuchsia-600 rounded">Déconnexion</button>
      </div>
      <p className="mt-6 text-zinc-300">Bientôt: CRUD contenus (À propos, Manifeste, Projets, Avis, Certifs, PGP).</p>
    </div>
  )
}
