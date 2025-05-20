import type { components } from '@/contracts/generated/maverick-schema';

export function isRootCategory(category?: components['schemas']['Category']) {
  return !category?.parentId;
}
