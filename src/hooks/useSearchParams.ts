import {
  usePathname,
  useSearchParams as useNextSearchParams,
} from 'next/navigation'
import { useCallback } from 'react'

export interface SetSearchParamsOptions {
  /** will call replaceState when updating if true
   * @default false use pushState
   */
  replace?: boolean
}

export type ParamKeyValuePair = [string, string]

export type URLSearchParamsInit =
  | ParamKeyValuePair[]
  | Record<string, string | string[]>
  | string
  | URLSearchParams

/**
 * Parses the given URLSearchParams object and returns a record of key-value pairs.
 * If a key has multiple values, they are returned as an array.
 *
 * @param params - The URLSearchParams object to parse.
 * @returns A record of key-value pairs.
 */
export function parseSearchParams(
  params: URLSearchParams
): Record<string, string | string[]> {
  const parsedSearchParams: Record<string, string | string[]> = {}
  for (const [key, value] of params) {
    if (!parsedSearchParams[key]) {
      parsedSearchParams[key] = value
    } else {
      if (Array.isArray(parsedSearchParams[key])) {
        ;(parsedSearchParams[key] as string[]).push(value)
      } else if (typeof parsedSearchParams[key] === 'string') {
        parsedSearchParams[key] = [parsedSearchParams[key] as string, value]
      }
    }
  }
  return parsedSearchParams
}

/**
 * Creates a new instance of URLSearchParams based on the provided initialization value.
 *
 * @param init - The initialization value for the URLSearchParams object. It can be a string, an array of key-value pairs, a record of key-value pairs, or an existing URLSearchParams object.
 * @returns A new instance of URLSearchParams.
 */
export function createSearchParams(
  init: URLSearchParamsInit = ''
): URLSearchParams {
  return new URLSearchParams(
    typeof init === 'string' ||
    Array.isArray(init) ||
    init instanceof URLSearchParams
      ? init
      : Object.keys(init).reduce((memo, key) => {
          const value = init[key]
          return memo.concat(
            Array.isArray(value) ? value.map((v) => [key, v]) : [[key, value]]
          )
        }, [] as ParamKeyValuePair[])
  )
}
/**
 * Sets the search parameters in the URL and updates the browser history.
 *
 * @param newSearchParams - The new search parameters to set. Can be a string,
 * an array of key-value pairs, an object with key-value pairs, or a URLSearchParams object.
 * Supports a function that receives the previous search parameters and returns the new search parameters.
 * @param options - Optional. Additional options for setting the search parameters. Can include a 'replace' property to indicate whether to use replaceState or pushState when updating the URL. Defaults to false (use pushState).
 * @returns void
 */
export const useSearchParams = (): [
  URLSearchParams,
  (
    newSearchParams:
      | ((prev: URLSearchParams) => URLSearchParams)
      | URLSearchParamsInit,
    options?: SetSearchParamsOptions
  ) => void,
] => {
  const pathname = usePathname()
  const searchParams = useNextSearchParams()

  /**
   * Sets the search parameters in the URL and updates the browser history.
   *
   * @param newSearchParams - The new search parameters to set. Can be a string, an array of key-value pairs, an object with key-value pairs, or a URLSearchParams object.
   * @param options - Optional. Additional options for setting the search parameters. Can include a 'replace' property to indicate whether to use replaceState or pushState when updating the URL. Defaults to false (use pushState).
   * @returns void
   */
  const setSearchParams = useCallback(
    (
      newSearchParams:
        | ((prev: URLSearchParams) => URLSearchParams)
        | URLSearchParamsInit,
      options?: SetSearchParamsOptions
    ) => {
      let urlSearchParamsToSet: undefined | URLSearchParams = undefined
      if (typeof newSearchParams === 'function') {
        const prevSearchParams = new URLSearchParams(searchParams)
        urlSearchParamsToSet = newSearchParams(prevSearchParams)
      } else {
        urlSearchParamsToSet = createSearchParams(newSearchParams)
      }

      const search = urlSearchParamsToSet.toString()
      const query = search ? `?${search}` : ''

      if (options?.replace) {
        window.history.replaceState(null, '', `${pathname}${query}`)
      } else {
        window.history.pushState(null, '', `${pathname}${query}`)
      }
    },
    [pathname, searchParams]
  )

  return [searchParams, setSearchParams]
}
