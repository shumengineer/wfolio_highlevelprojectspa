import posthog from 'posthog-js'
import { getCookieConsent } from './cookie-consent'
import { env } from '../env'

export const initPostHog = () => {
  if (typeof window !== 'undefined') {
    const consent = getCookieConsent()
    if (!(posthog as any).__loaded) {
      posthog.init(env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN || '', {
        api_host: env.VITE_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
        capture_pageview: false,
        person_profiles: 'identified_only',
        persistence: consent === 'accepted' ? 'localStorage+cookie' : 'memory',
        opt_out_capturing_by_default: consent === 'rejected',
      })
    }
  }
  return posthog
}
