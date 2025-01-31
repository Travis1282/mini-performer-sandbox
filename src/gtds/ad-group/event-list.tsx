import type { components } from '@/contracts/generated/maverick-schema'
import Link from '@/components/Link'
import { SearchEventItem } from '@/components/Shared/EventList/SearchEventItem'

export function filterEventsByAdGroupEntityResult(
  data: components['schemas']['SearchAdGroupResult']
) {
  return data.events?.filter((item) => {
    const performerCheck = !data.adGroupEntityResult?.performer?.id
      ? true
      : item?.eventPerformers?.some(
          (p) => p.performerId == data.adGroupEntityResult?.performer?.id
        )

    if (data.adGroupEntityResult?.venue) {
      return (
        performerCheck && data.adGroupEntityResult?.venue.id === item?.venue?.id
      )
    }

    if (data.adGroupEntityResult?.region) {
      return (
        performerCheck &&
        item?.venue?.regionId === data.adGroupEntityResult.region.id
      )
    }

    return performerCheck
  })
}

export function EventList({
  data,
}: {
  data: components['schemas']['SearchAdGroupResult']
}) {
  const events = filterEventsByAdGroupEntityResult(data)

  return (
    <div className="pb-20 lg:pb-24">
      {events?.map((event, index) => {
        return (
          <SearchEventItem
            data-testid="eventItem"
            event={event}
            key={`from-${event.id}-${index}`}
          />
        )
      })}

      <div className="mt-4 text-right">
        <Link
          className="px-6 py-2 text-sm text-accent hover:text-accent-dark"
          href={`/${data.adGroupEntityResult?.performer?.slug || ''}`}
        >
          See {data.adGroupEntityResult?.performer?.name || ''} at all venues
        </Link>
      </div>
    </div>
  )
}
