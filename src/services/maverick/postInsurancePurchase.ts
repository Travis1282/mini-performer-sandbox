import type { paths } from '@/contracts/generated/maverick-schema';
import { client } from '@/services/maverick/maverick-client';

export interface PostInsurancePurchaseOptions {
  init?: Omit<RequestInit, 'body'>;
  requestBody: paths['/rest/insurance/purchase']['post']['requestBody']['content']['application/json'];
}

export async function postInsurancePurchase({
  init = {},
  requestBody,
}: PostInsurancePurchaseOptions) {
  return client().POST('/rest/insurance/purchase', {
    ...init,
    body: requestBody,
  });
}
