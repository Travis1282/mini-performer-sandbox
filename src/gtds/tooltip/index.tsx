'use client'

import type { ReactNode } from 'react'
import * as RadixToolTip from '@radix-ui/react-tooltip'
import clsx from 'clsx'

interface TooltipProps {
  children: ReactNode
  disable?: boolean
  id?: string
  open?: boolean
}

const ToolTip = ({ children, open }: TooltipProps) => {
  return (
    <RadixToolTip.Provider delayDuration={200} skipDelayDuration={200}>
      <RadixToolTip.Root open={open}>{children}</RadixToolTip.Root>
    </RadixToolTip.Provider>
  )
}

function TooltipActivator({ children, disable, id }: TooltipProps) {
  return (
    <RadixToolTip.Trigger
      aria-describedby={id || ''}
      asChild
      style={{ pointerEvents: disable ? 'none' : 'auto' }}
    >
      {children}
    </RadixToolTip.Trigger>
  )
}

type DataAttributes = Record<`data-${string}`, unknown>

interface TooltipContentProps extends DataAttributes {
  arrowColor?: string
  children: ReactNode
  className?: string
  id?: string
  side?: 'bottom' | 'left' | 'right' | 'top'
  sideOffset?: number
}

function TooltipContent({
  children,
  arrowColor,
  side,
  sideOffset,
  id,
  className,
  ...rest
}: TooltipContentProps) {
  const navBar =
    typeof window !== 'undefined' ? document.querySelector('nav') : undefined

  return (
    <RadixToolTip.Portal>
      <RadixToolTip.Content
        {...rest}
        className={clsx(className, 'z-100 bg-white')}
        collisionPadding={{
          top: (navBar && navBar?.clientHeight + 100) || 0,
          bottom: 0,
        }}
        id={id || ''}
        side={side || 'bottom'}
        sideOffset={sideOffset}
      >
        {children}
        <RadixToolTip.Arrow className="bg-inherit" fill={arrowColor} />
      </RadixToolTip.Content>
    </RadixToolTip.Portal>
  )
}

export default ToolTip

ToolTip.Activator = TooltipActivator
ToolTip.Content = TooltipContent
