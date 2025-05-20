'use client'

import { useIsMobile } from './useIsMobile'
import { useEffect, useState } from 'react'

export function useIsLandscape(): { isLandscape: boolean } {
  const [isLandscape, setIsLandscape] = useState(false)
  const { isMobile } = useIsMobile()

  useEffect(() => {
    if (typeof window === 'undefined' || !isMobile) {
      setIsLandscape(false)
      return
    }

    setIsLandscape(window.matchMedia('(orientation: landscape)').matches)

    const mediaQuery = window.matchMedia('(orientation: landscape)')
    const handleChange = (e: MediaQueryListEvent) => setIsLandscape(e.matches)

    const isOldQuery = !mediaQuery.addEventListener
    if (isOldQuery) {
      mediaQuery['addListener'](handleChange)
    } else {
      mediaQuery.addEventListener('change', handleChange)
    }
    return () => {
      if (isOldQuery) {
        mediaQuery['removeListener'](handleChange)
      } else {
        mediaQuery.removeEventListener('change', handleChange)
      }
    }
  }, [isMobile])

  return { isLandscape: isMobile ? isLandscape : false }
}
