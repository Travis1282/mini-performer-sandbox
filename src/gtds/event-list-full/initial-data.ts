import type { Category } from '@/contracts/entities/category'
import type { Region } from '@/contracts/entities/region'
import type { components } from '@/contracts/generated/maverick-schema'
import {
  filterAndSort,
  findHeading,
  findLocalEvents,
  findPageType,
  findRegionsWithEvents,
  shouldUseAllEvents,
  shouldUseLocalEvents,
} from '@/utils/eventUtils'

export const initialData = ({
  data,
  searchParams,
  categories,
  nearRegion,
  regions,
}: {
  data?: components['schemas']['CmsPathResponse']
  searchParams?: Record<string, string>
  categories: Category[]
  nearRegion: Region
  regions: Region[]
}) => {
  const pageTypeData = findPageType(data)
  const { type, hasHomeVenueId } = pageTypeData

  searchParams = searchParams ?? {}

  const performer = data && 'performer' in data ? data.performer : undefined
  const { filteredEvents } = filterAndSort({
    events: data?.events,
    params: searchParams,
    categories,
    performer,
    regions,
  })
  const localEvents = findLocalEvents({
    events: filteredEvents,
    region: nearRegion,
  })
  const regionsWithEvents = findRegionsWithEvents({
    events: data?.events,
    regions: regions ?? [],
  })

  const performerId =
    data && 'performer' in data ? data?.performer?.id : undefined
  const performerName =
    data && 'performer' in data ? data?.performer?.name : undefined

  const useLocalEvents = shouldUseLocalEvents({
    pageType: type,
    hasHomeVenueId,
  })
  const useAllEvents = shouldUseAllEvents({ localEvents, pageType: type })

  const headingInformation = findHeading({
    hasHomeVenueId,
    searchParams,
    selectedTrendingRegion: nearRegion,
    useLocalEvents,
    hasLocalEvents: localEvents.length > 0,
    pageType: type,
  })

  return {
    headingInformation,
    locationAwareEvents: useLocalEvents ? localEvents : [],
    filteredEvents: useAllEvents ? filteredEvents : [],
    regionsWithEvents,
    pageTypeData,
    performerId,
    performerName,
    useLocalEvents,
    useAllEvents,
  }
}
