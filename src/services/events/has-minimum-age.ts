import type { components } from '../maverick/generated/maverick-schema';

export function hasMinimumAge(event?: components['schemas']['Event']) {
  return Boolean(event?.minimumAge);
}
