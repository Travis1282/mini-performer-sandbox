import React from 'react'
import { act, render, screen } from '@/testing'
import { AdGroupAllEvents } from './AllEvents'
import { moreAtThisVenueMock } from './moreAtThisVenueMock'
import type { components } from '@/contracts/generated/maverick-schema'

describe('AdGroup/AllEvents', () => {
  it('renders AdGroupAllEvents and show event filters and item list', async () => {
    const data = {
      events: [
        ...moreAtThisVenueMock.events,
      ] as unknown as components['schemas']['Event'][],
    }
    render(<AdGroupAllEvents events={data.events} />)
    await act(async () => {
      expect(screen.getByText('All Events')).toBeInTheDocument()
      expect(screen.getByText('Event Type')).toBeInTheDocument()
      expect(screen.getByText('Date')).toBeInTheDocument()
      expect(screen.getByText('Time')).toBeInTheDocument()
      expect(screen.getAllByTestId('eventItem')).toHaveLength(
        data.events.length
      )
    })
  })

  it('renders AdGroupPerformerEvents with NoEvents ', () => {
    render(<AdGroupAllEvents events={[]} />)
    expect(screen.getByTestId('noEvents')).toBeInTheDocument()
  })
})
