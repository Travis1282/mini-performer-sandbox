'use client';

import type { Region } from '@/contracts/entities/region';
import { Button } from '@/components/Button/';
import { useFilterByQueryParams } from '@/hooks/useFilterByQueryParams';
import { useRegionsContext } from '@/services/categories/use-regions-context';
import { useLocationContext } from '@/services/location/useLocationContext';
import clsx from 'clsx';
import { SelectRegion } from './SelectRegion';

export function RegionHeading({ eventIsGame }: { eventIsGame?: boolean }) {
  const regions = useRegionsContext();
  const { trendingRegion, changeTrendingRegion } = useLocationContext();
  const { setLocation } = useFilterByQueryParams({ regions });

  const selectedTrendingRegion = regions.find((r) => r.id.toString() === trendingRegion);

  const { homeAway } = useFilterByQueryParams();

  const handleSelectRegion = (region: Region | undefined) => {
    if (region) {
      changeTrendingRegion(region.id.toString());
      setLocation(region);
    }
  };

  const eventType = eventIsGame ? 'Game' : 'Event';
  const home = homeAway === 'Home games' && 'Home';
  const away = homeAway === 'Away games' && 'Away';

  const teamLocation = home || away || 'All';
  const homeAndAwayTitle = `${
    eventIsGame ? `${teamLocation} ${eventType}s` : `All ${eventType}s`
  } `;

  const shouldShowLocation = selectedTrendingRegion?.id;
  const showNear = shouldShowLocation;
  const location = shouldShowLocation ? selectedTrendingRegion?.name : `All ${eventType}s`;

  return (
    <div className="flex pl-4" data-testid="locationHeading">
      {regions?.length ? (
        <>
          <h3 className="h3-lg lg:h2-lg pr-1 lg:pr-2">{showNear ? `${eventType}s Near` : ''}</h3>
          {
            <SelectRegion
              regions={regions}
              selected={selectedTrendingRegion}
              setSelected={handleSelectRegion}
            >
              {
                <Button
                  arrow="down"
                  arrowClassName="mb-0.5 w-[12px] h-[12px] lg:h-[16px] lg:w-[16px] lg:mb-1"
                  arrowColor="#3899F8"
                  arrowStrokeWidth={2}
                  className={clsx(
                    'mt-1 p-0! text-[20px]! leading-[22px] font-semibold! lg:mt-0 lg:text-[28px]! lg:leading-[31px]'
                  )}
                  contentClass="items-end!"
                  label=""
                  prefix={location}
                  variant="tertiary"
                />
              }
            </SelectRegion>
          }
        </>
      ) : (
        <h3 className="h3-lg lg:h2-lg px-1 lg:pr-2">{homeAndAwayTitle}</h3>
      )}
    </div>
  );
}
