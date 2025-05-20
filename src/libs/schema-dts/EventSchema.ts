import type { components } from '@/contracts/generated/maverick-schema';
import type { caProvinceKey } from '@/utils/locations';
import type { Event, WithContext } from 'schema-dts';
import { basePath } from '@/utils/config';
import { getEventTicketsPath } from '@/utils/eventUtils';
import { resolveImagePath } from '@/utils/helpers';
import { caProvinceCodes } from '@/utils/locations';
import dayjs from 'dayjs';

export function getEventStructuredData(
  event: components['schemas']['Event']
  // listings?: components['schemas']['Listing'][]
): WithContext<Event> {
  const baseUrl = basePath;

  const dateInstance = dayjs(event.eventTimeLocal);
  const today = dayjs();

  // Friday, June 21 7:00pm
  const date = dateInstance.format('dddd, MMMM D h:mma');
  const todayFormatted = today.format('YYYY-MM-DD');

  const eventName = event?.name;

  const location = `${event?.venue?.addr1 ? `${event?.venue?.addr1}, ` : ''} ${
    event?.venue?.city ? `${event?.venue?.city}` : ''
  }, ${event?.venue?.state ? `${event?.venue?.state}` : ''} ${
    event?.venue?.postalCode ? `${event?.venue?.postalCode}` : ''
  }`;

  const description = `${eventName} | ${date} | ${location}`;

  // const lowestPrice = listings ? getLowestPriceListing(listings) : undefined

  const mainPerformer =
    event?.eventPerformers?.find((performer) => performer?.master) || event?.eventPerformers?.[0];

  const imagePath = resolveImagePath(mainPerformer?.performer?.heroImagePath);

  const eventPath = getEventTicketsPath(event);

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event?.name,
    description,
    image: imagePath,
    url: `${baseUrl}${eventPath}`,
    eventStatus: 'EventScheduled',
    startDate: dateInstance?.toISOString(),
    endDate: dateInstance?.toISOString(),
    location: {
      '@type': 'Place',
      name: event?.venue?.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: event?.venue?.addr1,
        addressLocality: event?.venue?.city,
        addressRegion: event?.venue?.state,
        postalCode: event?.venue?.postalCode,
        addressCountry: caProvinceCodes?.includes(event?.venue?.state as caProvinceKey)
          ? 'CA'
          : 'US',
      },
    },
    sameAs: `${baseUrl}/venue/${event?.venue?.slug}`,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    performer: event?.eventPerformers?.map((performer) => ({
      name: performer?.performer?.name,
    })),

    offers: {
      '@type': 'Offer',
      validFrom: todayFormatted,
      // price: `${lowestPrice}`,
      priceCurrency: 'USD',
      url: `${baseUrl}${eventPath}`,
      availability: 'InStock',
    },
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  };
}
