import { Tickets } from '@/pages/tickets/tickets'
import { createBrowserRouter } from 'react-router'
import { GlobalErrorContent } from './components/errors/oh-no'
import About from './pages/about'
import Home from './pages/home/home'
import { Layout } from './pages/layout'
import { PrimaryLayout } from './pages/primary-layout'
import Slug from './pages/slug'
import { getEventMetadata } from './services/maverick/getEventMetadata'
import { getSearchTrendingEvents } from './services/maverick/getSearchTrendingEvents'

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
        path: '/tickets/:eventId/:slug/:localDate',
        Component: Tickets,
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
        // lazy: async () => {
        //   const [loaderModule, componentModule] = await Promise.all([
        //     import('./pages/tickets/tickets.loader'),
        //     import('./pages/tickets/tickets'),
        //   ])
        //   return {
        //     loader: loaderModule.default,
        //     Component: componentModule.default,
        //   }
        // },
      },
    ],
  },
])

export default router
