'use client'

import { useIsOverflow } from '@/hooks/useIsOverflow'
import clsx from 'clsx'
import { useRef, useState } from 'react'

interface ReadMoreProps {
  classButton?: string
  className?: string
  id?: string
  text: string
  title?: string
  titleStyles?: string
}

export default function ReadMore({
  text,
  title,
  titleStyles,
  id,
  className,
  classButton,
}: ReadMoreProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const ref = useRef<HTMLElement>(null)

  const isOverflow = useIsOverflow({
    ref,
  })

  return (
    <div {...(!!id && { id })}>
      <span
        className={clsx(
          'line-clamp-2 overflow-hidden text-inherit',
          isExpanded && '!line-clamp-none',
          className
        )}
        data-testid="readMoreComponent"
        ref={ref}
      >
        <span className={titleStyles}>{title}</span>
        {text}
      </span>
      {(isOverflow || isExpanded) && (
        <button
          className={clsx(
            'inline-block text-blue-500 hover:underline',
            classButton
          )}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Read less' : 'Read more'}
        </button>
      )}
    </div>
  )
}
