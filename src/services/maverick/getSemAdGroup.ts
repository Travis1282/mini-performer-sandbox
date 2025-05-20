// /rest/sem/ad-group

import type { paths } from '@/contracts/generated/maverick-schema';
import { client } from '@/services/maverick/maverick-client';

export interface GetSemAdGroupOptions {
  init?: Omit<RequestInit, 'body'>;
  params: paths['/rest/sem/ad-group']['get']['parameters'];
}

export function getSemAdGroup({ params, init = {} }: GetSemAdGroupOptions) {
  return client().GET('/rest/sem/ad-group', {
    ...init,
    params,
    cache: 'no-cache',
  });
}
