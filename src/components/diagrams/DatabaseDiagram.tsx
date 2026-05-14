import { motion } from 'framer-motion'
import { useRef } from 'react'

export default function DatabaseDiagram() {
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
        ha_cluster.yaml
      </div>

      <svg viewBox="0 0 800 350" className="w-full max-w-[800px] mt-8" style={{ minWidth: '600px' }} role="img">
        <title>Database Architecture Diagram</title>
        
        {/* Entry Point */}
        <rect x="325" y="30" width="150" height="40" rx="4" fill="#1a1a1a" stroke="#fff" strokeWidth="2" />
        <text x="400" y="55" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle" className="font-mono">HAProxy</text>

        {/* PgBouncer */}
        <rect x="325" y="100" width="150" height="40" rx="4" fill="#1a1a1a" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1" />
        <text x="400" y="125" fill="#fff" fontSize="12" textAnchor="middle" className="font-mono">PgBouncer Pool</text>

        {/* Database Cluster Boundary */}
        <rect x="150" y="170" width="500" height="150" rx="8" fill="rgba(255,255,255,0.02)" stroke="#ffffff" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="4 4" />
        <text x="160" y="190" fill="#ffffff" fillOpacity="0.2" fontSize="10" className="font-mono uppercase tracking-widest">PostgreSQL HA Cluster</text>

        {/* Nodes */}
        <rect x="180" y="210" width="120" height="80" rx="4" fill="#1a1a1a" stroke="#ffffff" strokeOpacity="0.6" strokeWidth="2" />
        <text x="240" y="240" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle" className="font-mono">Master</text>
        <text x="240" y="260" fill="#888" fontSize="10" textAnchor="middle" className="font-mono">Read / Write</text>

        <rect x="340" y="210" width="120" height="80" rx="4" fill="#1a1a1a" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1" />
        <text x="400" y="240" fill="#fff" fontSize="12" textAnchor="middle" className="font-mono">Replica 1</text>
        <text x="400" y="260" fill="#888" fontSize="10" textAnchor="middle" className="font-mono">Read Only</text>

        <rect x="500" y="210" width="120" height="80" rx="4" fill="#1a1a1a" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1" />
        <text x="560" y="240" fill="#fff" fontSize="12" textAnchor="middle" className="font-mono">Replica 2</text>
        <text x="560" y="260" fill="#888" fontSize="10" textAnchor="middle" className="font-mono">Read Only</text>

        {/* etcd manager */}
        <rect x="680" y="230" width="80" height="40" rx="4" fill="#1a1a1a" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="1" />
        <text x="720" y="255" fill="#fff" fontSize="12" textAnchor="middle" className="font-mono">etcd</text>

        {/* Connections */}
        <g stroke="#444" strokeWidth="2" fill="none">
          <path d="M 400 70 L 400 100" />
          
          {/* To Master */}
          <path d="M 400 140 L 400 160 L 240 160 L 240 210" />
          
          {/* To Replicas */}
          <path d="M 400 140 L 400 210" strokeDasharray="2 2" />
          <path d="M 400 140 L 400 160 L 560 160 L 560 210" strokeDasharray="2 2" />

          {/* Replication connections */}
          <path d="M 300 250 L 340 250" stroke="#ffffff" strokeOpacity="0.1" strokeDasharray="4 4" />
          <path d="M 460 250 L 500 250" stroke="#ffffff" strokeOpacity="0.1" strokeDasharray="4 4" />
          
          {/* etcd health checks */}
          <path d="M 680 250 L 620 250" stroke="#ffffff" strokeOpacity="0.1" strokeDasharray="2 2" />
        </g>

        {/* Animated flow dots */}
        <motion.circle r="3" fill="#fff" initial={{ y: 70, x: 400, opacity: 0 }} animate={{ y: 100, x: 400, opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} />
        <motion.circle r="3" fill="#ffffff" fillOpacity="0.4" initial={{ y: 140, x: 400, opacity: 0 }} animate={{ y: 210, x: 240, opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 1 }} />
        
        {/* Replication flow */}
        <motion.circle r="2" fill="#ffffff" fillOpacity="0.2" initial={{ y: 250, x: 300, opacity: 0 }} animate={{ y: 250, x: 340, opacity: [0, 1, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0 }} />
        <motion.circle r="2" fill="#ffffff" fillOpacity="0.2" initial={{ y: 250, x: 460, opacity: 0 }} animate={{ y: 250, x: 500, opacity: [0, 1, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }} />

      </svg>
    </div>
  )
}
