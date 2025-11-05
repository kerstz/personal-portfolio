"use client"

const sections = [
  { id: "hero", label: "Boot" },
  { id: "apropos", label: "À propos" },
  { id: "manifeste", label: "Manifeste" },
  { id: "projets", label: "Projets" },
  { id: "avis", label: "Avis" },
  { id: "contact", label: "Contact" },
  { id: "pgp", label: "PGP" }
]

export default function Sidebar() {
  return (
    <aside className="fixed left-4 top-1/2 -translate-y-1/2 z-30 hidden md:block">
      <nav className="flex flex-col gap-2 p-2 border border-fuchsia-500/40 rounded bg-black/60 backdrop-blur">
        {sections.map(s => (
          <a key={s.id} href={`#${s.id}`} className="px-3 py-1 text-sm font-mono text-zinc-300 hover:text-fuchsia-400">
            {s.label}
          </a>
        ))}
      </nav>
    </aside>
  )
}


