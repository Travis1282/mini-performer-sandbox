'use client';

import type { paths } from '@/contracts/generated/maverick-schema';
import { client } from '@/services/maverick/maverick-client';

export interface PostPaymentsStcOptions {
  init?: Omit<RequestInit, 'body'>;
  requestBody: paths['/rest/payments/stc']['post']['requestBody']['content']['application/json'];
}

export async function postPaymentsStc({ init = {}, requestBody }: PostPaymentsStcOptions) {
  return client().POST('/rest/payments/stc', {
    ...init,
    body: requestBody,
  });
}
