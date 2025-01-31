import React from 'react'
import { act, render, screen } from '@/testing'
import { AdditionalVenues } from './AdditionalVenues'
import type { AdGroupPage } from '@/contracts/entities/AdGroupPage'
import { emptyResponse } from '@/contracts/entities/AdGroupPage'
import {
  performerIdAndRegionId,
  performerIdAndVenueId,
  performerIdAndVenueIdAndRegionId,
  performerIdOnly,
} from './additionalVenuesMock'
import { vi } from 'vitest'

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  })),
  usePathname: vi.fn(() => '/'),
}))

vi.mock('next/headers', () => ({
  headers: vi.fn(() => ({
    get: vi.fn(),
  })),
}))

const emptyData = emptyResponse()

describe('AdGroup/AdditionalVenues', () => {
  it('renders AdditionalVenues with a empty response', async () => {
    render(
      <AdditionalVenues
        data={emptyData.data}
        deviceType="mobile"
        showNarrowHeading={false}
      />
    )
    expect(
      screen.getByRole('button', { name: /navbar icon/i })
    ).toBeInTheDocument()

    await act(async () => {
      expect(screen.getByText('Find your event')).toBeInTheDocument()

      expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument()
    })
  })

  it('renders AdditionalVenues a performer Id Only', async () => {
    render(
      <AdditionalVenues
        data={performerIdOnly as unknown as AdGroupPage}
        deviceType="mobile"
        showNarrowHeading={false}
      />
    )

    expect(
      screen.getByText(
        `${performerIdOnly.adGroupEntityResult.performer.name} Tickets`
      )
    ).toBeInTheDocument()

    expect(screen.getByText('All Events')).toBeInTheDocument()
  })

  it('renders AdditionalVenues a performer Id And Region Id', () => {
    render(
      <AdditionalVenues
        data={performerIdAndRegionId as unknown as AdGroupPage}
        deviceType="mobile"
        showNarrowHeading={false}
      />
    )

    expect(
      screen.getByText(
        `${performerIdAndRegionId.adGroupEntityResult.performer.name} Tickets`
      )
    ).toBeInTheDocument()

    expect(
      screen.getByText(
        `${performerIdAndRegionId.adGroupEntityResult.region.name} Tickets`
      )
    ).toBeInTheDocument()

    expect(screen.getByText('All Events')).toBeInTheDocument()
  })

  it('renders AdditionalVenues a performer Id And Venue Id', () => {
    render(
      <AdditionalVenues
        data={performerIdAndVenueId as unknown as AdGroupPage}
        deviceType="mobile"
        showNarrowHeading={false}
      />
    )

    expect(
      screen.getByText(
        `${performerIdAndVenueId.adGroupEntityResult.performer.name} Tickets`
      )
    ).toBeInTheDocument()

    expect(
      screen.getByText(
        `${performerIdAndVenueId.adGroupEntityResult.venue.name} Tickets`
      )
    ).toBeInTheDocument()

    expect(screen.getByText('All Events')).toBeInTheDocument()
  })

  it('renders AdditionalVenues a performer Id And Venue Id And Region Id', () => {
    render(
      <AdditionalVenues
        data={performerIdAndVenueIdAndRegionId as unknown as AdGroupPage}
        deviceType="mobile"
        showNarrowHeading={false}
      />
    )

    expect(
      screen.getByText(
        `${performerIdAndVenueIdAndRegionId.adGroupEntityResult.performer.name} Tickets`
      )
    ).toBeInTheDocument()

    expect(
      screen.getByText(
        `${performerIdAndVenueIdAndRegionId.adGroupEntityResult.venue.name} Tickets`
      )
    ).toBeInTheDocument()

    expect(screen.getByText('All Events')).toBeInTheDocument()
  })
})
