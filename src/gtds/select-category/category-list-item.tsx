'use client'

import type { Category } from '@/contracts/entities/category'
import type { ReactNode } from 'react'
import clsx from 'clsx'

export interface RegionListItemProps {
  additionalInfo?: ReactNode
  category?: Category
  checked?: boolean
  children?: ReactNode
  onClick: () => void
  search?: string
}

export function CategoryListItem({
  search,
  category,
  onClick,
  children,
  checked,
}: RegionListItemProps) {
  return (
    <li
      className={clsx(
        'group/item flex cursor-pointer flex-row justify-between whitespace-break-spaces rounded py-2 text-sm',
        'lg:hover:border-accent relative rounded-none font-medium lg:border-l-4 lg:border-transparent lg:pl-[22px] lg:pr-[22px]',
        checked
          ? 'bg-accent text-white lg:!border-l-0'
          : 'hover:bg-accent hover:bg-opacity-10'
      )}
    >
      <label className="flex w-full cursor-pointer flex-row items-center justify-between">
        {category && search
          ? makeContainContentBold(`${category.name}`, search)
          : null}
        {category && !search ? `${category.name}` : null}
        {children}
        <input
          checked={checked}
          className="text-accent mr-2.5 self-center rounded border border-[#B3B8BE] lg:mr-0"
          id={category?.id ? `${category.id}` : ''}
          onChange={onClick}
          type="checkbox"
          value={category?.name}
        />
      </label>
    </li>
  )
}

function makeContainContentBold(str: string, search: string) {
  const firstLetterIndex = str
    .toLowerCase()
    .indexOf(search[0].toLocaleLowerCase())
  const lastLetterIndex = firstLetterIndex + search.length - 1
  const firstPart = str.slice(0, firstLetterIndex)
  const includedPart = str.slice(firstLetterIndex, lastLetterIndex + 1)
  const lastPart = str.slice(lastLetterIndex + 1)

  return (
    <span className="text-dark z-30 font-medium">
      {firstPart}
      <b className="ext-sm font-semibold">{includedPart}</b>
      {lastPart}
    </span>
  )
}
