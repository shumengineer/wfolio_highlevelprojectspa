import { motion } from 'framer-motion'

export default function AWSArchitectureDiagram() {
  return (
    <div className="p-4 sm:p-8 bg-[#0f0f0f] rounded-2xl border border-white/5 w-full overflow-hidden relative shadow-2xl">
      <div className="absolute top-4 left-4 flex gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
        <div className="w-2.5 h-2.5 rounded-full bg-white/30" />
      </div>
      <div className="text-[10px] text-text-muted absolute top-4 right-4 font-mono uppercase tracking-widest">
        main.tf (aws)
      </div>

      <svg
        viewBox="0 0 860 420"
        className="w-full max-w-[860px] mt-8 mx-auto"
        style={{ minWidth: '640px' }}
        role="img"
      >
        <title>AWS Architecture Diagram</title>
        <defs>
          <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#ffffff" fillOpacity="0.3" />
          </marker>
        </defs>

        {/* --- Row 1: Edge --- */}
        {/* Route53 */}
        <rect x="60" y="30" width="110" height="44" rx="6" fill="#141414" stroke="#ff9900" strokeOpacity="0.7" strokeWidth="1.5" />
        <text x="115" y="51" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">Route 53</text>
        <text x="115" y="65" fill="#fff" fillOpacity="0.4" fontSize="9" textAnchor="middle" fontFamily="monospace">DNS</text>

        {/* CloudFront */}
        <rect x="240" y="30" width="110" height="44" rx="6" fill="#141414" stroke="#ff9900" strokeOpacity="0.7" strokeWidth="1.5" />
        <text x="295" y="51" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">CloudFront</text>
        <text x="295" y="65" fill="#fff" fillOpacity="0.4" fontSize="9" textAnchor="middle" fontFamily="monospace">CDN + Cache</text>

        {/* S3 Static */}
        <rect x="420" y="30" width="110" height="44" rx="6" fill="#141414" stroke="#ff9900" strokeOpacity="0.5" strokeWidth="1.5" />
        <text x="475" y="51" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">S3</text>
        <text x="475" y="65" fill="#fff" fillOpacity="0.4" fontSize="9" textAnchor="middle" fontFamily="monospace">Static Assets</text>

        {/* --- Row 2: Load Balancer --- */}
        <rect x="240" y="130" width="320" height="44" rx="6" fill="#141414" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="2" />
        <text x="400" y="151" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="monospace">Application Load Balancer</text>
        <text x="400" y="165" fill="#fff" fillOpacity="0.4" fontSize="9" textAnchor="middle" fontFamily="monospace">ALB · SSL Termination · Health Checks</text>

        {/* --- Row 3: Compute --- */}
        {/* ASG label */}
        <rect x="170" y="230" width="460" height="90" rx="8" fill="none" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="5 4" />
        <text x="200" y="247" fill="#fff" fillOpacity="0.25" fontSize="9" fontFamily="monospace">AUTO SCALING GROUP</text>

        {/* EC2 instances */}
        {[0, 1, 2].map((i) => (
          <g key={`ec2-${i}`}>
            <rect x={190 + i * 140} y={258} width="110" height="44" rx="6" fill="#141414" stroke="#ff9900" strokeOpacity="0.4" strokeWidth="1" />
            <text x={245 + i * 140} y={278} fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">EC2</text>
            <text x={245 + i * 140} y={292} fill="#fff" fillOpacity="0.4" fontSize="9" textAnchor="middle" fontFamily="monospace">
              {i === 0 ? 'Next.js App' : i === 1 ? 'Express API' : 'Worker'}
            </text>
          </g>
        ))}

        {/* --- Row 4: Data --- */}
        {/* RDS */}
        <rect x="130" y="370" width="130" height="44" rx="6" fill="#141414" stroke="#4db33d" strokeOpacity="0.7" strokeWidth="1.5" />
        <text x="195" y="390" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">RDS</text>
        <text x="195" y="404" fill="#fff" fillOpacity="0.4" fontSize="9" textAnchor="middle" fontFamily="monospace">PostgreSQL · Multi-AZ</text>

        {/* ElastiCache */}
        <rect x="300" y="370" width="130" height="44" rx="6" fill="#141414" stroke="#dc382d" strokeOpacity="0.7" strokeWidth="1.5" />
        <text x="365" y="390" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">ElastiCache</text>
        <text x="365" y="404" fill="#fff" fillOpacity="0.4" fontSize="9" textAnchor="middle" fontFamily="monospace">Redis · Session Cache</text>

        {/* S3 Uploads */}
        <rect x="470" y="370" width="130" height="44" rx="6" fill="#141414" stroke="#ff9900" strokeOpacity="0.5" strokeWidth="1.5" />
        <text x="535" y="390" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">S3 Bucket</text>
        <text x="535" y="404" fill="#fff" fillOpacity="0.4" fontSize="9" textAnchor="middle" fontFamily="monospace">User Uploads</text>

        {/* IAM badge */}
        <rect x="660" y="370" width="100" height="44" rx="6" fill="#141414" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="1" />
        <text x="710" y="390" fill="#fff" fillOpacity="0.6" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">IAM</text>
        <text x="710" y="404" fill="#fff" fillOpacity="0.3" fontSize="9" textAnchor="middle" fontFamily="monospace">Roles + Policies</text>

        {/* --- Connections --- */}
        <g stroke="#ffffff" strokeOpacity="0.15" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)">
          {/* Route53 → CloudFront */}
          <path d="M 170 52 L 240 52" />
          {/* CloudFront → S3 */}
          <path d="M 350 52 L 420 52" />
          {/* CloudFront → ALB */}
          <path d="M 295 74 L 295 130" />
          {/* ALB → EC2s */}
          <path d="M 340 174 L 245 258" />
          <path d="M 400 174 L 400 258" />
          <path d="M 460 174 L 525 258" />
          {/* EC2s → RDS */}
          <path d="M 245 302 L 245 350 L 195 350 L 195 370" />
          {/* EC2s → ElastiCache */}
          <path d="M 385 302 L 385 350 L 365 350 L 365 370" />
          {/* EC2s → S3 */}
          <path d="M 525 302 L 525 350 L 535 350 L 535 370" />
        </g>

        {/* Animated request packet */}
        <motion.circle
          r="4"
          fill="#ff9900"
          fillOpacity="0.8"
          initial={{ cx: 60, cy: 52, opacity: 0 }}
          animate={{ cx: [60, 170, 295, 295, 400, 400, 365, 365], cy: [52, 52, 52, 130, 130, 258, 258, 370], opacity: [0, 1, 1, 1, 1, 1, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, repeatDelay: 2, ease: 'linear' }}
        />
      </svg>

      {/* Cost callout */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="mt-4 flex flex-wrap justify-center gap-4 text-[10px] font-mono text-white/30"
      >
        {['Reserved Instances (cost ↓)', 'S3 Intelligent-Tiering', 'Auto-scaling (min instances off-peak)', 'Spot Workers for batch'].map(item => (
          <span key={item} className="px-3 py-1 rounded border border-white/10 bg-white/[0.03]">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
