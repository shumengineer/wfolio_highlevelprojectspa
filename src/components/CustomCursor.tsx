import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const outerRingRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const cursorPositionRef = useRef({ x: 0, y: 0 })
  
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)
  const [hasMoved, setHasMoved] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if desktop and hydrated
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    setIsDesktop(!isTouchDevice)
    setIsHydrated(true)

    if (isTouchDevice) return

    let animationFrame: number
    const lerpFactor = 0.15 // Smooth following factor

    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY }
      
      if (!hasMoved) {
        setHasMoved(true)
        cursorPositionRef.current = { x: e.clientX, y: e.clientY }
        // Small delay before showing cursor
        setTimeout(() => setIsVisible(true), 100)
      }
    }

    const animateCursor = () => {
      // Calculate new position with LERP
      cursorPositionRef.current = {
        x: cursorPositionRef.current.x + (mousePositionRef.current.x - cursorPositionRef.current.x) * lerpFactor,
        y: cursorPositionRef.current.y + (mousePositionRef.current.y - cursorPositionRef.current.y) * lerpFactor
      }

      // Apply styles directly to DOM for performance (avoiding React re-renders 60fps)
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorPositionRef.current.x}px, ${cursorPositionRef.current.y}px) translate(-50%, -50%)`
      }
      if (outerRingRef.current) {
        outerRingRef.current.style.transform = `translate(${cursorPositionRef.current.x}px, ${cursorPositionRef.current.y}px) translate(-50%, -50%)`
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${cursorPositionRef.current.x}px, ${cursorPositionRef.current.y}px) translate(-50%, -50%)`
      }

      animationFrame = requestAnimationFrame(animateCursor)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = () => {
      setIsHovering(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mouseout', handleMouseOut)

    animationFrame = requestAnimationFrame(animateCursor)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mouseout', handleMouseOut)
    }
  }, [hasMoved])

  if (!isHydrated || !isDesktop || !hasMoved || !isVisible) return null

  return (
    <>
      {/* Glow effect - only visible when hovering */}
      <div
        ref={glowRef}
        className="fixed pointer-events-none z-[9997] mix-blend-screen will-change-transform"
        style={{
          visibility: isHovering ? 'visible' : 'hidden',
          left: 0,
          top: 0,
        }}
      >
        <div
          className="rounded-full bg-white/20 blur-xl"
          style={{
            width: '60px',
            height: '60px',
            opacity: isClicking ? 0.4 : 0.6,
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: isClicking ? 'scale(1.2)' : 'scale(1)',
          }}
        />
      </div>
      
      {/* Small macOS-like cursor dot */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] mix-blend-difference will-change-transform"
        style={{
          left: 0,
          top: 0,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease-out',
        }}
      >
        <div
          className="rounded-full bg-white"
          style={{
            width: isHovering ? '8px' : '6px',
            height: isHovering ? '8px' : '6px',
            opacity: isClicking ? 0.5 : 1,
            transition: 'all 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: isClicking ? 'scale(0.8)' : 'scale(1)',
          }}
        />
      </div>
      
      {/* Outer ring - follows with delay for dynamic effect */}
      <div
        ref={outerRingRef}
        className="fixed pointer-events-none z-[9998] mix-blend-difference will-change-transform"
        style={{
          left: 0,
          top: 0,
          opacity: isVisible ? 0.6 : 0,
          transition: 'opacity 0.3s ease-out',
        }}
      >
        <div
          className="rounded-full border border-white"
          style={{
            width: isHovering ? '32px' : '24px',
            height: isHovering ? '32px' : '24px',
            opacity: isClicking ? 0.3 : 0.6,
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: isClicking ? 'scale(0.9)' : 'scale(1)',
          }}
        />
      </div>
    </>
  )
}
