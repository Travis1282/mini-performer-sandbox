import { components } from '../services/maverick/generated/maverick-schema'

export type Listing = components['schemas']['Listing'] & {
  lowPrice?: boolean
  lastInSection?: boolean
  displayPriceWithFees?: number
}

export type ListingWithTaxAmount = Listing & {
  taxAmount: number
}
