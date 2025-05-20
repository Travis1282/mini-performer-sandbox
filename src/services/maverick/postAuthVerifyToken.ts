import type { paths } from '@/contracts/generated/maverick-schema';
import { client } from '@/services/maverick/maverick-client';

export interface PostAuthVerifyTokenOptions {
  init?: Omit<RequestInit, 'body'>;
  requestBody: paths['/rest/auth/verify-token']['post']['requestBody']['content']['application/json'];
}

export async function postAuthVerifyToken({ init = {}, requestBody }: PostAuthVerifyTokenOptions) {
  return client().POST('/rest/auth/verify-token', {
    ...init,
    parseAs: 'text',
    body: requestBody,
    bodySerializer: (body) => body,
  });
}
