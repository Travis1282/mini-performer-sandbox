import type { components } from '@/contracts/generated/maverick-schema'
import { AdGroupAllEvents } from '@/components/Shared/AdGroup/AllEvents'
import { PerformerGroup } from '@/components/Shared/AdGroup/PerformerGroup'
import { SearchEventItem } from '@/components/Shared/EventList/SearchEventItem'

export function AdditionalVenues({
  data,
  deviceType,
  showNarrowHeading,
}: {
  data: components['schemas']['SearchAdGroupResult']
  deviceType: 'desktop' | 'mobile' | 'unknown'
  showNarrowHeading: boolean
}) {
  const mount = () => {
    if (data.adGroupEntityResult?.venue) {
      return {
        title: data.adGroupEntityResult.venue?.name,
        topSectionEvents: data.events?.filter(
          (item) =>
            data.adGroupEntityResult?.venue?.id === item?.venue?.id &&
            item?.eventPerformers?.some(
              (p) => p.performerId == data.adGroupEntityResult?.performer?.id
            )
        ),
        allEvents: data.events?.filter((item) =>
          item?.eventPerformers?.some(
            (p) => p.performerId == data.adGroupEntityResult?.performer?.id
          )
        ),
      }
    }
    if (data.adGroupEntityResult?.region) {
      return {
        title: data.adGroupEntityResult?.region?.name,
        topSectionEvents: data.events?.filter(
          (item) =>
            data.adGroupEntityResult?.region?.id === item?.venue?.regionId &&
            item?.eventPerformers?.some(
              (p) => p.performerId == data.adGroupEntityResult?.performer?.id
            )
        ),
        allEvents: data.events?.filter((item) =>
          item?.eventPerformers?.some(
            (p) => p.performerId == data.adGroupEntityResult?.performer?.id
          )
        ),
      }
    }

    return {
      title: data.adGroupEntityResult?.performer?.name,
      topSectionEvents: [],
      allEvents: data.events?.filter((item) =>
        item?.eventPerformers?.some(
          (p) => p.performerId == data.adGroupEntityResult?.performer?.id
        )
      ),
    }
  }
  const content = mount()

  return (
    <PerformerGroup
      data={data}
      deviceType={deviceType}
      showNarrowHeading={showNarrowHeading}
    >
      {content.topSectionEvents?.length ? (
        <>
          <div className="flex w-full select-none flex-col justify-between gap-4 pt-6 md:flex-row lg:pt-[35px]">
            <h3 className="px-4 pb-8 h3-lg lg:px-0">{content.title} Tickets</h3>
          </div>

          {content.topSectionEvents.map((event, index) => {
            return (
              <SearchEventItem
                event={event}
                key={`from-${event.id}-${index}`}
              />
            )
          })}
        </>
      ) : null}
      <div className="pb-20 lg:pb-24">
        <AdGroupAllEvents events={content.allEvents ?? []} />
      </div>
    </PerformerGroup>
  )
}
