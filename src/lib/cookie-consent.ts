const CONSENT_KEY = 'cookie-consent'

export type ConsentStatus = 'accepted' | 'rejected' | null

export const getCookieConsent = (): ConsentStatus => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(CONSENT_KEY) as ConsentStatus
}

export const setCookieConsent = (status: 'accepted' | 'rejected'): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem(CONSENT_KEY, status)
}
