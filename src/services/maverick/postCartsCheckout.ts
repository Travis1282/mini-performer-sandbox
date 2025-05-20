'use client';

import type { paths } from '@/contracts/generated/maverick-schema';
import { client } from '@/services/maverick/maverick-client';

export interface PostCartsCheckoutOptions {
  init?: Omit<RequestInit, 'body'>;
  params: paths['/rest/carts/{cart-uuid}/checkout']['post']['parameters'];
  requestBody: paths['/rest/carts/{cart-uuid}/checkout']['post']['requestBody']['content']['application/json'];
}

export async function postCartsCheckout({
  init = {},
  requestBody,
  params,
}: PostCartsCheckoutOptions) {
  return client().POST('/rest/carts/{cart-uuid}/checkout', {
    ...init,
    body: requestBody,
    params,
  });
}
