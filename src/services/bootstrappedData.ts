import type { FeatureApiResponse } from '@growthbook/growthbook-react';
import type { IpLocation } from './location/ip-loc.types';

export function buildBootstrappedData({
  location,
  featuresPayload,
  closestRegionId,
}: {
  location?: IpLocation;
  featuresPayload?: FeatureApiResponse;
  closestRegionId?: string;
}) {
  const { ip, loc, latitude, longitude } = location ?? {};
  return `
    <script>
      window.__GT_LOC__ = ${JSON.stringify({
        ip,
        loc,
        latitude,
        longitude,
        closestRegionId,
      })}
      window.__GT_GB_PAYLOAD__ = ${JSON.stringify(featuresPayload)}
    </script>
  `;
}
