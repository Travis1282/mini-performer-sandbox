import type { paths } from '@/contracts/generated/maverick-schema';
import { client } from '@/services/maverick/maverick-client';

export interface GetCmsRegionOptions {
  init?: Omit<RequestInit, 'body'>;
  params: paths['/rest/cms/region']['get']['parameters'];
}

export function getCmsRegion({ init = {}, params }: GetCmsRegionOptions) {
  // path is more than just a slug, has `region` as a prefix in cms
  const newParams = {
    ...params,
    query: {
      ...params.query,
      path: `/region/${params.query.path}`,
    },
  };
  return client().GET('/rest/cms/region', {
    ...init,
    params: newParams,
  });
}
