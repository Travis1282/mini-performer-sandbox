import { client } from '@/services/maverick/maverick-client';
import { OneDayInSeconds } from './../../utils/contants';

export function getListingAttributes() {
  return client().GET('/rest/listing-attributes', {
    next: {
      revalidate: OneDayInSeconds,
    },
    cache: 'force-cache',
  });
}
