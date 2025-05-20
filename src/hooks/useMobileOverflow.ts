import { useEffect } from 'react'

export function useMobileOverflow(isDropdownOpen: boolean, isMobile: boolean) {
  useEffect(() => {
    if (typeof window !== 'undefined' && document && isMobile) {
      if (isDropdownOpen) {
        document.body.style.overflow = 'hidden'
        document.body.style.position = 'static'
      } else {
        document.body.style.overflow = 'auto'
        document.body.style.position = 'static'
      }
    }

    return () => {
      if (typeof window !== 'undefined' && document) {
        document.body.style.overflow = 'auto'
        document.body.style.position = 'static'
      }
    }
  }, [isDropdownOpen, isMobile])
}
