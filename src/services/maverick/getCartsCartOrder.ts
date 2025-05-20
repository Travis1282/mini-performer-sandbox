import type { paths } from '@/contracts/generated/maverick-schema';
import { client } from '@/services/maverick/maverick-client';

export interface GetCartsCartOrderOptions {
  init?: Omit<RequestInit, 'body'>;
  params: paths['/rest/carts/{cart-uuid}/order']['get']['parameters'];
}

export function getCartsCartOrder({ params, init = {} }: GetCartsCartOrderOptions) {
  return client().GET('/rest/carts/{cart-uuid}/order', {
    ...(init ?? {}),
    params,
  });
}
