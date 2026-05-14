import { motion } from 'framer-motion'
import { GITHUB_URL } from '../../lib/constants'

const tags = [
  'TanStack Start',
  'TanStack Router',
  'TanStack Query',
  'React 19',
  'TypeScript',
  'Framer Motion',
  'PostHog',
]

export default function ThisPortfolioCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="content-wide pb-24"
    >
      <div className="relative w-full rounded-[2rem] border border-white/[0.08] bg-surface overflow-hidden p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 group hover:border-white/20 transition-colors duration-500">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-white/25 transition-colors duration-700" />

        <div className="relative z-10 space-y-4 flex-1">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-text-muted">
              This Portfolio
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-medium text-white">
            Built with TanStack Start, Router &amp; Query
          </h3>
          <p className="text-sm text-text-muted leading-relaxed max-w-lg">
            This site itself is a production example of the full TanStack ecosystem — type-safe
            routing, server-side rendering via TanStack Start, and fine-grained async state via
            TanStack Query. Zero framework lock-in.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase bg-white/[0.05] text-white/60 rounded-md border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="relative z-10 shrink-0">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.07] border border-white/15 text-sm text-white/80 hover:bg-white/[0.12] hover:text-white hover:border-white/30 transition-all duration-300"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" role="img">
              <title>GitHub</title>
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            View on GitHub ↗
          </a>
        </div>
      </div>
    </motion.div>
  )
}
