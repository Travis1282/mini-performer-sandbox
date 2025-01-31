import type { components } from '@/contracts/generated/maverick-schema'
import usePagination from '@/hooks/usePagination'
import { EventList } from '..'
import { SearchEventItem } from '../SearchEventItem'

interface NearYouEventsProps {
  events: components['schemas']['Event'][]
}

export function NearYouEvents({ events }: NearYouEventsProps) {
  const {
    currentData: currentDataNearEvents,
    next: nextNearEvents,
    hasNextPage: hasNextPageNearEvents,
  } = usePagination<components['schemas']['Event']>({
    data: events,
    defaultInitialQuantity: 15,
    itemsPerPage: 15,
  })

  return (
    <>
      {events.length > 0 ? (
        <EventList
          handleShowMore={nextNearEvents}
          hasNextPage={hasNextPageNearEvents}
          onClickResetFilters={() => {}}
        >
          {currentDataNearEvents.map((event, index) => {
            return (
              <SearchEventItem
                data-testid="nearYouEventItem"
                event={event}
                key={`near-you-${event.id}-${index}`}
              />
            )
          })}
        </EventList>
      ) : null}
    </>
  )
}
