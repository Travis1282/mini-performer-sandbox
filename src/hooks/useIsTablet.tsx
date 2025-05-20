'use client'

import { useEffect, useState } from 'react'

export function useIsTablet(): { isTablet: boolean } {
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined' && window.navigator) {
      // Set tablet state based on user agent
      setIsTablet(!!window.navigator.userAgent.match(/Tablet|iPad|Surface/i))
    }
  }, [])

  return { isTablet }
}
