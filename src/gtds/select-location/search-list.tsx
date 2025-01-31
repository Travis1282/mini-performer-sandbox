'use client'

import type { Dispatch, SetStateAction } from 'react'
import type { LocationItem } from './SearchListItem'

export interface SelectLocationSearchListProps {
  clearSearchItem?: string
  onSelect: (location: LocationItem | undefined) => void
  search: string
  setSearch: Dispatch<SetStateAction<string>>
}

export interface IPlace {
  description: string
  location: {
    lat: number
    lng: number
  }
  place_id: string
}

export const POPULAR_CITIES: LocationItem[] = [
  {
    city: 'New York',
    state: 'NY',
    country: 'USA',
    location: {
      lat: 40.7127753,
      lng: -74.0059728,
    },
  },
  {
    city: 'Los Angeles',
    state: 'CA',
    country: 'USA',
    location: {
      lat: 34.0549076,
      lng: -118.242643,
    },
  },
  {
    city: 'Chicago',
    state: 'IL',
    country: 'USA',
    location: {
      lat: 41.8781136,
      lng: -87.6297982,
    },
  },
  {
    city: 'Miami',
    state: 'FL',
    country: 'USA',
    location: {
      lat: 25.7616798,
      lng: -80.1917902,
    },
  },
  {
    city: 'Washington D.C.',
    state: 'DC',
    country: 'USA',
    location: {
      lat: 38.9071923,
      lng: -77.0368707,
    },
  },
]
