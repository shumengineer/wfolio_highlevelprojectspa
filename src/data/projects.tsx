import type { ReactNode } from 'react'
import type { TechFocus } from '../components/FocusSelector'

export interface ProjectData {
  id: string
  title: string
  subtitle: string
  role: string
  timeline: string
  techFocus: string[]
  overview: ReactNode
  sections: CaseStudySectionData[]
  roleBadges?: {
    fullstack?: string[]
    frontend?: string[]
    backend?: string[]
    qa?: string[]
    devops?: string[]
  }
  coverImage?: string
}

export interface ConstraintCardData {
  icon: string | ReactNode
  title: string
  description: string
}

export interface QuoteData {
  text: string
  author: string
  variant?: 'default' | 'reddit'
}

export interface TimelineNodeData {
  date: string
  title: string
  description: ReactNode
}

export interface CaseStudySectionData {
  id: string
  label: string
  heading: string
  category: TechFocus
  content: ReactNode
  cards?: ConstraintCardData[]
  quotes?: QuoteData[]
  diagramType?: 'devops' | 'migration' | 'architecture' | 'database' | 'testing-pyramid' | 'vps-pipeline' | 'aws-architecture'
  timeline?: TimelineNodeData[]
  image?: string
  carouselImages?: string[]
}

export interface OtherProjectData {
  id: string
  title: string
  year: string
  description: string
  tags: string[]
}

export const W = ({ children }: { children: ReactNode }) => (
  <span className="text-text-main bg-white/[0.04] border border-white/[0.06] px-1.5 py-0.5 rounded-md font-medium tracking-tight whitespace-nowrap">
    {children}
  </span>
)

