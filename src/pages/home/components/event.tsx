import dayjs from 'dayjs'
import React from 'react'
import { Link } from 'react-router'

import type { components } from '../../../services/maverick/generated/maverick-schema'

import { getEventTicketsPath } from '../../../services/events/get-event-tickets-path'

export function Event({ event }: { event: components['schemas']['Event'] }) {
  const date = dayjs(event.eventTimeLocal).format('MMM DD').toUpperCase()
  return (
    <div className="flex flex-col gap-2 rounded border border-gray-300 p-4">
      <h3 className="text-base font-bold">{event.name}</h3>
      <p>{date}</p>
      <Link className="self-end" to={getEventTicketsPath(event)}>
        View Tickets &#10132;
      </Link>
    </div>
  )
}
