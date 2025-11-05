"use client"

import { useState } from 'react'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [consent, setConsent] = useState(false)

  async function sendMailto() {
    // Récupérer l'email de contact dynamiquement
    try {
      const siteRes = await fetch('/api/site')
      const siteData = await siteRes.json()
      const contactEmail = siteData.contactEmail || 'contact@example.com'
      
      const subject = encodeURIComponent(`Contact depuis le portfolio — ${name}`)
      const body = encodeURIComponent(`Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)
      window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`
    } catch {
      // Fallback si l'API ne répond pas
      const subject = encodeURIComponent(`Contact depuis le portfolio — ${name}`)
      const body = encodeURIComponent(`Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)
      window.location.href = `mailto:contact@example.com?subject=${subject}&body=${body}`
    }
  }

  async function sendFormspree() {
    try {
      // Récupérer l'email de contact depuis l'API
      const siteRes = await fetch('/api/site')
      const siteData = await siteRes.json()
      const contactEmail = siteData.contactEmail || 'contact@example.com'

      const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID || 'xyzabc123'
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name, 
          email, 
          message,
          _replyto: email,
          _subject: `Nouveau message de ${name} via Portfolio`
        })
      })
      if (res.ok) {
        alert('✅ Message envoyé avec succès !')
        setName('')
        setEmail('')
        setMessage('')
        setConsent(false)
      } else {
        throw new Error('Formspree error')
      }
    } catch (error) {
      console.error('Erreur Formspree:', error)
      // Fallback to mailto
      alert('⚠️ Ouverture de votre client email...')
      sendMailto()
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!consent) return
    sendFormspree()
  }

  return (
    <div className="max-w-lg mx-auto">
      <form onSubmit={onSubmit} className="holo rounded-xl p-8">
        <div className="grid gap-6">
          <label className="grid gap-2">
            <span className="text-slate-300 font-medium">Nom</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg outline-none focus:border-blue-500 text-white transition-colors"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-slate-300 font-medium">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg outline-none focus:border-blue-500 text-white transition-colors"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-slate-300 font-medium">Message</span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={5}
              className="px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg outline-none focus:border-blue-500 resize-none text-white transition-colors"
            />
          </label>
          <label className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              required
              className="mt-1 accent-blue-500"
            />
            <span className="text-slate-400">
              J'accepte que mes données soient utilisées pour répondre à ma demande (RGPD).
            </span>
          </label>
          <button
            type="submit"
            disabled={!consent}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:opacity-50 text-white rounded-lg font-medium transition-colors"
          >
            Envoyer le message
          </button>
        </div>
      </form>
    </div>
  )
}
