import { motion } from 'framer-motion'
import { useRef } from 'react'

export default function DevOpsDiagram() {
  const constraintsRef = useRef(null)

  return (
    <div 
      className="p-4 sm:p-8 bg-[#0f0f0f] rounded-2xl border border-white/5 flex flex-col items-center justify-center min-h-[400px] w-full overflow-hidden relative shadow-2xl"
      ref={constraintsRef}
    >
      <div className="absolute top-4 left-4 flex gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-white/10 shadow-[0_0_6px_rgba(255,255,255,0.05)]"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-white/20 shadow-[0_0_6px_rgba(255,255,255,0.1)]"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-white/30 shadow-[0_0_6px_rgba(255,255,255,0.15)]"></div>
      </div>
      
      <div className="text-[10px] text-text-muted absolute top-4 right-4 font-mono uppercase tracking-widest">
        pipeline.yml
      </div>

      <svg viewBox="0 0 800 300" className="w-full max-w-[800px] mt-8" style={{ minWidth: '600px' }} role="img">
        <title>DevOps Pipeline Diagram</title>
        <defs>
          <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <filter id="blur">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        {/* Base Nodes */}
        <g className="nodes">
          {/* GitLab */}
          <rect x="50" y="120" width="100" height="60" rx="8" fill="#141414" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="2" />
          <text x="100" y="155" fill="#fff" fontSize="14" fontWeight="bold" textAnchor="middle" className="font-mono">GitLab</text>
          
          {/* Jenkins */}
          <rect x="250" y="120" width="100" height="60" rx="8" fill="#141414" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="2" />
          <text x="300" y="155" fill="#fff" fontSize="14" fontWeight="bold" textAnchor="middle" className="font-mono">Jenkins</text>

          {/* Test Matrix */}
          <rect x="420" y="70" width="160" height="160" rx="8" fill="none" stroke="#ffffff" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="4 4" />
          <text x="500" y="90" fill="#888" fontSize="10" textAnchor="middle" className="font-mono uppercase tracking-widest">Test Matrix</text>
          
          <rect x="450" y="100" width="100" height="30" rx="4" fill="#1a1a1a" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="1" />
          <text x="500" y="120" fill="#ffffff" fillOpacity="0.6" fontSize="12" textAnchor="middle" className="font-mono">Chromium</text>
          
          <rect x="450" y="140" width="100" height="30" rx="4" fill="#1a1a1a" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="1" />
          <text x="500" y="160" fill="#ffffff" fillOpacity="0.6" fontSize="12" textAnchor="middle" className="font-mono">Firefox</text>
          
          <rect x="450" y="180" width="100" height="30" rx="4" fill="#1a1a1a" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="1" />
          <text x="500" y="200" fill="#ffffff" fillOpacity="0.6" fontSize="12" textAnchor="middle" className="font-mono">WebKit</text>

          {/* K8s */}
          <rect x="650" y="120" width="100" height="60" rx="8" fill="#141414" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="2" />
          <text x="700" y="155" fill="#fff" fontSize="14" fontWeight="bold" textAnchor="middle" className="font-mono">K8s</text>
        </g>

        {/* Animated Paths */}
        <g className="paths">
          {/* Git to Jenkins */}
          <motion.path 
            d="M 150 150 L 250 150" 
            fill="none" 
            stroke="#ffffff" 
            strokeOpacity="0.1"
            strokeWidth="2"
          />
          <motion.path 
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
            d="M 150 150 L 250 150" 
            fill="none" 
            stroke="#fff" 
            strokeWidth="2"
          />
          
          {/* Jenkins to Matrix */}
          <motion.path 
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 2 }}
            d="M 350 150 L 420 150" 
            fill="none" 
            stroke="#fff" 
            strokeWidth="2"
          />
          
          {/* Matrix to K8s */}
          <motion.path 
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 3.5 }}
            d="M 580 150 L 650 150" 
            fill="none" 
            stroke="#ffffff" 
            strokeOpacity="0.4"
            strokeWidth="2"
          />
        </g>

        {/* Animated Packets */}
        <motion.circle 
          r="4" 
          fill="#fff"
          initial={{ x: 150, y: 150, opacity: 0 }}
          animate={{ x: 250, opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 2, delay: 1 }}
        />
        
        <motion.circle 
          r="4" 
          fill="#ffffff"
          initial={{ x: 580, y: 150, opacity: 0 }}
          animate={{ x: 650, opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 2, delay: 4 }}
        />
      </svg>
    </div>
  )
}
