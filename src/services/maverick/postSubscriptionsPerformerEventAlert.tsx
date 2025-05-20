import type { paths } from '@/contracts/generated/maverick-schema';
import { client } from '@/services/maverick/maverick-client';

export interface PostSubsciptionsPerformerEventAlertOptions {
  body: paths['/rest/subscriptions/performer-event-alert']['post']['requestBody']['content']['application/json'];
  init?: RequestInit;
}

export function postSubsciptionsPerformerEventAlert({
  init,
  body,
}: PostSubsciptionsPerformerEventAlertOptions) {
  return client().POST('/rest/subscriptions/performer-event-alert', {
    ...(init ?? {}),
    body,
  });
}
