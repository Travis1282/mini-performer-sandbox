import { useCategoriesContext } from '@/services/categories/use-categories-context';
import { useRegionsContext } from '@/services/categories/use-regions-context';
import { useLocationContext } from '@/services/location/useLocationContext';
import { getSearchTrendingEvents } from '@/services/maverick/get-search-trending-events';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import type { components } from '../../services/maverick/generated/maverick-schema';
import { Event } from './components/event';

export default function Home() {
  const catgegories = useCategoriesContext();
  const regions = useRegionsContext();

  const location = useLocationContext();

  const results = useQuery({
    queryKey: ['trending-events', 'get', location.trendingRegion],
    queryFn: () =>
      getSearchTrendingEvents({
        params: { query: { regionId: location.trendingRegion } },
      }),
    placeholderData: keepPreviousData,
    staleTime: 500,
  });

  const { data: trendingEvents, isFetching, isPlaceholderData } = results;

  return (
    <>
      <title>Gotickets BETA</title>
      <section className="flex flex-col gap-4 px-4 pt-4">
        <h1 className="text-2xl font-bold">
          Top Events in{' '}
          <select
            className="custom-select text-go-blue-500 relative appearance-none focus:outline-hidden"
            onChange={(event) => location.onChangeTrendingRegion(event.target.value)}
            value={location.trendingRegion}
          >
            <option value="">All regions</option>
            {regions.map((region) => (
              <option key={region.id} value={region.id}>
                {region.name}
              </option>
            ))}
          </select>
        </h1>

        {isFetching && isPlaceholderData ? (
          <ul className="flex flex-col gap-2">
            <li className="flex animate-pulse flex-col gap-2 rounded-sm border border-gray-300 p-4">
              <h3 className="h-4 animate-pulse bg-gray-300"></h3>
              <h3 className="h-4 w-1/3 animate-pulse bg-gray-300"></h3>
              <h3 className="h-4 w-1/3 animate-pulse self-end bg-gray-300"></h3>
            </li>
            <li className="flex animate-pulse flex-col gap-2 rounded-sm border border-gray-300 p-4">
              <h3 className="h-4 animate-pulse bg-gray-300"></h3>
              <h3 className="h-4 w-1/3 animate-pulse bg-gray-300"></h3>
              <h3 className="h-4 w-1/3 animate-pulse self-end bg-gray-300"></h3>
            </li>
            <li className="flex animate-pulse flex-col gap-2 rounded-sm border border-gray-300 p-4">
              <h3 className="h-4 animate-pulse bg-gray-300"></h3>
              <h3 className="h-4 w-1/3 animate-pulse bg-gray-300"></h3>
              <h3 className="h-4 w-1/3 animate-pulse self-end bg-gray-300"></h3>
            </li>
          </ul>
        ) : null}
        {!isFetching &&
        !isPlaceholderData &&
        trendingEvents?.data?.length &&
        trendingEvents?.data?.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {trendingEvents?.data?.map((event: components['schemas']['Event']) => (
              <Event event={event} key={event.id} />
            ))}
          </ul>
        ) : null}
        <h2 className="text-2xl font-bold">Categories</h2>
        <ul className="grid grid-cols-2 gap-2">
          {catgegories.map((category) => (
            <li key={category.id}>
              <div className="flex h-full w-full cursor-pointer items-center justify-center rounded-sm border border-gray-300 p-4 text-center">
                {category.name}
              </div>
            </li>
          ))}
        </ul>
        <h2 className="text-2xl font-bold">Regions</h2>
        <ul className="grid grid-cols-2 gap-2">
          {regions.map((region) => (
            <li key={region.id}>
              <div className="flex h-full w-full cursor-pointer items-center justify-center rounded-sm border border-gray-300 p-4 text-center">
                {region.name}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
