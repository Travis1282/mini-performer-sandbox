'use client'

import type { ReactNode } from 'react'

export interface CollapseContainerProps {
  children: ReactNode
}

export function CollapseContainer({ children }: CollapseContainerProps) {
  return (
    <div className="w-full" data-cy="collapse">
      {children}
    </div>
  )
}
