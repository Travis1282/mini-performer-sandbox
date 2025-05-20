'use server';

import type { SearchAction, WebSite, WithContext } from 'schema-dts';

type SearchActionWithQueryInput = SearchAction & {
  'query-input': string;
};

export async function website(): Promise<WithContext<WebSite>> {
  const protocol = 'https';
  const host = 'gotickets.com';
  const baseUrl = `${protocol}://${host}`;

  const serchActionWeb: SearchActionWithQueryInput = {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${baseUrl}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: baseUrl,
    potentialAction: [serchActionWeb],
  };
}
