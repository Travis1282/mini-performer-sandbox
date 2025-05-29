'use client';

import type { Region } from '@/contracts/entities/region';
import type { Dispatch, SetStateAction } from 'react';
import { resolveImagePath } from '@/utils/helpers';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { RegionListItem } from './RegionListItem';

type DataAttributes = Record<`data-${string}`, unknown>;

export interface SelectRegionSearchListProps extends DataAttributes {
  clearSearchItem?: string;
  onSelect: (region: Region) => void;
  options: Region[];
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

export const RegionList = ({
  options,
  search,
  setSearch,
  onSelect,
  ...rest
}: SelectRegionSearchListProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [regions, setRegions] = useState<Region[]>(options);

  useEffect(() => {
    setRegions(
      options.filter((region) => {
        if ((region.name ?? '').toLowerCase().includes(search.toLowerCase())) {
          return region;
        }
      })
    );
  }, [options, search]);

  return (
    <div
      {...rest}
      className="relative h-full grow px-2"
      data-cy="locationFilter"
      id="locationFilter"
    >
      <div className="flex h-full grow flex-col gap-[22px] px-4 pb-1.5 lg:h-[354px] lg:w-[300px] lg:px-0">
        <div className="lg:mx-6 lg:mt-6">
          <div className="relative">
            <input
              className={clsx(
                'body2 w-full rounded-xs border border-[#D2DFF2] py-2 pr-[38px] pl-3 leading-[140%] font-medium outline-hidden! lg:h-9'
              )}
              data-cy="locationFilterInput"
              id="locationFilterInput"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="Search for a region..."
              ref={inputRef}
              type="text"
              value={search}
            />
            <button
              className={clsx('absolute top-1/2 right-0 -translate-y-1/2 cursor-pointer p-3')}
              onClick={() => {
                inputRef.current?.focus();
              }}
            >
              <img
                alt="Magnifier icon"
                height={14}
                src={resolveImagePath('/img/magnifer-icon.svg')}
                style={{
                  width: 14,
                  height: 14,
                }}
                width={14}
              />
            </button>
          </div>
        </div>
        <ul className="flex h-full flex-col overflow-y-auto">
          {search && regions.length === 0 && (
            <li className="flex h-full grow flex-col items-center justify-center pb-10">
              <img alt="search" height={64} src={resolveImagePath('/img/loupe.svg')} width={64} />
              <h3 className="text-dark h3-sm mt-6 mb-[6px]">No Results Found</h3>
              <p className="text-dark h6-lg flex flex-row flex-wrap items-center justify-center break-all opacity-60">
                Sorry, there are no results for <span>{`"${search}"`}</span>
              </p>
            </li>
          )}

          {regions &&
            regions
              .sort((a, b) =>
                (a.name ?? '') < (b.name ?? '') ? -1 : (a.name ?? '') > (b.name ?? '') ? 1 : 0
              )
              .map((region, index) => (
                <RegionListItem
                  key={`region-list-item-${region.name}-${index}-id-${region.id}`}
                  onClick={() => {
                    onSelect(region);
                    setSearch('');
                  }}
                  region={region}
                />
              ))}
        </ul>
      </div>
    </div>
  );
};
