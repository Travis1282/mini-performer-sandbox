'use client'

import { DropdownCheckbox } from '@/components/Shared/DropdownCheckbox'
import { useFilterByQueryParams } from '@/hooks/useFilterByQueryParams'
import { EVENT_TYPE } from '@/utils/contants'

export function EventType() {
  const { types, setTypes } = useFilterByQueryParams()

  return (
    <DropdownCheckbox
      className="flex shrink-0 grow"
      dropdownArrowPosition="center"
      dropdownOptions={EVENT_TYPE}
      handleSelectedItems={setTypes}
      selectedItems={types || []}
      title="Event Type"
      titleMultipleSelected="Type"
    />
  )
}
