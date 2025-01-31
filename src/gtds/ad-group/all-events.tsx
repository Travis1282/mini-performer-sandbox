'use client'

import type { Category } from '@/contracts/entities/category'
import type { TimeByType } from '@/contracts/events/eventFiltersTypes'
import type { components } from '@/contracts/generated/maverick-schema'
import type { DateRange } from 'react-day-picker'
import { DateRangePicker } from '@/components/Shared/DateRangePicker'
import { Dropdown } from '@/components/Shared/Dropdown'
import { DropdownCheckbox } from '@/components/Shared/DropdownCheckbox'
import { EventList } from '@/components/Shared/EventList'
import { EventListNoEvents } from '@/components/Shared/EventList/NoEvents'
import { SearchEventItem } from '@/components/Shared/EventList/SearchEventItem'
import EventListBuyerGuarantee from '@/components/Shared/EventListBuyerGuarantee'
import { SelectCategory } from '@/components/Shared/SelectCategory'
import { TimeOptions } from '@/contracts/events/eventFiltersTypes'
import { useFilterEvents } from '@/hooks/useFilterEvents'
import { useAppStore } from '@/store/AppStoreProvider'
import { EVENT_TYPE } from '@/utils/contants'
import { useCallback, useState } from 'react'
import { useScrollContainer } from 'react-indiana-drag-scroll'
import 'react-indiana-drag-scroll/dist/style.css'

export function AdGroupAllEvents({
  events,
}: {
  events?: components['schemas']['Event'][]
}) {
  const scrollContainer = useScrollContainer()
  const categories = useAppStore((state) => state.categories)
  const [selectedDateRange, setSelectedDateRange] = useState<
    DateRange | undefined
  >()
  const [selectedTime, setSelectedTime] = useState<TimeByType | undefined>(
    undefined
  )
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

  const handleSelectDateRange = useCallback((date: DateRange | undefined) => {
    setSelectedDateRange(date)
  }, [])

  const handleSelectTime = useCallback((time: string | undefined) => {
    setSelectedTime(time as TimeByType)
  }, [])

  const handleSelectTypes = useCallback((types: string[]) => {
    setSelectedTypes(types)
  }, [])

  const [selectedCategories, setSelectCategories] = useState<Category[]>([])

  const clearFilters = () => {
    setSelectedDateRange(undefined)
    setSelectedTime(undefined)
    setSelectedTypes([])
    setSelectCategories([])
  }

  const { filters, events: filteredEvents } = useFilterEvents({
    eventsToFilter: events,
    selectedDateRange,
    selectedTime,
    selectedTypes,
    selectedCategories,
  })

  return (
    <div className="container">
      <div className="flex w-full select-none flex-col justify-between gap-4 whitespace-nowrap pt-6 md:flex-row lg:pt-[35px]">
        <h3 className="px-4 h3-lg lg:px-0" data-cy="venue-subtitle">
          All Events
        </h3>
        <div
          className="no-scrollbar flex flex-nowrap gap-2 overflow-x-auto overflow-y-auto bg-transparent px-4 pb-6 lg:z-10 lg:overflow-visible lg:pb-[35px] xl:px-0"
          data-cy="venue-filters"
          ref={scrollContainer.ref}
        >
          <DropdownCheckbox
            dropdownArrowPosition="center"
            dropdownOptions={EVENT_TYPE}
            handleSelectedItems={handleSelectTypes}
            selectedItems={selectedTypes}
            title="Event Type"
            titleMultipleSelected="Type"
          />
          <SelectCategory
            categories={categories}
            dropdownPosition={`lg:left-[calc(50%-150px)]`}
            selected={selectedCategories}
            setSelected={setSelectCategories}
          />
          <DateRangePicker
            disabled={filters.disabledDate}
            handleSelectDateRange={handleSelectDateRange}
            selectedDateRange={selectedDateRange}
          />
          <Dropdown
            dropdownArrowPosition="center"
            dropdownOptions={[...TimeOptions]}
            handleSelectValue={handleSelectTime}
            selectedValue={selectedTime}
            title="Time"
          />
        </div>
      </div>
      {filteredEvents.length > 0 ? (
        <>
          <EventList onClickResetFilters={clearFilters}>
            {filteredEvents.map((event) => {
              return (
                <SearchEventItem
                  data-testid="eventItem"
                  event={event}
                  key={event?.id}
                />
              )
            })}
          </EventList>
          {Boolean(events?.length) && (
            <div className="pt-[15px] lg:pb-10 lg:pt-4">
              <EventListBuyerGuarantee />
            </div>
          )}
        </>
      ) : (
        <EventListNoEvents />
      )}
    </div>
  )
}
