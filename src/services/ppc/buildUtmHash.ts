import { PARAMS_TO_CHECK } from './constants'

export const buildUtmHash = (searchParams: URLSearchParams) => {
  const initialParams: Record<string, string> = {}
  for (const param of PARAMS_TO_CHECK) {
    const value = searchParams.get(param)
    if (value) {
      initialParams[param] = value
    }
  }

  return initialParams
}
