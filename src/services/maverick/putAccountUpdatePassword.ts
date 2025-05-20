import type { paths } from '@/contracts/generated/maverick-schema';
import { client } from '@/services/maverick/maverick-client';

export interface PutAccountUpdatePassword {
  init?: Omit<RequestInit, 'body'>;
  requestBody: paths['/rest/account/me/password']['put']['requestBody']['content']['application/json'];
}

export async function putAccountUpdatePassword({
  init = {},
  requestBody,
}: PutAccountUpdatePassword) {
  return client().PUT('/rest/account/me/password', {
    ...init,
    parseAs: 'text',
    body: requestBody,
  });
}
