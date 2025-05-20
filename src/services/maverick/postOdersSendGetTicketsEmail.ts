'use client';

import type { paths } from '@/contracts/generated/maverick-schema';
import { client } from '@/services/maverick/maverick-client';

export interface PostOrdersSendGetTicketsEmailOptions {
  init?: Omit<RequestInit, 'body'>;
  requestBody: paths['/rest/orders/send-get-tickets-email']['post']['requestBody']['content']['application/json'];
}

export async function postOrdersSendGetTicketsEmail({
  init = {},
  requestBody,
}: PostOrdersSendGetTicketsEmailOptions) {
  return client().POST('/rest/orders/send-get-tickets-email', {
    ...init,
    parseAs: 'text',
    body: requestBody,
  });
}
