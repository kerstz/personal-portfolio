"use client"

import { useEffect, useState } from 'react'

type PgpState = {
  fingerprint?: string
  keyId?: string
  algorithm?: string
  expiresAt?: string
  publicKey?: string
}

export default function PgpBlock() {
  const [open, setOpen] = useState(false)
  const [pgp, setPgp] = useState<PgpState>({})

  useEffect(() => {
    fetch('/api/pgp').then(r=>r.json()).then(setPgp).catch(()=>{})
  }, [])

  function downloadAsc() {
    if (!pgp.publicKey) return
    const blob = new Blob([pgp.publicKey], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'pubkey.asc'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="border border-fuchsia-500/30 rounded">
      <button onClick={()=>setOpen(!open)} className="w-full flex items-center justify-between px-4 py-3">
        <span className="font-mono">PGP</span>
        <span className="text-zinc-400">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-3">
          <div className="text-sm text-zinc-300">
            <div>Fingerprint: <span className="font-mono">{pgp.fingerprint || '(non configuré)'}</span></div>
            {pgp.keyId && <div>Key ID: <span className="font-mono">{pgp.keyId}</span></div>}
            {pgp.algorithm && <div>Algo: {pgp.algorithm}</div>}
            {pgp.expiresAt && <div>Expire: {new Date(pgp.expiresAt).toLocaleDateString()}</div>}
          </div>
          <div className="flex gap-2">
            <button onClick={downloadAsc} disabled={!pgp.publicKey} className="px-3 py-2 bg-fuchsia-600 rounded disabled:opacity-50">Télécharger .asc</button>
          </div>
          {pgp.publicKey && (
            <pre className="whitespace-pre-wrap text-xs bg-zinc-900 p-3 rounded border border-zinc-700 overflow-auto max-h-64">{pgp.publicKey}</pre>
          )}
        </div>
      )}
    </div>
  )
}


