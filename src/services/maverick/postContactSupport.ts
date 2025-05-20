'use client';

import type { paths } from '@/contracts/generated/maverick-schema';
import { client } from '@/services/maverick/maverick-client';

export interface PostContactSupportOptions {
  init?: Omit<RequestInit, 'body'>;
  requestBody: paths['/rest/contact/support']['post']['requestBody']['content']['application/json'];
}

export async function postContactSupport({ init = {}, requestBody }: PostContactSupportOptions) {
  return client().POST('/rest/contact/support', {
    ...init,
    body: requestBody,
    parseAs: 'text',
  });
}
