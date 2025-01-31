import type { LinkItem } from '@/components/Shared/Breadcrumb/helper'
import clsx from 'clsx'
import { Fragment } from 'react'

export function Breadcrumb({
  links,
  className,
}: {
  links: LinkItem[]
  className?: string
}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol
        className={clsx(
          'text-[14px] font-medium leading-[1.5] text-dark [&>*]:inline',
          className
        )}
      >
        {links.map((item, index) => (
          <Fragment key={`breadcrumb-item-${index}`}>
            <li className="[&>*]:inline [&>*]:whitespace-pre-wrap [&>*]:hover:text-accent">
              <a
                aria-current={
                  links.length === index + 1 ? 'location' : undefined
                }
                href={item.url}
              >
                {item.title}
              </a>
            </li>
            {index < links.length - 1 ? (
              <li aria-hidden="true" className="px-2">
                /
              </li>
            ) : null}
          </Fragment>
        ))}
      </ol>
    </nav>
  )
}
