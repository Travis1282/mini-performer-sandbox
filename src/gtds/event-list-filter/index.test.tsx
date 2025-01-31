import '@/config/jest/mocks/nextNavigationMockTest'

import type { AppStoreProviderProps } from '@/store/AppStoreProvider'
import { AppStoreProvider } from '@/store/AppStoreProvider'
import { EventListFilter, type EventListFilterProps } from '.'
import { mockRegions } from '@/mocks/Regions'
import { render, screen } from '@/testing'

function Wrapper(
  value: Partial<EventListFilterProps>,
  storeValue?: Partial<AppStoreProviderProps>
) {
  render(
    <AppStoreProvider
      selectedTrendingRegion={
        storeValue?.selectedTrendingRegion || mockRegions[0]
      }
    >
      <EventListFilter
        disabledDate={undefined}
        events={[]}
        pageType={value?.pageType || 'category'}
        {...value}
      />
    </AppStoreProvider>
  )
}

describe('Event List Filter', () => {
  it('should render a region listing with "Events near Nashville" heading', async () => {
    Wrapper({ pageType: 'region', region: mockRegions[1] })

    const heading = screen.getByTestId('locationHeading')
    expect(heading.textContent).toBe('Events Near Nashville')
  })

  it('should render "Events Near /SELECTED/" region', async () => {
    Wrapper(
      { pageType: 'performer' },
      { selectedTrendingRegion: mockRegions[0] }
    )

    const heading = screen.getByTestId('locationHeading')
    expect(heading.textContent).toBe('Events NearChicago')
  })

  it('should show Event Type dropdown for REGION pageType', async () => {
    Wrapper({ pageType: 'region' })

    const eventType = screen.getByTestId('eventTypeDropdown')
    expect(eventType).toBeInTheDocument()
  })

  it('should show Event Type dropdown for VENUE pageType', async () => {
    Wrapper({ pageType: 'venue' })

    const eventType = screen.getByTestId('eventTypeDropdown')
    expect(eventType).toBeInTheDocument()
  })

  it('should show Home Away button for sports pageType', async () => {
    Wrapper({ pageType: 'sport-performer' })

    const homeAway = screen.getByTestId('homeAwayButton')
    expect(homeAway).toBeInTheDocument()
  })
})
