import type { DateRange } from 'react-day-picker';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import type { Category } from '@/contracts/entities/category';
import type { Region } from '@/contracts/entities/region';
import type { HomeAndAwayType, TimeByType } from '@/contracts/events/eventFiltersTypes';
import type { components } from '@/contracts/generated/maverick-schema';
// import type { FilterListIterable } from '@/store/EventListStore';
// import type { DateRange } from 'react-day-picker';
import { HomeAndAwayOptions, TimeOptions } from '@/contracts/events/eventFiltersTypes';
import { leagueMap } from '@/contracts/sports';
import type { ImageApiParams } from './helpers';
import { NEARBY_REGION_RADIUS } from './constants';
import { resolveImagePath, sanitizeString } from './helpers';

type Event = components['schemas']['Event'];

dayjs.extend(isBetween);

const today = new Date();
today.setUTCHours(0, 0, 0, 0);

export interface LocationItem {
  city: string;
  country?: string;
  location: {
    lat: number;
    lng: number;
  };
  state: string;
}

export interface VenuePropsNeeded {
  city?: string;
  country?: string;
  id?: number;
  regionId?: number;
  state?: string;
}

export interface EventPropsNeeded {
  eventPerformers?: {
    master?: boolean;
    performerId?: number;
    performer?: {
      primaryCategoryId?: number;
    };
  }[];
  eventTimeLocal?: string;
  status?: string;
  venue?: VenuePropsNeeded;
}

export interface IFilter {
  disabledDate: {
    after: Date;
    before: Date;
  };
  eventsToFilter?: components['schemas']['Event'][];
  locations: LocationItem[];
}

export interface LocationSphere {
  lat: number;
  long: number;
}

export type Template = 'category' | 'parking-performer' | 'performer-page' | 'performer' | 'venue';

/**
 * Returns the hero image URL for a given template and data.
 *
 * @param {Template} template - The template type ('performer', 'performer-page', 'category', 'venue').
 * @param {Performer | Category | Venue} data - The data object containing the necessary information.
 * @param {ImageApiParams} [loaderParams] - The optional loader parameters for the image.
 * @returns {string} - The hero image URL.
 */
export const getHeroImage = (
  template: Template,
  data?:
    | components['schemas']['Category']
    | components['schemas']['Performer']
    | components['schemas']['Venue'],
  loaderParams?: ImageApiParams
) => {
  const defaultImage = {
    performer: '/img/general-performer.webp',
    'parking-performer': '/img/general-performer.webp',
    'performer-page': '/img/general-performer.webp',
    category: '/img/general-performer.webp',
    venue: '/img/general-venue.webp',
  }[template];

  let imagePath = undefined;

  if (template === 'performer' || template === 'performer-page') {
    const performerPath = data
      ? data?.heroImagePath ||
        ('primaryCategory' in data
          ? data?.primaryCategory?.performerHeroImagePath || data?.primaryCategory?.heroImagePath
          : undefined)
      : undefined;

    imagePath = performerPath;
  }

  if (template === 'parking-performer') {
    const parkingPerformerPath =
      data && 'performerHeroImagePath' in data
        ? (data?.performerHeroImagePath ?? data?.heroImagePath)
        : undefined;

    imagePath = parkingPerformerPath;
  }

  if (template === 'category') {
    const categoryPath = data?.heroImagePath;

    imagePath = categoryPath;
  }

  if (template === 'venue') {
    const venuePath = data?.heroImagePath;

    imagePath = venuePath;
  }

  return resolveImagePath(imagePath ?? defaultImage, loaderParams);
};

export const getEventTitle = (
  data?:
    | components['schemas']['Category']
    | components['schemas']['Performer']
    | components['schemas']['Venue'],
  options?: { titleOverride?: string }
) => {
  if (!data) {
    return '';
  }

  if (options?.titleOverride) {
    if (data.name.includes('Tickets')) {
      return `${data.name.replace('Tickets', options.titleOverride)}`;
    }
    return `${data.name} ${options.titleOverride}`;
  }
  return !(data?.name ?? '').includes('Tickets') ? `${data?.name} Tickets` : data?.name;
};

