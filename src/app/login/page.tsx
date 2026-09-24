"use client"

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

const ERROR_MESSAGES: Record<number, string> = {
  401: 'Identifiants incorrects.',
  403: 'Requête refusée. Rechargez la page et réessayez.',
  429: 'Trop de tentatives. Réessayez dans quelques minutes.',
}

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2.5" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

function EyeIcon({ open }: { open: boolean }) {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
      {!open && <path d="M3 3l18 18" />}
    </svg>
  )
}

const inputClass =
  'block w-full rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-2.5 text-sm text-zinc-100 ' +
  'placeholder:text-zinc-600 transition-colors ' +
  'focus:border-zinc-600 focus:outline-none focus:ring-4 focus:ring-zinc-500/10 ' +
  'disabled:opacity-60'

function LoginForm() {
  const router = useRouter()
  const params = useSearchParams()
  // Redirection interne uniquement (empêche l'open redirect via ?next=//evil.com)
  const rawNext = params.get('next') || ''
  const next = /^\/(?![\/\\])/.test(rawNext) ? rawNext : '/admin'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
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
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) {
        throw new Error(ERROR_MESSAGES[res.status] ?? 'Connexion impossible. Réessayez plus tard.')
      }
      router.push(next)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Connexion impossible. Réessayez plus tard.')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="space-y-1.5">
        <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
          Identifiant
        </label>
        <input
          id="email"
          name="email"
          type="text"
          inputMode="email"
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          autoFocus
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          className={inputClass}
          placeholder="admin@exemple.com"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="password" className="block text-sm font-medium text-zinc-300">
          Mot de passe
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            className={`${inputClass} pr-10`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute inset-y-0 right-0 flex w-10 items-center justify-center rounded-r-lg text-zinc-500 transition-colors hover:text-zinc-300 focus-visible:text-zinc-200 focus-visible:outline-none"
            aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
            aria-pressed={showPassword}
          >
            <EyeIcon open={!showPassword} />
          </button>
        </div>
      </div>

      <div aria-live="polite" className="min-h-0">
        {error && (
          <p role="alert" className="rounded-lg border border-red-900/60 bg-red-950/40 px-3 py-2 text-sm text-red-300">
            {error}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading || !email || !password}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-100 px-4 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-zinc-400/30 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading && <Spinner />}
        {loading ? 'Connexion…' : 'Se connecter'}
      </button>
    </form>
  )
}

export default function LoginPage() {
  return (
    <div className="relative z-20 flex min-h-screen flex-col bg-zinc-950 font-[family-name:var(--font-geist-sans)] text-zinc-100">
      <header className="px-6 py-5 sm:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-200"
        >
          <span aria-hidden="true">←</span> Retour au site
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 pb-24">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900">
              <svg className="h-5 w-5 text-zinc-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="4" y="10" width="16" height="11" rx="2" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
              </svg>
            </div>
            <h1 className="text-xl font-semibold tracking-tight text-zinc-50">Administration</h1>
            <p className="mt-1.5 text-sm text-zinc-500">Connectez-vous pour gérer le contenu du site.</p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-6 shadow-sm">
            <Suspense fallback={<div className="h-64" />}>
              <LoginForm />
            </Suspense>
          </div>

          <p className="mt-6 text-center text-xs text-zinc-600">
            Accès réservé. Les tentatives de connexion sont limitées.
          </p>
        </div>
      </main>
    </div>
  )
}
