import { motion } from 'framer-motion'
import { useRef } from 'react'

export default function MigrationDiagram() {
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
        migration_plan.tf
      </div>

      <svg viewBox="0 0 800 350" className="w-full max-w-[800px] mt-8" style={{ minWidth: '600px' }} role="img">
        <title>Cloud Migration Diagram</title>
        
        {/* Background Grids */}
        <rect x="50" y="50" width="250" height="250" rx="8" fill="#141414" stroke="#ffffff" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="4 4" />
        <text x="175" y="40" fill="#ffffff" fillOpacity="0.4" fontSize="12" fontWeight="bold" textAnchor="middle" className="font-mono uppercase tracking-widest">Legacy AWS</text>

        <rect x="500" y="50" width="250" height="250" rx="8" fill="#141414" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="4 4" />
        <text x="625" y="40" fill="#ffffff" fillOpacity="0.4" fontSize="12" fontWeight="bold" textAnchor="middle" className="font-mono uppercase tracking-widest">Target GCP</text>

        {/* Nodes - AWS */}
        <g className="aws-nodes">
          <rect x="80" y="80" width="190" height="40" rx="4" fill="#1a1a1a" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="1" />
          <text x="175" y="105" fill="#fff" fontSize="12" textAnchor="middle" className="font-mono">EC2 Instances</text>

          <rect x="80" y="150" width="190" height="40" rx="4" fill="#1a1a1a" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="1" />
          <text x="175" y="175" fill="#fff" fontSize="12" textAnchor="middle" className="font-mono">RDS Database</text>

          <rect x="80" y="220" width="190" height="40" rx="4" fill="#1a1a1a" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="1" />
          <text x="175" y="245" fill="#fff" fontSize="12" textAnchor="middle" className="font-mono">S3 Storage</text>
        </g>

        {/* Nodes - GCP */}
        <g className="gcp-nodes">
          <rect x="530" y="80" width="190" height="40" rx="4" fill="#1a1a1a" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1" />
          <text x="625" y="105" fill="#fff" fontSize="12" textAnchor="middle" className="font-mono">GCE Compute</text>

          <rect x="530" y="150" width="190" height="40" rx="4" fill="#1a1a1a" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1" />
          <text x="625" y="175" fill="#fff" fontSize="12" textAnchor="middle" className="font-mono">CloudSQL</text>

          <rect x="530" y="220" width="190" height="40" rx="4" fill="#1a1a1a" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1" />
          <text x="625" y="245" fill="#fff" fontSize="12" textAnchor="middle" className="font-mono">Cloud Storage</text>
        </g>

        {/* Migration Arrows */}
        <g className="migration-arrows">
          {/* EC2 -> GCE */}
          <motion.path 
            d="M 270 100 L 530 100" 
            fill="none" 
            stroke="#444" 
            strokeWidth="2" 
            strokeDasharray="4 4"
          />
          <motion.path 
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
            d="M 270 100 L 530 100" 
            fill="none" 
            stroke="#ffffff" 
            strokeOpacity="0.6"
            strokeWidth="2"
          />

          {/* RDS -> CloudSQL */}
          <motion.path 
            d="M 270 170 L 530 170" 
            fill="none" 
            stroke="#444" 
            strokeWidth="2" 
            strokeDasharray="4 4"
          />
          <motion.path 
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 1.2 }}
            d="M 270 170 L 530 170" 
            fill="none" 
            stroke="#ffffff" 
            strokeOpacity="0.6"
            strokeWidth="2"
          />

          {/* S3 -> GCS */}
          <motion.path 
            d="M 270 240 L 530 240" 
            fill="none" 
            stroke="#444" 
            strokeWidth="2" 
            strokeDasharray="4 4"
          />
          <motion.path 
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 2.2 }}
            d="M 270 240 L 530 240" 
            fill="none" 
            stroke="#ffffff" 
            strokeOpacity="0.6"
            strokeWidth="2"
          />
        </g>

        {/* Animated Data Packets */}
        <motion.circle 
          r="4" fill="#ffffff" fillOpacity="0.6"
          initial={{ x: 270, y: 100, opacity: 0 }}
          animate={{ x: 530, opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1, delay: 0.5 }}
        />
        <motion.circle 
          r="4" fill="#ffffff" fillOpacity="0.6"
          initial={{ x: 270, y: 170, opacity: 0 }}
          animate={{ x: 530, opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1, delay: 1.5 }}
        />
        <motion.circle 
          r="4" fill="#ffffff" fillOpacity="0.6"
          initial={{ x: 270, y: 240, opacity: 0 }}
          animate={{ x: 530, opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1, delay: 2.5 }}
        />

        {/* Terraform Logo overlay */}
        <rect x="350" y="145" width="100" height="50" rx="8" fill="#1a1a1a" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="2" />
        <text x="400" y="175" fill="#ffffff" fillOpacity="0.6" fontSize="12" fontWeight="bold" textAnchor="middle" className="font-mono">Terraform</text>

      </svg>
    </div>
  )
}
