import { useRef } from 'react'
import type { OtherProjectData } from '../../data/projects'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

interface Props {
  projects: OtherProjectData[]
}

export default function OtherProjectsGrid({ projects }: Props) {
  const targetRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  })

  // Dynamic calculation based on project count to ensure it works for any number of projects
  // We use -100% * (numProjects - visibleAmount) roughly. 
  // For 6 projects, moving -75% of the track width is a safe bet to show the last one.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(projects.length - 1) * 15}%`])
  
  const springX = useSpring(x, { stiffness: 100, damping: 30, restDelta: 0.001 })

  // Calculate dynamic height: 100vh for start + 50vh per additional project
  const dynamicHeight = `${100 + (projects.length * 40)}vh`



  return (
    <section
      ref={targetRef}
      className="bg-bg-base"
      style={{ height: dynamicHeight, position: 'relative' }}
    >
      {/* 
        Sticky viewport - we use pointer-events: none to ensure wheel events 
        always bubble up to the body, preventing scroll traps. 
      */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden pointer-events-none">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 pointer-events-auto">
          <h2 className="text-sm font-bold tracking-widest uppercase text-text-muted">
            Other Work
          </h2>
        </div>

        <motion.div
          style={{ x: springX }}
          className="flex gap-8 px-4 sm:px-6 lg:px-24 w-max will-change-transform pointer-events-auto"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="w-[300px] sm:w-[480px] bg-surface hover:bg-surface-hover border border-border rounded-[2rem] p-10 transition-colors duration-300 flex flex-col shrink-0 group relative overflow-hidden"
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

          {/* Right-edge breathing room */}
          <div className="w-[8vw] shrink-0" />
        </motion.div>
      </div>
    </section>
  )
}
