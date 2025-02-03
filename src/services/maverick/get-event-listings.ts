import type { paths } from './generated/maverick-schema'

import { client } from './maverick-client'

export interface GetEventListingsOptions {
  init?: Omit<RequestInit, 'body'>
  params: paths['/rest/events/{event-id}/listings']['get']['parameters']
}

export async function getEventListings({
  init = {},
  params,
}: GetEventListingsOptions) {
  return client().GET('/rest/events/{event-id}/listings', {
    ...init,
    params,
  })
}
