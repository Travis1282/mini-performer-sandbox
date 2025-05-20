import type { paths } from '@/contracts/generated/maverick-schema';
import { client } from '@/services/maverick/maverick-client';

export interface GetOrdersOptions {
  init?: Omit<RequestInit, 'body'>;
  params: paths['/rest/orders']['get']['parameters'];
}

export function getOrders({ params, init = {} }: GetOrdersOptions) {
  return client().GET('/rest/orders', {
    ...init,
    params,
    cache: 'no-cache',
  });
}
