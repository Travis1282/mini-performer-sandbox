import { QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import '@fontsource-variable/plus-jakarta-sans';
import '@fontsource-variable/plus-jakarta-sans/wght-italic.css';

import { queryClient } from './query-client';
import router from './router';
import { CategoriesProvider } from './services/categories/use-categories-context';
import { RegionsProvider } from './services/categories/use-regions-context';
import { LocationProvider } from './services/location/useLocationContext';
import './style.css';

const rootNode = document.getElementById('root');
if (rootNode) {
  try {
    createRoot(rootNode).render(
      <QueryClientProvider client={queryClient}>
        <LocationProvider location={{ closestRegionId: '1' }}>
          <CategoriesProvider>
            <RegionsProvider>
              <RouterProvider router={router} />
            </RegionsProvider>
          </CategoriesProvider>
        </LocationProvider>
      </QueryClientProvider>
    );
  } catch (error) {
    console.error('Error rendering router:', error);
  }
} else {
  console.error('Root node not found');
}