export const sortByDate = (eventA: Event, eventB: Event) => {
  return dayjs(eventA.eventTimeLocal).isBefore(eventB.eventTimeLocal) ? -1 : 1;
};

export function getEventTicketsPath(event: components['schemas']['Event']) {
  const dateFormat = dayjs(event.eventTimeLocal).format('M-D-YYYY');

  const local = sanitizeString(
    event.venue ? `${event.venue.name}-${event.venue.city}-${event.venue.state}` : ''
  );

  let slug = event.slug || sanitizeString(event.name ?? '');
  if (slug.indexOf('tickets') < 0) {
    slug = slug + '-tickets';
  }

  return `/tickets/${event.id}/${slug}/${local}-${dateFormat}`;
}

export function getEventDateBadge(event: components['schemas']['Event']) {
  const { dateTbd, eventTimeLocal, timeTbd } = event;
  const eventDate = dayjs(eventTimeLocal);
  const today = dayjs(new Date());

  if (eventDate.isBefore(today, 'day') || dateTbd || timeTbd) {
    return undefined;
  }

  // check if is today
  if (eventDate.isSame(today, 'day')) {
    return 'TODAY';
  }

  // if is tomorrow
  if (eventDate.isSame(today.add(1, 'day'), 'day')) {
    return 'TOMORROW';
  }

  const thisFriday = dayjs().startOf('week').add(5, 'day');
  const thisSunday = dayjs().startOf('week').add(7, 'day');

  if (eventDate.isBetween(thisFriday, thisSunday, 'day', '[]')) {
    return 'THIS WEEKEND';
  }
}

function removeTrailingS(str: string) {
  if (str.endsWith('s')) {
    return str.slice(0, -1);
  }
  return str;
}

export function isCategoryRelated(
  categoriesList: Category[],
  category: Category,
  categoryName: string
) {
  function hasRelatedCategory(categoryId: number) {
    const category = categoriesList.find((category) => category.id === categoryId);

    if (category) {
      if (
        (category.name ?? '').toLowerCase().includes(removeTrailingS(categoryName).toLowerCase())
      ) {
        return true;
      }
      if (category.parentId) {
        return hasRelatedCategory(category.parentId);
      }
    }
    return false;
  }
  if (!category) {
    return false;
  }
  if ((category.name ?? '').toLowerCase().includes(categoryName.toLowerCase())) {
    return true;
  } else if (category.parentId) {
    return hasRelatedCategory(category.parentId);
  }

  return false;
}

export function getEventStateAndCountry(event?: components['schemas']['Event']) {
  if (!event) {
    return undefined;
  }
  return {
    state: event?.venue?.state,
    country: event?.venue?.country,
  };
}

export function prioritizeUSandCanada(events?: components['schemas']['Event'][]) {
  const usAndCanadaEvents =
    events?.filter((e) => ['US', 'CA'].includes(e.venue?.country as string)) || [];

  const nonUsAndCanadaEvents =
    events?.filter((e) => !['US', 'CA'].includes(e.venue?.country as string)) || [];

  return [...usAndCanadaEvents, ...nonUsAndCanadaEvents];
}

export function checkCategoriesRecursive(
  verifyCategories: string[],
  categories: Category[],
  item: components['schemas']['Event'] | undefined
) {
  if (verifyCategories && verifyCategories.length > 0) {
    const typesResults: boolean[] = [];
    verifyCategories.forEach((type) => {
      const eventPrimaryCategory = categories.find((category) => {
        return (
          category.id ===
          (item?.eventPerformers && item.eventPerformers[0]?.performer?.primaryCategoryId)
        );
      });
      if (eventPrimaryCategory && !!isCategoryRelated(categories, eventPrimaryCategory, type)) {
        typesResults.push(true);
      } else {
        typesResults.push(false);
      }
    });
    return typesResults.includes(true);
  }
}

