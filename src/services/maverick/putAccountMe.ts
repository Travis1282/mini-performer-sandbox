'use client';

import type { paths } from '@/contracts/generated/maverick-schema';
import { client } from '@/services/maverick/maverick-client';

export interface PutAccountMeOptions {
  init?: Omit<RequestInit, 'body'>;
  requestBody: paths['/rest/account/me']['put']['requestBody']['content']['application/json'];
}

export async function putAccountMe({ init = {}, requestBody }: PutAccountMeOptions) {
  return client().PUT('/rest/account/me', {
    ...init,
    body: requestBody,
  });
}
