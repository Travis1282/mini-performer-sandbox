interface Window {
  __GT_GB_PAYLOAD__: FeatureApiResponse

  __GT_LOC__: {
    ip: string
    loc: string
    latitude: string
    longitude: string
    closestRegionId: string
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  __GT_SESSIONS_PAYLOAD__: any

  // Add your custom properties here
  // For example:
  // myCustomProperty: string;
  // myCustomFunction: () => void;
}
