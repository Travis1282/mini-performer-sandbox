import React from 'react'

export const useIsOverflow = ({
  ref,
  callback,
}: {
  ref: React.RefObject<HTMLElement | null>
  callback?: (isOverflow: boolean) => void
}) => {
  const [isOverflow, setIsOverflow] = React.useState(false)

  React.useLayoutEffect(() => {
    const { current } = ref

    const trigger = () => {
      const hasOverflow =
        current?.scrollHeight && current?.clientHeight
          ? current.scrollHeight > current.clientHeight
          : false

      setIsOverflow(hasOverflow)

      if (callback) {
        callback(hasOverflow)
      }
    }

    if (current) {
      if ('ResizeObserver' in window) {
        new ResizeObserver(trigger).observe(current)
      }
      trigger()
    }
  }, [callback, ref])

  return isOverflow
}
