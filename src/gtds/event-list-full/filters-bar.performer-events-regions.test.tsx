import React from 'react'
import { act, render, screen } from '@/testing'
import { FiltersBar } from './FiltersBar'
import { useAppStore } from '@/store/AppStoreProvider'
import type { PageTypeData } from '@/utils/eventUtils'

const FiltersBarTestHarness: React.FC<{
  sendRegions: boolean
  performer: boolean
}> = ({ sendRegions, performer }) => {
  const categories = useAppStore((state) => state.categories)

  const headingInformation = {
    heading: 'Events Near',
    location: 'Chicago',
    homeAndAwayTitle: 'All Events ',
  }

  const pageTypeData = {
    type: performer ? 'performer' : 'category',
    drilledData: {
      id: 6081,
      name: 'Rolling Stones',
      primaryCategoryId: 137,
      parking: false,
      parkingPerformerId: 33358,
      slug: 'rolling-stones-tickets',
      heroImagePath:
        'https://static.gotickets.com/d64ca871-2979-45f2-9a2a-bf2a29760d02.webp',
      primaryCategory: {
        id: 137,
        name: 'Rock',
        parentId: 6,
        eventType: 'CONCERTS',
        slug: 'rock',
        heroImagePath:
          'https://static.gotickets.com/042c0fb3-d224-4320-b161-25da02a894ea.webp',
        performerHeroImagePath:
          'https://static.gotickets.com/f360004e-9aa0-4ff0-bf18-09182b735cd7.webp',
      },
      cmsPageId: 283,
      parkingPerformer: {
        id: 33358,
        primaryCategoryId: 137,
        name: 'Rolling Stones Parking',
        parking: true,
        slug: 'rolling-stones-parking',
      },
      childPerformers: [],
    },
    filtersToShow: {
      selectRegion: false,
      homeAndAway: false,
      dateRangePicker: true,
      time: true,
    },
    paginationPageSize: 20,
    hasNextPage: false,
    paginationCategoryIds: [],
    hasHomeVenueId: false,
  }

  const regionsWithEvents = [
    {
      id: 1,
      name: 'Chicago',
      latitude: 41.880683,
      longitude: -87.674185,
      venueRadius: 80,
      heroImagePath: 'ee2f2834-a9d8-4502-a8bd-6496f4418a1f.webp',
      slug: 'chicago-events',
    },
    {
      id: 11,
      name: 'Los Angeles',
      latitude: 34.235535,
      longitude: -117.640688,
      venueRadius: 100,
      heroImagePath: '13abdecb-1426-4037-a797-c9f4de5e2b03.webp',
      slug: 'los-angeles-events',
    },
    {
      id: 38,
      name: 'Arkansas',
      latitude: 35.204888,
      longitude: -92.447911,
      venueRadius: 140,
      heroImagePath: '73ee808c-9b84-497a-96e9-e9c283f07689.webp',
      slug: 'arkansas-events',
    },
    {
      id: 41,
      name: 'San Jose',
      latitude: 37.336166,
      longitude: -121.890591,
      venueRadius: 60,
      heroImagePath: '3667e648-287e-473d-8b78-60c4ef5ddaf2.webp',
      slug: 'san jose-events',
    },
    {
      id: 61,
      name: 'Vancouver',
      latitude: 49.260872,
      longitude: -123.113952,
      venueRadius: 65,
      heroImagePath: '530f34c8-43d0-497d-b8a6-a9a387d845ef.webp',
      slug: 'vancouver-events',
    },
  ]

  return (
    <FiltersBar
      categories={categories}
      headingInformation={headingInformation}
      pageTypeData={pageTypeData as PageTypeData}
      regionsWithEvents={sendRegions ? regionsWithEvents : undefined}
      useLocalEvents
    />
  )
}

describe('FiltersBar - Performer - Regions with events in region heading', () => {
  test('renders the filters bar component with regions that have events for a performer', async () => {
    const { user } = render(<FiltersBarTestHarness performer sendRegions />)

    expect(
      await screen.findByRole('button', { name: /chicago/i })
    ).toBeInTheDocument()
    await act(
      async () =>
        await user.click(screen.getByRole('button', { name: /chicago/i }))
    )
    expect(
      await screen.findByTestId('arkansas-regionListItem')
    ).toBeInTheDocument()

    expect(await screen.queryByTestId('alabama-regionListItem')).toBe(null)
  })
  test('renders the filters bar component with all regions if regions is not sent to it', async () => {
    const { user } = render(
      <FiltersBarTestHarness performer sendRegions={false} />
    )

    expect(
      await screen.findByRole('button', { name: /chicago/i })
    ).toBeInTheDocument()
    await act(
      async () =>
        await user.click(screen.getByRole('button', { name: /chicago/i }))
    )
    expect(
      await screen.findByTestId('arkansas-regionListItem')
    ).toBeInTheDocument()

    expect(
      await screen.findByTestId('alabama-regionListItem')
    ).toBeInTheDocument()
  })
  test('renders the filters bar component with all regions if page type is not performer', async () => {
    const { user } = render(
      <FiltersBarTestHarness performer={false} sendRegions={false} />
    )

    expect(
      await screen.findByRole('button', { name: /chicago/i })
    ).toBeInTheDocument()
    await act(
      async () =>
        await user.click(screen.getByRole('button', { name: /chicago/i }))
    )
    expect(
      await screen.findByTestId('arkansas-regionListItem')
    ).toBeInTheDocument()

    expect(
      await screen.findByTestId('alabama-regionListItem')
    ).toBeInTheDocument()
  })
})
