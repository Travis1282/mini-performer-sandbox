'use client'

import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { useOutsideClick } from '@/hooks/useClickOutside'

export interface DropdownContainerProps {
  children: ReactNode
  className?: string
  disableAutoClose?: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export function DropdownContainer({
  children,
  className,
  setOpen,
  disableAutoClose,
}: DropdownContainerProps) {
  const ref = useOutsideClick(() => {
    if (disableAutoClose) {
      return
    }
    setOpen(false)
  })

  return (
    <div className={`${className}`} ref={ref}>
      {children}
    </div>
  )
}
