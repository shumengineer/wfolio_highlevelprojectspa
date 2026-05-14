import { Suspense, lazy } from 'react'
import type { ProjectData } from '../../data/projects'
import type { TechFocus } from '../FocusSelector'
import ScrollRevealBlock from './ScrollRevealBlock'
import CaseStudySection from './CaseStudySection'
import CaseStudyFooter from './CaseStudyFooter'
import ScrollProgressIndicator from './ScrollProgressIndicator'
import StoryNarrative from './StoryNarrative'

const ROLE_LABELS: Record<string, string> = {
  fullstack: 'Full-Stack',
  frontend: 'Frontend',
  backend: 'Backend',
  qa: 'Quality Assurance',
  devops: 'DevOps / Infra'
}

const ROLE_ORDER = ['fullstack', 'frontend', 'backend', 'qa', 'devops']

const DevOpsDiagram = lazy(() => import('../diagrams/DevOpsDiagram'))
const MigrationDiagram = lazy(() => import('../diagrams/MigrationDiagram'))
const ArchitectureDiagram = lazy(() => import('../diagrams/ArchitectureDiagram'))
const DatabaseDiagram = lazy(() => import('../diagrams/DatabaseDiagram'))
const TestingPyramidDiagram = lazy(() => import('../diagrams/TestingPyramidDiagram'))
const VPSPipelineDiagram = lazy(() => import('../diagrams/VPSPipelineDiagram'))
const AWSArchitectureDiagram = lazy(() => import('../diagrams/AWSArchitectureDiagram'))

interface Props {
  project: ProjectData
  activeFocus: TechFocus[]
}

export default function ProjectCaseStudy({ project, activeFocus }: Props) {
  // Filter sections based on active focus categories
  const visibleSections = project.sections.filter(s => activeFocus.includes(s.category))

  const renderDiagram = (type?: string) => {
    if (!type) return null

    const Diagram = () => {
      switch (type) {
        case 'devops':
          return <DevOpsDiagram />
        case 'migration':
          return <MigrationDiagram />
        case 'architecture':
          return <ArchitectureDiagram />
        case 'database':
          return <DatabaseDiagram />
        case 'testing-pyramid':
          return <TestingPyramidDiagram />
        case 'vps-pipeline':
          return <VPSPipelineDiagram />
        case 'aws-architecture':
          return <AWSArchitectureDiagram />
        default:
          return null
      }
    }

    return (
      <Suspense fallback={<div className="h-96 w-full animate-pulse bg-white/5 rounded-3xl" />}>
        <Diagram />
      </Suspense>
    )
  }

  return (
    <div className="relative animate-fade-in w-full bg-bg-base">
      <ScrollProgressIndicator />


      {/* Overview section */}
      <section className="pt-48 pb-32 px-6 sm:px-12 lg:px-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise z-0" />
        <div className="max-w-5xl mx-auto w-full relative z-10">
          <ScrollRevealBlock direction="up">
            <div className="mb-32">
              <div className="flex items-center gap-4 mb-12 opacity-30">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                <span className="text-journal-metadata">
                  Case Study · 0{project.id === 'stockpecker' ? '1' : '2'}
                </span>
              </div>
              <h1 className="text-journal-hero">
                {project.subtitle}
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 border-t border-white/[0.05] pt-16">
              {/* Metadata Sidebar */}
              <div className="lg:col-span-4 space-y-10">
                <div className="space-y-2">
                  <span className="text-journal-metadata">Project Timeline</span>
                  <p className="text-journal-body text-white/80">{project.timeline}</p>
                </div>

                {project.roleBadges && (
                  <div className="space-y-8 pt-4">
                    {ROLE_ORDER.map((category) => {
                      const badges = project.roleBadges?.[category as keyof typeof project.roleBadges]
                      if (!badges || badges.length === 0) return null
                      return (
                        <div key={category} className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="w-1 h-1 rounded-full bg-white/20" />
                            <span className="text-journal-metadata">
                              {ROLE_LABELS[category] || category}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {badges.map(badge => (
                              <span key={badge} className="mono-tag !text-[9px] !px-2.5 opacity-70 hover:opacity-100 transition-opacity">
                                {badge}
                              </span>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Narrative Content */}
              <div className="lg:col-span-8">
                <StoryNarrative content={project.overview} />
              </div>
            </div>
          </ScrollRevealBlock>
        </div>
      </section>

      {/* Case Study Sections */}
      <div className="px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
        {visibleSections.map((section, index) => (
          <CaseStudySection
            key={section.id}
            section={section}
            index={index}
            diagramElement={renderDiagram(section.diagramType)}
          />
        ))}
      </div>

      {/* Footer */}
      <section className="min-h-[80vh] flex items-center justify-center px-6 sm:px-12 lg:px-24">
        <CaseStudyFooter currentProjectId={project.id} />
      </section>
    </div>
  )
}
