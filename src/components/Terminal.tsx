"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

type Line = { text: string; isPrompt?: boolean }

const HOST = 'tlc'
const USER = 'guest'
const CWD = '~'

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([{
    text: `Bienvenue. Tapez 'help' pour la liste des commandes.`
  }])
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [lines])

  const prompt = useMemo(() => (
    <span>
      <span className="text-green-400">{USER}</span>
      <span className="text-zinc-500">@</span>
      <span className="text-fuchsia-400">{HOST}</span>
      <span className="text-zinc-500">:</span>
      <span className="text-cyan-400">{CWD}</span>
      <span className="text-zinc-500">$</span>
    </span>
  ), [])

  const append = useCallback((text: string | string[]) => {
    setLines(prev => [...prev, ...(Array.isArray(text) ? text : [text]).map(t => ({ text: t }))])
  }, [])

  const setCrt = (on: boolean) => {
    document.documentElement.classList.toggle('crt', on)
    append(on ? 'CRT: ON' : 'CRT: OFF')
  }

  async function catFile(name: string) {
    if (name === 'about.md') {
      const site = await fetch('/api/site').then(r=>r.json()).catch(()=>null)
      const txt = site?.about?.fr || site?.about?.en || 'À propos non défini.'
      append(txt)
      return
    }
    if (name === 'manifesto.md') {
      const site = await fetch('/api/site').then(r=>r.json()).catch(()=>null)
      const txt = site?.manifesto?.fr || site?.manifesto?.en || 'Manifeste non défini.'
      append(txt)
      return
    }
    if (name === 'pgp.asc') {
      const pgp = await fetch('/api/pgp').then(r=>r.json()).catch(()=>null)
      const key = pgp?.publicKey || 'Clé PGP non définie.'
      append(key)
      return
    }
    append(`cat: ${name}: No such file`)
  }

  const run = useCallback(async (raw: string) => {
    const cmd = raw.trim()
    if (!cmd) return
    setLines(prev => [...prev, { text: `${USER}@${HOST}:${CWD}$ ${cmd}`, isPrompt: true }])

    const [name, ...args] = cmd.split(/\s+/)

    switch (name) {
      case 'help':
        append([
          'Commandes:',
          '  help                 Affiche cette aide',
          '  ls                   Liste les sections',
          '  projects             Liste les projets',
          '  about                Affiche un résumé À propos',
          '  manifesto            Affiche un extrait du manifeste',
          '  pgp                  Affiche l’état de la clé PGP',
          '  contact              Affiche l’email de contact',
          '  theme crt on|off     Active/désactive l’effet CRT',
          '  cat <fichier>        Affiche le contenu (about.md, manifesto.md, pgp.asc)',
          '  clear                Nettoie le terminal',
          "  admin login          Ouvre la page d’authentification",
          '  admin whoami         Vérifie si connecté',
          '  admin logout         Déconnexion'
        ])
        break
      case 'clear':
        setLines([])
        break
      case 'ls':
        append('apropos  manifeste  projets  avis  contact  pgp  terminal  about.md  manifesto.md  pgp.asc')
        break
      case 'projects': {
        try {
          const res = await fetch('/api/projects')
          if (!res.ok) throw new Error('http')
          const data = await res.json()
          if (!Array.isArray(data) || data.length === 0) {
            append('Aucun projet pour le moment.')
          } else {
            data.slice(0, 10).forEach((p: any, idx: number) => {
              const title = p?.title?.fr || p?.title?.en || p?.slug || 'Sans titre'
              append(`${idx + 1}. ${title}`)
            })
          }
        } catch {
          append('Erreur: impossible de récupérer les projets.')
        }
        break
      }
      case 'about': {
        append('Portfolio immersif. Contenu À propos à venir…')
        break
      }
      case 'manifesto': {
        append('Cypherpunk: liberté, confidentialité, sécurité par le design…')
        break
      }
      case 'pgp': {
        try {
          const res = await fetch('/api/pgp')
          const data = await res.json()
          const fingerprint = data?.fingerprint || '(non configuré)'
          append(`Fingerprint: ${fingerprint}`)
        } catch {
          append('PGP non disponible.')
        }
        break
      }
      case 'contact': {
        try {
          const res = await fetch('/api/site')
          const site = await res.json()
          append(`Email: ${site?.contact?.email || '(non défini)'}`)
        } catch {
          append('Contact non disponible.')
        }
        break
      }
      case 'theme': {
        if (args[0] === 'crt' && (args[1] === 'on' || args[1] === 'off')) {
          setCrt(args[1] === 'on')
        } else {
          append("Utilisation: theme crt on|off")
        }
        break
      }
      case 'cat': {
        if (!args[0]) {
          append('Utilisation: cat <about.md|manifesto.md|pgp.asc>')
        } else {
          await catFile(args[0])
        }
        break
      }
      case 'admin': {
        const sub = args[0]
        if (sub === 'login') {
          append('Ouverture de /login …')
          window.location.href = '/login'
        } else if (sub === 'whoami') {
          try {
            const me = await fetch('/api/admin/me').then(r=>r.json())
            append(me.authenticated ? `admin: ${me.admin?.email}` : 'non authentifié')
          } catch {
            append('Erreur whoami')
          }
        } else if (sub === 'logout') {
          await fetch('/api/admin/logout', { method: 'POST' })
          append('Déconnecté.')
        } else {
          append("Utilisation: admin login|whoami|logout")
        }
        break
      }
      default:
        append(`Commande inconnue: ${name}. Tapez 'help'.`)
    }
  }, [append])

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const value = input
    setInput('')
    run(value)
  }

  return (
    <div className="border border-zinc-700 rounded bg-black/70">
      <div className="px-3 py-2 text-xs text-zinc-400 border-b border-zinc-800">
        oh-my-zsh — {USER}@{HOST}: {CWD}
      </div>
      <div ref={scrollRef} className="h-64 overflow-auto p-3 font-mono text-sm space-y-1">
        {lines.map((l, i) => (
          <div key={i} className="whitespace-pre-wrap">
            {!l.isPrompt ? (
              <span>{l.text}</span>
            ) : (
              <>
                {prompt} <span>{l.text.split('$ ').slice(1).join('$ ')}</span>
              </>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={onSubmit} className="flex items-center gap-2 p-3 font-mono text-sm">
        <span className="shrink-0">{prompt}&nbsp;</span>
        <input
          autoFocus
          value={input}
          onChange={(e)=>setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none text-zinc-100 placeholder:text-zinc-600"
          placeholder="help"
        />
      </form>
    </div>
  )
}


