import { mockSportsPeformerPage } from '@/mocks/Performer-Sports'
import { mockRegions } from '@/mocks/Regions'
import { act, render, screen, within } from '@/testing'
import { EventListFull } from './'

describe('EventListFull with a sports team', () => {
  beforeAll(() => {
    import('./FiltersBar')
  })
  it('processes page data and passes to filter bar component', async () => {
    const { user } = render(
      <EventListFull
        data={mockSportsPeformerPage}
        nearRegion={mockRegions[0]}
        searchParams={{}}
        showBuyerGuarantee={false}
      />
    )

    const heading = await screen.findByTestId('locationHeading')
    expect(heading.textContent).toContain('All Games ')

    const regionButton = await screen.queryByTestId('regionButton')
    expect(regionButton).toBeNull()

    const locationButton = screen.getByTestId('select-region-activator')
    expect(locationButton).toBeInTheDocument()

    await act(async () => {
      await user.click(locationButton)
    })

    // should have multiple regions even though it defaults to home games

    const popover = await screen.findByTestId('region-list-content')

    const baltimore = await within(popover).findByTestId(
      'baltimore-regionListItem'
    )

    expect(baltimore).toBeInTheDocument()
    const chicago = await screen.findByTestId('chicago-regionListItem')
    expect(chicago).toBeInTheDocument()
    const cincinnati = await screen.findByTestId('cincinnati-regionListItem')
    expect(cincinnati).toBeInTheDocument()
  })
})
