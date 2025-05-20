import type { paths } from '@/contracts/generated/maverick-schema';
import { client } from '@/services/maverick/maverick-client';

export interface GetSearchTendingOptions {
  init?: Omit<RequestInit, 'body'>;
  params?: paths['/rest/search/trending']['get']['parameters'];
}

export function getSearchTrending({ init = {}, params = {} }: GetSearchTendingOptions) {
  return client().GET('/rest/search/trending', {
    ...init,
    params,
  });
}
