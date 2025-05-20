import { client } from '@/services/maverick/maverick-client';

export interface GetSeatSecure {
  init?: Omit<RequestInit, 'body'>;
}

export function getSeatSecure(options: GetSeatSecure = {}) {
  return client().GET('/rest/cms', {
    ...(options.init ?? {}),
    params: {
      query: {
        path: 'seat-secure',
      },
    },
  });
}
