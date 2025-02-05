import type { ReactNode } from 'react'
import Cookies from 'js-cookie'
import { createContext, use, useCallback, useEffect, useState } from 'react'
import type { IpLocation } from './ip-loc.types'
import { CLOSEST_REGION_COOKIE } from './constants'

const useLocation = (
  location: IpLocation & { closestRegionId: string | undefined }
) => {
  const [trendingRegion, setTrendingRegion] = useState(location.closestRegionId)

  const handleChangeTrendingRegion = useCallback((regionId: string) => {
    setTrendingRegion(regionId)
  }, [])

  useEffect(() => {
    Cookies.set(CLOSEST_REGION_COOKIE, trendingRegion ?? '0')
  }, [trendingRegion])

  return {
    ...location,
    trendingRegion,
    onChangeTrendingRegion: handleChangeTrendingRegion,
  }
}

const LocationContext = createContext<ReturnType<typeof useLocation>>({
  ip: undefined,
  loc: undefined,
  latitude: undefined,
  longitude: undefined,
  closestRegionId: undefined,
  trendingRegion: undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChangeTrendingRegion: () => {},
})

export const LocationProvider = ({
  children,
  location,
}: {
  children: ReactNode
  location: IpLocation & { closestRegionId: string | undefined }
}) => {
  const locationWithTrending = useLocation(location)
  return (
    <LocationContext value={locationWithTrending}>{children}</LocationContext>
  )
}

export const useLocationContext = () => {
  const location = use(LocationContext)
  if (location === undefined) {
    throw new Error('useLocationContext must be used within a LocationProvider')
  }
  return location
}
