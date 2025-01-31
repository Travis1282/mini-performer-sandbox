'use client'

import type { Category } from '@/contracts/entities/category'
import { SelectCategory } from '@/components/Shared/SelectCategory'
import { useFilterByQueryParams } from '@/hooks/useFilterByQueryParams'

export function Categories({
  dropdownPosition = 'lg:left-[calc(50%-150px)]',
  categories,
}: {
  dropdownPosition?: string
  categories: Category[]
}) {
  const { selectedCategories, setSelectedCategories } = useFilterByQueryParams({
    categories,
  })

  return (
    <SelectCategory
      categories={categories}
      className="flex shrink-0 grow"
      dropdownPosition={dropdownPosition}
      selected={selectedCategories || []}
      setSelected={setSelectedCategories}
    />
  )
}
