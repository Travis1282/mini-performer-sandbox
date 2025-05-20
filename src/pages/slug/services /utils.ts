import type { components } from '@/contracts/generated/maverick-schema';
import type { SearchPageParams } from '../types';

export const checkHasEventsForSimpleView = (
  semSimpleViewEnabled: boolean,
  hasVenueOrRegionFilters: boolean,
  searchParams: SearchPageParams['searchParams'],
  performerData: components['schemas']['CmsPathResponse']
): boolean => {
  if (!semSimpleViewEnabled || !hasVenueOrRegionFilters) {
    return true;
  }

  if (searchParams?.region) {
    const regionId = Number(searchParams.region);
    return performerData?.events?.some((e) => e.venue?.regionId === regionId) ?? false;
  }

  if (searchParams?.venue) {
    const venueId = Number(searchParams.venue);
    return performerData?.events?.some((e) => e.venueId === venueId) ?? false;
  }

  return true;
};
