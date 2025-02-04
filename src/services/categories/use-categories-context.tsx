import type { ReactNode } from 'react'
import { useQuery } from '@tanstack/react-query'
import { createContext, use, useEffect } from 'react'
import type { components } from '../maverick/generated/maverick-schema'
import { getCategories } from '../maverick/get-categories'
import { OneDayInSeconds } from '../storage/constants'
import { useLocalstorageCache } from '../storage/use-local-storage-cache'

const CategoriesContext = createContext<components['schemas']['Category'][]>([])

const useCategories = () => {
  const [categoriesCache, setCategoriesCache] = useLocalstorageCache<
    components['schemas']['Category'][]
  >('categories', undefined, OneDayInSeconds)

  const { data: categories, status } = useQuery({
    queryKey: ['get', 'categories'],
    queryFn: () => getCategories(),
    enabled: !categoriesCache,
  })

  useEffect(() => {
    if (status === 'pending' || status === 'error') {
      return
    }
    if (status === 'success' && categories.data) {
      setCategoriesCache(categories.data)
    }
  }, [categories, setCategoriesCache, status])

  return categoriesCache ?? []
}

export const CategoriesProvider = ({ children }: { children: ReactNode }) => {
  const categories = useCategories()
  return <CategoriesContext value={categories}>{children}</CategoriesContext>
}

export const useCategoriesContext = () => {
  const categories = use(CategoriesContext)
  if (categories === undefined) {
    throw new Error(
      'useCategoriesContext must be used within a CategoriesProvider'
    )
  }
  return categories
}
