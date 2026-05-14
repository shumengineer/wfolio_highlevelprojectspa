import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'

const WORDS = [
  { text: 'build', color: 'bg-white/[0.04] border-white/5' },
  { text: 'test', color: 'bg-white/[0.06] border-white/5' },
  { text: 'deploy', color: 'bg-white/[0.02] border-white/5' }
]

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  const fadeOut = Math.max(1 - scrollY / 600, 0)

  return (
    <section
      ref={sectionRef}
      className="hero-section relative min-h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden"
    >
      {/* Ambient gradient orbs */}
      <div className="hero-ambient" aria-hidden="true">
        <div className="hero-orb hero-orb--1" />
        <div className="hero-orb hero-orb--2" />
        <div className="hero-orb hero-orb--3" />
      </div>

      {/* Noise texture overlay */}
      <div className="hero-noise" aria-hidden="true" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 sm:h-64 bg-gradient-to-t from-bg-base to-transparent z-20 pointer-events-none" aria-hidden="true" />

      {/* Main content */}
      <div
        className="w-full max-w-5xl relative z-10 animate-os-window-drag"
        style={{
          opacity: fadeOut,
          willChange: 'opacity, transform',
        }}
      >
        {/* OS Cursor — simulates dragging the window */}
        <div className="absolute top-2 left-1/2 z-[100] pointer-events-none animate-os-cursor-drag hidden md:block drop-shadow-2xl">
          {/* Classic OS Cursor - Black with white outline for high contrast */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(-5deg) translateX(-10px)' }} role="img">
            <title>OS Cursor</title>
            <path d="M5.65376 4.31598C5.42437 3.08841 7.02706 2.50579 7.82823 3.51263L18.4725 16.8893C19.227 17.8375 18.5539 19.2247 17.3466 19.2247H12.0152L11.5312 19.5393C11.1685 19.775 10.7419 19.8998 10.3059 19.8998C9.28911 19.8998 8.4648 19.0755 8.4648 18.0587V11.8344L5.65376 4.31598Z" fill="black" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Browser Window Frame — always visible, shadow blooms in via CSS animation */}
        <div className="hero-card bg-surface/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl overflow-hidden relative">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />

          <div
            className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #ffffff 0.5px, transparent 0.5px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Browser Header */}
          <div className="bg-white/[0.03] px-4 sm:px-5 py-3 sm:py-3.5 flex items-center justify-between border-b border-white/[0.06] relative z-10">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white/10 shadow-[0_0_6px_rgba(255,255,255,0.05)]" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white/20 shadow-[0_0_6px_rgba(255,255,255,0.1)]" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white/30 shadow-[0_0_6px_rgba(255,255,255,0.15)]" />
            </div>
          </div>

          {/* Browser Content — text is ALWAYS visible for LCP */}
          <div className="p-6 sm:p-10 md:p-14 lg:p-20 relative z-10">
            <div className="max-w-4xl">

              <p className="text-text-muted text-xs sm:text-sm mb-4 sm:mb-6 tracking-wide hero-text hero-text--1">
                Władysław Szumejko — Engineer
              </p>

              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight mb-6 sm:mb-10 leading-[1.08] hero-text hero-text--2">
                <span className="block flex items-center gap-[0.25em] flex-wrap">
                  I 
                  <span className="inline-grid relative items-center align-middle">
                    {/* Invisible spacer to reserve the maximum possible width and prevent layout shift */}
                    <span className="invisible px-3 py-1 rounded-2xl border border-transparent leading-none col-start-1 row-start-1">
                      deploy
                    </span>
                    <div className="col-start-1 row-start-1 flex items-center justify-center w-full">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={WORDS[wordIndex].text}
                          initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                          exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                          transition={{ 
                            duration: 0.6, 
                            ease: [0.2, 1, 0.2, 1] 
                          }}
                          className={clsx(
                            "px-3 py-1 rounded-2xl border transition-colors duration-1000 leading-none",
                            WORDS[wordIndex].color
                          )}
                        >
                          {WORDS[wordIndex].text}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  </span>
                  scalable
                </span>
                <span className="block">software solutions</span>
                <span className="block text-text-muted/70">that work.</span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-text-muted/80 mb-12 sm:mb-16 leading-relaxed max-w-xl hero-text hero-text--3">
                I am a software engineer focused on building robust and secure applications. I've been coding since age 9. Based in Warsaw.
              </p>

            </div>
          </div>
        </div>
      </div>
      {/* Minimal Scroll indicator */}
      <div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 pointer-events-none transition-opacity duration-300"
        style={{ opacity: fadeOut }}
      >
        <div className="w-1.5 h-5 bg-white/5 rounded-full relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-white/30 rounded-full animate-scroll-dot-minimal" />
        </div>
      </div>
    </section>
  )
}
