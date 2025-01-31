'use client'

import type { ReactNode } from 'react'

export interface CollapseActivatorProps {
  children: ReactNode
  onClick: () => void
}

export function CollapseActivator({
  children,
  onClick,
}: CollapseActivatorProps) {
  return (
    <button
      className="relative flex w-full cursor-pointer items-center justify-between"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