export const projectsData: Record<string, ProjectData> = {
  stockpecker: {
    id: '---',
    title: '---',
    subtitle: '---',
    role: '---',
    timeline: '---',
    techFocus: ['---'],
    roleBadges: {
      fullstack: ['---'],
      qa: ['---'],
      devops: ['---']
    },
    coverImage: '---',
    overview: (
      <>
        ---
      </>
    ),
    sections: [
      {
        id: '---',
        label: '---',
        heading: '---',
        category: 'fullstack',
        image: '---',
        content: (
          <div className="space-y-4">
            <p>
              ---
            </p>
            <p>
              ---
            </p>
            <p>
              ---
            </p>
          </div>
        )
      },
      {
        id: '---',
        label: '---',
        heading: '---',
        category: 'devops',
        diagramType: 'vps-pipeline',
        content: (
          <div className="space-y-4">
            <p>
              ---
            </p>
            <p>
              ---
            </p>
            <p>
              ---
            </p>
            <ul className="space-y-1 text-sm text-white/60 pl-4 border-l border-white/10">
              <li>• ---</li>
              <li>• ---</li>
              <li>• ---</li>
              <li>• ---</li>
            </ul>
          </div>
        )
      },
      {
        id: '---',
        label: '---',
        heading: '---',
        category: 'qa',
        diagramType: 'testing-pyramid',
        content: (
          <div className="space-y-4">
            <p>
              ---
            </p>
            <p>
              ---
            </p>
            <p>
              ---
            </p>
          </div>
        ),
        quotes: [
          {
            text: "---",
            author: "---"
          }
        ]
      },
      {
        id: '---',
        label: '---',
        heading: '---',
        category: 'devops',
        diagramType: 'aws-architecture',
        content: (
          <div className="space-y-4">
            <p>
              ---
            </p>
            <p>
              ---
            </p>
            <p>
              ---
            </p>
          </div>
        )
      },
      {
        id: '---',
        label: '---',
        heading: '---',
        category: 'devops',
        content: (
          <div className="space-y-4">
            <p>
              ---
            </p>
            <p>
              ---
            </p>
            <p>
              ---
            </p>
          </div>
        )
      },
      {
        id: '---',
        label: '---',
        heading: '---',
        category: 'devops',
        diagramType: 'migration',
        content: (
          <div className="space-y-4">
            <p>
              ---
            </p>
            <p>
              ---
            </p>
            <p>
              ---
            </p>
          </div>
        )
      }
    ]
  },
  'fest-tickets': {
    id: '---',
    title: '---',
    subtitle: '---',
    role: '---',
    timeline: '---',
    techFocus: ['---'],
    roleBadges: {
      fullstack: ['---'],
      qa: ['---'],
      devops: ['---']
    },
    coverImage: '---',
    overview: (
      <>
        ---
      </>
    ),
    sections: [
      {
        id: '---',
        label: '---',
        heading: '---',
        category: 'fullstack',
        diagramType: 'architecture',
        image: '---',
        content: (
          <div className="space-y-4">
            <p>
              ---
            </p>
            <p>
              ---
            </p>
            <p>
              ---
            </p>
          </div>
        )
      },
      {
        id: '---',
        label: '---',
        heading: '---',
        category: 'fullstack',
        image: '---',
        content: (
          <div className="space-y-4">
            <p>
              ---
            </p>
            <p>
              ---
            </p>
          </div>
        )
      },
      {
        id: '---',
        label: '---',
        heading: '---',
        category: 'qa',
        image: '---',
        content: (
          <div className="space-y-4">
            <p>
              ---
            </p>
            <p>
              ---
            </p>
          </div>
        ),
        cards: [
          { icon: '---', title: '---', description: '---' },
          { icon: '---', title: '---', description: '---' }
        ]
      },
      {
        id: '---',
        label: '---',
        heading: '---',
        category: 'devops',
        diagramType: 'devops',
        image: '---',
        content: (
          <div className="space-y-4">
            <p>
              ---
            </p>
            <p>
              ---
            </p>
          </div>
        )
      }
    ]
  },
  'education-erp': {
    id: '---',
    title: '---',
    subtitle: '---',
    role: '---',
    timeline: '---',
    techFocus: ['---'],
    roleBadges: {
      frontend: ['---'],
      backend: ['---'],
      qa: ['---'],
      devops: ['---']
    },
    coverImage: '---',
    overview: (
      <>
        ---
      </>
    ),
    sections: [
      {
        id: '---',
        label: '---',
        heading: '---',
        category: 'devops',
        diagramType: 'database',
        content: (
          <div className="space-y-4">
            <p>
              ---
            </p>
            <p>
              ---
            </p>
            <p>
              ---
            </p>
          </div>
        )
      },
      {
        id: '---',
        label: '---',
        heading: '---',
        category: 'fullstack',
        content: (
          <div className="space-y-4">
            <p>
              ---
            </p>
            <p>
              ---
            </p>
            <p>
              ---
            </p>
          </div>
        )
      },
      {
        id: '---',
        label: '---',
        heading: '---',
        category: 'fullstack',
        content: (
          <div className="space-y-4">
            <p>
              ---
            </p>
            <p>
              ---
            </p>
          </div>
        )
      },
      {
        id: '---',
        label: '---',
        heading: '---',
        category: 'qa',
        content: (
          <div className="space-y-4">
            <p>
              ---
            </p>
            <p>
              ---
            </p>
            <p>
              ---
            </p>
          </div>
        ),
        carouselImages: [
          '---',
          '---',
          '---'
        ]
      }
    ]
  }
}

export const otherProjectsData: OtherProjectData[] = [
  {
    id: '---',
    title: '---',
    year: '---',
    description: '---',
    tags: ['---']
  },
  {
    id: '---',
    title: '---',
    year: '---',
    description: '---',
    tags: ['---']
  },
  {
    id: '---',
    title: '---',
    year: '---',
    description: '---',
    tags: ['---']
  },
  {
    id: '---',
    title: '---',
    year: '---',
    description: '---',
    tags: ['---']
  },
  {
    id: '---',
    title: '---',
    year: '---',
    description: '---',
    tags: ['---']
  },
  {
    id: '---',
    title: '---',
    year: '---',
    description: '---',
    tags: ['---']
  }
]
