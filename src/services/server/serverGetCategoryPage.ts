import type { Region } from '@/contracts/entities/region';
import type { components } from '@/contracts/generated/maverick-schema';
import { captureException } from '@sentry/react';
import dayjs from 'dayjs';
import { getEventsPaginated } from '../maverick/getEventsPaginated';
import { buildServerRequestInit } from '../utils/buildServerRequestInit';

export const serverGetCategoryPage = async (
  categoryData: components['schemas']['CmsPathResponse'],
  searchParams?: Record<string, string>,
  regionNearYou?: Region,
  pageSize?: number,
  categoryId?: number
) => {
  const decodedFrom = searchParams?.from && decodeURIComponent(searchParams.from);
  const decodedTo = searchParams?.to && decodeURIComponent(searchParams?.to);

  try {
    const { response, data, error } = await getEventsPaginated({
      query: {
        eventTimeFrom: searchParams?.from
          ? dayjs(decodedFrom).format('YYYY-MM-DDT00:00:00')
          : undefined,
        eventTimeTo: searchParams?.to ? dayjs(decodedTo).format('YYYY-MM-DDT23:59:59') : undefined,
        daytime:
          searchParams?.time === 'Night'
            ? 'false'
            : searchParams?.time === 'Day'
              ? 'true'
              : undefined,
        pageSize: pageSize ? pageSize : 20,
        ...(regionNearYou?.id &&
          regionNearYou?.id !== 0 && {
            regionId: regionNearYou.id,
          }),
        categoryId: categoryId ? [categoryId] : [],
        sortBy: 'eventTimeLocal',
        sortDirection: 'ASC',
        eventType: categoryData.category?.eventType ? [categoryData.category?.eventType] : [],
      },
      init: buildServerRequestInit(),
    });

    if (error) {
      throw error;
    }

    if (response.ok) {
      const { results, pagination } = data;
      categoryData.events = results;
      if (categoryData.paginatedEvents) {
        categoryData.paginatedEvents.pagination = pagination;
      } else {
        // IF paginatedEvents is not defined, create it
        categoryData.paginatedEvents = { pagination };
      }
    } else {
      categoryData.events = [];
    }
  } catch (e) {
    categoryData.events = [];
    captureException(e, {
      tags: {
        type: 'serverGetCategoryPage',
      },
    });
  }

  return categoryData;
};
