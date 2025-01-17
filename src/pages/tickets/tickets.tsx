import { getEventListingsWithBotProtection } from '@/pages/tickets/services/getEventListingsWithBotProtection'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useLoaderData, useParams } from 'react-router'

import type { components } from '../../services/maverick/generated/maverick-schema'

import { mapsUrl } from '../../services/config'
import { findMasterPerformerFromEvent } from '../../services/events/find-master-performer-from-event'
import { LayoutNavbarTickets } from './components/layout-navbar-tickets'
import { Map } from './components/map'
import { TicketList } from './components/ticket-list'
import { VenueConfigurationProvider } from './services/useVenueConfiguration'

export function Tickets() {
  const { data: loaderData } = useLoaderData<{
    data: components['schemas']['GetEventMetadataResponse']
  }>()

  if (!loaderData.event) {
    throw new Error('Event not found')
  }

  const params = useParams<{ eventId: string }>()

  const performer = findMasterPerformerFromEvent(loaderData.event)

  const {
    data: listings,
    status,
    error,
  } = useQuery({
    queryKey: ['event-listings', 'get', params.eventId],
    queryFn: () =>
      getEventListingsWithBotProtection({
        params: { path: { 'event-id': Number(params.eventId) } },
      }),
  })

  if (status === 'pending') {
    return (
      <div className="flex w-full flex-col gap-3">
        <div className="mx-auto w-full max-w-sm rounded-md border border-gray-300 p-4 shadow">
          <div className="flex animate-pulse space-x-4">
            <div className="h-10 w-10 rounded-full bg-slate-700"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 rounded bg-slate-700"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 h-2 rounded bg-slate-700"></div>
                  <div className="col-span-1 h-2 rounded bg-slate-700"></div>
                </div>
                <div className="h-2 rounded bg-slate-700"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto w-full max-w-sm rounded-md border border-gray-300 p-4 shadow">
          <div className="flex animate-pulse space-x-4">
            <div className="h-10 w-10 rounded-full bg-slate-700"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 rounded bg-slate-700"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 h-2 rounded bg-slate-700"></div>
                  <div className="col-span-1 h-2 rounded bg-slate-700"></div>
                </div>
                <div className="h-2 rounded bg-slate-700"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto w-full max-w-sm rounded-md border border-gray-300 p-4 shadow">
          <div className="flex animate-pulse space-x-4">
            <div className="h-10 w-10 rounded-full bg-slate-700"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 rounded bg-slate-700"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 h-2 rounded bg-slate-700"></div>
                  <div className="col-span-1 h-2 rounded bg-slate-700"></div>
                </div>
                <div className="h-2 rounded bg-slate-700"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <span className="border border-red-600 p-4 text-center text-red-600">
        Error: {error.message}
      </span>
    )
  }

  if (!loaderData.event) {
    return (
      <span className="border border-red-600 p-4 text-center text-red-600">
        No event
      </span>
    )
  }

  const svgMapUrl = loaderData.event?.venueConfiguration?.svgMapFileName
    ? `${mapsUrl}/${loaderData.event.venueConfiguration.svgMapFileName}`
    : ''

  return (
    <main className="flex h-full w-full flex-col">
      <LayoutNavbarTickets
        event={loaderData.event}
        performer={performer?.performer}
      />
      <VenueConfigurationProvider
        venueConfig={listings.data.venueConfiguration}
      >
        <Map mapSrc={svgMapUrl} />
        <TicketList
          event={loaderData.event}
          listings={listings.data.listings}
        />
      </VenueConfigurationProvider>
    </main>
  )
}
