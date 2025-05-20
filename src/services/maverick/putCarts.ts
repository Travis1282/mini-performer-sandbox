'use client';

import type { paths } from '@/contracts/generated/maverick-schema';
import { client } from '@/services/maverick/maverick-client';

export interface PostCartsOptions {
  init?: Omit<RequestInit, 'body'>;
  parameters: paths['/rest/carts/{cart-uuid}']['put']['parameters'];
  requestBody: paths['/rest/carts/{cart-uuid}']['put']['requestBody']['content']['application/json'];
}

export async function putCarts({ init = {}, requestBody, parameters }: PostCartsOptions) {
  return client().PUT('/rest/carts/{cart-uuid}', {
    params: parameters,
    ...init,
    body: requestBody,
  });
}