export function filterEventFn(
  item: components['schemas']['Event'] | undefined,
  performer: components['schemas']['Performer'] | undefined,
  filters: IFilter,
  selectedLocation: LocationItem | undefined,
  selectedTypes: string[] | undefined,
  selectedCategories: Category[] | undefined,
  selectedRegion: components['schemas']['Region'] | undefined,
  selectedDateRange: DateRange | undefined,
  selectedTime: TimeByType | undefined,
  selectedHomeAway: HomeAndAwayType | undefined,
  categories: Category[]
) {
  const locationCheck = selectedLocation
    ? item?.venue?.city === selectedLocation.city && item?.venue?.state === selectedLocation.state
    : true;

  const typesCheck =
    selectedTypes && selectedTypes.length > 0
      ? checkCategoriesRecursive(selectedTypes, categories, item)
      : true;

  const categoriesCheck =
    selectedCategories && selectedCategories.length > 0
      ? checkCategoriesRecursive(
          selectedCategories.map((category) => category?.name ?? ''),
          categories,
          item
        )
      : true;

  const regionCheck = selectedRegion ? item?.venue?.regionId === selectedRegion.id : true;

  const eventDate = dayjs(item?.eventTimeLocal, "yyyy-MM-dd'T'HH:mm:ss");
  const dateRangeCheck =
    selectedDateRange?.from && selectedDateRange?.to
      ? eventDate.isBetween(selectedDateRange?.from, selectedDateRange.to)
      : eventDate.isBetween(filters.disabledDate.before, filters.disabledDate.after);

  const timeCheck =
    selectedTime === undefined || selectedTime === TimeOptions[0]
      ? true
      : selectedTime === TimeOptions[1]
        ? eventDate.hour() >= 6 && eventDate.hour() < 18
        : eventDate.hour() >= 18 || eventDate.hour() < 6;

  const homeAwayCheck =
    selectedHomeAway === undefined || selectedHomeAway === HomeAndAwayOptions[0]
      ? true
      : selectedHomeAway === HomeAndAwayOptions[1]
        ? item?.eventPerformers?.find((ep) => ep.master)?.performerId === performer?.id
        : item?.eventPerformers?.find((ep) => ep.master)?.performerId !== performer?.id;

  // TODO: Is this an existing field under Event schema?
  // const isCancelled = item?.status === 'CANCELLED'

  return (
    locationCheck &&
    dateRangeCheck &&
    timeCheck &&
    homeAwayCheck &&
    regionCheck &&
    typesCheck &&
    categoriesCheck
  );
}

export function getFilters(eventsToFilter?: components['schemas']['Event'][]): IFilter {
  const eventTimeLocalList = eventsToFilter
    ? eventsToFilter?.map((event) => dayjs(event.eventTimeLocal).valueOf())
    : [];
  const firstEventDate = (
    eventTimeLocalList.length ? dayjs(Math.min(...eventTimeLocalList)) : dayjs()
  ).startOf('day');

  const lastEventDate = (
    eventTimeLocalList.length ? dayjs(Math.max(...eventTimeLocalList)) : dayjs()
  ).endOf('day');

  const locations = new Set<string>();
  eventsToFilter?.forEach((item) => {
    locations.add(
      JSON.stringify({
        city: item.venue?.city,
        state: item.venue?.state,
      })
    );
  });

  return {
    eventsToFilter,
    locations: Array.from(locations).map((item) => JSON.parse(item)),
    disabledDate: {
      after: lastEventDate.toDate(),
      before: firstEventDate.toDate(),
    },
  };
}

export function getLowestPriceListing(listings: components['schemas']['Listing'][]) {
  if (!listings.length) {
    return undefined;
  }

  return (
    listings?.reduce((acc, listing) => {
      if (acc) {
        if ((acc.displayPrice ?? 0) > (listing?.displayPrice ?? 0)) {
          return listing;
        }
        return acc;
      }
      return listing;
    })?.displayPrice || undefined
  );
}

export interface ProcessedQueryParams {
  dateRange: DateRange | undefined;
  daytime: boolean;
  homeAway: HomeAndAwayType | undefined;
  location: components['schemas']['Region'] | undefined;
  selectedCategories: Category[] | undefined;
  time: TimeByType | undefined;
  types: string[] | undefined;
}

