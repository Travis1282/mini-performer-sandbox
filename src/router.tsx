import { createBrowserRouter } from 'react-router';
import { GlobalErrorContent } from './components/errors/oh-no';
import { Layout } from './pages/layout';
import { PrimaryLayout } from './pages/primary-layout';
import { getPerformerData } from './pages/slug/services /getPerformerData';
import Slug from './pages/slug/slug-layout';

const router = createBrowserRouter([
  {
    Component: Layout,
    ErrorBoundary: GlobalErrorContent,
    children: [
      {
        Component: PrimaryLayout,
        children: [
          {
            Component: Slug,
            path: '/',
            loader: async ({ request }) => {
              const url = new URL(request.url);
              const searchParams = Object.fromEntries(url.searchParams);

              // Use a default slug for the home route - you can change this to any default performer
              const defaultSlug = 'billie-eilish'; // or whatever default performer you want
              const performerData = await getPerformerData(defaultSlug, searchParams);

              return performerData;
            },
          },
        ],
      },
    ],
  },
]);

export default router;
