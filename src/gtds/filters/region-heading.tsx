'use client'

import type { Region } from '@/contracts/entities/region'
import { Button } from '@/components/Shared/Button'
import { SelectRegion } from '@/components/Shared/SelectRegion'
import { useFilterByQueryParams } from '@/hooks/useFilterByQueryParams'
import { useAppStore } from '@/store/AppStoreProvider'
import clsx from 'clsx'

export function RegionHeading({
  initialLocation,
  initialHeading,
  regions,
  showSelect,
  showAllRegions,
  hasLocationEvents,
  eventIsGame,
  regionCallback,
}: {
  initialLocation?: string
  initialHeading?: string
  regions?: Region[]
  showSelect?: boolean
  showAllRegions?: boolean
  hasLocationEvents?: boolean
  eventIsGame?: boolean
  regionCallback?: () => void
}) {
  const [selectedTrendingRegion, setSelectedTrendingRegion] = useAppStore(
    (state) => [state.selectedTrendingRegion, state.setSelectedTrendingRegion]
  )
  const { homeAway } = useFilterByQueryParams()

  const handleSelectRegion = (region: Region | undefined) => {
    if (regionCallback) {
      regionCallback()
    }
    setSelectedTrendingRegion(region)
  }

  const eventType = eventIsGame ? 'Game' : 'Event'
  const home = homeAway === 'Home games' && 'Home'
  const away = homeAway === 'Away games' && 'Away'

  const teamLocation = home || away || 'All'
  const homeAndAwayTitle = `${
    eventIsGame ? `${teamLocation} ${eventType}s` : `All ${eventType}s`
  } `

  const shouldShowLocation =
    selectedTrendingRegion?.id && !showAllRegions && hasLocationEvents

  const showNear = shouldShowLocation || initialHeading
  const location = shouldShowLocation
    ? selectedTrendingRegion?.name || initialLocation
    : `All ${eventType}s`

  return (
    <div className="flex pl-4" data-testid="locationHeading">
      {regions?.length && showSelect ? (
        <>
          <h3 className="h3-lg lg:h2-lg pr-1 lg:pr-2">
            {showNear ? `${eventType}s Near` : ''}
          </h3>
          {showSelect ? (
            <SelectRegion
              regions={regions}
              selected={selectedTrendingRegion}
              setSelected={handleSelectRegion}
            >
              {
                <Button
                  arrow="down"
                  arrowClassName="mb-0.5 w-[12px] h-[12px] lg:h-[16px] lg:w-[16px] lg:mb-1"
                  arrowColor="#3899F8"
                  arrowStrokeWidth={2}
                  className={clsx(
                    'mt-1 !p-0 !text-[20px] !font-semibold leading-[22px] lg:mt-0 lg:!text-[28px] lg:leading-[31px]'
                  )}
                  contentClass="!items-end"
                  label=""
                  prefix={location}
                  variant="tertiary"
                />
              }
            </SelectRegion>
          ) : null}
        </>
      ) : (
        <h3 className="h3-lg lg:h2-lg px-1 lg:pr-2">{homeAndAwayTitle}</h3>
      )}
    </div>
  )
}
