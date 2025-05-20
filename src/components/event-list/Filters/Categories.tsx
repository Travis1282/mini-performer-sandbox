'use client';

import { SelectCategory } from '@/components/event-list/Filters/SelectCategory';
import { useFilterByQueryParams } from '@/hooks/useFilterByQueryParams';
import { useCategoriesContext } from '@/services/categories/use-categories-context';

export function Categories({
  dropdownPosition = 'lg:left-[calc(50%-150px)]',
}: {
  dropdownPosition?: string;
}) {
  const categories = useCategoriesContext();
  const { selectedCategories, setSelectedCategories } = useFilterByQueryParams({
    categories,
  });

  return (
    <SelectCategory
      categories={categories}
      className="flex shrink-0 grow"
      dropdownPosition={dropdownPosition}
      selected={selectedCategories || []}
      setSelected={setSelectedCategories}
    />
  );
}
