import type React from 'react'
import { Children, useId } from 'react'
import { motion } from 'framer-motion'

interface Props {
  content: React.ReactNode
  className?: string
}

export default function StoryNarrative({ content, className }: Props) {
  const baseId = useId()
  const children = Children.toArray(content)

  return (
    <div className={`space-y-12 sm:space-y-20 ${className}`}>
      {children.map((child, i) => {
        const isFirst = i === 0
        
        return (
          <motion.div
            // biome-ignore lint/suspicious/noArrayIndexKey: Children are static narrative beats from the data layer
            key={`${baseId}-${i}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              duration: 1.2, 
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1] 
            }}
            className="relative group"
          >
            {i % 3 === 1 && (
              <div className="absolute -right-24 -top-12 w-64 h-64 opacity-[0.03] pointer-events-none select-none hidden lg:block">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Decorative narrative background graphic">
                  <title>Narrative Background</title>
                  <path d="M44.7,-76.4C58.1,-69.2,69.2,-58.1,76.4,-44.7C83.7,-31.4,87.1,-15.7,85.6,-0.9C84.1,14,77.7,27.9,69.2,40.1C60.7,52.3,50,62.8,37.5,70.1C25,77.4,10.7,81.5,-3.4,87.4C-17.5,93.3,-35,101,-47.5,93.7C-60,86.4,-67.5,64.1,-74.6,44.7C-81.7,25.3,-88.4,8.8,-86.6,-7.3C-84.8,-23.4,-74.5,-39.1,-61.8,-51.7C-49.1,-64.3,-34,-73.8,-18.7,-78.2C-3.4,-82.6,12.1,-81.9,31.3,-83.7C31.3,-83.7,44.7,-76.4,44.7,-76.4Z" transform="translate(100 100)" fill="white" />
                </svg>
              </div>
            )}

            <div className="absolute -left-8 sm:-left-12 top-0 bottom-0 w-px bg-white/5 group-hover:bg-white/20 transition-colors" />
            
            <div className="relative z-10">
              {isFirst && (
                <div className="text-journal-metadata mb-4 opacity-40">Narrative Entry</div>
              )}
              
              <div className={`
                text-journal-body sm:text-2xl md:text-3xl !leading-[1.4] text-white/80 font-light
                ${isFirst ? 'drop-cap font-normal text-white' : ''}
              `}>
                {child}
              </div>
            </div>

            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8 }}
              className="w-8 h-[2px] bg-white/10 mt-8 origin-left group-hover:w-16 group-hover:bg-white/30 transition-all duration-700"
            />
          </motion.div>
        )
      })}
    </div>
  )
}
