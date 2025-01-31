'use client'

import type { ReactNode } from 'react'
import clsx from 'clsx'

export interface CollapseContentProps {
  children: ReactNode
  className?: string
  open: boolean
}

export function CollapseContent({ children, open }: CollapseContentProps) {
  return (
    <div
      className={clsx(
        'origin-top overflow-hidden transition-all delay-75 duration-300 ease-in-out',
        open && 'max-h-[2000px]',
        !open && 'max-h-0'
      )}
    >
      {children}
    </div>
  )
}
