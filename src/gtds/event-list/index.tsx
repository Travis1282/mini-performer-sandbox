'use client'

import { Button } from '@/components/Shared/Button'
import { EventListEmpty } from './Empty'

export interface EventListProps {
  children?: React.ReactNode[]
  handleShowMore?: () => void
  hasNextPage?: boolean
  onClickResetFilters?: () => void
  showResetFiltersButton?: boolean
}

export function EventList({
  onClickResetFilters,
  showResetFiltersButton,
  hasNextPage,
  children,
  handleShowMore,
}: EventListProps) {
  return (
    <div data-testid="eventList">
      <div className="flex flex-col lg:rounded lg:border lg:border-light">
        {children}
        {!children?.length && (
          <EventListEmpty
            onClickResetFilters={onClickResetFilters}
            showResetFiltersButton={showResetFiltersButton}
          />
        )}
      </div>
      {hasNextPage && (
        <div className="flex bg-white xl:mt-3">
          <Button
            arrow="down"
            arrowColor="#3899F8"
            arrowSize={16}
            arrowStrokeWidth={1.5}
            className="w-full rounded border-none !bg-light px-6 py-3 font-semibold transition-colors !h6-lg hover:!bg-[#ebeff5] hover:!text-accent active:!bg-[#e5e8ec] active:!text-accent"
            label="View More Events"
            onClick={handleShowMore}
            variant="secondary"
          />
        </div>
      )}
    </div>
  )
}
