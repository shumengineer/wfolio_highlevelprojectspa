import { useState } from 'react'
import type { TechFocus } from './FocusSelector'

type View = 'work' | 'info' | 'case-study-01'

interface Props {
  currentView: View
  onViewChange: (view: View) => void
}

export default function WorkView({ onViewChange }: Props) {
  const [_focus, _setFocus] = useState<TechFocus[]>(['fullstack', 'qa', 'devops'])

  return (
    <>
      <div className="flex flex-col items-center text-center animate-fade-in px-6">
        <span className="text-xs font-bold tracking-widest uppercase text-text-muted mb-8 block">Selected Work '24–'25</span>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[5.5rem] leading-[1.1] font-medium tracking-tight max-w-4xl mb-10 text-glow">
          I build things that work while you're still deciding if they <span className="font-serif italic font-normal text-white">will.</span>
        </h1>

        <div className="text-text-muted text-sm sm:text-base md:text-lg space-y-1">
          <p>Full-stack engineer. Based in Warsaw, open to the world.</p>
          <p>Wrote first code at 9. First commercial project at 14.</p>
          <p>Exempted from every CS course at university — now I lecture in one.</p>
        </div>

        <div className="mt-16 sm:mt-20 text-text-muted/50 text-xl animate-bounce">↓</div>
      </div>

      <div className="mt-24 sm:mt-32 max-w-5xl mx-auto space-y-12 px-6">
      <button
        type="button"
        onClick={() => onViewChange('case-study-01')}
        className="w-full group text-left bg-surface hover:bg-surface-hover border border-border rounded-3xl p-8 transition-all duration-300 relative overflow-hidden flex flex-col items-start shadow-2xl"
      >
        <div className="flex justify-between w-full mb-4 z-10">
          <h2 className="text-2xl font-medium text-white">Rental Management Platform</h2>
          <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-300">→</span>
        </div>
        <p className="text-text-muted text-sm z-10">Solo project, '24 — Building the thing landlords actually needed.</p>

        <div className="w-full h-64 sm:h-80 mt-8 sm:mt-10 bg-black/50 border border-white/5 rounded-xl overflow-hidden relative z-10 flex items-center justify-center">
          <div className="w-3/4 h-3/4 border-t border-l border-border rounded-tl-lg bg-[#0f0f0f] shadow-2xl relative flex flex-col">
            <div className="h-6 border-b border-border flex items-center px-3 gap-1.5 bg-[#141414]">
              <div className="w-2 h-2 rounded-full bg-red-500/80"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500/80"></div>
              <div className="w-2 h-2 rounded-full bg-green-500/80"></div>
            </div>
            <div className="flex-1 flex items-center justify-center text-text-muted text-xs sm:text-sm italic">
              Platform Dashboard Preview
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </button>

      <div className="w-full text-left bg-surface border border-border rounded-3xl p-8 relative overflow-hidden flex flex-col items-start opacity-75 grayscale hover:grayscale-0 transition-all cursor-not-allowed">
        <div className="flex justify-between w-full mb-4">
          <h2 className="text-2xl font-medium text-white">Security Audit Framework</h2>
          <span className="text-text-muted">Coming Soon</span>
        </div>
        <p className="text-text-muted text-sm">Consulting, '24 — Turning manual audits into structured, repeatable systems.</p>
      </div>
      </div>
    </>
  )
}
