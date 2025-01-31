'use client'

import { Button } from '@/components/Shared/Button'
import { NoEventImage } from '@/components/Shared/Empty/NoEventImage'

export interface EventListEmptyProps {
  onClickResetFilters?: () => void
  showResetFiltersButton?: boolean
}

export function EventListEmpty({
  onClickResetFilters,
  showResetFiltersButton = true,
}: EventListEmptyProps) {
  return (
    <div className="flex justify-center">
      <div className="flex max-w-[356px] flex-col items-center justify-center py-16 lg:py-[88px]">
        <NoEventImage />
        <h4 className="text-dark h2-sm mt-6">No Events Found</h4>
        <span className="text-dark h6-lg lg:!h3-sm mt-3 text-center text-opacity-50">
          To see more listings, you can either broaden your search filters or
          search for a different event.
        </span>
        {showResetFiltersButton && onClickResetFilters && (
          <Button
            className="!bg-light !h6-lg hover:!text-accent active:!text-accent lg:h3-sm mt-6 w-[226px] rounded border-none px-4 py-3 font-semibold transition-colors hover:!bg-[#ebeff5] active:!bg-[#e5e8ec] lg:mt-6"
            label="Reset Filters"
            onClick={onClickResetFilters}
            variant="secondary"
          />
        )}
      </div>
    </div>
  )
}
