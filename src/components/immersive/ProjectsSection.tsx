'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLocale } from '@/lib/locale'

interface Project {
  id: string
  slug: string
  title: { fr: string; en: string }
  summary: { fr: string; en: string } | null
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PLANNED'
  stack: string | string[] | null
  imageUrl?: string
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const locale = useLocale()

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects')
      if (response.ok) {
        const data = await response.json()
        setProjects(data)
      }
    } catch (error) {
      console.error('Erreur lors du chargement des projets:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      COMPLETED: 'bg-green-600/20 text-green-400 border-green-400/30',
      IN_PROGRESS: 'bg-blue-600/20 text-blue-400 border-blue-400/30',
      PLANNED: 'bg-yellow-600/20 text-yellow-400 border-yellow-400/30'
    }
    const labels = {
      COMPLETED: locale === 'fr' ? 'Terminé' : 'Completed',
      IN_PROGRESS: locale === 'fr' ? 'En cours' : 'In Progress',
      PLANNED: locale === 'fr' ? 'Planifié' : 'Planned'
    }
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    )
  }

  if (loading) {
    return (
      <section id="projets" className="min-h-screen flex items-center snap-start snap-always bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-semibold neon-title text-center mb-16">
            {locale === 'fr' ? 'Mes Projets' : 'My Projects'}
          </h2>
          <div className="flex items-center justify-center h-32">
            <div className="text-slate-400">{locale === 'en' ? 'Loading projects...' : 'Chargement des projets...'}</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projets" className="min-h-screen flex items-center snap-start snap-always bg-slate-900/30">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-semibold neon-title text-center mb-16">
          {locale === 'fr' ? 'Mes Projets' : 'My Projects'}
        </h2>
        
        {projects.length === 0 ? (
          <div className="text-center text-slate-400">
            {locale === 'fr' ? 'Aucun projet disponible pour le moment.' : 'No projects available at the moment.'}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/projects/${project.slug}`}>
                  <div className="holo rounded-xl p-6 h-full group cursor-pointer transition-all duration-300 hover:scale-[1.02]">
                    {/* Image si disponible */}
                    {project.imageUrl && (
                      <div className="mb-4 overflow-hidden rounded-lg">
                        <img
                          src={project.imageUrl}
                          alt={project.title[locale] || project.title.fr || project.title.en}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    
                    {/* En-tête avec titre et statut */}
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-semibold neon-title group-hover:text-blue-400 transition-colors">
                        {project.title[locale] || project.title.fr || project.title.en}
                      </h3>
                      {getStatusBadge(project.status)}
                    </div>
                    
                    {/* Description */}
                    {project.summary && typeof project.summary === 'object' && (project.summary[locale] || project.summary.fr || project.summary.en) && (
                      <p className="text-slate-300 mb-4 line-clamp-3">
                        {project.summary[locale] || project.summary.fr || project.summary.en}
                      </p>
                    )}
                    
                    {/* Tags technologiques */}
                    {project.stack && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {(Array.isArray(project.stack) ? project.stack : (typeof project.stack === 'string' ? project.stack.split(',') : [])).slice(0, 4).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded-full text-sm border border-slate-600/30"
                          >
                            {typeof tech === 'string' ? tech.trim() : String(tech)}
                          </span>
                        ))}
                        {(Array.isArray(project.stack) ? project.stack : (typeof project.stack === 'string' ? project.stack.split(',') : [])).length > 4 && (
                          <span className="px-3 py-1 bg-slate-700/50 text-slate-400 rounded-full text-sm border border-slate-600/30">
                            +{(Array.isArray(project.stack) ? project.stack : (typeof project.stack === 'string' ? project.stack.split(',') : [])).length - 4}
                          </span>
                        )}
                      </div>
                    )}
                    
                    {/* Call to action */}
                    <div className="text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors">
                      {locale === 'fr' ? 'Voir les détails →' : 'View details →'}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
