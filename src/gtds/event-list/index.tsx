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
      <div className="lg:border-light flex flex-col lg:rounded lg:border">
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
            className="!bg-light !h6-lg hover:!text-accent active:!text-accent w-full rounded border-none px-6 py-3 font-semibold transition-colors hover:!bg-[#ebeff5] active:!bg-[#e5e8ec]"
            label="View More Events"
            onClick={handleShowMore}
            variant="secondary"
          />
        </div>
      )}
    </div>
  )
}
