export default function TlcLogo({ className = "", size = 48 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      <defs>
        <filter id="neon-glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      {/* T */}
      <path 
        d="M20 20 L80 20 M50 20 L50 80" 
        stroke="#c026d3" 
        strokeWidth="4" 
        fill="none" 
        filter="url(#neon-glow)"
      />
      {/* L */}
      <path 
        d="M25 25 L25 75 L65 75" 
        stroke="#22c55e" 
        strokeWidth="3" 
        fill="none" 
        filter="url(#neon-glow)"
        opacity="0.8"
      />
      {/* C */}
      <path 
        d="M75 30 A20 20 0 0 0 75 70" 
        stroke="#06b6d4" 
        strokeWidth="3" 
        fill="none" 
        filter="url(#neon-glow)"
        opacity="0.7"
      />
    </svg>
  )
}
