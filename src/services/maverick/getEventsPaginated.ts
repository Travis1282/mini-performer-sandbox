import type { paths } from '@/contracts/generated/maverick-schema';
import { client } from '@/services/maverick/maverick-client';

export interface GetEventsPaginated {
  init?: Omit<RequestInit, 'body'>;
  query: paths['/rest/events/v2/paginated']['get']['parameters']['query'];
}

export function getEventsPaginated({ query, init = {} }: GetEventsPaginated) {
  return client().GET('/rest/events/v2/paginated', {
    ...init,
    params: {
      query,
    },
  });
}
