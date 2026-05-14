import { motion, AnimatePresence } from 'framer-motion'
import { clsx } from 'clsx'

export type TechFocus = 'fullstack' | 'qa' | 'devops'

const labels: Record<TechFocus, string> = {
  fullstack: 'Full-Stack',
  qa: 'QA',
  devops: 'DevOps',
}

interface Props {
  selection: TechFocus[]
  onToggle: (focus: TechFocus) => void
}

export default function FocusSelector({ selection, onToggle }: Props) {
  return (
    <div className="flex flex-col items-center gap-3 my-12 sm:my-16">
      <p className="text-[10px] text-text-muted/60 tracking-wide mb-1 select-none">
        filter by what matters to you
      </p>
      <div className="flex bg-surface p-0.5 rounded-full border border-border shadow-lg relative gap-0.5">
        {(['fullstack', 'qa', 'devops'] as TechFocus[]).map((type) => {
          const active = selection.includes(type)
          return (
            <button
              key={type}
              type="button"
              onClick={() => onToggle(type)}
              className={clsx(
                'relative px-3 sm:px-5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200 z-10 overflow-hidden',
                active ? 'text-white' : 'text-text-muted hover:text-white/70'
              )}
            >
              <AnimatePresence>
                {active && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute inset-0 bg-white/10 rounded-full -z-10 border border-white/10"
                  />
                )}
              </AnimatePresence>
              {labels[type]}
            </button>
          )
        })}
      </div>
    </div>
  )
}
