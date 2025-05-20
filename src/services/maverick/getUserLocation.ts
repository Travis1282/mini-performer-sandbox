import type { paths } from '@/contracts/generated/maverick-schema';
import { client } from '@/services/maverick/maverick-client';

export interface GetUserLocationOptions {
  init?: Omit<RequestInit, 'body'>;
  params: paths['/rest/location/find']['get']['parameters'];
}

export function getUserLocation({ params, init = {} }: GetUserLocationOptions) {
  return client().GET('/rest/location/find', {
    ...init,
    params,
  });
}
