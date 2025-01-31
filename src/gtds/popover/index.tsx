'use client'

import type { FC, ReactNode } from 'react'
import * as RadixPopover from '@radix-ui/react-popover'

type DataAttributes = Record<`data-${string}`, unknown>

interface PopoverSlotsProps {
  content?: RadixPopover.PopoverContentProps & DataAttributes
  trigger?: RadixPopover.PopoverTriggerProps
}

interface PopoverProps {
  children: ReactNode
  modal?: boolean
  onOpenChange?: (open: boolean) => void
  open?: boolean
  slots?: PopoverSlotsProps
  trigger: ReactNode
}

export const Popover: FC<PopoverProps> = ({
  children,
  open,
  trigger,
  slots = {},
  modal = false,
  onOpenChange,
}) => (
  <RadixPopover.Root modal={modal} onOpenChange={onOpenChange} open={open}>
    <RadixPopover.Trigger {...slots.trigger} asChild>
      {trigger}
    </RadixPopover.Trigger>
    <RadixPopover.Portal>
      <RadixPopover.Content
        {...slots.content}
        className="z-150 lg:shadow-dropdown-options-box-shadow bg-white"
        side="bottom"
        sideOffset={16}
      >
        <RadixPopover.Arrow
          className="z-150 bg-inherit"
          fill="#ffffff"
          height={8}
          width={16}
        />
        {children}
      </RadixPopover.Content>
    </RadixPopover.Portal>
  </RadixPopover.Root>
)
