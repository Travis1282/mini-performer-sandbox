'use client'

import type { Region } from '@/contracts/entities/region'
import type { ReactNode, SVGProps } from 'react'
import clsx from 'clsx'

export interface RegionListItemProps {
  additionalInfo?: ReactNode
  children?: ReactNode
  onClick: () => void
  region?: Region
  search?: string
}

export function RegionListItem({
  search,
  region,
  onClick,
  children,
  additionalInfo: aditionalInfo,
}: RegionListItemProps) {
  return (
    <li
      className={clsx(
        'group/item flex cursor-pointer flex-row justify-between whitespace-break-spaces rounded py-2 text-sm',
        'hover:bg-accent lg:hover:border-accent relative rounded-none font-medium hover:bg-opacity-10 lg:border-l-4 lg:border-transparent lg:pl-[22px] lg:pr-[22px]'
      )}
      data-cy="regionListItem"
      data-testid={`${region?.name?.replace(/\s+/g, '').toLocaleLowerCase()}-regionListItem`}
      id="regionListItem"
      onClick={onClick}
    >
      {region && search
        ? makeContainContentBold(`${region.name}`, search)
        : null}
      {region && !search ? `${region.name}` : null}
      {children}
      <span className="text-accent hidden items-center gap-3 font-semibold group-hover/item:flex">
        Select <ChevronRight />
      </span>
      <span className="block text-gray-400 group-hover/item:hidden">
        {aditionalInfo}
      </span>
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

const ChevronRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height={11}
    width={8}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1.813 1.125 6.188 5.5 1.813 9.875"
      stroke="#3899F8"
      strokeLinecap="square"
      strokeWidth={1.5}
    />
  </svg>
)
