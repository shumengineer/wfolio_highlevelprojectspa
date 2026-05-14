import { createFileRoute } from '@tanstack/react-router'
import { projectsData } from '../../data/projects'
import ProjectCaseStudy from '../../components/projects/ProjectCaseStudy'
import CaseStudyNavbar from '../../components/projects/CaseStudyNavbar'
import { useState } from 'react'
import type { TechFocus } from '../../components/FocusSelector'
import { clsx } from 'clsx'

export const Route = createFileRoute('/projects/$projectId')({
  component: ProjectRoute,
  ssr: false,
  loader: ({ params }) => {
    const project = projectsData[params.projectId]
    if (!project) {
      throw new Error('Project not found')
    }
    return { project }
  },
  errorComponent: () => <div className="p-8 text-center mt-32">Project not found</div>
})

function ProjectRoute() {
  const { project } = Route.useLoaderData()
  
  // By default show all, or if a specific one is selected, show only that
  const [activeFilter, setActiveFilter] = useState<'all' | TechFocus>('all')

  const focusToPass: TechFocus[] = 
    activeFilter === 'all' 
      ? ['fullstack', 'qa', 'devops'] 
      : [activeFilter]

  return (
    <div className="min-h-screen selection:bg-zinc-700 selection:text-white relative bg-bg-base">
      <CaseStudyNavbar />
      
      <div className="pt-24 pb-4 flex justify-center sticky top-0 z-40 bg-bg-base/80 backdrop-blur-md border-b border-white/[0.05]">
        <div className="flex bg-surface p-1 rounded-full border border-border shadow-lg gap-1">
          {(['all', 'fullstack', 'qa', 'devops'] as const).map((filterOpt) => {
            const active = activeFilter === filterOpt
            const label = filterOpt === 'all' ? 'View All' : 
                          filterOpt === 'fullstack' ? 'Full-Stack' :
                          filterOpt === 'qa' ? 'QA' : 'DevOps'
            return (
              <button
                type="button"
                key={filterOpt}
                onClick={() => setActiveFilter(filterOpt)}
                className={clsx(
                  'px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300',
                  active ? 'bg-white/10 text-white' : 'text-text-muted hover:text-white/70 hover:bg-white/5'
                )}
              >
                {label}
              </button>
            )
          })}
        </div>
      </div>

      <ProjectCaseStudy project={project} activeFocus={focusToPass} />
    </div>
  )
}
