import type { LinkItem } from '@/components/breadcrumb/helper';
import clsx from 'clsx';
import { Fragment } from 'react';

export function Breadcrumb({ links, className }: { links: LinkItem[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className={clsx('text-dark text-[14px] leading-normal font-medium *:inline', className)}>
        {links.map((item, index) => (
          <Fragment key={`breadcrumb-item-${index}`}>
            <li className="*:hover:text-accent *:inline *:whitespace-pre-wrap">
              <a aria-current={links.length === index + 1 ? 'location' : undefined} href={item.url}>
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
  );
}
