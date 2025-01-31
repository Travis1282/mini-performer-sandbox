'use client'

import ResultsBox from '@/components/AutocompleteSearch/ResultBox'
import { useDebounce } from '@/hooks/useDebounce'
import useSaveRecentSearch from '@/hooks/useSaveRecentSearch'
import { useToast } from '@/hooks/useToast'
import { GtmSearch, GtmSearchInput } from '@/libs/gtm/gtm'
import { resolveImagePath } from '@/utils/helpers'
import clsx from 'clsx'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { PopoverFade } from './popoverFade'

export interface OffCanvasSearchProps {
  handleClose: () => void
  handleDropdownOpen?: (value: boolean) => void
  inputRef?: React.RefObject<HTMLInputElement>
  isAtNavbar?: boolean
  isOpen: boolean
  isSearchAtNavbarOpen?: boolean
  onClose?: () => void
  onTransitionEnd?: (isOpen: boolean) => void
  setIsOpen: (value: boolean) => void
  startWithVisibleInput?: boolean
}

const OffCanvasSearch = ({
  isAtNavbar,
  isOpen,
  setIsOpen,
  handleClose,
  inputRef,
}: OffCanvasSearchProps) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [search, setSearch] = useState(searchParams?.get('search') || '')

  const debouncedValue = useDebounce<string>(search, 500)

  useEffect(() => {
    if (debouncedValue.length >= 2) {
      GtmSearchInput(debouncedValue, 'header')
    }
  }, [debouncedValue])

  function handleChangeSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value)
  }

  const { toast } = useToast()

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      GtmSearch(search)
      if (search.length < 2) {
        toast({
          message: 'Search must be at least 2 characters',
          type: 'error',
        })
        return
      }
      setTimeout(() => {
        handleClose?.()
        router.push(`/search?q=${search}`)
      }, 600)
    }
  }

  const { recentSearch } = useSaveRecentSearch()

  const input = (
    <div
      className={clsx(
        'relative mb-8 w-full transition-opacity duration-75',
        isOpen ? 'z-100 flex max-h-10 px-8 opacity-100 delay-75' : ''
      )}
    >
      <input
        className={clsx(
          isOpen
            ? 'mt-1 w-full flex-1 rounded border border-[#B3B8BE] px-3 py-[10px] text-sm font-medium text-dark placeholder-dark placeholder-opacity-40'
            : 'h-19 relative z-100 m-0 -ml-8 -mt-5 w-1 opacity-0'
        )}
        data-cy="searchInputMobile"
        onChange={handleChangeSearchInput}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyPress}
        placeholder="Search by team, artist, event or venue"
        ref={inputRef}
        type="text"
        value={search}
      />
      {isOpen ? (
        <Image
          alt="search"
          className="absolute right-12 top-[16px]"
          height={14}
          src={resolveImagePath('/img/icons/fi-bs-search.svg')}
          width={14}
        />
      ) : null}
    </div>
  )
  return (
    <>
      <PopoverFade isOpen={isOpen} setIsOpen={handleClose}>
        {input}
        <div className="flex grow flex-col">
          {isOpen && (debouncedValue.length >= 2 || recentSearch.length) ? (
            <ResultsBox
              handleClose={() => {
                handleClose()
              }}
              isAtNavbar={isAtNavbar}
              search={debouncedValue}
            />
          ) : null}
        </div>
      </PopoverFade>
    </>
  )
}

export default OffCanvasSearch
