'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Project {
  id: string
  slug: string
  title: { fr: string; en: string }
  summary: { fr: string; en: string }
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PLANNED'
  stack: string
  liveUrl?: string
  githubUrl?: string
  imageUrl?: string
  createdAt: string
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/admin/projects')
      if (response.ok) {
        const data = await response.json()
        setProjects(data)
      }
    } catch (error) {
      console.error('Erreur lors du chargement:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) return

    try {
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        setProjects(projects.filter(p => p.id !== id))
      } else {
        alert('Erreur lors de la suppression')
      }
    } catch {
      alert('Erreur lors de la suppression')
    }
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      COMPLETED: 'bg-green-600 text-white',
      IN_PROGRESS: 'bg-blue-600 text-white',
      PLANNED: 'bg-yellow-600 text-black'
    }
    const labels = {
      COMPLETED: 'Terminé',
      IN_PROGRESS: 'En cours',
      PLANNED: 'Planifié'
    }
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Chargement...</div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Gestion des Projets</h1>
        <Link
          href="/admin/projects/new"
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2"
        >
          <span>+</span>
          Nouveau projet
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-slate-400 mb-4">Aucun projet pour le moment</div>
          <Link
            href="/admin/projects/new"
            className="inline-flex px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Créer votre premier projet
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div key={project.id} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold truncate">{project.title?.fr || project.title?.en || 'Sans titre'}</h3>
                {getStatusBadge(project.status)}
              </div>
              
              <p className="text-slate-400 text-sm mb-4 line-clamp-3">{project.summary?.fr || project.summary?.en || 'Aucune description'}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.stack && (Array.isArray(project.stack) ? project.stack : (typeof project.stack === 'string' ? project.stack.split(',') : [])).map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-slate-700 text-slate-300 rounded text-xs"
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/projects/${project.id}`}
                  className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-center rounded transition-colors text-sm"
                >
                  Modifier
                </Link>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors text-sm"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
