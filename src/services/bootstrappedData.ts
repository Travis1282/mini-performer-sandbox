import type { FeatureApiResponse } from '@growthbook/growthbook-react'
import type { IpLocation } from './location/ip-loc.types'
import type { paths } from './maverick/generated/maverick-schema'

export function buildBootstrappedData({
  location,
  featuresPayload,
  sessionsPayload,
}: {
  location?: IpLocation
  featuresPayload?: FeatureApiResponse
  sessionsPayload?: paths['/rest/sessions']['post']['responses']['200']['content']['application/json;charset=utf-8']
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
      window.__GT_SESSIONS_PAYLOAD__ = ${JSON.stringify(sessionsPayload)}
    </script>
  `
}
