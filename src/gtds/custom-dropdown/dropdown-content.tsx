'use client'

import type { ReactNode } from 'react'
import clsx from 'clsx'

export interface DropdownContentProps {
  children: ReactNode
  className?: string
  open: boolean
  position?: string
}

// TODO: Remember to pass the props right and top as props to the dropdown content
// to place it as you need it
export function DropdownContent({
  children,
  open,
  position = 'top-14',
  className,
}: DropdownContentProps) {
  if (!open) {
    return null
  }

  return (
    <div
      className={clsx(
        'absolute z-10 rounded bg-white shadow-dropdown-options-box-shadow',
        position,
        className
      )}
      id="dropdown-content"
    >
      {children}
    </div>
  )
}
