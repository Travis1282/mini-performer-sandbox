import { useCallback, useEffect, useRef } from 'react'

function useOnceWhenReady(callback: () => void, dependencies: unknown[]) {
  const hasRunRef = useRef(false)
  const checkReady = useCallback(() => {
    if (dependencies.every((dep) => dep !== undefined)) {
      hasRunRef.current = true
      callback()
    }
  }, [callback, dependencies])

  useEffect(() => {
    if (!hasRunRef.current) {
      checkReady()
    }
  }, [checkReady, dependencies])
}

export default useOnceWhenReady
