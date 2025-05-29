import type { Category } from '@/contracts/entities/category';
import type { Region } from '@/contracts/entities/region';
import type { TimeByType } from '@/contracts/events/eventFiltersTypes';
import type { components } from '@/contracts/generated/maverick-schema';
import { useCategoriesContext } from '@/services/categories/use-categories-context';
import { useRegionsContext } from '@/services/categories/use-regions-context';
import {
  filterEventFn,
  getFilters,
  prioritizeUSandCanada,
  sortEventList,
} from '@/utils/eventUtils';
import dayjs from 'dayjs';
import { createContext, type ReactNode, useContext, useMemo } from 'react';
import { useLocation } from 'react-router';
import type { GetPerformerDataResp } from '../services /getPerformerData';

interface EventsContextType {
  eventsData: components['schemas']['Event'][];
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

interface EventsProviderProps {
  children: ReactNode;
  initialData: GetPerformerDataResp['data']['events'];
}

export function EventsProvider({ children, initialData }: EventsProviderProps) {
  const location = useLocation();
  const categories = useCategoriesContext();
  const regions = useRegionsContext();

  const urlParams = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);

    const categories = searchParams.get('categories');
    const types = searchParams.get('types');
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const locationParam = searchParams.get('location');

    const parsedCategories = categories
      ? categories
          .split(',')
          .map((cat) => {
            const [, id] = cat.split(':');
            const parsedId = id ? parseInt(id, 10) : null;
            return parsedId && !isNaN(parsedId) ? parsedId : null;
          })
          .filter((id): id is number => id !== null)
      : [];

    const validEventTypes = ['CONCERTS', 'COMEDY', 'SPORTS', 'THEATER', 'PARKING'];
    const parsedTypes = types
      ? types
          .split(',')
          .map((type) => type.toUpperCase().trim())
          .filter((type) => validEventTypes.includes(type))
      : [];

    const parsedFrom = from ? decodeURIComponent(from) : undefined;
    const parsedTo = to ? decodeURIComponent(to) : undefined;
    const validFrom = parsedFrom && dayjs(parsedFrom).isValid() ? parsedFrom : undefined;
    const validTo = parsedTo && dayjs(parsedTo).isValid() ? parsedTo : undefined;

    return {
      categories: parsedCategories,
      types: parsedTypes,
      from: validFrom,
      to: validTo,
      regionId: locationParam,
    };
  }, [location.search]);

  const filteredEvents = useMemo(() => {
    if (!initialData || !Array.isArray(initialData)) {
      return [];
    }

    const filters = getFilters(initialData);

    // Convert URL params to filter parameters
    const selectedCategories: Category[] =
      urlParams.categories.length > 0
        ? categories.filter((cat) => urlParams.categories.includes(cat.id))
        : [];

    const selectedRegion: Region | undefined = urlParams.regionId
      ? regions.find((region) => region.id.toString() === urlParams.regionId)
      : undefined;

    const dateRange =
      urlParams.from && urlParams.to
        ? {
            from: new Date(urlParams.from),
            to: new Date(urlParams.to),
          }
        : undefined;

    const searchParams = new URLSearchParams(location.search);
    const timeParam = searchParams.get('time');
    let selectedTime: TimeByType | undefined;

    if (timeParam) {
      const decodedTime = decodeURIComponent(timeParam);
      if (decodedTime === 'Day/Night' || decodedTime === 'Day' || decodedTime === 'Night') {
        selectedTime = decodedTime as TimeByType;
      }
    }

    const filtered = initialData.filter((event) =>
      filterEventFn(
        event,
        undefined,
        filters,
        undefined,
        urlParams.types.length > 0 ? urlParams.types : undefined,
        selectedCategories.length > 0 ? selectedCategories : undefined,
        selectedRegion,
        dateRange,
        selectedTime,
        undefined,
        categories
      )
    );

    const sortedEvents = sortEventList(filtered);
    return prioritizeUSandCanada(sortedEvents) as components['schemas']['Event'][];
  }, [initialData, urlParams, categories, regions, location.search]);

  return (
    <EventsContext.Provider
      value={{
        eventsData: filteredEvents,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventsContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return context;
}
