import type { paths } from '@/contracts/generated/maverick-schema';
import { client } from '@/services/maverick/maverick-client';

export interface GetCategoriesOptions {
  init?: Omit<RequestInit, 'body'>;
  params?: paths['/rest/categories']['get']['parameters'];
}

export function getCategories({ init, params }: GetCategoriesOptions = {}) {
  return client().GET('/rest/categories', {
    ...(init ?? {}),
    params,
  });
}
