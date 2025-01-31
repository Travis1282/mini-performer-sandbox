'use client'

import type { Arrows } from '@/contracts/UiVariants'
import clsx from 'clsx'

export interface ArrowProps {
  className?: string
  color?: string
  currentColor?: boolean
  height: number
  side?: Arrows
  strokeWidth?: number
  viewBox?: string
  width: number
}

export function Arrow({
  width,
  height,
  className,
  side = 'right',
  color = 'black', //should be primitive color, not tailwind color
  strokeWidth = 1.5,
  currentColor = false,
  viewBox = '0 0 14 8',
}: ArrowProps) {
  const sideOptions = {
    left: 'rotate-90',
    up: 'rotate-180',
    down: '',
    right: 'rotate-[270deg]',
  }

  return (
    <svg
      className={clsx(sideOptions[side], className)}
      data-cy="arrow"
      data-testid="arrow-component"
      fill="none"
      height={height}
      stroke={color}
      viewBox={viewBox}
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.625 1.188 7 6.813 1.375 1.188"
        stroke={currentColor ? 'currentColor' : '#3899F8'}
        strokeLinecap="square"
        strokeWidth={strokeWidth}
      />
    </svg>
  )
}
