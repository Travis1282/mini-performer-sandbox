'use client';

import type { Region as RegionType } from '@/contracts/entities/region';
import { useFilterByQueryParams } from '@/hooks/useFilterByQueryParams';
import { useRegionsContext } from '@/services/categories/use-regions-context';
import { SelectRegion } from './SelectRegion';

export function Region({
  dropdownPosition = 'lg:left-[calc(50%-150px)]',
  regionsWithEvents,
  disabled,
}: {
  dropdownPosition?: string;
  regionsWithEvents?: RegionType[];
  disabled?: boolean;
}) {
  const regions = useRegionsContext();
  const { location, setLocation } = useFilterByQueryParams({ regions });

  const fullRegion = regionsWithEvents
    ? regionsWithEvents.find((r) => (r.id as number).toString() === location)
    : undefined;

  return (
    <SelectRegion
      className="flex shrink-0"
      disabled={disabled}
      dropdownPosition={dropdownPosition}
      regions={regionsWithEvents || regions}
      selected={fullRegion}
      setSelected={setLocation}
    />
  );
}
