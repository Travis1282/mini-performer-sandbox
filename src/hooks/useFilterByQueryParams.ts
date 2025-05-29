'use client';

import type { Category } from '@/contracts/entities/category';
import type { Region } from '@/contracts/entities/region';
import type { DateRange } from 'react-day-picker';
import { processFilterQueryParams } from '@/utils/eventUtils';
import { useBatchSearchParamState, useSearchParamState } from './useSearchParamState';

interface useFilterByQueryParamsProps {
  categories?: Category[];
  regions?: Region[];
}

export function useFilterByQueryParams({ categories, regions }: useFilterByQueryParamsProps = {}) {
  const [, setAll] = useBatchSearchParamState([
    'to',
    'from',
    'time',
    'types',
    'homeAway',
    'categories',
    'location',
  ]);

  const [[fromQueryParam, toQueryParam], setDateQueryParam] = useBatchSearchParamState([
    'from',
    'to',
  ]);

  const [timeQueryParam, setTimeQueryParam] = useSearchParamState('time');

  const [homeAwayQueryParam, setHomeAwayQueryParam] = useSearchParamState('homeAway');

  const [locationQueryParam, setLocationQueryParam] = useSearchParamState('location');

  const [categoriesQueryParams, setCategoriesQueryParam] = useBatchSearchParamState(['categories']);

  const [typesQueryParams, setTypesQueryParams] = useBatchSearchParamState(['types']);

  const { dateRange, selectedCategories, homeAway, time, daytime, types } =
    processFilterQueryParams(
      {
        time: timeQueryParam,
        from: fromQueryParam,
        to: toQueryParam,
        types: typesQueryParams.join(','),
        homeAway: homeAwayQueryParam,
        categories: categoriesQueryParams.join(','),
        location: locationQueryParam,
      },
      regions,
      categories
    );

  const setTime = (value: string | undefined) => {
    setTimeQueryParam(value ?? null, { history: 'replace' });
  };

  const setTypes = (value: string[]) => {
    setTypesQueryParams(value, {
      history: 'replace',
    });
  };

  const setHomeAway = (value?: string) => {
    setHomeAwayQueryParam(value ?? null, { history: 'replace' });
  };

  const setLocation = (value?: Region) => {
    setLocationQueryParam(value?.id ?? null, { history: 'replace' });
  };

  function setSelectedCategories(
    action: ((prevState: Category[]) => Category[]) | Category[]
  ): void {
    if (typeof action === 'function') {
      const newCategories = action(selectedCategories || []);
      const newParams = newCategories.map((cat: Category) => `${cat.slug}:${cat.id}`);
      setCategoriesQueryParam(newParams);
    }
    if (Array.isArray(action) && action.length === 0) {
      setCategoriesQueryParam([null], { history: 'replace' });
    }
  }

  const setDateRange = async (value: DateRange | undefined) => {
    setDateQueryParam(
      [
        (value?.from && value.from.toISOString()) || null,
        (value?.to && value.to.toISOString()) || null,
      ],
      { history: 'replace' }
    );
  };

  const reset = () => {
    setAll([null], { history: 'replace' });
  };

  return {
    query: {
      time: timeQueryParam,
      setTime: setTimeQueryParam,
      from: fromQueryParam,
      setDate: setDateQueryParam,
      to: toQueryParam,
      types: typesQueryParams,
      setTypes: setTypesQueryParams,
      homeAway: homeAwayQueryParam,
      setHomeAway: setHomeAwayQueryParam,
      categories: categoriesQueryParams,
      setCategories: setCategoriesQueryParam,
      location: locationQueryParam,
      setLocation: setLocationQueryParam,
    },
    time,
    setTime,
    daytime,
    types,
    setTypes,
    homeAway,
    setHomeAway,
    location: locationQueryParam,
    setLocation,
    dateRange,
    setDateRange,
    setSelectedCategories,
    selectedCategories,
    reset,
  };
}
