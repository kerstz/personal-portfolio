'use client'

import { useState, useEffect } from 'react'

interface SiteContent {
  id?: string
  heroTitle?: { fr?: string; en?: string }
  heroSubtitle?: { fr?: string; en?: string }
  heroDescription?: { fr?: string; en?: string }
  aboutTitle?: { fr?: string; en?: string }
  aboutContent?: { fr?: string; en?: string }
  manifestoTitle?: { fr?: string; en?: string }
  manifestoContent?: { fr?: string; en?: string }
  contactEmail?: string
}

export default function ContentPage() {
  const [content, setContent] = useState<SiteContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/admin/site')
      if (response.ok) {
        const data = await response.json()
        setContent(data)
      }
    } catch (error) {
      console.error('Erreur lors du chargement:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!content) return
    
    setSaving(true)
    try {
      const response = await fetch('/api/admin/site', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content)
      })
      
      if (response.ok) {
        alert('Contenu sauvegardé avec succès!')
      } else {
        alert('Erreur lors de la sauvegarde')
      }
    } catch {
      alert('Erreur lors de la sauvegarde')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Chargement...</div>
      </div>
    )
  }

  if (!content) {
    return (
      <div className="text-center text-red-400">
        Erreur lors du chargement du contenu
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Gestion du Contenu</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white rounded-lg transition-colors"
        >
          {saving ? 'Sauvegarde...' : 'Sauvegarder'}
        </button>
      </div>

      <div className="space-y-8">
        {/* Section Hero */}
        <div className="bg-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Section Hero</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Titre principal (Français)</label>
                <input
                  type="text"
                  value={content.heroTitle?.fr || ''}
                  onChange={(e) => setContent({...content, heroTitle: {...(content.heroTitle || {}), fr: e.target.value}})}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Titre principal (Anglais)</label>
                <input
                  type="text"
                  value={content.heroTitle?.en || ''}
                  onChange={(e) => setContent({...content, heroTitle: {...(content.heroTitle || {}), en: e.target.value}})}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  placeholder="Your name"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Sous-titre (Français)</label>
                <input
                  type="text"
                  value={content.heroSubtitle?.fr || ''}
                  onChange={(e) => setContent({...content, heroSubtitle: {...(content.heroSubtitle || {}), fr: e.target.value}})}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  placeholder="Votre rôle/spécialité"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Sous-titre (Anglais)</label>
                <input
                  type="text"
                  value={content.heroSubtitle?.en || ''}
                  onChange={(e) => setContent({...content, heroSubtitle: {...(content.heroSubtitle || {}), en: e.target.value}})}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  placeholder="Your role/specialty"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Description (Français)</label>
                <textarea
                  rows={3}
                  value={content.heroDescription?.fr || ''}
                  onChange={(e) => setContent({...content, heroDescription: {...(content.heroDescription || {}), fr: e.target.value}})}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  placeholder="Description courte de votre profil"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description (Anglais)</label>
                <textarea
                  rows={3}
                  value={content.heroDescription?.en || ''}
                  onChange={(e) => setContent({...content, heroDescription: {...(content.heroDescription || {}), en: e.target.value}})}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  placeholder="Short description of your profile"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section À propos */}
        <div className="bg-slate-800 rounded-lg p-6">





          <h2 className="text-xl font-semibold mb-4 text-green-400">About Section</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Titre (Français)</label>
                <input
                  type="text"
                  value={content.aboutTitle?.fr || ''}
                  onChange={(e) => setContent({...content, aboutTitle: {...(content.aboutTitle || {}), fr: e.target.value}})}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  placeholder="À propos"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Titre (Anglais)</label>
                <input
                  type="text"
                  value={content.aboutTitle?.en || ''}
                  onChange={(e) => setContent({...content, aboutTitle: {...(content.aboutTitle || {}), en: e.target.value}})}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  placeholder="About"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Contenu (Français)</label>
                <textarea
                  rows={6}
                  value={content.aboutContent?.fr || ''}
                  onChange={(e) => setContent({...content, aboutContent: {...(content.aboutContent || {}), fr: e.target.value}})}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  placeholder="Votre présentation détaillée..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Contenu (Anglais)</label>
                <textarea
                  rows={6}
                  value={content.aboutContent?.en || ''}
                  onChange={(e) => setContent({...content, aboutContent: {...(content.aboutContent || {}), en: e.target.value}})}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  placeholder="Your detailed presentation..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section Manifesto */}
        <div className="bg-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-purple-400">Section Manifesto</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Titre (Français)</label>
                <input
                  type="text"
                  value={content.manifestoTitle?.fr || ''}
                  onChange={(e) => setContent({...content, manifestoTitle: {...(content.manifestoTitle || {}), fr: e.target.value}})}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  placeholder="Manifeste"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Titre (Anglais)</label>
                <input
                  type="text"
                  value={content.manifestoTitle?.en || ''}
                  onChange={(e) => setContent({...content, manifestoTitle: {...(content.manifestoTitle || {}), en: e.target.value}})}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  placeholder="Manifesto"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Contenu (Français)</label>
                <textarea
                  rows={6}
                  value={content.manifestoContent?.fr || ''}
                  onChange={(e) => setContent({...content, manifestoContent: {...(content.manifestoContent || {}), fr: e.target.value}})}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  placeholder="Vos valeurs, philosophie, vision..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Contenu (Anglais)</label>
                <textarea
                  rows={6}
                  value={content.manifestoContent?.en || ''}
                  onChange={(e) => setContent({...content, manifestoContent: {...(content.manifestoContent || {}), en: e.target.value}})}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  placeholder="Your values, philosophy, vision..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Email de contact */}
        <div className="bg-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-orange-400">Contact</h2>
          <div>
            <label className="block text-sm font-medium mb-2">Email de contact</label>
            <input
              type="email"
              value={content.contactEmail || ''}
              onChange={(e) => setContent({...content, contactEmail: e.target.value})}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
              placeholder="contact@example.com"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
