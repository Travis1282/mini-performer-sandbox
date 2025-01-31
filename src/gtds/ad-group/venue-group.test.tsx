import React from 'react'
import { act, render, screen } from '@/testing'
import { VenueGroup } from './VenueGroup'
import { emptyResponse } from '@/contracts/entities/AdGroupPage'
import {
  eventFromSamePerformer,
  moreAtThisVenueMock,
} from './moreAtThisVenueMock'
import type { components } from '@/contracts/generated/maverick-schema'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  })),
  usePathname: jest.fn(() => '/'),
}))

jest.mock('next/headers', () => ({
  headers: jest.fn(() => ({
    get: jest.fn(),
  })),
}))

const emptyData = emptyResponse()

describe('AdGroup/VenueGroup', () => {
  it('renders VenueGroup with a empty response', async () => {
    render(<VenueGroup data={emptyData.data} />)

    expect(
      screen.getByRole('button', { name: /navbar icon/i })
    ).toBeInTheDocument()

    await act(async () => {
      expect(screen.getByText('Find your event')).toBeInTheDocument()

      expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument()
    })
  })

  it('renders VenueGroup a empty element if no events from the same performer', () => {
    const data = {
      adGroupEntityResult: {
        performer: {
          ...moreAtThisVenueMock.adGroupEntityResult.performer,
        } as components['schemas']['Performer'],
        venue: {
          ...moreAtThisVenueMock.adGroupEntityResult.venue,
        } as components['schemas']['Venue'],
      },
      events: [
        ...moreAtThisVenueMock.events,
        eventFromSamePerformer,
      ] as components['schemas']['Event'][],
    }
    render(<VenueGroup data={data} />)

    expect(
      screen.getByText(`${data.adGroupEntityResult.venue.name} Tickets`)
    ).toBeInTheDocument()

    expect(
      screen.getByText(`${data.adGroupEntityResult.performer.name} Tickets`)
    ).toBeInTheDocument()

    expect(screen.getByText('All Events')).toBeInTheDocument()
  })
})
