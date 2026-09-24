'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/content', label: 'Contenu', icon: '📝' },
  { href: '/admin/projects', label: 'Projets', icon: '🚀' },
  { href: '/admin/testimonials', label: 'Témoignages', icon: '💬' },
  { href: '/admin/pgp', label: 'Clé PGP', icon: '🔐' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Admin Header */}
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-slate-100">TLC Admin Panel</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">Connecté en tant qu&apos;admin</span>
            <button
              onClick={logout}
              className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition-colors"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-800 min-h-[calc(100vh-73px)] p-4">
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-slate-900 text-slate-100 overflow-auto max-h-[calc(100vh-73px)]">
          {children}
        </main>
      </div>
    </div>
  )
}


