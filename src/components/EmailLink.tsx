import { useState, useEffect } from 'react'

interface Props {
  email: string
  className?: string
}

export default function EmailLink({ email, className }: Props) {
  const [mounted, setMounted] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy email:', err)
    }
  }

  if (!mounted) {
    return (
      <span className={className}>
        [loading contact...]
      </span>
    )
  }

  const [user, domain] = email.split('@')

  return (
    <button 
      onClick={handleCopy}
      className={`${className} cursor-pointer relative group inline-flex items-center gap-2`}
      title="Click to copy email address"
      type="button"
    >
      <span>
        {user}<span className="hidden">anti-bot-mesh</span>@{domain}
      </span>
      
      {/* Floating Copy Feedback */}
      <span className={`absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-white text-black text-xs font-bold rounded shadow-lg transition-all duration-300 pointer-events-none ${copied ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
        Copied!
      </span>
      
      {/* Copy Icon Indicator */}
      <svg 
        width="14" 
        height="14" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="opacity-20 group-hover:opacity-100 transition-opacity"
        role="img"
        aria-label="Copy icon"
      >
        <title>Copy email</title>
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
    </button>
  )
}
