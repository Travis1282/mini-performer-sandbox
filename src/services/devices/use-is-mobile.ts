'use client'

import { useEffect, useState } from 'react'

import { Display } from './display.constants'

export function useIsMobile(): { isMobile: boolean } {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(Boolean(window.innerWidth < Display.lg))

    function mediaQueryCallback(e: MediaQueryListEvent) {
      setIsMobile(e.matches)
    }

    const mediaQuery = window.matchMedia(`(max-width: ${Display.lg}px)`)
    const isOldQuery = !mediaQuery.addEventListener
    if (isOldQuery) {
      mediaQuery['addListener'](mediaQueryCallback)
    } else {
      mediaQuery?.addEventListener('change', mediaQueryCallback)
    }
    return () => {
      if (isOldQuery) {
        mediaQuery['addListener'](mediaQueryCallback)
      } else {
        mediaQuery?.addEventListener('change', mediaQueryCallback)
      }
    }
  }, [])

  return { isMobile }
}
