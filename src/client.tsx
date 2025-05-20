import './services/sentry/instrument';

import { GrowthBookProvider } from '@growthbook/growthbook-react';
import { QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
// Supports weights 200-800
import '@fontsource-variable/plus-jakarta-sans';
// Supports weights 200-800, italic
import '@fontsource-variable/plus-jakarta-sans/wght-italic.css';

import { queryClient } from './query-client';
import router from './router';
import { CategoriesProvider } from './services/categories/use-categories-context';
import { RegionsProvider } from './services/categories/use-regions-context';
import { createGrowthBook } from './services/growthbook/create-growthbook';
import { LocationProvider } from './services/location/useLocationContext';
import './style.css';

const gb = createGrowthBook({ payload: window.__GT_GB_PAYLOAD__ });

const rootNode = document.getElementById('root');
if (rootNode) {
  try {
    createRoot(rootNode).render(
      <GrowthBookProvider growthbook={gb}>
        <QueryClientProvider client={queryClient}>
          <LocationProvider location={window.__GT_LOC__}>
            <CategoriesProvider>
              <RegionsProvider>
                <RouterProvider router={router} />
              </RegionsProvider>
            </CategoriesProvider>
          </LocationProvider>
        </QueryClientProvider>
      </GrowthBookProvider>
    );
  } catch (error) {
    console.error('Error rendering router:', error);
  }
} else {
  console.error('Root node not found');
}
