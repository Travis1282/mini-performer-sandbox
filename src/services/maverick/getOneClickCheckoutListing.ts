import type { paths } from '@/contracts/generated/maverick-schema';
import { client } from '@/services/maverick/maverick-client';

export interface GetEventListingsOptions {
  init?: Omit<RequestInit, 'body'>;
  params: paths['/rest/events/checkout/{event-id}/listings/{listing-id}']['get']['parameters'];
}

export async function getOneClickCheckoutListing({ init = {}, params }: GetEventListingsOptions) {
  return client().GET('/rest/events/checkout/{event-id}/listings/{listing-id}', {
    ...init,
    params,
  });
}
