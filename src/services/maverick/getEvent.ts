import type { paths } from '@/contracts/generated/maverick-schema';
import { client } from '@/services/maverick/maverick-client';

export interface GetEventOptions {
  init?: Omit<RequestInit, 'body'>;
  params: paths['/rest/events/{event-id}']['get']['parameters'];
}

export function getEvent({ init = {}, params }: GetEventOptions) {
  return client().GET('/rest/events/{event-id}', {
    ...init,
    params,
    cache: 'no-cache',
  });
}
