import type { paths } from '@/contracts/generated/maverick-schema';
import { client } from '@/services/maverick/maverick-client';

export interface GetCmsOptions {
  init?: Omit<RequestInit, 'body'>;
  params: paths['/rest/cms']['get']['parameters'];
}

export function getCms({ init, params }: GetCmsOptions) {
  return client().GET('/rest/cms', {
    ...(init ?? {}),
    params,
  });
}
