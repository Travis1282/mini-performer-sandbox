'use client'

import type { Region as RegionType } from '@/contracts/entities/region'
import { SelectRegion } from '@/components/Shared/SelectRegion'
import { useFilterByQueryParams } from '@/hooks/useFilterByQueryParams'
import { useAppStore } from '@/store/AppStoreProvider'
export function Region({
  dropdownPosition = 'lg:left-[calc(50%-150px)]',
  regionsWithEvents,
  disabled,
}: {
  dropdownPosition?: string
  regionsWithEvents?: RegionType[]
  disabled?: boolean
}) {
  const regions = useAppStore((state) => state.regions)
  const { location, setLocation } = useFilterByQueryParams({ regions })

  const fullRegion = regionsWithEvents
    ? regionsWithEvents.find((r) => (r.id as number).toString() === location)
    : undefined

  return (
    <SelectRegion
      className="flex shrink-0"
      disabled={disabled}
      dropdownPosition={dropdownPosition}
      regions={regionsWithEvents || regions}
      selected={fullRegion}
      setSelected={setLocation}
    />
  )
}
