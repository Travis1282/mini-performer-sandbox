'use strict'
import { useDisclosureContext } from '@/contexts/DisclosureProvider'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const useTrackPageVisit = () => {
  const [pathWhenShown, setPathWhenShown] = useState<null | string>(null)
  const { showResaleDisclosure, setShowResaleDisclosure } =
    useDisclosureContext()
  const pathname = usePathname()

  const trackPageVisit = (): void => {
    const isRefererExistingHost = document?.referrer?.includes(
      window?.location?.host
    )
    const usp = new URLSearchParams(window?.location?.search)
    const isGoogleCPC =
      usp?.get('utm_source') === 'google' && usp?.get('utm_medium') === 'cpc'

    setShowResaleDisclosure(isGoogleCPC || !isRefererExistingHost)
    setPathWhenShown(pathname)
  }

  // Reset the disclosure if the user navigates away from the page
  useEffect(() => {
    if (showResaleDisclosure && pathWhenShown && pathname !== pathWhenShown) {
      setShowResaleDisclosure(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        trackPageVisit()
      } catch (e) {
        console.error(e)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default useTrackPageVisit
