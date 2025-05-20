import type { paths } from './generated/maverick-schema';
import { client } from './maverick-client';

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
