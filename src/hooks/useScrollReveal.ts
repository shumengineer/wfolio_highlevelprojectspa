import { useEffect, useRef, useState } from 'react'

export function useScrollReveal(options: IntersectionObserverInit & { retrigger?: boolean } = {}) {
  const { threshold = 0.15, rootMargin = '0px 0px -40px 0px', retrigger = false } = options
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
          if (!retrigger) {
            observer.disconnect()
          }
        } else if (retrigger) {
          setVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [hydrated, threshold, rootMargin, retrigger])

  return { ref, visible, hydrated }
}
