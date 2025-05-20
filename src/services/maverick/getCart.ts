import type { paths } from '@/contracts/generated/maverick-schema';
import { client } from '@/services/maverick/maverick-client';

export interface GetCartOptions {
  init?: Omit<RequestInit, 'body'>;
  params: paths['/rest/carts/{cart-uuid}']['get']['parameters'];
}

export function getCart({ params, init = {} }: GetCartOptions) {
  return client().GET('/rest/carts/{cart-uuid}', {
    ...(init ?? {}),
    params,
  });
}
