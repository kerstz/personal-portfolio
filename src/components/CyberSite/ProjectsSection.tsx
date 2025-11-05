"use client"

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const projectsData = [
  {
    id: 1,
    title: "CyberVault",
    description: "Système de stockage décentralisé avec chiffrement end-to-end",
    tech: ["React", "Node.js", "IPFS", "Cryptography"],
    status: "completed",
    image: "/api/placeholder/400/250",
    github: "https://github.com",
    demo: "https://demo.com",
    highlight: true
  },
  {
    id: 2,
    title: "Anonymous Chat",
    description: "Application de messagerie anonyme utilisant Tor et Signal Protocol",
    tech: ["Vue.js", "WebRTC", "Signal", "Tor"],
    status: "in-progress",
    image: "/api/placeholder/400/250",
    github: "https://github.com",
    highlight: false
  },
  {
    id: 3,
    title: "BlockAudit",
    description: "Plateforme d'audit de smart contracts avec analyse statique",
    tech: ["Solidity", "Python", "Web3", "ML"],
    status: "completed",
    image: "/api/placeholder/400/250",
    github: "https://github.com",
    demo: "https://demo.com",
    highlight: false
  },
  {
    id: 4,
    title: "PrivacyOS",
    description: "Distribution Linux axée sur la vie privée et l'anonymat",
    tech: ["Linux", "Bash", "Docker", "Security"],
    status: "in-progress",
    image: "/api/placeholder/400/250",
    github: "https://github.com",
    highlight: true
  }
]

export default function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [filter, setFilter] = useState('all')
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  const filteredProjects = projectsData.filter(project => {
    if (filter === 'all') return true
    return project.status === filter
  })

  return (
    <section id="projects" className="min-h-screen py-20 relative overflow-hidden">
      {/* Arrière-plan avec particules */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-fuchsia-400 rounded-full"
            animate={{
              x: [0, Math.random() * 100, 0],
              y: [0, Math.random() * 100, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400 mb-6">
            &lt;/PROJETS&gt;
          </h2>
          <p className="text-xl text-zinc-300 max-w-3xl mx-auto mb-8">
            Innovations en sécurité, blockchain et technologies de protection de la vie privée
          </p>

          {/* Filtres */}
          <div className="flex justify-center gap-4">
            {[
              { key: 'all', label: 'TOUS', icon: '🌐' },
              { key: 'completed', label: 'TERMINÉS', icon: '✅' },
              { key: 'in-progress', label: 'EN COURS', icon: '🚧' }
            ].map(filterOption => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key)}
                className={`px-6 py-2 font-mono border rounded-lg transition-all ${
                  filter === filterOption.key
                    ? 'bg-fuchsia-600 border-fuchsia-500 text-white'
                    : 'border-fuchsia-500/50 text-fuchsia-400 hover:bg-fuchsia-500/10'
                }`}
              >
                <span className="mr-2">{filterOption.icon}</span>
                {filterOption.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grille de projets */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 * index, duration: 0.8 }}
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
              className={`relative group cursor-pointer ${
                project.highlight ? 'md:col-span-2' : ''
              }`}
            >
              {/* Carte projet */}
              <div className="bg-black/80 border border-fuchsia-500/30 rounded-lg overflow-hidden hover:border-fuchsia-500 transition-all duration-300 transform hover:scale-[1.02]">
                {/* Image/placeholder */}
                <div className="h-48 bg-gradient-to-br from-fuchsia-500/20 to-cyan-500/20 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl opacity-50">🚀</div>
                  </div>
                  
                  {/* Status badge */}
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-mono border ${
                    project.status === 'completed'
                      ? 'bg-green-500/20 border-green-500 text-green-400'
                      : 'bg-yellow-500/20 border-yellow-500 text-yellow-400'
                  }`}>
                    {project.status === 'completed' ? 'TERMINÉ' : 'EN COURS'}
                  </div>

                  {/* Effet de hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                    className="absolute inset-0 bg-gradient-to-r from-fuchsia-600/20 to-cyan-600/20"
                  />
                </div>

                {/* Contenu */}
                <div className="p-6">
                  <h3 className="text-xl font-mono text-fuchsia-400 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-zinc-300 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map(tech => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-zinc-800 border border-zinc-600 rounded text-xs font-mono text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 rounded font-mono text-sm transition-all"
                    >
                      <span>🔗</span>
                      GitHub
                    </a>
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 rounded font-mono text-sm transition-all"
                      >
                        <span>🚀</span>
                        Demo
                      </a>
                    )}
                  </div>
                </div>

                {/* Effet de glitch au hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent animate-pulse" />
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Terminal de statistiques */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 bg-black/80 border border-fuchsia-500/50 rounded-lg p-6 max-w-2xl mx-auto"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="ml-4 text-sm text-zinc-400 font-mono">git status</span>
          </div>
          <div className="font-mono text-sm space-y-1">
            <div className="text-green-400">$ git log --oneline --graph</div>
            <div className="text-zinc-300">* a1b2c3d feat: implement end-to-end encryption</div>
            <div className="text-zinc-300">* d4e5f6g refactor: optimize blockchain integration</div>
            <div className="text-zinc-300">* g7h8i9j security: add penetration testing suite</div>
            <div className="text-green-400 mt-2">$ git status</div>
            <div className="text-cyan-400">On branch main</div>
            <div className="text-zinc-300">Your branch is up to date with 'origin/main'.</div>
            <div className="text-green-400">nothing to commit, working tree clean</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
