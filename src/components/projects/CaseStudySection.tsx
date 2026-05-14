import type React from 'react'
import type { CaseStudySectionData } from '../../data/projects'
import ConstraintCard from './ConstraintCard'
import QuoteCard from './QuoteCard'
import TimelineSection from './TimelineSection'
import SplitText from './SplitText'
import StoryNarrative from './StoryNarrative'
import { motion } from 'framer-motion'

interface Props {
  section: CaseStudySectionData
  index: number
  diagramElement?: React.ReactNode
}

export default function CaseStudySection({ section, index, diagramElement }: Props) {
  return (
    <section id={section.id} className="relative py-12 sm:py-20 first:pt-0">
      <div className="content-wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          
          <div className="lg:col-span-3 lg:sticky lg:top-40">
            {section.quotes && (
              <div className="space-y-12 hidden lg:block opacity-60 hover:opacity-100 transition-opacity duration-500">
                {section.quotes.map((quote) => (
                  <QuoteCard key={quote.text} {...quote} />
                ))}
              </div>
            )}
          </div>


          <div className="lg:col-span-9 space-y-12 sm:space-y-16">
            

            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4 opacity-20">
                <span className="font-mono text-[9px] tracking-widest uppercase">
                  {index + 1} / {section.label}
                </span>
                <div className="flex-1 h-px bg-white/20" />
              </div>
              
              <SplitText 
                text={section.heading} 
                className="text-2xl sm:text-3xl font-medium text-white/90 mb-8"
              />

              <StoryNarrative content={section.content} />
            </div>

            {section.image && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="my-10 max-w-4xl rounded-2xl overflow-hidden border border-white/[0.05] shadow-2xl relative"
              >
                <img src={section.image} alt={section.heading} className="w-full object-cover" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.1] rounded-2xl pointer-events-none" />
              </motion.div>
            )}

            {section.carouselImages && (
              <div className="my-10 -mx-4 sm:-mx-12 overflow-hidden">
                <motion.div 
                  className="flex gap-6 px-4 sm:px-12 overflow-x-auto pb-8 custom-scrollbar scroll-smooth snap-x"
                >
                  {section.carouselImages.map((img, i) => (
                    <motion.div
                      key={img}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="shrink-0 w-[300px] sm:w-[500px] aspect-video rounded-xl overflow-hidden border border-white/[0.05] shadow-xl snap-center"
                    >
                      <img src={img} alt={`Gallery item ${i + 1}`} className="w-full h-full object-cover" />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}
            
            {section.cards && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl">
                {section.cards.map((card, i) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 * i }}
                  >
                    <ConstraintCard {...card} />
                  </motion.div>
                ))}
              </div>
            )}

            {section.timeline && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl"
              >
                <TimelineSection nodes={section.timeline} />
              </motion.div>
            )}
          </div>
        </div>
      </div>


      {diagramElement && (
        <div className="mt-20 py-12 flex flex-col items-center overflow-hidden border-y border-white/[0.03] bg-white/[0.01]">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1 }}
            className="w-full px-4 sm:px-12 overflow-x-auto custom-scrollbar"
          >
            <div className="min-w-[800px] max-w-[1400px] mx-auto">
              {diagramElement}
            </div>
          </motion.div>
        </div>
      )}
    </section>
  )
}
