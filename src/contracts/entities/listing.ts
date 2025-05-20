import type { components } from '../generated/maverick-schema';

export type Listing = components['schemas']['Listing'] & {
  sold?: boolean;
  lowPrice?: boolean;
  lastInSection?: boolean;
  displayPriceWithFees?: number;
  lowPriceSection?: boolean; // added for experiment, remove later if not needed
  goodDeal?: boolean; // added for experiment, remove later if not needed
  greatDeal?: boolean; // added for experiment, remove later if not needed
};

export type ListingWithTaxAmount = Listing & {
  taxAmount: number;
};
