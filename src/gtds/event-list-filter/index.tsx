'use client'

import type { Category } from '@/contracts/entities/category'
import type { components } from '@/contracts/generated/maverick-schema'
import type { Matcher } from 'react-day-picker'
import { Button } from '@/components/Shared/Button'
import { DateRangePicker } from '@/components/Shared/DateRangePicker'
import { Dropdown } from '@/components/Shared/Dropdown'
import { DropdownCheckbox } from '@/components/Shared/DropdownCheckbox'
import { EventListEmpty } from '@/components/Shared/EventList/Empty'
import { SearchEventItem } from '@/components/Shared/EventList/SearchEventItem'
import EventListBuyerGuarantee from '@/components/Shared/EventListBuyerGuarantee'
import Loader from '@/components/Shared/Loader'
import { SelectCategory } from '@/components/Shared/SelectCategory'
import { SelectRegion } from '@/components/Shared/SelectRegion'
import {
  HomeAndAwayOptions,
  TimeOptions,
} from '@/contracts/events/eventFiltersTypes'
import { useSearchParams } from '@/hooks/useSearchParams'
import { useAppStore } from '@/store/AppStoreProvider'
import { EVENT_TYPE } from '@/utils/contants'
import clsx from 'clsx'
import { useScrollContainer } from 'react-indiana-drag-scroll'

export type PageType =
  | 'category'
  | 'parking'
  | 'performer'
  | 'region'
  | 'sport-performer'
  | 'venue'

export interface EventListFilterProps {
  currentPage?: number
  disabledDate: Matcher | Matcher[] | undefined
  events: components['schemas']['Event'][]
  isMobile?: boolean
  loading?: boolean
  loadMoreEvents?: () => void
  pageType: PageType
  region?: components['schemas']['Region']
  showAllRegions?: boolean
  showScarcity?: boolean
  totalPages?: number
}

