import dayjs from 'dayjs';
import { createContext, type ReactNode, useContext, useMemo } from 'react';
import { useLocation } from 'react-router';
import type { Region } from '@/contracts/entities/region';
import type { TimeByType } from '@/contracts/events/eventFiltersTypes';
import type { components } from '@/contracts/generated/maverick-schema';
import { useRegionsContext } from '@/services/categories/use-regions-context';
import {
  filterEventFn,
  getFilters,
  prioritizeUSandCanada,
  sortEventList,
} from '@/utils/eventUtils';
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
  const regions = useRegionsContext();

  const urlParams = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);

    const types = searchParams.get('types');
    const parsedTypes: string[] = [];
    if (types) {
      const typeParts = types.split(',');
      for (const type of typeParts) {
        const upperType = type.toUpperCase().trim();
        if (
          upperType === 'CONCERTS' ||
          upperType === 'COMEDY' ||
          upperType === 'SPORTS' ||
          upperType === 'THEATER' ||
          upperType === 'PARKING'
        ) {
          parsedTypes.push(upperType);
        }
      }
    }

    const from = searchParams.get('from');
    const to = searchParams.get('to');
    let validFrom: string | undefined = undefined;
    let validTo: string | undefined = undefined;

    if (from) {
      const decodedFrom = decodeURIComponent(from);
      const fromDay = dayjs(decodedFrom);
      if (fromDay.isValid()) {
        validFrom = decodedFrom;
      }
    }

    if (to) {
      const decodedTo = decodeURIComponent(to);
      const toDay = dayjs(decodedTo);
      if (toDay.isValid()) {
        validTo = decodedTo;
      }
    }

    const locationParam = searchParams.get('location');

    return {
      types: parsedTypes,
      from: validFrom,
      to: validTo,
      regionId: locationParam,
    };
  }, [location.search]);

  const filteredEvents = useMemo(() => {
    if (!initialData) {
      return [];
    }
    if (!Array.isArray(initialData)) {
      return [];
    }
    if (initialData.length === 0) {
      return [];
    }

    const filters = getFilters(initialData);

    const searchParams = new URLSearchParams(location.search);

    let selectedRegion: Region | undefined = undefined;
    if (urlParams.regionId) {
      for (const region of regions) {
        if (region.id.toString() === urlParams.regionId) {
          selectedRegion = region;
          break;
        }
      }
    }

    let dateRange: { from: Date; to: Date } | undefined = undefined;
    if (urlParams.from && urlParams.to) {
      const fromDate = new Date(urlParams.from);
      const toDate = new Date(urlParams.to);
      dateRange = {
        from: fromDate,
        to: toDate,
      };
    }

    const timeParam = searchParams.get('time');
    let selectedTime: TimeByType | undefined = undefined;
    if (timeParam) {
      const decodedTime = decodeURIComponent(timeParam);
      if (decodedTime === 'Day/Night') {
        selectedTime = decodedTime as TimeByType;
      } else if (decodedTime === 'Day') {
        selectedTime = decodedTime as TimeByType;
      } else if (decodedTime === 'Night') {
        selectedTime = decodedTime as TimeByType;
      }
    }

    const filtered = initialData.filter((event) => {
      const typesToFilter = urlParams.types.length > 0 ? urlParams.types : undefined;

      return filterEventFn(
        event,
        undefined,
        filters,
        undefined,
        typesToFilter,
        undefined,
        selectedRegion,
        dateRange,
        selectedTime,
        undefined,
        []
      );
    });

    const sortedEvents = sortEventList(filtered);
    const prioritizedEvents = prioritizeUSandCanada(sortedEvents);
    const finalEvents = prioritizedEvents as components['schemas']['Event'][];

    return finalEvents;
  }, [initialData, urlParams, regions, location.search]);

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
