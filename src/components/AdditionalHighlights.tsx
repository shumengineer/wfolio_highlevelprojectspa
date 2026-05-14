import { useEffect, useRef, useState, type ReactNode } from 'react'

interface Fact {
  label: string
  content: ReactNode
}

const W = ({ children }: { children: ReactNode }) => (
  <span className="text-text-main bg-white/[0.04] border border-white/[0.06] px-1.5 py-0.5 rounded-md font-medium tracking-tight whitespace-nowrap">
    {children}
  </span>
)

const facts: Fact[] = [
  {
    label: "student",
    content: (
      <>
        <W>Exempted from all programming subjects</W> with top marks.
        Runs <W>lectures</W> at his uni's science club.
      </>
    ),
  },
  {
    label: "security",
    content: (
      <>
        Years of <W>CTFs</W>, <W>HackTheBox</W>, and <W>reverse-engineering</W> workshops.
        Co-owns a security community — tracked the <W>Axios vulnerability</W> before it hit news.
      </>
    ),
  },
  {
    label: "productivity",
    content: (
      <>
        Treated personal workflow like a system to optimize.
        Hundreds of hours of research, own data, own metrics. ~<W>89% productivity</W> is the baseline.
      </>
    ),
  },
  {
    label: "product",
    content: (
      <>
        Doesn't ship features. <W>Ships outcomes.</W> Every decision starts with <W>why it matters to the user</W>.
      </>
    ),
  },
]

function useScrollReveal() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [hydrated])

  return { ref, visible, hydrated }
}

export default function AdditionalHighlights() {
  const { ref, visible, hydrated } = useScrollReveal()

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="max-w-5xl mx-auto px-4 sm:px-6 pt-16 pb-8 sm:pt-24 sm:pb-12 relative"
    >
      <ul className="space-y-6 sm:space-y-5">
        {facts.map((fact, i) => (
          <li
            key={fact.label}
            className="group"
            style={{
              opacity: !hydrated ? 1 : visible ? 1 : 0,
              transform: !hydrated ? 'none' : visible ? 'translateY(0)' : 'translateY(24px)',
              transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s`,
            }}
          >
            <span className="block text-xs sm:text-sm uppercase tracking-[0.15em] text-white font-semibold mb-1.5">
              {fact.label}
            </span>
            <p className="text-sm sm:text-base text-text-muted leading-relaxed transition-colors duration-300 group-hover:text-white/80">
              {fact.content}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
