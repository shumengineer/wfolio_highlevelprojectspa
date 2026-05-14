import { motion, useScroll } from 'framer-motion'

export default function ScrollProgressIndicator() {
  const { scrollYProgress } = useScroll()

  return (
    <div className="scroll-progress-container">
      <motion.div 
        className="scroll-progress-bar"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  )
}
