import type React from 'react'
import { Suspense, useEffect, useRef, useState, useMemo } from 'react'
import type { TechFocus } from './FocusSelector'

const DevOpsDiagram = React.lazy(() => import('./diagrams/DevOpsDiagram'))

const ImageSkeleton = () => (
  <div className="aspect-video bg-surface/50 rounded-2xl border border-border animate-pulse" />
)

interface ProjectSection {
  id: string
  type: TechFocus
  title: string
  description: string
  images: string[]
  diagram?: React.ReactNode
}

interface ProjectProps {
  id: string
  name: string
  activeFocus: TechFocus[]
  sections: ProjectSection[]
}

const SECTION_ORDER: TechFocus[] = ['fullstack', 'qa', 'devops']

export default function ProjectCard({ name, activeFocus, sections }: ProjectProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const sortedSections = useMemo(() => {
    return [...sections]
      .sort((a, b) => SECTION_ORDER.indexOf(a.type) - SECTION_ORDER.indexOf(b.type))
      .filter(s => activeFocus.includes(s.type))
  }, [sections, activeFocus])

  if (sortedSections.length === 0) return null

  return (
    <section ref={ref} className={`w-full py-24 sm:py-32 border-t border-border scroll-reveal ${isVisible ? 'visible' : ''}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight mb-12 sm:mb-20">{name}</h2>
        
        <div className="space-y-24 sm:space-y-32 lg:space-y-40">
          {sortedSections.map((section, idx) => (
            <div 
              key={section.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start ${isVisible ? 'scroll-reveal visible' : ''}`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="lg:col-span-4 lg:sticky lg:top-40">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-muted mb-3 sm:mb-4 block">
                  {section.type}
                </span>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-medium mb-4 sm:mb-6">{section.title}</h3>
                <p className="text-sm sm:text-base text-text-muted leading-relaxed whitespace-pre-line">
                  {section.description}
                </p>
              </div>

              <div className="lg:col-span-8 space-y-8 sm:space-y-12">
                {section.images.map((img) => (
                  <div key={img} className="aspect-video bg-surface rounded-2xl border border-border overflow-hidden relative group">
                    <Suspense fallback={<ImageSkeleton />}>
                      <img 
                        src={img} 
                        alt="" 
                        loading="lazy" 
                        decoding="async"
                        width="1280"
                        height="720"
                        className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
                      />
                    </Suspense>
                  </div>
                ))}
                {section.type === 'devops' && (
                  <Suspense fallback={<div className="h-48 sm:h-64 bg-surface animate-pulse rounded-2xl" />}>
                    <DevOpsDiagram />
                  </Suspense>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
