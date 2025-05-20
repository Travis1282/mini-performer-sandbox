import type { paths } from '@/contracts/generated/maverick-schema';
import { client } from '@/services/maverick/maverick-client';

export interface PostAuthResetPasswordOptions {
  init?: Omit<RequestInit, 'body'>;
  requestBody: paths['/rest/auth/reset-password']['post']['requestBody']['content']['application/json'];
}

export async function postAuthResetPassword({
  init = {},
  requestBody,
}: PostAuthResetPasswordOptions) {
  return client().POST('/rest/auth/reset-password', {
    ...init,
    parseAs: 'text',
    body: requestBody,
  });
}
