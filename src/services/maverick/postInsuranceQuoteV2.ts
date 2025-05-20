'use client';

import type { paths } from '@/contracts/generated/maverick-schema';
import { client } from '@/services/maverick/maverick-client';

export interface PostInsuranceQuoteV2Options {
  init?: Omit<RequestInit, 'body'>;
  requestBody: Omit<
    paths['/rest/insurance-quote/v2']['post']['requestBody']['content']['application/json'],
    'userAgent'
  >;
}

export async function postInsuranceQuoteV2({
  init = {},
  requestBody,
}: PostInsuranceQuoteV2Options) {
  return client().POST('/rest/insurance-quote/v2', {
    ...init,
    body: {
      ...requestBody,
      userAgent: typeof window === 'undefined' ? '' : navigator.userAgent,
    },
  });
}
