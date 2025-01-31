'use client'

import type { Region } from '@/contracts/entities/region'
import type { components } from '@/contracts/generated/maverick-schema'
import type { PageTypeData } from '@/utils/eventUtils'
import useOnMount from '@/hooks/useOnMount'
import useUpdateEffect from '@/hooks/useUpdateEffect'
import { useAppStore } from '@/store/AppStoreProvider'
import { useSearchParams } from 'next/navigation'
interface FilterProps {
  data?: components['schemas']['CmsPathResponse']
  headingInformation: {
    heading: string
    location: string
    homeAndAwayTitle: string
  }
  pageTypeData: PageTypeData
  regions?: Region[]
  useAllEvents: boolean
  useLocalEvents: boolean
}

export const ChangeHandler = ({
  pageTypeData,
  data,
  regions,
  headingInformation,
  useLocalEvents,
  useAllEvents,
}: FilterProps) => {
  const initializePage = useAppStore((state) => state.initializePage)
  const processChanges = useAppStore((state) => state.processChanges)

  const urlParams = useSearchParams()
  const params = urlParams && Object.fromEntries(urlParams)

  useOnMount(() => {
    initializePage(
      pageTypeData,
      data?.events,
      headingInformation,
      useLocalEvents,
      useAllEvents,
      regions,
      data?.category?.eventType,
      data?.category?.id,
      data?.category
    )
  })

  useUpdateEffect(() => {
    processChanges(urlParams)
  }, [params])

  return null
}
