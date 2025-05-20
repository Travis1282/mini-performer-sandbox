import { useCallback, useEffect, useState } from 'react'

export const usePosition = () => {
  const [positionY, setPositionY] = useState<null | number>(null)

  const onScroll = useCallback((e: Event) => {
    const window = e.currentTarget as Window
    const currentPosition = window.scrollY
    setPositionY(currentPosition)
  }, [])

  useEffect(() => {
    if (positionY !== null) {
      return
    }
    const win: Window = window
    setPositionY(win.scrollY)
    win.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll, positionY])

  return {
    positionY,
  }
}
