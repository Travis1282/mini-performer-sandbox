import type { paths } from '@/contracts/generated/maverick-schema';
import { client } from '@/services/maverick/maverick-client';

export interface GetEventListingOptions {
  init?: Omit<RequestInit, 'body'>;
  params: paths['/rest/events/{event-id}/listings/{listing-id}']['get']['parameters'];
}

export function getEventListing({ init = {}, params }: GetEventListingOptions) {
  return client().GET('/rest/events/{event-id}/listings/{listing-id}', {
    ...init,
    params,
    cache: 'no-cache',
  });
}
