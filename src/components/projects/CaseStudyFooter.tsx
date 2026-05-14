import { Link } from '@tanstack/react-router'
import { projectsData } from '../../data/projects'
import ScrollRevealBlock from './ScrollRevealBlock'
import EmailLink from '../EmailLink'

interface Props {
  currentProjectId: string
}

export default function CaseStudyFooter({ currentProjectId }: Props) {
  const projectKeys = ['stockpecker', 'fest-tickets', 'education-erp']
  const currentIndex = projectKeys.indexOf(currentProjectId)
  
  const prevProjectKey = currentIndex > 0 ? projectKeys[currentIndex - 1] : null
  const nextProjectKey = currentIndex < projectKeys.length - 1 ? projectKeys[currentIndex + 1] : null

  const prevProject = prevProjectKey ? projectsData[prevProjectKey] : null
  const nextProject = nextProjectKey ? projectsData[nextProjectKey] : null

  return (
    <div className="mt-32 pt-16 border-t border-border flex flex-col items-center relative">
      
      {/* Project Navigation */}
      <div className="w-full flex items-center justify-between gap-4 mb-32">
        <div className="flex-1 flex justify-start">
          {prevProject && (
            <Link 
              to={`/projects/$projectId`} 
              params={{ projectId: prevProject.id }}
              className="group flex flex-col items-start gap-2 hover:opacity-80 transition-opacity"
            >
              <span className="text-xs font-mono uppercase tracking-widest text-text-muted flex items-center gap-2">
                <span className="transition-transform group-hover:-translate-x-1">←</span> Previous
              </span>
              <span className="text-xl sm:text-2xl font-medium text-white">
                {prevProject.title}
              </span>
            </Link>
          )}
        </div>
        
        <div className="flex-1 flex justify-end text-right">
          {nextProject && (
            <Link 
              to={`/projects/$projectId`} 
              params={{ projectId: nextProject.id }}
              className="group flex flex-col items-end gap-2 hover:opacity-80 transition-opacity"
            >
              <span className="text-xs font-mono uppercase tracking-widest text-text-muted flex items-center gap-2">
                Next <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
              <span className="text-xl sm:text-2xl font-medium text-white">
                {nextProject.title}
              </span>
            </Link>
          )}
        </div>
      </div>

      {/* CTA */}
      <ScrollRevealBlock direction="up" className="text-center pb-24 max-w-4xl">
        <h2 className="text-2xl sm:text-3xl font-medium mb-8 sm:mb-12 text-white leading-tight">
          I am available for new engineering challenges. Whether you need an experienced contributor or a dedicated partner for your next project, feel free to reach out.
        </h2>
        <EmailLink 
          email="hello@wshm.eu" 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif italic text-text-main hover:text-text-muted transition-colors border-b-2 sm:border-b-4 border-white pb-2 sm:pb-4"
        />
      </ScrollRevealBlock>

    </div>
  )
}
