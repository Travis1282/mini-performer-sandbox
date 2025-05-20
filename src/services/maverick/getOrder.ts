import type { paths } from '@/contracts/generated/maverick-schema';
import { client } from '@/services/maverick/maverick-client';

export interface GetOrderOptions {
  init?: Omit<RequestInit, 'body'>;
  params: paths['/rest/orders/{order-id}']['get']['parameters'];
}

export function getOrder({ params, init = {} }: GetOrderOptions) {
  return client().GET('/rest/orders/{order-id}', {
    ...init,
    params,
    cache: 'no-cache',
  });
}
