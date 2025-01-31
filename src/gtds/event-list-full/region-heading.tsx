'use client'

import type { Region } from '@/contracts/entities/region'
import type { FC } from 'react'
import { Button } from '@/components/Shared/Button'
import { SelectRegion } from '@/components/Shared/SelectRegion'
import { useSelectiveStateWithFallback } from '@/hooks/useSelectiveStateWithFallback'
import { useAppStore } from '@/store/AppStoreProvider'
import { type PageTypeData, PageTypeTemplate } from '@/utils/eventUtils'
import clsx from 'clsx'

interface RegionHeadingProps {
  headingInformation: {
    location?: string
    heading?: string
    homeAndAwayTitle?: string
  }
  initialUseLocalEvents: boolean
  pageTypeData: PageTypeData
  /**
   * Regions to display in the region dropdown.
   *
   * If not provided, the regions from the store will be used.
   *
   * Currently only used for performer pages.
   */
  regions?: Region[]
}

export const RegionHeading: FC<RegionHeadingProps> = ({
  headingInformation,
  initialUseLocalEvents,
  pageTypeData,
  regions: regionsProp,
}) => {
  const [selectedTrendingRegion, setSelectedTrendingRegion, clearPagination] =
    useAppStore((state) => [
      state.selectedTrendingRegion,
      state.setSelectedTrendingRegion,
      state.clearPagination,
    ])
  const processChanges = useAppStore((state) => state.processChanges)
  const appRegions = useAppStore((state) => state.regions)
  const isCategoryPage = pageTypeData.type === PageTypeTemplate.Category
  const isPerformerPage = pageTypeData.type === PageTypeTemplate.Performer
  const {
    heading: initialHeading,
    location: initialLocation,
    homeAndAwayTitle: initialHomeAndAwayTitle,
  } = headingInformation

  const regions = isPerformerPage
    ? regionsProp
      ? regionsProp
      : appRegions
    : appRegions

  const [heading, location, homeAndAwayTitle, useLocalEvents] =
    useSelectiveStateWithFallback([
      ['heading', initialHeading],
      ['location', initialLocation],
      ['homeAndAwayTitle', initialHomeAndAwayTitle],
      ['useLocalEvents', initialUseLocalEvents],
    ])

  const handleSelectRegion = (region: Region | undefined) => {
    if (isCategoryPage) {
      clearPagination()
    }
    setSelectedTrendingRegion(region)
    processChanges()
  }

  return (
    <div className="flex pl-4 lg:pl-0" data-testid="locationHeading">
      {useLocalEvents || isCategoryPage ? (
        <>
          {heading ? (
            <h3 className={clsx('h3-lg pr-1 lg:pr-2')}>{heading}</h3>
          ) : null}

          <SelectRegion
            regions={regions}
            selected={selectedTrendingRegion}
            setSelected={handleSelectRegion}
          >
            {
              <Button
                arrow="down"
                arrowClassName="w-[12px] h-[12px] lg:h-[16px] lg:w-[16px]"
                arrowColor="#3899F8"
                arrowStrokeWidth={2}
                className="!p-0 !text-[20px] !font-semibold !leading-[28px]"
                data-testid="regionButton"
                id="region-heading-button"
                label=""
                prefix={location}
                variant="tertiary"
              />
            }
          </SelectRegion>
        </>
      ) : (
        <h3 className="h3-lg">{homeAndAwayTitle}</h3>
      )}
    </div>
  )
}
