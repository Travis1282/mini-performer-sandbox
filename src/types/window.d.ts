import type { FeatureApiResponse } from '@growthbook/growthbook';

declare global {
  interface Window {
    __GT_GB_PAYLOAD__: FeatureApiResponse;
    __GT_LOC__: {
      ip: string;
      loc: string;
      latitude: string;
      longitude: string;
      closestRegionId: string;
      ApplePaySession: {
        canMakePayments(): boolean;
      };
    };
    clarity?: (type: string, event: string, value?: string | string[]) => void;
  }
}
