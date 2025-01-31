'use client'

import { Dropdown } from '@/components/Shared/Dropdown'
import { HomeAndAwayOptions } from '@/contracts/events/eventFiltersTypes'
import { useFilterByQueryParams } from '@/hooks/useFilterByQueryParams'

interface HomeAwayProps {
  hasFeaturedPerformerEvents?: boolean
}

export const HomeAway: React.FC<HomeAwayProps> = () => {
  const { homeAway, setHomeAway } = useFilterByQueryParams()

  return (
    <Dropdown
      className="flex shrink-0 grow"
      dropdownArrowPosition="center"
      dropdownOptions={[...HomeAndAwayOptions]}
      handleSelectValue={setHomeAway}
      id="homeAwayFilterButton"
      idReset="resetHomeAwayButton"
      selectedValue={homeAway}
      title="Home & Away"
    />
  )
}
