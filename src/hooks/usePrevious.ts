import { useEffect, useRef } from 'react'

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export const usePrevious = <T extends unknown>(value: T): T | undefined => {
  const ref = useRef<T>(undefined)
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}
