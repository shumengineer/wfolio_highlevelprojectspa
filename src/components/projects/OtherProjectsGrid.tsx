import { useRef, useState, useLayoutEffect } from 'react'
import type { OtherProjectData } from '../../data/projects'
import { motion, useScroll, useTransform } from 'framer-motion'

interface Props {
  projects: OtherProjectData[]
}

export default function OtherProjectsGrid({ projects }: Props) {
  const targetRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollRange, setScrollRange] = useState(0)

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  })

  useLayoutEffect(() => {
    const calculateScrollRange = () => {
      if (containerRef.current) {
        setScrollRange(containerRef.current.scrollWidth - window.innerWidth)
      }
    }

    calculateScrollRange()
    window.addEventListener('resize', calculateScrollRange)
    return () => window.removeEventListener('resize', calculateScrollRange)
  }, [])

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange])

  return (
    <section 
      ref={targetRef} 
      className="relative bg-bg-base"
      style={{ height: `calc(100vh + ${scrollRange}px + 200px)` }}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <h2 className="text-sm font-bold tracking-widest uppercase text-text-muted">
            Other Work
          </h2>
        </div>

        <motion.div 
          ref={containerRef}
          style={{ x }} 
          className="relative flex gap-8 px-4 sm:px-6 lg:px-24 w-max"
        >
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="w-[320px] sm:w-[500px] bg-surface hover:bg-surface-hover border border-border rounded-[2rem] p-10 transition-colors duration-300 flex flex-col shrink-0 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/[0.03] group-hover:to-white/[0.01] transition-colors duration-500 pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-8">
                  <h3 className="text-2xl font-medium text-white">{project.title}</h3>
                  <span className="text-xs font-mono text-text-muted opacity-60">{project.year}</span>
                </div>
                
                <p className="text-lg text-text-muted/80 mb-12 flex-1 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-3">
                  {project.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-4 py-1.5 text-[10px] font-bold tracking-widest uppercase bg-white/[0.05] text-white/70 rounded-md border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
          {/* Final padding at the end of the track */}
          <div className="w-[10vw] shrink-0" />
        </motion.div>
      </div>
    </section>
  )
}
