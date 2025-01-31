'use client'

import type { Category } from '@/contracts/entities/category'
import type { Region as RegionType } from '@/contracts/entities/region'
import type { PageTypeData } from '@/utils/eventUtils'
import {
  Categories,
  DateRange as DateRangeFilter,
  EventTime,
  EventType,
  HomeAway,
  Region as RegionFilter,
} from '@/components/Shared/Filters'
import { useAppStore } from '@/store/AppStoreProvider'
import clsx from 'clsx'
import { useScrollContainer } from 'react-indiana-drag-scroll'
import { RegionHeading } from './RegionHeading'

interface FilterProps {
  categories: Category[]
  hasFeaturedPerformerEvents?: boolean
  headingInformation: {
    heading: string
    location: string
    homeAndAwayTitle: string
  }
  narrowContainer?: boolean
  pageTypeData: PageTypeData
  regionsWithEvents?: RegionType[]
  useLocalEvents: boolean
}

export const FiltersBar = ({
  headingInformation,
  pageTypeData,
  regionsWithEvents,
  categories,
  useLocalEvents,
  hasFeaturedPerformerEvents,
  narrowContainer,
}: FilterProps) => {
  const {
    filtersToShow: {
      selectRegion,
      homeAndAway,
      dateRangePicker,
      time: timePicker,
      eventType,
      category,
    },
  } = pageTypeData

  const filterBounds = useAppStore((state) => state.filterBounds)
  const scrollContainer = useScrollContainer()

  return (
    <div
      className={clsx(
        'flex gap-4',
        narrowContainer ? 'flex-col' : 'flex-wrap justify-between'
      )}
      data-testid="filter-bar"
    >
      <RegionHeading
        headingInformation={headingInformation}
        initialUseLocalEvents={useLocalEvents}
        pageTypeData={pageTypeData}
        regions={regionsWithEvents}
      />
      <div
        className={clsx(
          'no-scrollbar flex flex-nowrap gap-2 overflow-x-auto overflow-y-auto bg-transparent px-4 pb-6 lg:z-10 lg:overflow-visible lg:pb-[35px] xl:px-0',
          narrowContainer ? 'mr-auto lg:px-1' : ''
        )}
        ref={scrollContainer.ref}
      >
        {homeAndAway && (
          <HomeAway hasFeaturedPerformerEvents={hasFeaturedPerformerEvents} />
        )}
        {eventType && <EventType />}
        {category && <Categories categories={categories} />}
        {dateRangePicker && (
          <DateRangeFilter disabledDate={filterBounds?.disabledDate} />
        )}
        {timePicker && <EventTime />}
        {selectRegion && regionsWithEvents && (
          <RegionFilter regionsWithEvents={regionsWithEvents} />
        )}
      </div>
    </div>
  )
}
