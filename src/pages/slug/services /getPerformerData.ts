import { redirect } from 'react-router';
import type { Region } from '@/contracts/entities/region';
import type { components } from '@/contracts/generated/maverick-schema';
import { getCms } from '@/services/maverick/getCms';
import { getRegions } from '@/services/maverick/getRegions';
import { getHeroImage } from '@/utils/eventUtils';
import { reThrowError } from '@/utils/reThrowError';
import type { SearchPageParams } from '../types';

export interface GetPerformerDataResp {
  data: components['schemas']['CmsPathResponse'];
  datesWithEvents: { before: Date; after: Date };
  heroImage: string;
  regions: Region[];
  regionsWithEvents: Region[];
  searchParams?: SearchPageParams['searchParams'];
  slug: string;
}

export const getPerformerData = async (
  slug = 'billie-eilish',
  searchParams?: SearchPageParams['searchParams']
): Promise<GetPerformerDataResp | undefined> => {
  try {
    const response = await getCms();
    const regions = await getRegions();

    const currentRegionsWithEvents = regions.filter((region) =>
      response.data?.events?.some((event) => event.venue?.regionId === region.id)
    );

    const eventsOutsideOfRegions = response.data?.events?.filter(
      (event) => !currentRegionsWithEvents.some((region) => region.id === event.venue?.regionId)
    );

    const highestRegionId = Math.max(...regions.map((region) => region.id));

    const regionsOutsideOfRegionApi: Region[] =
      eventsOutsideOfRegions
        ?.filter((event) => event.venue?.regionId && event.venue?.name)
        ?.map((event, index) => {
          return {
            id: highestRegionId + index + 1,
            name: event.venue?.name ?? '',
            latitude: event.venue?.latitude,
            longitude: event.venue?.longitude,
            venueRadius: 100,
            heroImagePath: event.venue?.heroImagePath,
            heroImageCredit: event.venue?.heroImageCredit,
            cardImagePath: event.venue?.cardImagePath,
            slug: event.venue?.slug,
          };
        }) ?? [];

    const regionsWithEvents = [...currentRegionsWithEvents, ...regionsOutsideOfRegionApi];

    const dates = response.data?.events
      ?.map((event) => event.eventTimeLocal)
      .filter((date) => date !== undefined);

    const datesWithEvents = {
      before: new Date(dates?.[0] ?? new Date()),
      after: new Date(dates?.[dates.length - 1] ?? new Date()),
    };

    const { data } = response;

    if (!data) {
      redirect('/404');
      return;
    }

    const heroImage =
      data && 'performer' in data
        ? getHeroImage('performer', data.performer)
        : data && 'category' in data
          ? getHeroImage('category', data.category)
          : 'https://static.gotickets.com/img/go-icon-logo.png';

    return {
      slug,
      searchParams,
      data,
      heroImage,
      regions,
      regionsWithEvents,
      datesWithEvents,
    };
  } catch (error) {
    reThrowError(error);
  }
};
