'use client';

import type { paths } from '@/contracts/generated/maverick-schema';
import { client } from '@/services/maverick/maverick-client';

export interface PostCartsPromoCodeOptions {
  init?: Omit<RequestInit, 'body'>;
  params: paths['/rest/carts/{cart-uuid}/promo-code']['post']['parameters'];
  requestBody: paths['/rest/carts/{cart-uuid}/promo-code']['post']['requestBody']['content']['application/json'];
}

export async function postCartsPromoCode({
  init = {},
  requestBody,
  params,
}: PostCartsPromoCodeOptions) {
  return client().POST('/rest/carts/{cart-uuid}/promo-code', {
    ...init,
    body: requestBody,
    params,
  });
}