export function EventListFilter({
  pageType,
  showScarcity,
  isMobile,
  disabledDate,
  events,
  loadMoreEvents,
  showAllRegions,
  loading,
  currentPage,
  totalPages,
  region,
}: EventListFilterProps) {
  const regions = useAppStore((state) => state.regions)
  const categories = useAppStore((state) => state.categories)
  const selectedTrendingRegion = useAppStore(
    (state) => state.selectedTrendingRegion
  )
  const setSelectedTrendingRegion = useAppStore(
    (state) => state.setSelectedTrendingRegion
  )

  const scrollContainer = useScrollContainer()

  const [searchParams, setSearchParams] = useSearchParams()
  const timeQueryParam = searchParams.get('time')
  const fromQueryParam = searchParams.get('from')
  const toQueryParam = searchParams.get('to')
  const typesQueryParam = searchParams.get('types')
  const homeAwayQueryParam = searchParams.get('homeAway')
  const categoriesQueryParam = searchParams.get('categories')

  const selectedCategories = () =>
    (categoriesQueryParam && categories
      ? categoriesQueryParam.split(',').map((item) =>
          categories.find((cat) => {
            const [slug] = item.split(':')
            return cat.slug === slug
          })
        )
      : []) as Category[]

  function handleSelectCategories(
    action: ((prevState: Category[]) => Category[]) | Category[]
  ): void {
    if (typeof action === 'function') {
      const newCategories = action(selectedCategories())
      const newSearchParams = new URLSearchParams(searchParams)
      newSearchParams.delete('categories')
      newSearchParams.set(
        'categories',
        newCategories.map((cat: Category) => `${cat.slug}:${cat.id}`).join(',')
      )
      setSearchParams(newSearchParams, { replace: true })
    }
    if (Array.isArray(action) && action.length === 0) {
      const newSearchParams = new URLSearchParams(searchParams)
      newSearchParams.delete('categories')
      setSearchParams(newSearchParams, { replace: true })
    }
  }

  function handleResetFilters() {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.delete('from')
    newSearchParams.delete('to')
    newSearchParams.delete('types')
    newSearchParams.delete('time')
    newSearchParams.delete('homeAway')
    newSearchParams.delete('categories')
    setSearchParams(newSearchParams, { replace: true })
  }

  return (
    <>
      <div
        className={`mt-${showScarcity ? '0' : '6'} select-none lg:pt-[${
          showScarcity ? '20px' : '35px'
        }] flex w-full flex-wrap justify-between gap-4 whitespace-nowrap md:flex-row`}
      >
        <div className="flex pl-4 xl:pl-0" data-testid="locationHeading">
          {pageType === 'region' && region ? (
            <h3 className="pr-1 h3-lg lg:pr-2 lg:h2-lg">
              Events Near {region?.name}
            </h3>
          ) : regions ? (
            <>
              <h3 className="pr-1 h3-lg lg:pr-2 lg:h2-lg">
                {selectedTrendingRegion?.id && !showAllRegions
                  ? 'Events Near'
                  : ''}
              </h3>

              {pageType !== 'sport-performer' ? (
                <SelectRegion
                  regions={regions}
                  selected={selectedTrendingRegion}
                  setSelected={setSelectedTrendingRegion}
                >
                  <Button
                    arrow="down"
                    arrowClassName="mb-1"
                    arrowColor="#3899F8"
                    arrowSize={isMobile ? 12 : 16}
                    arrowStrokeWidth={2}
                    className={clsx(
                      'mt-1 !p-0 !text-[20px] !font-semibold leading-[22px] lg:mt-0 lg:!text-[28px] lg:leading-[31px]'
                    )}
                    contentClass="!items-end"
                    label=""
                    prefix={
                      selectedTrendingRegion?.id && !showAllRegions
                        ? selectedTrendingRegion.name
                        : 'All Events'
                    }
                    variant="tertiary"
                  />
                </SelectRegion>
              ) : null}
            </>
          ) : (
            <h3 className="pr-1 h3-lg lg:pr-2 lg:h2-lg">All Events</h3>
          )}
        </div>

        <div
          className="no-scrollbar flex flex-nowrap gap-2 overflow-x-auto overflow-y-auto bg-transparent px-4 pb-6 lg:z-10 lg:overflow-visible lg:pb-[35px] xl:px-0"
          ref={scrollContainer.ref}
        >
          {['region', 'venue'].includes(pageType) ? (
            <>
              <DropdownCheckbox
                data-testid="eventTypeDropdown"
                dropdownArrowPosition="center"
                dropdownOptions={EVENT_TYPE}
                handleSelectedItems={(value) => {
                  const newSearchParams = new URLSearchParams(searchParams)
                  newSearchParams.delete('types')
                  if (value.length > 0) {
                    newSearchParams.set('types', value.join(','))
                  }
                  setSearchParams(newSearchParams, { replace: true })
                }}
                selectedItems={
                  typesQueryParam ? typesQueryParam?.split(',') : []
                }
                title="Event Type"
                titleMultipleSelected="Type"
              />
              {categories ? (
                <SelectCategory
                  categories={categories}
                  dropdownPosition={`lg:left-[calc(50%-150px)]`}
                  selected={selectedCategories()}
                  setSelected={handleSelectCategories}
                />
              ) : null}
            </>
          ) : null}

          <DateRangePicker
            disabled={disabledDate}
            handleSelectDateRange={(value) => {
              const newSearchParams = new URLSearchParams(searchParams)
              if (value?.from) {
                newSearchParams.set('from', value.from.toISOString())
              } else {
                newSearchParams.delete('from')
              }
              if (value?.to) {
                newSearchParams.set('to', value.to.toISOString())
              } else {
                newSearchParams.delete('to')
              }
              setSearchParams(newSearchParams, { replace: true })
            }}
            selectedDateRange={
              fromQueryParam || toQueryParam
                ? {
                    from: fromQueryParam ? new Date(fromQueryParam) : undefined,
                    to: toQueryParam ? new Date(toQueryParam) : undefined,
                  }
                : undefined
            }
          />
          <Dropdown
            dropdownArrowPosition="center"
            dropdownOptions={[...TimeOptions]}
            handleSelectValue={(value) => {
              if (value) {
                const newSearchParams = new URLSearchParams(searchParams)
                newSearchParams.set('time', value)
                setSearchParams(newSearchParams, { replace: true })
              } else {
                const newSearchParams = new URLSearchParams(searchParams)
                newSearchParams.delete('time')
                setSearchParams(newSearchParams, { replace: true })
              }
            }}
            id="timeFilterButton"
            idReset="resetTimeButton"
            selectedValue={timeQueryParam ?? undefined}
            title="Time"
          />
          {pageType === 'sport-performer' ? (
            <Dropdown
              data-testid="homeAwayButton"
              dropdownArrowPosition="center"
              dropdownOptions={[...HomeAndAwayOptions]}
              handleSelectValue={(value) => {
                if (value) {
                  const newSearchParams = new URLSearchParams(searchParams)
                  newSearchParams.set('homeAway', value)
                  setSearchParams(newSearchParams, { replace: true })
                } else {
                  const newSearchParams = new URLSearchParams(searchParams)
                  newSearchParams.delete('homeAway')
                  setSearchParams(newSearchParams, { replace: true })
                }
              }}
              id="homeAwayFilterButton"
              idReset="resetHomeAwayButton"
              selectedValue={homeAwayQueryParam ?? undefined}
              title="Home & Away"
            />
          ) : null}
        </div>
      </div>

      <div
        className={clsx(
          'relative h-[2px] w-full rounded-t',
          loading ? 'animate-pulse bg-accent' : ''
        )}
      />

      {events.length > 0 ? (
        <>
          {events.map((event, index) => {
            return (
              <SearchEventItem event={event} key={`${event.id}-${index}`} />
            )
          })}
          {loadMoreEvents &&
          currentPage &&
          totalPages &&
          currentPage < 20 &&
          currentPage < totalPages ? (
            <div className="flex bg-white xl:mt-3">
              <Button
                arrow={loading ? undefined : 'down'}
                arrowColor="#3899F8"
                arrowSize={16}
                arrowStrokeWidth={1.5}
                className="min-h-[46px] w-full rounded border-none !bg-light px-6 py-3 font-semibold transition-colors !h6-lg hover:!bg-[#ebeff5] hover:!text-accent active:!bg-[#e5e8ec] active:!text-accent"
                disabled={loading}
                label=""
                onClick={() => {
                  loadMoreEvents()
                }}
                variant="secondary"
              >
                {loading ? (
                  <Loader className="ml-2" height={15} radius={3} width={15} />
                ) : (
                  'View More Events'
                )}
              </Button>
            </div>
          ) : null}

          <div className="mt-3 flex flex-col-reverse flex-wrap justify-between gap-3 lg:flex-row lg:flex-nowrap">
            <EventListBuyerGuarantee />
          </div>
        </>
      ) : (
        <EventListEmpty
          onClickResetFilters={handleResetFilters}
          showResetFiltersButton={true}
        />
      )}
    </>
  )
}
