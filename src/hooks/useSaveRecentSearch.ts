import type { ResultItemProps } from '@/components/AutocompleteSearch/types'
import LocalStorage, { RECENT_SEARCH } from '@/services/localStorage'
import { useEffect, useState } from 'react'

const localStorageEntity = new LocalStorage(RECENT_SEARCH)

export default function useSaveRecentSearch() {
  const [recentSearch, setRecentSearch] = useState<ResultItemProps[]>([])

  useEffect(() => {
    const items: ResultItemProps[] =
      localStorageEntity.get(RECENT_SEARCH)?.items || []
    setRecentSearch(items)
  }, [])

  function saveSearch(item: ResultItemProps) {
    const items: ResultItemProps[] =
      localStorageEntity.get(RECENT_SEARCH)?.items

    const itemExist = items?.find((i) => i.id === item.id)

    if (itemExist) {
      const newItems = [item, ...(items || []).filter((i) => i.id !== item.id)]
      localStorageEntity.set(RECENT_SEARCH, { items: newItems })
      return
    }

    if (items?.length === 5) {
      items?.pop()
    }
    const newItems = [item, ...(items || [])]

    localStorageEntity.set(RECENT_SEARCH, { items: newItems })
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: RECENT_SEARCH,
        newValue: JSON.stringify({ items: newItems }),
      })
    )
  }

  function clearSearch() {
    localStorageEntity.set(RECENT_SEARCH, { items: [] })
    setRecentSearch([])
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: RECENT_SEARCH,
        newValue: JSON.stringify({ items: [] }),
      })
    )
  }

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === RECENT_SEARCH) {
        const data = JSON.parse(event.newValue || '{}')
        setRecentSearch(data.items)
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  return {
    saveSearch,
    recentSearch,
    clearSearch,
  }
}
