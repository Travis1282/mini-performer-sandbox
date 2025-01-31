import React from 'react'
import { act, render, screen } from '@/testing'
import { EventList } from './EventList'
import { performerIdOnly } from './additionalVenuesMock'
import type { AdGroupPage } from '@/contracts/entities/AdGroupPage'

describe('AdGroup/EventList', () => {
  it('renders EventList with event from same performer', async () => {
    const data = performerIdOnly as unknown as AdGroupPage

    render(<EventList data={data} />)

    await act(async () => {})
    expect(
      screen.getByText(
        `See ${performerIdOnly.adGroupEntityResult.performer.name} at all venues`
      )
    ).toBeInTheDocument()

    expect(screen.getAllByTestId('eventItem')).toHaveLength(data.events.length)
  })
})
