import { createServerFn } from '@tanstack/react-start'

export const trackServerPageLoad = createServerFn({ method: 'GET' }).handler(async () => {
  if (typeof window === 'undefined') {
    const { getPostHog, getServerRequest } = await import('./analytics-core.server')
    
    const request = getServerRequest()
    if (!request) return { success: false }

    const url = new URL(request.url)
    const userAgent = request.headers.get('user-agent') || 'unknown'
    const referrer = request.headers.get('referer') || 'direct'



    const ph = getPostHog()
    ph.capture({
      distinctId: 'server-session',
      event: 'server_page_load',
      properties: {
        path: url.pathname,
        $browser: userAgent,
        $referrer: referrer,
        $current_url: request.url,
        is_ssr: true,
        $lib: 'posthog-node',
      },
    })

    await ph.flush()
    return { success: true }
  }
  return { success: false }
})

export const trackServerEvent = createServerFn({ method: 'POST' }).handler(async (payload: { event: string, distinctId: string, props?: Record<string, unknown> }) => {
  if (typeof window === 'undefined') {
    const { getPostHog } = await import('./analytics-core.server')
    const ph = getPostHog()
    
    ph.capture({
      distinctId: payload.distinctId,
      event: payload.event,
      properties: {
        ...payload.props,
        $lib: 'posthog-node',
      },
    })
    
    await ph.flush()
    return { success: true }
  }
  return { success: false }
})
