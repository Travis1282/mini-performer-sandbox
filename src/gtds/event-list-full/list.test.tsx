import { List } from './List'
import { render, store, waitFor } from '../../../store/store-test-utils'
import { mockPerformerPage } from '@/mocks/VenuePage'
import { mockCategories } from '@/mocks/Category'
import { initialData } from './initialData'
import { mockRegions } from '@/mocks/Regions'
import type { ReadonlyURLSearchParams } from 'next/navigation'
import { act } from 'react-dom/test-utils'

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
  const { locationAwareEvents, filteredEvents, pageTypeData } = initialData({
    data: mockPerformerPage,
    searchParams: {},
    categories: mockCategories,
    nearRegion: mockRegions[29],
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

  it('renders location aware events when useEventsNearYou is true and events are available', async () => {
    const { getAllByTestId } = render(
      await act(async () => (
        <List
          filteredEvents={filteredEvents}
          locationAwareEvents={locationAwareEvents}
          onClickResetFilters={jest.fn()}
          simplifiedView={false}
          useAllEvents={true}
          useLocalEvents={true}
        />
      ))
    )
    waitFor(() => {
      expect(getAllByTestId('locationEventItem').length).toBe(5)
      expect(getAllByTestId('eventItem').length).toBe(5)
    })
  })

  it('renders no events for location when eventsNear you is false', async () => {
    const { getAllByTestId } = render(
      await act(async () => (
        <List
          filteredEvents={filteredEvents}
          locationAwareEvents={locationAwareEvents}
          onClickResetFilters={jest.fn()}
          simplifiedView={false}
          useAllEvents={true}
          useLocalEvents={false}
        />
      ))
    )

    store.setState({ useLocalEvents: false })
    waitFor(() => {
      const locationEventItem = document.querySelector(
        '[data-testid="locationEventItem"]'
      )
      expect(locationEventItem).toBeNull()
      expect(getAllByTestId('eventItem').length).toBe(5)
    })
  })

  it('should update when filters are changed', async () => {
    const { getAllByTestId } = render(
      await act(async () => (
        <List
          filteredEvents={filteredEvents}
          locationAwareEvents={locationAwareEvents}
          onClickResetFilters={jest.fn()}
          simplifiedView={false}
          useAllEvents={true}
          useLocalEvents={true}
        />
      ))
    )

    const searchParams = new URLSearchParams()
    searchParams.append('from', '2024-04-28T05:00:00.000Z')
    searchParams.append('to', '2034-05-01T04:59:59.000Z')

    store.getState().processChanges(searchParams as ReadonlyURLSearchParams)

    waitFor(() => {
      const locationEventItem = () =>
        document.querySelector('[data-testid="locationEventItem"]')
      expect(locationEventItem()).toBeNull()
    })

    waitFor(() => {
      expect(getAllByTestId('eventItem').length).toBe(1)
    })
    searchParams.append('to', '2024-05-11T04:59:59.000Z')
    store.getState().processChanges(searchParams as ReadonlyURLSearchParams)

    waitFor(() => {
      const locationEventItem = () =>
        document.querySelector('[data-testid="locationEventItem"]')
      expect(locationEventItem()).toBeNull()
    })
    waitFor(() => {
      expect(getAllByTestId('eventItem').length).toBe(4)
    })

    searchParams.append('time', 'Day')
    store.getState().processChanges(searchParams as ReadonlyURLSearchParams)
    await new Promise((resolve) => setTimeout(resolve, 0))

    waitFor(() => {
      const locationEventItem = () =>
        document.querySelector('[data-testid="locationEventItem"]')
      expect(locationEventItem()).toBeNull()
    })

    waitFor(() => {
      expect(getAllByTestId('eventItem').length).toBe(1)
    })

    searchParams.append('time', 'Night')
    store.getState().processChanges(searchParams as ReadonlyURLSearchParams)
    waitFor(() => expect(getAllByTestId('eventItem').length).toBe(4))

    searchParams.delete('from')
    searchParams.delete('to')
    store.getState().processChanges(searchParams as ReadonlyURLSearchParams)

    waitFor(() => expect(getAllByTestId('eventItem').length).toBe(5))
  })
})
