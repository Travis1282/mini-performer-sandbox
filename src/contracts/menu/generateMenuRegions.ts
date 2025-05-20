import { HOME_REGIONS } from '@/contracts/homeCategories';
import type { components } from '../generated/maverick-schema';
import type { NavbarCategory } from '../UiVariants';

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
