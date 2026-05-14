import type { TimelineNodeData } from '../../data/projects'
import ScrollRevealBlock from './ScrollRevealBlock'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface Props {
  nodes: TimelineNodeData[]
}

export default function TimelineSection({ nodes }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  // The line draws down as you scroll
  const _pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])
  return (
    <div ref={containerRef} className="relative pl-6 sm:pl-8 py-8">
      {/* Animated Vertical Line */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-white/5">
        <motion.div 
          className="absolute top-0 left-0 w-full bg-white/20 origin-top"
          style={{ scaleY: scrollYProgress }}
        />
      </div>

      <div className="space-y-12">
        {nodes.map((node, i) => (
          <ScrollRevealBlock key={node.title} direction="up" delay={i * 0.1}>
            <div className="relative pl-12 sm:pl-16">
              {/* Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3 h-3 rounded-full bg-surface border-2 border-white/30" />
              
              <div className="flex flex-col gap-1">
                <span className="text-xs font-mono text-white/40 uppercase tracking-widest shrink-0">
                  {node.date}
                </span>
                <h4 className="text-lg font-medium text-white">
                  {node.title}
                </h4>
              </div>
              <div className="text-sm text-text-muted leading-relaxed">
                {node.description}
              </div>
            </div>
          </ScrollRevealBlock>
        ))}
      </div>
    </div>
  )
}
