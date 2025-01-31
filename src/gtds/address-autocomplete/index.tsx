'use client'

import type { ReactNode } from 'react'
import { useOutsideClick } from '@/hooks/useClickOutside'
import { makeTestid } from '@/utils/string'
import clsx from 'clsx'
import React, { useCallback, useState } from 'react'
import useGoogleMapsPlaces from './useGoogleMapsPlaces'

export interface IAddress {
  address1: string
  address2: string
  city: string
  country: string
  postalCode: string
  state: string
}

interface AddressAutocompleteProps {
  autoComplete?: string
  className?: string
  'data-testid'?: string
  /**
   * Delay in ms before making the request
   */
  delay?: number
  disabled?: boolean
  error?: string
  id?: string
  inputRef?: React.Ref<HTMLInputElement>
  label?: string
  name: string
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onPlaceSelect: (place: IAddress) => void
  placeholder?: string
  rightContent?: ReactNode
  value: string
}

/**
 * @description
 * A component that uses Google Maps Places Autocomplete Service to help users fill in the address form.
 * The component will fetch the predictions from Google Maps Autocomplete API and display the results as a dropdown.
 * The user can select one of the predictions and the component will trigger the {@link onPlaceSelect} prop with the selected address.
 * The component will also trigger the {@link onChange} prop when the user selects one of the predictions.
 * @param {AddressAutocompleteProps} props
 * @returns {ReactNode}
 */
export const AddressAutocomplete = ({
  'data-testid': dataTestId,
  className,
  autoComplete = 'street-address',
  disabled,
  error,
  id,
  inputRef,
  label,
  name,
  onBlur,
  onChange,
  onPlaceSelect,
  rightContent,
  placeholder,
  value,
  delay = 400,
}: AddressAutocompleteProps) => {
  const { predictions, fetchPredictions, setPredictions, getPlaceDetails } =
    useGoogleMapsPlaces({ delay })

  const autocompleteRef = useOutsideClick(() => {
    setPredictions([])
  })

  const [isFocused, setIsFocused] = useState(false)

  const onInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const eventValue = (event.target as HTMLInputElement)?.value
      onChange(event)
      if (!isFocused) {
        return
      }
      // if a space character is entered but the value is still the same, do not fetch predictions
      if (eventValue.trim() === value.trim()) {
        return
      }
      fetchPredictions(eventValue)
    },
    [fetchPredictions, isFocused, onChange, value]
  )

  const handleSuggestionClick = useCallback(
    (placeId: string) => {
      getPlaceDetails(placeId, (address: IAddress) => {
        onPlaceSelect(address)
      })
    },
    [getPlaceDetails, onPlaceSelect]
  )

  return (
    <div
      className={clsx(
        'relative flex w-full max-w-full flex-col bg-white',
        className
      )}
      ref={autocompleteRef}
    >
      {label ? (
        <div className="mb-2 flex flex-row items-center justify-between">
          <label className="text-dark opacity-60 text-large" htmlFor={name}>
            {label}
          </label>
          {rightContent}
        </div>
      ) : null}
      <div className="relative w-full">
        <input
          autoComplete={autoComplete}
          className={clsx(
            'w-full rounded border p-[9px]',
            error ? 'border-error' : 'border-[#B3B8BE] text-dark'
          )}
          data-testid={`${dataTestId}`}
          disabled={disabled}
          id={id ?? name}
          name={name}
          onBlur={onBlur}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            onInputChange(event)
          }}
          onFocus={() => {
            setIsFocused(true)
          }}
          placeholder={placeholder}
          ref={inputRef}
          type="text"
          value={value}
        />
      </div>

      {predictions.length > 0 ? (
        <div className="absolute top-full z-10 flex w-full flex-col bg-white">
          <ul className="flex flex-col border [&>li]:border-b">
            {predictions.map(({ place_id, description }) => {
              return (
                <li
                  className="cursor-pointer p-2 font-medium hover:bg-accent hover:bg-opacity-10 lg:border-l-4 lg:border-l-transparent lg:hover:border-l-accent"
                  data-testid={dataTestId ?? makeTestid(description)}
                  key={place_id}
                  onClick={() => handleSuggestionClick(place_id)}
                >
                  {description}
                </li>
              )
            })}
          </ul>
        </div>
      ) : null}

      {error ? (
        <span className="mt-1 text-[12px]" data-testid={`${dataTestId}-error`}>
          <span className="text-small font-medium text-error">{error}</span>
        </span>
      ) : null}
    </div>
  )
}
