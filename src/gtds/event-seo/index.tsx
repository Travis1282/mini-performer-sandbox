import type { CustomFieldValuesParent } from '@/contracts/entities/parent'
import type { components } from '@/contracts/generated/maverick-schema'
import type { ComponentProps } from 'react'
import { getPerformerStructuredData } from '@/libs/schema-dts/PerformerSchema'
import { replaceContent } from '@/utils/helpers'
import clsx from 'clsx'
import dayjs from 'dayjs'
import React from 'react'

interface PerformerEventSeoProps extends ComponentProps<'div'> {
  customFields?: components['schemas']['CmsPathResponse']['customFieldValues']
  data?:
    | components['schemas']['Category']
    | components['schemas']['Performer']
    | components['schemas']['Venue']
  template?: string
}

export function PerformerEventSeo({
  data,
  customFields,
  template,
  className,
}: PerformerEventSeoProps) {
  if (!data) {
    return null
  }

  const replacements = {
    '{{performerName}}': data.name ?? '',
    '{{currentYear}}': dayjs().format('YYYY'),
    '{{name}}': data.name ?? '',
    '\n': '',
  }

  const hasCustomField = (
    customFields: CustomFieldValuesParent[],
    attributeName: string
  ) => {
    return customFields.some(
      (item) =>
        item.customField.attributeName === attributeName &&
        item.fieldValue !== ''
    )
  }

  const getCustomFieldValue = (
    customFields: CustomFieldValuesParent[],
    attributeName: string
  ) => {
    const item = customFields.find(
      (item) =>
        item.customField.attributeName === attributeName &&
        item.fieldValue !== ''
    )
    return item ? item.fieldValue : ''
  }

  const getSeoPerformerParents = (fieldName: string) => {
    const categoryMappings = {
      primaryCategory: 'customFieldValues',
      parent: 'customFieldValues',
    }

    if (data && 'primaryCategory' in data && data.primaryCategory) {
      const primaryCategory = data.primaryCategory
      const foundValue = Object.keys(categoryMappings).reduce(
        (result: null | string, category: string) => {
          if (result) {
            return result
          }

          const customFields =
            primaryCategory[
              categoryMappings[
                category as keyof typeof categoryMappings
              ] as keyof typeof primaryCategory
            ]

          if (
            Array.isArray(customFields) &&
            hasCustomField(customFields, fieldName)
          ) {
            return getCustomFieldValue(customFields, fieldName)
          }

          return null
        },
        null
      )
      if (foundValue !== null) {
        return foundValue
      }
    }

    return ''
  }

  const getSeoContent = () => {
    const templateMappings = {
      category: 'categoryContent',
      performer: 'dynamicPerformerContent',
      'performer-page': 'dynamicPerformerContent',
    }

    if (templateMappings[template as keyof typeof templateMappings]) {
      if (customFields) {
        const seoContentKey = Object.keys(customFields).find((key) =>
          key.includes('seoContent')
        )
        if (seoContentKey) {
          return customFields[
            seoContentKey as keyof components['schemas']['CmsPathResponse']['customFieldValues']
          ]
        }
      }

      if (
        customFields &&
        customFields[
          templateMappings[
            template as keyof typeof templateMappings
          ] as keyof components['schemas']['CmsPathResponse']['customFieldValues']
        ]
      ) {
        return customFields[
          templateMappings[
            template as keyof typeof templateMappings
          ] as keyof components['schemas']['CmsPathResponse']['customFieldValues']
        ]
      } else if ('primaryCategory' in data && data.primaryCategory) {
        const seoDynamicPerformer = getSeoPerformerParents(
          'dynamicPerformerContent'
        )
        const seoCategory = getSeoPerformerParents('categoryContent')
        if (seoDynamicPerformer) {
          return seoDynamicPerformer
        } else if (seoCategory) {
          return seoCategory
        }
      }
    }
    return ''
  }

  const seoContent = replaceContent(getSeoContent(), replacements).replace(
    /{{performerName}}|{{currentYear}}|{{name}}/g,
    (match) => {
      return replacements[match as keyof typeof replacements] || match
    }
  )
  const structuredData = getPerformerStructuredData(data)
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
        type="application/ld+json"
      ></script>
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
    </>
  )
}
