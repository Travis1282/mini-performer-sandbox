 
'use client'

import type { components } from '@/contracts/generated/maverick-schema'
import { Button } from '@/components/Shared/Button'
import { useSelectiveStateWithFallback } from '@/hooks/useSelectiveStateWithFallback'
import { EventListNoEvents } from '../EventList/NoEvents'
import { SearchEventItem } from '../EventList/SearchEventItem'
interface ListProps {
  filteredEvents: components['schemas']['Event'][]
  locationAwareEvents: components['schemas']['Event'][]
  onClickResetFilters?: () => void
  performerId?: number
  performerName?: string
  simplifiedView?: boolean
  useAllEvents: boolean
  useLocalEvents: boolean
}
export const List = ({
  locationAwareEvents: initialLocationAwareEvents,
  filteredEvents: initialFilteredEvents,
  onClickResetFilters,
  performerName,
  performerId,
  useAllEvents: initialUseAllEvents,
  useLocalEvents: initialUseLocalEvents,
}: ListProps) => {
  const [locationEventsList, filteredEventsList] =
    useSelectiveStateWithFallback([
      ['locationAwareEvents', initialLocationAwareEvents],
      ['filteredEvents', initialFilteredEvents],
    ])

  const [useLocal, useAll] = useSelectiveStateWithFallback([
    ['useLocalEvents', initialUseLocalEvents],
    ['useAllEvents', initialUseAllEvents],
  ])

  return (
    <>
      {useLocal && locationEventsList?.length ? (
        <>
          {locationEventsList.map(
            (event: components['schemas']['Event'], index) => {
              return (
                <SearchEventItem
                  data-testid="locationEventItem"
                  event={event}
                  key={`${event?.id || ''}-${index}`}
                />
              )
            }
          )}
          {Boolean(useLocal && useAll && locationEventsList.length) && (
            <div className="flex w-full select-none flex-col justify-between gap-4 pt-6 md:flex-row lg:pt-[35px]">
              <h3 className="pb-8 pl-4 h3-lg lg:pl-0">All Events</h3>
            </div>
          )}
        </>
      ) : null}
      {useAll &&
        filteredEventsList?.map((event, index) => {
          return (
            <SearchEventItem
              data-testid="eventItem"
              event={event}
              key={`${event?.id || ''}-${index}`}
            />
          )
        })}
      {!(useLocal && locationEventsList?.length) &&
        !(useAll && filteredEventsList?.length) && (
          <div className="flex flex-col items-center">
            <EventListNoEvents
              id={performerId}
              performerName={performerName}
              type="performerId"
            />
            {onClickResetFilters && (
              <Button
                className="mt-6 w-[226px] rounded border-none !bg-light px-4 py-3 font-semibold transition-colors !h6-lg hover:!bg-[#ebeff5] hover:!text-accent active:!bg-[#e5e8ec] active:!text-accent lg:mt-6 lg:h3-sm"
                label="Reset Filters"
                onClick={onClickResetFilters}
                variant="secondary"
              />
            )}
          </div>
        )}
    </>
  )
}
