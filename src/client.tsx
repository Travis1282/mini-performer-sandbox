import { GrowthBookProvider } from '@growthbook/growthbook-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
// Supports weights 200-800
import '@fontsource-variable/plus-jakarta-sans'
// Supports weights 200-800, italic
import '@fontsource-variable/plus-jakarta-sans/wght-italic.css'

import './style.css'
import router from './router'
import { createGrowthBook } from './services/growthbook/create-growthbook'
import { LocationProvider } from './services/location/useLocationContext'

const queryClient = new QueryClient()

const gb = createGrowthBook({ payload: window.__GT_GB_PAYLOAD__ })

const rootNode = document.getElementById('root')
if (rootNode) {
  try {
    createRoot(rootNode).render(
      <GrowthBookProvider growthbook={gb}>
        <QueryClientProvider client={queryClient}>
          <LocationProvider location={window.__GT_LOC__}>
            <RouterProvider router={router} />
          </LocationProvider>
        </QueryClientProvider>
      </GrowthBookProvider>
    )
  } catch (error) {
    console.error('Error rendering router:', error)
  }
} else {
  console.error('Root node not found')
}
