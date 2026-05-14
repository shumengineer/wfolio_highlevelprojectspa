import posthog from 'posthog-js'
import { PostHogProvider as BasePostHogProvider } from '@posthog/react'
import type { ReactNode } from 'react'
import { getCookieConsent } from '../../lib/cookie-consent'
import { env } from '../../env'

const ensurePostHogInit = () => {
  if (typeof window !== 'undefined' && !(posthog as any).__loaded) {
    const consent = getCookieConsent()
    posthog.init(env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN, {
      api_host: env.VITE_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
      person_profiles: 'identified_only',
      persistence: consent === 'accepted' ? 'localStorage+cookie' : 'memory',
      opt_out_capturing_by_default: consent === 'rejected',
      capture_pageview: true 
    })
  }
}

ensurePostHogInit()

interface PostHogProviderProps {
  children: ReactNode
}

export default function PostHogProvider({ children }: PostHogProviderProps) {
  if (typeof window !== 'undefined') {
    ensurePostHogInit()
  }

  return (
    <BasePostHogProvider client={posthog}>
      {children}
    </BasePostHogProvider>
  )
}
