import { PostHog } from 'posthog-node'
import { getRequest } from '@tanstack/react-start/server'
import { env } from '../env'

let posthogNode: PostHog | null = null

export const getPostHog = () => {
  if (posthogNode) return posthogNode
  posthogNode = new PostHog(env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN, {
    host: env.VITE_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
  })
  return posthogNode
}

export const getServerRequest = () => {
  return getRequest()
}
