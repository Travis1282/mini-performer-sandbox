import {
  type MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react'

export const useOutsideClick = (
  callback: () => void
): MutableRefObject<HTMLDivElement | null> => {
  const elementRef = useRef<HTMLDivElement>(null)
  const refCallback = useRef(callback)

  useLayoutEffect(() => {
    refCallback.current = callback
  })

  useEffect(() => {
    const handler = (event: MouseEvent | TouchEvent) => {
      if (event.type === 'touchstart') {
        event.stopImmediatePropagation()
      }

      const target = event.target as Node
      const element = elementRef.current

      if (element && !element.contains(target)) {
        refCallback.current()
      }
    }

    document.addEventListener('mousedown', handler)
    document.addEventListener('touchstart', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('touchstart', handler)
    }
  }, [])

  return elementRef
}
