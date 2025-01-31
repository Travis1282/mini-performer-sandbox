import { replaceContent } from '@/utils/helpers'
import clsx from 'clsx'

interface SeoProps {
  className?: string
  content: string
  replace?: Record<string, string>
}

export function Seo({ content, replace = {}, className }: SeoProps) {
  const seoContent = replaceContent(content, replace).replace(
    new RegExp(Object.keys(replace).join('|'), 'g'),
    (match) => {
      return replace[match as keyof typeof replace] || match
    }
  )

  return (
    <div className="text-black">
      <div
        className={clsx(
          'seo-text flex list-inside list-disc flex-col marker:text-accent',
          className
        )}
        dangerouslySetInnerHTML={{ __html: seoContent }}
        data-cy="seo-text"
        id="seo-text"
        key={`event-seo`}
      />
    </div>
  )
}
