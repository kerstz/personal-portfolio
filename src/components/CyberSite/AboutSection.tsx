"use client"

import { useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [stats, setStats] = useState({ projects: 0, commits: 0, years: 0 })

  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setStats(prev => ({
          projects: prev.projects < 50 ? prev.projects + 2 : 50,
          commits: prev.commits < 1337 ? prev.commits + 50 : 1337,
          years: prev.years < 5 ? prev.years + 0.2 : 5
        }))
      }, 100)

      setTimeout(() => clearInterval(interval), 2000)
      return () => clearInterval(interval)
    }
  }, [isInView])

  const skills = [
    { name: "React/Next.js", level: 95, icon: "⚛️" },
    { name: "TypeScript", level: 90, icon: "🔷" },
    { name: "Node.js", level: 88, icon: "🟢" },
    { name: "Python", level: 85, icon: "🐍" },
    { name: "Cryptographie", level: 80, icon: "🔐" },
    { name: "Docker/K8s", level: 82, icon: "🐳" },
    { name: "Blockchain", level: 75, icon: "⛓️" },
    { name: "Pentesting", level: 70, icon: "🛡️" }
  ]

  return (
    <section id="about" className="min-h-screen py-20 relative">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(192, 38, 211, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(192, 38, 211, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400 mb-6">
            &lt;/À_PROPOS&gt;
          </h2>
          <p className="text-xl text-zinc-300 max-w-3xl mx-auto">
            Développeur passionné par la liberté numérique et les technologies émergentes
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="space-y-6"
          >
            <div className="bg-black/80 border border-fuchsia-500/50 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="ml-4 text-sm text-zinc-400 font-mono">about.sh</span>
              </div>
              <div className="font-mono text-sm space-y-2">
                <div className="text-green-400">$ cat profile.txt</div>
                <div className="text-zinc-300">
                  Architecte de solutions numériques sécurisées, 
                  adepte du mouvement cypherpunk et défenseur de la vie privée.
                </div>
                <div className="text-green-400 mt-4">$ grep -r "passion"</div>
                <div className="text-zinc-300">
                  • Cryptographie & sécurité informatique<br/>
                  • Technologies blockchain et Web3<br/>
                  • Architecture microservices<br/>
                  • Open source & décentralisation
                </div>
                <div className="text-green-400 mt-4">$ echo $PHILOSOPHY</div>
                <div className="text-cyan-400 italic">
                  "Code is law, cryptography is freedom"
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="bg-gradient-to-r from-fuchsia-500/10 to-cyan-500/10 border border-fuchsia-500/30 rounded-lg p-6"
            >
              <h3 className="text-xl font-mono text-fuchsia-400 mb-3">🔐 Manifeste</h3>
              <p className="text-zinc-300 italic leading-relaxed">
                La confidentialité n&apos;est pas du secret. La confidentialité est le pouvoir 
                de se révéler sélectivement au monde. Les cypherpunks déploient du code. 
                Nous savons que quelqu&apos;un doit écrire des logiciels pour défendre la vie privée.
              </p>
              <p className="text-fuchsia-400 text-sm mt-2">- Eric Hughes, Cypherpunk Manifesto</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-black/50 border border-fuchsia-500/30 rounded-lg p-4 text-center">
                <div className="text-2xl font-mono text-fuchsia-400">{Math.round(stats.projects)}+</div>
                <div className="text-sm text-zinc-400">Projets</div>
              </div>
              <div className="bg-black/50 border border-cyan-500/30 rounded-lg p-4 text-center">
                <div className="text-2xl font-mono text-cyan-400">{Math.round(stats.commits)}+</div>
                <div className="text-sm text-zinc-400">Commits</div>
              </div>
              <div className="bg-black/50 border border-green-500/30 rounded-lg p-4 text-center">
                <div className="text-2xl font-mono text-green-400">{stats.years.toFixed(1)}</div>
                <div className="text-sm text-zinc-400">Années</div>
              </div>
            </div>

            <div className="bg-black/80 border border-fuchsia-500/50 rounded-lg p-6">
              <h3 className="text-xl font-mono text-fuchsia-400 mb-4">⚡ Compétences</h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.8 + (index * 0.1), duration: 0.6 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-mono flex items-center gap-2">
                        <span>{skill.icon}</span>
                        {skill.name}
                      </span>
                      <span className="text-sm text-zinc-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{ delay: 1 + (index * 0.1), duration: 1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}