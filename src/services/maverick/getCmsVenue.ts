import type { paths } from '@/contracts/generated/maverick-schema';
import { client } from '@/services/maverick/maverick-client';

export interface GetCmsVenueOptions {
  init?: Omit<RequestInit, 'body'>;
  params: paths['/rest/cms/venue']['get']['parameters'];
}

export function getCmsVenue({ init = {}, params }: GetCmsVenueOptions) {
  return client().GET('/rest/cms/venue', {
    ...init,
    params,
  });
}
