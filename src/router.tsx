import Cookies from 'js-cookie'
import { createBrowserRouter } from 'react-router'
import { GlobalErrorContent } from './components/errors/oh-no'
import { Loading } from './components/loading'
import About from './pages/about'
import Home from './pages/home/home'
import { Layout } from './pages/layout'
import { PrimaryLayout } from './pages/primary-layout'
import Slug from './pages/slug'
import { queryClient } from './query-client'
import { CLOSEST_REGION_COOKIE } from './services/location/constants'
import { getSearchTrendingEvents } from './services/maverick/get-search-trending-events'

const router = createBrowserRouter([
  {
    Component: Layout,
    ErrorBoundary: GlobalErrorContent,
    hydrateFallbackElement: <Loading />,
    children: [
      {
        Component: PrimaryLayout,
        hydrateFallbackElement: <Loading />,
        children: [
          {
            Component: Home,
            index: true,
            hydrateFallbackElement: <Loading />,
            loader: async ({ request }) => {
              const closestRegionId = Cookies.get(CLOSEST_REGION_COOKIE)

              const loaderData = await getSearchTrendingEvents({
                init: {
                  signal: request.signal,
                },
                params: {
                  query: {
                    regionId: closestRegionId ?? '0',
                  },
                },
              })
              queryClient.setQueryData(
                ['trending-events', 'get', closestRegionId],
                loaderData
              )

              return loaderData
            },
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
        hydrateFallbackElement: <Loading />,
        lazy: async () => {
          const [loaderModule, componentModule] = await Promise.all([
            import('./pages/tickets/tickets.loader'),
            import('./pages/tickets/tickets'),
          ])
          return {
            loader: loaderModule.default,
            Component: componentModule.default,
          }
        },
      },
    ],
  },
])

export default router
