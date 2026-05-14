import { useState, useEffect } from 'react'
import { clsx } from 'clsx'

interface Props {
  onBack: () => void
}

export default function CaseStudy({ onBack }: Props) {
  const [activeSection, setActiveSection] = useState('overview')

  // Minimal scrollspy logic for the sticky nav
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'highlights', 'context', 'the-problem', 'data-model']
      const threshold = window.innerHeight < 768 ? 150 : 300 // Responsive threshold for mobile
      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top >= 0 && rect.top <= threshold) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative animate-fade-in">
      <button
        type="button"
        onClick={onBack}
        className="absolute -top-16 left-0 bg-surface border border-border rounded-full px-5 py-2 text-sm text-text-main hover:bg-surface-hover transition-colors flex items-center gap-2 shadow-md"
      >
        ← Back
      </button>

      <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-20">
        <div className="flex-1 space-y-24 lg:space-y-40 pb-32 max-w-4xl px-6">
          <section id="overview" className="pt-10 text-center">
            <div className="w-12 h-12 rounded-full bg-surface border border-border mx-auto mb-6 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" role="img">
                <title>Building Icon</title>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <span className="text-xs font-bold tracking-widest uppercase text-text-muted mb-6 block">Rental Management Platform</span>
            <h1 className="text-4xl md:text-5xl font-medium leading-tight mb-24 max-w-3xl mx-auto">
              An end-to-end management experience built for the edges of Polish rental law.
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-12 text-left items-start mt-12 lg:mt-20 border-t border-border pt-8 lg:pt-12">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xs font-bold tracking-widest uppercase text-text-muted mb-2">My Role</h3>
                  <p className="text-sm text-text-main leading-relaxed">Full-stack engineer — Architecture, Database Design, Frontend, Backend, Payment Integration, Deployment</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold tracking-widest uppercase text-text-muted mb-2">Timeline & Status</h3>
                  <p className="text-sm text-text-main">3 months · In production</p>
                </div>
              </div>
              <div className="text-lg text-text-main leading-relaxed space-y-6">
                <p>Landlords in Poland manage their properties the same way they managed them twenty years ago: spreadsheets, WhatsApp groups, and manual bank transfers. Tenants have no visibility into anything — maintenance requests disappear, rent receipts don't exist, lease terms live in someone's email draft.</p>
                <p>I built the platform that fixes both sides simultaneously.</p>
                <p>End-to-end: tenant onboarding, lease management, automated rent collection, maintenance ticketing with photo uploads, role-based dashboards. GDPR-compliant. Self-hosted. No third-party vendor lock-in.</p>
                <p className="text-text-muted">The hardest part wasn't any single feature. It was designing a data schema flexible enough to handle the edge cases of Polish rental law while staying fast, clean, and maintainable by one person.</p>
              </div>
            </div>
          </section>

          <section id="context" className="pt-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-2 rounded-full bg-white"></div>
              <span className="text-xs font-bold tracking-widest uppercase text-text-muted">Context</span>
            </div>
            <h2 className="text-4xl font-medium mb-16">An opportunity to build what nobody had bothered to build well.</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-16">
              <h3 className="text-2xl font-medium">The market exists, but the tools don't.</h3>
              <p className="text-text-muted leading-relaxed">
                Every property management tool I looked at was either enterprise software (expensive, overcomplicated, built for agencies), or a spreadsheet template someone shared on a forum.
                <br /><br />
                The landlords I talked to wanted something in between: simple enough to use without a manual, powerful enough to handle real edge cases. That gap was the project.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <div className="bg-surface border border-border rounded-2xl p-8 shadow-lg">
                <div className="text-4xl text-white/20 font-serif mb-4">"</div>
                <p className="text-sm text-text-main leading-relaxed">"The enterprise software takes 3 days to set up and charges per unit. I just want to know if Apartment 4 paid their rent and log that I fixed their sink."</p>
                <p className="text-xs text-text-muted mt-6 uppercase tracking-wider">— Landlord Interview</p>
              </div>
              <div className="bg-surface border border-border rounded-2xl p-8 shadow-lg">
                <div className="text-4xl text-white/20 font-serif mb-4">"</div>
                <p className="text-sm text-text-main leading-relaxed">"I send rent to a bank account every month. I've never received a receipt. If the landlord loses their spreadsheet, I have no proof I paid."</p>
                <p className="text-xs text-text-muted mt-6 uppercase tracking-wider">— Tenant Interview</p>
              </div>
            </div>
          </section>

          <section id="the-problem" className="pt-10">
            <h2 className="text-4xl font-medium mb-16">This wasn't just a CRUD app.</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <h3 className="text-2xl font-medium">A pile-up of constraints.</h3>
              <div className="space-y-4">
                <p className="text-text-muted mb-6">The platform needed to handle:</p>

                <div className="bg-surface border border-border rounded-xl p-5 flex gap-4 items-center">
                  <span className="text-yellow-500 font-bold text-xl block w-6 text-center">§</span>
                  <p className="text-sm"><span className="text-white font-medium">Legal document generation.</span> Leases have to meet Polish civil code requirements.</p>
                </div>

                <div className="bg-surface border border-border rounded-xl p-5 flex gap-4 items-center">
                  <span className="text-white/40 font-bold text-xl block w-6 text-center">🔒</span>
                  <p className="text-sm"><span className="text-white font-medium">GDPR compliance.</span> Tenant personal data, storage, deletion rights.</p>
                </div>

                <div className="bg-surface border border-border rounded-xl p-5 flex gap-4 items-center">
                  <span className="text-green-500 font-bold text-xl block w-6 text-center">€</span>
                  <p className="text-sm"><span className="text-white font-medium">Payment edge cases.</span> Late fees, partial payments, currency rounding.</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <aside className="w-48 shrink-0 hidden lg:block sticky top-40 border-l border-border pl-6 py-2">
          <span className="text-[10px] font-bold tracking-widest uppercase text-text-muted mb-6 block">Contents</span>
          <ul className="space-y-5 text-sm font-medium">
            <li>
              <a href="#overview" className={clsx("transition-colors block relative", activeSection === 'overview' ? 'text-white' : 'text-text-muted hover:text-white')}>
                {activeSection === 'overview' && (
                  <span className="absolute -left-[30px] top-1.5 w-1.5 h-1.5 rounded-full bg-white"></span>
                )}
                Overview
              </a>
            </li>
            <li>
              <a href="#highlights" className={clsx("transition-colors block relative", activeSection === 'highlights' ? 'text-white' : 'text-text-muted hover:text-white')}>
                {activeSection === 'highlights' && (
                  <span className="absolute -left-[30px] top-1.5 w-1.5 h-1.5 rounded-full bg-white"></span>
                )}
                Highlights
              </a>
            </li>
            <li>
              <a href="#context" className={clsx("transition-colors block relative", activeSection === 'context' ? 'text-white' : 'text-text-muted hover:text-white')}>
                {activeSection === 'context' && (
                  <span className="absolute -left-[30px] top-1.5 w-1.5 h-1.5 rounded-full bg-white"></span>
                )}
                Context
              </a>
            </li>
            <li>
              <a href="#the-problem" className={clsx("transition-colors block relative", activeSection === 'the-problem' ? 'text-white' : 'text-text-muted hover:text-white')}>
                {activeSection === 'the-problem' && (
                  <span className="absolute -left-[30px] top-1.5 w-1.5 h-1.5 rounded-full bg-white"></span>
                )}
                The Problem
              </a>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  )
}
