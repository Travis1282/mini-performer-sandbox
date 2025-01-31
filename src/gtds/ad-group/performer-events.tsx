import type { components } from '@/contracts/generated/maverick-schema'
import { SearchEventItem } from '@/components/Shared/EventList/SearchEventItem'

export function AdGroupPerformerEvents({
  data,
}: {
  data: components['schemas']['SearchAdGroupResult']
}) {
  const currentPerformerId = data.adGroupEntityResult?.performer?.id

  const eventsFromCurrentPerformer = data.events?.filter((item) =>
    item?.eventPerformers?.some((p) => p.performerId === currentPerformerId)
  )

  if (!eventsFromCurrentPerformer?.length) {
    return null
  }

  return (
    <div className="container">
      <div className="flex w-full select-none flex-col justify-between gap-4 pt-6 md:flex-row lg:pt-[35px]">
        <h3 className="h3-lg lg:h2-lg px-4 pb-8 xl:px-0">
          {data.adGroupEntityResult?.performer?.name} Tickets
        </h3>
      </div>

      {eventsFromCurrentPerformer.map((event, index) => {
        return (
          <SearchEventItem
            data-testid="eventItem"
            event={event}
            key={`from-${event.id}-${index}`}
          />
        )
      })}
    </div>
  )
}
