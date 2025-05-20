import type { paths } from '@/contracts/generated/maverick-schema';
import { client } from '@/services/maverick/maverick-client';

export interface GetSearchTendingEventsOptions {
  init?: Omit<RequestInit, 'body'>;
  params?: paths['/rest/search/trending/events']['get']['parameters'];
}

export function getSearchTrendingEvents({ init = {}, params = {} }: GetSearchTendingEventsOptions) {
  return client().GET('/rest/search/trending/events', {
    ...init,
    params,
  });
}
