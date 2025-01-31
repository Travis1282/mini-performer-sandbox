'use client'

import type { Region } from '@/contracts/entities/region'
import type { components } from '@/contracts/generated/maverick-schema'
import {
  FeaturedPerformerEvents,
  getFeaturedPerformerProps,
} from '@/components/Performer/FeaturedPerformer'
import useOnMount from '@/hooks/useOnMount'
import { sendTagToClarity } from '@/libs/clarity'
import { GtmViewEventList } from '@/libs/gtm/gtm'
import { useAppStore } from '@/store/AppStoreProvider'
import { formatViewEventList } from '@/utils/gtmLayerFormatter'
import { utmParams } from '@/utils/utmParams'
import EventListBuyerGuarantee from '../EventListBuyerGuarantee'
import { ChangeHandler } from './ChangeHandler'
import { FiltersBar } from './FiltersBar'
import { initialData } from './initialData'
import { List } from './List'
import { LoadMore } from './LoadMore'

interface EventListFullProps {
  data?: components['schemas']['CmsPathResponse']
  featuredPerformerId?: string
  narrowContainer?: boolean
  nearRegion: Region
  searchParams?: Record<string, string>
  showBuyerGuarantee?: boolean
}

export const EventListFull = ({
  data,
  nearRegion,
  searchParams,
  showBuyerGuarantee,
  featuredPerformerId,
  narrowContainer,
}: EventListFullProps) => {
  const categories = useAppStore((state) => state.categories)
  const regions = useAppStore((state) => state.regions)

  const { displayName, featuredPerformerEvents, hasFeaturedPerformerEvents } =
    getFeaturedPerformerProps({
      data,
      featuredPerformerId,
    })

  const {
    headingInformation,
    locationAwareEvents,
    filteredEvents,
    regionsWithEvents,
    pageTypeData,
    performerName,
    performerId,
    useLocalEvents,
    useAllEvents,
  } = initialData({
    data,
    searchParams,
    categories,
    nearRegion,
    regions,
  })

  useOnMount(() => {
    sendTagToClarity('page_template', pageTypeData.type)
    GtmViewEventList({
      ...formatViewEventList({
        data,
        utmParams: utmParams(),
        pageType: pageTypeData.type,
        region: nearRegion,
      }),
    })
  })

  return (
    <div className="mt-5 flex w-full flex-col" data-testid="event-list-full">
      <ChangeHandler
        data={data}
        headingInformation={headingInformation}
        pageTypeData={pageTypeData}
        regions={regions}
        useAllEvents={useAllEvents}
        useLocalEvents={useLocalEvents}
      />

      {!!hasFeaturedPerformerEvents && (
        <FeaturedPerformerEvents
          displayName={displayName}
          featuredPerformerEvents={featuredPerformerEvents}
        />
      )}

      <FiltersBar
        categories={categories}
        hasFeaturedPerformerEvents={hasFeaturedPerformerEvents}
        headingInformation={headingInformation}
        narrowContainer={narrowContainer}
        pageTypeData={pageTypeData}
        regionsWithEvents={regionsWithEvents}
        useLocalEvents={useLocalEvents}
      />
      <List
        filteredEvents={filteredEvents}
        locationAwareEvents={locationAwareEvents}
        performerId={performerId}
        performerName={performerName}
        useAllEvents={useAllEvents}
        useLocalEvents={useLocalEvents}
      />
      <LoadMore hasNextPage={pageTypeData.hasNextPage} />
      {showBuyerGuarantee && Boolean(filteredEvents.length) && (
        <div className="pt-[15px] lg:pt-4">
          <EventListBuyerGuarantee />
        </div>
      )}
    </div>
  )
}