export function processFilterQueryParams(
  queryParams: Record<string, null | string>,
  regions: components['schemas']['Region'][] | undefined,
  categoriesList: Category[] | undefined
): ProcessedQueryParams {
  const { time, from, to, types, homeAway, categories, location } = queryParams;

  const typesValue = types ? types?.split(',') : [];

  const dateRangeValue =
    from || to
      ? {
          from: from ? new Date(from) : undefined,
          to: to ? new Date(to) : undefined,
        }
      : undefined;

  const selectedCategories = categoriesList
    ? getCategoriesByQueryParam(categoriesList, categories)
    : [];

  const locationObject = regions
    ? regions.find((r: components['schemas']['Region']) => (r.id as number).toString() === location)
    : undefined;
  const homeAwayValue = homeAway ?? undefined;
  const timeValue = time ?? undefined;
  const daytime = time === TimeOptions[1];

  return {
    dateRange: dateRangeValue as DateRange | undefined,
    selectedCategories: selectedCategories.length
      ? selectedCategories
      : (undefined as Category[] | undefined),
    location: locationObject,
    homeAway: homeAwayValue as HomeAndAwayType | undefined,
    time: timeValue as TimeByType | undefined,
    types: typesValue.length ? typesValue : undefined,
    daytime,
  };
}
export function getCategoriesByQueryParam(categories: Category[], queryParam: null | string) {
  return (
    queryParam
      ? queryParam.split(',').map((item) =>
          categories.find((cat) => {
            const [slug] = item.split(':');
            return cat.slug === slug;
          })
        )
      : []
  ) as Category[];
}

export const filterAndSort = ({
  events,
  categories,
  performer,
  regions,
  params,
  sort,
}: {
  events?: components['schemas']['Event'][];
  categories: Category[];
  performer?: components['schemas']['Performer'];
  sort?: boolean;
  regions: components['schemas']['Region'][];
  params: Record<string, null | string> | undefined;
}) => {
  const filters = getFilters(events);
  const formattedParams = processFilterQueryParams(params || {}, regions, categories);

  const filtered = events?.filter((item) =>
    filterEventFn(
      item,
      performer,
      filters,
      undefined,
      formattedParams.types,
      formattedParams.selectedCategories,
      formattedParams.location,
      formattedParams.dateRange,
      formattedParams.time,
      formattedParams.homeAway,
      categories
    )
  );

  const filteredEvents = (
    sort
      ? prioritizeUSandCanada(sortEventList(filtered ?? []))
      : prioritizeUSandCanada(filtered) || []
  ) as Event[];
  return { filters, filteredEvents };
};

export const findLocalEvents = ({
  events,
  region,
  isNearbyEventsActivated,
}: {
  events: Event[];
  region: Region | undefined;
  isNearbyEventsActivated?: boolean;
}): Event[] => {
  if (!region || region.id === 0) {
    return [];
  }

  if (!isNearbyEventsActivated) {
    return events?.filter((event: Event) => event.venue?.regionId === region?.id);
  }

  return events
    ?.map((event: Event) => {
      if (event.venue?.latitude && event.venue?.longitude && region.latitude && region.longitude) {
        const distance = calculateDistanceInMiles(
          { lat: region.latitude, long: region.longitude },
          { lat: event.venue.latitude, long: event.venue.longitude }
        );
        return { event, distance };
      }
      return null;
    })
    ?.filter(
      (item): item is { event: Event; distance: number } =>
        item !== null && item.distance < NEARBY_REGION_RADIUS
    )
    ?.sort((a, b) => a.distance - b.distance)
    ?.map((item) => item.event);
};

//haversine formula
export const calculateDistanceInMiles = (source: LocationSphere, target: LocationSphere) => {
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

  const difLat = toRadians(target.lat - source.lat);
  const difLong = toRadians(target.long - source.long);

  const halfChordLength =
    Math.sin(difLat / 2) * Math.sin(difLat / 2) +
    Math.cos(toRadians(source.lat)) *
      Math.cos(toRadians(target.lat)) *
      Math.sin(difLong / 2) *
      Math.sin(difLong / 2);

  const angularDistance =
    2 * Math.atan2(Math.sqrt(halfChordLength), Math.sqrt(1 - halfChordLength));

  const R = 3958.8; // Radius of the Earth in miles

  return R * angularDistance;
};

