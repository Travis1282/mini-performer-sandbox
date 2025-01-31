'use client'

import type { Category } from '@/contracts/entities/category'
import type { Dispatch, MouseEvent, SetStateAction } from 'react'
import { resolveImagePath } from '@/utils/helpers'
import clsx from 'clsx'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { CategoryListItem } from './CategoryListItem'

export interface SelectRegionSearchListProps {
  categories: Category[]
  clearSelectedCategories: (evt: MouseEvent) => void
  onSelect: (category: Category, insert: boolean) => void
  search: string
  selectedCategories: Category[]
  setSearch: Dispatch<SetStateAction<string>>
}

export const CategoryList = ({
  search,
  setSearch,
  onSelect,
  categories,
  selectedCategories,
  clearSelectedCategories,
}: SelectRegionSearchListProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [categoriesFiltered, setCategoriesFiltered] = useState<Category[]>([])

  useEffect(() => {
    if (search?.length) {
      setCategoriesFiltered(
        categories.filter((category) =>
          (category.name ?? '').toLowerCase().includes(search.toLowerCase())
        )
      )
    } else {
      setCategoriesFiltered(categories)
    }
  }, [search, categories])

  return (
    <div
      className="lg:shadow-dropdown-options-box-shadow relative h-full grow pr-2"
      data-cy="categoryFilter"
    >
      <div className="flex h-full grow flex-col gap-[22px] px-4 pb-1.5 lg:h-[420px] lg:w-[300px] lg:px-0">
        <div className="lg:mx-6 lg:mt-6">
          <div className="text-large lg:h6-sm mb-4 flex flex-row justify-between">
            <span className="text-dark opacity-60">{`${selectedCategories.length} Selected`}</span>
            <span
              className="text-accent cursor-pointer hover:underline"
              onClick={clearSelectedCategories}
            >
              Clear
            </span>
          </div>
          <div className="relative">
            <input
              className={clsx(
                'w-full rounded border border-[#D2DFF2] py-2 pl-3 pr-[38px] text-sm font-medium leading-[140%] !outline-none lg:h-9'
              )}
              data-cy="categoryFilterInput"
              onChange={(e) => {
                setSearch(e.target.value)
              }}
              placeholder="Search for a category..."
              ref={inputRef}
              type="text"
              value={search}
            />
            <button
              className={clsx(
                'absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer p-3'
              )}
              onClick={() => {
                inputRef.current?.focus()
              }}
            >
              <Image
                alt="Magnifier icon"
                height={14}
                src={resolveImagePath('/img/magnifer-icon.svg')}
                style={{
                  width: 14,
                  height: 14,
                }}
                unoptimized
                width={14}
              />
            </button>
          </div>
        </div>
        <div className="flex h-full flex-col overflow-y-auto">
          {search && categoriesFiltered.length === 0 && (
            <div className="flex h-full grow flex-col items-center justify-center pb-10">
              <Image
                alt="search"
                height={64}
                src={resolveImagePath('/img/loupe.svg')}
                unoptimized
                width={64}
              />
              <h3 className="text-dark h3-sm mb-[6px] mt-6">
                No Results Found
              </h3>
              <p className="text-dark h6-lg flex flex-row flex-wrap items-center justify-center opacity-60">
                Sorry, there are no results for <span>{`"${search}"`}</span>
              </p>
            </div>
          )}

          {categoriesFiltered.length
            ? categoriesFiltered
                .sort((a, b) =>
                  (a.name ?? '') < (b.name ?? '')
                    ? -1
                    : (a.name ?? '') > (b.name ?? '')
                      ? 1
                      : 0
                )
                .map((category, index) => {
                  return (
                    <CategoryListItem
                      category={category}
                      checked={selectedCategories.includes(category)}
                      key={`region-list-item-${category.name}-${index}-id-${category.id}`}
                      onClick={() => {
                        onSelect(
                          category,
                          !selectedCategories.includes(category)
                        )
                        setSearch('')
                      }}
                    />
                  )
                })
            : null}
        </div>
      </div>
    </div>
  )
}
