import { useState, useEffect } from 'react'
import { getCookieConsent, setCookieConsent } from '../lib/cookie-consent'
import posthog from 'posthog-js'

/* ── Inline SVG components ─────────────────────────── */

const CookieSvg = ({ bitten }: { bitten: boolean }) => (
  <svg viewBox="0 0 40 40" width="36" height="36" className="cookie-icon" aria-hidden="true" role="img">
    <title>Cookie Icon</title>
    {/* Cookie body */}
    <circle
      cx="20" cy="20"
      r={bitten ? 15 : 16}
      fill="#c48a3f"
      stroke="#a0722e"
      strokeWidth="1.5"
    />
    {/* Bite mark — clips out a chunk from the left */}
    {bitten && (
      <circle cx="6" cy="18" r="8" fill="var(--color-bg-base, #0c0c0c)" />
    )}
    {/* Chocolate chips */}
    <circle cx="16" cy="14" r="2" fill="#5c3a1e" opacity="0.9" />
    <circle cx="24" cy="22" r="1.8" fill="#5c3a1e" opacity="0.9" />
    <circle cx="18" cy="26" r="1.5" fill="#5c3a1e" opacity="0.8" />
    <circle cx="26" cy="14" r="1.3" fill="#5c3a1e" opacity="0.7" />
    {/* Surface texture */}
    <circle cx="22" cy="18" r="1" fill="#b07830" opacity="0.5" />
    <circle cx="14" cy="22" r="0.8" fill="#b07830" opacity="0.4" />
  </svg>
)

const CatSvg = () => (
  <svg viewBox="0 0 32 32" width="28" height="28" className="cat-icon" aria-hidden="true" role="img">
    <title>Cat Icon</title>
    {/* Body */}
    <ellipse cx="16" cy="22" rx="10" ry="8" fill="#3a3a3a" />
    {/* Head */}
    <circle cx="16" cy="12" r="8" fill="#4a4a4a" />
    {/* Ears */}
    <polygon points="9,6 6,0 12,4" fill="#4a4a4a" />
    <polygon points="23,6 26,0 20,4" fill="#4a4a4a" />
    <polygon points="9.5,5.5 7,1 11.5,4" fill="#e8a0b0" opacity="0.6" />
    <polygon points="22.5,5.5 25,1 20.5,4" fill="#e8a0b0" opacity="0.6" />
    {/* Eyes */}
    <ellipse cx="13" cy="11" rx="1.8" ry="2" fill="#7dde92" />
    <ellipse cx="19" cy="11" rx="1.8" ry="2" fill="#7dde92" />
    <ellipse cx="13" cy="11.5" rx="0.8" ry="1.2" fill="#111" />
    <ellipse cx="19" cy="11.5" rx="0.8" ry="1.2" fill="#111" />
    {/* Nose */}
    <ellipse cx="16" cy="14" rx="1.2" ry="0.8" fill="#e8a0b0" />
    {/* Mouth — happy */}
    <path d="M14,15.5 Q16,17 18,15.5" fill="none" stroke="#e8a0b0" strokeWidth="0.6" />
  </svg>
)

/* ── Component ─────────────────────────────────────── */

export const CookieConsent = () => {
  const [_consent, setConsent] = useState<'accepted' | 'rejected' | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [bitten, setBitten] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const savedConsent = getCookieConsent()
    setConsent(savedConsent)

    if (savedConsent === null) {
      const timer = setTimeout(() => {
        setIsVisible(true)
        // Cat takes a bite after 1.5s
        setTimeout(() => setBitten(true), 1500)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [])

  const dismiss = (choice: 'accepted' | 'rejected') => {
    setExiting(true)
    setTimeout(() => {
      setCookieConsent(choice)
      setConsent(choice)
      setIsVisible(false)

      if (choice === 'accepted') {
        posthog.opt_in_capturing()
      } else {
        posthog.opt_out_capturing()
      }
    }, 400)
  }

  if (!isVisible) return null

  return (
    <div
      className={`
        fixed bottom-4 left-4 z-50
        bg-bg-base/70 backdrop-blur-xl border border-white/[0.06] rounded-2xl
        p-3 sm:p-4 shadow-2xl max-w-[280px] sm:max-w-xs
        transition-all duration-400 ease-out
        ${exiting ? 'opacity-0 translate-y-4 scale-95' : 'animate-cookie-enter'}
      `}
    >
      <div className="flex items-start gap-3">
        {/* Cookie + Cat scene */}
        <div className="relative flex-shrink-0 w-10 h-10 flex items-center justify-center">
          <div className={`transition-transform duration-500 ${bitten ? 'translate-x-1' : ''}`}>
            <CookieSvg bitten={bitten} />
          </div>
          {/* Cat peeking from behind the cookie on the left */}
          <div
            className={`
              absolute -left-1 top-1/2 -translate-y-1/2
              transition-all duration-700 ease-out
              ${bitten ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3'}
            `}
          >
            <CatSvg />
          </div>
        </div>

        <div className="flex flex-col gap-2 min-w-0">
          <p className="text-xs text-text-muted leading-relaxed">
            {bitten ? 'The cat took a bite. Accept cookies?' : 'We use cookies to analyze traffic.'}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => dismiss('rejected')}
              className="px-2.5 py-1 text-[11px] text-text-muted hover:text-white transition-colors rounded"
            >
              Nah
            </button>
            <button
              type="button"
              onClick={() => dismiss('accepted')}
              className="px-2.5 py-1 text-[11px] bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
            >
              Sure
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
