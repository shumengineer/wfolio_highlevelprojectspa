import { useScrollSpy } from '../../hooks/useScrollSpy'
import type { CaseStudySectionData } from '../../data/projects'
import clsx from 'clsx'

interface Props {
  sections: CaseStudySectionData[]
}

export default function CaseStudySidebar({ sections }: Props) {
  const sectionIds = sections.map(s => s.id)
  const activeId = useScrollSpy(sectionIds, 150)

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <aside className="w-48 shrink-0 hidden lg:block sticky top-32 border-l border-border pl-6 py-2 self-start">
      <span className="text-[10px] font-bold tracking-widest uppercase text-text-muted mb-6 block">
        Contents
      </span>
      <ul className="space-y-5 text-sm font-medium">
        {sections.map((section) => {
          const isActive = activeId === section.id
          
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onClick={(e) => scrollToSection(e, section.id)}
                className={clsx(
                  'transition-colors block relative duration-300',
                  isActive ? 'text-white' : 'text-text-muted hover:text-white'
                )}
              >
                {isActive && (
                  <span className="absolute -left-[30px] top-1.5 w-1.5 h-1.5 rounded-full bg-white animate-fade-in" />
                )}
                {section.label}
              </a>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
