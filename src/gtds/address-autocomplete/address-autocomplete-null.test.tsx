import { act, render, screen, waitFor } from '@/testing'
import type { IAddress } from './index'
import { AddressAutocomplete } from './index'
jest.mock('./useGoogleMapsPlaces', () => {
  return jest.fn(() => ({
    predictions: [
      {
        description: '123 Main St',
        place_id: '123',
      },
      {
        description: '456 Main St',
        place_id: '456',
      },
    ],
    fetchPredictions: jest.fn(),
    setPredictions: jest.fn(),
    getPlaceDetails: (
      placeId: string,
      callback: (address: IAddress) => void
    ) => {
      callback({
        address1: '',
        address2: '',
        city: '',
        country: '',
        postalCode: '',
        state: '',
      })
    },
  }))
})

describe('AddressAutocomplete', () => {
  test('renders without errors with null value in getDetails', async () => {
    const handleChange = jest.fn()
    const handleSelect = jest.fn()
    const { user } = render(
      <AddressAutocomplete
        name="address1"
        onChange={handleChange}
        onPlaceSelect={handleSelect}
        value=""
      />
    )
    const input = screen.getByRole('textbox')

    await act(async () => {
      await user.type(input, '123 Main St')
    })

    const result = screen.getByText('123 Main St')
    await act(async () => await user.click(result))

    await waitFor(() => {
      expect(handleSelect).toHaveBeenCalledWith({
        address1: '',
        address2: '',
        city: '',
        country: '',
        postalCode: '',
        state: '',
      })
    })
  })
})
