import React from 'react'
import { act, render, screen } from '@/testing'
import { AdGroupPerformerEvents } from './PerformerEvents'
import {
  eventFromSamePerformer,
  moreAtThisVenueMock,
} from './moreAtThisVenueMock'
import { emptyResponse } from '@/contracts/entities/AdGroupPage'
import type { components } from '@/contracts/generated/maverick-schema'

describe('AdGroup/PerformerEvents', () => {
  it('renders AdGroupPerformerEvents with event from same performer', async () => {
    const data = {
      adGroupEntityResult: {
        performer: {
          ...moreAtThisVenueMock.adGroupEntityResult.performer,
        } as components['schemas']['Performer'],
      },
      events: [
        ...moreAtThisVenueMock.events,
        eventFromSamePerformer,
      ] as components['schemas']['Event'][],
    }
    const title = `${data.adGroupEntityResult.performer.name} Tickets`

    render(<AdGroupPerformerEvents data={data} />)

    await act(async () => {
      expect(screen.getByText(title)).toBeInTheDocument()
      expect(screen.getAllByTestId('eventItem')).toHaveLength(1)
    })
  })

  it('renders AdGroupPerformerEvents a empty element if no events from the same performer', () => {
    const data = {
      adGroupEntityResult: {
        performer: {
          ...moreAtThisVenueMock.adGroupEntityResult.performer,
        } as components['schemas']['Performer'],
      },
      events: [
        ...moreAtThisVenueMock.events,
      ] as components['schemas']['Event'][],
    }
    const { container } = render(<AdGroupPerformerEvents data={data} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders AdGroupPerformerEvents with a empty response', () => {
    const { data } = emptyResponse()
    const { container } = render(<AdGroupPerformerEvents data={data} />)
    expect(container).toBeEmptyDOMElement()
  })
})
