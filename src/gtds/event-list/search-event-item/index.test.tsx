import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { render, screen } from '@testing-library/react'
import { mockPerformerPage } from '@/mocks/VenuePage'
import { SearchEventItem } from '.'
import {
  expectTextNotToBeInDocument,
  expectTextToBeInDocument,
} from '@/testing'
import type { components } from '@/contracts/generated/maverick-schema'

function mockEvent(dayjsInstance: Dayjs) {
  const { events } = mockPerformerPage
  const [first] = events ?? []
  const defaultEvent = { ...first }

  const name = defaultEvent.name ?? ''
  const dayOfWeek = dayjsInstance.format('ddd')
  const timeLocal = dayjsInstance.format('h:mm a')
  const yearDate = dayjsInstance.format('YYYY')
  const date = dayjsInstance.format('MMM DD')
  const venueLocation = `${defaultEvent.venue?.city}, ${defaultEvent.venue?.state}`
  const venueName = defaultEvent.venue?.name ?? ''
  const viewTicketsButton = 'Tickets'

  return {
    expected: {
      name,
      dayOfWeek,
      timeLocal,
      yearDate,
      date,
      venueLocation,
      venueName,
      viewTicketsButton,
    },
    event: {
      ...first,
      eventTimeLocal: dayjsInstance.format('YYYY-MM-DDTHH:mm:ss'),
    },
  }
}

