'use client'

import { useMemo } from 'react'

const range = (start: number, end: number) => {
  const length = end - start + 1
  return Array.from({ length }, (_, idx) => idx + start)
}

const DOTS = '...'

export const useRangePagination = ({
  SIBLINGS_TO_SHOW,
  currentPage,
  totalPages,
}: {
  SIBLINGS_TO_SHOW: number
  currentPage: number
  totalPages: number
}) => {
  const paginationRange = useMemo(() => {
    const totalPageNumbers = SIBLINGS_TO_SHOW + 5

    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages)
    }

    const leftSiblingIndex = Math.max(currentPage - SIBLINGS_TO_SHOW, 1)
    const rightSiblingIndex = Math.min(
      currentPage + SIBLINGS_TO_SHOW,
      totalPages
    )

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1

    const firstPageIndex = 1
    const lastPageIndex = totalPages

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 1 + 2 * SIBLINGS_TO_SHOW
      const leftRange = range(1, leftItemCount)
      return [...leftRange, DOTS, totalPages]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 1 + 2 * SIBLINGS_TO_SHOW
      const rightRange = range(totalPages - rightItemCount + 1, totalPages)
      return [firstPageIndex, DOTS, ...rightRange]
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex)
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }
  }, [totalPages, SIBLINGS_TO_SHOW, currentPage])

  return paginationRange
}
