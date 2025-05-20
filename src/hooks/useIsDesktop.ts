'use client'
import { Display } from '@/contracts/UiVariants'
import { useMediaQuery } from 'usehooks-ts'

export function useIsDesktop(): { isDesktop: boolean } {
  return {
    isDesktop: useMediaQuery(`(min-width: ${Display.lg}px)`, {
      initializeWithValue: false,
    }),
  }
}
