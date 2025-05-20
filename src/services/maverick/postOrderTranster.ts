import type { paths } from '@/contracts/generated/maverick-schema';
import { client } from '@/services/maverick/maverick-client';

export interface PostOrderTransferOptions {
  init?: Omit<RequestInit, 'body'>;
  requestBody: paths['/rest/orders/accept-transfer']['post']['requestBody']['content']['application/json'];
}

export async function postOrderTransfer({ init = {}, requestBody }: PostOrderTransferOptions) {
  return client().POST('/rest/orders/accept-transfer', {
    ...init,
    body: requestBody,
  });
}
