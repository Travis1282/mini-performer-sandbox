import type { paths } from '@/contracts/generated/maverick-schema';
import { client } from '@/services/maverick/maverick-client';

export interface PostOrderFindOptions {
  init?: Omit<RequestInit, 'body'>;
  requestBody: paths['/rest/orders/find']['post']['requestBody']['content']['application/json'];
}

export async function postOrderFind({ init = {}, requestBody }: PostOrderFindOptions) {
  return client().POST('/rest/orders/find', {
    ...init,
    body: requestBody,
  });
}
