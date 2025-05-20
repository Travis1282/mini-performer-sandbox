import { useMediaQuery } from 'usehooks-ts'

export function useIsTouch() {
  return useMediaQuery('(pointer: coarse)')
}
