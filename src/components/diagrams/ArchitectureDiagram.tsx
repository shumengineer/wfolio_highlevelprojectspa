import { motion } from 'framer-motion'
import { useRef } from 'react'

export default function ArchitectureDiagram() {
  const containerRef = useRef(null)

  return (
    <div 
      className="p-4 sm:p-8 bg-[#0f0f0f] rounded-2xl border border-white/5 flex flex-col items-center justify-center min-h-[400px] w-full overflow-hidden relative shadow-2xl"
      ref={containerRef}
    >
      <div className="absolute top-4 left-4 flex gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-white/10 shadow-[0_0_6px_rgba(255,255,255,0.05)]"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-white/20 shadow-[0_0_6px_rgba(255,255,255,0.1)]"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-white/30 shadow-[0_0_6px_rgba(255,255,255,0.15)]"></div>
      </div>
      
      <div className="text-[10px] text-text-muted absolute top-4 right-4 font-mono uppercase tracking-widest">
        system_architecture.drawio
      </div>

      <svg viewBox="0 0 800 400" className="w-full max-w-[800px] mt-8" style={{ minWidth: '600px' }} role="img">
        <title>Architecture Diagram</title>
        
        {/* Layer boxes */}
        <rect x="50" y="50" width="700" height="80" rx="8" fill="rgba(255,255,255,0.02)" stroke="#444" strokeWidth="1" strokeDasharray="4 4" />
        <text x="60" y="70" fill="#888" fontSize="10" className="font-mono uppercase tracking-widest">Client Layer (SvelteKit)</text>

        <rect x="50" y="180" width="700" height="100" rx="8" fill="rgba(255,255,255,0.02)" stroke="#444" strokeWidth="1" strokeDasharray="4 4" />
        <text x="60" y="200" fill="#888" fontSize="10" className="font-mono uppercase tracking-widest">Service Layer (Deno2 / NestJS)</text>

        <rect x="50" y="330" width="700" height="60" rx="8" fill="rgba(255,255,255,0.02)" stroke="#444" strokeWidth="1" strokeDasharray="4 4" />
        <text x="60" y="350" fill="#888" fontSize="10" className="font-mono uppercase tracking-widest">Data Layer</text>

        {/* Frontend Nodes */}
        <rect x="150" y="80" width="120" height="40" rx="4" fill="#1a1a1a" stroke="#ff3e00" strokeWidth="1" />
        <text x="210" y="105" fill="#fff" fontSize="12" textAnchor="middle" className="font-mono">Web App</text>
        
        <rect x="530" y="80" width="120" height="40" rx="4" fill="#1a1a1a" stroke="#ff3e00" strokeWidth="1" />
        <text x="590" y="105" fill="#fff" fontSize="12" textAnchor="middle" className="font-mono">Mobile App</text>

        {/* API Gateway */}
        <rect x="300" y="160" width="200" height="30" rx="4" fill="#1a1a1a" stroke="#fff" strokeWidth="2" />
        <text x="400" y="180" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle" className="font-mono">sfetch Protocol (Binary)</text>

        {/* Microservices */}
        <rect x="100" y="220" width="150" height="40" rx="4" fill="#1a1a1a" stroke="#e0234e" strokeWidth="1" />
        <text x="175" y="245" fill="#fff" fontSize="12" textAnchor="middle" className="font-mono">Ticketing Svc</text>

        <rect x="325" y="220" width="150" height="40" rx="4" fill="#1a1a1a" stroke="#22c55e" strokeWidth="1" />
        <text x="400" y="245" fill="#fff" fontSize="12" textAnchor="middle" className="font-mono">Payment Factory</text>

        <rect x="550" y="220" width="150" height="40" rx="4" fill="#1a1a1a" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1" />
        <text x="625" y="245" fill="#fff" fontSize="12" textAnchor="middle" className="font-mono">Analytics Engine</text>

        {/* Database */}
        <rect x="250" y="340" width="100" height="40" rx="4" fill="#1a1a1a" stroke="#4db33d" strokeWidth="1" />
        <text x="300" y="365" fill="#fff" fontSize="12" textAnchor="middle" className="font-mono">MongoDB</text>

        <rect x="450" y="340" width="100" height="40" rx="4" fill="#1a1a1a" stroke="#dc382d" strokeWidth="1" />
        <text x="500" y="365" fill="#fff" fontSize="12" textAnchor="middle" className="font-mono">Redis</text>

        {/* Connections */}
        <g stroke="#444" strokeWidth="2" fill="none">
          {/* Frontend to Gateway */}
          <path d="M 210 120 L 210 140 L 400 140 L 400 160" />
          <path d="M 590 120 L 590 140 L 400 140" />

          {/* Gateway to Services */}
          <path d="M 400 190 L 400 205 L 175 205 L 175 220" />
          <path d="M 400 190 L 400 220" />
          <path d="M 400 190 L 400 205 L 625 205 L 625 220" />

          {/* Services to DB */}
          <path d="M 175 260 L 175 300 L 300 300 L 300 340" />
          <path d="M 400 260 L 400 340" />
          <path d="M 625 260 L 625 300 L 500 300 L 500 340" />
        </g>

        {/* Animated flow dots */}
        <motion.circle r="3" fill="#fff" initial={{ y: 120, x: 210, opacity: 0 }} animate={{ y: 160, x: 400, opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0 }} />
        <motion.circle r="3" fill="#fff" initial={{ y: 190, x: 400, opacity: 0 }} animate={{ y: 220, x: 400, opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 1.5 }} />
        <motion.circle r="3" fill="#fff" initial={{ y: 260, x: 400, opacity: 0 }} animate={{ y: 340, x: 300, opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 2.5 }} />

      </svg>
    </div>
  )
}
