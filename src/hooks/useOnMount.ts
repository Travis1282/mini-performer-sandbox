/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react'
export default function useOnMount(callback: () => void) {
  const isFirstRun = useRef<boolean>(false)
  useEffect(() => {
    if (!isFirstRun.current) {
      callback()
      isFirstRun.current = true
    }
  }, [])
}
