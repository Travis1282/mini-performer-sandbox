import { client } from '@/services/maverick/maverick-client';

export interface GetAccountMeOptions {
  init?: Omit<RequestInit, 'body'>;
}

export function getAccountMe({ init }: GetAccountMeOptions = {}) {
  return client().GET('/rest/account/me', {
    ...(init ?? {}),
  });
}
