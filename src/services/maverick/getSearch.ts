import type { paths } from '@/contracts/generated/maverick-schema';
import { client } from '@/services/maverick/maverick-client';

export interface GetSearchOptions {
  init?: Omit<RequestInit, 'body'>;
  params: paths['/rest/search']['get']['parameters'];
}

export function getSearch({ params, init = {} }: GetSearchOptions) {
  return client().GET('/rest/search', {
    ...init,
    params,
    cache: 'no-cache',
  });
}
