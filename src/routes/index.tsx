import { createFileRoute } from '@tanstack/react-router'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AdditionalHighlights from '../components/AdditionalHighlights'
import ProjectsOverview from '../components/projects/ProjectsOverview'
import OtherProjectsGrid from '../components/projects/OtherProjectsGrid'
import ThisPortfolioCTA from '../components/projects/ThisPortfolioCTA'
import { projectsData, otherProjectsData } from '../data/projects'

export const Route = createFileRoute('/')({
  component: Page,
  meta: () => [
    { title: 'Władysław Szumejko — Software Engineer' },
    { name: 'description', content: 'Professional portfolio of Władysław Szumejko, a software engineer based in Warsaw focused on building robust and secure applications.' },
    { name: 'keywords', content: 'software engineer, fullstack, qa, devops, warsaw, poland, portfolio' },
    { property: 'og:title', content: 'Władysław Szumejko — Software Engineer' },
    { property: 'og:description', content: 'Engineering robust and secure applications from Warsaw.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://wladyslawportfolio.wshm.eu' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
})

import EmailLink from '../components/EmailLink'

function Page() {
  // We convert the dictionary to an array for the overview
  const mainProjectsArray = [
    projectsData.stockpecker,
    projectsData['fest-tickets'],
    projectsData['education-erp']
  ]

  return (
    <div className="min-h-screen selection:bg-zinc-700 selection:text-white relative">
      <Navbar />

      <main>
        <Hero />
        <AdditionalHighlights />
        


        <div className="pt-20 pb-10 space-y-12">
          <div className="content-wide">
            <p className="text-sm font-mono text-text-muted opacity-60 max-w-2xl leading-relaxed">
              I have selected three projects that showcase my experience across QA, Full-stack development, and DevOps engineering
            </p>
          </div>
          <ProjectsOverview projects={mainProjectsArray} />
        </div>

        <ThisPortfolioCTA />

        <OtherProjectsGrid projects={otherProjectsData} />


        <section className="py-32 sm:py-48 text-center px-6 relative">
          <h2 className="text-3xl sm:text-4xl font-medium mb-8 sm:mb-12 max-w-4xl mx-auto leading-tight">
            I am available for new engineering challenges. Whether you need an experienced contributor or a dedicated partner for your next project, feel free to reach out.
          </h2>
          <EmailLink 
            email="hello@wshm.eu" 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-serif italic hover:text-text-muted transition-colors border-b-4 border-white pb-4"
          />
        </section>
      </main>

      <footer className="relative overflow-hidden border-t border-border mt-16 sm:mt-24 pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col md:flex-row justify-between items-end md:items-center text-xs sm:text-sm text-text-muted">
          <div>
            <p>© 2026 Władysław Szumejko. All Rights Reserved.</p>
          </div>
          <div className="text-right mt-4 md:mt-0">
            <p>Warsaw, Poland.</p>
          </div>
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-10">
          <span className="text-[15vw] font-serif italic whitespace-nowrap text-white leading-none font-medium">
            Władysław
          </span>
        </div>
      </footer>
    </div>
  )
}
