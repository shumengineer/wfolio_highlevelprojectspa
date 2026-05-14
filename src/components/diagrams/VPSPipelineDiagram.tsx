import { motion } from 'framer-motion'

interface Node {
  id: string
  label: string
  sub?: string
  x: number
  y: number
  accent?: string
}

const nodes: Node[] = [
  { id: 'gitlab', label: 'GitLab', sub: 'Self-hosted', x: 60, y: 140, accent: '#fc6d26' },
  { id: 'jenkins', label: 'Jenkins', sub: 'CI Orchestrator', x: 230, y: 140, accent: '#d33833' },
  { id: 'docker', label: 'Docker', sub: 'Build & Registry', x: 400, y: 140, accent: '#2496ed' },
  { id: 'k8s', label: 'K8s', sub: 'Test Pods', x: 570, y: 140, accent: '#326ce5' },
  { id: 'vps', label: 'Rocky Linux VPS', sub: 'Production', x: 700, y: 140, accent: '#10b981' },
]

// horizontal connections
const edges = [
  { x1: 140, y1: 155, x2: 230, y2: 155, delay: 0.3 },
  { x1: 310, y1: 155, x2: 400, y2: 155, delay: 1.2 },
  { x1: 480, y1: 155, x2: 570, y2: 155, delay: 2.1 },
  { x1: 650, y1: 155, x2: 700, y2: 155, delay: 3.0 },
]

const packets = [
  { x: 140, y: 155, tx: 230, delay: 0.6 },
  { x: 310, y: 155, tx: 400, delay: 1.5 },
  { x: 480, y: 155, tx: 570, delay: 2.4 },
  { x: 650, y: 155, tx: 700, delay: 3.3 },
]

export default function VPSPipelineDiagram() {
  return (
    <div className="p-4 sm:p-8 bg-[#0f0f0f] rounded-2xl border border-white/5 w-full overflow-hidden relative shadow-2xl">
      <div className="absolute top-4 left-4 flex gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
        <div className="w-2.5 h-2.5 rounded-full bg-white/30" />
      </div>
      <div className="text-[10px] text-text-muted absolute top-4 right-4 font-mono uppercase tracking-widest">
        Jenkinsfile
      </div>

      <svg
        viewBox="0 0 820 310"
        className="w-full max-w-[820px] mt-8 mx-auto"
        style={{ minWidth: '600px' }}
        role="img"
      >
        <title>VPS CI/CD Pipeline Diagram</title>

        {/* Track line (background) */}
        <line x1="60" y1="155" x2="780" y2="155" stroke="#ffffff" strokeOpacity="0.05" strokeWidth="2" />

        {/* Animated edge segments */}
        {edges.map((e) => (
          <motion.line
            key={`${e.x1}-${e.x2}`}
            x1={e.x1}
            y1={e.y1}
            x2={e.x1}
            y2={e.y2}
            stroke="#ffffff"
            strokeOpacity="0.25"
            strokeWidth="2"
            initial={{ x2: e.x1 }}
            whileInView={{ x2: e.x2 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeInOut', delay: e.delay }}
          />
        ))}

        {/* Nodes */}
        {nodes.map((n) => (
          <g key={n.id}>
            <rect
              x={n.x}
              y={n.y - 25}
              width={n.id === 'vps' ? 115 : 80}
              height={50}
              rx="6"
              fill="#141414"
              stroke={n.accent ?? '#ffffff'}
              strokeOpacity="0.5"
              strokeWidth="1.5"
            />
            <text
              x={n.x + (n.id === 'vps' ? 57 : 40)}
              y={n.y - 5}
              fill="#fff"
              fontSize="11"
              fontWeight="bold"
              textAnchor="middle"
              fontFamily="monospace"
            >
              {n.label}
            </text>
            {n.sub && (
              <text
                x={n.x + (n.id === 'vps' ? 57 : 40)}
                y={n.y + 13}
                fill="#ffffff"
                fillOpacity="0.4"
                fontSize="9"
                textAnchor="middle"
                fontFamily="monospace"
              >
                {n.sub}
              </text>
            )}
          </g>
        ))}

        {/* Animated packets */}
        {packets.map((p) => (
          <motion.circle
            key={`pkt-${p.x}`}
            r="4"
            fill="#ffffff"
            fillOpacity="0.8"
            initial={{ cx: p.x, cy: p.y, opacity: 0 }}
            animate={{ cx: p.tx, opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 3, delay: p.delay }}
          />
        ))}

        {/* Stage labels below track */}
        {[
          { x: 100, label: 'Push →\nTrigger' },
          { x: 270, label: 'Build\nPipeline' },
          { x: 440, label: 'Container\nImage' },
          { x: 610, label: 'Run\nTests' },
          { x: 757, label: 'Deploy' },
        ].map((l) => (
          <text key={l.x} x={l.x} y={220} fill="#ffffff" fillOpacity="0.3" fontSize="9" textAnchor="middle" fontFamily="monospace">
            {l.label.split('\n').map((line, i) => (
              <tspan key={line} x={l.x} dy={i === 0 ? 0 : 12}>{line}</tspan>
            ))}
          </text>
        ))}

        {/* Shell / Python scripts annotation */}
        <rect x="350" y="255" width="120" height="28" rx="4" fill="#1a1a1a" stroke="#ffffff" strokeOpacity="0.15" strokeWidth="1" />
        <text x="410" y="274" fill="#ffffff" fillOpacity="0.5" fontSize="9" textAnchor="middle" fontFamily="monospace">
          custom shell + python scripts
        </text>
      </svg>
    </div>
  )
}
