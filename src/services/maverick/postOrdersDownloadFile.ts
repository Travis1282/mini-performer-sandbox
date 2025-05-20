import type { paths } from '@/contracts/generated/maverick-schema';
import { client } from '@/services/maverick/maverick-client';

export interface PostOrdersDownloadFileOptions {
  init?: Omit<RequestInit, 'body'>;
  requestBody: paths['/rest/orders/download-file']['post']['requestBody']['content']['application/json'];
}

export async function postOrdersDownloadFile({
  init = {},
  requestBody,
}: PostOrdersDownloadFileOptions) {
  return client().POST('/rest/orders/download-file', {
    ...init,
    body: requestBody,
  });
}
