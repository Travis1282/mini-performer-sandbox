import type { paths } from '@/contracts/generated/maverick-schema';
import { client } from '@/services/maverick/maverick-client';

export interface PostCartPromoEmailToken {
  init?: Omit<RequestInit, 'body'>;
  requestBody: paths['/rest/carts/{cart-uuid}/email-token']['post']['requestBody']['content']['application/json'];
  requestPath: paths['/rest/carts/{cart-uuid}/email-token']['post']['parameters']['path'];
}

export async function postCartsPromoEmailToken({
  requestPath,
  requestBody,
  init = {},
}: PostCartPromoEmailToken) {
  return client().POST('/rest/carts/{cart-uuid}/email-token', {
    ...init,
    parseAs: 'text',
    params: {
      path: requestPath,
    },
    body: requestBody,
  });
}
