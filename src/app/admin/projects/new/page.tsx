'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewProjectPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    titleFr: '',
    titleEn: '',
    summaryFr: '',
    summaryEn: '',
    descriptionFr: '',
    descriptionEn: '',
    status: 'IN_PROGRESS',
    stack: '',
    liveUrl: '',
    githubUrl: '',
    imageUrl: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const payload = {
        slug: formData.titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `project-${Date.now()}`,
        title: { fr: formData.titleFr, en: formData.titleEn },
        summary: formData.summaryFr || formData.summaryEn ? { 
          fr: formData.summaryFr || '', 
          en: formData.summaryEn || '' 
        } : null,
        description: formData.descriptionFr || formData.descriptionEn ? { 
          fr: formData.descriptionFr || '', 
          en: formData.descriptionEn || '' 
        } : null,
        content: formData.descriptionFr || formData.descriptionEn ? { 
          fr: formData.descriptionFr || '', 
          en: formData.descriptionEn || '' 
        } : null,
        status: formData.status,
        stack: formData.stack ? formData.stack.split(',').map(s => s.trim()).filter(Boolean) : [],
        links: (formData.githubUrl || formData.liveUrl) ? {
          repo: formData.githubUrl || null,
          demo: formData.liveUrl || null
        } : null,
        images: formData.imageUrl ? [{ 
          src: formData.imageUrl, 
          alt: { fr: formData.titleFr, en: formData.titleEn } 
        }] : null
      }

      const response = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        router.push('/admin/projects')
      } else {
        alert('Erreur lors de la création du projet')
      }
    } catch {
      alert('Erreur lors de la création du projet')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
        >
          ← Retour
        </button>
        <h1 className="text-3xl font-bold">Nouveau Projet</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Informations de base */}
        <div className="bg-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Informations de base</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Titre (Français)</label>
              <input
                type="text"
                required
                value={formData.titleFr}
                onChange={(e) => handleInputChange('titleFr', e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                placeholder="Nom du projet en français"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Titre (Anglais)</label>
              <input
                type="text"
                required
                value={formData.titleEn}
                onChange={(e) => handleInputChange('titleEn', e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                placeholder="Project name in English"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Statut</label>
            <select
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value)}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
            >
              <option value="PLANNED">Planifié</option>
              <option value="IN_PROGRESS">En cours</option>
              <option value="COMPLETED">Terminé</option>
            </select>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Technologies (séparées par des virgules)</label>
            <input
              type="text"
              value={formData.stack}
              onChange={(e) => handleInputChange('stack', e.target.value)}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
              placeholder="React, Next.js, TypeScript, Node.js"
            />
          </div>
        </div>

        {/* Descriptions */}
        <div className="bg-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-green-400">Descriptions</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Résumé court (Français)</label>
              <textarea
                rows={2}
                value={formData.summaryFr}
                onChange={(e) => handleInputChange('summaryFr', e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                placeholder="Description courte du projet en 1-2 phrases"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Résumé court (Anglais)</label>
              <textarea
                rows={2}
                value={formData.summaryEn}
                onChange={(e) => handleInputChange('summaryEn', e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                placeholder="Short project description in 1-2 sentences"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description détaillée (Français)</label>
              <textarea
                rows={6}
                value={formData.descriptionFr}
                onChange={(e) => handleInputChange('descriptionFr', e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                placeholder="Description complète du projet, objectifs, défis techniques, solutions apportées..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description détaillée (Anglais)</label>
              <textarea
                rows={6}
                value={formData.descriptionEn}
                onChange={(e) => handleInputChange('descriptionEn', e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                placeholder="Complete project description, goals, technical challenges, solutions..."
              />
            </div>
          </div>
        </div>

        {/* Liens et médias */}
        <div className="bg-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-purple-400">Liens et médias</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">URL de démonstration</label>
              <input
                type="url"
                value={formData.liveUrl}
                onChange={(e) => handleInputChange('liveUrl', e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                placeholder="https://example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">URL GitHub</label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                placeholder="https://github.com/username/repo"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">URL de l'image</label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white rounded-lg transition-colors"
          >
            {loading ? 'Création en cours...' : 'Créer le projet'}
          </button>
        </div>
      </form>
    </div>
  )
}
