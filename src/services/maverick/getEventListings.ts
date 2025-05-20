import type { paths } from '@/contracts/generated/maverick-schema';
import { client } from '@/services/maverick/maverick-client';

export interface PostGetEventListingsOptions {
  botDetectionToken?: string;
  params: paths['/rest/events/{event-id}/listings']['post']['parameters'];
}

export async function postGetEventListings({
  params,
  botDetectionToken,
}: PostGetEventListingsOptions) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return client().POST('/rest/events/{event-id}/listings' as any, {
    params,
    body: { botDetectionToken },
  });
}
