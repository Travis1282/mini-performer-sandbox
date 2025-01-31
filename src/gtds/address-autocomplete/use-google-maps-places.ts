import { useMapsLibrary } from '@vis.gl/react-google-maps'
import { debounce } from 'lodash-es'
import { useCallback, useEffect, useState } from 'react'
// useGoogleMapsPlaces.ts
import type { IAddress } from '.'

interface UseGoogleMapsPlacesOptions {
  delay?: number
  /**
   * when enabled, the session token is set to the autocomplete service and the geocoding service
   * to count it as a session for both requests instead of per request usage
   *
   * @default false
   */
  enableSessionToken?: boolean
}

interface UseGoogleMapsPlacesResult {
  fetchPredictions: (inputValue: string) => void
  getPlaceDetails: (
    placeId: string,
    callback: (address: IAddress) => void
  ) => void
  isLoading: boolean
  predictions: google.maps.places.AutocompletePrediction[]
  setPredictions: (
    predictions: google.maps.places.AutocompletePrediction[]
  ) => void
}

const useGoogleMapsPlaces = (
  options: UseGoogleMapsPlacesOptions = {}
): UseGoogleMapsPlacesResult => {
  const { delay = 400, enableSessionToken = false } = options
  const places = useMapsLibrary('places')
  const geocoding = useMapsLibrary('geocoding')

  const [sessionToken, setSessionToken] = useState<
    google.maps.places.AutocompleteSessionToken | undefined
  >(undefined)
  const [autocompleteService, setAutocompleteService] = useState<
    google.maps.places.AutocompleteService | undefined
  >(undefined)
  const [geocodingService, setGeocodingService] = useState<
    google.maps.Geocoder | undefined
  >(undefined)
  const [predictions, setPredictions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([])

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!places || !geocoding) {
      return
    }

    setAutocompleteService(new places.AutocompleteService())
    setGeocodingService(new geocoding.Geocoder())
    if (enableSessionToken) {
      setSessionToken(new places.AutocompleteSessionToken())
    }

    return () => {
      setAutocompleteService(undefined)
      setGeocodingService(undefined)
    }
  }, [enableSessionToken, geocoding, places])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchPredictions = useCallback(
    debounce(async (inputValue: string) => {
      // don't fetch if less than 2 characters
      if (!autocompleteService || inputValue.trim().length < 2) {
        setPredictions([])
        return
      }
      if (!sessionToken && enableSessionToken) {
        return
      }

      setIsLoading(true)

      const request: google.maps.places.AutocompletionRequest = {
        input: inputValue,
        types: ['address'],
        componentRestrictions: { country: ['us', 'ca'] },
      }

      if (sessionToken) {
        request.sessionToken = sessionToken
      }

      try {
        const response = await autocompleteService.getPlacePredictions(request)
        setPredictions(response.predictions)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
      }
    }, delay),
    [autocompleteService, sessionToken, delay]
  )

  const getPlaceDetails = useCallback(
    (placeId: string, callback: (address: IAddress) => void): void => {
      if (!geocodingService || !places) {
        return
      }

      const detailRequestOptions: google.maps.GeocoderRequest = {
        placeId,
      }

      const detailsRequestCallback = (
        geocodeResult: google.maps.GeocoderResult[] | null
      ) => {
        const addressComponents = geocodeResult?.[0]?.address_components ?? []
        const postalCode = addressComponents.find((item) =>
          item.types.includes('postal_code')
        )
        const postalCodeSufix = addressComponents.find((item) =>
          item.types.includes('postal_code_suffix')
        )
        const streetNumber = addressComponents.find((item) =>
          item.types.includes('street_number')
        )
        const route = addressComponents.find((item) =>
          item.types.includes('route')
        )
        const locality = addressComponents.find((item) =>
          item.types.includes('locality')
        )
        const administrative_area_level_1 = addressComponents.find((item) =>
          item.types.includes('administrative_area_level_1')
        ) as {
          types: string | string[]
          short_name?: string
          long_name?: string
        }
        const state = addressComponents.find((item) =>
          item.types.includes('administrative_area_level_1')
        )
        const country = addressComponents.find((item) =>
          item.types.includes('country')
        )
        callback({
          postalCode: `${postalCode?.short_name || ''}${
            postalCodeSufix ? '-' + postalCodeSufix.short_name : ''
          }`,
          address1: `${streetNumber?.short_name || ''}${
            route ? ' ' + route.short_name : ''
          }`,
          address2: '',
          city: `${
            locality?.short_name || administrative_area_level_1?.long_name || ''
          }`,
          state: `${state?.short_name || ''}`,
          country: `${country?.short_name || ''}`,
        })
        setPredictions([])
        setSessionToken(new places.AutocompleteSessionToken())
      }

      try {
        geocodingService.geocode(detailRequestOptions, detailsRequestCallback)
      } catch (error) {
        // noop
      }
    },
    [geocodingService, places]
  )

  return {
    predictions,
    fetchPredictions,
    getPlaceDetails,
    setPredictions,
    isLoading,
  }
}

export default useGoogleMapsPlaces
