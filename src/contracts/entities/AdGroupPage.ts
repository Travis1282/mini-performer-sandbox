import type { components } from '../generated/maverick-schema';

export interface AdGroupPage {
  adGroupEntityResult: AdGroupEntityResult;
  events: components['schemas']['Event'][];
}
export interface AdGroupEntityResult {
  performer?: components['schemas']['Performer'];
  region?: components['schemas']['Region'];
  venue?: components['schemas']['Venue'];
}

export const emptyResponse = () => ({
  data: {
    adGroupEntityResult: {},
    events: [],
  } as AdGroupPage,
});