export const findRegionsWithEvents = ({
  events,
  regions,
}: {
  events?: Event[];
  regions: components['schemas']['Region'][];
}) => {
  if (!events?.length) {
    return [];
  }
  const eventsRegionsId = new Set(events.map((event) => event.venue?.regionId));
  const reinventRegions = regions.filter((region) => eventsRegionsId.has(region.id));
  return reinventRegions;
};

export const sortEventList = (events: components['schemas']['Event'][]) =>
  events?.sort((a, b) => {
    const aParsed = dayjs(a.eventTimeLocal, "yyyy-MM-dd'T'HH:mm:ss");
    const bParsed = dayjs(b.eventTimeLocal, "yyyy-MM-dd'T'HH:mm:ss");
    if (aParsed.isAfter(bParsed)) {
      return 1;
    }
    if (aParsed.isBefore(bParsed)) {
      return -1;
    }
    return 0;
  });

export enum FilterList {
  homeAndAway = 'homeAndAway',
  dateRangePicker = 'dateRangePicker',
  time = 'time',
  eventType = 'eventType',
  category = 'category',
  selectRegion = 'selectRegion',
}

export enum PageTypeTemplate {
  Performer = 'performer',
  Venue = 'venue',
  LeagueCategory = 'league-category',
  Category = 'category',
}

export interface PageTypeData {
  cookies?: {
    name: string;
    value: string;
    attributes: { 'Max-Age': number };
  }[];
  drilledData?: components['schemas']['Performer'];
  // filtersToShow: FilterListIterable;
  hasHomeVenueId: boolean;
  hasNextPage: boolean;
  paginationCategoryIds: number[];
  paginationPageSize: number;
  paginationType?: PageTypeTemplate;
  type: PageTypeTemplate;
}

type DrilledData =
  | components['schemas']['Category']
  | components['schemas']['Performer']
  | components['schemas']['Venue']
  | undefined;

export const findPageType = (data?: components['schemas']['CmsPathResponse']): PageTypeData => {
  const pageParameters = {
    type: undefined as Template | undefined,
    drilledData: undefined as DrilledData,
    filtersToShow: {},
    paginationType: undefined as
      | PageTypeTemplate.Category
      | PageTypeTemplate.LeagueCategory
      | undefined,
    paginationPageSize: 20,
    hasNextPage: false,
    paginationCategoryIds: [] as number[],
    hasHomeVenueId: false,
  };
  switch (data?.template) {
    case PageTypeTemplate.Venue:
    case `${PageTypeTemplate.Venue}-page`:
      // eslint-disable-next-line no-case-declarations
      const venueData = data;
      pageParameters.type = PageTypeTemplate.Venue;
      pageParameters.drilledData = venueData?.venue;
      pageParameters.filtersToShow = {
        [FilterList.eventType]: true,
        [FilterList.category]: true,
        [FilterList.dateRangePicker]: true,
        [FilterList.time]: true,
      };
      break;
    case PageTypeTemplate.Category:
      // eslint-disable-next-line no-case-declarations
      const categoryData = data;
      pageParameters.drilledData = categoryData.category;
      // eslint-disable-next-line no-case-declarations
      const isALeagueCategory =
        data && 'category' in data
          ? !!Object.keys(leagueMap).find((key) => key.includes(data?.category?.slug ?? ''))
          : false;

      // eslint-disable-next-line no-case-declarations
      const type = isALeagueCategory ? PageTypeTemplate.LeagueCategory : PageTypeTemplate.Category;

      pageParameters.type = type as Template;

      if (data?.paginatedEvents?.pagination) {
        pageParameters.hasNextPage = data?.paginatedEvents?.pagination?.hasNextPage ?? false;
        pageParameters.paginationType = type;
        pageParameters.paginationPageSize = data?.paginatedEvents?.pagination?.pageSize ?? 20;
      }
      pageParameters.filtersToShow = {
        [FilterList.dateRangePicker]: true,
        [FilterList.time]: true,
        [FilterList.selectRegion]: isALeagueCategory,
      };
      break;
    default:
      // eslint-disable-next-line no-case-declarations
      const performerData = data;
      // eslint-disable-next-line no-case-declarations
      const parking = performerData?.performer?.parking;
      pageParameters.hasHomeVenueId = !!performerData?.performer?.homeVenueId;
      pageParameters.type = PageTypeTemplate.Performer;
      pageParameters.drilledData = performerData?.performer;
      pageParameters.filtersToShow = {
        [FilterList.selectRegion]: pageParameters.hasHomeVenueId,
        [FilterList.homeAndAway]: pageParameters.hasHomeVenueId && !parking,
        [FilterList.dateRangePicker]: true,
        [FilterList.time]: true,
      };
      break;
  }
  return pageParameters as PageTypeData;
};

