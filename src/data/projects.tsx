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
  diagramType?: 'devops' | 'migration' | 'architecture' | 'database'
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
    id: 'stockpecker',
    title: 'Stockpecker Modernization',
    subtitle: 'Rebuilding a legacy monolith for scale and stability.',
    role: 'Engineering',
    timeline: '2025–2026',
    techFocus: ['Next.js', 'Express', 'K8s', 'Playwright', 'Terraform'],
    roleBadges: {
      fullstack: ['Next.js', 'Express'],
      qa: ['Playwright', 'Matrix Testing'],
      devops: ['Terraform', 'Canary']
    },
    coverImage: '/project_materials/stockpecker_cover.png',
    overview: (
      <>
        The legacy platform required a structural overhaul to handle increasing traffic and maintainable growth. 
        I led a full rewrite, decoupling the data services from a highly interactive <W>Next.js</W> frontend. 
        I established a strict QA pipeline to prevent regressions and migrated the infrastructure using <W>Terraform</W> for reliable environmental consistency.
      </>
    ),
    sections: [
      {
        id: 'the-monolith',
        label: 'THE PROBLEM',
        heading: 'Identifying and resolving structural bottlenecks.',
        category: 'fullstack',
        image: '/project_materials/stockpecker_cover.png',
        content: (
          <div className="space-y-4">
            <p>
              I analyzed a monolithic architecture where long-running database queries frequently blocked the main event loop, impacting overall system availability. It was critical to separate the UI and background processing into independent units.
            </p>
            <p>
              The frontend was migrated to a standalone Next.js application, leveraging edge caching for performance. The backend services were rebuilt in Express with an optimized orchestration layer that offloaded heavy processing to asynchronous workers.
            </p>
            <p>
              This architectural shift significantly improved response times. I also implemented strict TypeScript boundaries to eliminate runtime errors that were common in the legacy system.
            </p>
          </div>
        )
      },
      {
        id: 'qa-matrix',
        label: 'TESTING AS INFRASTRUCTURE',
        heading: 'Ensuring stability through automated validation.',
        category: 'qa',
        content: (
          <div className="space-y-4">
            <p>
              To maintain high deployment frequency without risking quality, I introduced a comprehensive validation matrix using Playwright. Every pull request underwent automated testing across Chromium, Firefox, and WebKit.
            </p>
            <p>
              I targeted specific edge cases, including race conditions and network instability, to ensure the application remained resilient under suboptimal conditions. 
            </p>
            <p>
              Integrating this into the CI/CD pipeline provided the team with the necessary confidence to deploy updates frequently without manual oversight.
            </p>
          </div>
        ),
        quotes: [
          {
            text: "Reliable testing is not just about coverage; it is about verifying system behavior under stress.",
            author: "Engineering Documentation"
          }
        ]
      },
      {
        id: 'infrastructure-migration',
        label: 'THE MIGRATION',
        heading: 'Infrastructure as Code for predictable environments.',
        category: 'devops',
        diagramType: 'migration',
        content: (
          <div className="space-y-4">
            <p>
              I moved the entire stack from a fragmented AWS configuration to a standardized GCP environment defined entirely in Terraform. This enabled perfect environment replication for development, staging, and production.
            </p>
            <p>
              I implemented a canary rollout strategy, routing a small percentage of traffic to the new infrastructure while monitoring system health. This approach ensured a zero-downtime transition and resulted in a more cost-effective, maintainable infrastructure.
            </p>
          </div>
        )
      }
    ]
  },
  'fest-tickets': {
    id: 'fest-tickets',
    title: 'Fest Tickets Platform',
    subtitle: 'Architecting for extreme traffic volatility.',
    role: 'Engineering',
    timeline: '2024–2025',
    techFocus: ['SvelteKit', 'Deno2', 'NestJS', 'Stripe', 'k6'],
    roleBadges: {
      fullstack: ['SvelteKit', 'Stripe'],
      qa: ['k6 Load Tests', 'Validation'],
      devops: ['Deno', 'Observability']
    },
    coverImage: '/project_materials/festtickets_cover.png',
    overview: (
      <>
        Ticketing platforms face a unique challenge: they remain inactive for extended periods, followed by instantaneous, massive traffic spikes when events launch. 
        I engineered this system using <W>SvelteKit</W> and <W>Deno</W>, specifically designing the payment orchestration to handle high concurrency without data loss or duplicate transactions.
      </>
    ),
    sections: [
      {
        id: 'payment-integrity',
        label: 'Integrity',
        heading: 'Ensuring transactional consistency under load.',
        category: 'fullstack',
        diagramType: 'architecture',
        image: '/project_materials/festtickets_cover.png',
        content: (
          <div className="space-y-4">
            <p>
              During peak traffic, concurrent user requests and asynchronous webhooks can lead to data inconsistency. Relying on standard database operations without strict concurrency control is insufficient in these scenarios.
            </p>
            <p>
              I implemented an idempotent payment pipeline using cryptographic nonces. This ensured that regardless of how many times a webhook was retried or a user refreshed their browser, the system enforced exactly-once execution at the database level using atomic transactions.
            </p>
            <p>
              This architectural design eliminated race conditions in the checkout flow, maintaining absolute integrity throughout the payment lifecycle.
            </p>
          </div>
        )
      },
      {
        id: 'binary-protocol',
        label: 'Performance',
        heading: 'Optimizing data transfer with binary serialization.',
        category: 'fullstack',
        image: '/project_materials/festtickets_protocol.png',
        content: (
          <div className="space-y-4">
            <p>
              Capacity analysis revealed that parsing large JSON payloads for seat availability consumed significant CPU resources on the application workers.
            </p>
            <p>
              I replaced JSON polling with a custom binary serialization protocol. API responses were compiled into compressed binary structs, reducing payload sizes and CPU overhead. This change also improved security by enforcing strict data parsing on the server.
            </p>
          </div>
        )
      },
      {
        id: 'load-testing-k6',
        label: 'Validation',
        heading: 'Simulating high-concurrency scenarios.',
        category: 'qa',
        image: '/project_materials/festtickets_load.png',
        content: (
          <div className="space-y-4">
            <p>
              To prepare for production traffic, I conducted distributed load tests using k6, simulating tens of thousands of concurrent sessions. 
            </p>
            <p>
              These tests identified connection pool limits at 15,000 concurrent users. This allowed me to implement a Redis caching layer and optimize database configurations before the platform went live, ensuring stability under real-world conditions.
            </p>
          </div>
        ),
        cards: [
          { icon: '📊', title: 'Load Simulation', description: 'Validated system behavior up to 50k concurrent users.' },
          { icon: '⏱️', title: 'Latency Optimization', description: 'Maintained < 200ms p95 response times under peak load.' }
        ]
      },
      {
        id: 'analytics-engine',
        label: 'Observability',
        heading: 'Real-time sales analytics pipeline.',
        category: 'devops',
        diagramType: 'devops',
        image: '/project_materials/festtickets_analytics.jpg',
        content: (
          <div className="space-y-4">
            <p>
              Organizers required real-time sales visibility, but complex aggregation queries threatened the performance of the primary transactional database.
            </p>
            <p>
              I built an asynchronous analytics pipeline using Deno that processed database events out-of-band. This engine pre-computed dashboard metrics and pushed updates via WebSockets, providing accurate analytics without impacting the critical path of ticket sales.
            </p>
          </div>
        )
      }
    ]
  },
  'education-erp': {
    id: 'education-erp',
    title: 'Education ERP System',
    subtitle: 'Managing complex institutional state and permissions.',
    role: 'Engineering',
    timeline: '2023–2024',
    techFocus: ['Java Spring', 'Angular', 'PostgreSQL', 'HAProxy', 'CI/CD'],
    roleBadges: {
      fullstack: ['Angular', 'Spring Boot'],
      qa: ['E2E Scenarios', 'Automation'],
      devops: ['Postgres HA', 'HAProxy']
    },
    coverImage: '/project_materials/erp_cover.png',
    overview: (
      <>
        Academic systems involve complex state management across interdependent data structures. I led the development of an enterprise ERP designed for institutional scalability. 
        I architected a robust <W>Angular</W> frontend with <W>Server-Side Rendering (SSR)</W> and <W>lazy-loaded modules</W>, while hardening the data layer with a <W>Patroni</W> high-availability cluster to ensure continuous operation during peak enrollment cycles.
      </>
    ),
    sections: [
      {
        id: 'database-ha',
        label: 'Infrastructure',
        heading: 'High-availability infrastructure with automated failover.',
        category: 'devops',
        diagramType: 'database',
        content: (
          <div className="space-y-4">
            <p>
              During peak enrollment, the database is subjected to high-concurrency write operations as students register for courses. System downtime in this environment is unacceptable.
            </p>
            <p>
              I architected a PostgreSQL high-availability cluster managed by Patroni and etcd. This configuration enables automated failover, promoting a replica to master within seconds in the event of a node failure.
            </p>
            <p>
              I utilized PgBouncer and HAProxy for efficient connection pooling and routing, ensuring the database remained stable under intense load.
            </p>
          </div>
        )
      },
      {
        id: 'rbac-complexity',
        label: 'Security',
        heading: 'Dynamic permission evaluation engine.',
        category: 'fullstack',
        content: (
          <div className="space-y-4">
            <p>
              The existing permission system was inflexible, making it difficult to adapt to the nuanced realities of academic administration where user roles often overlap across different faculties and courses.
            </p>
            <p>
              I engineered a dynamic Role-Based Access Control (RBAC) engine. Permissions are evaluated at runtime based on the context of the requested resource rather than being stored as static flags.
            </p>
            <p>
              I implemented caching to maintain low request latency. This decoupling allows administrators to manage roles directly through the interface without requiring code changes or redeployments.
            </p>
          </div>
        )
      },
      {
        id: 'angular-performance',
        label: 'Frontend',
        heading: 'Performance optimization through SSR and Lazy Loading.',
        category: 'fullstack',
        content: (
          <div className="space-y-4">
            <p>
              To support institutional workflows on diverse hardware, I designed the Angular frontend with <W>lazy-loaded modules</W> to minimize initial payload size.
            </p>
            <p>
              I integrated <W>Server-Side Rendering (SSR)</W> to improve initial page load performance and ensure a highly responsive user experience across the entire application suite.
            </p>
          </div>
        )
      },
      {
        id: 'qa-automation',
        label: 'Automation',
        heading: 'Systematic validation of complex institutional workflows.',
        category: 'qa',
        content: (
          <div className="space-y-4">
            <p>
              In an ERP environment, localized bugs can lead to silent data corruption across independent modules. Unit tests alone were insufficient to validate these cross-domain interactions.
            </p>
            <p>
              I developed an end-to-end testing suite that simulated multi-actor workflows, such as course creation by an administrator followed by student enrollment and invoice generation.
            </p>
            <p>
              The following codebase fragments illustrate the implementation of these validation layers and the depth of system integration.
            </p>
          </div>
        ),
        carouselImages: [
          '/project_materials/erp_code_roles.png',
          '/project_materials/erp_code_auth.png',
          '/project_materials/erp_code_tests.png'
        ]
      }
    ]
  }
}

