'use client'

import type { Region } from '@/contracts/entities/region'
import type { components } from '@/contracts/generated/maverick-schema'
import type { MouseEvent, ReactNode } from 'react'
import { Offcanvas } from '@/components/Shared/Offcanvas'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useAppStore } from '@/store/AppStoreProvider'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { Popover } from '../Popover'
import { RegionList } from './Regionlist'

export interface SelectRegionProps {
  children?: ReactNode
  className?: string
  disabled?: boolean
  dropdownPosition?: string
  regions: components['schemas']['Region'][]
  selected: components['schemas']['Region'] | undefined
  setSelected: (region: components['schemas']['Region'] | undefined) => void
}

export const SelectRegion = ({
  children,
  className,
  disabled,
  regions,
  selected,
  setSelected,
}: SelectRegionProps) => {
  const setIsRegionDropdownOpen = useAppStore(
    (state) => state.setIsRegionDropdownOpen
  )

  const { isMobile } = useIsMobile()
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')

  function handleSelect(region: Region) {
    setSelected(region)
    setIsOpen(false)
  }

  function handleClearDropdown(evt: MouseEvent) {
    evt.stopPropagation()
    evt.preventDefault()
    setSelected(undefined)
  }

  function toggleDropdown(evt: MouseEvent) {
    evt.preventDefault()
    if (
      !(evt.target instanceof SVGElement && evt.target.dataset.dropdownXButton)
    ) {
      setIsOpen((prevState) => !prevState)
    }
  }

  useEffect(() => {
    setSearch('')
    if (setIsRegionDropdownOpen) {
      setIsRegionDropdownOpen(isOpen)
    }
  }, [isOpen, setIsRegionDropdownOpen])

  return (
    <div
      className={`${className ?? ''}`}
      data-cy="select-region"
      data-testid="select-region"
    >
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
                'h-[33px] shrink-0 overflow-hidden rounded-3xl bg-white font-medium text-dark shadow-dropdown-button-box-shadow h6-sm lg:h-[36px] lg:h6-lg',
                selected && '!bg-accent text-white',
                disabled &&
                  'hover:none active:none cursor-not-allowed opacity-50'
              )}
              data-cy="select-region-activator"
              data-testid="select-region-activator"
              disabled={disabled}
              id="locationFilterButton"
              onClick={toggleDropdown}
            >
              <span
                className={clsx(
                  'flex h-full flex-row items-center pl-5',
                  !selected && 'pr-5'
                )}
              >
                {`${selected ? `${selected.name}` : 'Location'}`}
                {selected && (
                  <span
                    aria-label="Reset Location"
                    className="flex h-full items-center self-center pl-2 pr-5 !text-[8px]"
                    id="resetLocationButton"
                    onClick={handleClearDropdown}
                  >
                    <svg
                      data-dropdown-x-button
                      fill="none"
                      height="8"
                      viewBox="0 0 8 8"
                      width="8"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.80309 6.85232L4.95077 4L7.80309 1.14768C8.06564 0.885136 8.06564 0.459457 7.80309 0.19691C7.54054 -0.0656368 7.11486 -0.0656367 6.85232 0.19691L4 3.04923L1.14768 0.19691C0.885136 -0.0656367 0.459457 -0.0656368 0.19691 0.19691C-0.0656368 0.459457 -0.0656367 0.885136 0.19691 1.14768L3.04923 4L0.19691 6.85232C-0.0656368 7.11486 -0.0656368 7.54054 0.19691 7.80309C0.459457 8.06564 0.885136 8.06564 1.14768 7.80309L4 4.95077L6.85232 7.80309C7.11486 8.06564 7.54054 8.06564 7.80309 7.80309C8.06564 7.54054 8.06564 7.11486 7.80309 6.85232Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                )}
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
            setIsOpen(false)
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
  )
}
