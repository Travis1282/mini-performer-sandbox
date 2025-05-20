import type { paths } from '@/contracts/generated/maverick-schema';
import { client } from '@/services/maverick/maverick-client';

export interface GetEventMetadataOptions {
  init?: Omit<RequestInit, 'body'>;
  params: paths['/rest/events/{event-id}/metadata']['get']['parameters'];
}

export function getEventMetadata({ init = {}, params }: GetEventMetadataOptions) {
  return client().GET('/rest/events/{event-id}/metadata', {
    ...init,
    params,
    cache: 'no-cache',
  });
}
