import { FiltersBar } from './FiltersBar'
import { render, store, waitFor } from '../../../store/store-test-utils'
import { mockPerformerPage } from '@/mocks/VenuePage'
import { mockCategories } from '@/mocks/Category'
import { initialData } from './initialData'
import { mockRegions } from '@/mocks/Regions'
import { act } from 'react-dom/test-utils'
import type { ReadonlyURLSearchParams } from 'next/navigation'

jest.mock('@/store/AppStoreProvider', () => ({
  ...jest.requireActual('../../../store/store-test-utils'),
  useAppStore: jest.requireActual('../../../store/store-test-utils')
    .useAppStore,
}))

const mockHeadingInformation = {
  heading: '',
  location: 'All Events',
  homeAndAwayTitle: '',
}
describe('List Component', () => {
  const { regionsWithEvents, pageTypeData } = initialData({
    data: mockPerformerPage,
    searchParams: {},
    categories: mockCategories,
    nearRegion: mockRegions[0],
    regions: mockRegions,
  })

  store
    .getState()
    .initializePage(
      pageTypeData,
      mockPerformerPage.events,
      mockHeadingInformation,
      true,
      true,
      mockRegions
    )

  it('renders location in the header drop down if events are available', async () => {
    const { getByTestId } = render(
      await act(async () => (
        <FiltersBar
          categories={mockCategories}
          headingInformation={mockHeadingInformation}
          pageTypeData={pageTypeData}
          regionsWithEvents={regionsWithEvents}
          useLocalEvents={true}
        />
      ))
    )
    waitFor(() =>
      expect(getByTestId('locationHeading').textContent).toBe('All Events')
    )
    store.getState().setSelectedTrendingRegion(mockRegions[29])
    store.getState().processChanges()
    waitFor(() =>
      expect(getByTestId('locationHeading').textContent).toBe(
        'Events NearSeattle'
      )
    )
  })

  it('renders All Events after filters remove location aware events', async () => {
    const { getByTestId } = render(
      await act(async () => (
        <FiltersBar
          categories={mockCategories}
          headingInformation={mockHeadingInformation}
          pageTypeData={pageTypeData}
          regionsWithEvents={regionsWithEvents}
          useLocalEvents={true}
        />
      ))
    )

    store.getState().setSelectedTrendingRegion(mockRegions[29])
    store.getState().processChanges()
    waitFor(() =>
      expect(getByTestId('locationHeading').textContent).toBe(
        'Events NearSeattle'
      )
    )

    const searchParams = new URLSearchParams()
    searchParams.append('time', 'Day')
    store.getState().processChanges(searchParams as ReadonlyURLSearchParams)
    waitFor(() =>
      expect(getByTestId('locationHeading').textContent).toBe('All Events')
    )
  })

  it('renders the correct list of filters for the page type', async () => {
    const { getByText } = render(
      await act(async () => (
        <FiltersBar
          categories={mockCategories}
          headingInformation={mockHeadingInformation}
          pageTypeData={pageTypeData}
          regionsWithEvents={regionsWithEvents}
          useLocalEvents={true}
        />
      ))
    )

    expect(getByText('Time')).toBeInTheDocument()
    expect(getByText('Date')).toBeInTheDocument()
  })
})
