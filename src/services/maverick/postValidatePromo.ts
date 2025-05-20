import type { paths } from '@/contracts/generated/maverick-schema';
import { client } from '@/services/maverick/maverick-client';

export interface PostValidatePromoCode {
  body: paths['/rest/promos/validate']['post']['requestBody']['content']['application/json'];
  init?: RequestInit;
}

export function postValidatePromoCode({ init, body }: PostValidatePromoCode) {
  return client().POST('/rest/promos/validate', {
    ...(init ?? {}),
    body: body,
  });
}
