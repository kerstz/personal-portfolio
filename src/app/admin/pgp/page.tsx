'use client'

import { useEffect, useState } from 'react'

interface PgpKey {
  id?: string
  publicKey?: string
  fingerprint?: string
  keyId?: string
  algorithm?: string
  expiresAt?: string
}

export default function AdminPgpPage() {
  const [pgpKey, setPgpKey] = useState<PgpKey>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchPgpKey()
  }, [])

  const fetchPgpKey = async () => {
    try {
      const response = await fetch('/api/admin/pgp')
      if (response.ok) {
        const data = await response.json()
        if (data) {
          setPgpKey({
            publicKey: data.publicKey || '',
            fingerprint: data.fingerprint || '',
            keyId: data.keyId || '',
            algorithm: data.algorithm || '',
            expiresAt: data.expiresAt ? data.expiresAt.slice(0, 10) : ''
          })
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement de la clé PGP:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const payload = {
        ...pgpKey,
        expiresAt: pgpKey.expiresAt ? new Date(pgpKey.expiresAt) : null
      }
      
      const response = await fetch('/api/admin/pgp', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      
      if (response.ok) {
        alert('Clé PGP sauvegardée avec succès!')
      } else {
        alert('Erreur lors de la sauvegarde')
      }
    } catch {
      alert('Erreur lors de la sauvegarde')
    } finally {
      setSaving(false)
    }
  }

  const updateField = (field: keyof PgpKey, value: string) => {
    setPgpKey({ ...pgpKey, [field]: value })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Chargement...</div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Gestion de la Clé PGP</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white rounded-lg transition-colors"
        >
          {saving ? 'Sauvegarde...' : 'Sauvegarder'}
        </button>
      </div>

      <div className="space-y-8">
        {/* Informations de la clé */}
        <div className="bg-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Métadonnées de la clé</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Fingerprint</label>
              <input
                type="text"
                value={pgpKey.fingerprint || ''}
                onChange={(e) => updateField('fingerprint', e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white font-mono"
                placeholder="ABCD EFGH 1234 5678..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Key ID</label>
              <input
                type="text"
                value={pgpKey.keyId || ''}
                onChange={(e) => updateField('keyId', e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white font-mono"
                placeholder="0x12345678"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Algorithme</label>
              <select
                value={pgpKey.algorithm || ''}
                onChange={(e) => updateField('algorithm', e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
              >
                <option value="">Sélectionner un algorithme</option>
                <option value="RSA">RSA</option>
                <option value="DSA">DSA</option>
                <option value="ECDSA">ECDSA</option>
                <option value="EdDSA">EdDSA</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Date d&apos;expiration</label>
              <input
                type="date"
                value={pgpKey.expiresAt || ''}
                onChange={(e) => updateField('expiresAt', e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
              />
            </div>
          </div>
        </div>

        {/* Clé publique */}
        <div className="bg-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-green-400">Clé publique</h2>
          <div>
            <label className="block text-sm font-medium mb-2">
              Clé publique ASCII-armored
              <span className="text-slate-400 text-xs ml-2">
                (Copiez votre clé publique PGP complète, y compris les en-têtes)
              </span>
            </label>
            <textarea
                value={pgpKey.publicKey || ''}
              onChange={(e) => updateField('publicKey', e.target.value)}
              rows={12}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white font-mono text-sm"
              placeholder="-----BEGIN PGP PUBLIC KEY BLOCK-----

mQENBF...
...
-----END PGP PUBLIC KEY BLOCK-----"
            />
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-yellow-400">Instructions</h2>
          <div className="text-slate-300 space-y-3">
            <p><strong>Pour exporter votre clé publique :</strong></p>
            <div className="bg-slate-900 rounded p-3 font-mono text-sm">
              <p className="text-green-400"># Lister vos clés</p>
              <p>gpg --list-keys</p>
              <br />
              <p className="text-green-400"># Exporter la clé publique</p>
              <p>gpg --armor --export votre@email.com</p>
            </div>
            <p><strong>Informations importantes :</strong></p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Le fingerprint est l&apos;identifiant unique de votre clé</li>
              <li>Assurez-vous que votre clé publique est complète avec les en-têtes</li>
              <li>La clé sera affichée publiquement sur votre portfolio</li>
              <li>Ne partagez JAMAIS votre clé privée</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}


