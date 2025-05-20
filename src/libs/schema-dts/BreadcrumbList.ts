import type { LinkItem } from '@/components/breadcrumb/helper';
import type { BreadcrumbList, WithContext } from 'schema-dts';

export function breadcrumbList(links: LinkItem[]): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: links.map((item, index) => {
      return {
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@id': item.url,
          name: item.title,
        },
      };
    }),
  };
}
