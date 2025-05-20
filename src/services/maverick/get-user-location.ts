import type { paths } from './generated/maverick-schema';
import { client } from './maverick-client';

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
