import { getEventsPaginated } from '@/services/maverick/getEventsPaginated';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { createContext, type ReactNode, useContext, useMemo, useState } from 'react';
import { useLocation } from 'react-router';
import type { GetPerformerDataResp } from '../services /getPerformerData';

interface EventsContextType {
  error: Error | null;
  eventsData: Awaited<ReturnType<typeof getEventsPaginated>> | undefined;
  isLoading: boolean;
  refetchEvents: () => void;
  shouldRefetch: boolean;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

interface EventsProviderProps {
  children: ReactNode;
  initialData: GetPerformerDataResp['eventsListResp'];
  performerId: number;
}

export function EventsProvider({ children, performerId, initialData }: EventsProviderProps) {
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const location = useLocation();

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

  const queryParams = useMemo(() => {
    const baseParams: {
      performerId: number[];
      categoryId?: number[];
      eventType?: ('COMEDY' | 'CONCERTS' | 'PARKING' | 'SPORTS' | 'THEATER')[];
      eventTimeFrom?: string;
      eventTimeTo?: string;
      pageSize: number;
      sortBy: string;
      sortDirection: 'ASC' | 'DESC';
      regionId?: number;
    } = {
      performerId: [performerId],
      pageSize: 20,
      sortBy: 'eventTimeLocal',
      sortDirection: 'ASC',
    };

    // Only add parameters if they have valid values
    if (urlParams.categories.length > 0) {
      baseParams.categoryId = urlParams.categories;
    }

    if (urlParams.types.length > 0) {
      baseParams.eventType = urlParams.types as (
        | 'COMEDY'
        | 'CONCERTS'
        | 'PARKING'
        | 'SPORTS'
        | 'THEATER'
      )[];
    }

    if (urlParams.from) {
      baseParams.eventTimeFrom = dayjs(urlParams.from).format('YYYY-MM-DDT00:00:00');
    }

    if (urlParams.to) {
      baseParams.eventTimeTo = dayjs(urlParams.to).format('YYYY-MM-DDT23:59:59');
    }

    if (urlParams.regionId) {
      const parsedRegionId = parseInt(urlParams.regionId, 10);
      if (!isNaN(parsedRegionId)) {
        baseParams.regionId = parsedRegionId;
      }
    }

    return baseParams;
  }, [performerId, urlParams]);

  const {
    data: eventsData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [
      'event-list',
      'get',
      performerId,
      urlParams.categories,
      urlParams.types,
      urlParams.from,
      urlParams.to,
      urlParams.regionId,
    ],
    queryFn: () => {
      console.log('EventsContext API Request Parameters:', queryParams);
      console.log('URL Params:', urlParams);
      return getEventsPaginated({
        query: queryParams,
      });
    },
    enabled: true,
    initialData,
  });

  const refetchEvents = () => {
    setShouldRefetch(true);
    refetch();
  };

  return (
    <EventsContext.Provider
      value={{
        eventsData,
        isLoading,
        error,
        refetchEvents,
        shouldRefetch,
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
