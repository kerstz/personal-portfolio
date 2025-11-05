import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import { cookies } from 'next/headers'
import LanguageSwitcherCookie from '@/components/LanguageSwitcherCookie'

interface ProjectData {
  id: string
  slug: string
  title: { fr: string; en: string }
  summary: { fr: string; en: string }
  description?: { fr: string; en: string }
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PLANNED'
  stack: string
  liveUrl?: string
  githubUrl?: string
  imageUrl?: string
  createdAt: Date
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  // Détection de la langue depuis les cookies
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get('tlc_locale')
  const locale = (localeCookie?.value === 'en' ? 'en' : 'fr') as 'fr' | 'en'
  
  const project = await prisma.project.findUnique({ 
    where: { slug } 
  }) as ProjectData | null

  if (!project) {
    notFound()
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
      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    )
  }

  return (
    <div className="min-h-screen neon-bg text-slate-100">
      {/* Subtle background grid */}
      <div className="cyber-grid" />
      
      <div className="relative z-10">
        {/* Header avec navigation */}
        <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-20">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <Link 
              href="/#projets" 
              className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors"
            >
              <span>←</span>
              {locale === 'fr' ? 'Retour aux projets' : 'Back to projects'}
            </Link>
          </div>
        </header>

        {/* Contenu principal */}
        <main className="max-w-4xl mx-auto px-6 py-12">
          {/* En-tête du projet */}
          <div className="mb-12">
            {project.imageUrl && (
              <div className="mb-8 overflow-hidden rounded-xl">
                <img
                  src={project.imageUrl}
                  alt={project.title.fr || project.title.en}
                  className="w-full h-64 md:h-96 object-cover"
                />
              </div>
            )}
            
            <div className="flex items-start justify-between mb-6">
              <h1 className="text-4xl md:text-5xl font-bold neon-title">
                {project.title[locale] || project.title.fr || project.title.en}
              </h1>
              {getStatusBadge(project.status)}
            </div>
            
            <p className="text-xl text-slate-300 leading-relaxed mb-8">
              {project.summary[locale] || project.summary.fr || project.summary.en}
            </p>
            
            {/* Liens du projet */}
            <div className="flex flex-wrap gap-4 mb-8">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors inline-flex items-center gap-2"
                >
                  <span>🚀</span>
                  {locale === 'fr' ? 'Voir le projet' : 'View project'}
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors inline-flex items-center gap-2"
                >
                  <span>📂</span>
                  {locale === 'fr' ? 'Code source' : 'Source code'}
                </a>
              )}
            </div>
            
            {/* Technologies */}
            {project.stack && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-slate-200">
                  {locale === 'fr' ? 'Technologies utilisées' : 'Technologies used'}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {(Array.isArray(project.stack) ? project.stack : (typeof project.stack === 'string' ? project.stack.split(',') : [])).map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-slate-800/60 text-slate-300 rounded-lg border border-slate-600/30 font-medium"
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Description détaillée */}
          <div className="holo rounded-xl p-8">
            <h2 className="text-2xl font-semibold neon-title mb-6">
              {locale === 'fr' ? 'À propos du projet' : 'About the project'}
            </h2>
            <div className="prose prose-invert max-w-none">
              {project.description?.[locale] || project.description?.fr || project.description?.en ? (
                <div className="text-slate-300 leading-relaxed whitespace-pre-line">
                  {project.description?.[locale] || project.description?.fr || project.description?.en}
                </div>
              ) : (
                <p className="text-slate-400 italic">
                  {locale === 'fr' ? 'Description détaillée à venir...' : 'Detailed description coming soon...'}
                </p>
              )}
            </div>
          </div>

          {/* Navigation vers autres projets */}
          <div className="mt-16 text-center">
            <Link
              href="/#projets"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800/60 hover:bg-slate-700/60 text-slate-300 hover:text-white rounded-lg transition-colors border border-slate-600/30"
            >
              {locale === 'fr' ? 'Voir tous les projets' : 'View all projects'}
            </Link>
          </div>
        </main>
      </div>
      
      {/* Sélecteur de langue */}
      <LanguageSwitcherCookie />
    </div>
  )
}


