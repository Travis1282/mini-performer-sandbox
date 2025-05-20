import type { paths } from '@/contracts/generated/maverick-schema';
import { client } from '@/services/maverick/maverick-client';

export interface PostAuthLoginOptions {
  init?: Omit<RequestInit, 'body'>;
  requestBody: paths['/rest/auth/login']['post']['requestBody']['content']['application/json'];
}

export async function postAuthLogin({ init = {}, requestBody }: PostAuthLoginOptions) {
  return client().POST('/rest/auth/login', {
    ...init,
    body: requestBody,
  });
}
