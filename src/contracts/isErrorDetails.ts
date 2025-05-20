import type { components } from './generated/maverick-schema';

export function isErrorDetails(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any
): error is components['schemas']['ErrorDetails'] {
  if (error && 'errors' in error && Array.isArray(error.errors)) {
    return true;
  }
  return false;
}
