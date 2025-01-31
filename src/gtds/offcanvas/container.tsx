'use client'

import clsx from 'clsx'
import { type ReactNode, useEffect, useState } from 'react'

export interface OffcanvasContainerProps {
  children?: ReactNode
  className?: string
  inlineStyles?: React.CSSProperties
  open?: boolean
}

// TODO: make this a portal
export function OffcanvasContainer({
  open,
  children,
  className,
  inlineStyles,
}: OffcanvasContainerProps) {
  const [offCanvasOpen, setOffCanvasOpen] = useState(false)

  useEffect(() => {
    setOffCanvasOpen(Boolean(open))
  }, [open])
  return (
    <div
      className={clsx(
        'duration-600 fixed top-0 z-[200] flex w-full max-w-[1024px] flex-col bg-white transition-all h-full-screen',
        offCanvasOpen ? 'visible left-0' : 'invisible -left-[calc(100vw+100%)]',
        className
      )}
      style={inlineStyles}
    >
      {children}
    </div>
  )
}
