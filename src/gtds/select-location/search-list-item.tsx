'use client'

import type { ReactNode, SVGProps } from 'react'
import clsx from 'clsx'

export interface LocationItem {
  city: string
  country?: string
  location: {
    lat: number
    lng: number
  }
  state: string
}

export interface SelectLocationSelectItemProps {
  additionalInfo?: ReactNode
  children?: ReactNode
  location?: LocationItem
  onClick: () => void
  search?: string
}

export function SelectLocationSearchListItem({
  search,
  location,
  onClick,
  children,
  additionalInfo: aditionalInfo,
}: SelectLocationSelectItemProps) {
  return (
    <li
      className={clsx(
        'group/item flex cursor-pointer flex-row justify-between whitespace-break-spaces rounded py-2 text-sm',
        'relative rounded-none font-medium hover:bg-accent hover:bg-opacity-10 lg:border-l-4 lg:border-transparent lg:pl-[22px] lg:pr-[22px] lg:hover:border-accent'
      )}
      onClick={onClick}
    >
      {location && search
        ? makeContainContentBold(`${location.city}, ${location.state}`, search)
        : null}
      {location && !search ? `${location.city}, ${location.state}` : null}
      {children}
      <span className="hidden items-center gap-3 font-semibold text-accent group-hover/item:flex">
        Select <ChevronRight />{' '}
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
    <span className="z-30 font-medium text-dark">
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
