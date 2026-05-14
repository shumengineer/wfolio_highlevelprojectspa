import { useState, useEffect } from 'react'

export function useScrollSpy(sectionIds: string[], offset = 150) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          let currentId = ''
          
          for (const id of sectionIds) {
            const element = document.getElementById(id)
            if (element) {
              const rect = element.getBoundingClientRect()
              // If the top of the element is above the middle of the screen
              if (rect.top <= window.innerHeight / 2 + offset) {
                currentId = id
              }
            }
          }
          
          if (currentId) {
            setActiveId(currentId)
          }
          ticking = false
        })
        ticking = true
      }
    }

    // Call once to set initial state
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sectionIds, offset])

  return activeId
}
