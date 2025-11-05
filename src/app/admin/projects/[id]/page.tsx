'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Project {
  id: string
  slug: string
  title: { fr: string; en: string }
  summary: { fr: string; en: string }
  description: { fr: string; en: string }
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PLANNED'
  stack: string
  liveUrl?: string
  githubUrl?: string
  imageUrl?: string
}

export default function EditProjectPage() {
  const { id } = useParams()
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (id) {
      fetchProject()
    }
  }, [id])

  const fetchProject = async () => {
    try {
      const response = await fetch(`/api/admin/projects/${id}`)
      if (response.ok) {
        const data = await response.json()
        setProject(data)
      } else {
        alert('Projet non trouvé')
        router.push('/admin/projects')
      }
    } catch (error) {
      console.error('Erreur lors du chargement:', error)
      alert('Erreur lors du chargement du projet')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!project) return
    
    setSaving(true)
    try {
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project)
      })
      
      if (response.ok) {
        alert('Projet sauvegardé avec succès!')
      } else {
        alert('Erreur lors de la sauvegarde')
      }
    } catch {
      alert('Erreur lors de la sauvegarde')
    } finally {
      setSaving(false)
    }
  }

  const updateProject = (field: string, value: any) => {
    if (!project) return
    setProject({ ...project, [field]: value })
  }

  const updateNestedField = (parent: string, field: string, value: string) => {
    if (!project) return
    setProject({
      ...project,
      [parent]: { ...(project as any)[parent], [field]: value }
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Chargement...</div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="text-center text-red-400">
        Projet non trouvé
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
          >
            ← Retour
          </button>
          <h1 className="text-3xl font-bold">Modifier le Projet</h1>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white rounded-lg transition-colors"
        >
          {saving ? 'Sauvegarde...' : 'Sauvegarder'}
        </button>
      </div>

      <div className="space-y-8">
        {/* Informations de base */}
        <div className="bg-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Informations de base</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Titre (Français)</label>
              <input
                type="text"
                value={project.title?.fr || ''}
                onChange={(e) => updateNestedField('title', 'fr', e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Titre (Anglais)</label>
              <input
                type="text"
                value={project.title?.en || ''}
                onChange={(e) => updateNestedField('title', 'en', e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Statut</label>
            <select
              value={project.status}
              onChange={(e) => updateProject('status', e.target.value)}
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
              value={project.stack || ''}
              onChange={(e) => updateProject('stack', e.target.value)}
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
                value={project.summary?.fr || ''}
                onChange={(e) => updateNestedField('summary', 'fr', e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Résumé court (Anglais)</label>
              <textarea
                rows={2}
                value={project.summary?.en || ''}
                onChange={(e) => updateNestedField('summary', 'en', e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description détaillée (Français)</label>
              <textarea
                rows={6}
                value={project.description?.fr || ''}
                onChange={(e) => updateNestedField('description', 'fr', e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description détaillée (Anglais)</label>
              <textarea
                rows={6}
                value={project.description?.en || ''}
                onChange={(e) => updateNestedField('description', 'en', e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
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
                value={project.liveUrl || ''}
                onChange={(e) => updateProject('liveUrl', e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">URL GitHub</label>
              <input
                type="url"
                value={project.githubUrl || ''}
                onChange={(e) => updateProject('githubUrl', e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">URL de l'image</label>
              <input
                type="url"
                value={project.imageUrl || ''}
                onChange={(e) => updateProject('imageUrl', e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
