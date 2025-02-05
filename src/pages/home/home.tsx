import { useCategoriesContext } from '@/services/categories/use-categories-context'
import { useRegionsContext } from '@/services/categories/use-regions-context'
import { useLocationContext } from '@/services/location/useLocationContext'
import { useLoaderData } from 'react-router'
import type { components } from '../../services/maverick/generated/maverick-schema'
import { Event } from './components/event'

export default function Home() {
  const { data } = useLoaderData<{
    data: components['schemas']['Event'][]
  }>()

  const catgegories = useCategoriesContext()
  const regions = useRegionsContext()

  const location = useLocationContext()

  const trendingRegion = regions.find(
    (r) => r.id === Number(location.closestRegionId)
  )

  console.log(trendingRegion)

  return (
    <>
      <title>Gotickets BETA</title>
      <section className="flex flex-col gap-4 px-4 pt-4">
        <h1 className="text-2xl font-bold">
          Trending events for {trendingRegion?.name ?? 'All regions'}
        </h1>
        {data.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {data.map((event: components['schemas']['Event']) => (
              <Event event={event} key={event.id} />
            ))}
          </ul>
        ) : null}
        <h2 className="text-2xl font-bold">Categories</h2>
        <ul className="grid grid-cols-2 gap-2">
          {catgegories.map((category) => (
            <li key={category.id}>
              <div className="flex h-full w-full cursor-pointer items-center justify-center rounded border border-gray-300 p-4 text-center">
                {category.name}
              </div>
            </li>
          ))}
        </ul>
        <h2 className="text-2xl font-bold">Regions</h2>
        <ul className="grid grid-cols-2 gap-2">
          {regions.map((region) => (
            <li key={region.id}>
              <div className="flex h-full w-full cursor-pointer items-center justify-center rounded border border-gray-300 p-4 text-center">
                {region.name}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
