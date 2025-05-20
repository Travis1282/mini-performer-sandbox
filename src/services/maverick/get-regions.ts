import { client } from './maverick-client';

export interface GetRegionsOptions {
  init?: Omit<RequestInit, 'body'>;
}

export function getRegions(options: GetRegionsOptions = {}) {
  return client().GET('/rest/regions', {
    ...(options.init ?? {}),
  });
}
