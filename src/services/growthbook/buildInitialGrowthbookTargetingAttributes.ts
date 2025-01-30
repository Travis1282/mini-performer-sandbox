import Cookies from 'js-cookie'
import { buildUtmHash } from '../ppc/buildUtmHash'
import { PROFILE_COOKIE } from '../ppc/constants'
import { getUtmHashCookie } from '../ppc/getUtmHashCookie'

export function buildInitialGrowthbookTargetingAttributes() {
  const existingUtmHash = getUtmHashCookie()
  const searchParamsUtmHash = buildUtmHash(
    new URLSearchParams(window.location.search)
  )
  const profileCookie = Cookies.get(PROFILE_COOKIE)
  return { ...existingUtmHash, ...searchParamsUtmHash, id: profileCookie }
}
