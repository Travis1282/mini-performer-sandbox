'use client';

import { Dropdown } from '@/components/Dropdown';
import { HomeAndAwayOptions } from '@/contracts/events/eventFiltersTypes';
import { useFilterByQueryParams } from '@/hooks/useFilterByQueryParams';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router';

interface HomeAwayProps {
  hasFeaturedPerformerEvents?: boolean;
}

export const HomeAway: React.FC<HomeAwayProps> = () => {
  const { homeAway, setHomeAway } = useFilterByQueryParams();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    // prevents multiples renders, only updates when the value changes
    // this does not have a central store, so we need to update the value here as well
    if (searchParams.get('homeAway') !== homeAway) {
      setHomeAway(searchParams.get('homeAway') || undefined);
    }
  }, [homeAway, searchParams, setHomeAway]);

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
  );
};
