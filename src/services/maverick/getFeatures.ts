import type { paths } from '@/contracts/generated/maverick-schema';
import { client } from '@/services/maverick/maverick-client';

export interface GetFeaturesOptions {
  init?: Omit<RequestInit, 'body'>;
  params: paths['/rest/experiments/features/{clientKey}']['get']['parameters'];
}

export function getFeatures({ init, params }: GetFeaturesOptions) {
  return client().GET('/rest/experiments/features/{clientKey}', {
    ...(init ?? {}),
    params,
  });
}
