import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import type { CaseStudySectionData } from '../../data/projects'

interface Props {
  section: CaseStudySectionData
  index: number
  diagramElement?: React.ReactNode
}

export default function ArticleScrollSection({ section, index: _index, diagramElement }: Props) {
  const ref = useRef<HTMLElement>(null)

  // Track scroll progress for this section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  // Highlight opacity based on scroll position
  const highlightOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3])

  // Animation variants - one-time only
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  }

  return (
    <article
      ref={ref}
      id={section.id}
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3, margin: '-50px' }}
        style={{ opacity: textOpacity }}
      >
        {/* Section label with highlight */}
        <motion.div variants={itemVariants} className="mb-4">
          <motion.span
            style={{ opacity: highlightOpacity }}
            className="text-xs font-bold tracking-widest uppercase text-text-muted"
          >
            {section.label}
          </motion.span>
        </motion.div>

        {/* Heading with highlight */}
        <motion.h2
          variants={itemVariants}
          className="text-3xl sm:text-4xl md:text-5xl font-medium mb-8 leading-tight"
        >
          <motion.span
            style={{ opacity: highlightOpacity }}
            className="bg-gradient-to-r from-white/20 to-transparent bg-clip-text text-transparent"
          >
            {section.heading}
          </motion.span>
        </motion.h2>

        {/* Content */}
        <motion.div variants={itemVariants} className="space-y-8">
          <div className="text-lg sm:text-xl text-text-main leading-relaxed space-y-6">
            {section.content}
          </div>

          {/* Cards */}
          {section.cards && (
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8"
            >
              {section.cards.map((card) => (
                <motion.div
                  key={card.title}
                  variants={itemVariants}
                  className="p-6"
                >
                  <div className="text-3xl mb-4">{card.icon}</div>
                  <h3 className="text-lg font-medium mb-2">{card.title}</h3>
                  <p className="text-sm text-text-muted">{card.description}</p>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Quotes */}
          {section.quotes && (
            <motion.div variants={containerVariants} className="space-y-6 mt-8">
              {section.quotes.map((quote, _i) => (
                <motion.blockquote
                  key={quote.text}
                  variants={itemVariants}
                  className="pl-6 border-l-2 border-white/20"
                >
                  <p className="text-lg italic mb-4">"{quote.text}"</p>
                  <footer className="text-sm text-text-muted">— {quote.author}</footer>
                </motion.blockquote>
              ))}
            </motion.div>
          )}

          {/* Timeline */}
          {section.timeline && (
            <motion.div variants={containerVariants} className="mt-8 space-y-6">
              {section.timeline.map((node) => (
                <motion.div
                  key={node.title}
                  variants={itemVariants}
                  className="flex gap-4"
                >
                  <div className="shrink-0 w-24 pt-1">
                    <span className="text-xs font-bold tracking-wider uppercase text-text-muted">
                      {node.date}
                    </span>
                  </div>
                  <div className="flex-1 pb-6 border-l border-white/10 pl-6">
                    <h4 className="text-lg font-medium mb-2">{node.title}</h4>
                    <div className="text-text-muted">{node.description}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Diagram */}
        {diagramElement && (
          <motion.div
            variants={itemVariants}
            className="mt-12"
          >
            {diagramElement}
          </motion.div>
        )}
      </motion.div>
    </article>
  )
}
