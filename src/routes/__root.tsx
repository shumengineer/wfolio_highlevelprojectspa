import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { useEffect } from 'react'
import { trackServerPageLoad } from '../server/analytics'

import PostHogProvider from '../integrations/posthog/provider'
import { CookieConsent } from '../components/CookieConsent'
import CustomCursor from '../components/CustomCursor'

import appCss from '../styles.css?url'

import NotFound from '../components/NotFound'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        name: 'description',
        content: 'Władysław Szumejko - Full-stack engineer specializing in secure, high-performance applications. Started coding at 9, first commercial project at 14.',
      },
      {
        name: 'keywords',
        content: 'full-stack engineer, software engineer, web development, cybersecurity, react, typescript, devops',
      },
      {
        property: 'og:title',
        content: 'Władysław Szumejko — Engineer',
      },
      {
        property: 'og:description',
        content: 'Full-stack engineer specializing in secure, high-performance applications.',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        title: 'Władysław Szumejko — Engineer',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
    ],
  }),
  loader: async () => {
    await trackServerPageLoad()
  },
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  useEffect(() => {
  }, [])

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-bg text-white">
        <div className="vignette-top" />
        <div className="vignette-bottom" />
        <div className="relative">
          <PostHogProvider>
            <CustomCursor />
            {children}
            <CookieConsent />
            <TanStackDevtools
              config={{
                position: 'bottom-right',
              }}
              plugins={[
                {
                  name: 'Tanstack Router',
                  render: <TanStackRouterDevtoolsPanel />,
                },
              ]}
            />
          </PostHogProvider>
        </div>
        <Scripts />
      </body>
    </html>
  )
}
