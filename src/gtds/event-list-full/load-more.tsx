'use client'

import { Button } from '@/components/Shared/Button'
import { useAppStore } from '@/store/AppStoreProvider'
import { useSearchParams } from 'next/navigation'
import Loader from '../Loader'

export const LoadMore = ({ hasNextPage }: { hasNextPage: boolean }) => {
  const params = useSearchParams()
  const processChanges = useAppStore((state) => state.processChanges)
  const loadMoreEvents = useAppStore((state) => state.paginationPage)
  const isPaginated = useAppStore((state) => state.paginationType)
  const loading = useAppStore((state) => state.apiLoading)
  const switchedToStore = useAppStore((state) => state.switchedToStore)
  const showLoadMore = switchedToStore
    ? loadMoreEvents && isPaginated
    : hasNextPage

  if (showLoadMore) {
    return (
      <>
        {loadMoreEvents && (
          <div className="flex bg-white lg:mt-3">
            <Button
              arrow={loading ? undefined : 'down'}
              arrowColor="#3899F8"
              arrowSize={16}
              arrowStrokeWidth={1.5}
              className="min-h-[46px] w-full rounded border-none !bg-light px-6 py-3 font-semibold !text-[#3899F8] transition-colors !h6-lg hover:!bg-[#ebeff5] hover:!text-accent active:!bg-[#e5e8ec] active:!text-accent"
              disabled={loading}
              label=""
              onClick={() => {
                processChanges(params, true)
              }}
            >
              {loading ? (
                <Loader className="ml-2" height={15} radius={3} width={15} />
              ) : (
                'View More Events'
              )}
            </Button>
          </div>
        )}
      </>
    )
  }
  return null
}
