import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center relative overflow-hidden bg-bg-base px-6">
      {/* Background Noise */}
      <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none" />
      
      {/* Ambient Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-center gap-4 mb-8 opacity-30">
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
            <span className="text-journal-metadata">Status 404</span>
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
          </div>

          <h1 className="text-journal-hero mb-8">
            The Requested Page Is Not Found
          </h1>
          
          <p className="text-journal-body mb-12 max-w-md mx-auto text-white/40">
            This entry does not exist in the journal. You might have followed a broken link or the page has been moved.
          </p>

          <Link
            to="/"
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full glass-morphism glass-morphism-hover border-white/10 text-sm font-medium text-white transition-all group"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            <span className="tracking-tight uppercase tracking-widest text-[11px] font-bold">Return to Index</span>
          </Link>
        </motion.div>
      </div>

      {/* Decorative lines */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-24 h-px bg-white/5 hidden lg:block" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-24 h-px bg-white/5 hidden lg:block" />
    </div>
  )
}
