import { useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Link } from '@tanstack/react-router'
import { copyToClipboard } from '../../lib/analytics-utils'

export default function CaseStudyNavbar() {
  const [visible, setVisible] = useState(true)
  const { scrollY } = useScroll()
  const [lastScrollY, setLastScrollY] = useState(0)
  const [copied, setCopied] = useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    const direction = latest - lastScrollY
    
    // Show if scrolling up OR at the very top
    if (latest < 50) {
      setVisible(true)
    } else if (direction > 10) {
      setVisible(false)
    } else if (direction < -10) {
      setVisible(true)
    }
    
    setLastScrollY(latest)
  })

  const handleCopy = async () => {
    const success = await copyToClipboard('hello@wshm.eu', 'case_study_navbar')
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <motion.nav
      initial={{ y: 0, opacity: 1 }}
      animate={{ 
        y: visible ? 0 : -100,
        opacity: visible ? 1 : 0
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-6 right-6 z-[100] pointer-events-none"
    >
      <div className="flex items-center gap-4 pointer-events-auto">
        {/* Back to Home - Subtle indicator */}
        <Link 
          to="/" 
          className="w-10 h-10 flex items-center justify-center rounded-full glass-morphism glass-morphism-hover border-white/10 group transition-all"
          title="Back to Home"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/40 group-hover:text-white transition-colors" role="img">
            <title>Arrow Left</title>
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>

        {/* Email Pill */}
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-3 px-4 sm:px-5 py-2 rounded-full glass-morphism glass-morphism-hover border-white/10 shadow-2xl transition-all active:scale-95 group"
        >
          <span className="text-white/80 text-[11px] sm:text-sm font-medium tracking-tight group-hover:text-white transition-colors">
            {copied ? 'Email Copied' : 'hello@wshm.eu'}
          </span>
          <div className={copied ? "text-green-400" : "text-white/40 group-hover:text-white transition-all"}>
            {copied ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
                <title>Success Check</title>
                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
                <title>Copy Icon</title>
                <path d="M8 4V16C8 17.1046 8.89543 18 10 18H18C19.1046 18 20 17.1046 20 16V7.24264C20 6.71221 19.7893 6.20349 19.4142 5.82843L16.1716 2.58579C15.7965 2.21071 15.2878 2 14.7574 2H10C8.89543 2 8 2.89543 8 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 18V20C16 21.1046 15.1046 22 14 22H6C4.89543 22 4 21.1046 4 20V8C4 6.89543 4.89543 6 6 6H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
        </button>
      </div>
    </motion.nav>
  )
}
