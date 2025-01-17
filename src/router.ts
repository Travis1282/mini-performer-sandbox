import { createBrowserRouter } from 'react-router'
import { Layout } from './pages/layout'
import Home from './pages/home/home'
import Slug from './pages/slug'
import About from './pages/about'
import { getEventMetadata } from './services/maverick/getEventMetadata'
import { getSearchTrendingEvents } from './services/maverick/getSearchTrendingEvents'
import { Tickets } from './pages/tickets/tickets'
import { GlobalErrorContent } from './components/errors/oh-no'
import { PrimaryLayout } from './pages/primary-layout'

const router = createBrowserRouter([
  {
    Component: Layout,
    ErrorBoundary: GlobalErrorContent,
    children: [
      {
        Component: PrimaryLayout,
        children: [
          {
            Component: Home,
            index: true,
            loader: ({ request }) =>
              getSearchTrendingEvents({
                init: {
                  signal: request.signal,
                },
                params: {
                  query: {
                    regionId: '1',
                  },
                },
              }),
          },
          {
            Component: About,
            path: 'about',
          },
          {
            Component: Slug,
            path: ':slug',
          },
        ],
      },
      {
        Component: Tickets,
        path: '/tickets/:eventId/:slug/:localDate',
        loader: ({ request, params }) =>
          getEventMetadata({
            init: {
              signal: request.signal,
            },
            params: {
              path: {
                'event-id': Number(params.eventId),
              },
            },
          }),
      },
    ],
  },
])

export default router
