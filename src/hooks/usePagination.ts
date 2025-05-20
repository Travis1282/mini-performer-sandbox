import { useMemo, useState } from 'react'

interface UsePaginationProps<T> {
  data: T[]
  defaultInitialQuantity?: number
  itemsPerPage: number
}

function usePagination<T>({
  data,
  itemsPerPage,
  defaultInitialQuantity = 0,
}: UsePaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(1)

  const currentData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    const totalToAdd =
      currentPage === 1 && defaultInitialQuantity
        ? defaultInitialQuantity
        : itemsPerPage + defaultInitialQuantity
    const end = start + totalToAdd

    // If we need to make the data only the new items, change 0 to start.
    // it was done like this because the current pagination on the website
    // is only a list that grows.
    return data?.slice(0, end)
  }, [currentPage, data, itemsPerPage, defaultInitialQuantity])

  const hasNextPage = currentData?.length < data?.length

  const maxPage = Math.ceil(data?.length / itemsPerPage)

  const next = () => {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage))
  }

  const prev = () => {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1))
  }

  const jump = (page: number) => {
    const pageNumber = Math.max(1, page)
    setCurrentPage(() => Math.min(pageNumber, maxPage))
  }

  const reset = () => {
    setCurrentPage(1)
  }

  return { next, prev, jump, currentPage, currentData, hasNextPage, reset }
}
export default usePagination
