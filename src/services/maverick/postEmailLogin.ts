import type { components } from '@/contracts/generated/maverick-schema';
import { client } from '@/services/maverick/maverick-client';

export interface PostAuthEmailLoginOptions {
  requestBody: components['schemas']['EmailLoginRequest'];
}

export async function postAuthEmailLogin({ requestBody }: PostAuthEmailLoginOptions) {
  return client().POST('/rest/auth/email-login', {
    params: {
      query: {
        email: requestBody.email || '',
      },
    },
    parseAs: 'text',
  });
}
