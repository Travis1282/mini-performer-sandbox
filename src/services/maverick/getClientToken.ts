// /rest/payments/client-token
import { client } from '@/services/maverick/maverick-client';

export interface GetClientTokenOptions {
  init?: Omit<RequestInit, 'body'>;
}

export function getClientToken({ init }: GetClientTokenOptions = {}) {
  return client().GET('/rest/payments/client-token', {
    ...(init ?? {}),
  });
}
