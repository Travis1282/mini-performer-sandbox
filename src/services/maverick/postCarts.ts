'use client';

import type { paths } from '@/contracts/generated/maverick-schema';
import { client } from '@/services/maverick/maverick-client';

export interface PostCartsOptions {
  init?: Omit<RequestInit, 'body'>;
  requestBody: paths['/rest/carts']['post']['requestBody']['content']['application/json'];
}

export async function postCarts({ init = {}, requestBody }: PostCartsOptions) {
  return client().POST('/rest/carts', {
    ...init,
    body: requestBody,
  });
}