export function findMasterPerformerFromEvent(
  event?: components['schemas']['Event']
): components['schemas']['EventPerformer'] | undefined {
  return (
    (event &&
      event?.eventPerformers &&
      event?.eventPerformers?.find((performer) => performer.master)) ??
    event?.eventPerformers?.[0]
  );
}
export const shouldUseLocalEvents = ({
  pageType,
  hasHomeVenueId,
}: {
  pageType: PageTypeTemplate | undefined;
  hasHomeVenueId: boolean;
}) =>
  pageType !== PageTypeTemplate.Venue &&
  pageType !== PageTypeTemplate.LeagueCategory &&
  !hasHomeVenueId;

export const shouldUseAllEvents = ({
  localEvents,
  pageType,
}: {
  localEvents: Event[];
  pageType: PageTypeTemplate;
}) => pageType !== PageTypeTemplate.Category || localEvents.length === 0;

export const findHeading = ({
  hasHomeVenueId,
  searchParams,
  selectedTrendingRegion,
  useLocalEvents,
  hasLocalEvents,
  pageType,
}: {
  hasHomeVenueId: boolean;
  searchParams: Record<string, null | string>;
  selectedTrendingRegion: Region | undefined;
  useLocalEvents: boolean;
  hasLocalEvents: boolean;
  pageType: PageTypeTemplate;
}) => {
  const homeAway = searchParams.homeAway;
  const eventIsGame = hasHomeVenueId;
  const eventType = eventIsGame ? 'Game' : 'Event';
  const home = homeAway === 'Home games' && 'Home';
  const away = homeAway === 'Away games' && 'Away';
  const teamLocation = home || away || 'All';

  const homeAndAwayTitle = `${
    eventIsGame ? `${teamLocation} ${eventType}s` : `All ${eventType}s`
  } `;

  const shouldShowLocation = selectedTrendingRegion?.id && useLocalEvents && hasLocalEvents;

  const heading = shouldShowLocation ? `${eventType}s Near` : '';
  const location = shouldShowLocation ? (selectedTrendingRegion?.name ?? '') : `All ${eventType}s`;

  if (pageType === PageTypeTemplate.Category) {
    return {
      heading: hasLocalEvents ? `${eventType}s Near` : '',
      location:
        hasLocalEvents && selectedTrendingRegion?.name
          ? selectedTrendingRegion.name
          : `All ${eventType}s`,
      homeAndAwayTitle: '',
    };
  }

  return { heading, location, homeAndAwayTitle };
};

export function shouldShowSeatedTogether({
  isMultiple,
  event,
  listing,
}: {
  isMultiple: boolean;
  event?: components['schemas']['Event'];
  listing?: components['schemas']['Listing'];
}) {
  return (
    isMultiple &&
    !event?.venueConfiguration?.generalAdmission &&
    !listing?.flex &&
    !event?.parking &&
    !listing?.attributes?.includes(32) &&
    !listing?.generalAdmission
  );
}

export function shouldShowClearView({
  listing,
  event,
}: {
  listing?: components['schemas']['Listing'];
  event?: components['schemas']['Event'];
}) {
  return (
    !listing?.attributes?.includes(2) &&
    !listing?.attributes?.includes(3) &&
    !listing?.attributes?.includes(9) &&
    !listing?.attributes?.includes(10) &&
    !listing?.attributes?.includes(21) &&
    !listing?.attributes?.includes(22) &&
    !listing?.attributes?.includes(23) &&
    !listing?.attributes?.includes(48) &&
    !listing?.generalAdmission &&
    !event?.parking
  );
}

