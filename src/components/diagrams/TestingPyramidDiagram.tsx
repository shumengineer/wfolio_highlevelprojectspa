import { motion } from 'framer-motion'

const layers = [
  {
    label: 'Security Audit Pipeline',
    sublabel: 'SAST · Dependency Scan · Container Scan',
    width: '30%',
    color: '#ef4444',
    opacity: 'cc',
    delay: 0,
  },
  {
    label: 'E2E Testing — Playwright',
    sublabel: 'Chromium · Firefox · WebKit (parallel K8s pods)',
    width: '50%',
    color: '#f97316',
    opacity: 'bb',
    delay: 0.15,
  },
  {
    label: 'Integration Tests',
    sublabel: 'API contracts · DB transactions · service boundaries',
    width: '70%',
    color: '#eab308',
    opacity: 'aa',
    delay: 0.3,
  },
  {
    label: 'Unit Tests',
    sublabel: 'Pure functions · component logic · utils',
    width: '90%',
    color: '#22c55e',
    opacity: '99',
    delay: 0.45,
  },
]

const runners = ['Chromium Pod', 'Firefox Pod', 'WebKit Pod', 'Security Pod']

export default function TestingPyramidDiagram() {
  return (
    <div className="p-4 sm:p-8 bg-[#0f0f0f] rounded-2xl border border-white/5 w-full overflow-hidden relative shadow-2xl">
      <div className="absolute top-4 left-4 flex gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
        <div className="w-2.5 h-2.5 rounded-full bg-white/30" />
      </div>
      <div className="text-[10px] text-text-muted absolute top-4 right-4 font-mono uppercase tracking-widest">
        test_strategy.yml
      </div>

      {/* Pyramid layers */}
      <div className="flex flex-col items-center gap-1.5 mt-12 mb-8">
        {layers.map((layer) => (
          <motion.div
            key={layer.label}
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: layer.delay }}
            style={{ width: layer.width }}
            className="relative flex flex-col items-center justify-center text-center rounded-lg py-3 px-4 border border-white/[0.08]"
          >
            {/* coloured glow backing */}
            <div
              className="absolute inset-0 rounded-lg opacity-10"
              style={{ backgroundColor: layer.color }}
            />
            <span className="relative text-xs sm:text-sm font-semibold text-white z-10">
              {layer.label}
            </span>
            <span className="relative text-[10px] text-white/50 font-mono mt-0.5 z-10">
              {layer.sublabel}
            </span>
          </motion.div>
        ))}
      </div>

      {/* K8s parallel runner bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="border-t border-white/[0.06] pt-6 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest text-white/30">
          Kubernetes Parallel Runners
        </span>
        <div className="flex flex-wrap justify-center gap-3">
          {runners.map((r, i) => (
            <motion.div
              key={r}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.04] border border-white/10"
            >
              {/* animated pulse dot */}
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-green-400"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.4 }}
              />
              <span className="text-[11px] font-mono text-white/60">{r}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