describe('SearchEventItem', () => {
  it('renders the SearchEventItem component with default values in same year', () => {
    const { event, expected } = mockEvent(dayjs())
    render(<SearchEventItem data-testid="eventItem" event={event} />)

    const itemElement = screen.getByTestId('eventItem')
    expect(itemElement).toBeInTheDocument()
    expect(itemElement).toHaveAttribute('href')
    expect(itemElement).toHaveAttribute('target', '_blank')

    expect(screen.getAllByText(expected.dayOfWeek)[0]).toBeInTheDocument()
    expect(screen.getAllByText(expected.timeLocal)[0]).toBeInTheDocument()
    expect(screen.queryByText(expected.yearDate)).not.toBeInTheDocument()
    expect(screen.getByText(expected.date)).toBeInTheDocument()
    expect(screen.getByText(expected.name)).toBeInTheDocument()
    expect(screen.getAllByText(expected.venueLocation)[0]).toBeInTheDocument()
    expect(screen.getAllByText(expected.venueName)[0]).toBeInTheDocument()
    expect(screen.getByText(expected.viewTicketsButton)).toBeInTheDocument()
  })

  it('renders the SearchEventItem component with default values and show year if not the current', () => {
    const newDayjsInstance = dayjs()
    const nextYear = newDayjsInstance.add(1, 'year')

    const { event, expected } = mockEvent(nextYear)

    render(<SearchEventItem data-testid="eventItem" event={event} />)

    const itemElement = screen.getByTestId('eventItem')
    expect(itemElement).toBeInTheDocument()
    expect(itemElement).toHaveAttribute('href')
    expect(itemElement).toHaveAttribute('target', '_blank')

    expect(screen.getAllByText(expected.dayOfWeek)[0]).toBeInTheDocument()
    expect(screen.getAllByText(expected.timeLocal)[0]).toBeInTheDocument()
    expect(screen.getByText(expected.yearDate)).toBeInTheDocument()
    expect(screen.getByText(expected.date)).toBeInTheDocument()
    expect(screen.getByText(expected.name)).toBeInTheDocument()
    expect(screen.getAllByText(expected.venueLocation)[0]).toBeInTheDocument()
    expect(screen.getAllByText(expected.venueName)[0]).toBeInTheDocument()
    expect(screen.getByText(expected.viewTicketsButton)).toBeInTheDocument()
  })

  it('if dateTbd the SearchEventItem component should not render dayOfWeek, yearDate, date, but render TBD', () => {
    const newDayjsInstance = dayjs()
    const nextYear = newDayjsInstance.add(1, 'year')
    const { event, expected } = mockEvent(nextYear)

    const eventWithDateTbd = {
      ...event,
      dateTbd: true,
    }

    render(<SearchEventItem data-testid="eventItem" event={eventWithDateTbd} />)

    const itemElement = screen.getByTestId('eventItem')
    expect(itemElement).toBeInTheDocument()
    expect(itemElement).toHaveAttribute('href')
    expect(itemElement).toHaveAttribute('target', '_blank')

    // not render dayOfWeek, yearDate, date, but render TBD
    expect(screen.queryByText(expected.dayOfWeek)).not.toBeInTheDocument()
    expect(screen.queryByText(expected.yearDate)).not.toBeInTheDocument()
    expect(screen.queryByText(expected.date)).not.toBeInTheDocument()
    expect(screen.getByText('TBD')).toBeInTheDocument()

    expect(screen.getAllByText(expected.timeLocal)[0]).toBeInTheDocument()
    expect(screen.getAllByText(expected.venueLocation)[0]).toBeInTheDocument()
    expect(screen.getByText(expected.name)).toBeInTheDocument()
    expect(screen.getAllByText(expected.venueName)[0]).toBeInTheDocument()
    expect(screen.getByText(expected.viewTicketsButton)).toBeInTheDocument()
  })

  it('if timeTbd the SearchEventItem component should not render time (h:mm a), but render TBD', () => {
    const newDayjsInstance = dayjs()
    const nextYear = newDayjsInstance.add(1, 'year')
    const { event, expected } = mockEvent(nextYear)

    const eventWithDateTbd = {
      ...event,
      timeTbd: true,
    }

    render(<SearchEventItem data-testid="eventItem" event={eventWithDateTbd} />)

    const itemElement = screen.getByTestId('eventItem')
    expect(itemElement).toBeInTheDocument()
    expect(itemElement).toHaveAttribute('href')
    expect(itemElement).toHaveAttribute('target', '_blank')

    expect(screen.queryByText(expected.timeLocal)).not.toBeInTheDocument()
    expect(screen.getAllByText('TBD')[0]).toBeInTheDocument()

    expect(screen.getAllByText(expected.dayOfWeek)[0]).toBeInTheDocument()
    expect(screen.getByText(expected.yearDate)).toBeInTheDocument()
    expect(screen.getByText(expected.date)).toBeInTheDocument()
    expect(screen.getByText(expected.name)).toBeInTheDocument()
    expect(screen.getAllByText(expected.venueLocation)[0]).toBeInTheDocument()
    expect(screen.getAllByText(expected.venueName)[0]).toBeInTheDocument()
    expect(screen.getByText(expected.viewTicketsButton)).toBeInTheDocument()
  })

  it('renders a percent available badge if percent available is between 1 and 5 percent and show percentage available prop is true', () => {
    const { event } = mockEvent(dayjs())

    const eventWithPercentInventoryAvailable = {
      ...event,
      percentInventoryAvailable: 0.04,
    }
    render(
      <SearchEventItem
        data-testid="eventItem"
        event={eventWithPercentInventoryAvailable}
      />
    )

    expectTextToBeInDocument('4% of Tickets Left')
  })

  it('does not render a percent available badge if percent available is greater than or equal to 5 percent and show percentage available prop is true', () => {
    const { event } = mockEvent(dayjs())

    const eventWithPercentInventoryAvailable = {
      ...event,
      percentInventoryAvailable: 0.06,
    }
    render(
      <SearchEventItem
        data-testid="eventItem"
        event={eventWithPercentInventoryAvailable}
      />
    )

    expectTextNotToBeInDocument('4% of Tickets Left')
  })

  it('renders a percent available badge with the tickets available number if percent is zero and available number is less than 50 and show percentage available prop is true', () => {
    const { event } = mockEvent(dayjs())

    const eventWithPercentInventoryAvailable = {
      ...event,
      percentInventoryAvailable: 0.06,
      availableTickets: 19,
    }
    render(
      <SearchEventItem
        data-testid="eventItem"
        event={eventWithPercentInventoryAvailable}
      />
    )

    expectTextNotToBeInDocument('19 Tickets Left')
  })

  it('does not render a percent available badge when is it a parking event no matter what', () => {
    const { event } = mockEvent(dayjs())

    const eventWithPercentInventoryAvailable: components['schemas']['Event'] = {
      ...event,
      parking: true,
      percentInventoryAvailable: 0.06,
      availableTickets: 19,
    }
    render(
      <SearchEventItem
        data-testid="eventItem"
        event={eventWithPercentInventoryAvailable}
      />
    )

    expectTextNotToBeInDocument('19 Tickets Left')
  })

  it('does not render a percent available badge when we do not have venue capacity no matter what', () => {
    const { event } = mockEvent(dayjs())

    const eventWithPercentInventoryAvailable = {
      ...event,
      venue: {
        ...event.venue,
        capacity: undefined,
      },
      percentInventoryAvailable: 0.06,
      availableTickets: 19,
    } as components['schemas']['Event']
    render(
      <SearchEventItem
        data-testid="eventItem"
        event={eventWithPercentInventoryAvailable}
      />
    )

    expectTextNotToBeInDocument('19 Tickets Left')
  })
})
