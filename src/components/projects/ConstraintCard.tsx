import type { ReactNode } from 'react'
import ScrollRevealBlock from './ScrollRevealBlock'

interface Props {
  icon: string | ReactNode
  title: string
  description: string
}

export default function ConstraintCard({ icon, title, description }: Props) {
  return (
    <ScrollRevealBlock className="glass-morphism glass-morphism-hover rounded-2xl p-6 flex gap-5 items-start">
      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-inner">
        <span className="text-2xl filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
          {icon}
        </span>
      </div>
      <div className="pt-1">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-1 h-1 rounded-full bg-accent" />
          <span className="text-white font-semibold block tracking-tight text-base">{title}</span>
        </div>
        <span className="text-text-muted text-sm leading-relaxed">{description}</span>
      </div>
    </ScrollRevealBlock>
  )
}
