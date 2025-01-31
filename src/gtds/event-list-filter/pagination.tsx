'use client'

import { Button } from '@/components/Shared/Button'
import { useRangePagination } from '@/hooks/useRangePagination'
import clsx from 'clsx'

interface PaginationProps {
  className?: string
  currentPage: number
  handleChangePage: (page: number) => void
  totalPages: number
}

export const Pagination = ({
  totalPages,
  currentPage,
  handleChangePage,
  className,
}: PaginationProps) => {
  const paginationRange = useRangePagination({
    SIBLINGS_TO_SHOW: 1,
    currentPage,
    totalPages,
  })

  const handlePageClick = (page: number) => {
    handleChangePage(page)
  }

  const renderPageButtons = () => {
    return paginationRange?.map((page, index, arr) => {
      if (page === '...') {
        return (
          <PageButton
            isActive={false}
            key={index}
            onClick={() =>
              handlePageClick(
                index === 1
                  ? Number(arr[index + 1]) - 1
                  : Number(arr[index - 1]) + 1
              )
            }
            page={'...'}
          />
        )
      }
      return (
        <PageButton
          isActive={currentPage === page}
          key={index}
          onClick={() => handlePageClick(Number(page))}
          page={String(page)}
        />
      )
    })
  }

  return (
    <div
      className={clsx(
        'flex flex-wrap items-center justify-between',
        className ?? ''
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <Button
          className="active:bg-accent-light! rounded"
          disabled={currentPage === 1}
          label="⟨"
          onClick={() => handlePageClick(currentPage - 1)}
          variant="quaternary"
        />

        <div className="flex items-center gap-[15px]">
          {renderPageButtons()}
        </div>
        <Button
          className="active:bg-accent-light! rounded"
          disabled={currentPage === totalPages}
          label="⟩"
          onClick={() => handlePageClick(currentPage + 1)}
          variant="quaternary"
        />
      </div>
    </div>
  )
}

interface PageButtonProps {
  isActive: boolean
  onClick: () => void
  page: string
}

const PageButton = ({ isActive, onClick, page }: PageButtonProps) => {
  return (
    <button
      className={clsx(
        'button-text rounded-[4px] px-2.5 py-2',
        isActive
          ? 'bg-accent hover:bg-accent-hover active:bg-accent-dark text-white'
          : 'text-accent hover:text-accent-dark bg-transparent',
        'transition-colors duration-200 ease-in-out'
      )}
      onClick={onClick}
    >
      {page}
    </button>
  )
}
