'use client'

import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { CollapseActivator } from './Activator'
import { CollapseContainer } from './Container'
import { CollapseContent } from './Content'

export { CollapseContainer, CollapseContent, CollapseActivator }

export interface CollapseProps {
  activator: ReactNode
  content: ReactNode
  onOpen?: (value: boolean) => void
  open?: boolean
}

export function Collapse({ activator, content, open, onOpen }: CollapseProps) {
  const [internalOpen, setInternalOpen] = useState(false)

  function handleOpen(value: boolean) {
    setInternalOpen(value)
    if (onOpen) {
      onOpen(value)
    }
  }

  useEffect(() => {
    if (typeof open === 'boolean' && open !== internalOpen) {
      setTimeout(() => {
        setInternalOpen(open)
      }, 100)
    }
  }, [open, internalOpen])

  return (
    <CollapseContainer>
      <CollapseActivator onClick={() => handleOpen(!internalOpen)}>
        {activator}
      </CollapseActivator>
      <CollapseContent open={internalOpen}>{content}</CollapseContent>
    </CollapseContainer>
  )
}
