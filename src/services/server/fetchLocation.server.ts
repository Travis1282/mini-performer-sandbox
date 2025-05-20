import type { Region } from '@/contracts/entities/region';
import type { components } from '@/contracts/generated/maverick-schema';
import type { SearchPageParams } from '@/pages/slug/types';
import { getUserLocation } from '@/services/maverick/getUserLocation';
import { fetchRegions } from '@/services/server/fetchRegions.server';
import { buildServerRequestInit } from '@/services/utils/buildServerRequestInit';
import { DEFAULT_REGION, getCookies, getIpAndLoc } from '@/utils/headers';
import { captureException } from '@sentry/react';

export async function getLocation(
  queryParams: SearchPageParams['searchParams'],
  request?: Request
): Promise<{
  trendingRegion: components['schemas']['Region']; // can be undefined if query string param is not correct
}> {
  const regionId = queryParams && queryParams.region;
  try {
    const regions: Region[] | undefined = await fetchRegions();
    if (regions && regionId) {
      const regionFromSearchParam = regions.find(
        (region: Region) => region.id === Number(regionId)
      );
      return {
        trendingRegion: regionFromSearchParam ?? DEFAULT_REGION,
      };
    }

    const { ip, loc, latitude, longitude } = getIpAndLoc(request);
    const { trendingRegion } = getCookies();

    if (trendingRegion) {
      return {
        trendingRegion,
      };
    }

    if (ip && loc && ['US', 'CA'].includes(loc)) {
      try {
        const { data, error } = await getUserLocation({
          params: {
            query: {
              ipAddress: ip,
              country: loc,
              latitude: Number(latitude),
              longitude: Number(longitude),
            },
          },
          init: buildServerRequestInit(),
        });

        if (error) {
          return {
            trendingRegion: DEFAULT_REGION,
          };
        }

        return {
          trendingRegion: data?.closestRegion || DEFAULT_REGION,
        };
      } catch (error) {
        captureException(error, {
          tags: { type: 'error-getting-user-location' },
        });

        return {
          trendingRegion: DEFAULT_REGION,
        };
      }
    }

    return { trendingRegion: DEFAULT_REGION };
  } catch (error) {
    console.error(error);
    return { trendingRegion: DEFAULT_REGION };
  }
}
