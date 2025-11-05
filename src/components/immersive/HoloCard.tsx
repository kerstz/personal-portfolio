export default function HoloCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="holo rounded-xl p-8 transition-all duration-300">
      <h3 className="text-3xl font-semibold neon-title mb-6">{title}</h3>
      <div className="angled-divider mb-6" />
      <div className="text-slate-300 leading-relaxed space-y-4">
        {children}
      </div>
    </div>
  )
}


