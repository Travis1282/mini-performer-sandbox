import type { components } from '@/contracts/generated/maverick-schema';
import { client } from '@/services/maverick/maverick-client';

export interface PostAuthForgotPasswordOptions {
  body: components['schemas']['ForgotPasswordRequest'];
}

export async function postAuthForgotPassword({ body }: PostAuthForgotPasswordOptions) {
  return client().POST('/rest/auth/forgot-password', {
    parseAs: 'text',
    body,
  } as unknown as { params: { query: { email: string } } }); //todo: fix type
}
