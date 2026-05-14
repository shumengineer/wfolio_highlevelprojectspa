import { useState, useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { copyToClipboard } from '../lib/analytics-utils'

export default function Navbar() {
  const [showEmail, setShowEmail] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // check initial state
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleCopy = async () => {
    await copyToClipboard('hello@wshm.eu', 'main_navbar')
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 px-3 sm:px-4 md:px-8 py-4 sm:py-6 flex items-center justify-between transition-all duration-500 ease-out ${
        scrolled
          ? 'bg-bg-base/80 backdrop-blur-md border-b border-white/5'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <Link to="/" className="flex flex-col group cursor-none">
        <span className="font-medium text-white tracking-tight text-sm sm:text-base group-hover:text-text-muted transition-colors">Władysław Szumejko</span>
        <span className="text-text-muted text-[10px] sm:text-xs">Engineer</span>
      </Link>

      <div className="flex items-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm text-text-muted">
        <a href="https://github.com/wladyslaw" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors hidden md:block">GitHub ↗</a>
        
        {/* Desktop: Full email with copy button */}
        <div className="hidden md:flex items-center gap-2">
          <span className="text-white">hello@wshm.eu</span>
          <button
            type="button"
            onClick={handleCopy}
            className="px-3 py-1 rounded-full bg-surface hover:bg-surface-hover border border-border transition-colors text-white text-xs"
          >
            Copy
          </button>
        </div>

        {/* Mobile: Copy button with dropdown */}
        <div className="relative md:hidden">
          <button
            type="button"
            onClick={() => setShowEmail(!showEmail)}
            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-surface hover:bg-surface-hover border border-border transition-colors text-white"
          >
            @
          </button>
          {showEmail && (
            <div className="absolute right-0 top-10 sm:top-12 bg-surface border border-border px-3 sm:px-4 py-2 rounded-lg shadow-xl text-white text-[10px] sm:text-xs flex items-center gap-2 sm:gap-3 z-50">
              hello@wshm.eu
              <button 
                type="button"
                className="text-text-muted hover:text-white" 
                onClick={handleCopy}
              >
                Copy
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
