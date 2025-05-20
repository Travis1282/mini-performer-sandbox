'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import { createContext, useContext, useEffect, useRef } from 'react'

interface UrlParts {
  pathname: string
}

export const usePrevUrl = () => {
  const ref = useRef<undefined | UrlParts>(undefined)

  const pathname = usePathname()

  useEffect(() => {
    ref.current = { pathname }
  }, [pathname])

  return {
    pathname: ref.current?.pathname,
  }
}

type PrevUrlContextType = ReturnType<typeof usePrevUrl>

const PrevUrlContext = createContext<PrevUrlContextType | undefined>(undefined)

interface PrevUrlProviderProps {
  children: ReactNode
}

export const PrevUrlProvider: React.FC<PrevUrlProviderProps> = ({
  children,
}) => {
  const prevUrl = usePrevUrl()

  return (
    <PrevUrlContext.Provider value={prevUrl}>
      {children}
    </PrevUrlContext.Provider>
  )
}

export const usePrevUrlContext = (): PrevUrlContextType => {
  const context = useContext(PrevUrlContext)
  if (!context) {
    throw new Error('usePrevUrlContext must be used within a PrevUrlProvider')
  }
  return context
}