export const otherProjectsData: OtherProjectData[] = [
  {
    id: 'data-analytics-saas',
    title: 'Data Analytics SaaS',
    year: 'Active',
    description: 'Complex data analytics platform powered by ML.',
    tags: ['Go', 'Java Spring', 'ML', 'NextJS', 'Postgres', 'Redis']
  },
  {
    id: 'cloth-brand-erp',
    title: 'Production Resource Management',
    year: '2024',
    description: 'Internal ERP for a clothing brand distribution network.',
    tags: ['AWS', 'CI/CD', 'Go', 'Java Spring', 'Vue']
  },
  {
    id: 'ai-quiz-gen',
    title: 'AI-Quiz Generator MVP',
    year: '2024',
    description: 'Fine-tuned LLM system generating dynamic educational content.',
    tags: ['AI Integration', 'CI/CD', 'Python', 'SvelteKit']
  },
  {
    id: 'ecommerce-infra',
    title: 'E-commerce Infrastructure',
    year: '2025',
    description: 'Custom headless e-commerce backend for a large brand group.',
    tags: ['Java Spring', 'Microservices', 'NextJS', 'React']
  },
  {
    id: 'ai-media-parser',
    title: 'AI MediaParser',
    year: '2022–2023',
    description: 'Automated news parser, copywriter, and social media publisher.',
    tags: ['Python', 'WebSockets', 'Docker', 'AI']
  },
  {
    id: 'drm-stream',
    title: 'DRM-encrypted Streaming',
    year: '2023',
    description: 'Minimal, secure song streaming preview web app.',
    tags: ['Java Spring', 'Redis', 'SvelteKit']
  }
]
