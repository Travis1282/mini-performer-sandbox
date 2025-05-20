import type { paths } from '@/contracts/generated/maverick-schema';
import { client } from '@/services/maverick/maverick-client';

export interface PostAuthMagicLinkLoginOptions {
  init?: Omit<RequestInit, 'body'>;
  requestBody: paths['/rest/auth/magic-link-login']['post']['requestBody']['content']['application/json'];
}

export async function postAuthMagicLinkLogin({
  init = {},
  requestBody,
}: PostAuthMagicLinkLoginOptions) {
  return client().POST('/rest/auth/magic-link-login', {
    ...init,
    body: requestBody,
  });
}
