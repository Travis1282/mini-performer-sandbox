import * as Sentry from '@sentry/react'
import { useEffect } from 'react'

import {
  createBrowserRouter,
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from 'react-router'

const sentryDsn = import.meta.env.SENTRY_DSN ?? import.meta.env.VITE_SENTRY_DSN

try {
  Sentry.init({
    sendDefaultPii: true,
    attachStacktrace: true,
    dsn: sentryDsn,
    environment: import.meta.env.VITE_APP_ENV,
    integrations: [
      Sentry.reactRouterV7BrowserTracingIntegration({
        useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes,
      }),
      Sentry.httpClientIntegration(),
      Sentry.replayIntegration({
        maskAllInputs: true,
        blockAllMedia: false,
        maskAllText: false,
      }),
      Sentry.captureConsoleIntegration({
        levels: ['error'],
      }),
      Sentry.thirdPartyErrorFilterIntegration({
        filterKeys: ['go-tickets'],
        behaviour: 'apply-tag-if-contains-third-party-frames',
      }),
    ],
    ignoreErrors: [
      /Cannot remove a child from a different parent/,
      '_AutofillCallbackHandler',
      'Falling back to browser navigation',
      'zoom requires valid numbers',
    ],
    tracesSampleRate: 0.005,
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 1.0,
    sampleRate: 1.0,
  })
} catch (error) {
  console.error('Error initializing Sentry:', error)
}

export const sentryCreateBrowserRouter: typeof createBrowserRouter =
  Sentry.wrapCreateBrowserRouterV7(createBrowserRouter)
