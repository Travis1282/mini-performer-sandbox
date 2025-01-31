'use client'

import type { Dispatch, ReactNode, SetStateAction } from 'react'
import clsx from 'clsx'
import { DropdownActivator } from './DropdownActivator'
import { DropdownContainer } from './DropdownContainer'
import { DropdownContent } from './DropdownContent'

export interface DropdownProps {
  children?: ReactNode
  className?: string
  disableAutoClose?: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function CustomDropdown({
  className,
  children,
  disableAutoClose,
  setOpen,
}: DropdownProps) {
  return (
    <DropdownContainer
      className={clsx('relative', className)}
      disableAutoClose={disableAutoClose}
      setOpen={setOpen}
    >
      {children}
    </DropdownContainer>
  )
}

CustomDropdown.Activator = DropdownActivator
CustomDropdown.Content = DropdownContent
