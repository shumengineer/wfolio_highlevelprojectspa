import { motion } from 'framer-motion'
import { useMemo, useId } from 'react'

interface Props {
  text: string
  className?: string
  variant?: 'typing' | 'reveal' | 'slide-up' | 'random'
}

export default function SplitText({ text, className, variant = 'random' }: Props) {
  const baseId = useId()
  const isLong = text.length > 40
  const items = useMemo(() => isLong ? text.split(' ') : Array.from(text), [text, isLong])
  
  const selectedVariant = useMemo(() => {
    if (variant !== 'random') return variant
    const variants: ('typing' | 'reveal' | 'slide-up')[] = ['typing', 'reveal', 'slide-up']
    let hash = 0
    for (let i = 0; i < text.length; i++) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash)
    }
    return variants[Math.abs(hash) % variants.length]
  }, [variant, text])

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: isLong ? 0.05 : 0.02, 
        delayChildren: 0.05
      },
    },
  }

  const getChildVariants = () => {
    switch (selectedVariant) {
      case 'typing':
        return {
          visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
          hidden: { opacity: 0, y: 5 },
        }
      case 'slide-up':
        return {
          visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
          hidden: { opacity: 0, y: '20%' },
        }
      default:
        return {
          visible: { opacity: 1, transition: { duration: 0.4 } },
          hidden: { opacity: 0 },
        }
    }
  }

  const child = getChildVariants()

  return (
    <motion.div
      className={`flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-5% 0px" }}
    >
      {items.map((item, index) => (
        <motion.span
          variants={child}
          // biome-ignore lint/suspicious/noArrayIndexKey: Index is the only unique differentiator for static text split into characters
          key={`${baseId}-${index}`}
          className="inline-block whitespace-pre"
        >
          {item === " " ? "\u00A0" : item}
          {isLong && index < items.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </motion.div>
  )
}
