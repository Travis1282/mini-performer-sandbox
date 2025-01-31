'use client'

import { Dropdown } from '@/components/Shared/Dropdown'
import { TimeOptions } from '@/contracts/events/eventFiltersTypes'
import { useFilterByQueryParams } from '@/hooks/useFilterByQueryParams'

export function EventTime() {
  const { time, setTime } = useFilterByQueryParams()

  return (
    <Dropdown
      className="flex shrink-0"
      dropdownArrowPosition="center"
      dropdownOptions={[...TimeOptions]}
      handleSelectValue={setTime}
      id="timeFilterButton"
      idReset="resetTimeButton"
      selectedValue={time}
      title="Time"
    />
  )
}
