import type { paths } from '@/contracts/generated/maverick-schema';
import { client } from '@/services/maverick/maverick-client';

export interface PostSubscriptionsUnsubscribeOptions {
  init?: Omit<RequestInit, 'body'>;
  requestBody: paths['/rest/subscriptions/unsubscribe']['post']['requestBody']['content']['application/json'];
}

export async function postSubscriptionsUnsubscribe({
  init = {},
  requestBody,
}: PostSubscriptionsUnsubscribeOptions) {
  return client().POST('/rest/subscriptions/unsubscribe', {
    ...init,
    parseAs: 'text',
    body: requestBody,
  });
}
