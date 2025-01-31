import { mockRegions } from '@/mocks/Regions'
import { mockPerformerPage } from '@/mocks/VenuePage'
import { act, render, screen, waitFor } from '@/testing'
import { EventListFull } from './'

describe('EventListFull', () => {
  beforeAll(() => {
    import('./FiltersBar')
  })

  it('processes page data and passes to filter bar component', async () => {
    const { user } = render(
      <EventListFull
        data={mockPerformerPage}
        nearRegion={mockRegions[29]}
        searchParams={{}}
        showBuyerGuarantee={false}
      />
    )

    const heading = await screen.findByTestId('locationHeading', undefined, {
      timeout: 5000,
    })
    expect(heading.textContent).toBe('Events NearSeattle')

    const regionButton = await screen.findByTestId('regionButton')

    await act(async () => await user.click(regionButton))

    const regionItem = await screen.findAllByTestId('seattle-regionListItem')

    expect(regionItem[0].textContent).toContain('SeattleSelect')

    await act(async () => await user.click(regionItem[0]))

    await waitFor(() => {
      expect(screen.getByTestId('locationHeading').textContent).toBe(
        'Events NearSeattle'
      )
    })
  })

  it('hidesFilters if fv search param is true', async () => {
    render(
      <EventListFull
        data={mockPerformerPage}
        nearRegion={mockRegions[29]}
        searchParams={{ fv: 'true' }}
        showBuyerGuarantee={false}
      />
    )

    const filterBar = document.querySelector('[data-testid="filterBar"]')
    expect(filterBar).toBeNull()
  })
})
