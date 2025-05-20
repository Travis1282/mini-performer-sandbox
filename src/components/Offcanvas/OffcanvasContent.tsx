'use client'

import clsx from 'clsx'
import type { ReactNode } from 'react'

export interface OffcanvasContentProps {
  children?: ReactNode
  className?: string
}

export function OffcanvasContent({
  className,
  children,
}: OffcanvasContentProps) {
  return (
    <div
      className={clsx('grow overflow-y-auto', className)}
      data-cy="offcanvas-content"
    >
      {children}
    </div>
  )
}
