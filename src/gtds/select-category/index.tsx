'use client'

import type { Category } from '@/contracts/entities/category'
import type { MouseEvent, ReactNode } from 'react'
import { Offcanvas } from '@/components/Shared/Offcanvas'
import { useOutsideClick } from '@/hooks/useClickOutside'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useMobileOverflow } from '@/hooks/useMobileOverflow'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import ToolTip from '../Tooltip'
import { CategoryList } from './CategoryList'

export interface SelectCategoryProps {
  categories: Category[]
  // ; Dispatch<SetStateAction<Category[]>>
  children?: ReactNode
  className?: string
  dropdownPosition?: string
  selected: Category[]
  setSelected: (
    action: ((prevState: Category[]) => Category[]) | Category[]
  ) => void
}

export const SelectCategory = ({
  selected,
  setSelected,
  children,
  categories,
  className,
}: SelectCategoryProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const { isMobile } = useIsMobile()
  const [search, setSearch] = useState('')

  useMobileOverflow(isOpen, isMobile)

  function handleSelect(category: Category, insert: boolean) {
    setSelected((prev) => {
      if (insert) {
        return [...prev, category]
      } else {
        return prev.filter((item) => item.id !== category.id)
      }
    })
  }

  function handleClearDropdown(evt: MouseEvent) {
    evt.stopPropagation()
    evt.preventDefault()
    clearDropdown()
  }

  function clearDropdown() {
    setSelected([])
  }

  function toggleDropdown(evt: MouseEvent) {
    evt.preventDefault()
    if (
      !(evt.target instanceof SVGElement && evt.target.dataset.dropdownXButton)
    ) {
      setIsOpen((prevState) => !prevState)
    }
  }

  const dropdownWrapperRef = useOutsideClick(() => {
    if (!isHovering) {
      setIsOpen(false)
    }
  })

  useEffect(() => {
    setSearch('')
  }, [isOpen])

  if (!categories.length) {
    return null
  }

  return (
    <div
      className={`${className ?? ''}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      ref={dropdownWrapperRef}
    >
      {!isMobile ? (
        <ToolTip open={isOpen}>
          <ToolTip.Activator>
            {children ? (
              <div data-cy="select-category-activator" onClick={toggleDropdown}>
                {children}
              </div>
            ) : (
              <button
                className={clsx(
                  'text-dark shadow-dropdown-button-box-shadow h6-sm lg:h6-lg h-[33px] overflow-hidden rounded-3xl bg-white font-medium lg:h-[36px]',
                  selected.length > 0 && '!bg-accent text-white'
                )}
                data-cy="select-category-activator"
                onClick={toggleDropdown}
              >
                <span
                  className={clsx(
                    'flex h-full flex-row items-center pl-5',
                    selected.length === 0 && 'pr-5'
                  )}
                >
                  {`${
                    selected.length > 0
                      ? `${
                          selected.length > 1
                            ? `Category: ${selected.length}`
                            : selected[0].name
                        }`
                      : 'Category'
                  }`}
                  {selected.length > 0 && (
                    <span
                      className="flex h-full items-center self-center pl-2 pr-5 !text-[8px]"
                      data-cy="x-button"
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
            )}
          </ToolTip.Activator>
          <ToolTip.Content arrowColor="#fff" sideOffset={16}>
            <CategoryList
              categories={categories}
              clearSelectedCategories={handleClearDropdown}
              onSelect={handleSelect}
              search={search}
              selectedCategories={selected}
              setSearch={setSearch}
            />
          </ToolTip.Content>
        </ToolTip>
      ) : (
        <div>
          <button
            className={clsx(
              'text-dark shadow-dropdown-button-box-shadow h6-sm lg:h6-lg h-[33px] overflow-hidden rounded-3xl bg-white font-medium lg:h-[36px]',
              selected.length > 0 && '!bg-accent text-white'
            )}
            data-cy="select-category-activator"
            onClick={toggleDropdown}
          >
            <span
              className={clsx(
                'flex h-full flex-row items-center pl-5',
                selected.length === 0 && 'pr-5'
              )}
            >
              {`${
                selected.length > 0
                  ? `${
                      selected.length > 1
                        ? `Category: ${selected.length}`
                        : selected[0].name
                    }`
                  : 'Category'
              }`}
              {selected.length > 0 && (
                <span
                  className="flex h-full items-center self-center pl-2 pr-5 !text-[8px]"
                  data-cy="x-button"
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
          <Offcanvas
            label="Select Category"
            onClick={() => {
              setIsOpen(false)
            }}
            open={isOpen}
          >
            <CategoryList
              categories={categories}
              clearSelectedCategories={handleClearDropdown}
              onSelect={handleSelect}
              search={search}
              selectedCategories={selected}
              setSearch={setSearch}
            />
          </Offcanvas>
        </div>
      )}
    </div>
  )
}
