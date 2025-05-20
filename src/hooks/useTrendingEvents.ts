import { useGetSearchTrendingEvents } from './swr/useSearchTrendingEvents'
import { useAppStore } from '@/store/AppStoreProvider'

export interface TrendingEventsProps {
  categoryId?: number
  regionId?: number
  venueId?: number
}

export function useTrendingEvents({
  categoryId,
  regionId,
  venueId,
}: TrendingEventsProps) {
  const [selectedTrendingRegion, setSelectedTrendingRegion] = useAppStore(
    (state) => [state.selectedTrendingRegion, state.setSelectedTrendingRegion]
  )

  const region = regionId
    ? `${regionId}`
    : !venueId
      ? `${selectedTrendingRegion?.id}`
      : undefined

  const { data, isLoading } = useGetSearchTrendingEvents({
    params: {
      query: {
        categoryId: categoryId ? `${categoryId}` : undefined,
        regionId: region,
        venueId: venueId ? `${venueId}` : undefined,
      },
    },
  })

  return {
    trendingEvents: data,
    selectedTrendingRegion,
    setSelectedTrendingRegion,
    isFetchingTrendings: isLoading,
  }
}
