import { useEffect, useRef } from 'react'

/**
 * Executes the provided callback function only once when a specified condition is met.
 *
 * @param callback A function to be executed when the condition is met.
 * @param dependencies The dependencies to be passed to the callback function.
 * @param condition A function that determines whether the callback should be executed.
 */
export const useEffectOnce = <D = unknown[]>(
  callback: (dependencies: D) => void,
  dependencies: D,
  condition: (dependencies: D) => boolean
) => {
  const calledOnce = useRef(false)

  useEffect(() => {
    if (calledOnce.current) {
      return
    }

    if (condition(dependencies)) {
      callback(dependencies)

      calledOnce.current = true
    }
  }, [callback, condition, dependencies])
}
