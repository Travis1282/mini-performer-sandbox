'use client';

import type { Region } from '@/contracts/entities/region';
import type { components } from '@/contracts/generated/maverick-schema';
import type { MouseEvent, ReactNode } from 'react';
import { Offcanvas } from '@/components/Offcanvas';
import { Popover } from '@/components/Popover';
import { useIsMobile } from '@/hooks/useIsMobile';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { RegionList } from './Regionlist';

export interface NewLayoutSelectRegionProps {
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  dropdownPosition?: string;
  regions: components['schemas']['Region'][];
  selected: components['schemas']['Region'] | undefined;
  setSelected: (region: components['schemas']['Region'] | undefined) => void;
}

export const NewLayoutSelectRegion = ({
  children,
  className,
  disabled,
  regions,
  selected,
  setSelected,
}: NewLayoutSelectRegionProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setIsRegionDropdownOpen] = useState(false);

  const { isMobile } = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  function handleSelect(region: Region) {
    setSelected(region);
    setIsOpen(false);
  }

  function toggleDropdown(evt: MouseEvent) {
    evt.preventDefault();
    if (!(evt.target instanceof SVGElement && evt.target.dataset.dropdownXButton)) {
      setIsOpen((prevState) => !prevState);
    }
  }

  useEffect(() => {
    setSearch('');
    if (setIsRegionDropdownOpen) {
      setIsRegionDropdownOpen(isOpen);
    }
  }, [isOpen, setIsRegionDropdownOpen]);

  return (
    <div className={`${className ?? ''}`} data-cy="select-region" data-testid="select-region">
      <Popover
        onOpenChange={(open) => setIsOpen(open)}
        open={isMobile ? false : isOpen}
        slots={{
          trigger: {
            id: 'region-list-content',
          },
          content: {
            'data-testid': 'region-list-content',
            id: 'region-list-content',
          },
        }}
        trigger={
          children ? (
            <div
              data-cy="select-region-activator"
              data-testid="select-region-activator"
              onClick={toggleDropdown}
            >
              {children}
            </div>
          ) : (
            <button
              className={clsx(
                'text-dark shadow-dropdown-button-box-shadow h6-sm lg:h6-lg h-[33px] shrink-0 overflow-hidden rounded-3xl bg-white font-medium lg:h-[36px]',
                selected && 'bg-accent! text-white',

                disabled && 'hover:none active:none cursor-not-allowed opacity-50'
              )}
              data-cy="select-region-activator"
              data-testid="select-region-activator"
              disabled={disabled}
              id="locationFilterButton"
              onClick={toggleDropdown}
            >
              <span className="flex h-full flex-row items-center pl-5">
                {`${selected ? `${selected.name}` : 'Location'}`}
                <span
                  aria-label="Reset Location"
                  className="flex h-full items-center pr-3.5 pl-2 text-[8px]!"
                  id="resetLocationButton"
                >
                  <ChevronDownIcon className="mt-0.5 h-4 w-4" />
                </span>
              </span>
            </button>
          )
        }
      >
        <RegionList
          data-testid="region-list-desktop"
          onSelect={handleSelect}
          options={regions}
          search={search}
          setSearch={setSearch}
        />
      </Popover>

      {isMobile ? (
        <Offcanvas
          label="Select Location"
          onClick={() => {
            setIsOpen(false);
          }}
          open={isOpen}
        >
          <RegionList
            data-testid="region-list-mobile"
            onSelect={handleSelect}
            options={regions}
            search={search}
            setSearch={setSearch}
          />
        </Offcanvas>
      ) : null}
    </div>
  );
};
