import type { LocationItem } from '@/components/Shared/SelectLocation/SearchListItem';
import type { Category } from '@/contracts/entities/category';
import type { Region } from '@/contracts/entities/region';
import type { HomeAndAwayType, TimeByType } from '@/contracts/events/eventFiltersTypes';
import type { components } from '@/contracts/generated/maverick-schema';
import type { IFilter } from '@/utils/eventUtils';
import type { DateRange } from 'react-day-picker';
import { useCategories } from '@/contexts/CategoriesContext';
import {
  filterEventFn,
  getFilters,
  prioritizeUSandCanada,
  sortEventList,
} from '@/utils/eventUtils';
import { useMemo, useState } from 'react';
import useDidUpdate from './useDidUpdate';
import { useFilterByQueryParams } from './useFilterByQueryParams';

interface UseFilterEventsProps {
  eventsToFilter?: components['schemas']['CmsPathResponse']['events'];
  performer?: components['schemas']['Performer'];
  selectedCategories?: Category[] | undefined;
  selectedDateRange: DateRange | undefined;
  selectedHomeAway?: HomeAndAwayType | undefined;
  selectedLocation?: LocationItem | undefined;
  selectedRegion?: Region | undefined;
  selectedTime?: TimeByType | undefined;
  selectedTypes?: string[] | undefined;
  sort?: boolean;
}

export const useFilterEvents = ({
  eventsToFilter,
  selectedLocation,
  selectedDateRange,
  selectedTime,
  selectedHomeAway,
  selectedRegion,
  selectedTypes,
  selectedCategories,
  performer,
  sort,
}: UseFilterEventsProps): {
  filters: IFilter;
  events: components['schemas']['Event'][];
} => {
  const filters = useMemo(() => {
    return getFilters(eventsToFilter);
  }, [eventsToFilter]);

  const { categories } = useCategories();

  const events = useMemo(() => {
    const filtered = eventsToFilter?.filter((item) =>
      filterEventFn(
        item,
        performer,
        filters,
        selectedLocation,
        selectedTypes,
        selectedCategories,
        selectedRegion,
        selectedDateRange,
        selectedTime,
        selectedHomeAway,
        categories
      )
    );

    if (!sort) {
      return prioritizeUSandCanada(filtered);
    }
    const sortedList = sortEventList(filtered ?? []);
    return prioritizeUSandCanada(sortedList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    performer,
    eventsToFilter,
    selectedLocation,
    selectedDateRange?.from,
    selectedDateRange?.to,
    filters.disabledDate.before,
    filters.disabledDate.after,
    selectedTime,
    selectedHomeAway,
    selectedRegion,
    selectedTypes,
    selectedCategories,
    prioritizeUSandCanada,
  ]);

  return {
    filters,
    events,
  };
};

export const useFilterQueryEvents = ({
  eventsToFilter,
  regions,
  sort,
}: {
  eventsToFilter: components['schemas']['Event'][];
  regions: Region[];
  sort: boolean;
}): {
  filters: IFilter;
  events: components['schemas']['Event'][];
} => {
  const { categories } = useCategories();

  const {
    time: selectedTime,
    types: selectedTypes,
    homeAway: selectedHomeAway,
    dateRange: selectedDateRange,
    location,
    selectedCategories,
  } = useFilterByQueryParams({
    categories,
    regions,
  });

  const selectedRegion = regions.find((r) => r.id === Number(location));

  const filters = useMemo(() => {
    return getFilters(eventsToFilter);
  }, [eventsToFilter]);
  const filter = () => {
    const filtered = eventsToFilter?.filter((item) =>
      filterEventFn(
        item,
        undefined,
        filters,
        undefined,
        selectedTypes,
        selectedCategories,
        selectedRegion,
        selectedDateRange,
        selectedTime,
        selectedHomeAway,
        categories
      )
    );

    if (!sort) {
      return prioritizeUSandCanada(filtered);
    }

    const sortedList = sortEventList(filtered);
    return prioritizeUSandCanada(sortedList);
  };

  const [events, setEvents] = useState<components['schemas']['Event'][]>(eventsToFilter);

  useDidUpdate(() => {
    const filteredEvents = filter() as components['schemas']['Event'][];
    setEvents(filteredEvents as components['schemas']['Event'][]);
  }, [
    selectedTime,
    selectedTypes,
    selectedHomeAway,
    selectedDateRange,
    location,
    selectedCategories,
    eventsToFilter,
  ]);

  return {
    filters,
    events,
  };
};
