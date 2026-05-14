import { Link } from '@tanstack/react-router'
import type { ProjectData } from '../../data/projects'
import ScrollRevealBlock from './ScrollRevealBlock'

interface Props {
  projects: ProjectData[]
}

const PlaceholderGraphic = ({ id: _id }: { id: string }) => {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20" />
      <div className="w-64 h-64 border border-white/10 rounded-full flex items-center justify-center animate-[spin_25s_linear_infinite] group-hover:border-white/20 transition-colors duration-1000">
        <div className="w-48 h-48 border border-white/5 rounded-full flex items-center justify-center animate-[spin_20s_linear_infinite_reverse]">
          <div className="w-32 h-32 border border-white/5 rounded-full" />
        </div>
      </div>
    </div>
  )
}

const RoleBadge = ({ label, techs }: { label: string, techs: string[] }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-white" />
        <span className="text-sm font-bold tracking-widest uppercase text-white">
          {label}
        </span>
      </div>
      <div className="flex flex-wrap gap-2.5">
        {techs.map(tech => (
          <span 
            key={tech} 
            className="px-4 py-1.5 text-xs font-semibold bg-white/[0.07] text-white rounded-xl border border-white/10 group-hover:border-white/20 group-hover:bg-white/[0.12] transition-all"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function ProjectsOverview({ projects }: Props) {
  return (
    <div className="content-wide space-y-24 sm:space-y-32 pb-48 relative">
      {projects.map((project, i) => (
        <ScrollRevealBlock key={project.id} direction="up" delay={i * 0.1}>
          <Link
            to={`/projects/$projectId`}
            params={{ projectId: project.id }}
            className="group block relative w-full bg-surface border border-border rounded-[2rem] transition-all duration-700 hover:bg-surface-hover hover:-translate-y-2 overflow-hidden shadow-2xl"
          >
            {/* Visual Section */}
            <div className="relative w-full h-72 sm:h-96 border-b border-border bg-[#0a0a0a] overflow-hidden">
              {project.coverImage ? (
                <img 
                  src={project.coverImage} 
                  alt={project.title} 
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
                />
              ) : (
                <PlaceholderGraphic id={project.id} />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-60" />
            </div>

            {/* Content Section */}
            <div className="p-8 sm:p-12 md:p-16 relative z-10 flex flex-col xl:flex-row xl:items-start gap-12 justify-between bg-surface group-hover:bg-surface-hover transition-colors duration-700">
              <div className="space-y-6 flex-1">
                <div className="flex items-center gap-4">
                  <span className="text-journal-metadata">
                    {project.timeline}
                  </span>
                  <div className="w-8 h-px bg-white/10" />
                </div>

                <h3 className="text-3xl sm:text-5xl font-medium text-white group-hover:text-white/90 transition-colors tracking-tight leading-tight">
                  {project.title}
                </h3>

                <p className="text-journal-body text-text-muted/80 line-clamp-3 max-w-2xl">
                  {project.subtitle}
                </p>

                {/* Desktop Detailed Role Badges */}
                <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-white/[0.05]">
                  {project.roleBadges?.fullstack && (
                    <RoleBadge label="Full-Stack" techs={project.roleBadges.fullstack} />
                  )}
                  {project.roleBadges?.qa && (
                    <RoleBadge label="Quality Assurance" techs={project.roleBadges.qa} />
                  )}
                  {project.roleBadges?.devops && (
                    <RoleBadge label="DevOps / Infra" techs={project.roleBadges.devops} />
                  )}
                </div>
              </div>
              
              <div className="shrink-0 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-border bg-black/40 group-hover:bg-white group-hover:border-white transition-all duration-500 shadow-xl self-end xl:self-start">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/40 group-hover:text-black transition-colors" role="img">
                  <title>View Project Case Study</title>
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            
            {/* Subtle interactive accent */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-white/30 transition-colors duration-1000" />
          </Link>
        </ScrollRevealBlock>
      ))}
    </div>
  )
}
