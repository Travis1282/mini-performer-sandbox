import { HOME_REGIONS } from '@/contracts/homeCategories';
import type { components } from '../generated/maverick-schema';
import type { NavbarCategory } from '../UiVariants';
import { sportsSecondLevel } from './secondLevel';

export const navbarMenu = [
  {
    id: 5,
    children: sportsSecondLevel,
    url: 'sports',
  },
  {
    title: 'Concerts',
    id: 6,
    url: 'concerts',
  },
  {
    id: 7,
    url: 'theater',
  },
] as NavbarCategory[];

export function generateCategoryTree(
  categories?: components['schemas']['Category'][]
): NavbarCategory[] {
  if (!categories) {
    return [];
  }
  return navbarMenu.map((item) => {
    const category = categories.find(
      (category: components['schemas']['Category']) => category.id === item.id
    );

    const mappedChildren = item?.children?.map((child) => {
      const category = categories.find(
        (category: components['schemas']['Category']) => category.id === child.id
      );
      return {
        id: category?.id || child.id,
        title: category?.name || child.title,
        url: category?.slug || child.url,
        children: child.children,
      };
    });

    return {
      id: category?.id || item.id,
      title: category?.name || item.title,
      url: category?.slug || item.url,
      children: mappedChildren,
    };
  });
}

export function generateMenuRegions(regions: components['schemas']['Region'][]): NavbarCategory[] {
  return regions
    .filter((item) => HOME_REGIONS.includes(item.id as number))
    .map((item) => ({
      id: item.id,
      title: item.name,
      url: `region/${item.slug}`,
    }))
    .sort((a, b) => (a.title ?? '').localeCompare(b.title ?? ''));
}