export function shouldShowFirstRowOfSection({
  listing,
}: {
  listing?: components['schemas']['Listing'];
}) {
  return listing?.attributes?.includes(11);
}

export function shouldShowAisleSeat({ listing }: { listing?: components['schemas']['Listing'] }) {
  return listing?.attributes?.includes(12);
}

export function splitEventsByParking(events: components['schemas']['Event'][]) {
  const eventEvents = [];
  const parkingEvents = [];

  for (const event of events) {
    if (event.parking) {
      parkingEvents.push(event);
    } else {
      eventEvents.push(event);
    }
  }

  return { eventEvents, parkingEvents };
}

export function getInHandDate(inHandDateOriginal?: string) {
  const inHandDate = dayjs(inHandDateOriginal);
  const today = dayjs();

  if (today.isBefore(inHandDate)) {
    return dayjs(inHandDate);
  }
  return today;
}

export function getRandomizedClickValues(performerStats?: components['schemas']['PerformerStats']) {
  if (!performerStats) {
    return null;
  }

  function formattedRandomValue(value: number) {
    return Intl.NumberFormat('en-US', {
      style: 'decimal',
    }).format(Math.floor(value * (Math.random() * 0.1 + 0.9)));
  }

  if (performerStats?.clicks1Day && performerStats?.clicks1Day >= 1000) {
    return {
      value: formattedRandomValue(performerStats?.clicks1Day),
      period: 'day',
    };
  }

  if (performerStats?.clicks7Day && performerStats?.clicks7Day >= 1000) {
    return {
      value: formattedRandomValue(performerStats?.clicks7Day),
      period: 'week',
    };
  }

  const numberToUse = Math.max(
    ...[
      performerStats?.clicks1Day ?? 0,
      performerStats?.clicks7Day ?? 0,
      performerStats?.clicks30Day ?? 0,
    ]
  );

  if (isNaN(numberToUse)) {
    return null;
  }

  return {
    value: formattedRandomValue(numberToUse),
    period:
      numberToUse === performerStats.clicks1Day
        ? 'day'
        : numberToUse === performerStats.clicks7Day
          ? 'week'
          : numberToUse === performerStats.clicks30Day
            ? 'month'
            : 'week',
  };
}

export function isStaticMapEvent(event: components['schemas']['Event']) {
  return event?.venueConfiguration?.staticMap;
}

export function hasMinimumAge(event?: components['schemas']['Event']) {
  return Boolean(event?.minimumAge);
}

export function getEventName(event?: components['schemas']['Event']) {
  return `${event?.name}${hasMinimumAge(event) ? ` (${event?.minimumAge}+)` : ''}`;
}

export function getEventDimensions(event: components['schemas']['Event']) {
  const eventPerformer = findMasterPerformerFromEvent(event);
  const dimensions: Record<string, number | string | undefined> = eventPerformer?.performer
    ? {
        categoryName: eventPerformer?.performer?.primaryCategory?.name,
        categoryId: eventPerformer?.performer?.primaryCategory?.id,
        eventType: eventPerformer?.performer?.primaryCategory?.eventType,
        performerName: eventPerformer?.performer?.name ?? '',
        eventTimeLocal: event?.eventTimeLocal,
        countryCode: event?.venue?.country,
        regionName: event?.venue?.regionName,
        nextOnsaleTimeLocal: event?.nextOnsaleTimeLocal,
        nextPresaleTimeLocal: event?.nextPresaleTimeLocal,
        lastOnsaleTimeLocal: event?.lastOnsaleTimeLocal,
        lastPresaleTimeLocal: event?.lastPresaleTimeLocal,
        venueCapacity: event?.venue?.capacity,
        performerRank: eventPerformer?.performer?.popularity,
        venueRank: event?.venue?.popularity,
        pricingType: event?.pricingType,
      }
    : {};
  return dimensions;
}
