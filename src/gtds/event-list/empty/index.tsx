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
        <h4 className="mt-6 text-dark h2-sm">No Events Found</h4>
        <span className="mt-3 text-center text-dark text-opacity-50 h6-lg lg:!h3-sm">
          To see more listings, you can either broaden your search filters or
          search for a different event.
        </span>
        {showResetFiltersButton && onClickResetFilters && (
          <Button
            className="mt-6 w-[226px] rounded border-none !bg-light px-4 py-3 font-semibold transition-colors !h6-lg hover:!bg-[#ebeff5] hover:!text-accent active:!bg-[#e5e8ec] active:!text-accent lg:mt-6 lg:h3-sm"
            label="Reset Filters"
            onClick={onClickResetFilters}
            variant="secondary"
          />
        )}
      </div>
    </div>
  )
}
