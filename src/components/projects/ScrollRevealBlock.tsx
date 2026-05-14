import type { ReactNode } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import clsx from 'clsx'

interface Props {
  children: ReactNode
  className?: string
  direction?: 'up' | 'left' | 'right' | 'none'
  delay?: number
  duration?: number
  staggerChildren?: boolean
  retrigger?: boolean
}

export default function ScrollRevealBlock({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  staggerChildren = false,
  retrigger = false
}: Props) {
  const { ref, visible, hydrated } = useScrollReveal({ retrigger })

  const getTransform = () => {
    if (!hydrated) return 'none'
    if (visible) return 'translate(0, 0)'
    switch (direction) {
      case 'up': return 'translateY(30px)'
      case 'left': return 'translateX(30px)'
      case 'right': return 'translateX(-30px)'
      default: return 'none'
    }
  }

  const baseStyle = {
    opacity: !hydrated ? 1 : visible ? 1 : 0,
    transform: getTransform(),
    filter: !hydrated ? 'blur(0)' : visible ? 'blur(0)' : 'blur(8px)',
    transition: `opacity ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, filter ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
  }

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={clsx('relative', staggerChildren && visible && 'stagger-children-active', className)}
      style={baseStyle}
    >
      {children}
    </div>
  )
}
