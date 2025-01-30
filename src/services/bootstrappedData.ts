import type { FeatureApiResponse } from '@growthbook/growthbook-react'
import type { IpLocation } from './location/ip-loc.types'

export function buildBootstrappedData({
  location,
  featuresPayload,
}: {
  location?: IpLocation
  featuresPayload?: FeatureApiResponse
}) {
  const { ip, loc, latitude, longitude } = location ?? {}
  return `
    <script>
      window.__GT_LOC__ = ${JSON.stringify({
        ip,
        loc,
        latitude,
        longitude,
      })}
      window.__GT_GB_PAYLOAD__ = ${JSON.stringify(featuresPayload)}
    </script>
  `
}
