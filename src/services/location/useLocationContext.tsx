import type { ReactNode } from 'react'
import { createContext, use } from 'react'
import type { IpLocation } from './ip-loc.types'

const LocationContext = createContext<IpLocation>({
  ip: undefined,
  loc: undefined,
  latitude: undefined,
  longitude: undefined,
})

export const LocationProvider = ({
  children,
  location,
}: {
  children: ReactNode
  location: IpLocation
}) => {
  return <LocationContext value={location}>{children}</LocationContext>
}

export const useLocationContext = () => {
  const location = use(LocationContext)
  if (location === undefined) {
    throw new Error('useLocationContext must be used within a LocationProvider')
  }
  return location
}
